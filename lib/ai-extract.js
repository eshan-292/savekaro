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

const EXTRACTION_PROMPT = `You are a medical lab report data extraction AI. Your job is to extract EVERY SINGLE test parameter from this report — miss nothing.

CRITICAL RULES:
1. Extract the test parameter name, its numeric RESULT value, the UNIT, and the NORMAL REFERENCE RANGE
2. Be extremely precise — a wrong value could mislead a patient about their health
3. If a value is not clearly readable, skip it rather than guess
4. Use the EXACT parameter name as printed in the report (e.g., "Platelet Count", "Total T3", "BUN", "Serum Urea" — do NOT rename or merge different tests)
5. For percentage values (like Neutrophils %), include the number only, unit should be "%"
6. Keep BUN (Blood Urea Nitrogen) and Serum Urea as SEPARATE parameters — they are different tests with different ranges
7. Keep Total T3 and Free T3 as SEPARATE parameters
8. For WBC differential, extract BOTH the percentage (%) AND the absolute count (×10³/µL or cells/µL) as separate entries
9. DO NOT skip any parameter just because it is normal — extract ALL of them

REFERENCE RANGE RULES — THIS IS CRITICAL:
Many lab reports show MULTI-TIER reference ranges. You MUST extract only the NORMAL/HEALTHY range, NOT borderline or high tiers.

Examples of correct extraction from multi-tier ranges:
- Total Cholesterol: "Desirable: <200, Borderline: 200-239, High: ≥240" → refRange: "0 - 200"
- LDL Cholesterol: "Optimal: <100, Near Optimal: 100-129, Borderline: 130-159" → refRange: "0 - 100"
- Triglycerides: "Normal: <150, Borderline: 150-199, High: 200-499" → refRange: "0 - 150"
- HDL Cholesterol: "Low: <40, Normal: 40-60, High: >60" → refRange: "40 - 200"
- Fasting Glucose: "Normal: 70-99, Pre-Diabetic: 100-125, Diabetic: ≥126" → refRange: "70 - 99"
- eGFR: "Normal: >90, Mild decrease: 60-89, Moderate: 30-59" → refRange: "90 - 200"
- SGOT/SGPT: "Normal: <31" or "Normal: <40" → refRange: "0 - 31" or "0 - 40"
- Bilirubin (Indirect): very low values (0.1-0.2) are clinically normal → refRange: "0 - 1.0"

GENERAL RULE: If the report says "Normal: <X" or "Desirable: <X", use "0 - X". If it says "Normal: >X", use "X - 999".
NEVER use borderline/high/abnormal tiers as the normal reference range.

MANDATORY EXTRACTION LIST — You MUST extract ALL of these if present in the report:
1. CBC: Hemoglobin, RBC Count, WBC Count, Platelet Count, Hematocrit/PCV, MCV, MCH, MCHC, RDW-CV, RDW-SD, MPV
2. WBC Differential — BOTH % AND Absolute for each:
   - Neutrophils %, Absolute Neutrophil Count
   - Lymphocytes %, Absolute Lymphocyte Count
   - Monocytes %, Absolute Monocyte Count
   - Eosinophils %, Absolute Eosinophil Count
   - Basophils %, Absolute Basophil Count
3. IRON STUDIES (extremely important, DO NOT SKIP):
   - Serum Iron
   - TIBC (Total Iron Binding Capacity)
   - UIBC (Unsaturated Iron Binding Capacity)
   - Transferrin Saturation / Iron Saturation (%)
   - Ferritin
4. Lipid Profile: Total Cholesterol, LDL, HDL, Triglycerides, VLDL, LDL/HDL Ratio, Non-HDL Cholesterol
5. Liver Function: SGOT/AST, SGPT/ALT, ALP, GGT, Bilirubin Total, Bilirubin Direct, Bilirubin Indirect, Total Protein, Albumin, Globulin, A/G Ratio
6. Kidney Function: BUN, Serum Urea/Blood Urea, Creatinine, Uric Acid, eGFR, BUN/Creatinine Ratio
7. Thyroid (DO NOT SKIP ANY): TSH, Total T3 / Triiodothyronine, Free T3, Total T4, Free T4
8. Diabetes: Fasting Glucose, HbA1c, Post Prandial Glucose, Fasting Insulin
9. Vitamins: Vitamin D, Vitamin B12, Folate/Folic Acid, Calcium
10. Urine Routine: Color, Appearance, pH, Specific Gravity, Protein, Glucose, Ketones, Bilirubin, Urobilinogen, RBC, WBC/Pus Cells, Epithelial Cells, Casts, Crystals
11. Any other parameters present in the report

COMMONLY MISSED — Double-check that you have NOT skipped these:
- T3 / Triiodothyronine (often labeled "Total T3" or just "T3" in thyroid panel)
- Serum Iron (in iron studies section)
- Transferrin Saturation / Iron Saturation %
- Serum Urea / Blood Urea (separate from BUN)
- HDL Cholesterol
- SGOT/AST and SGPT/ALT
- All absolute WBC counts (not just percentages)

12. Return ONLY valid JSON — no markdown, no explanation, no backticks

Return a JSON array with name, value, unit, and refRange:
[
  {"name": "Hemoglobin", "value": 10.3, "unit": "g/dL", "refRange": "12.0 - 15.0"},
  {"name": "Platelet Count", "value": 201, "unit": "×10³/µL", "refRange": "150 - 410"},
  {"name": "Total T3", "value": 0.59, "unit": "ng/mL", "refRange": "0.7 - 2.04"},
  {"name": "Serum Iron", "value": 31, "unit": "µg/dL", "refRange": "35 - 145"},
  {"name": "Iron Saturation", "value": 7, "unit": "%", "refRange": "15 - 50"},
  {"name": "Total Cholesterol", "value": 111, "unit": "mg/dL", "refRange": "0 - 200"},
  {"name": "Fasting Blood Sugar", "value": 100.6, "unit": "mg/dL", "refRange": "70 - 99"},
  {"name": "eGFR", "value": 120, "unit": "mL/min/1.73m²", "refRange": "90 - 200"},
  {"name": "SGOT", "value": 18.4, "unit": "U/L", "refRange": "0 - 31"},
  {"name": "HDL Cholesterol", "value": 40.9, "unit": "mg/dL", "refRange": "40 - 60"},
  {"name": "Absolute Lymphocyte Count", "value": 0.80, "unit": "×10³/µL", "refRange": "1.0 - 4.8"},
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
 * Validate AI-extracted reference range against our DB range.
 * Returns the validated range, or null if the AI range is clearly wrong.
 *
 * The AI sometimes picks the wrong tier from multi-tier lab ranges
 * (e.g., using "Borderline: 200-239" instead of "Desirable: <200" for cholesterol).
 * This function catches those errors.
 */
function validateReportRange(reportRange, dbRanges, value, paramName) {
  if (!reportRange || !dbRanges) return reportRange;

  const dbLow = dbRanges.low;
  const dbHigh = dbRanges.high;
  const rLow = reportRange.low;
  const rHigh = reportRange.high;

  // Check 1: If the value is well within DB normal range but outside report range,
  // the AI likely picked the wrong tier
  const valueInDb = value >= dbLow && value <= dbHigh;
  const valueOutOfReport = value < rLow || value > rHigh;

  if (valueInDb && valueOutOfReport) {
    // Value is normal by our DB but abnormal by AI's range — AI likely picked wrong tier
    console.log(`  ⚠ Range validation: ${paramName} value ${value} is normal in DB (${dbLow}-${dbHigh}) but abnormal in AI range (${rLow}-${rHigh}). Using DB range.`);
    return null; // Fall back to DB
  }

  // Check 2: For parameters where DB low is 0 (one-sided like cholesterol, LDL, triglycerides),
  // if AI's low > 0, it probably picked a non-normal tier (like "Borderline: 200-239")
  if (dbLow === 0 && rLow > dbHigh * 0.5) {
    console.log(`  ⚠ Range validation: ${paramName} AI range starts at ${rLow} but DB allows from 0. AI picked wrong tier. Using DB range.`);
    return null;
  }

  // Check 3: For parameters where DB high is very large (one-sided like eGFR >90, HDL),
  // if AI's high is much lower than DB high, it picked a disease tier
  if (dbHigh > 100 && rHigh < dbLow) {
    console.log(`  ⚠ Range validation: ${paramName} AI range high ${rHigh} < DB low ${dbLow}. AI picked wrong tier. Using DB range.`);
    return null;
  }

  // Check 4: Sanity — range must make sense (low < high, both non-negative)
  if (rLow > rHigh || rLow < 0) {
    console.log(`  ⚠ Range validation: ${paramName} invalid AI range ${rLow}-${rHigh}. Using DB range.`);
    return null;
  }

  // Check 5: If the scales are wildly different (>10x), units probably differ
  const dbMid = (dbLow + dbHigh) / 2;
  const rMid = (rLow + rHigh) / 2;
  if (dbMid > 0 && rMid > 0) {
    const ratio = dbMid / rMid;
    if (ratio > 10 || ratio < 0.1) {
      console.log(`  ⚠ Range validation: ${paramName} scale mismatch (DB mid: ${dbMid}, AI mid: ${rMid}). Using DB range.`);
      return null;
    }
  }

  return reportRange; // AI range passed validation
}

/**
 * Map AI-extracted parameters to our PARAMETERS_DB using fuzzy matching.
 * Uses the REPORT's own reference ranges when available for accurate analysis.
 * Validates AI ranges against our DB to catch multi-tier extraction errors.
 * Handles unit conversion when report uses different units than our DB.
 */
function mapToParametersDB(aiResults, PARAMETERS_DB, findParameter, gender) {
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

    // Validate the AI-extracted range against our DB
    const dbRanges = param.ranges[gender || 'default'] || param.ranges.default || Object.values(param.ranges)[0];
    reportRange = validateReportRange(reportRange, dbRanges, value, param.name);

    mapped.push({
      parameterId: param.id,
      rawName: item.name,
      value: value,
      unit: unit,
      reportRange: reportRange, // null means "use DB range" (AI range was invalid)
      reportUnit: item.unit,
    });
  }

  return mapped;
}

/**
 * Find parameters from AI results that don't match any entry in our PARAMETERS_DB.
 * These are valid test results the AI extracted but we don't have analysis logic for.
 */
function getUnmappedParams(aiResults, findParameter) {
  if (!aiResults || !Array.isArray(aiResults)) return [];

  const unmapped = [];
  for (const item of aiResults) {
    const param = findParameter(item.name);
    if (!param) {
      unmapped.push({
        name: item.name,
        value: item.value,
        unit: item.unit || '',
        refRange: item.refRange || '',
      });
    }
  }
  return unmapped;
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

// ─── Doctor Summary (Hinglish) ───

/**
 * Generate a friendly Hinglish doctor summary of blood test results using Gemini.
 * Falls back to a simple summary if AI is unavailable.
 */
async function generateDoctorSummary(analysis, gender, age) {
  if (!analysis || !analysis.parameters || analysis.parameters.length === 0) {
    return null;
  }

  const abnormalParams = analysis.parameters.filter(p => p.status !== 'normal');
  const normalParams = analysis.parameters.filter(p => p.status === 'normal');

  // Build parameter listing for the prompt
  const paramListing = analysis.parameters.map(p => {
    return `${p.name}: ${p.value} ${p.unit} (${p.status.toUpperCase()}, normal range: ${p.normalRange})`;
  }).join('\n');

  const abnormalListing = abnormalParams.map(p => {
    return `${p.name}: ${p.value} ${p.unit} (${p.status.toUpperCase()}, normal range: ${p.normalRange})`;
  }).join('\n');

  const genderLabel = gender === 'female' ? 'Female' : gender === 'male' ? 'Male' : 'Patient';

  const summaryPrompt = `You are a careful, friendly Indian doctor explaining blood test results to a patient in Hinglish (mix of Hindi and English).

