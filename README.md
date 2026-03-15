# 🇮🇳 SaveKaro — India's Free Money-Saving Platform

> **5 powerful tools that help Indian families save ₹2,000–₹10,000 every month** on health, medicines, food, electricity, and groceries.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eshan-292/savekaro)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Live Tools

### 1. 🩸 SehatScan — Blood Test Report Analyzer
**Save ₹500 per doctor visit**

Upload your blood test report (PDF) or paste the text — get instant, detailed analysis of every parameter.

- **86 blood test parameters** with gender-adjusted normal ranges
- Health Score (0–100) with animated ring visualization
- Parameters sorted by severity (critical → borderline → normal)
- Category filters: Blood Count, Diabetes, Lipid Profile, Liver, Kidney, Thyroid, Vitamins, Iron, Inflammation
- **Indian diet tips** based on your abnormal values (e.g., "Eat palak/spinach for low iron", "Ragi for calcium")
- PDF download & WhatsApp share
- Demo report for first-time users

### 2. 💊 SastaIlaaj — Generic Medicine Finder
**Save up to 90% on medicines**

Search any branded medicine → find its exact generic alternative at a fraction of the price. Same salt, same effectiveness.

- **210+ medicines** across 12 categories
- Fuzzy search with instant results
- Salt composition lookup
- **Prescription builder** — add multiple medicines, see total savings
- Side effects database for 24+ popular medicines
- Browse by category (Pain/Fever, Diabetes, Heart, Antibiotics, etc.)
- Upload prescription photo support
- WhatsApp share per medicine + total prescription savings
- Animated savings counter (₹47.3 Cr saved by users)

### 3. 🍛 ThaaliScore — Indian Food Nutrition Scanner
**Know what your thali really contains**

Build your Indian thali and get instant nutrition analysis. Finally, a nutrition app that understands dal-chawal, rajma-rice, and paratha — not burgers and salads.

- **305+ Indian dishes** with accurate calorie/macro data
- 4 diet goals: Lose Weight, Maintain, Gain Muscle, Manage Diabetes
- **Quick Thali Templates** — one-click healthy North Indian, South Indian Breakfast, High Protein, Weight Loss thalis
- Serving size adjuster (0.5x, 1x, 1.5x, 2x)
- Canvas pie chart for macro breakdown
- RDA (Recommended Daily Allowance) progress bars
- Walking equivalent ("Walk 45 min to burn this meal")
- Healthier swap suggestions
- Goal-specific meal advice
- Daily meal tracker (Breakfast / Lunch / Dinner)
- 12 popular dishes shown on initial load
- WhatsApp sharing

### 4. ⚡ BijliSmart — Electricity Bill Optimizer
**Cut your bill by up to 40%**

Enter your appliances → get personalized savings tips, tariff breakdown, and solar ROI calculator.

- **11 Indian state tariff databases** (Maharashtra, Delhi, Karnataka, Tamil Nadu, UP, Gujarat, Rajasthan, MP, West Bengal, Telangana, Kerala)
- Quick presets: 1 BHK Bachelor (~150 units), 2 BHK Family (~350 units), 3 BHK Premium (~600 units)
- Detailed appliance form with icons (AC, fans, lights, geyser, fridge, washing machine, TV)
- Appliance-wise consumption donut chart
- Slab-wise tariff breakdown table
- **Ranked savings tips** with ₹ impact
- **Solar ROI calculator** with PM Surya Ghar subsidy (₹78,000 govt subsidy)
- Neighbor comparison (your bill vs. state average)
- Amazon upgrade recommendations (5-star AC, inverter fridge, etc.)
- Seasonal savings projection bar chart
- WhatsApp shareable savings card

### 5. 🛒 SabseSasta — Grocery Price Comparator
**Never overpay for groceries again**

Compare prices of 155+ grocery products across 7 platforms. Find the cheapest deal instantly.

- **7 platforms**: Blinkit, Zepto, BigBasket, Swiggy Instamart, JioMart, Amazon Fresh, DMart
- **155+ products** across 10 categories (Atta & Rice, Dal & Pulses, Oil & Ghee, Dairy, Snacks, Beverages, Personal Care, Cleaning, Baby Care, Masala & Spices)
- "Today's Best Deals" — top 6 products with biggest savings
- Smart suggestions ("People who buy atta also buy: oil, dal, sugar")
- Price comparison table with color coding (green = cheapest)
- **Smart Cart** with slide-up panel, quantity controls
- Cart comparison bar chart across all platforms
- **Smart split recommendation** — optimal platform combination for lowest total
- Budget tracker with progress bar
- Price alert placeholder
- WhatsApp cart sharing
- Animated savings counter (₹127 Cr saved)

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Backend** | Node.js + Express | Fast, lightweight, free hosting on Vercel |
| **Frontend** | Vanilla JS + Tailwind CSS (CDN) | Zero build step, instant load, no framework bloat |
| **Charts** | HTML5 Canvas | Custom pie, donut, bar charts — no Chart.js dependency |
| **File Upload** | Multer | PDF/image upload with 10MB limit |
| **PDF Parsing** | pdf-parse | Extract text from blood test PDFs |
| **Search** | Custom fuzzy matching | Typo-tolerant search across all databases |
| **Sharing** | WhatsApp Deep Links | Viral sharing built into every tool |
| **Deployment** | Vercel (Free Tier) | Serverless, auto-scaling, custom domains |

