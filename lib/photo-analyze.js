/**
 * Shared Gemini Vision photo analysis for ThaaliScore
 * Used by both the web endpoint and WhatsApp bot
 */

const GEMINI_PROMPT = `You are an Indian food expert. Look at this photo and identify ALL Indian dishes/food items visible.

For EACH dish, provide:
1. The common Indian name (e.g., "Dal Makhani", "Roti", "Paneer Butter Masala")
2. An estimated portion description

Return ONLY a JSON array, no other text. Format:
[{"name": "dish name", "portion": "1 bowl"}, ...]

If this is not a food photo or you cannot identify any dishes, return: []
Be specific with Indian dish names. Use common names like "Chole", "Rajma", "Idli", "Dosa", "Biryani", etc.`;

const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];

/**
 * Detect MIME type from image buffer magic bytes
 * Falls back to provided mimeType or 'image/jpeg'
 */
function detectMimeType(buffer, fallback) {
  if (buffer && buffer.length >= 4) {
    // JPEG: FF D8 FF
    if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
      return 'image/jpeg';
    }
    // PNG: 89 50 4E 47
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      return 'image/png';
    }
    // GIF: 47 49 46
    if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      return 'image/gif';
    }
    // WebP: 52 49 46 46 ... 57 45 42 50
    if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
        buffer.length >= 12 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
      return 'image/webp';
    }
  }
  return fallback || 'image/jpeg';
}

/**
 * Get available Gemini API keys from environment
 * @returns {string[]} Array of API keys (may be empty)
 */
function getApiKeys() {
  const apiKeys = (process.env.GEMINI_API_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
  const singleKey = process.env.GEMINI_API_KEY || '';
  return apiKeys.length > 0 ? apiKeys : (singleKey ? [singleKey] : []);
}

/**
 * Call Gemini Vision API to identify dishes in a food photo
 * @param {Buffer} imageBuffer - The image data
 * @param {string} [mimeType] - Content type (auto-detected from buffer if missing)
 * @returns {Promise<{dishes?: object[], error?: string}>}
 *   error can be: 'no_api_key', 'rate_limited', 'api_error', 'parse_error'
 */
async function analyzePhotoBuffer(imageBuffer, mimeType) {
  const allKeys = getApiKeys();

  if (allKeys.length === 0) {
    console.log('[PhotoAnalyze] No Gemini API keys configured');
    return { error: 'no_api_key' };
  }

  const detectedMime = detectMimeType(imageBuffer, mimeType);
  const base64 = imageBuffer.toString('base64');

  let lastError = null;

  // Try each API key with model fallback rotation
  for (const apiKey of allKeys) {
    for (const model of MODELS) {
      try {
        console.log(`[PhotoAnalyze] Trying model=${model} key=...${apiKey.slice(-4)}`);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { inlineData: { mimeType: detectedMime, data: base64 } },
                { text: GEMINI_PROMPT }
              ]
            }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 1024
            }
          })
        });

        if (response.status === 429) {
          console.log(`[PhotoAnalyze] Rate limited on model=${model} key=...${apiKey.slice(-4)}`);
          lastError = 'rate_limited';
          continue; // Try next model/key
        }

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[PhotoAnalyze] Gemini error: ${response.status}`, errText);
          lastError = 'api_error';
          continue;
        }

        const data = await response.json();
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON from response (handle markdown code blocks)
        let identified = [];
        try {
          const jsonMatch = textContent.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            identified = JSON.parse(jsonMatch[0]);
          }
        } catch (e) {
          console.error('[PhotoAnalyze] JSON parse error:', e.message, textContent);
          lastError = 'parse_error';
          continue;
        }

        console.log(`[PhotoAnalyze] Identified ${identified.length} dishes`);
        return { identified };

      } catch (err) {
        console.error(`[PhotoAnalyze] Network/fetch error: ${err.message}`);
        lastError = 'api_error';
        continue;
      }
    }
  }

  // All keys/models exhausted
  console.log(`[PhotoAnalyze] All keys/models exhausted. Last error: ${lastError}`);
  return { error: lastError || 'api_error' };
}

/**
 * Match AI-identified dish names to the ThaaliScore dish database
 * @param {object[]} identified - Array of {name, portion} from Gemini
 * @param {object[]} dishesDB - The full dishes array from thaali-score
 * @returns {{ matched: object[], unmatched: object[] }}
 */
function matchDishesToDB(identified, dishesDB) {
  const matched = [];
  const unmatched = [];

  for (const item of identified) {
    const aiName = (item.name || '').toLowerCase().trim();

    // Exact match first
    let best = dishesDB.find(d => d.name.toLowerCase() === aiName);

    // Partial match
    if (!best) {
      best = dishesDB.find(d => d.name.toLowerCase().includes(aiName) || aiName.includes(d.name.toLowerCase()));
    }

    // Word-level fuzzy match
    if (!best) {
      const aiWords = aiName.split(/[\s,/-]+/).filter(w => w.length > 2);
      let bestScore = 0;
      for (const d of dishesDB) {
        const dbWords = d.name.toLowerCase().split(/[\s,/-]+/);
        const score = aiWords.filter(w => dbWords.some(dw => dw.includes(w) || w.includes(dw))).length;
        if (score > bestScore && score >= 1) {
          bestScore = score;
          best = d;
        }
      }
    }

    if (best && !matched.some(m => m.id === best.id)) {
      matched.push({
        id: best.id,
        name: best.name,
        aiName: item.name,
        portion: item.portion || best.serving,
        cal: best.cal,
        protein: best.protein,
        category: best.category,
        veg: best.veg,
        healthScore: best.healthScore,
        gi: best.gi,
        confidence: best.name.toLowerCase() === aiName ? 'high' : 'medium'
      });
    } else if (!best) {
      unmatched.push({ name: item.name, portion: item.portion });
    }
  }

  return { matched, unmatched };
}

module.exports = { analyzePhotoBuffer, matchDishesToDB, detectMimeType, getApiKeys, GEMINI_PROMPT, MODELS };
