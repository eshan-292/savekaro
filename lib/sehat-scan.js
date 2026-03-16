// SehatScan — Comprehensive Blood Test Analyzer
// Database of 80+ blood test parameters with normal ranges, explanations, and recommendations

const PARAMETERS_DB = [
  // ─── COMPLETE BLOOD COUNT (CBC) ───
  {
    id: 'hemoglobin',
    name: 'Hemoglobin (Hb)',
    aliases: ['hemoglobin', 'haemoglobin', 'hb', 'hgb', 'hb%'],
    unit: 'g/dL',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: {
      male: { low: 13.0, high: 17.5 },
      female: { low: 12.0, high: 15.5 },
      default: { low: 12.0, high: 17.5 }
    },
    highMeaning: 'High hemoglobin can mean dehydration, lung disease, or polycythemia. Zyada hemoglobin ka matlab hai ki khoon mein oxygen-carrying capacity zyada hai — par yeh dehydration ya phefdon ki problem bhi ho sakti hai.',
    lowMeaning: 'Low hemoglobin means anemia — you may feel tired, weak, breathless. Kam hemoglobin ka matlab anemia hai — thakan, kamzori, aur saans phoolna ho sakta hai. Iron-rich food khayein.',
    doctor: 'Hematologist',
    diet: 'Eat spinach (palak), beetroot (chukandar), pomegranate (anaar), dates (khajoor), jaggery (gud), liver, eggs. Vitamin C ke saath iron absorb hota hai — nimbu paani piyo.'
  },
  {
    id: 'rbc',
    name: 'Red Blood Cells (RBC)',
    aliases: ['rbc', 'red blood cells', 'red blood cell count', 'erythrocytes', 'erythrocyte count', 'rbc count', 'total rbc', 'total rbc count', 'rbc total', 'red cell count', 'r.b.c', 'rbc (red blood cells)'],
    unit: 'million/µL',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: {
      male: { low: 4.5, high: 5.5 },
      female: { low: 4.0, high: 5.0 },
      default: { low: 4.0, high: 5.5 }
    },
    highMeaning: 'High RBC can indicate dehydration, heart disease, or bone marrow issues. Zyada RBC matlab khoon zyada gaadhha hai.',
    lowMeaning: 'Low RBC means anemia. Kam RBC matlab sharir mein khoon ki kami hai. Iron aur folic acid lein.',
    doctor: 'Hematologist',
    diet: 'Iron-rich foods: palak, chukandar, anaar, rajma, chana. Vitamin B12 ke liye dairy products khayein.'
  },
  {
    id: 'wbc',
    name: 'White Blood Cells (WBC)',
    aliases: ['wbc', 'white blood cells', 'white blood cell count', 'leukocytes', 'wbc count', 'total wbc', 'tlc', 'total leucocyte count', 'total leukocyte count', 'total wbc count', 'wbc total', 'w.b.c', 'wbc (white blood cells)', 'white cell count', 'tc', 'total count'],
    unit: 'cells/µL',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: {
      default: { low: 4000, high: 11000 }
    },
    highMeaning: 'High WBC usually means infection or inflammation. Zyada WBC matlab sharir infection se lad raha hai. Agar bahut zyada hai toh blood cancer ki possibility bhi check karni chahiye.',
    lowMeaning: 'Low WBC means weak immunity. Kam WBC matlab immunity kamzor hai — infection ka risk zyada hai. Protein-rich food khayein.',
    doctor: 'General Physician / Hematologist',
    diet: 'Immunity boosting: haldi wala doodh, amla, tulsi, giloy, citrus fruits, protein-rich dal aur eggs.'
  },
  {
    id: 'platelets',
    name: 'Platelets',
    aliases: ['platelets', 'platelet count', 'plt', 'thrombocytes', 'platelet'],
    unit: '×10³/µL',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: {
      default: { low: 150, high: 410 }
    },
    highMeaning: 'High platelets can cause blood clots. Zyada platelets se khoon ke thakke ban sakte hain — heart attack aur stroke ka risk badhta hai.',
    lowMeaning: 'Low platelets means bleeding risk — dengue mein yeh bahut girte hain. Kam platelets se chot lagne par khoon zyada bahta hai. Papaya leaf juice peeyein.',
    doctor: 'Hematologist',
    diet: 'Papaya leaf juice, pomegranate (anaar), wheatgrass juice, pumpkin, kiwi. Avoid alcohol.'
  },
  {
    id: 'esr',
    name: 'ESR (Erythrocyte Sedimentation Rate)',
    aliases: ['esr', 'erythrocyte sedimentation rate', 'sed rate', 'sedimentation rate'],
    unit: 'mm/hr',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: {
      male: { low: 0, high: 15 },
      female: { low: 0, high: 20 },
      default: { low: 0, high: 20 }
    },
    highMeaning: 'High ESR means inflammation somewhere in the body — infection, autoimmune disease, or even cancer. Zyada ESR matlab sharir mein kahin sujan hai.',
    lowMeaning: 'Low ESR is generally normal. Kam ESR usually normal hai, tension ki baat nahi.',
    doctor: 'General Physician / Rheumatologist',
    diet: 'Anti-inflammatory foods: haldi, adrak, green tea, omega-3 (fish oil, akhrot). Processed food avoid karein.'
  },
  {
    id: 'mcv',
    name: 'MCV (Mean Corpuscular Volume)',
    aliases: ['mcv', 'mean corpuscular volume', 'mean cell volume'],
    unit: 'fL',
    category: 'Blood Count',
    subCategory: 'RBC Indices',
    ranges: { default: { low: 80, high: 100 } },
    highMeaning: 'High MCV means RBCs are too large — usually B12 or folate deficiency. Bade RBC matlab vitamin ki kami hai.',
    lowMeaning: 'Low MCV means small RBCs — usually iron deficiency anemia. Chhote RBC matlab iron ki kami hai.',
    doctor: 'Hematologist',
    diet: 'High MCV: B12 (dairy, eggs, fish), folate (palak, dal). Low MCV: iron-rich foods (palak, chukandar, dates).'
  },
  {
    id: 'mch',
    name: 'MCH (Mean Corpuscular Hemoglobin)',
    aliases: ['mch', 'mean corpuscular hemoglobin', 'mean cell hemoglobin'],
    unit: 'pg',
    category: 'Blood Count',
    subCategory: 'RBC Indices',
    ranges: { default: { low: 27, high: 33 } },
    highMeaning: 'High MCH — each RBC carries too much hemoglobin. Usually linked to B12/folate deficiency.',
    lowMeaning: 'Low MCH — each RBC has less hemoglobin. Iron deficiency likely.',
    doctor: 'Hematologist',
    diet: 'Iron-rich foods and vitamin B12 supplements as needed.'
  },
  {
    id: 'mchc',
    name: 'MCHC (Mean Corpuscular Hemoglobin Concentration)',
    aliases: ['mchc', 'mean corpuscular hemoglobin concentration'],
    unit: 'g/dL',
    category: 'Blood Count',
    subCategory: 'RBC Indices',
    ranges: { default: { low: 32, high: 36 } },
    highMeaning: 'High MCHC can indicate hereditary spherocytosis or hemolytic anemia.',
    lowMeaning: 'Low MCHC suggests iron deficiency anemia or thalassemia.',
    doctor: 'Hematologist',
    diet: 'Balanced diet with iron, B12, and folate-rich foods.'
  },
  {
    id: 'rdw',
    name: 'RDW (Red Cell Distribution Width)',
    aliases: ['rdw', 'red cell distribution width', 'rdw-cv', 'rdw cv'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'RBC Indices',
    ranges: { default: { low: 11.5, high: 14.5 } },
    highMeaning: 'High RDW means RBCs vary too much in size — indicates nutritional deficiency or mixed anemia.',
    lowMeaning: 'Low RDW is usually normal.',
    doctor: 'Hematologist',
    diet: 'Check iron, B12, and folate levels. Eat a balanced diet.'
  },
  {
    id: 'hematocrit',
    name: 'Hematocrit (HCT/PCV)',
    aliases: ['hematocrit', 'haematocrit', 'hct', 'pcv', 'packed cell volume'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: {
      male: { low: 38.3, high: 48.6 },
      female: { low: 35.5, high: 44.9 },
      default: { low: 35.5, high: 48.6 }
    },
    highMeaning: 'High hematocrit — blood is too thick. Dehydration ya polycythemia ho sakta hai.',
    lowMeaning: 'Low hematocrit — anemia. Khoon mein RBC kam hain.',
    doctor: 'Hematologist',
    diet: 'Hydration important. Iron-rich diet for low values.'
  },
  {
    id: 'neutrophils',
    name: 'Neutrophils',
    aliases: ['neutrophils', 'neutrophil', 'neutrophil%', 'neutrophils %', 'neut', 'neut%'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 40, high: 80 } },
    highMeaning: 'High neutrophils — bacterial infection likely. Sharir bacteria se lad raha hai.',
    lowMeaning: 'Low neutrophils — risk of infections. Immunity kamzor hai.',
    doctor: 'General Physician',
    diet: 'Immunity boosting foods: haldi, tulsi, amla, citrus fruits.'
  },
  {
    id: 'lymphocytes',
    name: 'Lymphocytes',
    aliases: ['lymphocytes', 'lymphocyte', 'lymphocyte%', 'lymph', 'lymph%'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 20, high: 40 } },
    highMeaning: 'High lymphocytes — viral infection or chronic inflammation. Viral infection hone ka sign hai.',
    lowMeaning: 'Low lymphocytes — can be due to stress, viral infection recovery, or certain medications. Mildly low values are often temporary and not concerning on their own.',
    doctor: 'General Physician / Immunologist',
    diet: 'Protein-rich diet, probiotics (dahi), zinc-rich foods (pumpkin seeds).'
  },
  {
    id: 'monocytes',
    name: 'Monocytes',
    aliases: ['monocytes', 'monocyte', 'monocyte%', 'mono', 'mono%'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 2, high: 8 } },
    highMeaning: 'High monocytes — chronic infection or autoimmune condition possible.',
    lowMeaning: 'Low monocytes — generally not a concern alone.',
    doctor: 'General Physician',
    diet: 'Anti-inflammatory diet with turmeric, ginger, green vegetables.',
    insignificantWhenLow: true
  },
  {
    id: 'eosinophils',
    name: 'Eosinophils',
    aliases: ['eosinophils', 'eosinophil', 'eosinophil%', 'eos', 'eos%'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 1, high: 4 } },
    insignificantWhenLow: true,
    highMeaning: 'High eosinophils — allergy or parasitic infection (pet mein keede). Very common in India. Deworming tablet lein.',
    lowMeaning: 'Low eosinophils — usually normal.',
    doctor: 'General Physician / Allergist',
    diet: 'Deworming medicine lein. Clean water piyen. Anti-allergic foods: honey, tulsi.'
  },
  {
    id: 'basophils',
    name: 'Basophils',
    aliases: ['basophils', 'basophil', 'basophil%', 'baso', 'baso%'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 0, high: 1 } },
    highMeaning: 'High basophils — may indicate allergic reaction or myeloproliferative disorder.',
    lowMeaning: 'Low basophils — normal in most cases.',
    doctor: 'Hematologist',
    diet: 'Generally no specific dietary changes needed.',
    insignificantWhenLow: true
  },

  // ─── DIABETES / BLOOD SUGAR ───
  {
    id: 'fasting_glucose',
    name: 'Fasting Blood Sugar (FBS)',
    aliases: ['fasting blood sugar', 'fasting sugar', 'fbs', 'fasting glucose', 'fasting blood glucose', 'fbg', 'glucose fasting', 'blood sugar fasting', 'fasting plasma glucose', 'fpg', 'sugar fasting', 'blood sugar'],
    unit: 'mg/dL',
    category: 'Diabetes',
    ranges: { default: { low: 70, high: 100 } },
    highMeaning: '100-125 = pre-diabetes, 126+ = diabetes. Zyada sugar matlab diabetes ka risk. 126 se upar hai toh diabetes confirm hai — turant doctor se milein.',
    lowMeaning: 'Below 70 = hypoglycemia. Kam sugar matlab energy nahi milegi — chakkar aa sakte hain. Meetha khayein aur doctor se milein.',
    doctor: 'Diabetologist / Endocrinologist',
    diet: 'Avoid maida, sugar, white rice. Eat jowar, bajra, ragi, oats. Dalchini (cinnamon) helpful. Methi dana (fenugreek) paani mein bhigo ke piyein.'
  },
  {
    id: 'pp_glucose',
    name: 'Post Prandial Blood Sugar (PPBS)',
    aliases: ['ppbs', 'pp blood sugar', 'post prandial', 'pp glucose', 'postprandial glucose', 'blood sugar pp', 'glucose pp', '2 hour glucose', 'pp sugar'],
    unit: 'mg/dL',
    category: 'Diabetes',
    ranges: { default: { low: 70, high: 140 } },
    highMeaning: '140-199 = pre-diabetes, 200+ = diabetes. Khana khane ke 2 ghante baad sugar itni zyada nahi honi chahiye.',
    lowMeaning: 'Low post-meal sugar is unusual. Check for insulin overdose if diabetic.',
    doctor: 'Diabetologist / Endocrinologist',
    diet: 'Small frequent meals. High fiber: daliya, oats, sabzi. Avoid rice + potato together. Walk 15 min after every meal.'
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    aliases: ['hba1c', 'glycated hemoglobin', 'a1c', 'hb a1c', 'glycosylated hemoglobin', 'glycohemoglobin'],
    unit: '%',
    category: 'Diabetes',
    ranges: { default: { low: 4.0, high: 5.6 } },
    highMeaning: '5.7-6.4% = pre-diabetes, 6.5%+ = diabetes. HbA1c pichle 3 mahine ki average sugar batata hai. Yeh ek baar ka test nahi — long-term picture dikhata hai.',
    lowMeaning: 'Very low HbA1c may indicate frequent hypoglycemia episodes.',
    doctor: 'Diabetologist / Endocrinologist',
    diet: 'Low glycemic index foods: brown rice, whole wheat, dals, vegetables. Avoid processed foods, sugary drinks, maida.'
  },

  // ─── LIPID PROFILE ───
  {
    id: 'total_cholesterol',
    name: 'Total Cholesterol',
    aliases: ['total cholesterol', 'cholesterol total', 'cholesterol', 'tc', 'serum cholesterol'],
    unit: 'mg/dL',
    category: 'Lipid Profile',
    ranges: { default: { low: 0, high: 200 } },
    highMeaning: '200-239 = borderline high, 240+ = high. Zyada cholesterol se heart attack aur stroke ka risk badhta hai. Naso mein blockage ho sakti hai.',
    lowMeaning: 'Very low cholesterol (below 120) can affect hormone production.',
    doctor: 'Cardiologist',
    diet: 'Avoid ghee excess, fried food, butter. Eat oats, almonds, walnuts, fish. Olive oil use karein. Flaxseeds (alsi) bahut helpful.'
  },
  {
    id: 'ldl',
    name: 'LDL Cholesterol (Bad Cholesterol)',
    aliases: ['ldl', 'ldl cholesterol', 'ldl-c', 'low density lipoprotein', 'bad cholesterol', 'ldl-cholesterol'],
    unit: 'mg/dL',
    category: 'Lipid Profile',
    ranges: { default: { low: 0, high: 100 } },
    highMeaning: 'High LDL = "bad" cholesterol — blocks arteries. Heart attack ka sabse bada reason. 100 se neeche rakhna zaroori hai.',
    lowMeaning: 'Low LDL is generally good.',
    doctor: 'Cardiologist',
    diet: 'Oats, almonds, walnuts, olive oil, flaxseeds. No fried food, no bakery items. Exercise daily 30 min.'
  },
  {
    id: 'hdl',
    name: 'HDL Cholesterol (Good Cholesterol)',
    aliases: ['hdl', 'hdl cholesterol', 'hdl-c', 'hdl c', 'high density lipoprotein', 'good cholesterol', 'hdl-cholesterol', 'hdl chol', 'hdl direct', 'cholesterol hdl', 'cholesterol, hdl', 'serum hdl'],
    unit: 'mg/dL',
    category: 'Lipid Profile',
    higherIsBetter: true, // Higher HDL is always better — never flag high values
    ranges: {
      male: { low: 40, high: 999 },
      female: { low: 50, high: 999 },
      default: { low: 40, high: 999 }
    },
    highMeaning: 'High HDL is GOOD! Yeh "good cholesterol" hai — jitna zyada utna achha. Heart ko protect karta hai.',
    lowMeaning: 'Low HDL = heart disease risk. "Good cholesterol" kam hai — exercise karein aur healthy fats khayein (nuts, olive oil, fish).',
    doctor: 'Cardiologist',
    diet: 'Exercise 30+ min daily. Nuts (almonds, walnuts), olive oil, avocado, fatty fish. Quit smoking if applicable.'
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    aliases: ['triglycerides', 'tg', 'triglyceride', 'serum triglycerides', 'trigs'],
    unit: 'mg/dL',
    category: 'Lipid Profile',
    ranges: { default: { low: 0, high: 150 } },
    highMeaning: '150-199 = borderline, 200-499 = high, 500+ = very high. Zyada triglycerides se pancreatitis aur heart disease ka risk. Sugar aur maida sabse bade dushman hain.',
    lowMeaning: 'Low triglycerides are generally fine.',
    doctor: 'Cardiologist',
    diet: 'Cut sugar completely. No white rice, maida, cold drinks. Eat fish, walnuts, flaxseeds. Exercise daily.'
  },
  {
    id: 'vldl',
    name: 'VLDL Cholesterol',
    aliases: ['vldl', 'vldl cholesterol', 'vldl-c', 'very low density lipoprotein', 'vldl calculated', 'vldl cholesterol calculated', 'calculated vldl'],
    unit: 'mg/dL',
    category: 'Lipid Profile',
    ranges: { default: { low: 2, high: 30 } },
    highMeaning: 'High VLDL — carries triglycerides, increases heart disease risk.',
    lowMeaning: 'Low VLDL is generally normal.',
    doctor: 'Cardiologist',
    diet: 'Same as triglycerides: reduce sugar, fried food, increase exercise.'
  },
  {
    id: 'cholesterol_hdl_ratio',
    name: 'Total Cholesterol/HDL Ratio',
    aliases: ['cholesterol ratio', 'tc/hdl ratio', 'cholesterol hdl ratio', 'chol/hdl'],
    unit: 'ratio',
    category: 'Lipid Profile',
    ranges: { default: { low: 0, high: 4.5 } },
    highMeaning: 'High ratio = higher heart disease risk. Ratio 4.5 se zyada hai toh risk badh gaya hai.',
    lowMeaning: 'Low ratio is excellent for heart health.',
    doctor: 'Cardiologist',
    diet: 'Increase HDL (exercise, nuts, fish) and decrease LDL (avoid fried food, processed food).'
  },

  // ─── LIVER FUNCTION TESTS (LFT) ───
  {
    id: 'sgot',
    name: 'SGOT / AST',
    aliases: ['sgot', 'ast', 'aspartate aminotransferase', 'aspartate transaminase', 'sgot/ast', 'ast/sgot', 'serum glutamic oxaloacetic transaminase', 'sgot (ast)', 'ast (sgot)', 'ast(sgot)', 'sgot(ast)', 'serum sgot', 's.g.o.t', 'serum ast'],
    unit: 'U/L',
    category: 'Liver Function',
    ranges: { default: { low: 0, high: 40 } },
    highMeaning: 'High SGOT — liver damage, hepatitis, fatty liver, or heart muscle damage. Liver pe stress hai — alcohol, fatty food, ya infection ki wajah se.',
    lowMeaning: 'Low SGOT is normal.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'No alcohol. Avoid fried/oily food. Eat light food — khichdi, dalia, fruits. Drink warm water with lemon.'
  },
  {
    id: 'sgpt',
    name: 'SGPT / ALT',
    aliases: ['sgpt', 'alt', 'alanine aminotransferase', 'alanine transaminase', 'sgpt/alt', 'alt/sgpt', 'serum glutamic pyruvic transaminase', 'sgpt (alt)', 'alt (sgpt)', 'alt(sgpt)', 'sgpt(alt)', 'serum sgpt', 's.g.p.t', 'serum alt'],
    unit: 'U/L',
    category: 'Liver Function',
    ranges: { default: { low: 0, high: 40 } },
    highMeaning: 'High SGPT — liver inflammation or damage. Fatty liver bahut common hai India mein. SGPT liver ka sabse important marker hai.',
    lowMeaning: 'Low SGPT is normal.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'No alcohol, no fried food. Green vegetables, papaya, amla juice. Walk 30 min daily. Weight kam karein.'
  },
  {
    id: 'alp',
    name: 'Alkaline Phosphatase (ALP)',
    aliases: ['alp', 'alkaline phosphatase', 'alk phos', 'alkp'],
    unit: 'U/L',
    category: 'Liver Function',
    ranges: { default: { low: 44, high: 147 } },
    highMeaning: 'High ALP — liver or bone disease. Bile duct blockage ya bone growth issues ho sakte hain.',
    lowMeaning: 'Low ALP — may indicate zinc or magnesium deficiency.',
    doctor: 'Gastroenterologist',
    diet: 'Balanced diet with adequate zinc (pumpkin seeds, cashews) and magnesium (banana, dark chocolate).'
  },
  {
    id: 'ggt',
    name: 'GGT (Gamma-Glutamyl Transferase)',
    aliases: ['ggt', 'gamma gt', 'gamma glutamyl transferase', 'gamma-glutamyl transpeptidase', 'ggtp'],
    unit: 'U/L',
    category: 'Liver Function',
    ranges: {
      male: { low: 0, high: 55 },
      female: { low: 0, high: 38 },
      default: { low: 0, high: 55 }
    },
    highMeaning: 'High GGT — alcohol use, fatty liver, or bile duct problems. Alcohol aur fatty liver ka best marker hai.',
    lowMeaning: 'Low GGT is normal.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'Stop alcohol completely. Green tea, coffee (moderate), cruciferous vegetables (broccoli, gobhi).'
  },
  {
    id: 'bilirubin_total',
    name: 'Bilirubin (Total)',
    aliases: ['bilirubin', 'total bilirubin', 'bilirubin total', 'tbili', 't.bilirubin', 'serum bilirubin'],
    unit: 'mg/dL',
    category: 'Liver Function',
    ranges: { default: { low: 0, high: 1.2 } },
    highMeaning: 'High bilirubin — jaundice (piliya). Aankhein aur skin peeli ho jaati hain. Liver ki problem ya RBC zyada toot rahe hain.',
    lowMeaning: 'Low bilirubin is normal.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'Light diet: khichdi, dalia, coconut water. Sugarcane juice (ganne ka ras) traditional remedy. Avoid oil, spices, alcohol.'
  },
  {
    id: 'bilirubin_direct',
    name: 'Bilirubin (Direct)',
    aliases: ['direct bilirubin', 'bilirubin direct', 'conjugated bilirubin', 'dbili', 'd.bilirubin'],
    unit: 'mg/dL',
    category: 'Liver Function',
    ranges: { default: { low: 0, high: 0.3 } },
    highMeaning: 'High direct bilirubin — bile duct obstruction or liver disease.',
    lowMeaning: 'Low direct bilirubin is normal.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'Same as total bilirubin — light diet, avoid oily food, stay hydrated.'
  },
  {
    id: 'bilirubin_indirect',
    name: 'Bilirubin (Indirect)',
    aliases: ['indirect bilirubin', 'bilirubin indirect', 'unconjugated bilirubin'],
    unit: 'mg/dL',
    category: 'Liver Function',
    ranges: { default: { low: 0, high: 1.0 } },
    highMeaning: 'High indirect bilirubin — hemolytic anemia or Gilbert syndrome. RBC zyada toot rahe hain.',
    lowMeaning: 'Low indirect bilirubin is normal — clinically insignificant.',
    doctor: 'Hematologist / Gastroenterologist',
    diet: 'Hydration important. Iron and folate rich foods if hemolytic anemia.',
    insignificantWhenLow: true
  },
  {
    id: 'total_protein',
    name: 'Total Protein',
    aliases: ['total protein', 'serum protein', 'protein total', 'tp'],
    unit: 'g/dL',
    category: 'Liver Function',
    ranges: { default: { low: 6.0, high: 8.3 } },
    highMeaning: 'High protein — dehydration or chronic infection/inflammation.',
    lowMeaning: 'Low protein — liver disease, kidney disease, or malnutrition. Protein ki kami hai — daal, paneer, eggs, chicken khayein.',
    doctor: 'General Physician',
    diet: 'Protein-rich: dal, rajma, chole, paneer, eggs, chicken, fish, soybean, sprouts (ankurit moong).'
  },
  {
    id: 'albumin',
    name: 'Albumin',
    aliases: ['albumin', 'serum albumin', 'alb'],
    unit: 'g/dL',
    category: 'Liver Function',
    ranges: { default: { low: 3.5, high: 5.5 } },
    highMeaning: 'High albumin — usually dehydration.',
    lowMeaning: 'Low albumin — liver disease, kidney disease, or poor nutrition. Bahut important protein hai — kam hai toh liver check karwayein.',
    doctor: 'Gastroenterologist',
    diet: 'High quality protein: eggs, fish, paneer, whey protein. Avoid alcohol.'
  },
  {
    id: 'globulin',
    name: 'Globulin',
    aliases: ['globulin', 'serum globulin', 'calculated globulin', 'globulin calculated', 'globulin serum'],
    unit: 'g/dL',
    category: 'Liver Function',
    ranges: { default: { low: 2.0, high: 3.5 } },
    highMeaning: 'High globulin — chronic infection, inflammation, or liver disease.',
    lowMeaning: 'Low globulin — immune deficiency or kidney/liver issues.',
    doctor: 'General Physician',
    diet: 'Balanced protein diet. Immunity boosting foods.'
  },
  {
    id: 'ag_ratio',
    name: 'A/G Ratio (Albumin/Globulin)',
    aliases: ['a/g ratio', 'ag ratio', 'albumin globulin ratio', 'a:g ratio', 'a/g ratio calculated', 'calculated a/g ratio', 'albumin/globulin ratio', 'alb/glob ratio'],
    unit: 'ratio',
    category: 'Liver Function',
    ranges: { default: { low: 1.0, high: 2.5 } },
    highMeaning: 'High A/G ratio — generally not concerning.',
    lowMeaning: 'Low A/G ratio — liver disease, kidney disease, or autoimmune conditions.',
    doctor: 'Gastroenterologist',
    diet: 'Address underlying liver or kidney issues. Balanced protein intake.'
  },

  // ─── KIDNEY FUNCTION TESTS (KFT/RFT) ───
  {
    id: 'creatinine',
    name: 'Creatinine',
    aliases: ['creatinine', 'serum creatinine', 'creat', 's.creatinine', 'sr creatinine'],
    unit: 'mg/dL',
    category: 'Kidney Function',
    ranges: {
      male: { low: 0.7, high: 1.3 },
      female: { low: 0.6, high: 1.1 },
      default: { low: 0.6, high: 1.3 }
    },
    highMeaning: 'High creatinine — kidney damage. Kidney sahi se filter nahi kar rahi. Bahut zyada hai toh dialysis ki zaroorat pad sakti hai.',
    lowMeaning: 'Low creatinine — low muscle mass. Usually not a concern unless very low.',
    doctor: 'Nephrologist',
    diet: 'High creatinine: Reduce protein intake (especially non-veg). Drink plenty of water. Avoid painkillers (Brufen, Combiflam). Low salt diet. Low creatinine: Usually not concerning — maintain balanced protein intake and regular exercise.'
  },
  {
    id: 'bun',
    name: 'BUN (Blood Urea Nitrogen)',
    aliases: ['bun', 'blood urea nitrogen', 'urea nitrogen'],
    unit: 'mg/dL',
    category: 'Kidney Function',
    ranges: { default: { low: 6, high: 20 } },
    highMeaning: 'High BUN — kidney not filtering properly. Dehydration bhi ho sakta hai. Paani zyada piyein.',
    lowMeaning: 'Low BUN — can be due to low protein diet, liver issues, or overhydration. Often not concerning if mildly low.',
    doctor: 'Nephrologist',
    diet: 'High BUN: Drink 3-4 liters water daily. Reduce non-veg protein. Low salt diet. Avoid processed food. Low BUN: Ensure adequate protein in diet (dal, paneer, eggs). Usually not a concern if mildly low.'
  },
  {
    id: 'urea',
    name: 'Serum Urea',
    aliases: ['urea', 'blood urea', 'serum urea', 'urea serum', 'urea, serum', 's.urea', 'sr urea', 'sr. urea', 'urea blood', 'urea, blood'],
    unit: 'mg/dL',
    category: 'Kidney Function',
    ranges: { default: { low: 15, high: 48 } },
    highMeaning: 'High urea — kidney not filtering properly. Dehydration bhi ho sakta hai. Paani zyada piyein.',
    lowMeaning: 'Low urea — can be due to low protein diet, liver issues, or overhydration. Mildly low values are often not concerning.',
    doctor: 'Nephrologist',
    diet: 'High urea: Drink 3-4 liters water daily. Reduce non-veg protein. Low salt diet. Avoid processed food. Low urea: Ensure balanced protein intake (dal, paneer, eggs, sprouts). Usually not alarming if mildly low.'
  },
  {
    id: 'uric_acid',
    name: 'Uric Acid',
    aliases: ['uric acid', 'serum uric acid', 'urate', 's.uric acid'],
    unit: 'mg/dL',
    category: 'Kidney Function',
    ranges: {
      male: { low: 3.4, high: 7.0 },
      female: { low: 2.4, high: 6.0 },
      default: { low: 2.4, high: 7.0 }
    },
    highMeaning: 'High uric acid — gout (gathiya) risk. Joints mein dard hota hai, especially big toe. Kidney stones bhi ban sakte hain.',
    lowMeaning: 'Low uric acid — usually not a concern.',
    doctor: 'Rheumatologist / Nephrologist',
    diet: 'Avoid: red meat, organ meat, beer, seafood, rajma, chole. Drink lots of water. Cherry juice helpful.'
  },
  {
    id: 'egfr',
    name: 'eGFR (Estimated Glomerular Filtration Rate)',
    aliases: ['egfr', 'gfr', 'glomerular filtration rate', 'estimated gfr', 'egfr ckd-epi', 'egfr ckd epi', 'egfr by ckd-epi', 'egfr mdrd', 'egfr by mdrd', 'estimated glomerular filtration rate'],
    unit: 'mL/min/1.73m²',
    category: 'Kidney Function',
    ranges: { default: { low: 90, high: 999 } },
    higherIsBetter: true, // eGFR above 90 is always healthy — never flag high values
    highMeaning: 'High eGFR is perfectly normal — your kidneys are working excellently!',
    lowMeaning: 'Low eGFR — kidney damage. Below 60 = Stage 3 kidney disease. Below 15 = kidney failure. Kidney doctor se turant milein.',
    doctor: 'Nephrologist',
    diet: 'Low eGFR: Low salt, low potassium (avoid banana, coconut water). Limit protein. Stay hydrated. High eGFR: No dietary changes needed — kidneys are working well!'
  },

  // ─── THYROID FUNCTION TESTS ───
  {
    id: 'tsh',
    name: 'TSH (Thyroid Stimulating Hormone)',
    aliases: ['tsh', 'thyroid stimulating hormone', 'thyrotropin', 'serum tsh', 's.tsh'],
    unit: 'mIU/L',
    category: 'Thyroid',
    ranges: { default: { low: 0.4, high: 4.0 } },
    highMeaning: 'High TSH = hypothyroidism (underactive thyroid). Weight badhna, thakan, thand lagana, hair fall, periods irregular. India mein bahut common hai especially women mein.',
    lowMeaning: 'Low TSH = hyperthyroidism (overactive thyroid). Weight kam hona, dhadkan tez, haath kaapna, anxiety.',
    doctor: 'Endocrinologist',
    diet: 'Hypothyroid: avoid soy, raw cabbage/cauliflower. Eat selenium-rich foods (Brazil nuts). Iodized salt use karein. Hyperthyroid: avoid excess iodine, caffeine.'
  },
  {
    id: 't3',
    name: 'T3 (Triiodothyronine)',
    aliases: ['t3', 'triiodothyronine', 'total t3', 'serum t3', 't3 total', 't3 serum', 't3, total', 't3 (total)', 'tri iodothyronine', 'triiodothyronine t3', 'triiodothyronine (t3)', 't.t3'],
    unit: 'ng/mL',
    category: 'Thyroid',
    ranges: { default: { low: 0.6, high: 2.02 } },
    highMeaning: 'High T3 — hyperthyroidism. Metabolism bahut tez hai.',
    lowMeaning: 'Low T3 alone — may indicate non-thyroidal illness or stress. If TSH and T4 are normal, isolated low T3 is usually NOT hypothyroidism. Follow up with your doctor but don\'t panic.',
    doctor: 'Endocrinologist',
    diet: 'Balanced iodine intake. Selenium-rich foods. Avoid processed food.'
  },
  {
    id: 'ft3',
    name: 'Free T3',
    aliases: ['ft3', 'free t3', 'free triiodothyronine'],
    unit: 'pg/mL',
    category: 'Thyroid',
    ranges: { default: { low: 2.0, high: 4.4 } },
    highMeaning: 'High Free T3 — hyperthyroidism. Metabolism bahut tez hai.',
    lowMeaning: 'Low Free T3 — hypothyroidism or sick euthyroid syndrome.',
    doctor: 'Endocrinologist',
    diet: 'Balanced iodine intake. Selenium-rich foods. Avoid processed food.'
  },
  {
    id: 't4',
    name: 'T4 (Thyroxine)',
    aliases: ['t4', 'thyroxine', 'total t4', 'serum t4'],
    unit: 'µg/dL',
    category: 'Thyroid',
    ranges: { default: { low: 5.0, high: 12.0 } },
    highMeaning: 'High T4 — hyperthyroidism. Overactive thyroid.',
    lowMeaning: 'Low T4 — hypothyroidism. Thyroid hormone kam bana raha hai.',
    doctor: 'Endocrinologist',
    diet: 'Iodized salt, selenium foods. Ashwagandha may help (consult doctor first).'
  },
  {
    id: 'ft4',
    name: 'Free T4',
    aliases: ['ft4', 'free t4', 'free thyroxine'],
    unit: 'ng/dL',
    category: 'Thyroid',
    ranges: { default: { low: 0.8, high: 1.8 } },
    highMeaning: 'High Free T4 — hyperthyroidism. Overactive thyroid.',
    lowMeaning: 'Low Free T4 — hypothyroidism. Thyroid hormone kam bana raha hai.',
    doctor: 'Endocrinologist',
    diet: 'Iodized salt, selenium foods. Ashwagandha may help (consult doctor first).'
  },

  // ─── VITAMINS & MINERALS ───
  {
    id: 'vitamin_d',
    name: 'Vitamin D (25-Hydroxy)',
    aliases: ['vitamin d', 'vit d', 'vitamin d3', '25-hydroxy vitamin d', '25 oh vitamin d', '25-oh-d', 'cholecalciferol', 'vit d3', '25 hydroxy', 'vitamin d 25 hydroxy'],
    unit: 'ng/mL',
    category: 'Vitamins',
    ranges: { default: { low: 30, high: 100 } },
    highMeaning: 'Very high vitamin D (above 100) can be toxic. Supplement band karein.',
    lowMeaning: 'Low vitamin D — EXTREMELY common in India (80%+ Indians are deficient). Haddiyon mein dard, kamzori, depression, hair fall. Dhoop mein 20-30 min baithein roz.',
    doctor: 'Orthopedic / Endocrinologist',
    diet: 'Morning sunlight 20-30 min (before 10 AM). Supplements usually needed (60,000 IU weekly sachets). Egg yolks, fatty fish, fortified milk.'
  },
  {
    id: 'vitamin_b12',
    name: 'Vitamin B12',
    aliases: ['vitamin b12', 'vit b12', 'b12', 'cobalamin', 'cyanocobalamin', 'serum b12'],
    unit: 'pg/mL',
    category: 'Vitamins',
    ranges: { default: { low: 200, high: 900 } },
    highMeaning: 'Very high B12 is usually not harmful but worth checking liver function.',
    lowMeaning: 'Low B12 — very common in vegetarian Indians! Haath-pair mein jhunjhunahat, thakan, dimag dhundla, depression. Vegetarians ko supplement lena zaroori hai.',
    doctor: 'General Physician / Neurologist',
    diet: 'Non-veg: liver, fish, eggs, mutton. Veg: fortified cereals, supplements (methylcobalamin). B12 injections if very low.'
  },
  {
    id: 'iron',
    name: 'Serum Iron',
    aliases: ['iron', 'serum iron', 'iron serum', 'iron, serum', 'fe', 'iron level', 's.iron', 'sr iron', 'se iron', 'sr. iron', 'se. iron'],
    unit: 'µg/dL',
    category: 'Vitamins',
    subCategory: 'Iron Studies',
    ranges: {
      male: { low: 60, high: 170 },
      female: { low: 50, high: 150 },
      default: { low: 50, high: 170 }
    },
    highMeaning: 'High iron — hemochromatosis possible. Liver mein iron jama ho sakta hai.',
    lowMeaning: 'Low iron — iron deficiency anemia. Bahut common in Indian women. Thakan, kamzori, pale skin, breathlessness.',
    doctor: 'Hematologist',
    diet: 'Iron-rich: palak, chukandar, anaar, dates, jaggery, ragi. Iron + vitamin C saath mein lein (nimbu, amla). Chai/coffee avoid karein iron wale food ke saath.'
  },
  {
    id: 'ferritin',
    name: 'Ferritin',
    aliases: ['ferritin', 'serum ferritin', 's.ferritin'],
    unit: 'ng/mL',
    category: 'Vitamins',
    subCategory: 'Iron Studies',
    ranges: {
      male: { low: 20, high: 250 },
      female: { low: 10, high: 120 },
      default: { low: 10, high: 250 }
    },
    highMeaning: 'High ferritin — iron overload, inflammation, or liver disease.',
    lowMeaning: 'Low ferritin — iron stores depleted. Even if hemoglobin is normal, you may need iron supplements.',
    doctor: 'Hematologist',
    diet: 'Same as iron deficiency. Ferritin is the iron "bank balance" — needs to be replenished.'
  },
  {
    id: 'tibc',
    name: 'TIBC (Total Iron Binding Capacity)',
    aliases: ['tibc', 'total iron binding capacity', 'iron binding capacity'],
    unit: 'µg/dL',
    category: 'Vitamins',
    subCategory: 'Iron Studies',
    ranges: { default: { low: 250, high: 370 } },
    highMeaning: 'High TIBC — body needs more iron. Iron deficiency anemia.',
    lowMeaning: 'Low TIBC — iron overload, liver disease, or chronic inflammation.',
    doctor: 'Hematologist',
    diet: 'If high TIBC: increase iron intake. If low: reduce iron-rich foods.'
  },
  {
    id: 'calcium',
    name: 'Calcium',
    aliases: ['calcium', 'serum calcium', 'ca', 'total calcium', 'ca++', 'calcium total', 's.calcium'],
    unit: 'mg/dL',
    category: 'Vitamins',
    ranges: { default: { low: 8.5, high: 10.5 } },
    highMeaning: 'High calcium — parathyroid problem, kidney stones risk, or vitamin D overdose.',
    lowMeaning: 'Low calcium — muscle cramps, tingling in fingers, weak bones. Doodh piyo, paneer khao, ragi khao.',
    doctor: 'Endocrinologist / Orthopedic',
    diet: 'Dairy: doodh, dahi, paneer, chaas. Ragi, sesame seeds (til), almonds. Vitamin D bhi check karwayein — bina Vit D ke calcium absorb nahi hota.'
  },
  {
    id: 'phosphorus',
    name: 'Phosphorus',
    aliases: ['phosphorus', 'phosphate', 'serum phosphorus', 'inorganic phosphorus'],
    unit: 'mg/dL',
    category: 'Vitamins',
    ranges: { default: { low: 2.5, high: 4.5 } },
    highMeaning: 'High phosphorus — kidney problems or hypoparathyroidism.',
    lowMeaning: 'Low phosphorus — malnutrition, vitamin D deficiency.',
    doctor: 'Nephrologist / Endocrinologist',
    diet: 'Phosphorus-rich: dairy, meat, nuts, beans. If high: limit phosphorus and sodas.'
  },
  {
    id: 'sodium',
    name: 'Sodium',
    aliases: ['sodium', 'na', 'na+', 'serum sodium', 's.sodium'],
    unit: 'mEq/L',
    category: 'Vitamins',
    ranges: { default: { low: 136, high: 145 } },
    highMeaning: 'High sodium — dehydration. Paani kam pee rahe ho. Zyada namak kha rahe ho.',
    lowMeaning: 'Low sodium — hyponatremia. Zyada paani peene se ya kidney/heart problem se ho sakta hai. Chakkar, confusion, weakness.',
    doctor: 'General Physician / Nephrologist',
    diet: 'High: drink more water, reduce salt. Low: slightly increase salt, ORS, check underlying cause.'
  },
  {
    id: 'potassium',
    name: 'Potassium',
    aliases: ['potassium', 'k', 'k+', 'serum potassium', 's.potassium'],
    unit: 'mEq/L',
    category: 'Vitamins',
    ranges: { default: { low: 3.5, high: 5.0 } },
    highMeaning: 'High potassium — DANGEROUS. Can cause irregular heartbeat. Kidney problem ya zyada banana/coconut water. Emergency ho sakti hai.',
    lowMeaning: 'Low potassium — muscle weakness, cramps, fatigue. Banana, coconut water, orange juice piyo.',
    doctor: 'Nephrologist / Cardiologist',
    diet: 'High K: avoid banana, coconut water, orange juice, potato. Low K: eat banana, nariyal paani, kela, aaloo, palak.'
  },
  {
    id: 'chloride',
    name: 'Chloride',
    aliases: ['chloride', 'cl', 'serum chloride', 's.chloride'],
    unit: 'mEq/L',
    category: 'Vitamins',
    ranges: { default: { low: 98, high: 106 } },
    highMeaning: 'High chloride — dehydration or kidney problems.',
    lowMeaning: 'Low chloride — vomiting, diarrhea, or respiratory issues.',
    doctor: 'General Physician',
    diet: 'Stay hydrated. Balance salt intake.'
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    aliases: ['magnesium', 'mg', 'serum magnesium', 's.magnesium', 'mg++'],
    unit: 'mg/dL',
    category: 'Vitamins',
    ranges: { default: { low: 1.7, high: 2.2 } },
    highMeaning: 'High magnesium — kidney issues or excess supplementation.',
    lowMeaning: 'Low magnesium — muscle cramps, insomnia, anxiety. Almonds, dark chocolate, palak khayein.',
    doctor: 'General Physician',
    diet: 'Almonds, cashews, pumpkin seeds, dark chocolate, spinach, banana.'
  },
  {
    id: 'folate',
    name: 'Folate / Folic Acid',
    aliases: ['folate', 'folic acid', 'vitamin b9', 'serum folate'],
    unit: 'ng/mL',
    category: 'Vitamins',
    ranges: { default: { low: 3.0, high: 20.0 } },
    highMeaning: 'High folate is generally not harmful.',
    lowMeaning: 'Low folate — anemia, neural tube defects in pregnancy. Green leafy vegetables khayein. Pregnancy mein bahut important.',
    doctor: 'General Physician / Gynecologist',
    diet: 'Green leafy vegetables (palak, methi), dal, rajma, citrus fruits. Supplement in pregnancy.'
  },

  // ─── ADDITIONAL IMPORTANT PARAMETERS ───
  {
    id: 'psa',
    name: 'PSA (Prostate Specific Antigen)',
    aliases: ['psa', 'prostate specific antigen', 'total psa', 'serum psa'],
    unit: 'ng/mL',
    category: 'Other',
    ranges: { default: { low: 0, high: 4.0 } },
    highMeaning: 'High PSA — prostate enlargement or prostate cancer possible. 50+ age ke males mein regular check zaroori.',
    lowMeaning: 'Low PSA is normal.',
    doctor: 'Urologist',
    diet: 'Tomatoes (lycopene), green tea, walnuts. Avoid red meat excess.'
  },
  {
    id: 'crp',
    name: 'CRP (C-Reactive Protein)',
    aliases: ['crp', 'c-reactive protein', 'c reactive protein', 'hs-crp', 'high sensitivity crp', 'hscrp'],
    unit: 'mg/L',
    category: 'Other',
    ranges: { default: { low: 0, high: 3.0 } },
    highMeaning: 'High CRP — inflammation in body. Infection, autoimmune disease, or heart disease risk. Sharir mein kahin sujan hai.',
    lowMeaning: 'Low CRP is normal — no significant inflammation.',
    doctor: 'General Physician / Rheumatologist',
    diet: 'Anti-inflammatory: turmeric, ginger, omega-3 (fish, walnuts), green tea. Avoid sugar, processed food.'
  },
  {
    id: 'ra_factor',
    name: 'RA Factor (Rheumatoid Factor)',
    aliases: ['ra factor', 'rheumatoid factor', 'rf', 'ra', 'rheumatoid'],
    unit: 'IU/mL',
    category: 'Other',
    ranges: { default: { low: 0, high: 14 } },
    highMeaning: 'High RA factor — rheumatoid arthritis or other autoimmune disease possible. Joints mein sujan aur dard.',
    lowMeaning: 'Low/normal RA factor — good, no autoimmune joint disease likely.',
    doctor: 'Rheumatologist',
    diet: 'Anti-inflammatory diet: turmeric, ginger, fish oil, green vegetables. Avoid refined sugar.'
  },
  {
    id: 'aso_titer',
    name: 'ASO Titer',
    aliases: ['aso', 'aso titer', 'anti-streptolysin o', 'asot', 'aso titre'],
    unit: 'IU/mL',
    category: 'Other',
    ranges: { default: { low: 0, high: 200 } },
    highMeaning: 'High ASO — recent streptococcal infection. Can affect heart (rheumatic fever) if untreated.',
    lowMeaning: 'Normal ASO — no recent strep infection.',
    doctor: 'General Physician / Cardiologist',
    diet: 'Complete antibiotic course if prescribed. Immunity boosting foods.'
  },
  {
    id: 'hiv',
    name: 'HIV (1 & 2)',
    aliases: ['hiv', 'hiv 1', 'hiv 2', 'hiv 1 & 2', 'hiv screening', 'hiv test', 'hiv antibody'],
    unit: 'status',
    category: 'Other',
    ranges: { default: { low: 0, high: 0 } },
    highMeaning: 'Reactive/Positive — needs confirmation with Western Blot test. Do not panic — consult doctor immediately.',
    lowMeaning: 'Non-reactive/Negative — no HIV detected.',
    doctor: 'Infectious Disease Specialist',
    diet: 'Healthy balanced diet. If positive: high protein, regular medication, regular follow-up.'
  },
  {
    id: 'hbsag',
    name: 'HBsAg (Hepatitis B)',
    aliases: ['hbsag', 'hepatitis b', 'hep b', 'hbs ag', 'hepatitis b surface antigen'],
    unit: 'status',
    category: 'Other',
    ranges: { default: { low: 0, high: 0 } },
    highMeaning: 'Positive — Hepatitis B infection. Liver ko affect karta hai. Treatment available hai.',
    lowMeaning: 'Negative — no Hepatitis B. Vaccine lagwa lein agar nahi lagi.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'No alcohol, light diet, avoid fatty food. Get vaccinated if negative.'
  },
  {
    id: 'hcv',
    name: 'HCV (Hepatitis C)',
    aliases: ['hcv', 'hepatitis c', 'hep c', 'hcv antibody', 'anti hcv'],
    unit: 'status',
    category: 'Other',
    ranges: { default: { low: 0, high: 0 } },
    highMeaning: 'Positive — Hepatitis C infection. Curable with modern medicines (DAA therapy).',
    lowMeaning: 'Negative — no Hepatitis C.',
    doctor: 'Gastroenterologist / Hepatologist',
    diet: 'No alcohol. Light, healthy diet. Modern treatment has 95%+ cure rate.'
  },
  {
    id: 'widal',
    name: 'Widal Test (Typhoid)',
    aliases: ['widal', 'widal test', 'typhoid', 'salmonella'],
    unit: 'titer',
    category: 'Other',
    ranges: { default: { low: 0, high: 80 } },
    highMeaning: 'High titer (1:160 or above) — Typhoid fever likely. Bukhar, pet dard, kamzori.',
    lowMeaning: 'Low titer — no typhoid currently.',
    doctor: 'General Physician',
    diet: 'Boiled water, light food (khichdi, dalia), ORS. Complete antibiotic course. Rest.'
  },
  {
    id: 'dengue_ns1',
    name: 'Dengue NS1 Antigen',
    aliases: ['dengue', 'dengue ns1', 'ns1', 'ns1 antigen', 'dengue test'],
    unit: 'status',
    category: 'Other',
    ranges: { default: { low: 0, high: 0 } },
    highMeaning: 'Positive — Dengue infection. Platelet count monitor karein. Hydration bahut important.',
    lowMeaning: 'Negative — no dengue.',
    doctor: 'General Physician / Infectious Disease',
    diet: 'Papaya leaf juice (platelet badhata hai), coconut water, ORS, pomegranate juice. Paracetamol only — Brufen/Aspirin AVOID.'
  },
  {
    id: 'blood_group',
    name: 'Blood Group',
    aliases: ['blood group', 'blood type', 'abo group', 'abo type', 'abo rh'],
    unit: 'type',
    category: 'Other',
    ranges: { default: { low: 0, high: 0 } },
    highMeaning: 'Your blood group — important for emergencies and blood transfusion.',
    lowMeaning: 'Your blood group — important for emergencies.',
    doctor: 'N/A',
    diet: 'No dietary changes needed based on blood group.'
  },
  {
    id: 'prothrombin_time',
    name: 'Prothrombin Time (PT)',
    aliases: ['pt', 'prothrombin time', 'pt/inr', 'protime'],
    unit: 'seconds',
    category: 'Blood Count',
    ranges: { default: { low: 11, high: 13.5 } },
    highMeaning: 'High PT — blood takes longer to clot. Liver disease or blood thinner medication effect.',
    lowMeaning: 'Low PT — blood clots too quickly.',
    doctor: 'Hematologist',
    diet: 'If on blood thinners: maintain consistent vitamin K intake (green vegetables). Do not suddenly change diet.'
  },
  {
    id: 'inr',
    name: 'INR (International Normalized Ratio)',
    aliases: ['inr', 'international normalized ratio'],
    unit: 'ratio',
    category: 'Blood Count',
    ranges: { default: { low: 0.8, high: 1.1 } },
    highMeaning: 'High INR — increased bleeding risk. Important for patients on Warfarin.',
    lowMeaning: 'Low INR — increased clotting risk.',
    doctor: 'Hematologist / Cardiologist',
    diet: 'Consistent vitamin K intake if on blood thinners. Regular monitoring.'
  },
  {
    id: 'vitamin_d2',
    name: 'Vitamin D2',
    aliases: ['vitamin d2', 'vit d2', 'ergocalciferol'],
    unit: 'ng/mL',
    category: 'Vitamins',
    ranges: { default: { low: 30, high: 100 } },
    highMeaning: 'Very high Vitamin D2 — toxicity risk. Reduce supplementation.',
    lowMeaning: 'Low Vitamin D2 — supplement and get sunlight exposure.',
    doctor: 'Endocrinologist',
    diet: 'Mushrooms, fortified foods. Sunlight exposure 20 min daily.'
  },
  {
    id: 'zinc',
    name: 'Zinc',
    aliases: ['zinc', 'serum zinc', 'zn'],
    unit: 'µg/dL',
    category: 'Vitamins',
    ranges: { default: { low: 60, high: 120 } },
    highMeaning: 'High zinc — nausea, vomiting. Reduce supplements.',
    lowMeaning: 'Low zinc — hair fall, weak immunity, slow wound healing, taste loss. Pumpkin seeds, cashews, chickpeas khayein.',
    doctor: 'General Physician',
    diet: 'Pumpkin seeds, cashews, chickpeas (chole), sesame seeds (til), eggs, meat.'
  },
  {
    id: 'copper',
    name: 'Copper',
    aliases: ['copper', 'serum copper', 'cu'],
    unit: 'µg/dL',
    category: 'Vitamins',
    ranges: { default: { low: 70, high: 140 } },
    highMeaning: 'High copper — Wilson disease or liver issues.',
    lowMeaning: 'Low copper — anemia, bone issues.',
    doctor: 'General Physician / Hepatologist',
    diet: 'Copper-rich: dark chocolate, sesame seeds, cashews, mushrooms.'
  },
  {
    id: 'amylase',
    name: 'Amylase',
    aliases: ['amylase', 'serum amylase', 's.amylase'],
    unit: 'U/L',
    category: 'Other',
    ranges: { default: { low: 28, high: 100 } },
    highMeaning: 'High amylase — pancreatitis (pancreas mein sujan). Pet mein tez dard, kamar tak jaata hai.',
    lowMeaning: 'Low amylase — chronic pancreatic damage.',
    doctor: 'Gastroenterologist',
    diet: 'Low fat diet, no alcohol. Small frequent meals. Avoid oily/spicy food.'
  },
  {
    id: 'lipase',
    name: 'Lipase',
    aliases: ['lipase', 'serum lipase', 's.lipase'],
    unit: 'U/L',
    category: 'Other',
    ranges: { default: { low: 0, high: 60 } },
    highMeaning: 'High lipase — pancreatitis. More specific than amylase for pancreas problems.',
    lowMeaning: 'Low lipase — usually normal.',
    doctor: 'Gastroenterologist',
    diet: 'Same as amylase. Low fat, no alcohol, light diet.'
  },
  {
    id: 'ldh',
    name: 'LDH (Lactate Dehydrogenase)',
    aliases: ['ldh', 'lactate dehydrogenase', 'lactic dehydrogenase'],
    unit: 'U/L',
    category: 'Other',
    ranges: { default: { low: 140, high: 280 } },
    highMeaning: 'High LDH — tissue damage somewhere. Heart, liver, muscle, or blood disorder.',
    lowMeaning: 'Low LDH — usually normal.',
    doctor: 'General Physician',
    diet: 'Address underlying cause. Rest if muscle damage.'
  },
  {
    id: 'cpk',
    name: 'CPK (Creatine Phosphokinase)',
    aliases: ['cpk', 'ck', 'creatine kinase', 'creatine phosphokinase', 'cpk total'],
    unit: 'U/L',
    category: 'Other',
    ranges: {
      male: { low: 39, high: 308 },
      female: { low: 26, high: 192 },
      default: { low: 26, high: 308 }
    },
    highMeaning: 'High CPK — muscle damage, heart attack, or intense exercise. Heart attack mein CPK-MB check karte hain.',
    lowMeaning: 'Low CPK — usually normal.',
    doctor: 'Cardiologist / General Physician',
    diet: 'Rest muscles, stay hydrated. If heart-related, follow cardiologist advice.'
  },
  {
    id: 'troponin',
    name: 'Troponin I/T',
    aliases: ['troponin', 'troponin i', 'troponin t', 'trop i', 'trop t', 'cardiac troponin'],
    unit: 'ng/mL',
    category: 'Other',
    ranges: { default: { low: 0, high: 0.04 } },
    highMeaning: 'High troponin — HEART ATTACK indicator. Emergency! Hospital jaayein turant.',
    lowMeaning: 'Normal troponin — no heart muscle damage.',
    doctor: 'Cardiologist (EMERGENCY)',
    diet: 'Emergency treatment first. Then: low salt, low fat, heart-healthy diet.'
  },
  {
    id: 'bnp',
    name: 'BNP (Brain Natriuretic Peptide)',
    aliases: ['bnp', 'brain natriuretic peptide', 'nt-probnp', 'pro bnp', 'nt pro bnp'],
    unit: 'pg/mL',
    category: 'Other',
    ranges: { default: { low: 0, high: 100 } },
    highMeaning: 'High BNP — heart failure. Heart properly pump nahi kar raha. Doctor se turant milein.',
    lowMeaning: 'Normal BNP — heart function likely normal.',
    doctor: 'Cardiologist',
    diet: 'Low salt diet. Fluid restriction as advised. Medication adherence important.'
  },
  {
    id: 'homocysteine',
    name: 'Homocysteine',
    aliases: ['homocysteine', 'serum homocysteine', 'hcy'],
    unit: 'µmol/L',
    category: 'Other',
    ranges: { default: { low: 5, high: 15 } },
    highMeaning: 'High homocysteine — heart disease and stroke risk. B12 aur folate ki kami se badhta hai.',
    lowMeaning: 'Low homocysteine is good.',
    doctor: 'Cardiologist',
    diet: 'B12, B6, and folate supplements. Green leafy vegetables, eggs, fish.'
  },
  {
    id: 'fibrinogen',
    name: 'Fibrinogen',
    aliases: ['fibrinogen', 'serum fibrinogen'],
    unit: 'mg/dL',
    category: 'Blood Count',
    ranges: { default: { low: 200, high: 400 } },
    highMeaning: 'High fibrinogen — increased blood clotting risk. Inflammation marker bhi hai.',
    lowMeaning: 'Low fibrinogen — bleeding risk.',
    doctor: 'Hematologist',
    diet: 'Anti-inflammatory diet: omega-3 fatty acids, turmeric, ginger.'
  },
  {
    id: 'reticulocyte_count',
    name: 'Reticulocyte Count',
    aliases: ['reticulocyte', 'reticulocyte count', 'retic count'],
    unit: '%',
    category: 'Blood Count',
    ranges: { default: { low: 0.5, high: 2.5 } },
    highMeaning: 'High reticulocytes — bone marrow actively making new RBCs. Recovering from anemia or bleeding.',
    lowMeaning: 'Low reticulocytes — bone marrow not producing enough RBCs.',
    doctor: 'Hematologist',
    diet: 'Iron, B12, folate-rich diet to support RBC production.'
  },
  {
    id: 'mpv',
    name: 'MPV (Mean Platelet Volume)',
    aliases: ['mpv', 'mean platelet volume'],
    unit: 'fL',
    category: 'Blood Count',
    subCategory: 'RBC Indices',
    ranges: { default: { low: 7.5, high: 11.5 } },
    highMeaning: 'High MPV — larger platelets, may indicate platelet destruction (body making new, bigger ones).',
    lowMeaning: 'Low MPV — smaller platelets, may indicate bone marrow issues.',
    doctor: 'Hematologist',
    diet: 'Address underlying cause. Balanced nutrition.'
  },
  {
    id: 'abs_neutrophil',
    name: 'Absolute Neutrophil Count (ANC)',
    aliases: ['anc', 'absolute neutrophil count', 'absolute neutrophils', 'abs neutrophil', 'neutrophils absolute', 'neutrophil count absolute', 'neutrophils abs', 'neutrophil absolute', 'neutrophils, absolute'],
    unit: 'cells/µL',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 1500, high: 8000 } },
    highMeaning: 'High ANC — bacterial infection or stress response.',
    lowMeaning: 'Low ANC (neutropenia) — high infection risk. Below 500 is dangerous.',
    doctor: 'Hematologist',
    diet: 'If low: avoid raw foods, practice strict hygiene. Immunity boosting diet.'
  },
  {
    id: 'abs_lymphocyte',
    name: 'Absolute Lymphocyte Count',
    aliases: ['alc', 'absolute lymphocyte count', 'absolute lymphocytes', 'abs lymphocyte', 'lymphocytes absolute', 'lymphocyte count absolute', 'lymphocytes abs', 'lymphocyte absolute', 'lymphocytes, absolute'],
    unit: 'cells/µL',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 1000, high: 4800 } },
    highMeaning: 'High ALC — viral infection, chronic lymphocytic leukemia (in elderly).',
    lowMeaning: 'Low absolute lymphocytes — can be due to stress, acute infection, or certain medications. Mildly low values are often temporary. Consult doctor if persistently low.',
    doctor: 'Hematologist / Immunologist',
    diet: 'Immunity boosting: protein-rich diet, vitamins, adequate sleep.'
  },
  {
    id: 'abs_eosinophil',
    name: 'Absolute Eosinophil Count (AEC)',
    aliases: ['aec', 'absolute eosinophil count', 'absolute eosinophils', 'abs eosinophil', 'eosinophils absolute', 'eosinophil count absolute', 'eosinophils abs', 'eosinophil absolute', 'eosinophils, absolute'],
    unit: 'cells/µL',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 40, high: 440 } },
    insignificantWhenLow: true,
    highMeaning: 'High AEC — allergy or parasitic worm infection. Very common in India. Deworming tablet (Albendazole) lein.',
    lowMeaning: 'Low AEC — usually normal.',
    doctor: 'General Physician / Allergist',
    diet: 'Deworming every 6 months. Clean drinking water. Wash fruits/vegetables before eating.'
  },
  {
    id: 'testosterone',
    name: 'Testosterone',
    aliases: ['testosterone', 'total testosterone', 'serum testosterone', 'free testosterone'],
    unit: 'ng/dL',
    category: 'Other',
    ranges: {
      male: { low: 300, high: 1000 },
      female: { low: 15, high: 70 },
      default: { low: 15, high: 1000 }
    },
    highMeaning: 'High testosterone in women — PCOS possible. Acne, facial hair, irregular periods. Men mein usually supplement se.',
    lowMeaning: 'Low testosterone in men — fatigue, low libido, muscle loss, mood changes. Exercise, sleep, zinc important.',
    doctor: 'Endocrinologist / Urologist',
    diet: 'Zinc (pumpkin seeds), vitamin D, healthy fats, adequate sleep, strength training.'
  },
  {
    id: 'prolactin',
    name: 'Prolactin',
    aliases: ['prolactin', 'serum prolactin', 'prl'],
    unit: 'ng/mL',
    category: 'Other',
    ranges: {
      male: { low: 2, high: 18 },
      female: { low: 2, high: 29 },
      default: { low: 2, high: 29 }
    },
    highMeaning: 'High prolactin — pituitary tumor possible, or medication side effect. Women mein irregular periods, men mein low libido.',
    lowMeaning: 'Low prolactin — usually not a concern.',
    doctor: 'Endocrinologist',
    diet: 'Manage stress, adequate sleep. Ashwagandha may help (consult doctor).'
  },
  {
    id: 'cortisol',
    name: 'Cortisol',
    aliases: ['cortisol', 'serum cortisol', 'morning cortisol', 'cortisol am'],
    unit: 'µg/dL',
    category: 'Other',
    ranges: { default: { low: 6.2, high: 19.4 } },
    highMeaning: 'High cortisol — Cushing syndrome, chronic stress. Weight gain (especially belly), mood swings.',
    lowMeaning: 'Low cortisol — Addison disease. Extreme fatigue, weight loss, low BP.',
    doctor: 'Endocrinologist',
    diet: 'Stress management: yoga, meditation, adequate sleep. Ashwagandha (consult doctor). Avoid caffeine excess.'
  },
  {
    id: 'insulin',
    name: 'Fasting Insulin',
    aliases: ['insulin', 'fasting insulin', 'serum insulin', 'insulin fasting'],
    unit: 'µIU/mL',
    category: 'Diabetes',
    ranges: { default: { low: 2.6, high: 24.9 } },
    highMeaning: 'High insulin — insulin resistance, pre-diabetes, PCOS. Body insulin bana raha hai par kaam nahi kar raha.',
    lowMeaning: 'Low insulin — Type 1 diabetes or late-stage Type 2.',
    doctor: 'Endocrinologist / Diabetologist',
    diet: 'Low carb diet, intermittent fasting (consult doctor), exercise, metformin may be needed.'
  },
  {
    id: 'iron_saturation',
    name: 'Iron Saturation (Transferrin Saturation)',
    aliases: ['iron saturation', 'transferrin saturation', 'tibc saturation', 'ts%', 'tsat', 'tsat%', 'iron sat', '%saturation', 'percent saturation', 'transferrin sat', 'iron saturation %', 'transferrin saturation %', 'saturation iron', 'saturation transferrin', '%iron saturation', 'iron saturation serum', 'serum iron saturation'],
    unit: '%',
    category: 'Vitamins',
    subCategory: 'Iron Studies',
    ranges: {
      male: { low: 20, high: 50 },
      female: { low: 15, high: 50 },
      default: { low: 15, high: 50 }
    },
    highMeaning: 'High iron saturation — hemochromatosis (iron overload). Liver damage ka risk.',
    lowMeaning: 'Low iron saturation strongly suggests iron deficiency. Sharir mein iron ki kami hone ki sambhavna hai. Doctor se milke ferritin test bhi karwayein for confirmation.',
    doctor: 'Hematologist',
    diet: 'Iron-rich foods: palak, chana, rajma, jaggery, dates. Cook in iron kadhai. Vitamin C (amla, nimbu) with meals for better absorption. Avoid tea/coffee with meals.'
  },
  {
    id: 'rdw_sd',
    name: 'RDW-SD',
    aliases: ['rdw-sd', 'rdw sd', 'red cell distribution width sd', 'rdw standard deviation'],
    unit: 'fL',
    category: 'Blood Count',
    subCategory: 'RBC Indices',
    ranges: { default: { low: 39, high: 46 } },
    highMeaning: 'High RDW-SD means red blood cells vary too much in size — indicates iron deficiency, B12 deficiency, or mixed anemia.',
    lowMeaning: 'Low RDW-SD is usually normal — red blood cells are uniform in size.',
    doctor: 'Hematologist',
    diet: 'Check iron, B12, and folate levels. Eat palak, chana, doodh, eggs, and green vegetables.'
  },
  {
    id: 'abs_monocyte',
    name: 'Absolute Monocyte Count',
    aliases: ['absolute monocyte count', 'absolute monocytes', 'abs monocyte', 'abs monocytes', 'amc', 'monocytes absolute', 'monocyte count absolute', 'monocytes abs', 'monocyte absolute', 'monocytes, absolute'],
    unit: 'cells/µL',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 200, high: 1000 } },
    highMeaning: 'High absolute monocytes — chronic infection, autoimmune disease, or recovering from infection.',
    lowMeaning: 'Low absolute monocytes — bone marrow suppression or severe infection. Immunity compromised ho sakti hai.',
    doctor: 'Hematologist',
    diet: 'Immunity boosting: protein-rich diet, vitamins, adequate sleep, reduce stress.'
  },
  {
    id: 'abs_basophil',
    name: 'Absolute Basophil Count',
    aliases: ['absolute basophil count', 'absolute basophils', 'abs basophil', 'abs basophils', 'basophils absolute', 'basophil count absolute', 'basophils abs', 'basophil absolute', 'basophils, absolute'],
    unit: 'cells/µL',
    category: 'Blood Count',
    subCategory: 'WBC Differential',
    ranges: { default: { low: 10, high: 100 } },
    highMeaning: 'High basophils — allergic reaction or chronic inflammation.',
    lowMeaning: 'Low basophils — usually normal and not clinically significant.',
    doctor: 'Hematologist / Allergist',
    diet: 'Anti-inflammatory foods: turmeric, ginger, omega-3 rich foods.',
    insignificantWhenLow: true
  },

  // ─── ADDITIONAL MISSING PARAMETERS ───
  {
    id: 'uibc',
    name: 'UIBC (Unsaturated Iron Binding Capacity)',
    aliases: ['uibc', 'unsaturated iron binding capacity', 'unsat iron binding capacity', 'unsaturated ibc'],
    unit: 'µg/dL',
    category: 'Vitamins',
    subCategory: 'Iron Studies',
    ranges: { default: { low: 150, high: 300 } },
    highMeaning: 'High UIBC — iron deficiency. Body has more capacity to bind iron because iron stores are low.',
    lowMeaning: 'Low UIBC — iron overload or chronic disease.',
    doctor: 'Hematologist',
    diet: 'High UIBC: Increase iron intake — palak, chukandar, dates, jaggery, ragi. Low UIBC: Reduce iron-rich foods, check for hemochromatosis.'
  },
  {
    id: 'non_hdl_cholesterol',
    name: 'Non-HDL Cholesterol',
    aliases: ['non-hdl cholesterol', 'non hdl cholesterol', 'non-hdl', 'non hdl', 'non hdl-c'],
    unit: 'mg/dL',
    category: 'Lipid Profile',
    ranges: { default: { low: 0, high: 130 } },
    highMeaning: 'High Non-HDL cholesterol — combined "bad" cholesterol. Better predictor of heart risk than LDL alone.',
    lowMeaning: 'Low Non-HDL is good for heart health.',
    doctor: 'Cardiologist',
    diet: 'Same as LDL — oats, almonds, walnuts, olive oil, flaxseeds. Avoid fried food, bakery items. Exercise daily.'
  },
  {
    id: 'ldl_hdl_ratio',
    name: 'LDL/HDL Ratio',
    aliases: ['ldl/hdl ratio', 'ldl hdl ratio', 'ldl:hdl ratio', 'ldl to hdl ratio'],
    unit: 'ratio',
    category: 'Lipid Profile',
    ranges: { default: { low: 0, high: 3.5 } },
    highMeaning: 'High LDL/HDL ratio — increased cardiovascular risk. Too much bad cholesterol relative to good.',
    lowMeaning: 'Low ratio is excellent for heart health.',
    doctor: 'Cardiologist',
    diet: 'Increase HDL (exercise, nuts, fish) and decrease LDL (avoid fried food, processed food).'
  },
  {
    id: 'bun_creatinine_ratio',
    name: 'BUN/Creatinine Ratio',
    aliases: ['bun/creatinine ratio', 'bun creatinine ratio', 'bun:creatinine', 'bun to creatinine ratio', 'urea creatinine ratio'],
    unit: 'ratio',
    category: 'Kidney Function',
    ranges: { default: { low: 10, high: 20 } },
    highMeaning: 'High BUN/Creatinine ratio — dehydration, GI bleeding, or high protein diet.',
    lowMeaning: 'Low ratio — liver disease or low protein diet.',
    doctor: 'Nephrologist',
    diet: 'High ratio: Drink more water, reduce protein. Low ratio: Ensure adequate protein intake.'
  },
  {
    id: 'pct',
    name: 'Plateletcrit (PCT)',
    aliases: ['pct', 'plateletcrit', 'platelet crit'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: { default: { low: 0.15, high: 0.40 } },
    highMeaning: 'High PCT — increased platelet mass, may indicate inflammation or myeloproliferative disorder.',
    lowMeaning: 'Low PCT — reduced platelet mass.',
    doctor: 'Hematologist',
    diet: 'Address underlying cause. Balanced diet with adequate nutrition.'
  },
  {
    id: 'pdw',
    name: 'PDW (Platelet Distribution Width)',
    aliases: ['pdw', 'platelet distribution width'],
    unit: 'fL',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: { default: { low: 9.0, high: 17.0 } },
    highMeaning: 'High PDW — platelets vary in size, may indicate active platelet production or destruction.',
    lowMeaning: 'Low PDW — uniform platelet size, usually normal.',
    doctor: 'Hematologist',
    diet: 'Monitor underlying cause. Balanced diet.'
  },
  {
    id: 'p_lcr',
    name: 'P-LCR (Platelet Large Cell Ratio)',
    aliases: ['p-lcr', 'plcr', 'platelet large cell ratio', 'p lcr'],
    unit: '%',
    category: 'Blood Count',
    subCategory: 'CBC Core',
    ranges: { default: { low: 15, high: 35 } },
    highMeaning: 'High P-LCR — more large platelets, can indicate platelet destruction or production issues.',
    lowMeaning: 'Low P-LCR — usually normal.',
    doctor: 'Hematologist',
    diet: 'Balanced diet. Address underlying condition if any.'
  }
];

