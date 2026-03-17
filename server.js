require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const sehatScan = require('./lib/sehat-scan');
const { PARAMETERS_DB, parseReportText, analyzeResults, getDemoAnalysis, MIN_VALID_PARAMETERS, findParameter } = sehatScan;
const aiExtract = require('./lib/ai-extract');
const { generateDoctorSummary } = require('./lib/ai-extract');
const sastaIlaaj = require('./lib/sasta-ilaaj');
const thaaliScore = require('./lib/thaali-score');
const bijliSmart = require('./lib/bijli-smart');
const sabseSasta = require('./lib/sabse-sasta');
const { analyzePhotoBuffer, matchDishesToDB, detectMimeType } = require('./lib/photo-analyze');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.VERCEL === '1' ? '/tmp' : path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and image files are allowed'));
    }
  }
});

// ─── ROUTES ───

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SehatScan page
app.get('/sehat-scan', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sehat-scan.html'));
});

// API: Get all supported parameters
app.get('/api/sehat-scan/parameters', (req, res) => {
  const params = PARAMETERS_DB.map(p => ({
    id: p.id,
    name: p.name,
    unit: p.unit,
    category: p.category,
    normalRange: p.ranges.default ? `${p.ranges.default.low} - ${p.ranges.default.high}` : 'Varies'
  }));
  res.json({ success: true, count: params.length, parameters: params });
});

// Helper: AI extraction with multi-key + multi-model support
// Throws RATE_LIMIT_EXHAUSTED if all keys/models are exhausted
// Throws NO_API_KEY if no keys configured
// Returns null only if AI returns empty results (not a blood report)
async function extractWithAI(type, filePathOrText, gender) {
  if (!aiExtract.isAvailable()) {
    const err = new Error('NO_API_KEY');
    err.code = 'NO_API_KEY';
    throw err;
  }

  // First pass: extract all parameters
  let aiResults;
  if (type === 'pdf') aiResults = await aiExtract.extractFromPDF(filePathOrText);
  else if (type === 'image') aiResults = await aiExtract.extractFromImage(filePathOrText);
  else aiResults = await aiExtract.extractFromText(filePathOrText);

  if (!aiResults || aiResults.length === 0) return null;
  let mapped = aiExtract.mapToParametersDB(aiResults, PARAMETERS_DB, findParameter, gender);
  if (mapped.length === 0) return null;

  // Collect all raw AI results for unmapped tracking (combine first + follow-up passes)
  let allAiResults = [...aiResults];

  // Second pass: detect and fill missing parameters from expected groups
  const missingNames = aiExtract.detectMissingParameters(mapped);
  console.log(`[Extract] First pass: ${mapped.length} params mapped. Missing groups check: ${missingNames.length} missing.`);
  if (missingNames.length > 0) {
    console.log(`[FollowUp] Missing from expected groups: ${missingNames.join(', ')}`);
    console.log(`[FollowUp] Starting second Gemini call for ${missingNames.length} missing params...`);
    try {
      const followUpResults = await aiExtract.extractMissing(type, filePathOrText, missingNames);
      console.log(`[FollowUp] Second call returned ${followUpResults ? followUpResults.length : 0} raw results`);
      if (followUpResults && followUpResults.length > 0) {
        allAiResults = [...allAiResults, ...followUpResults];
        const followUpMapped = aiExtract.mapToParametersDB(followUpResults, PARAMETERS_DB, findParameter, gender);
        console.log(`[FollowUp] Mapped to ${followUpMapped.length} DB params`);
        // Merge — only add params not already found
        const existingIds = new Set(mapped.map(m => m.parameterId));
        const newParams = followUpMapped.filter(m => !existingIds.has(m.parameterId));
        if (newParams.length > 0) {
          console.log(`[FollowUp] ✓ Added ${newParams.length} new params: ${newParams.map(p => p.rawName).join(', ')}`);
          mapped = [...mapped, ...newParams];
        } else {
          console.log(`[FollowUp] All follow-up params were already found in first pass`);
        }
      }
    } catch (err) {
      console.log(`[FollowUp] ✗ Failed: ${err.message}`);
    }
  }

  // Get unmapped parameters (found in report but not in our DB)
  const unmapped = aiExtract.getUnmappedParams(allAiResults, findParameter);
  if (unmapped.length > 0) {
    console.log(`[Extract] ${unmapped.length} unmapped params: ${unmapped.map(u => u.name).join(', ')}`);
  }

  return { mapped, unmapped };
}

