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

const EXTRACTION_PROMPT = `You are a medical lab report data extraction AI. Extract ALL blood test parameters from this report with COMPLETE information.

CRITICAL RULES:
1. Extract the test parameter name, its numeric RESULT value, the UNIT, and the REFERENCE RANGE exactly as printed in the report
2. Be extremely precise — a wrong value could mislead a patient about their health
3. If a value is not clearly readable, skip it rather than guess
4. Use the EXACT parameter name as printed in the report (e.g., "Platelet Count", "Total T3", "BUN", "Serum Urea" — do NOT rename or merge different tests)
5. For percentage values (like Neutrophils %), include the number only, unit should be "%"
6. The reference range should be extracted EXACTLY as printed (e.g., "150 - 410", "0.7 - 2.04", "40 - 80")
7. Keep BUN (Blood Urea Nitrogen) and Serum Urea as SEPARATE parameters — they are different tests with different ranges
8. Keep Total T3 and Free T3 as SEPARATE parameters
9. Extract ALL parameters including: CBC with differentials (absolute AND percentage), liver function, kidney function, thyroid, lipid profile, iron studies (serum iron, TIBC, iron saturation/transferrin saturation, ferritin), vitamins, urine routine
10. For parameters like Platelet Count, use the value and unit EXACTLY as in the report (e.g., if report says "201.00 × 10³/µL", value is 201, unit is "×10³/µL" or "thousand/µL")
11. Return ONLY valid JSON — no markdown, no explanation, no backticks

Return a JSON array with name, value, unit, and refRange:
[
  {"name": "Hemoglobin", "value": 10.3, "unit": "g/dL", "refRange": "12.0 - 15.0"},
  {"name": "Platelet Count", "value": 201, "unit": "×10³/µL", "refRange": "150 - 410"},
  {"name": "Total T3", "value": 0.59, "unit": "ng/mL", "refRange": "0.7 - 2.04"},
  {"name": "Serum Iron", "value": 31, "unit": "µg/dL", "refRange": "35 - 145"},
  {"name": "Iron Saturation", "value": 7, "unit": "%", "refRange": "15 - 50"},
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
        unit: (item.unit || '').trim(),
        refRange: (item.refRange || '').trim(),
      }));
  } catch (err) {
    console.error('Failed to parse AI response:', err.message);
    console.error('Raw response:', responseText.substring(0, 500));
    return [];
  }
}

// ─── Unit Conversion ───
// When the report uses different units than our DB, convert the value
const UNIT_CONVERSIONS = {
  // Platelets: some old reports use lakh/µL (1.5-4.0), our DB now uses ×10³/µL (150-410)
  'platelets': {
    detect: (reportUnit, value) => {
      const u = reportUnit.toLowerCase().replace(/\s/g, '');
      // If unit says "lakh" or value is very small (< 10), it's in lakh — convert to ×10³
      return u.includes('lakh') || (value < 10 && value > 0.5);
    },
    convert: (value) => value * 100, // 2.01 lakh/µL = 201 ×10³/µL
    convertRange: (low, high) => ({ low: low * 100, high: high * 100 }),
  },
  // Absolute counts: lab may report in ×10³/µL (1.0-4.8), our DB uses cells/µL (1000-4800)
  'abs_lymphocyte': {
    detect: (reportUnit, value) => {
      const u = reportUnit.toLowerCase().replace(/\s/g, '');
      return (u.includes('10³') || u.includes('10^3') || u.includes('x10') || u.includes('×10') || u.includes('10*3')) && value < 100;
    },
    convert: (value) => value * 1000,
    convertRange: (low, high) => ({ low: low * 1000, high: high * 1000 }),
  },
  'abs_monocyte': {
    detect: (reportUnit, value) => {
      const u = reportUnit.toLowerCase().replace(/\s/g, '');
      return (u.includes('10³') || u.includes('10^3') || u.includes('x10') || u.includes('×10') || u.includes('10*3')) && value < 100;
    },
    convert: (value) => value * 1000,
    convertRange: (low, high) => ({ low: low * 1000, high: high * 1000 }),
  },
  'abs_eosinophil': {
    detect: (reportUnit, value) => {
      const u = reportUnit.toLowerCase().replace(/\s/g, '');
      return (u.includes('10³') || u.includes('10^3') || u.includes('x10') || u.includes('×10') || u.includes('10*3')) && value < 100;
    },
    convert: (value) => value * 1000,
    convertRange: (low, high) => ({ low: low * 1000, high: high * 1000 }),
  },
};

/**
 * Parse a reference range string like "150 - 410" or "0.7 - 2.04" or "<100"
 * Returns { low, high } or null
 */
function parseRefRange(rangeStr) {
  if (!rangeStr) return null;

  // Handle "150 - 410" or "150-410"
  const rangeMatch = rangeStr.match(/([\d.]+)\s*[-–—]\s*([\d.]+)/);
  if (rangeMatch) {
    return { low: parseFloat(rangeMatch[1]), high: parseFloat(rangeMatch[2]) };
  }

  // Handle "<100" or "< 100"
  const ltMatch = rangeStr.match(/<\s*([\d.]+)/);
  if (ltMatch) {
    return { low: 0, high: parseFloat(ltMatch[1]) };
  }

  // Handle ">10" or "> 10"
  const gtMatch = rangeStr.match(/>\s*([\d.]+)/);
  if (gtMatch) {
    return { low: parseFloat(gtMatch[1]), high: parseFloat(gtMatch[1]) * 10 };
  }

  return null;
}

/**
 * Map AI-extracted parameters to our PARAMETERS_DB using fuzzy matching.
 * Uses the REPORT's own reference ranges when available for accurate analysis.
 * Handles unit conversion when report uses different units than our DB.
 */
function mapToParametersDB(aiResults, PARAMETERS_DB, findParameter) {
  const mapped = [];
  const seen = new Set();

  for (const item of aiResults) {
    const param = findParameter(item.name);
    if (!param || seen.has(param.id)) continue;

    seen.add(param.id);

    let value = item.value;
    let reportRange = parseRefRange(item.refRange);
    let unit = item.unit || param.unit;

    // Check if unit conversion is needed
    const conversion = UNIT_CONVERSIONS[param.id];
    if (conversion && item.unit && conversion.detect(item.unit, item.value)) {
      // Report uses different units — convert to our DB's unit scale
      value = conversion.convert(item.value);
      if (reportRange) {
        reportRange = conversion.convertRange(reportRange.low, reportRange.high);
      }
      unit = param.unit; // Use our DB's unit after conversion
      console.log(`  Unit conversion for ${param.name}: ${item.value} ${item.unit} → ${value} ${param.unit}`);
    }

    // If report range seems wildly different in scale from our DB, use report range
    // (this catches cases where units differ but we don't have a specific conversion)
    if (reportRange && !conversion) {
      const dbRanges = param.ranges.default || Object.values(param.ranges)[0];
      if (dbRanges) {
        const dbMidpoint = (dbRanges.low + dbRanges.high) / 2;
        const reportMidpoint = (reportRange.low + reportRange.high) / 2;
        // If they differ by more than 10x, units are probably different — use report unit
        if (dbMidpoint > 0 && reportMidpoint > 0) {
          const ratio = dbMidpoint / reportMidpoint;
          if (ratio > 10 || ratio < 0.1) {
            console.log(`  Scale mismatch for ${param.name}: DB midpoint ${dbMidpoint}, report midpoint ${reportMidpoint}. Using report ranges.`);
            unit = item.unit || unit;
          }
        }
      }
    }

    mapped.push({
      parameterId: param.id,
      rawName: item.name,
      value: value,
      unit: unit,
      reportRange: reportRange, // The lab's own reference range (after any conversion)
      reportUnit: item.unit,    // Original unit from the report
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