// ─── FUZZY MATCHING ───
function normalizeParamName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/haemo/g, 'hemo')
    .replace(/colour/g, 'color')
    .replace(/labour/g, 'labor')
    .trim();
}

function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function findParameter(rawName) {
  const normalized = normalizeParamName(rawName);
  if (!normalized || normalized.length < 2) return null;

  // Helper: try to find exact alias match for a normalized string
  function exactMatch(norm) {
    for (const param of PARAMETERS_DB) {
      for (const alias of param.aliases) {
        if (normalizeParamName(alias) === norm) return param;
      }
    }
    return null;
  }

  // Step 1: Exact alias match (highest confidence)
  const exact = exactMatch(normalized);
  if (exact) return exact;

  // Step 2: Sub-part matching — split on parentheses, dashes, slashes, commas
  // Handles "Triiodothyronine (T3)", "RBC Count (Red Blood Cells)", "SGOT (AST)", "AST/SGOT"
  const parts = rawName.split(/[\(\)\[\]\-\/,]+/).map(s => s.trim()).filter(s => s.length >= 2);
  if (parts.length > 1) {
    for (const part of parts) {
      const normPart = normalizeParamName(part);
      if (!normPart || normPart.length < 2) continue;
      const partMatch = exactMatch(normPart);
      if (partMatch) return partMatch;
    }
  }

  // Step 3: Contains match — input contains alias or vice versa
  for (const param of PARAMETERS_DB) {
    for (const alias of param.aliases) {
      const normAlias = normalizeParamName(alias);
      if (normAlias.length < 4) continue; // Short aliases need exact match only
      // Input contains alias → good (e.g., "serum creatinine level" contains "creatinine")
      if (normalized.includes(normAlias) && normAlias.length >= normalized.length * 0.4) return param;
      // Alias contains input → only if input is long & specific enough
      if (normAlias.includes(normalized) && normalized.length >= 5 && normalized.length >= normAlias.length * 0.6) return param;
    }
  }

  // Step 4: Sub-part contains match — try contains matching on individual sub-parts
  if (parts.length > 1) {
    for (const part of parts) {
      const normPart = normalizeParamName(part);
      if (!normPart || normPart.length < 4) continue;
      for (const param of PARAMETERS_DB) {
        for (const alias of param.aliases) {
          const normAlias = normalizeParamName(alias);
          if (normAlias.length < 4) continue;
          if (normPart.includes(normAlias) && normAlias.length >= normPart.length * 0.5) return param;
          if (normAlias.includes(normPart) && normPart.length >= 5 && normPart.length >= normAlias.length * 0.6) return param;
        }
      }
    }
  }

  // Step 5: Fuzzy match with Levenshtein — very tight threshold, only for longer names
  let bestMatch = null;
  let bestScore = Infinity;
  for (const param of PARAMETERS_DB) {
    for (const alias of param.aliases) {
      const normAlias = normalizeParamName(alias);
      if (normAlias.length < 5) continue; // Skip short aliases for fuzzy
      // Both must be similar length (within 30%)
      const lenRatio = normalized.length / normAlias.length;
      if (lenRatio < 0.7 || lenRatio > 1.3) continue;
      const dist = levenshtein(normalized, normAlias);
      // Very tight threshold: max 15% of alias length, min 1, max 2
      const threshold = Math.min(2, Math.max(1, Math.floor(normAlias.length * 0.15)));
      if (dist < bestScore && dist <= threshold) {
        bestScore = dist;
        bestMatch = param;
      }
    }
  }
  return bestMatch;
}