// API: Analyze blood report
app.post('/api/sehat-scan/analyze', upload.single('report'), async (req, res) => {
  try {
    const gender = req.body.gender || 'default';
    const age = parseInt(req.body.age) || 30;

    // Helper to return analysis result
    // parsed can be an array (legacy) or { mapped, unmapped } object
    async function sendAnalysis(parsed, mode) {
      let mappedParams, unmappedParams = [];
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.mapped) {
        mappedParams = parsed.mapped;
        unmappedParams = parsed.unmapped || [];
      } else {
        mappedParams = parsed;
      }

      if (mappedParams.length === 0) {
        return res.json({
          success: true,
          mode: 'invalid',
          message: 'Could not find any blood test parameters. Please make sure you are uploading a blood test report.',
          parametersFound: 0
        });
      }
      if (mappedParams.length < (MIN_VALID_PARAMETERS || 1)) {
        return res.json({
          success: true,
          mode: 'insufficient',
          message: `Only found ${mappedParams.length} parameter(s). Try pasting the full report text or uploading a clearer image.`,
          parametersFound: mappedParams.length,
          partialParams: mappedParams.map(p => p.rawName)
        });
      }
      const analysis = analyzeResults(mappedParams, gender);

      // Attach unmapped parameters to the analysis
      if (unmappedParams.length > 0) {
        analysis.unmappedParams = unmappedParams;
      }

      // Generate AI doctor summary (optional — won't block if it fails)
      try {
        analysis.doctorSummary = await generateDoctorSummary(analysis, gender, age);
      } catch (err) {
        console.error('Doctor summary generation failed (skipping):', err.message);
      }

      return res.json({ success: true, mode, parametersFound: mappedParams.length, analysis, aiPowered: mode === 'ai' });
    }

    // Helper: handle AI errors (rate limits, no key, etc.)
    function handleAIError(err, filePath) {
      if (filePath) fs.unlink(filePath, () => {});

      if (err.code === 'RATE_LIMIT_EXHAUSTED' || (err.message && err.message.includes('RATE_LIMIT_EXHAUSTED'))) {
        return res.json({
          success: true,
          mode: 'rate_limited',
          message: '⚠️ Daily free analysis limit reached! Our AI-powered analysis uses Google Gemini which has a daily free quota. The limit resets every 24 hours. Please try again tomorrow, or subscribe for unlimited scans.',
          parametersFound: 0,
          retryAfter: 'tomorrow'
        });
      }

      if (err.code === 'NO_API_KEY' || (err.message && err.message.includes('NO_API_KEY'))) {
        return res.json({
          success: true,
          mode: 'no_ai',
          message: 'AI analysis is not configured on this server. Please contact the administrator.',
          parametersFound: 0
        });
      }

      // Unknown AI error
      console.error('AI extraction error:', err);
      return res.json({
        success: true,
        mode: 'error',
        message: 'Something went wrong during analysis. Please try again in a minute.',
        parametersFound: 0
      });
    }

    // If manual text was provided
    if (req.body.reportText) {
      try {
        const aiParsed = await extractWithAI('text', req.body.reportText, gender);
        if (aiParsed) return await sendAnalysis(aiParsed, 'ai');

        // AI returned empty — not a blood report
        return res.json({
          success: true,
          mode: 'invalid',
          message: 'Could not find any blood test parameters. Please make sure you are pasting text from a blood test report.',
          parametersFound: 0
        });
      } catch (err) {
        return handleAIError(err, null);
      }
    }

    // If file was uploaded
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const filePath = req.file.path;

      try {
        const type = ext === '.pdf' ? 'pdf' : 'image';
        const aiParsed = await extractWithAI(type, filePath, gender);
        fs.unlink(filePath, () => {});

        if (aiParsed) return await sendAnalysis(aiParsed, 'ai');

        // AI returned empty — not a blood report
        return res.json({
          success: true,
          mode: 'invalid',
          message: 'Could not find any blood test parameters. Please make sure you are uploading a blood test report.',
          parametersFound: 0
        });
      } catch (err) {
        return handleAIError(err, filePath);
      }
    }

    // No file, no text — return demo
    return res.json({
      success: true,
      mode: 'demo',
      message: 'No report uploaded. Showing demo analysis.',
      analysis: getDemoAnalysis()
    });

  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ success: false, error: 'Analysis failed. Please try again.' });
  }
});