Patient: ${genderLabel}, age ${age}

Blood Test Results:
${paramListing}

Abnormal Findings:
${abnormalListing || 'None — all parameters are normal!'}

Write a warm, measured, and honest summary in 3-4 short paragraphs:
1. Start with what's good — reassure them about normal findings
2. Explain the abnormal findings in simple language, but DO NOT overstate conclusions
3. Connect related findings where appropriate (e.g., low iron + low hemoglobin suggests iron deficiency)
4. Give 2-3 specific diet/lifestyle tips using Indian foods relevant to ONLY the abnormal findings
5. End with a gentle recommendation — not alarming language

CRITICAL MEDICAL ACCURACY RULES:
- Use "suggests" or "may indicate" instead of "confirmed" or "definitely means"
- Do NOT say "anemia confirmed" unless hemoglobin AND ferritin are both clearly abnormal. Say "pattern strongly suggests iron deficiency" instead
- If T3 is low but TSH and T4 are normal, do NOT call it hypothyroidism. Say "isolated low T3 — your doctor may want to monitor this, but TSH is normal which is reassuring"
- Do NOT suggest HIV testing for mildly low lymphocytes — that is alarmist and inappropriate
- Mildly abnormal values (within 20% of range boundary) should be described as "thoda sa" or "slightly" — not as urgent findings
- Only mention diet advice for nutrients that were actually TESTED and found abnormal. Do not suggest B12 foods if B12 was not tested
- Do NOT use words like "critical", "dangerous", "emergency", or "immediately" unless a value is truly life-threatening (e.g., hemoglobin below 7, glucose above 400, platelets below 50)