// ─── TEXT PARSER ───

// Words that should never be treated as parameter names
const SKIP_WORDS = new Set([
  'date', 'time', 'name', 'patient', 'doctor', 'dr', 'lab', 'laboratory', 'report',
  'page', 'printed', 'specimen', 'sample', 'collected', 'reference', 'ref', 'result',
  'results', 'test', 'tests', 'unit', 'units', 'normal', 'range', 'value', 'values',
  'method', 'department', 'hospital', 'clinic', 'centre', 'center', 'address', 'phone',
  'mobile', 'email', 'age', 'sex', 'gender', 'male', 'female', 'mr', 'mrs', 'ms',
  'sri', 'smt', 'reg', 'registration', 'id', 'bill', 'receipt', 'invoice', 'amount',
  'subtotal', 'grand', 'net', 'paid', 'due', 'balance', 'discount', 'tax',
  'gst', 'cgst', 'sgst', 'igst', 'rupees', 'rs', 'inr', 'no', 'number', 'sl',
  'serial', 'sr', 'barcode', 'qr', 'code', 'status', 'approved', 'verified',
  'signed', 'signature', 'stamp', 'seal', 'copy', 'original', 'duplicate',
  'investigation', 'investigations', 'profile', 'panel', 'package', 'body', 'weight',
  'height', 'bmi', 'blood', 'group', 'type', 'positive', 'negative', 'rh',
  'impression', 'note', 'notes', 'comment', 'comments', 'remark', 'remarks',
  'conclusion', 'summary', 'finding', 'findings', 'observation',
  'methodology', 'instrument', 'reagent', 'kit', 'manufacturer',
  'end', 'thank', 'thanks', 'report', 'pathology', 'biochemistry', 'hematology',
  'serology', 'microbiology', 'immunology', 'cytology', 'histopathology',
]);