// API: AI status (check key health)
app.get('/api/sehat-scan/ai-status', (req, res) => {
  res.json({ success: true, ...aiExtract.getStatus() });
});

// API: Demo analysis
app.get('/api/sehat-scan/demo', (req, res) => {
  res.json({ success: true, mode: 'demo', analysis: getDemoAnalysis() });
});

// API: Clinical Risk Scores
app.post('/api/sehat-scan/risk-scores', (req, res) => {
  const { parameters, age, gender } = req.body || {};
  if (!parameters) return res.status(400).json({ error: 'No parameters provided' });
  res.json({ scores: sehatScan.calculateRiskScores(parameters, age, gender) });
});

// API: Medicine-Food Interactions
app.post('/api/sehat-scan/medicine-interactions', (req, res) => {
  const { parameters } = req.body || {};
  if (!parameters) return res.status(400).json({ error: 'No parameters provided' });
  res.json({ medicines: sehatScan.getPossibleMedicines(parameters) });
});

// API: Diet Recommendation Bridge (SehatScan → ThaaliScore)
app.post('/api/sehat-scan/diet-recommendation', (req, res) => {
  const { parameters } = req.body || {};
  if (!parameters) return res.status(400).json({ error: 'No parameters provided' });
  res.json(sehatScan.generateDietRecommendation(parameters));
});

// ─── Tool Pages ───
app.get('/sasta-ilaaj', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sasta-ilaaj.html'));
});
app.get('/thaali-score', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thaali-score.html'));
});
app.get('/bijli-smart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bijli-smart.html'));
});
app.get('/sabse-sasta', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sabse-sasta.html'));
});

// ─── SastaIlaaj API ───
app.post('/api/sasta-ilaaj/search', sastaIlaaj.handleSearch);
app.post('/api/sasta-ilaaj/by-salt', sastaIlaaj.handleBySalt);
app.get('/api/sasta-ilaaj/categories', sastaIlaaj.handleCategories);

// ─── ThaaliScore API ───
app.post('/api/thaali-score/analyze', thaaliScore.handleAnalyze);
app.get('/api/thaali-score/search', thaaliScore.handleSearch);
app.get('/api/thaali-score/dish/:id', thaaliScore.handleGetDish);
app.get('/api/thaali-score/combos', thaaliScore.handleCombos);
app.get('/api/thaali-score/combo/:comboId', (req, res) => thaaliScore.handleComboAnalyze(req, res));
app.post('/api/thaali-score/suggestions', thaaliScore.handleSuggestions);
app.get('/api/thaali-score/all-dishes', thaaliScore.handleAllDishes);
app.get('/api/thaali-score/festivals', thaaliScore.handleFestivals);
app.get('/api/thaali-score/festival/:festivalId/dishes', thaaliScore.handleFestivalDishes);
app.post('/api/thaali-score/nuskhe', thaaliScore.handleNuskhe);
app.post('/api/thaali-score/grocery-list', thaaliScore.handleGroceryList);