---

## 📊 Database Size

| Database | Records | Details |
|----------|---------|---------|
| Blood Test Parameters | 86 | Gender-adjusted ranges, categories, tips |
| Medicines | 210+ | Brand → Generic mapping, salt, manufacturer, MRP |
| Indian Dishes | 305+ | Calories, protein, carbs, fat, fiber, health score |
| State Electricity Tariffs | 11 | Slab-wise rates, subsidies, fixed charges |
| Grocery Products | 155+ | Prices across 7 platforms, categories |

---

## 🛠️ Installation & Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/eshan-292/savekaro.git
cd savekaro

# Install dependencies
npm install

# Start the server
node server.js
```

The app will be running at **http://localhost:3000**

### Available Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/sehat-scan` | Blood test analyzer |
| `/sasta-ilaaj` | Generic medicine finder |
| `/thaali-score` | Indian food nutrition scanner |
| `/bijli-smart` | Electricity bill optimizer |
| `/sabse-sasta` | Grocery price comparator |

### API Endpoints

```
# SehatScan
GET  /api/sehat-scan/parameters     — List all 86 supported parameters
POST /api/sehat-scan/analyze         — Analyze report (multipart form: report file + gender + age)
GET  /api/sehat-scan/demo            — Get demo analysis

# SastaIlaaj
POST /api/sasta-ilaaj/search         — Search medicines { query: "paracetamol" }
POST /api/sasta-ilaaj/by-salt        — Find by salt composition { salt: "Metformin" }
GET  /api/sasta-ilaaj/categories     — List all medicine categories

# ThaaliScore
GET  /api/thaali-score/search?q=dal  — Search dishes
GET  /api/thaali-score/dish/:id      — Get dish details
POST /api/thaali-score/analyze       — Analyze plate { items: [{id, servings}] }

# BijliSmart
POST /api/bijli-smart/analyze        — Analyze bill { state, ac, fans, lights, ... }

# SabseSasta
GET  /api/sabse-sasta/search?q=rice  — Search grocery products
GET  /api/sabse-sasta/categories     — List categories
GET  /api/sabse-sasta/product/:id    — Get product details
POST /api/sabse-sasta/compare-cart   — Compare cart across platforms { items: [{id, qty}] }
```

---

## 🚀 Deploy to Vercel (Free)

### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eshan-292/savekaro)

### Option B: CLI Deploy
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option C: GitHub Integration
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "Add New Project" → Import `savekaro`
3. Click Deploy — auto-detects `vercel.json`
4. Get your free URL: `savekaro.vercel.app`

---

## 📁 Project Structure

```
savekaro/
├── server.js              # Express server + all API routes
├── vercel.json            # Vercel deployment config
├── package.json           # Dependencies
├── .gitignore
│
├── lib/                   # Backend logic & databases
│   ├── sehat-scan.js      # 86 blood parameters, parser, analyzer
│   ├── sasta-ilaaj.js     # 210+ medicines, fuzzy search, salt lookup
│   ├── thaali-score.js    # 305+ dishes, RDA calc, healthier swaps
│   ├── bijli-smart.js     # 11 state tariffs, optimization engine, solar ROI
│   └── sabse-sasta.js     # 155+ products, 7 platforms, cart optimizer
│
├── public/                # Frontend (static HTML)
│   ├── index.html         # Landing page
│   ├── sehat-scan.html    # Blood test analyzer UI
│   ├── sasta-ilaaj.html   # Medicine finder UI
│   ├── thaali-score.html  # Nutrition scanner UI
│   ├── bijli-smart.html   # Bill optimizer UI
│   └── sabse-sasta.html   # Price comparator UI
│
└── uploads/               # Temporary file uploads (gitignored)
```

---

## 💰 Monetization Strategy

### Phase 1: Free Launch (Month 1)
- All tools free — build user base
- WhatsApp viral sharing for organic growth
- Target: 10,000+ users

### Phase 2: Revenue (Month 2-3)
| Revenue Stream | How | Expected |
|---------------|-----|----------|
| Google AdSense | Display ads on result pages | ₹5,000–15,000/month |
| Affiliate Links | Amazon product recommendations (BijliSmart) | ₹3,000–10,000/month |
| Pharmacy Partnerships | Commission on generic medicine orders | ₹10,000–50,000/month |
| Premium Features | AI-powered photo analysis, personalized reports | ₹20,000–1,00,000/month |

### Phase 3: Scale (Month 4+)
- Add AI features (Claude/GPT API) for premium tier
- Mobile app (React Native)
- B2B: Sell to corporates for employee wellness programs
- API access for third-party developers

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Generic medicine data inspired by [Jan Aushadhi](https://janaushadhi.gov.in/) government initiative
- Electricity tariffs sourced from respective state DISCOM websites
- Nutrition data curated from IFCT (Indian Food Composition Tables) and NIN databases
- Grocery prices are indicative and updated periodically

---

**Built with ❤️ for India** | **SaveKaro** — *Har paisa bachao, har decision samjho*