function isSkipLine(line) {
  const lower = line.toLowerCase().trim();
  // Skip if it starts with a skip word
  const firstWord = lower.split(/[\s:,]+/)[0];
  if (SKIP_WORDS.has(firstWord)) return true;
  // Skip date-like lines
  if (/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}/.test(lower)) return true;
  // Skip lines that are mostly numbers/special chars (not parameter lines)
  const alphaChars = lower.replace(/[^a-z]/g, '').length;
  if (alphaChars < 2) return true;
  // Skip very short lines
  if (lower.length < 4) return true;
  // Skip lines that look like addresses, phone numbers, etc.
  if (/^\+?\d{10,}/.test(lower)) return true;
  if (/pin\s*code|zip\s*code/i.test(lower)) return true;
  return false;
}

function validateValue(param, value) {
  if (isNaN(value)) return false;
  const ranges = param.ranges.default || param.ranges.male || param.ranges.female;
  if (!ranges) return true;
  const plausibleMax = ranges.high * 3;
  const plausibleMin = ranges.low > 0 ? ranges.low * 0.05 : 0;
  if (value > plausibleMax) return false;
  if (value < plausibleMin) return false; // Reject values below minimum (including 0 when range low > 0)
  if (value > 1000 && ranges.high < 500) return false;
  if (value > 10000 && ranges.high < 5000) return false;
  return true;
}

function isSkipName(rawName) {
  if (!rawName || rawName.length < 2) return true;
  if (/^\d+\.?\d*$/.test(rawName)) return true;
  const rawLower = rawName.toLowerCase().trim();
  const words = rawLower.split(/\s+/);
  if (words.length === 1 && SKIP_WORDS.has(rawLower)) return true;
  if (words.length > 1 && words.every(w => SKIP_WORDS.has(w))) return true;
  return false;
}

function parseReportText(text) {
  // Clean up OCR artifacts
  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\t+/g, '  ')
    .replace(/\|/g, ' ')       // Table borders from OCR
    .replace(/[""]/g, '"')     // Smart quotes
    .replace(/['']/g, "'")
    .replace(/_{2,}/g, ' ')    // Underscores used as separators
    .replace(/\.{3,}/g, ' ')   // Dots used as fill
    .replace(/\-{3,}/g, ' ')   // Dashes used as separators
    .replace(/\s{3,}/g, '  '); // Collapse excessive spaces

  const lines = cleanedText.split('\n');
  const results = [];
  const seen = new Set();

  // === STRATEGY 1: Standard format (name  value  unit  range) ===
  const standardPatterns = [
    /^([A-Za-z][A-Za-z0-9\s\(\)\/%\.\-]{1,50}?)\s*[:=]\s*(\d+\.?\d*)\s*(.*?)$/,
    /^([A-Za-z][A-Za-z0-9\s\(\)\/%\.\-]{2,50}?)\s{2,}(\d+\.?\d*)\s+(.*?)$/,
    /^([A-Za-z][A-Za-z0-9\s]*(?:\([A-Za-z0-9\s\/\%]+\))?)\s+(\d+\.?\d*)\s*(.*?)$/,
  ];

  const rangePattern = /(\d+\.?\d*)\s*[-–—to]+\s*(\d+\.?\d*)/;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 4) continue;
    if (isSkipLine(trimmed)) continue;

    for (const pattern of standardPatterns) {
      const match = trimmed.match(pattern);
      if (!match) continue;

      let rawName = match[1].trim().replace(/[\s:;\-–—\.,]+$/, '').trim();
      let value = parseFloat(match[2]);

      if (isNaN(value) || isSkipName(rawName)) continue;

      const param = findParameter(rawName);
      if (!param || seen.has(param.id)) continue;
      if (!validateValue(param, value)) continue;

      seen.add(param.id);

      let reportRange = null;
      const rest = match[3] || '';
      const rm = rest.match(rangePattern);
      if (rm) reportRange = { low: parseFloat(rm[1]), high: parseFloat(rm[2]) };

      results.push({ parameterId: param.id, rawName, value, unit: param.unit, reportRange });
      break;
    }
  }

  // === STRATEGY 2: Concatenated PDF format (common in Indian lab reports) ===
  // Many Indian lab PDFs concatenate: "Hemoglobing/dL12.0 - 15.010.3"
  // Or put value on a separate line after the method:
  //   "SGOT, SerumU/L<31" → "IFCC without PLP" → "18.40"
  // Strategy: Search for known parameter names in text, find nearby standalone values

  if (results.length < 3) {
    // First, find which line each line index corresponds to
    function getLineIndex(charIdx) {
      let pos = 0;
      for (let i = 0; i < lines.length; i++) {
        if (charIdx >= pos && charIdx < pos + lines[i].length + 1) return i;
        pos += lines[i].length + 1;
      }
      return -1;
    }

    for (const param of PARAMETERS_DB) {
      if (seen.has(param.id)) continue;

      for (const alias of param.aliases) {
        if (alias.length < 3) continue;
        if (seen.has(param.id)) break;

        const aliasLower = alias.toLowerCase();
        const textLower = cleanedText.toLowerCase();
        const aliasIdx = textLower.indexOf(aliasLower);
        if (aliasIdx === -1) continue;

        // Ensure this is a real match — char before should not be a letter
        if (aliasIdx > 0 && /[a-zA-Z]/.test(cleanedText[aliasIdx - 1])) continue;

        const aliasLineIdx = getLineIndex(aliasIdx);
        if (aliasLineIdx < 0) continue;

        let value = null;
        let reportRange = null;

        // PRIORITY 1: Look for standalone number on subsequent lines (most reliable)
        // This handles the common pattern: ParameterLine → MethodLine → ValueLine
        for (let j = aliasLineIdx + 1; j < Math.min(aliasLineIdx + 8, lines.length); j++) {
          const nextLine = lines[j].trim();
          if (!nextLine) continue;

          // Standalone number line (e.g., "18.40", "100.60", "0.64")
          const standaloneMatch = nextLine.match(/^(\d+\.?\d*)$/);
          if (standaloneMatch) {
            const v = parseFloat(standaloneMatch[1]);
            if (validateValue(param, v)) {
              value = v;
              break;
            }
          }

          // Skip lines that are methods, ranges, clinical notes, etc.
          if (/^(method|clinical|clia|enzymatic|calculated|god|gpo|chop|biuret|bcg|azo|strip|ifcc|urease|uricase|arsenazo|ferrene|ferrozine|immunoturbid|peroxidase|colorimetric|erlichs|legals|g-glutamyl)/i.test(nextLine)) continue;
          if (/^(pre-diabetic|diabetic|borderline|high|low|optimal|near optimal|very high|normal|desirable|non pregnant|pregnancy|first trimester|second trimester|third trimester)/i.test(nextLine)) continue;
          if (/^[A-Z\-\s\/]+$/.test(nextLine) && nextLine.length < 40) continue; // All-caps method names like "GPO", "DIRECT", "GOD-POD"
          if (nextLine.length > 80) continue; // Long text = clinical significance paragraph

          // If we hit another parameter-like line (starts with alpha, has numbers, is longish), stop
          if (/^[A-Za-z]/.test(nextLine) && /\d/.test(nextLine) && nextLine.length > 15) break;
        }

        // PRIORITY 2: Last number on the same line (for CBC-style concatenated format)
        // e.g., "Hemoglobing/dL12.0 - 15.010.3" — value is 10.3 at the end
        // Challenge: numbers are concatenated, e.g., "150-410201.00" is range 150-410 + value 201.00
        if (value === null) {
          const aliasLine = lines[aliasLineIdx].trim();
          const nameEndPos = aliasLine.toLowerCase().indexOf(aliasLower) + alias.length;
          const afterName = aliasLine.substring(nameEndPos);

          // Smart extraction: use the known parameter range to split concatenated numbers
          const ranges = param.ranges.default || param.ranges.male || param.ranges.female;

          // Strategy: Find "low - high" range pattern in the text,
          // then extract the value concatenated after the range high
          // Challenge: "40 - 8073.3" → range is 40-80, value is 73.3 (not 40-8073.3)
          // We must split the concatenated rangeHigh+value correctly

          // Find all range-like patterns (number - number)
          const rangeStartMatches = [...afterName.matchAll(/(\d+\.?\d*)\s*[-–—]\s*/g)];
          for (const rsm of rangeStartMatches) {
            const rangeLow = parseFloat(rsm[1]);
            const afterDash = afterName.substring(rsm.index + rsm[0].length);
            // The rest starts with rangeHigh + value concatenated
            // e.g., "8073.3" where rangeHigh=80 and value=73.3
            // Strategy: try different split points for the high value
            // The range high should be <= 10x the range low (reasonable assumption)
            const digitRun = afterDash.match(/^(\d+\.?\d*)/);
            if (!digitRun) continue;
            const fullDigits = digitRun[1];

            // Try splitting fullDigits into rangeHigh + value at each possible position
            // Pick the split where rangeHigh is closest to our known DB range high
            let bestValue = null;
            let bestHigh = null;
            let bestScore = Infinity;
            const knownRanges = param.ranges.default || param.ranges.male || param.ranges.female;
            const knownHigh = knownRanges ? knownRanges.high : null;

            for (let splitPos = 1; splitPos < fullDigits.length; splitPos++) {
              const highStr = fullDigits.substring(0, splitPos);
              const valStr = fullDigits.substring(splitPos);
              if (!valStr || (valStr.startsWith('.') && splitPos === 1)) continue;
              // Don't create values with leading zeros like "073.3" — that's fine, parseFloat handles it
              // But "." alone isn't valid
              if (valStr === '.' || highStr === '.') continue;

              const high = parseFloat(highStr);
              const val = parseFloat(valStr);
              if (isNaN(high) || isNaN(val)) continue;

              // Range high should be >= range low and reasonable
              if (high < rangeLow * 0.5 || high > rangeLow * 20) continue;

              if (validateValue(param, val)) {
                // Score: how close is this rangeHigh to our known DB range high?
                const score = knownHigh ? Math.abs(high - knownHigh) / knownHigh : 0;
                if (score < bestScore) {
                  bestScore = score;
                  bestValue = val;
                  bestHigh = high;
                }
              }
            }

            // Also try: the full digitRun IS the range high, and value is after it
            // (with optional spaces between)
            const afterFullDigits = afterDash.substring(fullDigits.length);
            const nextValMatch = afterFullDigits.match(/^\s*(\d+\.?\d*)/);
            if (nextValMatch) {
              const high = parseFloat(fullDigits);
              const val = parseFloat(nextValMatch[1]);
              if (high >= rangeLow * 0.5 && high <= rangeLow * 20 && validateValue(param, val)) {
                bestValue = val;
                bestHigh = high;
              }
            }

            if (bestValue !== null) {
              value = bestValue;
              reportRange = { low: rangeLow, high: bestHigh };
              break;
            }
          }

          // Fallback: try the last standalone number at end of line
          if (value === null) {
            const endMatch = afterName.match(/[^0-9](\d+\.?\d*)\s*$/);
            if (endMatch) {
              const v = parseFloat(endMatch[1]);
              if (validateValue(param, v)) {
                value = v;
              }
            }
          }

          // Last fallback: all numbers, try from end
          if (value === null) {
            const allNums = [...afterName.matchAll(/(\d+\.?\d*)/g)].map(m => parseFloat(m[1]));
            for (let k = allNums.length - 1; k >= 0; k--) {
              if (validateValue(param, allNums[k])) {
                value = allNums[k];
                break;
              }
            }
          }
        }

        if (value !== null) {
          seen.add(param.id);
          results.push({
            parameterId: param.id,
            rawName: alias,
            value,
            unit: param.unit,
            reportRange
          });
          break;
        }
      }
    }
  }

  return results;
}

// Minimum parameters needed to consider a report valid
const MIN_VALID_PARAMETERS = 1;

// ─── Clinical Pattern Detection ───
const CLINICAL_PATTERNS = [
  {
    id: 'iron_deficiency',
    name: 'Iron Deficiency Pattern',
    // Triggered if 2+ of these are abnormal in the right direction
    params: {
      'hemoglobin': 'low', 'mcv': 'low', 'mch': 'low', 'mchc': 'low',
      'iron': 'low', 'iron_saturation': 'low', 'ferritin': 'low',
      'tibc': 'high', 'rdw': 'high', 'rdw_sd': 'high', 'hematocrit': 'low'
    },
    minMatches: 2,
    recommendations: [
      '🫘 Iron-rich diet: palak, chukandar, chana, rajma, khajoor, gur (jaggery). Cook in iron kadhai/tawa.',
      '🍋 Always eat Vitamin C with iron foods — nimbu paani, amla, orange. This doubles iron absorption.',
      '🚫 Avoid chai/coffee 1 hour before and after meals — tannins block iron absorption by 60%.',
      '💊 Ask your doctor about iron supplements (ferrous sulfate) and get ferritin tested for confirmation.',
      '🔬 Retest CBC + iron studies after 3 months of iron-rich diet or supplements.'
    ],
    // Suppress generic diet tips from these individual params
    suppress: ['hemoglobin', 'rbc', 'mcv', 'mch', 'mchc', 'iron', 'iron_saturation', 'ferritin', 'tibc', 'uibc', 'rdw', 'rdw_sd', 'hematocrit']
  },
  {
    id: 'b12_deficiency',
    name: 'B12/Folate Deficiency Pattern',
    params: { 'vitamin_b12': 'low', 'mcv': 'high', 'mch': 'high', 'folate': 'low' },
    minMatches: 2,
    recommendations: [
      '🥛 B12-rich foods: dahi, paneer, doodh, eggs, fish. Vegetarians should consider fortified foods.',
      '🥬 Folate sources: palak, moong dal, chana, rajma, beetroot.',
      '💊 B12 supplements or injections may be needed — consult your doctor.',
      '🔬 Retest B12, folate, and CBC after 3 months.'
    ],
    suppress: ['vitamin_b12', 'mcv', 'mch', 'folate']
  },
  {
    id: 'prediabetes',
    name: 'Pre-Diabetes Pattern',
    params: { 'fasting_glucose': 'high', 'hba1c': 'high', 'pp_glucose': 'high' },
    minMatches: 1,
    recommendations: [
      '🍚 Replace white rice/maida with jowar, bajra, ragi, oats. Choose whole grains.',
      '🚶 Walk 30 minutes after every meal — this alone can reduce sugar by 20%.',
      '🌿 Add methi (fenugreek) seeds soaked overnight, karela, dalchini (cinnamon) to your diet.',
      '🚫 Cut out packaged juices, cold drinks, biscuits, and refined sugar completely.'
    ],
    suppress: ['fasting_glucose', 'hba1c', 'pp_glucose']
  },
  {
    id: 'thyroid_hypo',
    name: 'Hypothyroid Pattern',
    params: { 'tsh': 'high', 't3': 'low', 't4': 'low', 'ft3': 'low', 'ft4': 'low' },
    minMatches: 2, // Require 2+ matches — isolated low T3 with normal TSH is NOT hypothyroid
    recommendations: [
      '🦋 Thyroid needs monitoring — consult an endocrinologist for medication if TSH is significantly high.',
      '🥚 Include iodized salt, eggs, dairy, and selenium-rich foods (Brazil nuts, sunflower seeds).',
      '🥦 Cook goitrogens (gobi, patta gobhi, soy) before eating — raw forms can affect thyroid.'
    ],
    suppress: ['tsh', 't3', 't4', 'ft3', 'ft4']
  },
  {
    id: 'lipid_risk',
    name: 'Lipid Risk Pattern',
    params: { 'total_cholesterol': 'high', 'ldl': 'high', 'hdl': 'low', 'triglycerides': 'high', 'vldl': 'high' },
    minMatches: 2,
    recommendations: [
      '🫒 Switch to mustard/olive oil. Avoid dalda, vanaspati, and reused frying oil.',
      '🥜 Daily handful of almonds, walnuts, flaxseeds (alsi) — proven to lower LDL by 10%.',
      '🏃 30 min brisk walking daily raises HDL (good cholesterol) naturally.',
      '🚫 Reduce ghee, butter, full-fat dairy, fried snacks (samosa, pakora, bhujia).'
    ],
    suppress: ['total_cholesterol', 'ldl', 'hdl', 'triglycerides', 'vldl']
  },
  {
    id: 'liver_stress',
    name: 'Liver Stress Pattern',
    params: { 'sgot': 'high', 'sgpt': 'high', 'alp': 'high', 'ggt': 'high' },
    minMatches: 2,
    recommendations: [
      '🚫 Stop alcohol completely. Even "social drinking" stresses an already elevated liver.',
      '🌿 Haldi doodh (turmeric milk) before bed, amla juice in morning — both support liver recovery.',
      '🥗 Light, home-cooked food: khichdi, dalia, steamed vegetables. Avoid oily/fried/outside food.',
      '💊 Avoid painkillers (especially paracetamol) without doctor advice — they stress the liver.'
    ],
    suppress: ['sgot', 'sgpt', 'alp', 'ggt']
  },
  {
    id: 'low_t3_syndrome',
    name: 'Low T3 Syndrome (Non-Thyroidal Illness)',
    params: { 't3': 'low', 'ft3': 'low' },
    // Only trigger if TSH is NOT high (i.e., TSH is normal — this is the key differentiator from hypothyroidism)
    excludeIfAbnormal: ['tsh'], // Custom field — checked in pattern detection
    minMatches: 1,
    recommendations: [
      '🔬 Isolated low T3 with normal TSH is usually NOT hypothyroidism — it\'s often "low T3 syndrome" seen with illness, stress, or nutritional deficiency.',
      '🥗 Focus on overall nutrition — adequate protein (dal, paneer, eggs), selenium (Brazil nuts), and zinc (pumpkin seeds).',
      '🦋 Recheck thyroid panel (TSH, T3, T4) after 6-8 weeks. If TSH remains normal, thyroid medication is usually NOT needed.'
    ],
    suppress: ['t3', 'ft3']
  },
  {
    id: 'nutritional_deficiency',
    name: 'Nutritional Deficiency Pattern',
    params: { 'total_protein': 'low', 'albumin': 'low', 'urea': 'low', 'calcium': 'low', 'iron': 'low' },
    minMatches: 2,
    recommendations: [
      '🍽️ Multiple nutrition markers are low — this suggests your overall diet needs more variety and calories. Consider 3 full meals + 2 snacks daily.',
      '🥛 Calcium aur dairy badhayein: doodh, dahi, chaas, ragi, til (sesame), almonds. Vitamin D helps calcium absorption.',
      '🩺 Consult a General Physician or Nutritionist for a personalized diet plan.'
    ],
    suppress: ['total_protein', 'albumin', 'calcium']
  }
];