Rules:
- Use Hinglish naturally (like "aapka hemoglobin thoda kam hai")
- Use Indian food examples (palak, chukandar, dahi, amla, etc.)
- Keep it under 200 words
- DO NOT use any markdown formatting, headers, or bullet points — write in flowing paragraphs
- Address the patient directly as "aap"
- Be warm and supportive, not alarming
- IMPORTANT: Write ONLY in Roman/Latin script (English alphabet). Do NOT use Devanagari script (Hindi script like अ, आ, क, ख). Write Hindi words using English letters only (e.g., 'aapka' not 'आपका', 'meetha' not 'मीठा', 'palak' not 'पालक').`;

  // Try Gemini for AI-generated summary
  try {
    const keys = getApiKeys();
    if (keys.length === 0) {
      return buildFallbackSummary(analysis, abnormalParams, normalParams, genderLabel, age);
    }

    // Try each key × model combination (same as tryAllCombos but for text response)
    for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
      for (const model of MODELS) {
        if (isComboRateLimited(keyIdx, model)) continue;

        const client = getClient(keyIdx);
        if (!client) continue;

        try {
          console.log(`[DoctorSummary] Trying key #${keyIdx + 1} with model ${model}...`);
          const response = await client.models.generateContent({
            model,
            contents: [{ text: summaryPrompt }],
          });

          const text = response.text;
          if (text && text.trim().length > 0) {
            console.log(`[DoctorSummary] ✓ Success with key #${keyIdx + 1}, model ${model}`);
            // Strip any Devanagari characters that slipped through
            const cleanText = text.trim().replace(/[\u0900-\u097F\uA8E0-\uA8FF]+/g, '').replace(/\s{2,}/g, ' ');
            return cleanText;
          }
        } catch (err) {
          console.error(`[DoctorSummary] ✗ Key #${keyIdx + 1}, model ${model}: ${err.message}`);
          if (isRateLimitError(err)) {
            markComboRateLimited(keyIdx, model);
          } else {
            break; // Move to next key
          }
        }
      }
    }

    // All combos failed — use fallback
    return buildFallbackSummary(analysis, abnormalParams, normalParams, genderLabel, age);
  } catch (err) {
    console.error('[DoctorSummary] Error:', err.message);
    return buildFallbackSummary(analysis, abnormalParams, normalParams, genderLabel, age);
  }
}