// ─── ThaaliScore Ayurveda & Budget ───
app.post('/api/thaali-score/prakriti', (req, res) => {
  const { answers } = req.body || {};
  if (!answers || !Array.isArray(answers)) return res.status(400).json({ error: 'Provide quiz answers array' });
  // Count dosha types
  const counts = { vata: 0, pitta: 0, kapha: 0 };
  answers.forEach(a => { if (counts[a] !== undefined) counts[a]++; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];
  const secondary = sorted[1][0];
  const rules = thaaliScore.prakritiDietRules[dominant];
  // Filter dishes
  const favored = thaaliScore.dishes.filter(d => {
    const score = rules.dishFilter(d);
    return score > 0;
  }).slice(0, 30).map(d => ({ id: d.id, name: d.name, category: d.category, veg: d.veg, cal: d.cal, healthScore: d.healthScore }));
  const avoid = thaaliScore.dishes.filter(d => {
    const score = rules.dishFilter(d);
    return score < 0;
  }).slice(0, 15).map(d => ({ id: d.id, name: d.name, category: d.category, cal: d.cal }));
  res.json({ dominant, secondary, counts, rules: { title: rules.title, emoji: rules.emoji, description: rules.description, favor: rules.favor, avoid: rules.avoid, mealTiming: rules.mealTiming, spices: rules.spices }, favored, avoid });
});

app.post('/api/thaali-score/budget-plan', thaaliScore.handleBudgetPlan);

// ─── ThaaliScore Substitutions ───
app.get('/api/thaali-score/substitutions/:id', (req, res) => {
  const dish = thaaliScore.dishes.find(d => d.id === parseInt(req.params.id));
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  const subs = thaaliScore.getSubstitutions ? thaaliScore.getSubstitutions(dish) : [];
  res.json({ dish: dish.name, substitutions: subs });
});

// ─── ThaaliScore Photo Mode (Gemini Vision) ───
app.post('/api/thaali-score/photo-analyze', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, error: 'No photo uploaded' });
  }

  const filePath = req.file.path;

  try {
    // Read image buffer
    const imageBuffer = fs.readFileSync(filePath);
    const mimeType = req.file.mimetype || undefined; // let detectMimeType handle fallback

    fs.unlink(filePath, () => {}); // Clean up

    // Use shared photo analysis
    const result = await analyzePhotoBuffer(imageBuffer, mimeType);

    if (result.error) {
      if (result.error === 'no_api_key') {
        return res.json({ success: false, error: 'AI not configured' });
      }
      if (result.error === 'rate_limited') {
        return res.json({ success: false, error: 'rate_limited', message: 'Daily free limit reached. Try again tomorrow.' });
      }
      if (result.error === 'parse_error') {
        return res.json({ success: false, error: 'parse_error', message: 'Could not parse AI response. Try again.' });
      }
      return res.json({ success: false, error: 'AI analysis failed' });
    }

    const identified = result.identified || [];

    if (identified.length === 0) {
      return res.json({ success: true, dishes: [], message: 'No Indian dishes identified in this photo. Try a clearer image of your meal.' });
    }

    // Match against dish database using shared function
    const { matched, unmatched } = matchDishesToDB(identified, thaaliScore.dishes);

    res.json({
      success: true,
      dishes: matched,
      unmatched: unmatched.length > 0 ? unmatched : undefined,
      message: matched.length > 0
        ? `Found ${matched.length} dish${matched.length > 1 ? 'es' : ''} in your photo!`
        : 'Could not match any dishes to our database. Try adding them manually.'
    });

  } catch(err) {
    fs.unlink(filePath, () => {});
    console.error('[PhotoMode] Error:', err);
    res.json({ success: false, error: 'Photo analysis failed. Please try again.' });
  }
});

app.get('/api/thaali-score/nutrient-rich', (req, res) => {
  // Filter dishes by a specific nutrient — used for SehatScan cross-link
  const { nutrient, veg, limit } = req.query;
  const validNutrients = ['iron', 'calcium', 'vitC', 'vitB12', 'folate', 'protein'];
  if (!nutrient || !validNutrients.includes(nutrient)) {
    return res.json({ error: 'Valid nutrients: iron, calcium, vitC, vitB12, folate, protein' });
  }
  let filtered = thaaliScore.dishes;
  if (veg === 'true') filtered = filtered.filter(d => d.veg);

  // Sort by the nutrient (protein is top-level, others are in micro)
  const sorted = [...filtered].sort((a, b) => {
    if (nutrient === 'protein') return b.protein - a.protein;
    const aVal = (a.micro && a.micro[nutrient]) || 0;
    const bVal = (b.micro && b.micro[nutrient]) || 0;
    return bVal - aVal;
  }).slice(0, parseInt(limit) || 15);

  res.json({
    nutrient,
    dishes: sorted.map(d => ({
      id: d.id, name: d.name, category: d.category, veg: d.veg,
      cal: d.cal, serving: d.serving,
      value: nutrient === 'protein' ? d.protein : (d.micro && d.micro[nutrient]) || 0,
      unit: nutrient === 'protein' ? 'g' : ['vitB12'].includes(nutrient) ? 'mcg' : ['folate'].includes(nutrient) ? 'mcg' : 'mg'
    }))
  });
});