// ─── ANALYSIS ENGINE ───
function analyzeResults(parsedResults, gender = 'default') {
  const analysis = {
    parameters: [],
    categories: {},
    overallScore: 0,
    summary: '',
    recommendations: [],
    criticalFlags: []
  };

  let totalScore = 0;
  let paramCount = 0;

  for (const result of parsedResults) {
    const param = PARAMETERS_DB.find(p => p.id === result.parameterId);
    if (!param) continue;

    // USE REPORT'S OWN REFERENCE RANGES when available (from AI extraction)
    // This is critical: different labs use different ranges and units.
    // The lab's printed range is the most accurate for that specific test method.
    const dbRanges = param.ranges[gender] || param.ranges.default;
    let ranges = (result.reportRange && result.reportRange.low !== undefined && result.reportRange.high !== undefined)
      ? result.reportRange
      : dbRanges;
    let rangeSource = (result.reportRange && result.reportRange.low !== undefined) ? 'report' : 'database';

    // Gender-specific range override: for parameters with different male/female ranges (like HDL),
    // use the gender-specific DB range if it has a STRICTER lower bound than the report range.
    // Lab reports often print generic/unisex ranges, missing gender-specific clinical guidelines.
    if (gender !== 'default' && param.ranges[gender]) {
      const genderRange = param.ranges[gender];
      if (genderRange.low > ranges.low) {
        ranges = { ...ranges, low: genderRange.low };
        rangeSource = 'database'; // Gender-specific override
      }
    }

    // Use the unit from the result (which may have been converted) or fall back to DB
    const displayUnit = result.unit || param.unit;

    let status, statusEmoji, paramScore, explanation;

    // For "higher is better" params (like eGFR), values above range are always perfectly normal
    if (param.higherIsBetter && result.value >= ranges.low) {
      status = 'normal';
      statusEmoji = '🟢';
      paramScore = 100;
      explanation = param.highMeaning || 'Normal range mein hai. Sab theek hai!';
    } else if (result.value < ranges.low) {
      const deviation = ranges.low > 0 ? ((ranges.low - result.value) / ranges.low) * 100 : 0;
      if (deviation > 50) {
        status = 'critical_low';
        statusEmoji = '🔴';
        paramScore = 25;
        explanation = param.lowMeaning;
        analysis.criticalFlags.push(`${param.name} is significantly low at ${result.value} ${displayUnit} — needs medical attention`);
      } else if (deviation > 20) {
        status = 'low';
        statusEmoji = '🟠';
        paramScore = 55;
        explanation = param.lowMeaning;
      } else {
        status = 'slightly_low';
        statusEmoji = '🟡';
        paramScore = 75;
        explanation = param.lowMeaning;
      }
    } else if (result.value > ranges.high) {
      const deviation = ranges.high > 0 ? ((result.value - ranges.high) / ranges.high) * 100 : 0;
      if (deviation > 50) {
        status = 'critical_high';
        statusEmoji = '🔴';
        paramScore = 25;
        explanation = param.highMeaning;
        analysis.criticalFlags.push(`${param.name} is significantly high at ${result.value} ${displayUnit} — needs medical attention`);
      } else if (deviation > 20) {
        status = 'high';
        statusEmoji = '🟡';
        paramScore = 55;
        explanation = param.highMeaning;
      } else {
        status = 'slightly_high';
        statusEmoji = '🟡';
        paramScore = 70;
        explanation = param.highMeaning;
      }
    } else {
      // Check if value is borderline (within 10% of range span from a boundary)
      const rangeSpan = ranges.high - ranges.low;
      const lowProximity = rangeSpan > 0 ? (result.value - ranges.low) / rangeSpan : 1;
      const highProximity = rangeSpan > 0 ? (ranges.high - result.value) / rangeSpan : 1;

      if (lowProximity < 0.1 && rangeSpan > 0) {
        status = 'borderline_low';
        statusEmoji = '🔵';
        paramScore = 95;
        explanation = 'Normal range mein hai, lekin lower boundary ke paas hai. Monitor karte rahein.';
      } else if (highProximity < 0.1 && rangeSpan > 0) {
        status = 'borderline_high';
        statusEmoji = '🔵';
        paramScore = 95;
        explanation = 'Normal range mein hai, lekin upper boundary ke paas hai. Monitor karte rahein.';
      } else {
        status = 'normal';
        statusEmoji = '🟢';
        paramScore = 100;
        explanation = 'Normal range mein hai. Sab theek hai!';
      }
    }

    // Suppress clinically insignificant findings (e.g., very low indirect bilirubin)
    if (param.insignificantWhenLow && status.includes('low') && !status.startsWith('critical')) {
      status = 'normal';
      statusEmoji = '🟢';
      paramScore = 100;
      explanation = 'Clinically normal — low values of this parameter are not concerning.';
    }

    const analyzedParam = {
      id: param.id,
      name: param.name,
      category: param.category,
      subCategory: param.subCategory || null,
      value: result.value,
      unit: displayUnit,
      normalRange: param.higherIsBetter ? `> ${ranges.low}` : `${ranges.low} - ${ranges.high}`,
      status,
      statusEmoji,
      score: paramScore,
      explanation,
      doctor: param.doctor,
      diet: param.diet,
      rangeSource
    };

    analysis.parameters.push(analyzedParam);
    totalScore += paramScore;
    paramCount++;

    // Group by category
    if (!analysis.categories[param.category]) {
      analysis.categories[param.category] = {
        name: param.category,
        parameters: [],
        score: 0,
        paramCount: 0
      };
    }
    analysis.categories[param.category].parameters.push(analyzedParam);
    analysis.categories[param.category].score += paramScore;
    analysis.categories[param.category].paramCount++;
  }

  // Calculate scores
  // Weighted score: abnormal findings have more impact, but calibrated to avoid over-penalizing
  // A patient with 1 critical + 2 mild findings + 20 normal should be ~72-78, not 60s
  let weightedTotal = 0;
  let weightSum = 0;
  for (const p of analysis.parameters) {
    let weight = 1;
    if (p.status.startsWith('critical')) weight = 2.5;
    else if (p.status === 'low' || p.status === 'high') weight = 1.8;
    else if (p.status.includes('slightly')) weight = 1.3;
    // borderline and normal stay at weight 1
    weightedTotal += p.score * weight;
    weightSum += weight;
  }
  analysis.overallScore = weightSum > 0 ? Math.round(weightedTotal / weightSum) : 0;

  for (const cat of Object.values(analysis.categories)) {
    cat.score = cat.paramCount > 0 ? Math.round(cat.score / cat.paramCount) : 0;
  }

  // Generate summary — separate truly abnormal from borderline (borderline is still within range)
  const trueAbnormal = analysis.parameters.filter(p => p.status !== 'normal' && !p.status.startsWith('borderline'));
  const borderline = analysis.parameters.filter(p => p.status.startsWith('borderline'));
  const critical = analysis.parameters.filter(p => p.status.startsWith('critical'));
  // Keep combined list for recommendation logic (used later)
  const abnormal = analysis.parameters.filter(p => p.status !== 'normal');

  const borderlineNote = borderline.length > 0 ? ` ${borderline.length} more are borderline (within range but near boundary).` : '';

  if (critical.length > 0) {
    analysis.summary = `${critical.length} parameter(s) are significantly outside normal range. ${trueAbnormal.length - critical.length > 0 ? `${trueAbnormal.length - critical.length} more are mildly abnormal.` : ''}${borderlineNote} A doctor consultation is recommended.`;
  } else if (trueAbnormal.length > 3) {
    analysis.summary = `${trueAbnormal.length} parameters are outside normal range.${borderlineNote} Consider discussing these with your doctor at your next visit.`;
  } else if (trueAbnormal.length > 0) {
    analysis.summary = `Most parameters are normal. ${trueAbnormal.length} parameter(s) are slightly outside range.${borderlineNote} Usually manageable with diet and lifestyle changes.`;
  } else if (borderline.length > 0) {
    analysis.summary = `All parameters are within normal range! ${borderline.length} are near the boundary — worth monitoring but not concerning.`;
  } else {
    analysis.summary = 'All tested parameters are within normal range. Great health! Keep it up.';
  }

  // ─── Pattern-Aware Recommendations ───

  // Unified dedup system — ALL recommendations go through this
  const allRecTextLower = new Set();

  function isDuplicateRec(advice) {
    const lower = advice.toLowerCase();
    if (allRecTextLower.has(lower)) return true;
    // Conceptual duplicate: check if >40% of significant words overlap with any existing rec
    const words = lower.match(/\b[a-z]{4,}\b/g) || [];
    if (words.length < 3) return false;
    for (const existing of allRecTextLower) {
      const existingWords = new Set((existing.match(/\b[a-z]{4,}\b/g) || []));
      const overlap = words.filter(w => existingWords.has(w)).length;
      if (overlap >= words.length * 0.4) return true;
    }
    return false;
  }

  function addRec(advice) {
    if (!advice || isDuplicateRec(advice)) return false;
    analysis.recommendations.push(advice);
    allRecTextLower.add(advice.toLowerCase());
    return true;
  }

  // Step 1: Detect clinical patterns
  const detectedPatterns = [];
  const suppressedParams = new Set();

  for (const pattern of CLINICAL_PATTERNS) {
    let matches = 0;
    for (const [paramId, expectedDirection] of Object.entries(pattern.params)) {
      const found = analysis.parameters.find(p => p.id === paramId);
      if (!found || found.status === 'normal') continue;

      // Borderline values are WITHIN normal range — don't count them as pattern matches
      if (found.status.startsWith('borderline')) continue;

      const isLow = found.status.includes('low');
      const isHigh = found.status.includes('high');

      if ((expectedDirection === 'low' && isLow) || (expectedDirection === 'high' && isHigh)) {
        matches++;
      }
    }

    if (matches >= pattern.minMatches) {
      // Check exclusion rule
      if (pattern.excludeIfAbnormal) {
        const shouldExclude = pattern.excludeIfAbnormal.some(paramId => {
          const found = analysis.parameters.find(p => p.id === paramId);
          return found && found.status !== 'normal' && !found.status.startsWith('borderline');
        });
        if (shouldExclude) continue;
      }

      // Check if a more specific pattern already covers this
      if (pattern.suppressedByPatterns) {
        const alreadyCovered = pattern.suppressedByPatterns.some(pid =>
          detectedPatterns.some(dp => dp.id === pid)
        );
        if (alreadyCovered) continue;
      }

      detectedPatterns.push(pattern);
      // Add pattern-specific recommendations THROUGH DEDUP
      // When many patterns fire, limit recs per pattern to avoid overwhelming the patient
      const maxRecsPerPattern = detectedPatterns.length <= 2 ? pattern.recommendations.length : 3;
      for (let ri = 0; ri < Math.min(pattern.recommendations.length, maxRecsPerPattern); ri++) {
        addRec(pattern.recommendations[ri]);
      }
      pattern.suppress.forEach(id => suppressedParams.add(id));
    }
  }

  analysis.detectedPatterns = detectedPatterns.map(p => p.name);

  // Step 2: Add funneled doctor recommendation
  // Flatten and deduplicate specialist names (e.g., "General Physician / Hematologist" → separate entries)
  function flattenDoctors(params) {
    const all = params.flatMap(p => (p.doctor || '').split(/\s*[\/,]\s*/)).filter(Boolean).map(d => d.trim());
    // Remove "General Physician" from specialist list if other specialists exist
    const specialists = [...new Set(all)];
    const nonGP = specialists.filter(d => d !== 'General Physician');
    return nonGP.length > 0 ? nonGP : specialists;
  }

  const doctorsNeeded = flattenDoctors(trueAbnormal);
  if (critical.length > 0) {
    const criticalDoctors = flattenDoctors(critical);
    const specialistStr = criticalDoctors.slice(0, 2).join(' or ');
    analysis.recommendations.unshift(`🩺 Priority: See a doctor soon. Start with a General Physician who may refer you to ${specialistStr}.`);
  } else if (doctorsNeeded.length > 0) {
    if (doctorsNeeded.length <= 2) {
      analysis.recommendations.unshift(`🩺 Discuss these findings with your doctor (${doctorsNeeded.join(' or ')}) at your next visit.`);
    } else {
      analysis.recommendations.unshift(`🩺 Start with a General Physician who can review all findings and refer to specialists if needed.`);
    }
  }

  // Step 3: Add individual diet tips for TRULY ABNORMAL params (not borderline, not already covered by patterns)
  // Prioritize: critical > abnormal > slightly. Cap to avoid overwhelming.
  const kidneyParams = ['creatinine', 'bun', 'urea', 'egfr', 'uric_acid'];
  const kidneyAbnormal = trueAbnormal.some(p => kidneyParams.includes(p.id));
  const sortedAbnormal = [...trueAbnormal].sort((a, b) => a.score - b.score); // worst first
  let individualDietCount = 0;
  const maxIndividualDiets = detectedPatterns.length >= 3 ? 3 : 5; // fewer slots when many patterns

  for (const p of sortedAbnormal) {
    if (individualDietCount >= maxIndividualDiets) break;
    if (!p.diet || suppressedParams.has(p.id)) continue;

    // Filter context-inappropriate: kidney diet when kidneys are normal
    if (!kidneyAbnormal && /kidney|renal|nephr|low salt|low potassium|limit protein/i.test(p.diet) && !kidneyParams.includes(p.id)) continue;

    const isLow = p.status.includes('low');
    const isHigh = p.status.includes('high');
    let dietAdvice = p.diet;

    // If diet has direction-specific sections, pick the relevant one
    const hasHighLow = /high\s+\w+.*?:/i.test(dietAdvice) && /low\s+\w+.*?:/i.test(dietAdvice);
    if (hasHighLow) {
      const highMatch = dietAdvice.match(/high\s+\w+\s*:\s*(.*?)(?=\.\s*low\s+\w+\s*:|$)/is);
      const lowMatch = dietAdvice.match(/low\s+\w+\s*:\s*(.*?)(?=\.\s*high\s+\w+\s*:|$)/is);
      if (isLow && lowMatch) dietAdvice = lowMatch[1].trim();
      else if (isHigh && highMatch) dietAdvice = highMatch[1].trim();
    }

    if (addRec(dietAdvice)) individualDietCount++;
  }

  // Step 4: Contextual generic tips
  if (analysis.recommendations.length > 0) {
    addRec('🔬 Retest after 3 months to track improvement.');
  }
  if (!suppressedParams.has('uric_acid') && !suppressedParams.has('creatinine')) {
    addRec('💧 Stay hydrated — 3-4 liters of water daily.');
  }

  // Step 5: Suggest missing but relevant tests
  const testedIds = new Set(analysis.parameters.map(p => p.id));
  const suggestedTests = [];

  // If iron/hemoglobin low but ferritin not tested → suggest ferritin
  if ((testedIds.has('iron') || testedIds.has('hemoglobin')) && !testedIds.has('ferritin')) {
    const ironParam = analysis.parameters.find(p => p.id === 'iron' || p.id === 'hemoglobin');
    if (ironParam && ironParam.status.includes('low')) {
      suggestedTests.push('Ferritin (to confirm iron stores)');
    }
  }
  // If fasting glucose high but HbA1c not tested → suggest HbA1c
  if (testedIds.has('fasting_glucose') && !testedIds.has('hba1c')) {
    const fbsParam = analysis.parameters.find(p => p.id === 'fasting_glucose');
    if (fbsParam && fbsParam.status.includes('high')) {
      suggestedTests.push('HbA1c (3-month average sugar — confirms pre-diabetes vs one-time spike)');
    }
  }
  // If vitamin D low but calcium not tested → suggest calcium
  if (testedIds.has('vitamin_d') && !testedIds.has('calcium')) {
    const vdParam = analysis.parameters.find(p => p.id === 'vitamin_d');
    if (vdParam && vdParam.status.includes('low')) {
      suggestedTests.push('Calcium + Phosphorus (vitamin D affects calcium absorption)');
    }
  }
  // If thyroid abnormal but all 3 (TSH, T3, T4) not tested → suggest complete panel
  const thyroidTested = ['tsh', 't3', 't4'].filter(id => testedIds.has(id));
  if (thyroidTested.length > 0 && thyroidTested.length < 3) {
    suggestedTests.push('Complete thyroid panel (TSH + T3 + T4) for full picture');
  }
  // If Low T3 Syndrome detected → always recommend thyroid recheck even if all 3 were tested
  if (detectedPatterns.some(p => p.id === 'low_t3_syndrome')) {
    if (thyroidTested.length >= 3) {
      suggestedTests.push('Recheck thyroid panel (TSH + T3 + T4) in 6-8 weeks to confirm Low T3 Syndrome vs developing hypothyroidism');
    }
  }

  if (suggestedTests.length > 0) {
    analysis.suggestedTests = suggestedTests;
    analysis.recommendations.push(`📋 Recommended additional tests: ${suggestedTests.join('; ')}`);
  }

  // Step 6: Corrected Calcium (if both calcium and albumin are present)
  const calciumParam = analysis.parameters.find(p => p.id === 'calcium');
  const albuminParam = analysis.parameters.find(p => p.id === 'albumin');
  if (calciumParam && albuminParam && albuminParam.value < 4.0) {
    // Formula: Corrected Ca = Measured Ca + 0.8 × (4.0 - Albumin)
    const correctedCa = +(calciumParam.value + 0.8 * (4.0 - albuminParam.value)).toFixed(1);
    analysis.correctedCalcium = {
      measured: calciumParam.value,
      albumin: albuminParam.value,
      corrected: correctedCa,
      note: correctedCa >= 8.5 && correctedCa <= 10.5
        ? `Corrected calcium is ${correctedCa} mg/dL (normal). Your albumin is slightly low which makes calcium appear lower than it actually is — no calcium concern.`
        : `Corrected calcium is ${correctedCa} mg/dL. This adjusts for your albumin level of ${albuminParam.value} g/dL.`
    };
  }

  // Step 7: Tiered priority structure for action plan
  const actionPlan = { thisWeek: [], thisMonth: [], in3Months: [] };

  if (critical.length > 0) {
    actionPlan.thisWeek.push('🚨 See a doctor for critical findings: ' + critical.map(p => p.name).join(', '));
  }
  if (detectedPatterns.length > 0) {
    actionPlan.thisWeek.push('📋 Start pattern-specific diet changes (see recommendations above)');
  }
  for (const p of trueAbnormal) {
    if (p.status.startsWith('critical')) continue; // Already in thisWeek
    if (p.status === 'low' || p.status === 'high') {
      actionPlan.thisMonth.push(`Address ${p.name} (${p.statusEmoji} ${p.status})`);
    } else if (p.status.includes('slightly')) {
      actionPlan.in3Months.push(`Monitor ${p.name} — mild deviation`);
    }
  }
  if (borderline.length > 0) {
    actionPlan.in3Months.push(`Recheck ${borderline.length} borderline parameter(s) on next test`);
  }
  if (suggestedTests.length > 0) {
    actionPlan.thisMonth.push('Get recommended additional tests');
  }
  if (actionPlan.thisWeek.length > 0 || actionPlan.thisMonth.length > 0 || actionPlan.in3Months.length > 0) {
    analysis.actionPlan = actionPlan;
  }

  return analysis;
}

// ─── DEMO DATA (for testing without actual PDF) ───
function getDemoAnalysis() {
  const demoResults = [
    { parameterId: 'hemoglobin', rawName: 'Hemoglobin', value: 11.2, unit: 'g/dL' },
    { parameterId: 'rbc', rawName: 'RBC Count', value: 4.1, unit: 'million/µL' },
    { parameterId: 'wbc', rawName: 'WBC Count', value: 7500, unit: 'cells/µL' },
    { parameterId: 'platelets', rawName: 'Platelet Count', value: 250, unit: '×10³/µL' },
    { parameterId: 'esr', rawName: 'ESR', value: 28, unit: 'mm/hr' },
    { parameterId: 'fasting_glucose', rawName: 'Fasting Blood Sugar', value: 118, unit: 'mg/dL' },
    { parameterId: 'hba1c', rawName: 'HbA1c', value: 6.1, unit: '%' },
    { parameterId: 'total_cholesterol', rawName: 'Total Cholesterol', value: 228, unit: 'mg/dL' },
    { parameterId: 'ldl', rawName: 'LDL Cholesterol', value: 142, unit: 'mg/dL' },
    { parameterId: 'hdl', rawName: 'HDL Cholesterol', value: 38, unit: 'mg/dL' },
    { parameterId: 'triglycerides', rawName: 'Triglycerides', value: 185, unit: 'mg/dL' },
    { parameterId: 'sgot', rawName: 'SGOT', value: 35, unit: 'U/L' },
    { parameterId: 'sgpt', rawName: 'SGPT', value: 52, unit: 'U/L' },
    { parameterId: 'creatinine', rawName: 'Creatinine', value: 1.0, unit: 'mg/dL' },
    { parameterId: 'urea', rawName: 'Blood Urea', value: 18, unit: 'mg/dL' },
    { parameterId: 'uric_acid', rawName: 'Uric Acid', value: 7.8, unit: 'mg/dL' },
    { parameterId: 'tsh', rawName: 'TSH', value: 5.8, unit: 'mIU/L' },
    { parameterId: 'vitamin_d', rawName: 'Vitamin D', value: 14, unit: 'ng/mL' },
    { parameterId: 'vitamin_b12', rawName: 'Vitamin B12', value: 165, unit: 'pg/mL' },
    { parameterId: 'calcium', rawName: 'Calcium', value: 9.2, unit: 'mg/dL' },
    { parameterId: 'iron', rawName: 'Serum Iron', value: 45, unit: 'µg/dL' },
    { parameterId: 'ferritin', rawName: 'Ferritin', value: 8, unit: 'ng/mL' },
    { parameterId: 'bilirubin_total', rawName: 'Total Bilirubin', value: 0.9, unit: 'mg/dL' },
    { parameterId: 'sodium', rawName: 'Sodium', value: 140, unit: 'mEq/L' },
    { parameterId: 'potassium', rawName: 'Potassium', value: 4.2, unit: 'mEq/L' }
  ];

  return analyzeResults(demoResults, 'female');
}

// ═══════════════════════════════════════════════════════════════
// FEATURE 1: Clinical Risk Prediction Scores
// Published medical formulas — zero AI
// ═══════════════════════════════════════════════════════════════

function calculateRiskScores(parameters, age, gender) {
  const scores = [];
  // Build a lookup map: parameterId → value
  const pMap = {};
  if (Array.isArray(parameters)) {
    parameters.forEach(p => {
      const id = p.parameterId || p.id;
      if (id) pMap[id] = p.value;
    });
  }

  const numAge = parseFloat(age) || 0;
  const isMale = (gender === 'male');
  const isFemale = (gender === 'female');

  // ── a) Framingham Heart Risk Score (simplified points system) ──
  const tc = pMap.total_cholesterol;
  const hdl = pMap.hdl;
  if (tc && hdl && numAge >= 20) {
    let points = 0;
    // Age points
    if (isMale) {
      if (numAge <= 34) points += -9;
      else if (numAge <= 39) points += -4;
      else if (numAge <= 44) points += 0;
      else if (numAge <= 49) points += 3;
      else if (numAge <= 54) points += 6;
      else if (numAge <= 59) points += 8;
      else if (numAge <= 64) points += 10;
      else if (numAge <= 69) points += 11;
      else if (numAge <= 74) points += 12;
      else points += 13;
    } else {
      if (numAge <= 34) points += -7;
      else if (numAge <= 39) points += -3;
      else if (numAge <= 44) points += 0;
      else if (numAge <= 49) points += 3;
      else if (numAge <= 54) points += 6;
      else if (numAge <= 59) points += 8;
      else if (numAge <= 64) points += 10;
      else if (numAge <= 69) points += 12;
      else if (numAge <= 74) points += 14;
      else points += 16;
    }
    // Total cholesterol points
    if (tc < 160) points += 0;
    else if (tc <= 199) points += (isMale ? 4 : 4);
    else if (tc <= 239) points += (isMale ? 7 : 8);
    else if (tc <= 279) points += (isMale ? 9 : 11);
    else points += (isMale ? 11 : 13);
    // HDL points
    if (hdl >= 60) points += -1;
    else if (hdl >= 50) points += 0;
    else if (hdl >= 40) points += 1;
    else points += 2;

    // Convert points to 10-year risk percentage (simplified Framingham lookup)
    let riskPercent;
    if (isMale) {
      const maleRiskTable = { '-1': 1, 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 8, 12: 10, 13: 12, 14: 16, 15: 20, 16: 25, 17: 30 };
      riskPercent = points <= -1 ? 1 : (points >= 17 ? 30 : (maleRiskTable[points] || Math.min(30, Math.max(1, points * 2))));
    } else {
      const femaleRiskTable = { '-1': 1, 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 11: 8, 12: 10, 13: 12, 14: 16, 15: 20, 16: 25, 17: 30 };
      riskPercent = points <= -1 ? 1 : (points >= 17 ? 30 : (femaleRiskTable[points] || Math.min(30, Math.max(1, points * 2))));
    }

    let category, color;
    if (riskPercent < 10) { category = 'Low Risk'; color = 'green'; }
    else if (riskPercent <= 20) { category = 'Moderate Risk'; color = 'yellow'; }
    else { category = 'High Risk'; color = 'red'; }

    scores.push({
      name: 'Framingham Heart Risk (10-Year CVD)',
      score: riskPercent + '%',
      rawScore: riskPercent,
      category,
      color,
      explanation: `Your estimated 10-year risk of cardiovascular disease is ${riskPercent}%. This is based on your age, cholesterol (${tc} mg/dL), and HDL (${hdl} mg/dL).`,
      recommendation: category === 'Low Risk'
        ? 'Maintain healthy lifestyle — exercise 30 min/day and eat heart-healthy foods.'
        : category === 'Moderate Risk'
        ? 'Consult a cardiologist. Focus on reducing LDL with diet, exercise, and possibly statins.'
        : 'See a cardiologist urgently. Aggressive risk factor modification needed — diet, exercise, and medication.'
    });
  }

  // ── b) HOMA-IR (Insulin Resistance Index) ──
  const fbs = pMap.fasting_glucose;
  const insulin = pMap.insulin;
  if (fbs && insulin) {
    const homaIR = +((fbs * insulin) / 405).toFixed(2);
    let category, color;
    if (homaIR < 1.0) { category = 'Normal'; color = 'green'; }
    else if (homaIR <= 1.4) { category = 'Optimal'; color = 'green'; }
    else if (homaIR <= 2.9) { category = 'Early Insulin Resistance'; color = 'yellow'; }
    else { category = 'Significant Insulin Resistance'; color = 'red'; }

    scores.push({
      name: 'HOMA-IR (Insulin Resistance)',
      score: homaIR,
      rawScore: homaIR,
      category,
      color,
      explanation: `HOMA-IR = (Fasting Glucose ${fbs} x Insulin ${insulin}) / 405 = ${homaIR}. This measures how well your body responds to insulin.`,
      recommendation: homaIR < 1.5
        ? 'Your insulin sensitivity is good. Maintain with regular exercise and balanced diet.'
        : homaIR < 3.0
        ? 'Early insulin resistance detected. Increase physical activity, reduce refined carbs and sugar. Methi seeds and bitter gourd help.'
        : 'Significant insulin resistance. Consult an endocrinologist. Low-carb diet, daily exercise, and possibly metformin may be needed.'
    });
  }

  // ── c) FIB-4 Score (Liver Fibrosis) ──
  const ast = pMap.sgot;
  const alt = pMap.sgpt;
  const platelets = pMap.platelets;
  if (ast && alt && platelets && numAge > 0) {
    // Platelets should be in 10^9/L. Our DB stores as x10^3/uL which is same as 10^9/L
    const fib4 = +((numAge * ast) / (platelets * Math.sqrt(alt))).toFixed(2);
    let category, color;
    if (fib4 < 1.30) { category = 'Low Risk (No/Minimal Fibrosis)'; color = 'green'; }
    else if (fib4 <= 2.67) { category = 'Indeterminate'; color = 'yellow'; }
    else { category = 'High Risk (Advanced Fibrosis)'; color = 'red'; }

    scores.push({
      name: 'FIB-4 (Liver Fibrosis)',
      score: fib4,
      rawScore: fib4,
      category,
      color,
      explanation: `FIB-4 = (Age ${numAge} x AST ${ast}) / (Platelets ${platelets} x sqrt(ALT ${alt})) = ${fib4}. This estimates the degree of liver scarring.`,
      recommendation: fib4 < 1.30
        ? 'Low risk of liver fibrosis. Continue healthy lifestyle and avoid alcohol excess.'
        : fib4 <= 2.67
        ? 'Indeterminate — further testing (FibroScan or liver biopsy) may be needed. Consult a hepatologist.'
        : 'High risk of advanced fibrosis. See a hepatologist/gastroenterologist urgently. Avoid alcohol completely.'
    });
  }

  // ── d) eGFR / CKD Staging ──
  const egfr = pMap.egfr;
  if (egfr) {
    let stage, category, color, recommendation;
    if (egfr >= 90) {
      stage = 'Stage 1'; category = 'Normal Kidney Function'; color = 'green';
      recommendation = 'Kidneys are working well. Stay hydrated and maintain healthy blood pressure.';
    } else if (egfr >= 60) {
      stage = 'Stage 2'; category = 'Mildly Reduced'; color = 'green';
      recommendation = 'Mild reduction — monitor annually. Stay hydrated, limit salt, avoid NSAIDs (Brufen, Combiflam).';
    } else if (egfr >= 45) {
      stage = 'Stage 3a'; category = 'Mild-Moderate Reduction'; color = 'yellow';
      recommendation = 'Consult a nephrologist. Low-salt diet, limit protein, avoid painkillers. Monitor every 3-6 months.';
    } else if (egfr >= 30) {
      stage = 'Stage 3b'; category = 'Moderate-Severe Reduction'; color = 'yellow';
      recommendation = 'See a nephrologist regularly. Strict dietary control — low protein, low potassium, low phosphorus. Avoid nephrotoxic drugs.';
    } else if (egfr >= 15) {
      stage = 'Stage 4'; category = 'Severe Reduction'; color = 'red';
      recommendation = 'Advanced kidney disease. Nephrologist care essential. Prepare for possible dialysis. Very strict diet control.';
    } else {
      stage = 'Stage 5'; category = 'Kidney Failure'; color = 'red';
      recommendation = 'Kidney failure — dialysis or transplant likely needed. Immediate nephrology care required.';
    }

    scores.push({
      name: 'CKD Staging (Kidney Disease)',
      score: `${stage} (eGFR: ${egfr})`,
      rawScore: egfr,
      category,
      color,
      explanation: `Your eGFR is ${egfr} mL/min/1.73m². This classifies as ${stage} — ${category.toLowerCase()}.`,
      recommendation
    });
  }

  // ── e) Atherogenic Index of Plasma (AIP) ──
  const tg = pMap.triglycerides;
  if (tg && hdl) {
    const aip = +(Math.log10(tg / hdl)).toFixed(2);
    let category, color;
    if (aip < 0.11) { category = 'Low Risk'; color = 'green'; }
    else if (aip <= 0.21) { category = 'Intermediate Risk'; color = 'yellow'; }
    else { category = 'High Risk'; color = 'red'; }

    scores.push({
      name: 'AIP (Atherogenic Index of Plasma)',
      score: aip,
      rawScore: aip,
      category,
      color,
      explanation: `AIP = log10(Triglycerides ${tg} / HDL ${hdl}) = ${aip}. This predicts cardiovascular risk based on your lipid profile.`,
      recommendation: aip < 0.11
        ? 'Low cardiovascular risk from lipids. Maintain with regular exercise and healthy fats.'
        : aip <= 0.21
        ? 'Intermediate risk — improve by raising HDL (exercise, nuts, fish) and lowering triglycerides (cut sugar, refined carbs).'
        : 'High atherogenic risk. Cut sugar and refined carbs completely, exercise daily, eat omega-3 rich foods (fish, walnuts, flaxseeds). Consult cardiologist.'
    });
  }

  // ── f) Diabetes Risk Assessment ──
  const hba1c = pMap.hba1c;
  if (hba1c || fbs) {
    let hba1cClass = 'normal', fbsClass = 'normal';
    if (hba1c) {
      if (hba1c >= 6.5) hba1cClass = 'diabetic';
      else if (hba1c >= 5.7) hba1cClass = 'prediabetic';
    }
    if (fbs) {
      if (fbs >= 126) fbsClass = 'diabetic';
      else if (fbs >= 100) fbsClass = 'prediabetic';
    }
    // Use the worse classification
    const classOrder = { normal: 0, prediabetic: 1, diabetic: 2 };
    const finalClass = classOrder[hba1cClass] >= classOrder[fbsClass] ? hba1cClass : fbsClass;

    let category, color, explanation, recommendation;
    const parts = [];
    if (hba1c) parts.push(`HbA1c: ${hba1c}%`);
    if (fbs) parts.push(`Fasting Glucose: ${fbs} mg/dL`);

    if (finalClass === 'normal') {
      category = 'Normal'; color = 'green';
      explanation = `${parts.join(', ')} — within normal limits. No diabetes risk.`;
      recommendation = 'Blood sugar is normal. Maintain with balanced diet, regular exercise, and annual screening.';
    } else if (finalClass === 'prediabetic') {
      category = 'Pre-Diabetic'; color = 'yellow';
      explanation = `${parts.join(', ')} — pre-diabetic range. Your body is showing early signs of insulin resistance.`;
      recommendation = 'Pre-diabetes is REVERSIBLE with lifestyle changes. Walk 30 min after meals, replace maida/white rice with millets (jowar, bajra, ragi), add methi seeds, and lose 5-7% body weight.';
    } else {
      category = 'Diabetic Range'; color = 'red';
      explanation = `${parts.join(', ')} — diabetic range. This needs immediate medical attention.`;
      recommendation = 'Consult a diabetologist immediately. Start medication if advised. Strict diet control — no sugar, no maida, no packaged juice. Monitor sugar regularly.';
    }

    scores.push({
      name: 'Diabetes Risk Assessment',
      score: finalClass === 'normal' ? 'Normal' : finalClass === 'prediabetic' ? 'Pre-Diabetic' : 'Diabetic',
      rawScore: hba1c || fbs,
      category,
      color,
      explanation,
      recommendation
    });
  }

  return scores;
}