/**
 * Build a simple fallback summary without AI when Gemini is unavailable.
 */
function buildFallbackSummary(analysis, abnormalParams, normalParams, genderLabel, age) {
  const parts = [];

  if (normalParams.length > 0) {
    parts.push(`Acchi baat yeh hai ki aapke ${normalParams.length} parameters normal range mein hain, toh overall health kaafi theek lag rahi hai.`);
  }

  const highParams = abnormalParams.filter(p => p.status === 'high' || p.status === 'critical_high');
  const lowParams = abnormalParams.filter(p => p.status === 'low' || p.status === 'critical_low');

  if (highParams.length > 0) {
    const names = highParams.map(p => p.name).join(', ');
    parts.push(`Aapka ${names} thoda zyada hai normal se. Isko manage karne ke liye balanced diet lein aur doctor se milein.`);
  }

  if (lowParams.length > 0) {
    const names = lowParams.map(p => p.name).join(', ');
    parts.push(`Aapka ${names} thoda kam hai. Palak, chukandar, dahi, aur amla jaise foods aapki diet mein zaroor shamil karein.`);
  }

  if (abnormalParams.length === 0) {
    parts.push(`Aapke saare results bilkul normal hain — bahut accha! Aise hi healthy lifestyle maintain karein, regular exercise karein aur balanced khana khaayein.`);
  } else {
    const hasCritical = abnormalParams.some(p => p.status.includes('critical'));
    if (hasCritical) {
      parts.push(`Kuch findings serious hain, toh please jaldi se doctor se milein. Yeh AI summary hai — proper medical advice ke liye apne doctor se zaroor consult karein.`);
    } else {
      parts.push(`Yeh findings minor hain aur diet aur lifestyle changes se manage ho sakti hain, lekin agar koi symptom ho toh doctor se zaroor milein.`);
    }
  }

  return parts.join('\n\n');
}

// ─── Follow-Up Extraction for Missing Parameters ───