// ─── BijliSmart API ───
app.post('/api/bijli-smart/analyze', bijliSmart.handleAnalyze);

// ─── SabseSasta API ───
app.get('/api/sabse-sasta/search', sabseSasta.handleSearch);
app.get('/api/sabse-sasta/categories', sabseSasta.handleCategories);
app.post('/api/sabse-sasta/compare-cart', sabseSasta.handleCompareCart);
app.get('/api/sabse-sasta/product/:id', sabseSasta.handleGetProduct);

// ─── WhatsApp Bot ───
const whatsappBot = require('./lib/whatsapp-bot');

app.post('/api/whatsapp/webhook', express.urlencoded({ extended: false }), (req, res) => {
  console.log('[WhatsApp] Incoming webhook:', { from: req.body.From, body: req.body.Body, numMedia: req.body.NumMedia });

  whatsappBot.handleWebhook(req, res, {
    dishes: thaaliScore.dishes,
    analyzePhoto: async (mediaUrl) => {
      console.log('[WhatsApp] analyzePhoto called, mediaUrl:', mediaUrl);

      // Download image from Twilio
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      let imgRes;
      try {
        if (sid && token) {
          const auth = Buffer.from(`${sid}:${token}`).toString('base64');
          imgRes = await fetch(mediaUrl, { headers: { 'Authorization': `Basic ${auth}` } });
        } else {
          imgRes = await fetch(mediaUrl);
        }
      } catch (fetchErr) {
        console.error('[WhatsApp] Failed to download image:', fetchErr.message);
        return { error: 'api_error' };
      }

      if (!imgRes.ok) {
        console.error('[WhatsApp] Image download failed:', imgRes.status, imgRes.statusText);
        return { error: 'api_error' };
      }

      const imgBuf = Buffer.from(await imgRes.arrayBuffer());
      const contentType = imgRes.headers.get('content-type') || undefined;

      // Use shared analysis (handles API keys, model rotation, MIME detection)
      const result = await analyzePhotoBuffer(imgBuf, contentType);

      if (result.error) {
        // Pass through distinct error types: 'no_api_key', 'rate_limited', 'api_error', 'parse_error'
        console.log('[WhatsApp] Photo analysis error:', result.error);
        return { error: result.error };
      }

      const identified = result.identified || [];
      if (identified.length === 0) {
        return { dishes: [] };
      }

      // Match against dish database using shared function
      const { matched } = matchDishesToDB(identified, thaaliScore.dishes);
      console.log(`[WhatsApp] Matched ${matched.length} dishes from ${identified.length} identified`);
      return { dishes: matched };
    }
  });
});

app.get('/api/whatsapp/webhook', (req, res) => {
  res.send('ThaaliScore WhatsApp Bot is active! 🍽️');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message || 'Something went wrong' });
});

// Only listen when running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`\n  SaveKaro is running at http://localhost:${PORT}\n`);
    console.log(`  Tools:`);
    console.log(`    SehatScan:    http://localhost:${PORT}/sehat-scan`);
    console.log(`    SastaIlaaj:   http://localhost:${PORT}/sasta-ilaaj`);
    console.log(`    ThaaliScore:  http://localhost:${PORT}/thaali-score`);
    console.log(`    BijliSmart:   http://localhost:${PORT}/bijli-smart`);
    console.log(`    SabseSasta:   http://localhost:${PORT}/sabse-sasta\n`);
  });
}

// Export for Vercel serverless
module.exports = app;