function handleRiskScores(req, res) {
  try {
    const { parameters, age, gender } = req.body;
    if (!parameters || !Array.isArray(parameters)) {
      return res.status(400).json({ success: false, message: 'Parameters array required.' });
    }
    const scores = calculateRiskScores(parameters, age, gender);
    return res.json({ success: true, scores });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error calculating risk scores: ' + err.message });
  }
}


// ═══════════════════════════════════════════════════════════════
// FEATURE 2: Medicine-Food Interaction Database
// ═══════════════════════════════════════════════════════════════

const medicineInteractions = [
  // ─── DIABETES ───
  {
    medicine: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    brandNames: ['Glycomet', 'Glucophage', 'Obimet', 'Gluformin', 'Glyciphage'],
    condition: 'Type 2 Diabetes',
    triggerParams: ['fasting_glucose', 'hba1c', 'pp_glucose'],
    triggerCondition: (p) => (p.fasting_glucose > 126 || p.hba1c > 6.5 || p.pp_glucose > 200),
    avoid: ['Alcohol — increases lactic acidosis risk', 'Excessive sugar and refined carbs'],
    helpful: ['High-fiber foods (oats, rajma, chana)', 'Methi seeds — enhances insulin sensitivity', 'Bitter gourd (karela) — natural sugar control'],
    timing: 'Take with meals to reduce stomach upset',
    warnings: ['May cause Vitamin B12 deficiency with long-term use — eat curd, paneer, eggs', 'Avoid if kidney function is impaired (eGFR <30)'],
    indianTip: 'Methi dana soaked overnight + morning walk = best natural supplement with Metformin'
  },
  {
    medicine: 'Glimepiride',
    genericName: 'Glimepiride',
    brandNames: ['Amaryl', 'Glimisave', 'Glimy', 'Zoryl'],
    condition: 'Type 2 Diabetes',
    triggerParams: ['fasting_glucose', 'hba1c'],
    triggerCondition: (p) => (p.fasting_glucose > 140 || p.hba1c > 7.0),
    avoid: ['Alcohol — can cause severe hypoglycemia', 'Skipping meals after taking the medicine'],
    helpful: ['Complex carbs (roti, brown rice, dal)', 'Regular meal timings', 'Fiber-rich foods'],
    timing: 'Take with breakfast or first main meal',
    warnings: ['Can cause low blood sugar — always carry glucose tablets or mishri', 'Do not skip meals after taking this medicine'],
    indianTip: 'Keep a packet of glucose biscuits in your pocket always — hypo attack can happen anytime'
  },
  {
    medicine: 'Sitagliptin',
    genericName: 'Sitagliptin Phosphate',
    brandNames: ['Januvia', 'Istavel', 'Zita', 'Sitaglu'],
    condition: 'Type 2 Diabetes',
    triggerParams: ['fasting_glucose', 'hba1c'],
    triggerCondition: (p) => (p.fasting_glucose > 126 || p.hba1c > 6.5),
    avoid: ['Excessive sweets and sugar', 'High-calorie foods'],
    helpful: ['Balanced meals with protein and fiber', 'Green leafy vegetables', 'Low-GI foods'],
    timing: 'Can be taken with or without food, once daily',
    warnings: ['Rare risk of pancreatitis — report severe abdominal pain immediately', 'Dose adjustment needed if kidneys are weak'],
    indianTip: 'Pair with karela sabzi and dalchini (cinnamon) tea for best sugar control'
  },
  {
    medicine: 'Insulin',
    genericName: 'Insulin (Various types)',
    brandNames: ['Actrapid', 'Huminsulin', 'Lantus', 'Humalog', 'Novorapid', 'Tresiba'],
    condition: 'Diabetes (Type 1 & Type 2)',
    triggerParams: ['fasting_glucose', 'hba1c'],
    triggerCondition: (p) => (p.fasting_glucose > 200 || p.hba1c > 9.0),
    avoid: ['Alcohol — unpredictable blood sugar swings', 'Skipping meals after injection', 'Very high sugar foods'],
    helpful: ['Consistent carb intake at each meal', 'Regular meal timings', 'Complex carbs over simple sugars'],
    timing: 'Depends on type: rapid-acting before meals, long-acting at bedtime',
    warnings: ['NEVER skip meals after taking insulin', 'Keep glucose tablets/sugar handy for hypo episodes', 'Rotate injection sites to avoid lumps'],
    indianTip: 'Roti + dal + sabzi is the ideal insulin-friendly Indian meal — consistent carbs with protein'
  },
  {
    medicine: 'Pioglitazone',
    genericName: 'Pioglitazone',
    brandNames: ['Pioz', 'Piozone', 'Actos'],
    condition: 'Type 2 Diabetes (Insulin Resistance)',
    triggerParams: ['fasting_glucose', 'hba1c', 'insulin'],
    triggerCondition: (p) => (p.insulin > 25 || (p.fasting_glucose > 126 && p.hba1c > 6.5)),
    avoid: ['High-calorie diet — can cause weight gain', 'Alcohol', 'Excess salt — can cause fluid retention'],
    helpful: ['Low-calorie balanced diet', 'Fiber-rich foods', 'Regular exercise to counter weight gain'],
    timing: 'Take once daily with or without food',
    warnings: ['Can cause weight gain and fluid retention', 'Not for patients with heart failure', 'Report leg swelling immediately'],
    indianTip: 'Walk 30 minutes after dinner daily — helps counter the weight gain tendency of this medicine'
  },
  {
    medicine: 'Voglibose',
    genericName: 'Voglibose',
    brandNames: ['Vogli', 'Voglistar', 'Volix', 'Vobose'],
    condition: 'Type 2 Diabetes (Post-meal sugar control)',
    triggerParams: ['pp_glucose', 'fasting_glucose'],
    triggerCondition: (p) => (p.pp_glucose > 180 || p.fasting_glucose > 110),
    avoid: ['Simple sugars and refined carbs right after meals', 'Large portions of rice'],
    helpful: ['Fiber-rich foods — slow down sugar absorption', 'Small frequent meals', 'Vegetables before carbs'],
    timing: 'Take just before each meal (with first bite)',
    warnings: ['May cause bloating and gas initially', 'Not effective if taken after meals'],
    indianTip: 'Eat sabzi first, then dal, then roti/rice — this naturally slows sugar absorption like Voglibose does'
  },

  // ─── HEART / BP ───
  {
    medicine: 'Atenolol',
    genericName: 'Atenolol',
    brandNames: ['Aten', 'Tenormin', 'Betacard'],
    condition: 'High Blood Pressure / Heart Rate Control',
    triggerParams: ['total_cholesterol', 'ldl', 'triglycerides'],
    triggerCondition: (p) => (p.total_cholesterol > 240 || p.ldl > 160),
    avoid: ['Excess caffeine — can reduce effectiveness', 'Alcohol — increases BP-lowering effect dangerously', 'Sudden strenuous exercise'],
    helpful: ['Low-sodium diet', 'Potassium-rich foods (banana, coconut water) in moderation', 'DASH diet principles'],
    timing: 'Take at the same time daily, preferably morning',
    warnings: ['Never stop suddenly — can cause rebound high BP/heart rate', 'May mask symptoms of low blood sugar in diabetics', 'Can cause cold hands and feet'],
    indianTip: 'Lauki (bottle gourd) juice in the morning is a traditional Indian remedy that genuinely helps with BP'
  },
  {
    medicine: 'Amlodipine',
    genericName: 'Amlodipine Besylate',
    brandNames: ['Amlopress', 'Amlokind', 'Stamlo', 'Amlogard', 'Norvasc'],
    condition: 'High Blood Pressure',
    triggerParams: ['total_cholesterol', 'ldl'],
    triggerCondition: (p) => (p.total_cholesterol > 220 || p.ldl > 130),
    avoid: ['Grapefruit juice — increases drug levels dangerously', 'Excess salt', 'Alcohol'],
    helpful: ['Low-sodium diet (less namak)', 'Fruits and vegetables', 'Potassium-rich foods'],
    timing: 'Take once daily, morning or evening consistently',
    warnings: ['May cause ankle swelling — elevate legs when sitting', 'Grapefruit interaction is serious — avoid completely', 'Dizziness possible when starting'],
    indianTip: 'Reduce namak in food and avoid papad, achaar, and processed foods — biggest sodium culprits in Indian diet'
  },
  {
    medicine: 'Telmisartan',
    genericName: 'Telmisartan',
    brandNames: ['Telma', 'Telmikind', 'Telvas', 'Sartel', 'Cresar'],
    condition: 'High Blood Pressure / Kidney Protection',
    triggerParams: ['creatinine', 'egfr', 'total_cholesterol'],
    triggerCondition: (p) => (p.creatinine > 1.4 || (p.egfr && p.egfr < 60) || p.total_cholesterol > 240),
    avoid: ['Potassium supplements — Telmisartan already raises potassium', 'Excess coconut water/banana if on this drug', 'NSAIDs (Brufen, Combiflam)'],
    helpful: ['Low-salt diet', 'Adequate hydration', 'Balanced diet with moderate potassium'],
    timing: 'Take once daily at the same time',
    warnings: ['Monitor potassium levels — can cause high potassium', 'Stay well hydrated', 'Avoid NSAIDs (painkillers) as they reduce effectiveness and harm kidneys'],
    indianTip: 'Nariyal paani (coconut water) is usually healthy, but limit to 1 glass/day if on Telmisartan — excess potassium risk'
  },
  {
    medicine: 'Losartan',
    genericName: 'Losartan Potassium',
    brandNames: ['Losacar', 'Losar', 'Repace', 'Cosart'],
    condition: 'High Blood Pressure',
    triggerParams: ['creatinine', 'total_cholesterol'],
    triggerCondition: (p) => (p.creatinine > 1.3 || p.total_cholesterol > 230),
    avoid: ['Potassium supplements', 'Salt substitutes (contain potassium)', 'NSAIDs'],
    helpful: ['Low-salt diet', 'Fresh fruits and vegetables', 'Regular hydration'],
    timing: 'Once daily, with or without food',
    warnings: ['Can raise potassium levels', 'Not safe in pregnancy', 'Monitor kidney function regularly'],
    indianTip: 'Replace table salt with pink salt (sendha namak) in limited quantities — but do NOT use potassium-based salt substitutes'
  },
  {
    medicine: 'Enalapril',
    genericName: 'Enalapril Maleate',
    brandNames: ['Enace', 'Enam', 'Envas'],
    condition: 'High Blood Pressure / Heart Failure',
    triggerParams: ['creatinine', 'total_cholesterol', 'egfr'],
    triggerCondition: (p) => (p.creatinine > 1.3 || p.total_cholesterol > 240),
    avoid: ['Potassium-rich foods in excess', 'NSAIDs', 'Alcohol'],
    helpful: ['Low-sodium diet', 'Balanced meals', 'Adequate water intake'],
    timing: 'Take once or twice daily as prescribed',
    warnings: ['May cause dry cough — very common side effect', 'Monitor potassium and kidney function', 'Not safe in pregnancy'],
    indianTip: 'If you develop a persistent dry cough on Enalapril, ask your doctor to switch to Telmisartan — it works similarly without the cough'
  },
  {
    medicine: 'Ramipril',
    genericName: 'Ramipril',
    brandNames: ['Cardace', 'Ramistar', 'Ramace', 'Zigpril'],
    condition: 'High Blood Pressure / Heart Protection',
    triggerParams: ['total_cholesterol', 'ldl', 'creatinine'],
    triggerCondition: (p) => (p.total_cholesterol > 220 || p.ldl > 130),
    avoid: ['Potassium supplements', 'NSAIDs', 'Alcohol'],
    helpful: ['Heart-healthy diet — fruits, vegetables, whole grains', 'Omega-3 fatty acids', 'Low-salt cooking'],
    timing: 'Take once daily, preferably at bedtime',
    warnings: ['May cause dry cough', 'Can raise potassium', 'Dizziness when standing up quickly'],
    indianTip: 'Saunf (fennel) water after meals helps with digestion and mildly supports BP — good companion habit'
  },

  // ─── CHOLESTEROL ───
  {
    medicine: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Atorva', 'Lipitor', 'Atorlip', 'Storvas', 'Atocor'],
    condition: 'High Cholesterol',
    triggerParams: ['total_cholesterol', 'ldl', 'triglycerides'],
    triggerCondition: (p) => (p.total_cholesterol > 240 || p.ldl > 130 || p.triglycerides > 200),
    avoid: ['Grapefruit and grapefruit juice — dangerously increases drug levels', 'Excessive alcohol — combined liver stress', 'High-fat fried foods'],
    helpful: ['Oats (jayi) — proven to reduce LDL by 5-10%', 'Almonds, walnuts, flaxseeds (alsi)', 'Olive oil or mustard oil for cooking'],
    timing: 'Take at night — cholesterol production peaks during sleep',
    warnings: ['Report muscle pain immediately (rare but serious side effect)', 'Get liver function tested every 6 months', 'Grapefruit interaction is serious'],
    indianTip: 'Ek muthi akhrot (walnuts) + alsi (flaxseed) powder daily in morning curd — natural cholesterol fighter alongside your statin'
  },
  {
    medicine: 'Rosuvastatin',
    genericName: 'Rosuvastatin Calcium',
    brandNames: ['Crestor', 'Rozavel', 'Rosuvas', 'Rosulip', 'Rozucor'],
    condition: 'High Cholesterol',
    triggerParams: ['total_cholesterol', 'ldl', 'triglycerides'],
    triggerCondition: (p) => (p.total_cholesterol > 220 || p.ldl > 100 || p.triglycerides > 180),
    avoid: ['Antacids within 2 hours of this medicine', 'Excessive alcohol', 'Very high-fat meals'],
    helpful: ['High-fiber diet (oats, dalia, vegetables)', 'Nuts and seeds', 'Fish or fish oil supplements'],
    timing: 'Can be taken any time of day, but be consistent',
    warnings: ['Report unexplained muscle pain/weakness', 'Regular liver and kidney monitoring needed', 'Avoid if pregnant or planning pregnancy'],
    indianTip: 'Replace evening chai-biscuit with masala oats + akhrot — doubles the cholesterol-lowering power'
  },
  {
    medicine: 'Fenofibrate',
    genericName: 'Fenofibrate',
    brandNames: ['Lipicard', 'Fenolip', 'Lipigem', 'Fibator'],
    condition: 'High Triglycerides',
    triggerParams: ['triglycerides', 'vldl'],
    triggerCondition: (p) => (p.triglycerides > 200 || (p.vldl && p.vldl > 40)),
    avoid: ['Alcohol — triggers triglyceride spikes', 'Sugary drinks and sweets', 'White rice in excess'],
    helpful: ['Omega-3 fatty acids (fish, flaxseeds)', 'High-fiber foods', 'Low-sugar diet'],
    timing: 'Take with meals for better absorption',
    warnings: ['Report muscle pain especially if combined with a statin', 'Monitor liver function', 'May interact with blood thinners'],
    indianTip: 'Cut out all packaged fruit juices and cold drinks — single biggest triglyceride-raising habit in Indian diet'
  },

  // ─── THYROID ───
  {
    medicine: 'Levothyroxine',
    genericName: 'Levothyroxine Sodium',
    brandNames: ['Thyronorm', 'Eltroxin', 'Thyrox', 'Lethyrox', 'Thyrofit'],
    condition: 'Hypothyroidism',
    triggerParams: ['tsh', 't3', 't4', 'ft3', 'ft4'],
    triggerCondition: (p) => (p.tsh > 5.0 || (p.ft4 && p.ft4 < 0.8)),
    avoid: ['Soy products within 4 hours — blocks absorption', 'Calcium/iron supplements within 4 hours', 'Coffee/tea within 1 hour — reduces absorption by 30%', 'Walnuts and high-fiber foods within 4 hours'],
    helpful: ['Iodized salt', 'Selenium-rich foods (Brazil nuts, sunflower seeds)', 'Cooked cruciferous vegetables (not raw)'],
    timing: 'Take EMPTY STOMACH, 30-60 minutes before breakfast with plain water ONLY',
    warnings: ['Most important: take on completely empty stomach', 'Do NOT change brands without doctor consult — bioavailability differs', 'Annual TSH check minimum'],
    indianTip: 'Subah uthte hi goli lo, fir 30-45 min baad chai/nashta. Bahut log chai ke saath lete hain — yeh galat hai, medicine kaam nahi karegi!'
  },
  {
    medicine: 'Carbimazole',
    genericName: 'Carbimazole',
    brandNames: ['Neo-Mercazole', 'Thyrozole', 'Carbizole'],
    condition: 'Hyperthyroidism',
    triggerParams: ['tsh', 't3', 't4', 'ft3', 'ft4'],
    triggerCondition: (p) => (p.tsh < 0.3 || (p.ft4 && p.ft4 > 2.0) || (p.t3 && p.t3 > 2.5)),
    avoid: ['Iodine-rich foods in excess (seaweed, iodized salt)', 'Excessive caffeine — worsens tremors', 'Very spicy food'],
    helpful: ['Calcium-rich foods (doodh, dahi, paneer) — hyperthyroidism depletes calcium', 'Antioxidant-rich foods', 'Calorie-dense foods to counter weight loss'],
    timing: 'Take with food to reduce stomach upset',
    warnings: ['Report sore throat or fever immediately — can indicate serious side effect (agranulocytosis)', 'Regular blood count monitoring needed', 'Do not stop suddenly without doctor advice'],
    indianTip: 'Patta gobhi (cabbage) and phool gobhi (cauliflower) are actually helpful in hyperthyroidism — opposite of hypothyroidism!'
  },

  // ─── BLOOD THINNERS ───
  {
    medicine: 'Aspirin (Low Dose)',
    genericName: 'Aspirin',
    brandNames: ['Ecosprin', 'Disprin', 'Aspirin'],
    condition: 'Heart Protection / Blood Thinning',
    triggerParams: ['total_cholesterol', 'ldl', 'triglycerides'],
    triggerCondition: (p) => (p.total_cholesterol > 240 || p.ldl > 160),
    avoid: ['Alcohol — increases bleeding risk', 'Other NSAIDs (Brufen, Combiflam) — bleeding risk', 'Excess ginger/garlic supplements — adds blood thinning'],
    helpful: ['Vitamin K-consistent diet — dont suddenly change intake', 'Balanced diet with vegetables', 'Omega-3 fatty acids in moderation'],
    timing: 'Take with food to protect stomach lining',
    warnings: ['Report any unusual bleeding (gums, urine, stool)', 'Inform any doctor/dentist you are on aspirin before procedures', 'Avoid if you have stomach ulcers'],
    indianTip: 'Always take Ecosprin after khana, never empty stomach — bahut logo ko pet ki problem ho jaati hai empty stomach lene se'
  },
  {
    medicine: 'Clopidogrel',
    genericName: 'Clopidogrel Bisulfate',
    brandNames: ['Clopitab', 'Clopilet', 'Plagril', 'Plavix'],
    condition: 'Blood Thinning / Post Heart Stent',
    triggerParams: ['total_cholesterol', 'ldl'],
    triggerCondition: (p) => (p.total_cholesterol > 250 || p.ldl > 160),
    avoid: ['Omeprazole (Omez) — reduces Clopidogrel effectiveness', 'Alcohol', 'NSAIDs without doctor advice'],
    helpful: ['Balanced diet', 'Foods rich in antioxidants', 'Regular hydration'],
    timing: 'Take at the same time daily, with or without food',
    warnings: ['NEVER stop without cardiology advice — stent can block', 'If you need a proton pump inhibitor, use Pantoprazole instead of Omeprazole', 'Report any unusual bleeding'],
    indianTip: 'Agar acidity ho toh Omez mat lo — Pan-D lo. Omez clopidogrel ki power kam kar deta hai, yeh bahut khaas baat hai'
  },
  {
    medicine: 'Warfarin',
    genericName: 'Warfarin Sodium',
    brandNames: ['Warf', 'Acitrom', 'Coumadin'],
    condition: 'Blood Clot Prevention',
    triggerParams: ['inr', 'prothrombin_time'],
    triggerCondition: (p) => (p.inr > 1.2 || (p.prothrombin_time && p.prothrombin_time > 14)),
    avoid: ['Sudden changes in Vitamin K foods (palak, methi, gobhi)', 'Alcohol', 'Cranberry juice — increases drug effect'],
    helpful: ['CONSISTENT amounts of green vegetables (dont avoid, dont suddenly increase)', 'Regular balanced meals', 'Adequate hydration'],
    timing: 'Take at the same time every evening',
    warnings: ['INR monitoring essential — every 2-4 weeks', 'Keep Vitamin K intake CONSISTENT — dont suddenly eat lots of palak or suddenly stop', 'Report any unusual bleeding or bruising'],
    indianTip: 'Palak, methi, sarson ka saag — sab kha sakte ho, bas BAAR-BAAR SAME amount rakhna hai. Achanak bohot zyada ya bohot kam mat karo.'
  },

  // ─── LIVER ───
  {
    medicine: 'Ursodeoxycholic Acid',
    genericName: 'Ursodeoxycholic Acid (UDCA)',
    brandNames: ['Udiliv', 'Ursocol', 'Ursokem', 'Udihep'],
    condition: 'Liver Disease / Gallstones',
    triggerParams: ['sgot', 'sgpt', 'alp', 'ggt', 'bilirubin_total'],
    triggerCondition: (p) => (p.sgpt > 60 || p.sgot > 60 || (p.alp && p.alp > 200) || (p.bilirubin_total && p.bilirubin_total > 2.0)),
    avoid: ['Alcohol — absolutely', 'Antacids within 2 hours', 'High-fat fried foods'],
    helpful: ['Light, low-fat diet', 'Green vegetables', 'Amla and papaya'],
    timing: 'Take with food or as directed, usually at night',
    warnings: ['Tell your doctor if you have severe liver disease', 'Do not take with antacids — reduces absorption', 'Report persistent diarrhea'],
    indianTip: 'Amla juice subah khaali pet — liver ke liye sabse achha natural tonic. Haldi doodh raat ko bhi helpful hai.'
  },
  {
    medicine: 'Silymarin',
    genericName: 'Silymarin (Milk Thistle Extract)',
    brandNames: ['Silybon', 'Hepamerz', 'Silymarin', 'Livguard'],
    condition: 'Liver Protection',
    triggerParams: ['sgot', 'sgpt', 'ggt'],
    triggerCondition: (p) => (p.sgpt > 50 || p.sgot > 50),
    avoid: ['Alcohol', 'Hepatotoxic drugs (paracetamol overdose)', 'Very oily/spicy food'],
    helpful: ['Antioxidant-rich foods (amla, turmeric)', 'Green tea', 'Fresh fruits and vegetables'],
    timing: 'Take 30 minutes before meals for best absorption',
    warnings: ['Generally very safe', 'May cause mild stomach upset initially', 'Inform doctor about all medicines you take'],
    indianTip: 'Silymarin + amla juice + no alcohol = liver recovery combo. Fatty liver India mein bahut common hai — lifestyle change zaroori hai.'
  },

  // ─── KIDNEY ───
  {
    medicine: 'Torsemide',
    genericName: 'Torsemide',
    brandNames: ['Dytor', 'Tide', 'Torsinex'],
    condition: 'Fluid Retention / Kidney Disease / Heart Failure',
    triggerParams: ['creatinine', 'egfr', 'potassium'],
    triggerCondition: (p) => (p.creatinine > 1.5 || (p.egfr && p.egfr < 60)),
    avoid: ['Excess salt/namak', 'Alcohol', 'Licorice (mulethi) in excess — causes potassium loss'],
    helpful: ['Low-salt diet', 'Potassium-rich foods in moderation (banana, coconut water)', 'Adequate protein'],
    timing: 'Take in the morning to avoid night-time urination',
    warnings: ['Can cause low potassium — eat bananas', 'Monitor kidney function and electrolytes', 'May cause dizziness — stand up slowly'],
    indianTip: 'Subah lena — raat ko loge toh baar baar bathroom jaana padega. Potassium ke liye ek kela roz khao.'
  },
  {
    medicine: 'Furosemide',
    genericName: 'Furosemide',
    brandNames: ['Lasix', 'Frusenex', 'Frumil'],
    condition: 'Fluid Retention / Kidney Disease',
    triggerParams: ['creatinine', 'egfr', 'urea'],
    triggerCondition: (p) => (p.creatinine > 2.0 || (p.egfr && p.egfr < 45)),
    avoid: ['Excess sodium/salt', 'NSAIDs (reduce effectiveness)', 'Alcohol'],
    helpful: ['Potassium-rich foods (banana, orange juice, coconut water)', 'Low-salt diet', 'Adequate hydration'],
    timing: 'Take in the morning, on empty stomach or with food',
    warnings: ['Powerful diuretic — expect frequent urination', 'Monitor potassium, sodium, and kidney function', 'Can cause dehydration if not careful'],
    indianTip: 'Lasix se potassium bahut girta hai — roz kela aur nariyal paani zaroori hai. Salt bohot kam khao.'
  },

  // ─── ANEMIA ───
  {
    medicine: 'Iron Supplements',
    genericName: 'Ferrous Sulfate / Ferrous Fumarate / Iron Polymaltose',
    brandNames: ['Autrin', 'Orofer', 'Livogen', 'Dexorange', 'Fefol', 'Ferium XT'],
    condition: 'Iron Deficiency Anemia',
    triggerParams: ['hemoglobin', 'iron', 'ferritin', 'iron_saturation'],
    triggerCondition: (p) => (p.hemoglobin < 11 || (p.iron && p.iron < 50) || (p.ferritin && p.ferritin < 15)),
    avoid: ['Tea/coffee within 2 hours — tannins block iron absorption by 60%', 'Calcium/dairy within 2 hours', 'Antacids within 2 hours'],
    helpful: ['Vitamin C with iron (nimbu paani, amla) — doubles absorption', 'Cook in iron kadhai/tawa', 'Jaggery (gur), dates (khajoor), beetroot'],
    timing: 'Take on empty stomach for best absorption (with water). If stomach upset, take with food.',
    warnings: ['May cause black stools — this is normal', 'May cause constipation — drink plenty of water', 'Separate from tea/coffee/calcium by 2 hours'],
    indianTip: 'Iron ki goli ke saath nimbu paani piyo — Vitamin C iron ka absorption double kar deta hai. Chai/doodh 2 ghante door rakho!'
  },
  {
    medicine: 'Folic Acid',
    genericName: 'Folic Acid (Vitamin B9)',
    brandNames: ['Folvite', 'Fol-G', 'Folikem'],
    condition: 'Folate Deficiency / Anemia / Pregnancy',
    triggerParams: ['hemoglobin', 'mcv', 'folate'],
    triggerCondition: (p) => ((p.hemoglobin < 11 && p.mcv && p.mcv > 100) || (p.folate && p.folate < 3)),
    avoid: ['Alcohol — depletes folate', 'Excessive cooking of vegetables destroys folate'],
    helpful: ['Green leafy vegetables (palak, methi)', 'Lentils (dal)', 'Citrus fruits', 'Liver (non-veg)'],
    timing: 'Take once daily, with or without food',
    warnings: ['Essential in pregnancy — prevents neural tube defects', 'May mask B12 deficiency — get B12 checked too', 'Very safe even at higher doses'],
    indianTip: 'Pregnancy mein folic acid bahut zaroori hai — palak paratha daily khayen aur supplement zaroor lein'
  },
  {
    medicine: 'Vitamin B12 Injections/Supplements',
    genericName: 'Methylcobalamin / Cyanocobalamin',
    brandNames: ['Mecobalamin', 'Methycobal', 'Neurobion', 'Nurokind', 'Methylpro'],
    condition: 'Vitamin B12 Deficiency',
    triggerParams: ['vitamin_b12', 'mcv', 'hemoglobin'],
    triggerCondition: (p) => ((p.vitamin_b12 && p.vitamin_b12 < 200) || (p.mcv && p.mcv > 100)),
    avoid: ['Alcohol — impairs B12 absorption', 'Metformin long-term use depletes B12 — inform doctor'],
    helpful: ['Dairy products (dahi, paneer, doodh)', 'Eggs, fish, liver', 'Fortified cereals for vegetarians'],
    timing: 'Oral supplements: with food. Injections: as prescribed by doctor.',
    warnings: ['Vegetarians are at very high risk of B12 deficiency', 'If on Metformin, get B12 checked annually', 'Very severe deficiency may need injections first, then oral'],
    indianTip: 'India mein vegetarians ko sabse zyada B12 ki kami hoti hai. Dahi aur paneer daily khayein. Bahut low ho toh injection pehle, phir oral supplement.'
  },

  // ─── VITAMINS ───
  {
    medicine: 'Vitamin D Supplements',
    genericName: 'Cholecalciferol (Vitamin D3)',
    brandNames: ['Calcirol', 'D3-Must', 'Uprise-D3', 'Arachitol', 'Tayo-60K'],
    condition: 'Vitamin D Deficiency',
    triggerParams: ['vitamin_d'],
    triggerCondition: (p) => (p.vitamin_d && p.vitamin_d < 30),
    avoid: ['Taking on empty stomach — needs fat for absorption', 'Mineral oil laxatives — reduce absorption'],
    helpful: ['Take with a fatty meal for best absorption', 'Morning sunlight (20-30 min before 10 AM)', 'Egg yolks, fatty fish, fortified milk'],
    timing: 'Take with the largest meal of the day (needs fat for absorption)',
    warnings: ['Do NOT take more than prescribed — excess causes toxicity', 'Get levels rechecked after 3 months', '60,000 IU weekly sachet is standard Indian treatment for deficiency'],
    indianTip: '80% Indians mein Vitamin D ki kami hai. Subah ki dhoop 20-30 min + weekly 60K sachet = 3 mahine mein level normal. Khane ke saath lo, khaali pet mat lo.'
  },
  {
    medicine: 'Calcium Supplements',
    genericName: 'Calcium Carbonate / Calcium Citrate',
    brandNames: ['Shelcal', 'CCM', 'Calcimax', 'Gemcal', 'Ostocalcium'],
    condition: 'Calcium Deficiency / Bone Health',
    triggerParams: ['calcium', 'vitamin_d'],
    triggerCondition: (p) => ((p.calcium && p.calcium < 8.5) || (p.vitamin_d && p.vitamin_d < 20)),
    avoid: ['Iron supplements at the same time — take 2 hours apart', 'Spinach (oxalates) with calcium supplements', 'Excess caffeine — increases calcium excretion'],
    helpful: ['Vitamin D alongside calcium (aids absorption)', 'Dairy products', 'Ragi, sesame seeds (til), almonds'],
    timing: 'Take with meals. If taking 1000mg, split into two 500mg doses.',
    warnings: ['Do not take with iron supplements — take 2 hours apart', 'Calcium carbonate needs stomach acid — take with food', 'Excess calcium can cause kidney stones'],
    indianTip: 'Ragi (nachni) dosa/roti has more calcium than doodh! Til ke laddoo bhi excellent calcium source hain. Vitamin D bhi lo saath mein.'
  },
  {
    medicine: 'B-Complex Vitamins',
    genericName: 'B-Complex (B1, B2, B3, B5, B6, B7, B9, B12)',
    brandNames: ['Becosules', 'Supradyn', 'Zincovit', 'Polybion', 'Cobadex'],
    condition: 'General Nutritional Support',
    triggerParams: ['vitamin_b12', 'hemoglobin', 'folate'],
    triggerCondition: (p) => ((p.vitamin_b12 && p.vitamin_b12 < 300) || (p.hemoglobin && p.hemoglobin < 12)),
    avoid: ['Alcohol — depletes B vitamins', 'Empty stomach if causes nausea'],
    helpful: ['Whole grains, dal, eggs, milk', 'Green vegetables', 'Nuts and seeds'],
    timing: 'Take with breakfast',
    warnings: ['May turn urine bright yellow — this is normal (riboflavin)', 'Generally very safe', 'Helps with hair fall, fatigue, and mouth ulcers'],
    indianTip: 'Becosules sabse common Indian multivitamin hai — mouth ulcers, hair fall, aur thakan ke liye doctors sabse pehle yeh likhte hain'
  },

  // ─── ANTIBIOTICS ───
  {
    medicine: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    brandNames: ['Ciplox', 'Cifran', 'Ciprobid'],
    condition: 'Bacterial Infections',
    triggerParams: ['wbc', 'esr', 'crp'],
    triggerCondition: (p) => (p.wbc > 12000 || (p.crp && p.crp > 10)),
    avoid: ['Dairy products within 2 hours — blocks absorption', 'Antacids/calcium/iron within 2 hours', 'Excess caffeine — Cipro increases caffeine effect'],
    helpful: ['Plenty of water — prevents crystal formation in kidneys', 'Probiotics (dahi) after antibiotic course', 'Light, easy-to-digest food'],
    timing: 'Take 2 hours before or after dairy/calcium. With plenty of water.',
    warnings: ['May cause tendon problems — stop and report if joint/tendon pain', 'Avoid in children/pregnancy', 'Complete the full course even if feeling better'],
    indianTip: 'Cipro ke saath doodh mat piyo — 2 ghante ka gap rakho. Poora course khatam karo, beech mein mat chhodna.'
  },
  {
    medicine: 'Amoxicillin',
    genericName: 'Amoxicillin',
    brandNames: ['Mox', 'Novamox', 'Amoxyclav (with Clavulanic acid)'],
    condition: 'Bacterial Infections',
    triggerParams: ['wbc', 'esr'],
    triggerCondition: (p) => (p.wbc > 11000 || (p.esr && p.esr > 30)),
    avoid: ['Alcohol', 'Oral contraceptives may be less effective'],
    helpful: ['Yogurt/dahi (probiotics) — take 2 hours away from antibiotic', 'Plenty of fluids', 'Easy-to-digest food'],
    timing: 'Take at evenly spaced intervals (every 8 hours for TID)',
    warnings: ['Tell doctor if allergic to penicillin', 'Complete the full course', 'Report rash or difficulty breathing immediately'],
    indianTip: 'Antibiotic ke baad 1 hafte tak roz dahi khao — antibiotics pet ke achhe bacteria bhi maar dete hain, dahi se wapas aate hain'
  },
  {
    medicine: 'Azithromycin',
    genericName: 'Azithromycin',
    brandNames: ['Azee', 'Zithromax', 'Azithral', 'Azifast'],
    condition: 'Bacterial Infections',
    triggerParams: ['wbc', 'esr', 'crp'],
    triggerCondition: (p) => (p.wbc > 11000),
    avoid: ['Antacids within 2 hours', 'Alcohol'],
    helpful: ['Light diet', 'Probiotics after course', 'Adequate hydration'],
    timing: 'Take 1 hour before or 2 hours after meals for best absorption',
    warnings: ['3-day course stays in body for 10 days — effects last long', 'Report any heart palpitations', 'Complete the course'],
    indianTip: 'Azithromycin 3 din ki goli hoti hai par 10 din tak kaam karti hai — isliye doctor 3 din hi dete hain, yeh kam nahi hai!'
  },

  // ─── PAIN / INFLAMMATION ───
  {
    medicine: 'Ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Brufen', 'Ibugesic', 'Combiflam (with Paracetamol)'],
    condition: 'Pain / Inflammation',
    triggerParams: ['creatinine', 'egfr', 'uric_acid'],
    triggerCondition: (p) => (p.creatinine > 1.3 || (p.egfr && p.egfr < 60) || (p.uric_acid && p.uric_acid > 7)),
    avoid: ['Empty stomach — causes ulcers', 'Alcohol — increases stomach bleeding risk', 'If on blood thinners — dangerous combination'],
    helpful: ['Take with food always', 'Short courses only', 'Natural anti-inflammatories (turmeric, ginger) for chronic pain'],
    timing: 'Take with or after food. Never on empty stomach.',
    warnings: ['DANGEROUS for kidneys — avoid if creatinine is high', 'Can cause stomach ulcers and bleeding', 'Not for dengue — can cause fatal bleeding'],
    indianTip: 'Combiflam/Brufen kidney ke liye bohot khatarnaak hai — agar creatinine high hai toh KABHI mat lo. Doctor ko zaroor batao.'
  },
  {
    medicine: 'Diclofenac',
    genericName: 'Diclofenac Sodium',
    brandNames: ['Voveran', 'Diclomol', 'Volini (topical)'],
    condition: 'Pain / Inflammation',
    triggerParams: ['creatinine', 'egfr'],
    triggerCondition: (p) => (p.creatinine > 1.2 || (p.egfr && p.egfr < 70)),
    avoid: ['Empty stomach', 'Alcohol', 'Long-term use without monitoring', 'If kidney function impaired'],
    helpful: ['Take with food', 'Shortest possible course', 'Topical form (Volini gel) safer than oral'],
    timing: 'Take with food, preferably after meals',
    warnings: ['Heart attack risk increases with long-term use', 'Kidney damage with prolonged use', 'Use topical gel when possible instead of oral'],
    indianTip: 'Voveran gel lagao instead of tablet — safer for kidney and stomach. Oral tablet only short-term use karo.'
  },
  {
    medicine: 'Paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNames: ['Crocin', 'Dolo', 'Calpol', 'Pacimol', 'Tylenol'],
    condition: 'Pain / Fever',
    triggerParams: ['sgot', 'sgpt'],
    triggerCondition: (p) => (p.sgpt > 60 || p.sgot > 60),
    avoid: ['Alcohol — liver toxicity risk multiplied', 'More than 4g (8 tablets of 500mg) per day — liver failure', 'If liver enzymes already high — use cautiously'],
    helpful: ['Short-term use is safe', 'Hydration', 'Rest'],
    timing: 'Take with or without food, every 4-6 hours as needed',
    warnings: ['NEVER exceed 4g/day — liver failure risk', 'If liver enzymes (SGPT/SGOT) are already high, use minimum doses', 'Alcohol + paracetamol = liver emergency'],
    indianTip: 'Dolo/Crocin safe hai par din mein 6-8 se zyada KABHI mat lo. Alcohol peeke Crocin mat lo — liver ke liye zeher hai.'
  },

  // ─── ANTACIDS / GI ───
  {
    medicine: 'Omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Omez', 'Omecip', 'Omizac'],
    condition: 'Acidity / Gastric Ulcer',
    triggerParams: ['hemoglobin', 'calcium', 'vitamin_b12'],
    triggerCondition: (p) => ((p.hemoglobin && p.hemoglobin < 11) || (p.calcium && p.calcium < 8.5) || (p.vitamin_b12 && p.vitamin_b12 < 200)),
    avoid: ['Clopidogrel (Clopitab) — dangerous interaction', 'Prolonged use without medical reason', 'Spicy/oily food that triggers acidity'],
    helpful: ['Small frequent meals', 'Banana, cold milk, fennel water for natural relief', 'Elevate head while sleeping'],
    timing: 'Take 30 minutes before breakfast on empty stomach',
    warnings: ['Long-term use (>1 year) can cause B12 deficiency, low calcium, low magnesium', 'If on Clopidogrel, use Pantoprazole instead — IMPORTANT', 'Fracture risk increases with years of use'],
    indianTip: 'Omez saal-saal mat khao — calcium aur B12 ki kami ho jaati hai. Acidity ke liye saunf paani, jeera paani try karo pehle.'
  },
  {
    medicine: 'Pantoprazole',
    genericName: 'Pantoprazole',
    brandNames: ['Pan-D', 'Pantop', 'Pantocid', 'Nexpro'],
    condition: 'Acidity / Gastric Ulcer',
    triggerParams: ['hemoglobin', 'vitamin_b12'],
    triggerCondition: (p) => ((p.hemoglobin && p.hemoglobin < 11) || (p.vitamin_b12 && p.vitamin_b12 < 250)),
    avoid: ['Prolonged unnecessary use', 'Trigger foods (spicy, oily, late-night eating)'],
    helpful: ['Small frequent meals', 'Saunf (fennel) water after meals', 'Aloe vera juice'],
    timing: 'Take 30 minutes before breakfast',
    warnings: ['Safe with Clopidogrel (unlike Omeprazole)', 'Long-term side effects similar to Omeprazole', 'Try lifestyle changes before relying on pills long-term'],
    indianTip: 'Pan-D Clopidogrel ke saath safe hai — Omez nahi. Acidity ke liye raat ka khana 8 baje tak kha lo, late dinner sabse bada kaaran hai.'
  },
  {
    medicine: 'Ranitidine',
    genericName: 'Ranitidine',
    brandNames: ['Rantac', 'Zinetac', 'Aciloc'],
    condition: 'Acidity',
    triggerParams: ['hemoglobin'],
    triggerCondition: () => false, // Ranitidine is being phased out due to NDMA contamination
    avoid: ['Alcohol', 'Smoking', 'Spicy/oily food'],
    helpful: ['Small frequent meals', 'Buttermilk (chaas)', 'Saunf water'],
    timing: 'Take 30 minutes before meals or at bedtime',
    warnings: ['NDMA contamination concern — many countries have recalled Ranitidine', 'Consider switching to Famotidine or PPI', 'Discuss with your doctor about safer alternatives'],
    indianTip: 'Ranitidine (Rantac) mein contamination ka risk hai — doctor se bolo Famotidine ya Pantoprazole de dein. Safer options hain.'
  },

  // ─── BONE HEALTH ───
  {
    medicine: 'Alendronate',
    genericName: 'Alendronate Sodium',
    brandNames: ['Osteofos', 'Fosamax', 'Alenost'],
    condition: 'Osteoporosis / Bone Health',
    triggerParams: ['calcium', 'vitamin_d'],
    triggerCondition: (p) => ((p.calcium && p.calcium < 8.0) || (p.vitamin_d && p.vitamin_d < 15)),
    avoid: ['Lying down within 30 minutes of taking', 'Calcium/food/other medicines within 30 minutes', 'Caffeine excess'],
    helpful: ['Calcium and Vitamin D supplements alongside', 'Weight-bearing exercise', 'Dairy products, ragi, til (sesame)'],
    timing: 'Take FIRST thing in morning, 30 minutes before any food/drink, with FULL glass of plain water. Stay upright for 30 minutes.',
    warnings: ['MUST stay upright 30 min after taking — prevents severe esophagus burns', 'Take with plain water only — no juice, tea, or coffee', 'Report jaw pain or thigh pain'],
    indianTip: 'Subah sabse pehle plain paani ke saath goli lo, 30 min khade/baithe raho, phir chai-nashta. Lete mat — gale mein jalan ho jayegi.'
  },
  {
    medicine: 'Calcitriol',
    genericName: 'Calcitriol (Active Vitamin D)',
    brandNames: ['Rocaltrol', 'Calcijex', 'Trical'],
    condition: 'Severe Vitamin D Deficiency / Kidney Disease',
    triggerParams: ['vitamin_d', 'calcium', 'egfr'],
    triggerCondition: (p) => ((p.vitamin_d && p.vitamin_d < 10) || (p.egfr && p.egfr < 45 && p.calcium && p.calcium < 8.5)),
    avoid: ['Excess calcium supplements — risk of high calcium', 'Magnesium-containing antacids in excess'],
    helpful: ['Regular calcium monitoring', 'Balanced diet', 'Morning sunlight'],
    timing: 'Take with food for better absorption',
    warnings: ['This is ACTIVE vitamin D — different from regular D3 supplements', 'Monitor calcium levels regularly — can cause dangerous high calcium', 'Usually prescribed by nephrologists for kidney patients'],
    indianTip: 'Calcitriol aur Calcirol alag hain — Calcitriol active form hai, kidney patients ke liye. Apne aap mat lo, doctor ki zaroorat hai.'
  },

  // ─── ADDITIONAL COMMON MEDICINES ───
  {
    medicine: 'Metoprolol',
    genericName: 'Metoprolol Succinate/Tartrate',
    brandNames: ['Met XL', 'Betaloc', 'Seloken'],
    condition: 'High BP / Heart Rate Control / Heart Failure',
    triggerParams: ['total_cholesterol', 'ldl'],
    triggerCondition: (p) => (p.total_cholesterol > 250 || p.ldl > 160),
    avoid: ['Sudden stoppage — rebound hypertension', 'Alcohol', 'Decongestants (cold medicines with pseudoephedrine)'],
    helpful: ['Low-salt diet', 'Regular exercise (moderate — not sudden intense)', 'Stress management'],
    timing: 'Take with food, at the same time daily',
    warnings: ['Never stop suddenly', 'May mask low blood sugar symptoms in diabetics', 'May cause fatigue and cold extremities'],
    indianTip: 'Cold medicine lene se pehle chemist ko batao ki beta-blocker le rahe ho — kuch cold medicines BP badha deti hain'
  },
  {
    medicine: 'Hydrochlorothiazide',
    genericName: 'Hydrochlorothiazide',
    brandNames: ['Aquazide', 'Esidrex', 'Telma-H (combination)'],
    condition: 'High Blood Pressure',
    triggerParams: ['potassium', 'sodium', 'uric_acid'],
    triggerCondition: (p) => ((p.potassium && p.potassium < 3.5) || (p.uric_acid && p.uric_acid > 7)),
    avoid: ['Excess sun exposure — increases sensitivity', 'Alcohol', 'Salt substitutes (potassium-based) without monitoring'],
    helpful: ['Potassium-rich foods (banana, orange juice)', 'Low-salt diet', 'Adequate hydration'],
    timing: 'Take in the morning to avoid night-time urination',
    warnings: ['Can cause low potassium — eat bananas', 'Can raise uric acid levels', 'Use sunscreen — increased sun sensitivity'],
    indianTip: 'Dhoop mein jyada mat niklo — skin jaldi jal sakti hai. Potassium girta hai — roz ek kela zaroor khao.'
  },
  {
    medicine: 'Dapagliflozin',
    genericName: 'Dapagliflozin',
    brandNames: ['Forxiga', 'Dapaglyn', 'Dapaflo'],
    condition: 'Type 2 Diabetes / Heart Failure / Kidney Protection',
    triggerParams: ['fasting_glucose', 'hba1c', 'creatinine'],
    triggerCondition: (p) => (p.fasting_glucose > 126 || p.hba1c > 7.0),
    avoid: ['Dehydration — drink extra water', 'Alcohol excess', 'Low-carb diets may increase ketoacidosis risk'],
    helpful: ['Plenty of water (3-4 liters/day)', 'Good hygiene — risk of genital infections', 'Balanced diet'],
    timing: 'Take once daily in the morning, with or without food',
    warnings: ['Causes increased urination — drink extra water', 'Risk of genital yeast infections — maintain hygiene', 'Report symptoms of ketoacidosis: nausea, vomiting, abdominal pain'],
    indianTip: 'Yeh nayi generation ki diabetes medicine hai — sugar peshab se nikalti hai. Paani BOHOT piyo aur safai ka dhyan rakho.'
  },
  {
    medicine: 'Empagliflozin',
    genericName: 'Empagliflozin',
    brandNames: ['Jardiance', 'Gibtulio', 'Empaglyn'],
    condition: 'Type 2 Diabetes / Heart Failure',
    triggerParams: ['fasting_glucose', 'hba1c'],
    triggerCondition: (p) => (p.fasting_glucose > 130 || p.hba1c > 7.0),
    avoid: ['Dehydration', 'Excessive alcohol', 'Ketogenic diets without medical supervision'],
    helpful: ['Extra water intake', 'Good genital hygiene', 'Balanced meals'],
    timing: 'Once daily in the morning',
    warnings: ['Similar to Dapagliflozin — increased urination, infection risk', 'Has proven heart and kidney protection benefits', 'Monitor kidney function'],
    indianTip: 'Jardiance ne heart aur kidney ke liye bhi fayde dikhaaye hain — sirf sugar ke liye nahi. Doctor ne di hai toh regular lo.'
  },
  {
    medicine: 'Prednisolone',
    genericName: 'Prednisolone',
    brandNames: ['Omnacortil', 'Wysolone', 'Predmet'],
    condition: 'Inflammation / Autoimmune Conditions',
    triggerParams: ['esr', 'crp', 'wbc'],
    triggerCondition: (p) => ((p.esr && p.esr > 40) || (p.crp && p.crp > 10)),
    avoid: ['Sudden stopping — must taper slowly', 'Excess salt — causes fluid retention', 'NSAIDs — combined stomach damage risk'],
    helpful: ['Calcium and Vitamin D supplements — steroids weaken bones', 'Protein-rich diet', 'Low-salt, low-sugar diet'],
    timing: 'Take with breakfast to minimize stomach upset and mimic natural cortisol rhythm',
    warnings: ['NEVER stop suddenly — can cause adrenal crisis', 'Long-term use: weight gain, diabetes, bone loss, infections', 'Always tell doctors you are on steroids'],
    indianTip: 'Steroid achanak band KABHI mat karo — doctor se tapering schedule lo. Calcium aur Vitamin D saath mein lo — haddiyan kamzor hoti hain steroid se.'
  },
  {
    medicine: 'Montelukast',
    genericName: 'Montelukast',
    brandNames: ['Montair', 'Singulair', 'Montek-LC'],
    condition: 'Asthma / Allergic Rhinitis',
    triggerParams: ['eosinophils', 'abs_eosinophil'],
    triggerCondition: (p) => ((p.eosinophils && p.eosinophils > 6) || (p.abs_eosinophil && p.abs_eosinophil > 500)),
    avoid: ['Aspirin sensitivity — tell your doctor', 'Smoking'],
    helpful: ['Anti-inflammatory foods (turmeric, ginger)', 'Steam inhalation', 'Clean air environment'],
    timing: 'Take in the evening or at bedtime',
    warnings: ['Report mood changes or depression', 'Not for acute asthma attacks — keep rescue inhaler', 'Safe for long-term use in most patients'],
    indianTip: 'Dhool-mitti se allergy hai toh room daily mein pocha lagao, AC filter clean rakho, aur raat ko Montelukast lo.'
  },
  {
    medicine: 'Cetirizine',
    genericName: 'Cetirizine',
    brandNames: ['Cetzine', 'Alerid', 'Zyrtec', 'Okacet'],
    condition: 'Allergies / Urticaria',
    triggerParams: ['eosinophils', 'abs_eosinophil'],
    triggerCondition: (p) => ((p.eosinophils && p.eosinophils > 5) || (p.abs_eosinophil && p.abs_eosinophil > 450)),
    avoid: ['Alcohol — increases drowsiness', 'Driving if drowsy'],
    helpful: ['Honey (anti-allergic properties)', 'Tulsi tea', 'Keep environment clean and dust-free'],
    timing: 'Take at bedtime (can cause drowsiness)',
    warnings: ['May cause drowsiness — take at night', 'Safe for most people', 'Fexofenadine (Allegra) is non-drowsy alternative'],
    indianTip: 'Cetzine neend laati hai — raat ko lo. Agar din mein chahiye toh Allegra (Fexofenadine) better hai — neend nahi aati.'
  },
  {
    medicine: 'Albendazole',
    genericName: 'Albendazole',
    brandNames: ['Zentel', 'Albendazol', 'Bandy'],
    condition: 'Parasitic Worm Infection',
    triggerParams: ['eosinophils', 'abs_eosinophil'],
    triggerCondition: (p) => ((p.eosinophils && p.eosinophils > 6) || (p.abs_eosinophil && p.abs_eosinophil > 500)),
    avoid: ['Pregnancy — harmful to fetus', 'Empty stomach for some formulations'],
    helpful: ['Take with fatty food for better absorption', 'Maintain hygiene', 'Clean drinking water'],
    timing: 'Single dose with food (for routine deworming)',
    warnings: ['Routine deworming every 6 months recommended in India', 'Safe single-dose treatment', 'For prolonged courses, monitor liver function'],
    indianTip: 'Har 6 mahine Zentel/Bandy ki ek goli poore ghar ko khilao — India mein pet ke keede bahut common hain.'
  },
  {
    medicine: 'Gabapentin',
    genericName: 'Gabapentin',
    brandNames: ['Gabantin', 'Gabapin', 'Neurontin'],
    condition: 'Nerve Pain / Neuropathy',
    triggerParams: ['vitamin_b12', 'fasting_glucose', 'hba1c'],
    triggerCondition: (p) => ((p.vitamin_b12 && p.vitamin_b12 < 150) || p.hba1c > 7.0),
    avoid: ['Alcohol — increases drowsiness significantly', 'Antacids within 2 hours', 'Sudden stopping'],
    helpful: ['B12 supplements alongside', 'Blood sugar control for diabetic neuropathy', 'Regular foot care'],
    timing: 'Take at bedtime or as directed (usually 3 times daily)',
    warnings: ['Causes drowsiness — avoid driving initially', 'Dose must be tapered when stopping', 'Adjust dose if kidney function is low'],
    indianTip: 'Diabetic neuropathy (pair mein jhunjhunahat/jalan) ke liye — sugar control + B12 + Gabapentin = triple approach best hai.'
  },
  {
    medicine: 'Pregabalin',
    genericName: 'Pregabalin',
    brandNames: ['Pregastar', 'Lyrica', 'Pregalin'],
    condition: 'Nerve Pain / Neuropathy / Fibromyalgia',
    triggerParams: ['vitamin_b12', 'fasting_glucose', 'hba1c'],
    triggerCondition: (p) => ((p.vitamin_b12 && p.vitamin_b12 < 150) || p.hba1c > 7.5),
    avoid: ['Alcohol', 'Driving until you know how it affects you', 'Sudden discontinuation'],
    helpful: ['B12 supplements', 'Gentle exercise', 'Blood sugar control'],
    timing: 'Take at bedtime or as divided doses',
    warnings: ['Can cause dizziness and weight gain', 'Controlled substance — do not share', 'Taper when stopping — withdrawal possible'],
    indianTip: 'Pregabalin neend ke liye bhi kaam karta hai — bahut se doctors nerve pain + insomnia ke liye saath mein dete hain.'
  },
  {
    medicine: 'Domperidone',
    genericName: 'Domperidone',
    brandNames: ['Domstal', 'Vomistop', 'Motilium'],
    condition: 'Nausea / Vomiting / Gastroparesis',
    triggerParams: ['sgpt', 'sgot'],
    triggerCondition: () => false,
    avoid: ['Grapefruit juice', 'Certain heart medications — discuss with doctor'],
    helpful: ['Small frequent meals', 'Ginger (adrak) for nausea', 'Light diet'],
    timing: 'Take 15-30 minutes before meals',
    warnings: ['Not for long-term use — heart rhythm risk', 'Banned in some countries for cardiac risk', 'Short courses only'],
    indianTip: 'Adrak wali chai ya sonth (dried ginger) natural anti-nausea hai — try karo pehle, Domperidone last resort ho.'
  },
  {
    medicine: 'Ondansetron',
    genericName: 'Ondansetron',
    brandNames: ['Ondem', 'Emeset', 'Vomikind'],
    condition: 'Severe Nausea / Vomiting',
    triggerParams: [],
    triggerCondition: () => false,
    avoid: ['QT-prolonging drugs without monitoring'],
    helpful: ['Clear fluids', 'Bland foods (khichdi, toast)', 'Rest'],
    timing: 'Take 30 minutes before triggering event or as needed',
    warnings: ['Can cause constipation', 'Safe in pregnancy (commonly used)', 'Monitor heart rhythm if on other medications'],
    indianTip: 'Pregnancy mein ulti ke liye safe hai — doctor commonly prescribe karte hain. Khaali pet mat raho, chhota chhota khate raho.'
  },
  {
    medicine: 'Levocetirizine',
    genericName: 'Levocetirizine',
    brandNames: ['Xyzal', 'Levocet', 'Vozet'],
    condition: 'Allergies / Urticaria',
    triggerParams: ['eosinophils', 'abs_eosinophil'],
    triggerCondition: (p) => ((p.eosinophils && p.eosinophils > 5) || (p.abs_eosinophil && p.abs_eosinophil > 450)),
    avoid: ['Alcohol — increases drowsiness', 'Heavy machinery if drowsy'],
    helpful: ['Anti-allergic environment — clean bedsheets, no dust', 'Tulsi water', 'Honey with warm water'],
    timing: 'Take at bedtime',
    warnings: ['Less drowsy than Cetirizine but still possible', 'Safe for long-term allergy management', 'Kidney dose adjustment needed'],
    indianTip: 'Levocetirizine Cetirizine se thodi better hai — kam neend laati hai aur zyada effective hai. Raat ko lo best hai.'
  },
  {
    medicine: 'Spironolactone',
    genericName: 'Spironolactone',
    brandNames: ['Aldactone', 'Spiromide', 'Lasilactone'],
    condition: 'Heart Failure / Fluid Retention / PCOS',
    triggerParams: ['potassium', 'creatinine', 'testosterone'],
    triggerCondition: (p) => ((p.potassium && p.potassium < 3.5) || (p.testosterone && p.testosterone > 70)),
    avoid: ['Potassium-rich foods in excess (banana, coconut water, orange juice)', 'Salt substitutes containing potassium', 'NSAIDs'],
    helpful: ['Low-potassium diet', 'Adequate hydration', 'Low-salt foods'],
    timing: 'Take with food to reduce stomach upset, usually morning',
    warnings: ['DANGEROUS potassium rise possible — regular monitoring needed', 'Not safe in pregnancy', 'Can cause breast tenderness in men'],
    indianTip: 'Aldactone se potassium badh sakta hai — nariyal paani aur kela limit mein rakho. PCOS wali ladkiyon ko bhi diya jaata hai.'
  },
  {
    medicine: 'Tamsulosin',
    genericName: 'Tamsulosin Hydrochloride',
    brandNames: ['Urimax', 'Contiflo', 'Dynapres'],
    condition: 'Prostate Enlargement (BPH)',
    triggerParams: ['psa'],
    triggerCondition: (p) => (p.psa && p.psa > 4.0),
    avoid: ['Grapefruit juice', 'Standing up suddenly — causes dizziness', 'Other BP-lowering drugs without monitoring'],
    helpful: ['Pumpkin seeds — natural prostate support', 'Lycopene-rich foods (tomatoes)', 'Green tea'],
    timing: 'Take 30 minutes after the same meal each day',
    warnings: ['Can cause dizziness especially when standing up quickly', 'First-dose effect — may feel faint', 'Tell your eye doctor if cataract surgery planned'],
    indianTip: 'Kaddu ke beej (pumpkin seeds) prostate ke liye bahut achhe hain — daily ek muthi khao. Tomato sabzi bhi helpful hai (lycopene).'
  },
  {
    medicine: 'Allopurinol',
    genericName: 'Allopurinol',
    brandNames: ['Zyloric', 'Allosig', 'Zyloprim'],
    condition: 'High Uric Acid / Gout',
    triggerParams: ['uric_acid'],
    triggerCondition: (p) => (p.uric_acid && p.uric_acid > 7.5),
    avoid: ['Alcohol especially beer — worst for uric acid', 'Organ meats (liver, kidney)', 'Red meat, seafood in excess', 'Rajma, chole in excess'],
    helpful: ['Plenty of water (3-4 liters/day)', 'Cherry juice — reduces uric acid naturally', 'Low-fat dairy (dahi, chaas)'],
    timing: 'Take after meals, once daily',
    warnings: ['May cause gout flare when starting — doctor may give colchicine alongside', 'Stay very well hydrated', 'Report any skin rash immediately — can be serious'],
    indianTip: 'Beer sabse bura hai uric acid ke liye — ek glass beer se zyada uric acid badhta hai baaki sab se. Paani bohot piyo.'
  },
  {
    medicine: 'Febuxostat',
    genericName: 'Febuxostat',
    brandNames: ['Febuget', 'Zurig', 'Fabulas'],
    condition: 'High Uric Acid / Gout',
    triggerParams: ['uric_acid'],
    triggerCondition: (p) => (p.uric_acid && p.uric_acid > 8.0),
    avoid: ['Same as Allopurinol — alcohol, organ meats, excess pulses', 'Beer and spirits', 'Dehydration'],
    helpful: ['Cherry juice', 'Low-purine diet', 'Lots of water'],
    timing: 'Take once daily, with or without food',
    warnings: ['Newer and more potent than Allopurinol', 'Monitor liver function', 'Heart safety being studied — discuss with doctor'],
    indianTip: 'Agar Zyloric se uric acid control nahi ho raha, toh doctor Febuxostat dete hain — zyada powerful hai. Diet control bhi zaroori hai.'
  },
  {
    medicine: 'Pantoprazole + Domperidone',
    genericName: 'Pantoprazole + Domperidone',
    brandNames: ['Pan-D', 'Pantop-D', 'Pantodac-DSR'],
    condition: 'GERD / Acidity with Bloating',
    triggerParams: [],
    triggerCondition: () => false,
    avoid: ['Spicy food, late-night eating', 'Alcohol and smoking', 'Lying down immediately after eating'],
    helpful: ['Small frequent meals', 'Saunf (fennel) after meals', 'Elevate head while sleeping'],
    timing: 'Take 30 minutes before breakfast',
    warnings: ['Domperidone component — not for long-term use', 'Can cause dry mouth', 'If acidity persists >2 weeks, see a gastroenterologist'],
    indianTip: 'Raat ka khana 8 baje se pehle khao aur 2 ghante baad so jao — acidity ka sabse bada kaaran late-night dining hai.'
  },
  {
    medicine: 'Teneligliptin',
    genericName: 'Teneligliptin',
    brandNames: ['Tenali', 'Tenepure', 'Ziten'],
    condition: 'Type 2 Diabetes',
    triggerParams: ['fasting_glucose', 'hba1c'],
    triggerCondition: (p) => (p.fasting_glucose > 126 || p.hba1c > 6.8),
    avoid: ['Excessive sweets', 'Irregular meal timings'],
    helpful: ['Balanced diet with fiber', 'Regular meal schedule', 'Low-GI foods'],
    timing: 'Once daily, with or without food',
    warnings: ['Very popular in India as affordable DPP-4 inhibitor', 'Generally well-tolerated', 'Dose adjustment in severe kidney disease'],
    indianTip: 'Teneligliptin India mein sabse affordable sugar control medicine hai — Sitagliptin se sasti aur similarly effective.'
  },
  {
    medicine: 'Multivitamin with Minerals',
    genericName: 'Multivitamin Multimineral',
    brandNames: ['Zincovit', 'Supradyn', 'A to Z', 'Revital'],
    condition: 'General Nutritional Deficiency',
    triggerParams: ['hemoglobin', 'vitamin_d', 'vitamin_b12', 'calcium', 'iron', 'zinc'],
    triggerCondition: (p) => ((p.hemoglobin && p.hemoglobin < 12) || (p.vitamin_d && p.vitamin_d < 20) || (p.vitamin_b12 && p.vitamin_b12 < 250)),
    avoid: ['Taking with tea/coffee — reduces iron absorption', 'Double dosing if missed'],
    helpful: ['Take with meals for better absorption', 'Balanced diet alongside', 'Regular exercise'],
    timing: 'Take with breakfast or lunch',
    warnings: ['Not a substitute for balanced diet', 'Excess of fat-soluble vitamins (A, D, E, K) can be harmful', 'Get specific deficiencies tested first'],
    indianTip: 'Multivitamin sab kuch thoda-thoda deta hai — agar specific kami hai (B12, D, Iron) toh uski alag dose lo, multivitamin se poora nahi hoga.'
  }
];

