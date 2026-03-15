// AI-Powered Blood Report Extraction using Google Gemini
// Supports multiple API keys + multiple models for maximum free tier usage

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// ─── Multi-Key + Multi-Model Configuration ───

// Parse comma-separated API keys from env
// Set GEMINI_API_KEYS=key1,key2,key3 for multiple keys
// Falls back to single GEMINI_API_KEY for backward compatibility
function getApiKeys() {
  const multiKeys = process.env.GEMINI_API_KEYS || '';
  const singleKey = process.env.GEMINI_API_KEY || '';

  const keys = multiKeys
    ? multiKeys.split(',').map(k => k.trim()).filter(Boolean)
    : singleKey ? [singleKey] : [];

  return keys;
}

// Models to try in order of preference
// Each has its own free tier limits, so if one is exhausted we try the next
const MODELS = [
  'gemini-2.5-flash',      // Best: 10 req/min, 250 req/day free
  'gemini-2.0-flash',      // Good: 15 req/min, 1500 req/day free
  'gemini-1.5-flash',      // Older but still good, separate limits
  'gemini-1.5-pro',        // Slower but 50 req/day free
];

// Track which key+model combos are rate-limited (with expiry)
const rateLimitedCombos = new Map(); // "keyIndex:model" -> expiry timestamp

const EXTRACTION_PROMPT = `You are a medical lab report data extraction AI. Extract ALL blood test parameters and their numeric values from this report.

IMPORTANT RULES:
1. Extract ONLY the test parameter name and its numeric result value
2. Do NOT extract reference ranges, units, or methods — only the actual test RESULT
3. Be extremely precise — a wrong value could mislead a patient
4. If a value is not clearly readable, skip it rather than guess
5. Use standard parameter names (e.g., "Hemoglobin", "RBC", "WBC", "Platelet Count", "TSH", etc.)
6. For percentage values (like Neutrophils %), include the number only
7. Return ONLY valid JSON — no markdown, no explanation, no backticks

Return a JSON array of objects with "name" and "value" fields:
[
  {"name": "Hemoglobin", "value": 10.3},
  {"name": "RBC", "value": 4.15},
  {"name": "Total Cholesterol", "value": 111},
  ...
]

If this is NOT a blood/pathology test report, return: []
If no parameters can be extracted, return: []`;

// ─── Client Pool ───

const clientCache = new Map(); // keyIndex -> GoogleGenAI instance

function getClient(keyIndex) {
  const keys = getApiKeys();
  if (keyIndex >= keys.length) return null;

  if (!clientCache.has(keyIndex)) {
    clientCache.set(keyIndex, new GoogleGenAI({ apiKey: keys[keyIndex] }));
  }
  return clientCache.get(keyIndex);
}

function isComboRateLimited(keyIndex, model) {
  const key = `${keyIndex}:${model}`;
  const expiry = rateLimitedCombos.get(key);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    rateLimitedCombos.delete(key);
    return false;
  }
  return true;
}

function markComboRateLimited(keyIndex, model) {
  // Block this combo for 60 seconds (free tier resets per minute)
  const key = `${keyIndex}:${model}`;
  rateLimitedCombos.set(key, Date.now() + 60_000);
}

function isRateLimitError(err) {
  const msg = (err.message || '').toLowerCase();
  const status = err.status || err.httpStatusCode || 0;
  return (
    status === 429 ||
    msg.includes('rate limit') ||
    msg.includes('quota') ||
    msg.includes('resource exhausted') ||
    msg.includes('too many requests') ||
    msg.includes('exceeded')
  );
}

// ─── Core: Try all key+model combos ───

/**
 * Try a Gemini API call across all available key+model combinations.
 * Returns the result from the first successful call.
 * Throws a RATE_LIMIT_EXHAUSTED error if ALL combos are exhausted.
 */
