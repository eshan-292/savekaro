// AI-Powered Blood Report Extraction using Google Gemini
// This replaces regex parsing with near-100% accuracy

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

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

let aiClient = null;

function getAIClient() {
  if (!GEMINI_API_KEY) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return aiClient;
}

/**
 * Extract blood test parameters from an image file using Gemini Vision
 * @param {string} filePath - Path to the image file
 * @returns {Promise<Array<{name: string, value: number}>>}
 */
async function extractFromImage(filePath) {
  const ai = getAIClient();
  if (!ai) throw new Error('GEMINI_API_KEY not configured');

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

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      { text: EXTRACTION_PROMPT },
    ],
  });

  return parseAIResponse(response.text);
}

/**
 * Extract blood test parameters from a PDF file using Gemini
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<Array<{name: string, value: number}>>}
 */
async function extractFromPDF(filePath) {
  const ai = getAIClient();
  if (!ai) throw new Error('GEMINI_API_KEY not configured');

  const pdfData = fs.readFileSync(filePath);
  const base64Pdf = pdfData.toString('base64');

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: base64Pdf,
        },
      },
      { text: EXTRACTION_PROMPT },
    ],
  });

  return parseAIResponse(response.text);
}

/**
 * Extract blood test parameters from raw text using Gemini
 * @param {string} text - OCR or pasted report text
 * @returns {Promise<Array<{name: string, value: number}>>}
 */
async function extractFromText(text) {
  const ai = getAIClient();
  if (!ai) throw new Error('GEMINI_API_KEY not configured');

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { text: EXTRACTION_PROMPT + '\n\nHere is the report text:\n\n' + text },
    ],
  });

  return parseAIResponse(response.text);
}

/**
 * Parse the AI response into structured parameter array
 */
function parseAIResponse(responseText) {
  if (!responseText) return [];

  // Clean up response — remove markdown code blocks if present
  let cleaned = responseText.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '');
  cleaned = cleaned.replace(/\n?```\s*$/i, '');
  cleaned = cleaned.trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) return [];

    // Validate and clean each entry
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
 * This bridges the AI extraction to our existing analysis engine
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
  return !!GEMINI_API_KEY;
}

module.exports = {
  extractFromImage,
  extractFromPDF,
  extractFromText,
  mapToParametersDB,
  isAvailable,
};