function getPossibleMedicines(parameters) {
  // Build value map from parameters
  const pMap = {};
  if (Array.isArray(parameters)) {
    parameters.forEach(p => {
      const id = p.parameterId || p.id;
      if (id) pMap[id] = p.value;
    });
  }

  const matches = [];
  for (const med of medicineInteractions) {
    try {
      if (med.triggerCondition(pMap)) {
        matches.push({
          medicine: med.medicine,
          genericName: med.genericName,
          brandNames: med.brandNames,
          condition: med.condition,
          avoid: med.avoid,
          helpful: med.helpful,
          timing: med.timing,
          warnings: med.warnings,
          indianTip: med.indianTip
        });
      }
    } catch (e) {
      // Skip if trigger condition fails (missing params)
    }
  }
  return matches;
}

function handleMedicineInteractions(req, res) {
  try {
    const { parameters } = req.body;
    if (!parameters || !Array.isArray(parameters)) {
      return res.status(400).json({ success: false, message: 'Parameters array required.' });
    }
    const medicines = getPossibleMedicines(parameters);
    return res.json({ success: true, medicines, count: medicines.length });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error getting medicine interactions: ' + err.message });
  }
}


// ═══════════════════════════════════════════════════════════════
// FEATURE 3: Blood Report → Diet Plan Bridge
// Maps blood parameter deficiencies to dietary recommendations
// ═══════════════════════════════════════════════════════════════