async function tryAllCombos(buildContents) {
  const keys = getApiKeys();
  if (keys.length === 0) {
    throw new Error('NO_API_KEY');
  }

  const errors = [];

  // Try each key × model combination
  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    for (const model of MODELS) {
      if (isComboRateLimited(keyIdx, model)) {
        continue; // Skip known rate-limited combos
      }

      const client = getClient(keyIdx);
      if (!client) continue;

      try {
        console.log(`Trying key #${keyIdx + 1} with model ${model}...`);
        const response = await client.models.generateContent({
          model,
          contents: buildContents(),
        });

        console.log(`✓ Success with key #${keyIdx + 1}, model ${model}`);
        return parseAIResponse(response.text);
      } catch (err) {
        console.error(`✗ Key #${keyIdx + 1}, model ${model}: ${err.message}`);

        if (isRateLimitError(err)) {
          markComboRateLimited(keyIdx, model);
          errors.push({ keyIdx, model, error: 'rate_limited' });
        } else {
          // Non-rate-limit error (bad key, server error, etc.) — skip this key entirely
          errors.push({ keyIdx, model, error: err.message });
          break; // Move to next key
        }
      }
    }
  }

  // All combos failed
  const allRateLimited = errors.length > 0 && errors.every(e => e.error === 'rate_limited');
  if (allRateLimited) {
    const err = new Error('RATE_LIMIT_EXHAUSTED');
    err.code = 'RATE_LIMIT_EXHAUSTED';
    throw err;
  }

  throw new Error('AI_EXTRACTION_FAILED');
}

// ─── Public API ───

async function extractFromImage(filePath) {
  const imageData = fs.readFileSync(filePath);
  const base64Image = imageData.toString('base64');

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
  };
  const mimeType = mimeTypes[ext] || 'image/jpeg';

  return tryAllCombos(() => [
    { inlineData: { mimeType, data: base64Image } },
    { text: EXTRACTION_PROMPT },
  ]);
}

async function extractFromPDF(filePath) {
  const pdfData = fs.readFileSync(filePath);
  const base64Pdf = pdfData.toString('base64');

  return tryAllCombos(() => [
    { inlineData: { mimeType: 'application/pdf', data: base64Pdf } },
    { text: EXTRACTION_PROMPT },
  ]);
}

async function extractFromText(text) {
  return tryAllCombos(() => [
    { text: EXTRACTION_PROMPT + '\n\nHere is the report text:\n\n' + text },
  ]);
}

// ─── Response Parsing ───

function parseAIResponse(responseText) {
  if (!responseText) return [];

  let cleaned = responseText.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '');
  cleaned = cleaned.replace(/\n?```\s*$/i, '');
  cleaned = cleaned.trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(item => item && typeof item.name === 'string' && item.name.trim() && typeof item.value === 'number' && !isNaN(item.value))
      .map(item => ({
        name: item.name.trim(),
        value: item.value,
      }));
  } catch (err) {
    console.error('Failed to parse AI response:', err.message);
    console.error('Raw response:', responseText.substring(0, 500));
    return [];
  }
}

/**
 * Map AI-extracted parameters to our PARAMETERS_DB using fuzzy matching
 */
function mapToParametersDB(aiResults, PARAMETERS_DB, findParameter) {
  const mapped = [];
  const seen = new Set();

  for (const item of aiResults) {
    const param = findParameter(item.name);
    if (!param || seen.has(param.id)) continue;

    seen.add(param.id);
    mapped.push({
      parameterId: param.id,
      rawName: item.name,
      value: item.value,
      unit: param.unit,
      reportRange: null,
    });
  }

  return mapped;
}

function isAvailable() {
  return getApiKeys().length > 0;
}

function getStatus() {
  const keys = getApiKeys();
  const activeCombos = [];
  const limitedCombos = [];

  for (let i = 0; i < keys.length; i++) {
    for (const model of MODELS) {
      if (isComboRateLimited(i, model)) {
        limitedCombos.push(`key#${i + 1}:${model}`);
      } else {
        activeCombos.push(`key#${i + 1}:${model}`);
      }
    }
  }

  return {
    totalKeys: keys.length,
    models: MODELS,
    activeCombos: activeCombos.length,
    limitedCombos: limitedCombos.length,
    allExhausted: keys.length > 0 && activeCombos.length === 0,
  };
}

module.exports = {
  extractFromImage,
  extractFromPDF,
  extractFromText,
  mapToParametersDB,
  isAvailable,
  getStatus,
};
