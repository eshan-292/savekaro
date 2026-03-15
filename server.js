require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const { PARAMETERS_DB, parseReportText, analyzeResults, getDemoAnalysis, MIN_VALID_PARAMETERS, findParameter } = require('./lib/sehat-scan');
const aiExtract = require('./lib/ai-extract');
const sastaIlaaj = require('./lib/sasta-ilaaj');
const thaaliScore = require('./lib/thaali-score');
const bijliSmart = require('./lib/bijli-smart');
const sabseSasta = require('./lib/sabse-sasta');

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

// Helper: Try AI extraction first, fall back to regex
async function extractWithAI(type, filePathOrText) {
  if (!aiExtract.isAvailable()) return null;
  try {
    let aiResults;
    if (type === 'pdf') aiResults = await aiExtract.extractFromPDF(filePathOrText);
    else if (type === 'image') aiResults = await aiExtract.extractFromImage(filePathOrText);
    else aiResults = await aiExtract.extractFromText(filePathOrText);

    if (!aiResults || aiResults.length === 0) return null;
    const mapped = aiExtract.mapToParametersDB(aiResults, PARAMETERS_DB, findParameter);
    return mapped.length > 0 ? mapped : null;
  } catch (err) {
    console.error('AI extraction failed, falling back to regex:', err.message);
    return null;
  }
}

// API: Analyze blood report
app.post('/api/sehat-scan/analyze', upload.single('report'), async (req, res) => {
  try {
    const gender = req.body.gender || 'default';
    const age = parseInt(req.body.age) || 30;

    // Helper to return analysis result
    function sendAnalysis(parsed, mode) {
      if (parsed.length === 0) {
        return res.json({
          success: true,
          mode: 'invalid',
          message: 'Could not find any blood test parameters. Please make sure you are uploading a blood test report.',
          parametersFound: 0
        });
      }
      if (parsed.length < (MIN_VALID_PARAMETERS || 1)) {
        return res.json({
          success: true,
          mode: 'insufficient',
          message: `Only found ${parsed.length} parameter(s). Try pasting the full report text or uploading a clearer image.`,
          parametersFound: parsed.length,
          partialParams: parsed.map(p => p.rawName)
        });
      }
      const analysis = analyzeResults(parsed, gender);
      return res.json({ success: true, mode, parametersFound: parsed.length, analysis, aiPowered: mode === 'ai' });
    }

    // If manual text was provided
    if (req.body.reportText) {
      // Try AI first
      const aiParsed = await extractWithAI('text', req.body.reportText);
      if (aiParsed) return sendAnalysis(aiParsed, 'ai');

      // Fallback to regex
      const parsed = parseReportText(req.body.reportText);
      return sendAnalysis(parsed, 'parsed');
    }

    // If file was uploaded
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const filePath = req.file.path;

      try {
        if (ext === '.pdf') {
          // Try AI extraction on PDF first
          const aiParsed = await extractWithAI('pdf', filePath);
          if (aiParsed) {
            fs.unlink(filePath, () => {});
            return sendAnalysis(aiParsed, 'ai');
          }

          // Fallback: extract text from PDF and parse with regex
          try {
            const pdfParse = require('pdf-parse');
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            const text = pdfData.text;
            const parsed = parseReportText(text);
            fs.unlink(filePath, () => {});

            if (parsed.length === 0) {
              return res.json({
                success: true,
                mode: 'no_text',
                message: 'Could not extract parameters from this PDF. Try pasting the report text directly.',
                extractedText: text.substring(0, 500),
                parametersFound: 0
              });
            }
            return sendAnalysis(parsed, 'parsed');
          } catch (pdfErr) {
            fs.unlink(filePath, () => {});
            return res.json({
              success: true,
              mode: 'no_text',
              message: 'Could not read this PDF. Try re-uploading or pasting the report text.',
              parametersFound: 0
            });
          }
        } else {
          // Image file — send to AI (Gemini Vision)
          const aiParsed = await extractWithAI('image', filePath);
          fs.unlink(filePath, () => {});

          if (aiParsed) return sendAnalysis(aiParsed, 'ai');

          // No AI available — tell user to paste text
          return res.json({
            success: true,
            mode: 'no_ai',
            message: 'Image analysis requires AI. Please paste the report text instead, or upload a PDF.',
            parametersFound: 0
          });
        }
      } catch (fileErr) {
        fs.unlink(filePath, () => {});
        throw fileErr;
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

// API: Demo analysis
app.get('/api/sehat-scan/demo', (req, res) => {
  res.json({ success: true, mode: 'demo', analysis: getDemoAnalysis() });
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

// ─── BijliSmart API ───
app.post('/api/bijli-smart/analyze', bijliSmart.handleAnalyze);

// ─── SabseSasta API ───
app.get('/api/sabse-sasta/search', sabseSasta.handleSearch);
app.get('/api/sabse-sasta/categories', sabseSasta.handleCategories);
app.post('/api/sabse-sasta/compare-cart', sabseSasta.handleCompareCart);
app.get('/api/sabse-sasta/product/:id', sabseSasta.handleGetProduct);

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