function generateDietRecommendation(parameters) {
  const pMap = {};
  if (Array.isArray(parameters)) {
    parameters.forEach(p => {
      const id = p.parameterId || p.id;
      if (id) pMap[id] = { value: p.value, status: p.status || '' };
    });
  }

  const deficiencies = [];
  const boostNutrients = [];
  const avoidCategories = [];
  let maxCalories = null;
  let preferLowGI = false;

  // Helper to check if a parameter is low
  const isLow = (id) => pMap[id] && (pMap[id].status.includes('low') || pMap[id].status.includes('critical_low'));
  const isHigh = (id) => pMap[id] && (pMap[id].status.includes('high') || pMap[id].status.includes('critical_high'));

  // Low Hemoglobin / Iron / Ferritin → iron-rich dishes
  if (isLow('hemoglobin') || isLow('iron') || isLow('ferritin') || isLow('iron_saturation')) {
    deficiencies.push({ nutrient: 'Iron', reason: 'Low hemoglobin/iron detected — need iron-rich foods', params: ['hemoglobin', 'iron', 'ferritin'].filter(id => isLow(id)) });
    boostNutrients.push('iron');
  }

  // Low Calcium → calcium-rich dishes
  if (isLow('calcium')) {
    deficiencies.push({ nutrient: 'Calcium', reason: 'Low calcium — need calcium-rich foods for bone health', params: ['calcium'] });
    boostNutrients.push('calcium');
  }

  // Low Vitamin D → vitamin D foods + sunlight advice
  if (isLow('vitamin_d') || isLow('vitamin_d2')) {
    deficiencies.push({ nutrient: 'Vitamin D', reason: 'Low Vitamin D — need vitamin D foods and sunlight', params: ['vitamin_d'] });
    boostNutrients.push('vitD');
  }

  // Low B12 → B12-rich dishes
  if (isLow('vitamin_b12')) {
    deficiencies.push({ nutrient: 'Vitamin B12', reason: 'Low B12 — very common in vegetarian Indians. Need B12-rich foods.', params: ['vitamin_b12'] });
    boostNutrients.push('vitB12');
  }

  // Low Folate → folate-rich dishes
  if (isLow('folate')) {
    deficiencies.push({ nutrient: 'Folate', reason: 'Low folate — need green leafy vegetables and lentils', params: ['folate'] });
    boostNutrients.push('folate');
  }

  // Low Protein / Albumin → protein-rich dishes
  if (isLow('total_protein') || isLow('albumin')) {
    deficiencies.push({ nutrient: 'Protein', reason: 'Low protein — need protein-rich foods', params: ['total_protein', 'albumin'].filter(id => isLow(id)) });
    boostNutrients.push('protein');
  }

  // High Cholesterol / LDL → low-fat, high-fiber dishes
  if (isHigh('total_cholesterol') || isHigh('ldl') || isHigh('triglycerides')) {
    deficiencies.push({ nutrient: 'Heart Health', reason: 'High cholesterol/triglycerides — need low-fat, high-fiber diet', params: ['total_cholesterol', 'ldl', 'triglycerides'].filter(id => isHigh(id)) });
    avoidCategories.push('high-fat', 'fried', 'processed');
    boostNutrients.push('fiber');
  }

  // High Blood Sugar → low-GI dishes
  if (isHigh('fasting_glucose') || isHigh('hba1c') || isHigh('pp_glucose')) {
    deficiencies.push({ nutrient: 'Blood Sugar Control', reason: 'Elevated blood sugar — need low glycemic index foods', params: ['fasting_glucose', 'hba1c', 'pp_glucose'].filter(id => isHigh(id)) });
    preferLowGI = true;
    avoidCategories.push('high-sugar', 'refined-carbs', 'maida');
    boostNutrients.push('fiber');
  }

  // High Uric Acid → low-purine diet
  if (isHigh('uric_acid')) {
    deficiencies.push({ nutrient: 'Uric Acid Management', reason: 'High uric acid — need low-purine diet', params: ['uric_acid'] });
    avoidCategories.push('high-purine', 'organ-meat', 'beer');
  }

  // High Creatinine / Low eGFR → low-protein diet
  if (isHigh('creatinine') || isLow('egfr')) {
    deficiencies.push({ nutrient: 'Kidney Health', reason: 'Kidney stress detected — need kidney-friendly diet', params: ['creatinine', 'egfr'].filter(id => pMap[id]) });
    avoidCategories.push('high-protein', 'high-sodium', 'high-potassium');
    maxCalories = 1800;
  }

  // High Liver Enzymes → liver-friendly diet
  if (isHigh('sgot') || isHigh('sgpt') || isHigh('ggt')) {
    deficiencies.push({ nutrient: 'Liver Health', reason: 'Elevated liver enzymes — need liver-friendly diet', params: ['sgot', 'sgpt', 'ggt'].filter(id => isHigh(id)) });
    avoidCategories.push('alcohol', 'fried', 'processed');
  }

  // Low Zinc
  if (isLow('zinc')) {
    deficiencies.push({ nutrient: 'Zinc', reason: 'Low zinc — need zinc-rich foods for immunity and hair health', params: ['zinc'] });
    boostNutrients.push('zinc');
  }

  // Low Magnesium
  if (isLow('magnesium')) {
    deficiencies.push({ nutrient: 'Magnesium', reason: 'Low magnesium — need magnesium-rich foods', params: ['magnesium'] });
    boostNutrients.push('magnesium');
  }

  // Build summary text
  const boostText = boostNutrients.length > 0 ? `Boost ${[...new Set(boostNutrients)].join(', ')}` : '';
  const avoidText = avoidCategories.length > 0 ? `Reduce ${[...new Set(avoidCategories)].join(', ')}` : '';
  const summaryParts = [boostText, avoidText].filter(Boolean);
  const summary = summaryParts.length > 0 ? summaryParts.join(' | ') : 'Your report looks balanced — maintain a healthy diet!';

  return {
    deficiencies,
    dietProfile: {
      boostNutrients: [...new Set(boostNutrients)],
      avoidCategories: [...new Set(avoidCategories)],
      maxCalories,
      preferLowGI
    },
    summary,
    hasDietRecommendations: deficiencies.length > 0
  };
}


module.exports = {
  PARAMETERS_DB,
  findParameter,
  parseReportText,
  analyzeResults,
  getDemoAnalysis,
  normalizeParamName,
  MIN_VALID_PARAMETERS,
  // Feature 1: Clinical Risk Scores
  calculateRiskScores,
  handleRiskScores,
  // Feature 2: Medicine-Food Interactions
  medicineInteractions,
  getPossibleMedicines,
  handleMedicineInteractions,
  // Feature 3: Diet Plan Bridge
  generateDietRecommendation
};