// Parameter groups: if we found ANY from a group, we expect ALL from that group
const PARAMETER_GROUPS = {
  'iron_studies': {
    trigger: ['iron', 'tibc', 'ferritin', 'iron_saturation'],  // if any of these found
    expect: ['iron', 'tibc', 'ferritin', 'iron_saturation'],    // we expect all of these
    names: ['Serum Iron', 'TIBC', 'Ferritin', 'Iron Saturation / Transferrin Saturation']
  },
  'wbc_absolute': {
    trigger: ['neutrophils', 'lymphocytes', 'monocytes'],       // if differential % found
    expect: ['abs_neutrophil', 'abs_lymphocyte', 'abs_monocyte', 'abs_eosinophil', 'abs_basophil'],
    names: ['Absolute Neutrophil Count', 'Absolute Lymphocyte Count', 'Absolute Monocyte Count', 'Absolute Eosinophil Count', 'Absolute Basophil Count']
  },
  'kidney': {
    trigger: ['bun', 'creatinine', 'egfr'],
    expect: ['urea', 'bun', 'creatinine'],
    names: ['Serum Urea / Blood Urea', 'BUN', 'Creatinine']
  },
  'liver': {
    trigger: ['sgot', 'sgpt', 'bilirubin_total'],
    expect: ['sgot', 'sgpt', 'alp', 'bilirubin_total', 'total_protein', 'albumin', 'globulin'],
    names: ['SGOT/AST', 'SGPT/ALT', 'ALP', 'Bilirubin Total', 'Total Protein', 'Albumin', 'Globulin']
  },
  'lipid': {
    trigger: ['total_cholesterol', 'ldl'],
    expect: ['total_cholesterol', 'ldl', 'hdl', 'triglycerides', 'vldl'],
    names: ['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'VLDL']
  },
  'thyroid': {
    trigger: ['tsh', 't4', 't3', 'ft3', 'ft4'],               // if any thyroid marker found
    expect: ['tsh', 't3', 't4'],                                 // we expect at least these three
    names: ['TSH', 'Total T3 / Triiodothyronine', 'Total T4 / Thyroxine']
  }
};

/**
 * Detect which parameters are likely in the report but were missed by the first extraction.
 * Returns a list of missing parameter names to ask for in a follow-up call.
 */
function detectMissingParameters(mappedResults) {
  const foundIds = new Set(mappedResults.map(r => r.parameterId));
  const missing = [];

  for (const [groupName, group] of Object.entries(PARAMETER_GROUPS)) {
    // Check if ANY trigger parameter was found (meaning this section exists in the report)
    const hasTrigger = group.trigger.some(id => foundIds.has(id));
    if (!hasTrigger) continue;

    // Find expected parameters that weren't extracted
    for (let i = 0; i < group.expect.length; i++) {
      if (!foundIds.has(group.expect[i])) {
        missing.push(group.names[i]);
      }
    }
  }

  return missing;
}

const FOLLOWUP_PROMPT = `You are a medical lab report data extraction AI. The first pass missed some parameters.
Extract ONLY the following specific parameters from this report. Look carefully — they may be in tables, separate sections, or have slightly different names.

PARAMETERS TO FIND:
{MISSING_LIST}

Return a JSON array with name, value, unit, and refRange for each parameter you can find.
If a parameter is genuinely not in the report, skip it.
Use the NORMAL/HEALTHY reference range (not borderline/high tiers).
Return ONLY valid JSON — no markdown, no explanation.`;

/**
 * Make a follow-up extraction call for specific missing parameters.
 */
async function extractMissing(type, filePathOrText, missingNames) {
  if (missingNames.length === 0) return [];

  const prompt = FOLLOWUP_PROMPT.replace('{MISSING_LIST}', missingNames.map(n => `- ${n}`).join('\n'));

  try {
    let contents;
    if (type === 'pdf') {
      const pdfData = fs.readFileSync(filePathOrText);
      contents = [
        { inlineData: { mimeType: 'application/pdf', data: pdfData.toString('base64') } },
        { text: prompt },
      ];
    } else if (type === 'image') {
      const imageData = fs.readFileSync(filePathOrText);
      const ext = path.extname(filePathOrText).toLowerCase();
      const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
      contents = [
        { inlineData: { mimeType: mimeTypes[ext] || 'image/jpeg', data: imageData.toString('base64') } },
        { text: prompt },
      ];
    } else {
      contents = [{ text: prompt + '\n\nReport text:\n\n' + filePathOrText }];
    }

    return await tryAllCombos(() => contents);
  } catch (err) {
    console.log(`[FollowUp] Failed: ${err.message} — continuing with first-pass results`);
    return [];
  }
}

module.exports = {
  extractFromImage,
  extractFromPDF,
  extractFromText,
  mapToParametersDB,
  getUnmappedParams,
  isAvailable,
  getStatus,
  generateDoctorSummary,
  detectMissingParameters,
  extractMissing,
};
