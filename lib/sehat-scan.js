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
    aliases: ['rbc', 'red blood cells', 'red blood cell count', 'erythrocytes', 'rbc count', 'total rbc', 'total rbc count', 'rbc total', 'red cell count', 'r.b.c', 'rbc (red blood cells)'],
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
    ranges: {
      male: { low: 40, high: 200 },
      female: { low: 50, high: 200 },
      default: { low: 40, high: 200 }
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

  // Exact alias match first (highest confidence)
  for (const param of PARAMETERS_DB) {
    for (const alias of param.aliases) {
      if (normalizeParamName(alias) === normalized) return param;
    }
  }

  // Contains match — but ONLY if the input contains the FULL alias (not the other way around)
  // e.g., "hemoglobin hb" contains "hemoglobin" ✓, but "total" should NOT match "total wbc"
  for (const param of PARAMETERS_DB) {
    for (const alias of param.aliases) {
      const normAlias = normalizeParamName(alias);
      if (normAlias.length < 4) continue; // Short aliases need exact match only
      // Input contains alias → good (e.g., "serum creatinine level" contains "creatinine")
      if (normalized.includes(normAlias) && normAlias.length >= normalized.length * 0.5) return param;
      // Alias contains input → only if input is long & specific enough
      if (normAlias.includes(normalized) && normalized.length >= 6 && normalized.length >= normAlias.length * 0.7) return param;
    }
  }

  // Fuzzy match with Levenshtein — very tight threshold, only for longer names
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
      '🥚 Protein intake badhayein: dal, rajma, chole, paneer, eggs, chicken, fish, soybean daily.',
      '🥛 Calcium sources: doodh, dahi, paneer, ragi, til (sesame), almonds. Vitamin D bhi check karwayein.',
      '💪 Overall nutrition improve karein — yeh pattern suggest karta hai ki diet mein essential nutrients ki kami hai.',
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
      normalRange: `${ranges.low} - ${ranges.high}`,
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
  // Weighted score: critical findings have more impact on overall health score
  let weightedTotal = 0;
  let weightSum = 0;
  for (const p of analysis.parameters) {
    let weight = 1;
    if (p.status.startsWith('critical')) weight = 3;
    else if (p.status === 'low' || p.status === 'high') weight = 2;
    else if (p.status.includes('slightly')) weight = 1.5;
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
      // Check exclusion rule: some patterns should NOT trigger if certain params are abnormal
      // e.g., low_t3_syndrome should NOT trigger if TSH is high (that would be hypothyroidism)
      if (pattern.excludeIfAbnormal) {
        const shouldExclude = pattern.excludeIfAbnormal.some(paramId => {
          const found = analysis.parameters.find(p => p.id === paramId);
          return found && found.status !== 'normal' && !found.status.startsWith('borderline');
        });
        if (shouldExclude) continue;
      }

      detectedPatterns.push(pattern);
      // Add pattern-specific recommendations
      analysis.recommendations.push(...pattern.recommendations);
      // Suppress individual diet tips from these params
      pattern.suppress.forEach(id => suppressedParams.add(id));
    }
  }

  analysis.detectedPatterns = detectedPatterns.map(p => p.name);

  // Step 2: Add funneled doctor recommendation (not a dump of every specialist)
  const doctorsNeeded = [...new Set(trueAbnormal.map(p => p.doctor).filter(Boolean))];
  if (critical.length > 0) {
    const criticalDoctors = [...new Set(critical.map(p => p.doctor).filter(Boolean))];
    analysis.recommendations.unshift(`🩺 Priority: See a doctor soon. Start with a General Physician who may refer you to ${criticalDoctors.join(' or ')}.`);
  } else if (doctorsNeeded.length > 0) {
    // Pick the most relevant 1-2 specialists based on pattern
    const primaryDoctor = doctorsNeeded[0];
    if (doctorsNeeded.length <= 2) {
      analysis.recommendations.unshift(`🩺 Discuss these findings with your doctor (${doctorsNeeded.join(' or ')}) at your next visit.`);
    } else {
      analysis.recommendations.unshift(`🩺 Start with a General Physician who can review all findings and refer to specialists if needed.`);
    }
  }

  // Step 3: Add individual diet tips for TRULY ABNORMAL params (not borderline)
  // Borderline values are within range — don't add diet modifications for them
  const dietKeywordsSeen = new Set(); // Track themes to prevent conceptual duplicates

  function isDuplicateDiet(advice) {
    // Extract key food/action terms from the advice
    const keywords = advice.toLowerCase().match(/\b(iron|protein|palak|spinach|chukandar|beetroot|anaar|pomegranate|eggs?|fish|dairy|doodh|milk|paneer|exercise|walking|nuts|almonds|walnuts|salt|potassium|banana|alcohol|haldi|turmeric|amla|tulsi|deworming|vitamin\s*[bdc]|b12|folate|folic|omega|green\s*tea|lemon|nimbu)\b/gi) || [];
    let isDup = false;
    const newKeywords = [];
    for (const kw of keywords) {
      const k = kw.toLowerCase();
      if (dietKeywordsSeen.has(k)) isDup = true;
      newKeywords.push(k);
    }
    // Only mark as duplicate if >60% of keywords already seen
    if (keywords.length > 0 && newKeywords.filter(k => dietKeywordsSeen.has(k)).length > keywords.length * 0.6) {
      return true;
    }
    newKeywords.forEach(k => dietKeywordsSeen.add(k));
    return false;
  }

  // Check if kidneys are actually abnormal (to filter kidney diet from normal kidney function)
  const kidneyParams = ['creatinine', 'bun', 'urea', 'egfr', 'uric_acid'];
  const kidneyAbnormal = trueAbnormal.some(p => kidneyParams.includes(p.id));

  for (const p of trueAbnormal) {
    if (!p.diet || suppressedParams.has(p.id)) continue;

    // Filter context-inappropriate recommendations: don't suggest kidney diet if kidneys are normal
    if (!kidneyAbnormal && /kidney|renal|nephr/i.test(p.diet) && !kidneyParams.includes(p.id)) continue;

    const isLow = p.status.includes('low');
    const isHigh = p.status.includes('high');
    let dietAdvice = p.diet;

    // If diet has both "High X:" and "Low X:" sections, pick the relevant one
    const hasHighLow = /high\s+\w+.*?:/i.test(dietAdvice) && /low\s+\w+.*?:/i.test(dietAdvice);
    if (hasHighLow) {
      const highMatch = dietAdvice.match(/high\s+\w+\s*:\s*(.*?)(?=\.\s*low\s+\w+\s*:|$)/is);
      const lowMatch = dietAdvice.match(/low\s+\w+\s*:\s*(.*?)(?=\.\s*high\s+\w+\s*:|$)/is);
      if (isLow && lowMatch) dietAdvice = lowMatch[1].trim();
      else if (isHigh && highMatch) dietAdvice = highMatch[1].trim();
    }

    // Skip if this diet tip is conceptually a duplicate of one already added
    if (dietAdvice && !isDuplicateDiet(dietAdvice) && !analysis.recommendations.includes(dietAdvice)) {
      analysis.recommendations.push(dietAdvice);
    }
  }

  // Step 4: Add contextual generic tips (only if relevant)
  if (analysis.recommendations.length > 0) {
    analysis.recommendations.push('🔬 Retest after 3 months to track improvement.');
  }
  if (!suppressedParams.has('uric_acid') && !suppressedParams.has('creatinine')) {
    analysis.recommendations.push('💧 Stay hydrated — 3-4 liters of water daily.');
  }
  if (trueAbnormal.length > 0) {
    analysis.recommendations.push('🏃 Exercise 30 minutes daily — even walking helps.');
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

module.exports = {
  PARAMETERS_DB,
  findParameter,
  parseReportText,
  analyzeResults,
  getDemoAnalysis,
  normalizeParamName,
  MIN_VALID_PARAMETERS
};
