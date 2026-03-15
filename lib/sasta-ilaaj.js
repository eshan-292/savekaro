/**
 * SastaIlaaj — Generic Medicine Finder
 * Backend logic with comprehensive Indian medicine database
 */

// ─── Medicine Database ───────────────────────────────────────────────────────
// Each entry: { id, brand, manufacturer, mrp, salt, category, genericAlts: [{ name, manufacturer, price }] }

const medicines = [
  // ── Pain / Fever ──────────────────────────────────────────────────────────
  { id: 1, brand: "Crocin 650", manufacturer: "GSK", mrp: 30, salt: "Paracetamol 650mg", category: "Pain/Fever", genericAlts: [
    { name: "Paracetamol 650mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Pacimol 650", manufacturer: "Ipca", price: 12 },
    { name: "Calpol 650", manufacturer: "GSK", price: 25 },
  ]},
  { id: 2, brand: "Dolo 650", manufacturer: "Micro Labs", mrp: 32, salt: "Paracetamol 650mg", category: "Pain/Fever", genericAlts: [
    { name: "Paracetamol 650mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Pacimol 650", manufacturer: "Ipca", price: 12 },
    { name: "Calpol 650", manufacturer: "GSK", price: 25 },
  ]},
  { id: 3, brand: "Combiflam", manufacturer: "Sanofi", mrp: 42, salt: "Ibuprofen 400mg + Paracetamol 325mg", category: "Pain/Fever", genericAlts: [
    { name: "Ibuprofen + Paracetamol (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Brufen Plus", manufacturer: "Abbott", price: 30 },
    { name: "Ibugesic Plus", manufacturer: "Cipla", price: 28 },
  ]},
  { id: 4, brand: "Saridon", manufacturer: "Bayer", mrp: 52, salt: "Propyphenazone 150mg + Paracetamol 250mg + Caffeine 50mg", category: "Pain/Fever", genericAlts: [
    { name: "Anaprin", manufacturer: "Cadila", price: 15 },
    { name: "Dart", manufacturer: "Unichem", price: 18 },
  ]},
  { id: 5, brand: "Volini Gel", manufacturer: "Sun Pharma", mrp: 135, salt: "Diclofenac Diethylamine 1.16% Gel", category: "Pain/Fever", genericAlts: [
    { name: "Diclofenac Gel (Generic)", manufacturer: "Jan Aushadhi", price: 25 },
    { name: "Voveran Emulgel", manufacturer: "Novartis", price: 95 },
    { name: "Dynapar QPS", manufacturer: "Troikaa", price: 80 },
  ]},
  { id: 6, brand: "Voveran SR 100", manufacturer: "Novartis", mrp: 75, salt: "Diclofenac Sodium 100mg SR", category: "Pain/Fever", genericAlts: [
    { name: "Diclofenac 100mg SR (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Dynapar SR", manufacturer: "Troikaa", price: 45 },
    { name: "Diclomax SR", manufacturer: "Zydus", price: 40 },
  ]},
  { id: 7, brand: "Zerodol SP", manufacturer: "Ipca", mrp: 120, salt: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg", category: "Pain/Fever", genericAlts: [
    { name: "Aceclofenac+Para+Serra (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Hifenac SP", manufacturer: "Intas", price: 85 },
    { name: "Acemiz SP", manufacturer: "Sun Pharma", price: 90 },
  ]},
  { id: 8, brand: "Sumo", manufacturer: "Alkem", mrp: 50, salt: "Nimesulide 100mg + Paracetamol 325mg", category: "Pain/Fever", genericAlts: [
    { name: "Nimesulide + Paracetamol (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Nice Plus", manufacturer: "Zydus", price: 30 },
    { name: "Nise Plus", manufacturer: "Dr. Reddy's", price: 35 },
  ]},
  { id: 9, brand: "Flexon MR", manufacturer: "Aristo", mrp: 90, salt: "Ibuprofen 400mg + Paracetamol 325mg + Chlorzoxazone 250mg", category: "Pain/Fever", genericAlts: [
    { name: "Ibuprofen+Para+Chlor (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Brufen MR", manufacturer: "Abbott", price: 65 },
  ]},
  { id: 10, brand: "Disprin", manufacturer: "Reckitt", mrp: 18, salt: "Aspirin 350mg", category: "Pain/Fever", genericAlts: [
    { name: "Aspirin 350mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Ecosprin 325", manufacturer: "USV", price: 10 },
  ]},

  // ── Diabetes ──────────────────────────────────────────────────────────────
  { id: 11, brand: "Glycomet GP 2", manufacturer: "USV", mrp: 175, salt: "Metformin 500mg + Glimepiride 2mg", category: "Diabetes", genericAlts: [
    { name: "Metformin+Glimepiride (Generic)", manufacturer: "Jan Aushadhi", price: 22 },
    { name: "Glimy M2", manufacturer: "Micro Labs", price: 85 },
    { name: "Zoryl M2", manufacturer: "Sun Pharma", price: 95 },
  ]},
  { id: 12, brand: "Glycomet 500", manufacturer: "USV", mrp: 35, salt: "Metformin 500mg", category: "Diabetes", genericAlts: [
    { name: "Metformin 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Obimet 500", manufacturer: "Zydus", price: 18 },
    { name: "Walaphage 500", manufacturer: "Wallace", price: 20 },
  ]},
  { id: 13, brand: "Glycomet 850", manufacturer: "USV", mrp: 55, salt: "Metformin 850mg", category: "Diabetes", genericAlts: [
    { name: "Metformin 850mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Obimet 850", manufacturer: "Zydus", price: 30 },
  ]},
  { id: 14, brand: "Glycomet 1000 SR", manufacturer: "USV", mrp: 125, salt: "Metformin 1000mg SR", category: "Diabetes", genericAlts: [
    { name: "Metformin 1000mg SR (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Obimet SR 1000", manufacturer: "Zydus", price: 65 },
  ]},
  { id: 15, brand: "Jalra 50", manufacturer: "USV", mrp: 320, salt: "Vildagliptin 50mg", category: "Diabetes", genericAlts: [
    { name: "Vildagliptin 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 55 },
    { name: "Zomelis 50", manufacturer: "Sun Pharma", price: 180 },
    { name: "Galvus 50", manufacturer: "Novartis", price: 280 },
  ]},
  { id: 16, brand: "Januvia 100", manufacturer: "MSD", mrp: 720, salt: "Sitagliptin 100mg", category: "Diabetes", genericAlts: [
    { name: "Sitagliptin 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 110 },
    { name: "Istavel 100", manufacturer: "Sun Pharma", price: 450 },
    { name: "Zita 100", manufacturer: "Glenmark", price: 380 },
  ]},
  { id: 17, brand: "Amaryl 2", manufacturer: "Sanofi", mrp: 140, salt: "Glimepiride 2mg", category: "Diabetes", genericAlts: [
    { name: "Glimepiride 2mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Glimy 2", manufacturer: "Micro Labs", price: 55 },
    { name: "Zoryl 2", manufacturer: "Sun Pharma", price: 60 },
  ]},
  { id: 18, brand: "Trajenta 5", manufacturer: "Boehringer", mrp: 680, salt: "Linagliptin 5mg", category: "Diabetes", genericAlts: [
    { name: "Linagliptin 5mg (Generic)", manufacturer: "Cipla", price: 180 },
    { name: "Linage 5", manufacturer: "Alkem", price: 200 },
  ]},
  { id: 19, brand: "Gluformin G1", manufacturer: "Abbott", mrp: 130, salt: "Metformin 500mg + Glimepiride 1mg", category: "Diabetes", genericAlts: [
    { name: "Metformin+Glimepiride (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Glycomet GP 1", manufacturer: "USV", price: 85 },
  ]},
  { id: 20, brand: "Ryzodeg", manufacturer: "Novo Nordisk", mrp: 1850, salt: "Insulin Degludec + Insulin Aspart", category: "Diabetes", genericAlts: [
    { name: "Basalog (Biosimilar Glargine)", manufacturer: "Biocon", price: 620 },
    { name: "Insugen N", manufacturer: "Biocon", price: 220 },
  ]},

  // ── BP / Heart ────────────────────────────────────────────────────────────
  { id: 21, brand: "Telma 40", manufacturer: "Glenmark", mrp: 130, salt: "Telmisartan 40mg", category: "BP/Heart", genericAlts: [
    { name: "Telmisartan 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Telmikind 40", manufacturer: "Mankind", price: 60 },
    { name: "Telsar 40", manufacturer: "Unichem", price: 55 },
  ]},
  { id: 22, brand: "Telma H", manufacturer: "Glenmark", mrp: 160, salt: "Telmisartan 40mg + Hydrochlorothiazide 12.5mg", category: "BP/Heart", genericAlts: [
    { name: "Telmisartan+HCTZ (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Telmikind H", manufacturer: "Mankind", price: 75 },
    { name: "Telsar H", manufacturer: "Unichem", price: 70 },
  ]},
  { id: 23, brand: "Telma AM", manufacturer: "Glenmark", mrp: 195, salt: "Telmisartan 40mg + Amlodipine 5mg", category: "BP/Heart", genericAlts: [
    { name: "Telmisartan+Amlodipine (Generic)", manufacturer: "Jan Aushadhi", price: 22 },
    { name: "Telmikind AM", manufacturer: "Mankind", price: 90 },
    { name: "Telsar AM", manufacturer: "Unichem", price: 85 },
  ]},
  { id: 24, brand: "Amlodac 5", manufacturer: "Zydus", mrp: 55, salt: "Amlodipine 5mg", category: "BP/Heart", genericAlts: [
    { name: "Amlodipine 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Amlong 5", manufacturer: "Micro Labs", price: 28 },
    { name: "Stamlo 5", manufacturer: "Dr. Reddy's", price: 32 },
  ]},
  { id: 25, brand: "Amlong 5", manufacturer: "Micro Labs", mrp: 30, salt: "Amlodipine 5mg", category: "BP/Heart", genericAlts: [
    { name: "Amlodipine 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Stamlo 5", manufacturer: "Dr. Reddy's", price: 32 },
    { name: "Amlodac 5", manufacturer: "Zydus", price: 55 },
  ]},
  { id: 26, brand: "Ecosprin 75", manufacturer: "USV", mrp: 12, salt: "Aspirin 75mg (Enteric Coated)", category: "BP/Heart", genericAlts: [
    { name: "Aspirin 75mg EC (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Delisprin 75", manufacturer: "Sun Pharma", price: 8 },
    { name: "Loprin 75", manufacturer: "Reckitt", price: 10 },
  ]},
  { id: 27, brand: "Ecosprin AV 75/10", manufacturer: "USV", mrp: 85, salt: "Aspirin 75mg + Atorvastatin 10mg", category: "BP/Heart", genericAlts: [
    { name: "Aspirin+Atorvastatin (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Novastat AV", manufacturer: "Cipla", price: 55 },
  ]},
  { id: 28, brand: "Losar 50", manufacturer: "Unichem", mrp: 110, salt: "Losartan 50mg", category: "BP/Heart", genericAlts: [
    { name: "Losartan 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Losacar 50", manufacturer: "Cadila", price: 55 },
    { name: "Repace 50", manufacturer: "Sun Pharma", price: 60 },
  ]},
  { id: 29, brand: "Met XL 50", manufacturer: "Sun Pharma", mrp: 95, salt: "Metoprolol Succinate 50mg ER", category: "BP/Heart", genericAlts: [
    { name: "Metoprolol 50mg ER (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Betaloc 50", manufacturer: "AstraZeneca", price: 70 },
    { name: "Revelol XL 50", manufacturer: "Cipla", price: 55 },
  ]},
  { id: 30, brand: "Concor 5", manufacturer: "Merck", mrp: 140, salt: "Bisoprolol 5mg", category: "BP/Heart", genericAlts: [
    { name: "Bisoprolol 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Corbis 5", manufacturer: "Torrent", price: 65 },
    { name: "Biselect 5", manufacturer: "Intas", price: 60 },
  ]},
  { id: 31, brand: "Envas 5", manufacturer: "Cadila", mrp: 40, salt: "Enalapril 5mg", category: "BP/Heart", genericAlts: [
    { name: "Enalapril 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Enam 5", manufacturer: "Lupin", price: 22 },
  ]},
  { id: 32, brand: "Ramipril 5", manufacturer: "Sanofi", mrp: 75, salt: "Ramipril 5mg", category: "BP/Heart", genericAlts: [
    { name: "Ramipril 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Cardace 5", manufacturer: "Sanofi", price: 65 },
    { name: "Ramistar 5", manufacturer: "Lupin", price: 40 },
  ]},

  // ── Antibiotics ───────────────────────────────────────────────────────────
  { id: 33, brand: "Azithral 500", manufacturer: "Alembic", mrp: 110, salt: "Azithromycin 500mg", category: "Antibiotics", genericAlts: [
    { name: "Azithromycin 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Azibest 500", manufacturer: "Mankind", price: 60 },
    { name: "Zithromax 500", manufacturer: "Pfizer", price: 95 },
  ]},
  { id: 34, brand: "Augmentin 625", manufacturer: "GSK", mrp: 220, salt: "Amoxicillin 500mg + Clavulanic Acid 125mg", category: "Antibiotics", genericAlts: [
    { name: "Amox+Clav 625mg (Generic)", manufacturer: "Jan Aushadhi", price: 30 },
    { name: "Moxikind CV 625", manufacturer: "Mankind", price: 120 },
    { name: "Clavam 625", manufacturer: "Alkem", price: 130 },
  ]},
  { id: 35, brand: "Ciplox 500", manufacturer: "Cipla", mrp: 95, salt: "Ciprofloxacin 500mg", category: "Antibiotics", genericAlts: [
    { name: "Ciprofloxacin 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Cifran 500", manufacturer: "Sun Pharma", price: 60 },
    { name: "Ciprobid 500", manufacturer: "Zydus", price: 55 },
  ]},
  { id: 36, brand: "Monocef 200", manufacturer: "Aristo", mrp: 180, salt: "Cefixime 200mg", category: "Antibiotics", genericAlts: [
    { name: "Cefixime 200mg (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Taxim O 200", manufacturer: "Alkem", price: 110 },
    { name: "Zifi 200", manufacturer: "FDC", price: 100 },
  ]},
  { id: 37, brand: "Amoxyclav 625", manufacturer: "Alkem", mrp: 195, salt: "Amoxicillin 500mg + Clavulanic Acid 125mg", category: "Antibiotics", genericAlts: [
    { name: "Amox+Clav 625mg (Generic)", manufacturer: "Jan Aushadhi", price: 30 },
    { name: "Moxikind CV 625", manufacturer: "Mankind", price: 120 },
    { name: "Augmentin 625", manufacturer: "GSK", price: 220 },
  ]},
  { id: 38, brand: "Norflox TZ", manufacturer: "Cipla", mrp: 65, salt: "Norfloxacin 400mg + Tinidazole 600mg", category: "Antibiotics", genericAlts: [
    { name: "Norfloxacin+Tinidazole (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Norbid TZ", manufacturer: "Zydus", price: 35 },
  ]},
  { id: 39, brand: "Oflox 200", manufacturer: "Cipla", mrp: 80, salt: "Ofloxacin 200mg", category: "Antibiotics", genericAlts: [
    { name: "Ofloxacin 200mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Zenflox 200", manufacturer: "Mankind", price: 45 },
    { name: "Oflomac 200", manufacturer: "Macleods", price: 40 },
  ]},
  { id: 40, brand: "Cefakind 200", manufacturer: "Mankind", mrp: 160, salt: "Cefixime 200mg", category: "Antibiotics", genericAlts: [
    { name: "Cefixime 200mg (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Monocef 200", manufacturer: "Aristo", price: 180 },
    { name: "Zifi 200", manufacturer: "FDC", price: 100 },
  ]},
  { id: 41, brand: "Doxycycline 100", manufacturer: "Sun Pharma", mrp: 55, salt: "Doxycycline 100mg", category: "Antibiotics", genericAlts: [
    { name: "Doxycycline 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Doxt SL 100", manufacturer: "Dr. Reddy's", price: 30 },
  ]},
  { id: 42, brand: "Metrogyl 400", manufacturer: "J&J", mrp: 25, salt: "Metronidazole 400mg", category: "Antibiotics", genericAlts: [
    { name: "Metronidazole 400mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Flagyl 400", manufacturer: "Abbott", price: 18 },
  ]},

  // ── Vitamins / Supplements ────────────────────────────────────────────────
  { id: 43, brand: "Shelcal 500", manufacturer: "Torrent", mrp: 155, salt: "Calcium Carbonate 1250mg + Vitamin D3 250IU", category: "Vitamins", genericAlts: [
    { name: "Calcium+Vit D3 (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Calcimax 500", manufacturer: "Meyer", price: 85 },
    { name: "CCM 500", manufacturer: "Cadila", price: 70 },
  ]},
  { id: 44, brand: "Supradyn", manufacturer: "Abbott", mrp: 65, salt: "Multivitamin + Multimineral", category: "Vitamins", genericAlts: [
    { name: "Multivitamin (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "A to Z NS", manufacturer: "Alkem", price: 35 },
    { name: "Becosules Z", manufacturer: "Pfizer", price: 40 },
  ]},
  { id: 45, brand: "Becosules", manufacturer: "Pfizer", mrp: 35, salt: "B-Complex + Vitamin C", category: "Vitamins", genericAlts: [
    { name: "B-Complex+Vit C (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Polybion", manufacturer: "Abbott", price: 22 },
    { name: "Beplex Forte", manufacturer: "Anglo-French", price: 18 },
  ]},
  { id: 46, brand: "Limcee 500", manufacturer: "Abbott", mrp: 25, salt: "Vitamin C 500mg (Chewable)", category: "Vitamins", genericAlts: [
    { name: "Vitamin C 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Celin 500", manufacturer: "GSK", price: 15 },
  ]},
  { id: 47, brand: "Calcirol D3", manufacturer: "Cadila", mrp: 285, salt: "Cholecalciferol 60000IU", category: "Vitamins", genericAlts: [
    { name: "Cholecalciferol 60K (Generic)", manufacturer: "Jan Aushadhi", price: 30 },
    { name: "D Rise 60K", manufacturer: "USV", price: 120 },
    { name: "Uprise D3 60K", manufacturer: "Alkem", price: 140 },
  ]},
  { id: 48, brand: "Zincovit", manufacturer: "Apex", mrp: 120, salt: "Multivitamin + Zinc + Grape Seed Extract", category: "Vitamins", genericAlts: [
    { name: "Multivitamin+Zinc (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "A to Z Gold", manufacturer: "Alkem", price: 65 },
  ]},
  { id: 49, brand: "Neurobion Forte", manufacturer: "Merck", mrp: 35, salt: "Vitamin B1 10mg + B6 3mg + B12 15mcg", category: "Vitamins", genericAlts: [
    { name: "Vitamin B1+B6+B12 (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Meconerv", manufacturer: "Sun Pharma", price: 20 },
  ]},
  { id: 50, brand: "Evion 400", manufacturer: "Merck", mrp: 30, salt: "Vitamin E 400mg", category: "Vitamins", genericAlts: [
    { name: "Vitamin E 400mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "E-Cod", manufacturer: "Zydus", price: 18 },
  ]},
  { id: 51, brand: "Feronia XT", manufacturer: "Emcure", mrp: 180, salt: "Ferrous Ascorbate 100mg + Folic Acid 1.5mg", category: "Vitamins", genericAlts: [
    { name: "Iron+Folic Acid (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Orofer XT", manufacturer: "Emcure", price: 110 },
    { name: "Autrin XT", manufacturer: "Eris", price: 95 },
  ]},
  { id: 52, brand: "Methylcobalamin 1500", manufacturer: "Various", mrp: 150, salt: "Methylcobalamin 1500mcg", category: "Vitamins", genericAlts: [
    { name: "Methylcobalamin 1500 (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Meconerv 1500", manufacturer: "Sun Pharma", price: 80 },
    { name: "Nurokind 1500", manufacturer: "Mankind", price: 85 },
  ]},

  // ── Stomach / Digestion ───────────────────────────────────────────────────
  { id: 53, brand: "Pan D", manufacturer: "Alkem", mrp: 95, salt: "Pantoprazole 40mg + Domperidone 30mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Pantoprazole+Dom (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Pantocid D", manufacturer: "Sun Pharma", price: 65 },
    { name: "P2 D", manufacturer: "Cadila", price: 55 },
  ]},
  { id: 54, brand: "Pan 40", manufacturer: "Alkem", mrp: 60, salt: "Pantoprazole 40mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Pantoprazole 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Pantocid 40", manufacturer: "Sun Pharma", price: 35 },
    { name: "Pantop 40", manufacturer: "Aristo", price: 30 },
  ]},
  { id: 55, brand: "Rantac 150", manufacturer: "J&J", mrp: 30, salt: "Ranitidine 150mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Ranitidine 150mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Zinetac 150", manufacturer: "GSK", price: 18 },
    { name: "Aciloc 150", manufacturer: "Cadila", price: 20 },
  ]},
  { id: 56, brand: "Gelusil MPS", manufacturer: "Pfizer", mrp: 90, salt: "Aluminium Hydroxide + Magnesium Hydroxide + Simethicone", category: "Stomach/Digestion", genericAlts: [
    { name: "Antacid Gel (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Digene Gel", manufacturer: "Abbott", price: 65 },
    { name: "Mucaine Gel", manufacturer: "Pfizer", price: 70 },
  ]},
  { id: 57, brand: "Rabeprazole 20", manufacturer: "Various", mrp: 80, salt: "Rabeprazole 20mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Rabeprazole 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Razo 20", manufacturer: "Dr. Reddy's", price: 50 },
    { name: "Rablet 20", manufacturer: "Cadila", price: 45 },
  ]},
  { id: 58, brand: "Omez 20", manufacturer: "Dr. Reddy's", mrp: 55, salt: "Omeprazole 20mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Omeprazole 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Omecip 20", manufacturer: "Cipla", price: 30 },
    { name: "Ocid 20", manufacturer: "Zydus", price: 28 },
  ]},
  { id: 59, brand: "Norflox TZ", manufacturer: "Cipla", mrp: 65, salt: "Norfloxacin 400mg + Tinidazole 600mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Norfloxacin+Tinidazole (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Norbid TZ", manufacturer: "Zydus", price: 35 },
  ]},
  { id: 60, brand: "Cyclopam", manufacturer: "Indoco", mrp: 50, salt: "Dicyclomine 20mg + Paracetamol 325mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Dicyclomine+Para (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Meftal Spas", manufacturer: "Blue Cross", price: 35 },
    { name: "Spasmonil Plus", manufacturer: "Torrent", price: 30 },
  ]},
  { id: 61, brand: "Dulcolax 5mg", manufacturer: "Sanofi", mrp: 35, salt: "Bisacodyl 5mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Bisacodyl 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Conlax 5", manufacturer: "Alkem", price: 18 },
  ]},
  { id: 62, brand: "Cremaffin Plus", manufacturer: "Abbott", mrp: 145, salt: "Liquid Paraffin + Milk of Magnesia + Sodium Picosulfate", category: "Stomach/Digestion", genericAlts: [
    { name: "Laxative Syrup (Generic)", manufacturer: "Jan Aushadhi", price: 22 },
    { name: "Looz Syrup", manufacturer: "FDC", price: 75 },
  ]},

  // ── Allergies ─────────────────────────────────────────────────────────────
  { id: 63, brand: "Allegra 120", manufacturer: "Sanofi", mrp: 180, salt: "Fexofenadine 120mg", category: "Allergies", genericAlts: [
    { name: "Fexofenadine 120mg (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Fexova 120", manufacturer: "Glenmark", price: 85 },
    { name: "Altiva 120", manufacturer: "Cipla", price: 90 },
  ]},
  { id: 64, brand: "Allegra 180", manufacturer: "Sanofi", mrp: 220, salt: "Fexofenadine 180mg", category: "Allergies", genericAlts: [
    { name: "Fexofenadine 180mg (Generic)", manufacturer: "Jan Aushadhi", price: 20 },
    { name: "Fexova 180", manufacturer: "Glenmark", price: 110 },
    { name: "Altiva 180", manufacturer: "Cipla", price: 120 },
  ]},
  { id: 65, brand: "Montair LC", manufacturer: "Cipla", mrp: 195, salt: "Montelukast 10mg + Levocetirizine 5mg", category: "Allergies", genericAlts: [
    { name: "Montelukast+Levocet (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Montemac LC", manufacturer: "Macleods", price: 90 },
    { name: "Monte LC", manufacturer: "Mankind", price: 85 },
  ]},
  { id: 66, brand: "Cetirizine 10", manufacturer: "Various", mrp: 15, salt: "Cetirizine 10mg", category: "Allergies", genericAlts: [
    { name: "Cetirizine 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Okacet 10", manufacturer: "Cipla", price: 8 },
    { name: "CTZ 10", manufacturer: "GSK", price: 10 },
  ]},
  { id: 67, brand: "Levocetirizine 5", manufacturer: "Various", mrp: 35, salt: "Levocetirizine 5mg", category: "Allergies", genericAlts: [
    { name: "Levocetirizine 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Xyzal 5", manufacturer: "UCB", price: 22 },
    { name: "Levocet 5", manufacturer: "Sun Pharma", price: 18 },
  ]},
  { id: 68, brand: "Montair 10", manufacturer: "Cipla", mrp: 170, salt: "Montelukast 10mg", category: "Allergies", genericAlts: [
    { name: "Montelukast 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Montemac 10", manufacturer: "Macleods", price: 70 },
    { name: "Monte 10", manufacturer: "Mankind", price: 65 },
  ]},
  { id: 69, brand: "Avil 25", manufacturer: "Sanofi", mrp: 15, salt: "Pheniramine 25mg", category: "Allergies", genericAlts: [
    { name: "Pheniramine 25mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
  ]},
  { id: 70, brand: "Sinarest", manufacturer: "Centaur", mrp: 35, salt: "Paracetamol 500mg + Phenylephrine 10mg + Chlorpheniramine 2mg + Caffeine 30mg", category: "Allergies", genericAlts: [
    { name: "Cold Tablet (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Coldact Plus", manufacturer: "Sanofi", price: 20 },
    { name: "D-Cold Total", manufacturer: "Alkem", price: 22 },
  ]},

  // ── Thyroid ───────────────────────────────────────────────────────────────
  { id: 71, brand: "Thyronorm 25", manufacturer: "Abbott", mrp: 110, salt: "Levothyroxine 25mcg", category: "Thyroid", genericAlts: [
    { name: "Levothyroxine 25mcg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Eltroxin 25", manufacturer: "GSK", price: 55 },
    { name: "Thyrox 25", manufacturer: "Macleods", price: 50 },
  ]},
  { id: 72, brand: "Thyronorm 50", manufacturer: "Abbott", mrp: 125, salt: "Levothyroxine 50mcg", category: "Thyroid", genericAlts: [
    { name: "Levothyroxine 50mcg (Generic)", manufacturer: "Jan Aushadhi", price: 14 },
    { name: "Eltroxin 50", manufacturer: "GSK", price: 60 },
    { name: "Thyrox 50", manufacturer: "Macleods", price: 55 },
  ]},
  { id: 73, brand: "Thyronorm 75", manufacturer: "Abbott", mrp: 140, salt: "Levothyroxine 75mcg", category: "Thyroid", genericAlts: [
    { name: "Levothyroxine 75mcg (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Eltroxin 75", manufacturer: "GSK", price: 65 },
    { name: "Thyrox 75", manufacturer: "Macleods", price: 60 },
  ]},
  { id: 74, brand: "Thyronorm 100", manufacturer: "Abbott", mrp: 155, salt: "Levothyroxine 100mcg", category: "Thyroid", genericAlts: [
    { name: "Levothyroxine 100mcg (Generic)", manufacturer: "Jan Aushadhi", price: 16 },
    { name: "Eltroxin 100", manufacturer: "GSK", price: 70 },
    { name: "Thyrox 100", manufacturer: "Macleods", price: 65 },
  ]},
  { id: 75, brand: "Thyronorm 125", manufacturer: "Abbott", mrp: 170, salt: "Levothyroxine 125mcg", category: "Thyroid", genericAlts: [
    { name: "Levothyroxine 125mcg (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Eltroxin 125", manufacturer: "GSK", price: 80 },
    { name: "Thyrox 125", manufacturer: "Macleods", price: 70 },
  ]},
  { id: 76, brand: "Thyronorm 150", manufacturer: "Abbott", mrp: 185, salt: "Levothyroxine 150mcg", category: "Thyroid", genericAlts: [
    { name: "Levothyroxine 150mcg (Generic)", manufacturer: "Jan Aushadhi", price: 20 },
    { name: "Eltroxin 150", manufacturer: "GSK", price: 85 },
  ]},
  { id: 77, brand: "Neomercazole 5", manufacturer: "Abbott", mrp: 65, salt: "Carbimazole 5mg", category: "Thyroid", genericAlts: [
    { name: "Carbimazole 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Thyrocab 5", manufacturer: "Torrent", price: 35 },
  ]},

  // ── Cholesterol ───────────────────────────────────────────────────────────
  { id: 78, brand: "Atorva 10", manufacturer: "Zydus", mrp: 110, salt: "Atorvastatin 10mg", category: "Cholesterol", genericAlts: [
    { name: "Atorvastatin 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Lipicure 10", manufacturer: "Intas", price: 55 },
    { name: "Atocor 10", manufacturer: "Dr. Reddy's", price: 50 },
  ]},
  { id: 79, brand: "Atorva 20", manufacturer: "Zydus", mrp: 180, salt: "Atorvastatin 20mg", category: "Cholesterol", genericAlts: [
    { name: "Atorvastatin 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Lipicure 20", manufacturer: "Intas", price: 90 },
    { name: "Atocor 20", manufacturer: "Dr. Reddy's", price: 80 },
  ]},
  { id: 80, brand: "Atorva 40", manufacturer: "Zydus", mrp: 280, salt: "Atorvastatin 40mg", category: "Cholesterol", genericAlts: [
    { name: "Atorvastatin 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 22 },
    { name: "Lipicure 40", manufacturer: "Intas", price: 140 },
    { name: "Atocor 40", manufacturer: "Dr. Reddy's", price: 120 },
  ]},
  { id: 81, brand: "Rozavel 10", manufacturer: "Sun Pharma", mrp: 195, salt: "Rosuvastatin 10mg", category: "Cholesterol", genericAlts: [
    { name: "Rosuvastatin 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Rosuvas 10", manufacturer: "Ranbaxy", price: 110 },
    { name: "Crestor 10", manufacturer: "AstraZeneca", price: 180 },
  ]},
  { id: 82, brand: "Rozavel 20", manufacturer: "Sun Pharma", mrp: 310, salt: "Rosuvastatin 20mg", category: "Cholesterol", genericAlts: [
    { name: "Rosuvastatin 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 25 },
    { name: "Rosuvas 20", manufacturer: "Ranbaxy", price: 170 },
  ]},
  { id: 83, brand: "Fenolip 145", manufacturer: "Sun Pharma", mrp: 145, salt: "Fenofibrate 145mg", category: "Cholesterol", genericAlts: [
    { name: "Fenofibrate 145mg (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Lipicard 145", manufacturer: "USV", price: 80 },
  ]},

  // ── Mental Health ─────────────────────────────────────────────────────────
  { id: 84, brand: "Nexito 10", manufacturer: "Sun Pharma", mrp: 130, salt: "Escitalopram 10mg", category: "Mental Health", genericAlts: [
    { name: "Escitalopram 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Stalopam 10", manufacturer: "Lupin", price: 60 },
    { name: "Feliz S 10", manufacturer: "Torrent", price: 65 },
  ]},
  { id: 85, brand: "Nexito 5", manufacturer: "Sun Pharma", mrp: 85, salt: "Escitalopram 5mg", category: "Mental Health", genericAlts: [
    { name: "Escitalopram 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Stalopam 5", manufacturer: "Lupin", price: 40 },
    { name: "Feliz S 5", manufacturer: "Torrent", price: 42 },
  ]},
  { id: 86, brand: "Nexito Plus", manufacturer: "Sun Pharma", mrp: 165, salt: "Escitalopram 5mg + Clonazepam 0.5mg", category: "Mental Health", genericAlts: [
    { name: "Escitalopram+Clonazepam (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Stalopam Plus", manufacturer: "Lupin", price: 80 },
  ]},
  { id: 87, brand: "Lonazep 0.5", manufacturer: "Sun Pharma", mrp: 35, salt: "Clonazepam 0.5mg", category: "Mental Health", genericAlts: [
    { name: "Clonazepam 0.5mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Clonotril 0.5", manufacturer: "Torrent", price: 18 },
    { name: "Epitril 0.5", manufacturer: "Cipla", price: 15 },
  ]},
  { id: 88, brand: "Etizola 0.5", manufacturer: "Sun Pharma", mrp: 40, salt: "Etizolam 0.5mg", category: "Mental Health", genericAlts: [
    { name: "Etizolam 0.5mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Etirest 0.5", manufacturer: "Torrent", price: 20 },
  ]},
  { id: 89, brand: "Oleanz 5", manufacturer: "Sun Pharma", mrp: 120, salt: "Olanzapine 5mg", category: "Mental Health", genericAlts: [
    { name: "Olanzapine 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Olanex 5", manufacturer: "Mankind", price: 55 },
  ]},
  { id: 90, brand: "Fluoxetine 20", manufacturer: "Various", mrp: 45, salt: "Fluoxetine 20mg", category: "Mental Health", genericAlts: [
    { name: "Fluoxetine 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Fludac 20", manufacturer: "Cadila", price: 25 },
  ]},
  { id: 91, brand: "Sertraline 50", manufacturer: "Various", mrp: 85, salt: "Sertraline 50mg", category: "Mental Health", genericAlts: [
    { name: "Sertraline 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Daxid 50", manufacturer: "Pfizer", price: 50 },
    { name: "Serta 50", manufacturer: "Intas", price: 45 },
  ]},

  // ── More Pain / Muscle ────────────────────────────────────────────────────
  { id: 92, brand: "Ultracet", manufacturer: "J&J", mrp: 75, salt: "Tramadol 37.5mg + Paracetamol 325mg", category: "Pain/Fever", genericAlts: [
    { name: "Tramadol+Para (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Domadol Plus", manufacturer: "Mankind", price: 40 },
  ]},
  { id: 93, brand: "Meftal Spas", manufacturer: "Blue Cross", mrp: 60, salt: "Mefenamic Acid 250mg + Dicyclomine 10mg", category: "Pain/Fever", genericAlts: [
    { name: "Mefenamic+Dicyclomine (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Spasmonil Plus", manufacturer: "Torrent", price: 30 },
  ]},
  { id: 94, brand: "Myospaz Forte", manufacturer: "FDC", mrp: 80, salt: "Chlorzoxazone 500mg + Paracetamol 325mg", category: "Pain/Fever", genericAlts: [
    { name: "Chlorzoxazone+Para (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Proxyvon Plus", manufacturer: "Wockhardt", price: 45 },
  ]},

  // ── More Diabetes ─────────────────────────────────────────────────────────
  { id: 95, brand: "Glycomet GP 0.5", manufacturer: "USV", mrp: 105, salt: "Metformin 500mg + Glimepiride 0.5mg", category: "Diabetes", genericAlts: [
    { name: "Metformin+Glimepiride (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Glimy M 0.5", manufacturer: "Micro Labs", price: 55 },
  ]},
  { id: 96, brand: "Glucobay 50", manufacturer: "Bayer", mrp: 175, salt: "Acarbose 50mg", category: "Diabetes", genericAlts: [
    { name: "Acarbose 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 20 },
    { name: "Acarb 50", manufacturer: "Cipla", price: 85 },
  ]},

  // ── More BP ───────────────────────────────────────────────────────────────
  { id: 97, brand: "Clopitab A 150", manufacturer: "Lupin", mrp: 155, salt: "Clopidogrel 75mg + Aspirin 150mg", category: "BP/Heart", genericAlts: [
    { name: "Clopidogrel+Aspirin (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Clavix AP", manufacturer: "Cipla", price: 80 },
    { name: "Deplatt A 150", manufacturer: "Torrent", price: 90 },
  ]},
  { id: 98, brand: "Dilzem 30", manufacturer: "Torrent", mrp: 45, salt: "Diltiazem 30mg", category: "BP/Heart", genericAlts: [
    { name: "Diltiazem 30mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Angizem 30", manufacturer: "Sun Pharma", price: 25 },
  ]},
  { id: 99, brand: "Prazopress 2.5", manufacturer: "Sun Pharma", mrp: 55, salt: "Prazosin 2.5mg", category: "BP/Heart", genericAlts: [
    { name: "Prazosin 2.5mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Minipress XL 2.5", manufacturer: "Pfizer", price: 35 },
  ]},
  { id: 100, brand: "Nicardia Retard 20", manufacturer: "J&J", mrp: 35, salt: "Nifedipine 20mg SR", category: "BP/Heart", genericAlts: [
    { name: "Nifedipine 20mg SR (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Calcigard 20", manufacturer: "Torrent", price: 20 },
  ]},

  // ── More Stomach ──────────────────────────────────────────────────────────
  { id: 101, brand: "Mebex 100", manufacturer: "Cipla", mrp: 18, salt: "Mebendazole 100mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Mebendazole 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Wormin 100", manufacturer: "Cadila", price: 10 },
  ]},
  { id: 102, brand: "Albendazole 400", manufacturer: "Various", mrp: 15, salt: "Albendazole 400mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Albendazole 400mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Zentel 400", manufacturer: "GSK", price: 10 },
  ]},
  { id: 103, brand: "ORS (Electral)", manufacturer: "FDC", mrp: 22, salt: "ORS (WHO Formula)", category: "Stomach/Digestion", genericAlts: [
    { name: "ORS Powder (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Walyte ORS", manufacturer: "Wallace", price: 12 },
  ]},
  { id: 104, brand: "Econorm 250", manufacturer: "Dr. Reddy's", mrp: 140, salt: "Saccharomyces Boulardii 250mg", category: "Stomach/Digestion", genericAlts: [
    { name: "S. Boulardii (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Precovit", manufacturer: "Sun Pharma", price: 75 },
  ]},
  { id: 105, brand: "Ondansetron 4", manufacturer: "Various", mrp: 30, salt: "Ondansetron 4mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Ondansetron 4mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Emeset 4", manufacturer: "Cipla", price: 18 },
    { name: "Vomikind 4", manufacturer: "Mankind", price: 15 },
  ]},

  // ── Skin / Derma ──────────────────────────────────────────────────────────
  { id: 106, brand: "Betnovate N", manufacturer: "GSK", mrp: 65, salt: "Betamethasone 0.1% + Neomycin 0.5% Cream", category: "Skin", genericAlts: [
    { name: "Betamethasone+Neomycin (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Tenovate N", manufacturer: "Alembic", price: 35 },
  ]},
  { id: 107, brand: "Clobetasol Cream", manufacturer: "Various", mrp: 80, salt: "Clobetasol 0.05% Cream", category: "Skin", genericAlts: [
    { name: "Clobetasol Cream (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Tenovate Cream", manufacturer: "Alembic", price: 40 },
  ]},
  { id: 108, brand: "Clotrimazole Cream", manufacturer: "Various", mrp: 45, salt: "Clotrimazole 1% Cream", category: "Skin", genericAlts: [
    { name: "Clotrimazole 1% (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Candid Cream", manufacturer: "Glenmark", price: 30 },
  ]},
  { id: 109, brand: "Soframycin Cream", manufacturer: "Sanofi", mrp: 55, salt: "Framycetin 1% Cream", category: "Skin", genericAlts: [
    { name: "Framycetin Cream (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Framycort", manufacturer: "Alkem", price: 30 },
  ]},
  { id: 110, brand: "Panderm Plus", manufacturer: "Macleods", mrp: 95, salt: "Clobetasol + Ofloxacin + Miconazole + Zinc", category: "Skin", genericAlts: [
    { name: "Quadriderm Cream (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Quadriderm RF", manufacturer: "Piramal", price: 60 },
  ]},

  // ── Eye / Ear ─────────────────────────────────────────────────────────────
  { id: 111, brand: "Moxifloxacin Eye Drops", manufacturer: "Various", mrp: 75, salt: "Moxifloxacin 0.5% Eye Drops", category: "Eye/Ear", genericAlts: [
    { name: "Moxifloxacin Eye Drops (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Milflox", manufacturer: "Sun Pharma", price: 45 },
    { name: "Moxicip", manufacturer: "Cipla", price: 40 },
  ]},
  { id: 112, brand: "Tears Naturale", manufacturer: "Alcon", mrp: 130, salt: "Hydroxypropyl Methylcellulose 0.3% Eye Drops", category: "Eye/Ear", genericAlts: [
    { name: "HPMC Eye Drops (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Tear Drops", manufacturer: "Sun Pharma", price: 60 },
  ]},

  // ── Respiratory / Asthma ──────────────────────────────────────────────────
  { id: 113, brand: "Asthalin Inhaler", manufacturer: "Cipla", mrp: 115, salt: "Salbutamol 100mcg/dose Inhaler", category: "Respiratory", genericAlts: [
    { name: "Salbutamol Inhaler (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Ventolin Inhaler", manufacturer: "GSK", price: 90 },
  ]},
  { id: 114, brand: "Foracort 200 Inhaler", manufacturer: "Cipla", mrp: 420, salt: "Budesonide 200mcg + Formoterol 6mcg Inhaler", category: "Respiratory", genericAlts: [
    { name: "Budesonide+Formoterol (Generic)", manufacturer: "Cipla", price: 180 },
    { name: "Budamate 200", manufacturer: "Lupin", price: 280 },
  ]},
  { id: 115, brand: "Seroflo 250 Inhaler", manufacturer: "Cipla", mrp: 580, salt: "Salmeterol 25mcg + Fluticasone 250mcg Inhaler", category: "Respiratory", genericAlts: [
    { name: "Salm+Flut Inhaler (Generic)", manufacturer: "Cipla", price: 220 },
    { name: "Maxiflo 250", manufacturer: "Cipla", price: 380 },
  ]},
  { id: 116, brand: "Deriphyllin Retard 150", manufacturer: "Abbott", mrp: 35, salt: "Etofylline 77mg + Theophylline 23mg", category: "Respiratory", genericAlts: [
    { name: "Etofylline+Theophylline (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
  ]},

  // ── Anti-Fungal ───────────────────────────────────────────────────────────
  { id: 117, brand: "Fluconazole 150", manufacturer: "Various", mrp: 40, salt: "Fluconazole 150mg", category: "Antibiotics", genericAlts: [
    { name: "Fluconazole 150mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Zocon 150", manufacturer: "FDC", price: 25 },
    { name: "Forcan 150", manufacturer: "Cipla", price: 22 },
  ]},

  // ── More Vitamins ─────────────────────────────────────────────────────────
  { id: 118, brand: "Revital H", manufacturer: "Sun Pharma", mrp: 235, salt: "Multivitamin + Ginseng + Zinc", category: "Vitamins", genericAlts: [
    { name: "Multivitamin+Zinc (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Zincovit", manufacturer: "Apex", price: 120 },
    { name: "A to Z Gold", manufacturer: "Alkem", price: 65 },
  ]},
  { id: 119, brand: "Folic Acid 5mg", manufacturer: "Various", mrp: 12, salt: "Folic Acid 5mg", category: "Vitamins", genericAlts: [
    { name: "Folic Acid 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Folvite 5", manufacturer: "Pfizer", price: 8 },
  ]},
  { id: 120, brand: "Omega 3 (Seven Seas)", manufacturer: "Various", mrp: 350, salt: "Omega-3 Fatty Acids (EPA+DHA)", category: "Vitamins", genericAlts: [
    { name: "Omega-3 (Generic)", manufacturer: "Jan Aushadhi", price: 40 },
    { name: "Maxepa", manufacturer: "Merck", price: 180 },
  ]},

  // ── Urinary / Kidney ──────────────────────────────────────────────────────
  { id: 121, brand: "Urimax 0.4", manufacturer: "Cipla", mrp: 155, salt: "Tamsulosin 0.4mg", category: "Urinary", genericAlts: [
    { name: "Tamsulosin 0.4mg (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Dynapres 0.4", manufacturer: "Dr. Reddy's", price: 75 },
    { name: "Contiflo 0.4", manufacturer: "Sun Pharma", price: 80 },
  ]},
  { id: 122, brand: "Urimax D", manufacturer: "Cipla", mrp: 210, salt: "Tamsulosin 0.4mg + Dutasteride 0.5mg", category: "Urinary", genericAlts: [
    { name: "Tamsulosin+Dutasteride (Generic)", manufacturer: "Jan Aushadhi", price: 25 },
    { name: "Veltam D", manufacturer: "Intas", price: 110 },
  ]},

  // ── More Allergy / Cold ───────────────────────────────────────────────────
  { id: 123, brand: "Alex Cough Syrup", manufacturer: "Glenmark", mrp: 85, salt: "Dextromethorphan + Chlorpheniramine + Phenylephrine", category: "Allergies", genericAlts: [
    { name: "Cough Syrup (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Corex DX", manufacturer: "Pfizer", price: 55 },
  ]},
  { id: 124, brand: "Benadryl Cough Syrup", manufacturer: "J&J", mrp: 90, salt: "Diphenhydramine + Ammonium Chloride + Menthol", category: "Allergies", genericAlts: [
    { name: "Cough Syrup (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Ascoril D", manufacturer: "Glenmark", price: 65 },
  ]},
  { id: 125, brand: "Otrivin Nasal Drops", manufacturer: "GSK", mrp: 80, salt: "Xylometazoline 0.1% Nasal Drops", category: "Allergies", genericAlts: [
    { name: "Xylometazoline Drops (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Nasivion 0.05%", manufacturer: "Merck", price: 50 },
  ]},

  // ── More Mental Health ────────────────────────────────────────────────────
  { id: 126, brand: "Amitriptyline 25", manufacturer: "Various", mrp: 20, salt: "Amitriptyline 25mg", category: "Mental Health", genericAlts: [
    { name: "Amitriptyline 25mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Tryptomer 25", manufacturer: "Merck", price: 12 },
  ]},
  { id: 127, brand: "Venlafaxine 75 XR", manufacturer: "Various", mrp: 120, salt: "Venlafaxine 75mg XR", category: "Mental Health", genericAlts: [
    { name: "Venlafaxine 75mg XR (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Veniz XR 75", manufacturer: "Sun Pharma", price: 65 },
    { name: "Venlor XR 75", manufacturer: "Cipla", price: 70 },
  ]},
  { id: 128, brand: "Mirtazapine 7.5", manufacturer: "Various", mrp: 65, salt: "Mirtazapine 7.5mg", category: "Mental Health", genericAlts: [
    { name: "Mirtazapine 7.5mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Mirtaz 7.5", manufacturer: "Sun Pharma", price: 35 },
  ]},
  { id: 129, brand: "Lithium Carbonate 300", manufacturer: "Various", mrp: 25, salt: "Lithium Carbonate 300mg", category: "Mental Health", genericAlts: [
    { name: "Lithium 300mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Licab 300", manufacturer: "Sun Pharma", price: 15 },
  ]},

  // ── Anti-epileptic ────────────────────────────────────────────────────────
  { id: 130, brand: "Eptoin 100", manufacturer: "Abbott", mrp: 20, salt: "Phenytoin Sodium 100mg", category: "Mental Health", genericAlts: [
    { name: "Phenytoin 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Dilantin 100", manufacturer: "Pfizer", price: 12 },
  ]},
  { id: 131, brand: "Oxetol 300", manufacturer: "Sun Pharma", mrp: 130, salt: "Oxcarbazepine 300mg", category: "Mental Health", genericAlts: [
    { name: "Oxcarbazepine 300mg (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Trioptal 300", manufacturer: "Novartis", price: 80 },
  ]},
  { id: 132, brand: "Levera 500", manufacturer: "Sun Pharma", mrp: 110, salt: "Levetiracetam 500mg", category: "Mental Health", genericAlts: [
    { name: "Levetiracetam 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Levepsy 500", manufacturer: "Lupin", price: 60 },
    { name: "Keppra 500", manufacturer: "UCB", price: 95 },
  ]},

  // ── Gout ──────────────────────────────────────────────────────────────────
  { id: 133, brand: "Febustat 40", manufacturer: "Sun Pharma", mrp: 165, salt: "Febuxostat 40mg", category: "Pain/Fever", genericAlts: [
    { name: "Febuxostat 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Zurig 40", manufacturer: "Zydus", price: 85 },
    { name: "Fabulas 40", manufacturer: "Lupin", price: 80 },
  ]},
  { id: 134, brand: "Allopurinol 100", manufacturer: "Various", mrp: 25, salt: "Allopurinol 100mg", category: "Pain/Fever", genericAlts: [
    { name: "Allopurinol 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Zyloric 100", manufacturer: "GSK", price: 15 },
  ]},
  { id: 135, brand: "Colchicine 0.5", manufacturer: "Various", mrp: 30, salt: "Colchicine 0.5mg", category: "Pain/Fever", genericAlts: [
    { name: "Colchicine 0.5mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Goutnil 0.5", manufacturer: "Micro Labs", price: 15 },
  ]},

  // ── Hormone / Reproductive ────────────────────────────────────────────────
  { id: 136, brand: "Duphaston 10", manufacturer: "Abbott", mrp: 550, salt: "Dydrogesterone 10mg", category: "Hormones", genericAlts: [
    { name: "Dydrogesterone 10mg (Generic)", manufacturer: "Torrent", price: 120 },
    { name: "Duvadilan", manufacturer: "Solvay", price: 280 },
  ]},
  { id: 137, brand: "Susten 200", manufacturer: "Sun Pharma", mrp: 380, salt: "Progesterone (Micronized) 200mg", category: "Hormones", genericAlts: [
    { name: "Progesterone 200mg (Generic)", manufacturer: "Jan Aushadhi", price: 55 },
    { name: "Gestofit 200", manufacturer: "Sun Pharma", price: 220 },
  ]},

  // ── Anti-Malarial ─────────────────────────────────────────────────────────
  { id: 138, brand: "Lariago 250", manufacturer: "Ipca", mrp: 25, salt: "Chloroquine 250mg", category: "Antibiotics", genericAlts: [
    { name: "Chloroquine 250mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
  ]},
  { id: 139, brand: "Hydroxychloroquine 200", manufacturer: "Various", mrp: 45, salt: "Hydroxychloroquine 200mg", category: "Pain/Fever", genericAlts: [
    { name: "HCQS 200mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "HCQS 200", manufacturer: "Ipca", price: 28 },
  ]},

  // ── More common / misc ───────────────────────────────────────────────────
  { id: 140, brand: "Betadine Ointment", manufacturer: "Win-Medicare", mrp: 55, salt: "Povidone Iodine 5% Ointment", category: "Skin", genericAlts: [
    { name: "Povidone Iodine 5% (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Wokadine Ointment", manufacturer: "Wockhardt", price: 30 },
  ]},
  { id: 141, brand: "Burnol Cream", manufacturer: "Dr. Morepen", mrp: 40, salt: "Aminacrine HCl + Cetrimide Cream", category: "Skin", genericAlts: [
    { name: "Antiseptic Cream (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
  ]},
  { id: 142, brand: "Mupirocin Ointment", manufacturer: "Various", mrp: 120, salt: "Mupirocin 2% Ointment", category: "Skin", genericAlts: [
    { name: "Mupirocin 2% (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "T-Bact Ointment", manufacturer: "GSK", price: 70 },
  ]},
  { id: 143, brand: "Silver Sulfadiazine Cream", manufacturer: "Various", mrp: 85, salt: "Silver Sulfadiazine 1% Cream", category: "Skin", genericAlts: [
    { name: "Silver Sulfadiazine 1% (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Silverex Cream", manufacturer: "Mankind", price: 45 },
  ]},

  // ── Diabetes (extra) ──────────────────────────────────────────────────────
  { id: 144, brand: "Forxiga 10", manufacturer: "AstraZeneca", mrp: 580, salt: "Dapagliflozin 10mg", category: "Diabetes", genericAlts: [
    { name: "Dapagliflozin 10mg (Generic)", manufacturer: "Zydus", price: 120 },
    { name: "Dapavel 10", manufacturer: "Intas", price: 180 },
  ]},
  { id: 145, brand: "Jardiance 10", manufacturer: "Boehringer", mrp: 620, salt: "Empagliflozin 10mg", category: "Diabetes", genericAlts: [
    { name: "Empagliflozin 10mg (Generic)", manufacturer: "USV", price: 130 },
    { name: "Gibtulio 10", manufacturer: "Sun Pharma", price: 200 },
  ]},

  // ── Blood Thinner ─────────────────────────────────────────────────────────
  { id: 146, brand: "Xarelto 10", manufacturer: "Bayer", mrp: 450, salt: "Rivaroxaban 10mg", category: "BP/Heart", genericAlts: [
    { name: "Rivaroxaban 10mg (Generic)", manufacturer: "Dr. Reddy's", price: 120 },
    { name: "Xeralto 10", manufacturer: "Cadila", price: 180 },
  ]},
  { id: 147, brand: "Eliquis 5", manufacturer: "Pfizer", mrp: 420, salt: "Apixaban 5mg", category: "BP/Heart", genericAlts: [
    { name: "Apixaban 5mg (Generic)", manufacturer: "Zydus", price: 110 },
    { name: "Apigat 5", manufacturer: "Glenmark", price: 160 },
  ]},

  // ── More common OTC ───────────────────────────────────────────────────────
  { id: 148, brand: "Strepsils", manufacturer: "Reckitt", mrp: 55, salt: "Amylmetacresol 0.6mg + Dichlorobenzyl Alcohol 1.2mg", category: "Allergies", genericAlts: [
    { name: "Throat Lozenges (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Cofsils", manufacturer: "Cipla", price: 30 },
  ]},
  { id: 149, brand: "Pudin Hara", manufacturer: "Dabur", mrp: 45, salt: "Mentha Oil + Caraway Oil", category: "Stomach/Digestion", genericAlts: [
    { name: "Mint Drops (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
  ]},
  { id: 150, brand: "Hajmola", manufacturer: "Dabur", mrp: 25, salt: "Digestive Churna (Ayurvedic)", category: "Stomach/Digestion", genericAlts: [
    { name: "Digestive Churna (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
  ]},

  // ── More BP/Heart combinations ────────────────────────────────────────────
  { id: 151, brand: "Telma CT 40/6.25", manufacturer: "Glenmark", mrp: 170, salt: "Telmisartan 40mg + Chlorthalidone 6.25mg", category: "BP/Heart", genericAlts: [
    { name: "Telmisartan+Chlorthalidone (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Cresar CT", manufacturer: "Cipla", price: 85 },
  ]},
  { id: 152, brand: "Aten 50", manufacturer: "Zydus", mrp: 30, salt: "Atenolol 50mg", category: "BP/Heart", genericAlts: [
    { name: "Atenolol 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Tenormin 50", manufacturer: "AstraZeneca", price: 20 },
  ]},
  { id: 153, brand: "Nebicard 5", manufacturer: "Torrent", mrp: 120, salt: "Nebivolol 5mg", category: "BP/Heart", genericAlts: [
    { name: "Nebivolol 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Nebula 5", manufacturer: "Micro Labs", price: 60 },
  ]},
  { id: 154, brand: "Inderal 40", manufacturer: "Abbott", mrp: 25, salt: "Propranolol 40mg", category: "BP/Heart", genericAlts: [
    { name: "Propranolol 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Ciplar 40", manufacturer: "Cipla", price: 15 },
  ]},

  // ── Anti-Diarrheal / IBS ──────────────────────────────────────────────────
  { id: 155, brand: "Imodium 2mg", manufacturer: "J&J", mrp: 35, salt: "Loperamide 2mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Loperamide 2mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Lopamide 2", manufacturer: "Cipla", price: 18 },
  ]},
  { id: 156, brand: "Mebeverine 135", manufacturer: "Various", mrp: 85, salt: "Mebeverine 135mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Mebeverine 135mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Colofac 135", manufacturer: "Abbott", price: 50 },
  ]},

  // ── Anti-tubercular ───────────────────────────────────────────────────────
  { id: 157, brand: "Rifampicin 450", manufacturer: "Various", mrp: 55, salt: "Rifampicin 450mg", category: "Antibiotics", genericAlts: [
    { name: "Rifampicin 450mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "R-Cin 450", manufacturer: "Lupin", price: 30 },
  ]},
  { id: 158, brand: "Isoniazid 300", manufacturer: "Various", mrp: 15, salt: "Isoniazid 300mg", category: "Antibiotics", genericAlts: [
    { name: "Isoniazid 300mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
  ]},

  // ── More Diabetes ─────────────────────────────────────────────────────────
  { id: 159, brand: "Pioglitazone 15", manufacturer: "Various", mrp: 45, salt: "Pioglitazone 15mg", category: "Diabetes", genericAlts: [
    { name: "Pioglitazone 15mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Pioz 15", manufacturer: "USV", price: 25 },
  ]},
  { id: 160, brand: "Gliclazide 80", manufacturer: "Various", mrp: 40, salt: "Gliclazide 80mg", category: "Diabetes", genericAlts: [
    { name: "Gliclazide 80mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Glizid 80", manufacturer: "USV", price: 22 },
  ]},

  // ── More Cholesterol ──────────────────────────────────────────────────────
  { id: 161, brand: "Atorva 5", manufacturer: "Zydus", mrp: 75, salt: "Atorvastatin 5mg", category: "Cholesterol", genericAlts: [
    { name: "Atorvastatin 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Lipicure 5", manufacturer: "Intas", price: 35 },
  ]},
  { id: 162, brand: "Rosuvastatin 5", manufacturer: "Various", mrp: 110, salt: "Rosuvastatin 5mg", category: "Cholesterol", genericAlts: [
    { name: "Rosuvastatin 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Rozavel 5", manufacturer: "Sun Pharma", price: 60 },
    { name: "Rosuvas 5", manufacturer: "Ranbaxy", price: 55 },
  ]},

  // ── Migraine ──────────────────────────────────────────────────────────────
  { id: 163, brand: "Sumatriptan 50", manufacturer: "Various", mrp: 85, salt: "Sumatriptan 50mg", category: "Pain/Fever", genericAlts: [
    { name: "Sumatriptan 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Suminat 50", manufacturer: "Sun Pharma", price: 45 },
  ]},
  { id: 164, brand: "Flunarizine 10", manufacturer: "Various", mrp: 55, salt: "Flunarizine 10mg", category: "Pain/Fever", genericAlts: [
    { name: "Flunarizine 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Sibelium 10", manufacturer: "J&J", price: 30 },
  ]},

  // ── Calcium Channel + ARB combos ──────────────────────────────────────────
  { id: 165, brand: "Olmezest 20", manufacturer: "Sun Pharma", mrp: 140, salt: "Olmesartan 20mg", category: "BP/Heart", genericAlts: [
    { name: "Olmesartan 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Olsar 20", manufacturer: "Unichem", price: 65 },
  ]},
  { id: 166, brand: "Olmezest H", manufacturer: "Sun Pharma", mrp: 180, salt: "Olmesartan 20mg + HCTZ 12.5mg", category: "BP/Heart", genericAlts: [
    { name: "Olmesartan+HCTZ (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Olsar H", manufacturer: "Unichem", price: 85 },
  ]},

  // ── Erectile Dysfunction ──────────────────────────────────────────────────
  { id: 167, brand: "Viagra 50", manufacturer: "Pfizer", mrp: 400, salt: "Sildenafil 50mg", category: "Hormones", genericAlts: [
    { name: "Sildenafil 50mg (Generic)", manufacturer: "Jan Aushadhi", price: 30 },
    { name: "Manforce 50", manufacturer: "Mankind", price: 75 },
    { name: "Penegra 50", manufacturer: "Zydus", price: 80 },
  ]},
  { id: 168, brand: "Cialis 10", manufacturer: "Eli Lilly", mrp: 580, salt: "Tadalafil 10mg", category: "Hormones", genericAlts: [
    { name: "Tadalafil 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 35 },
    { name: "Megalis 10", manufacturer: "Macleods", price: 100 },
    { name: "Tadacip 10", manufacturer: "Cipla", price: 90 },
  ]},

  // ── Anti-emetic ───────────────────────────────────────────────────────────
  { id: 169, brand: "Domperidone 10", manufacturer: "Various", mrp: 25, salt: "Domperidone 10mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Domperidone 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Domstal 10", manufacturer: "Torrent", price: 14 },
  ]},
  { id: 170, brand: "Perinorm 10", manufacturer: "Ipca", mrp: 22, salt: "Metoclopramide 10mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Metoclopramide 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Reglan 10", manufacturer: "GSK", price: 12 },
  ]},

  // ── More Antibiotics ──────────────────────────────────────────────────────
  { id: 171, brand: "Amoxicillin 500", manufacturer: "Various", mrp: 60, salt: "Amoxicillin 500mg", category: "Antibiotics", genericAlts: [
    { name: "Amoxicillin 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Mox 500", manufacturer: "Ranbaxy", price: 30 },
    { name: "Novamox 500", manufacturer: "Cipla", price: 35 },
  ]},
  { id: 172, brand: "Erythromycin 250", manufacturer: "Various", mrp: 35, salt: "Erythromycin 250mg", category: "Antibiotics", genericAlts: [
    { name: "Erythromycin 250mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Althrocin 250", manufacturer: "Alembic", price: 18 },
  ]},
  { id: 173, brand: "Levofloxacin 500", manufacturer: "Various", mrp: 90, salt: "Levofloxacin 500mg", category: "Antibiotics", genericAlts: [
    { name: "Levofloxacin 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Levoflox 500", manufacturer: "Cipla", price: 50 },
    { name: "Glevo 500", manufacturer: "Glenmark", price: 45 },
  ]},
  { id: 174, brand: "Linezolid 600", manufacturer: "Various", mrp: 350, salt: "Linezolid 600mg", category: "Antibiotics", genericAlts: [
    { name: "Linezolid 600mg (Generic)", manufacturer: "Jan Aushadhi", price: 40 },
    { name: "Linospan 600", manufacturer: "Cipla", price: 180 },
  ]},
  { id: 175, brand: "Nitrofurantoin 100", manufacturer: "Various", mrp: 55, salt: "Nitrofurantoin 100mg", category: "Antibiotics", genericAlts: [
    { name: "Nitrofurantoin 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Furadantin 100", manufacturer: "Sun Pharma", price: 30 },
  ]},

  // ── Osteoporosis ──────────────────────────────────────────────────────────
  { id: 176, brand: "Alendronate 70", manufacturer: "Various", mrp: 165, salt: "Alendronate 70mg", category: "Vitamins", genericAlts: [
    { name: "Alendronate 70mg (Generic)", manufacturer: "Jan Aushadhi", price: 18 },
    { name: "Osteofos 70", manufacturer: "Cipla", price: 85 },
  ]},

  // ── Anti-fungal oral ──────────────────────────────────────────────────────
  { id: 177, brand: "Itraconazole 100", manufacturer: "Various", mrp: 120, salt: "Itraconazole 100mg", category: "Antibiotics", genericAlts: [
    { name: "Itraconazole 100mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Canditral 100", manufacturer: "Glenmark", price: 65 },
    { name: "Itaspor 100", manufacturer: "Sun Pharma", price: 70 },
  ]},
  { id: 178, brand: "Terbinafine 250", manufacturer: "Various", mrp: 100, salt: "Terbinafine 250mg", category: "Antibiotics", genericAlts: [
    { name: "Terbinafine 250mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Tyza 250", manufacturer: "Glenmark", price: 55 },
  ]},

  // ── More OTC / Misc ───────────────────────────────────────────────────────
  { id: 179, brand: "Caladryl Lotion", manufacturer: "Piramal", mrp: 65, salt: "Calamine + Diphenhydramine Lotion", category: "Skin", genericAlts: [
    { name: "Calamine Lotion (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Lacto Calamine", manufacturer: "Piramal", price: 45 },
  ]},
  { id: 180, brand: "Moov Spray", manufacturer: "Reckitt", mrp: 120, salt: "Diclofenac + Methyl Salicylate + Menthol Spray", category: "Pain/Fever", genericAlts: [
    { name: "Pain Relief Spray (Generic)", manufacturer: "Jan Aushadhi", price: 15 },
    { name: "Volini Spray", manufacturer: "Sun Pharma", price: 95 },
  ]},

  // ── Additional widely-used medicines ──────────────────────────────────────
  { id: 181, brand: "Pregabalin 75", manufacturer: "Various", mrp: 95, salt: "Pregabalin 75mg", category: "Pain/Fever", genericAlts: [
    { name: "Pregabalin 75mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Pregalin 75", manufacturer: "Torrent", price: 50 },
    { name: "Lyrica 75", manufacturer: "Pfizer", price: 85 },
  ]},
  { id: 182, brand: "Gabapentin 300", manufacturer: "Various", mrp: 75, salt: "Gabapentin 300mg", category: "Pain/Fever", genericAlts: [
    { name: "Gabapentin 300mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Gabapin 300", manufacturer: "Sun Pharma", price: 40 },
  ]},
  { id: 183, brand: "Duloxetine 20", manufacturer: "Various", mrp: 85, salt: "Duloxetine 20mg", category: "Mental Health", genericAlts: [
    { name: "Duloxetine 20mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Duzela 20", manufacturer: "Sun Pharma", price: 45 },
    { name: "Dulane 20", manufacturer: "Intas", price: 40 },
  ]},
  { id: 184, brand: "Duloxetine 30", manufacturer: "Various", mrp: 110, salt: "Duloxetine 30mg", category: "Mental Health", genericAlts: [
    { name: "Duloxetine 30mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Duzela 30", manufacturer: "Sun Pharma", price: 60 },
  ]},
  { id: 185, brand: "Candesartan 8", manufacturer: "Various", mrp: 100, salt: "Candesartan 8mg", category: "BP/Heart", genericAlts: [
    { name: "Candesartan 8mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Candesar 8", manufacturer: "Ranbaxy", price: 50 },
  ]},
  { id: 186, brand: "Valsartan 80", manufacturer: "Various", mrp: 95, salt: "Valsartan 80mg", category: "BP/Heart", genericAlts: [
    { name: "Valsartan 80mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Valent 80", manufacturer: "Torrent", price: 50 },
    { name: "Diovan 80", manufacturer: "Novartis", price: 85 },
  ]},
  { id: 187, brand: "Warfarin 5", manufacturer: "Various", mrp: 20, salt: "Warfarin 5mg", category: "BP/Heart", genericAlts: [
    { name: "Warfarin 5mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Warf 5", manufacturer: "Cipla", price: 12 },
  ]},
  { id: 188, brand: "Clavulanic Acid combo", manufacturer: "Various", mrp: 180, salt: "Amoxicillin 875mg + Clavulanic Acid 125mg", category: "Antibiotics", genericAlts: [
    { name: "Amox+Clav 1g (Generic)", manufacturer: "Jan Aushadhi", price: 25 },
    { name: "Augmentin 1g", manufacturer: "GSK", price: 160 },
  ]},
  { id: 189, brand: "Prednisolone 10", manufacturer: "Various", mrp: 20, salt: "Prednisolone 10mg", category: "Allergies", genericAlts: [
    { name: "Prednisolone 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 3 },
    { name: "Wysolone 10", manufacturer: "Pfizer", price: 12 },
  ]},
  { id: 190, brand: "Deflazacort 6", manufacturer: "Various", mrp: 80, salt: "Deflazacort 6mg", category: "Allergies", genericAlts: [
    { name: "Deflazacort 6mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Defcort 6", manufacturer: "Macleods", price: 40 },
    { name: "Monocort 6", manufacturer: "Mankind", price: 35 },
  ]},

  // ── More Stomach ──────────────────────────────────────────────────────────
  { id: 191, brand: "Esomeprazole 40", manufacturer: "Various", mrp: 90, salt: "Esomeprazole 40mg", category: "Stomach/Digestion", genericAlts: [
    { name: "Esomeprazole 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Nexpro 40", manufacturer: "Torrent", price: 55 },
    { name: "Sompraz 40", manufacturer: "Sun Pharma", price: 50 },
  ]},
  { id: 192, brand: "Sucralfate Syrup", manufacturer: "Various", mrp: 75, salt: "Sucralfate 1g/10ml Syrup", category: "Stomach/Digestion", genericAlts: [
    { name: "Sucralfate Syrup (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Sucrafil O", manufacturer: "Torrent", price: 40 },
  ]},

  // ── Eye Drops ─────────────────────────────────────────────────────────────
  { id: 193, brand: "Tobramycin Eye Drops", manufacturer: "Various", mrp: 60, salt: "Tobramycin 0.3% Eye Drops", category: "Eye/Ear", genericAlts: [
    { name: "Tobramycin 0.3% (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Toba Eye Drops", manufacturer: "Sun Pharma", price: 35 },
  ]},
  { id: 194, brand: "Ciprofloxacin Eye Drops", manufacturer: "Various", mrp: 40, salt: "Ciprofloxacin 0.3% Eye Drops", category: "Eye/Ear", genericAlts: [
    { name: "Ciprofloxacin Eye Drops (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Ciplox Eye Drops", manufacturer: "Cipla", price: 22 },
  ]},

  // ── Arthritis ─────────────────────────────────────────────────────────────
  { id: 195, brand: "Methotrexate 7.5", manufacturer: "Various", mrp: 45, salt: "Methotrexate 7.5mg", category: "Pain/Fever", genericAlts: [
    { name: "Methotrexate 7.5mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Folitrax 7.5", manufacturer: "Ipca", price: 25 },
  ]},
  { id: 196, brand: "Sulfasalazine 500", manufacturer: "Various", mrp: 55, salt: "Sulfasalazine 500mg", category: "Pain/Fever", genericAlts: [
    { name: "Sulfasalazine 500mg (Generic)", manufacturer: "Jan Aushadhi", price: 6 },
    { name: "Salazar 500", manufacturer: "Wallace", price: 30 },
  ]},

  // ── Misc needed ───────────────────────────────────────────────────────────
  { id: 197, brand: "Pantoprazole 40 + Domperidone 10 (Pan D Cap)", manufacturer: "Alkem", mrp: 98, salt: "Pantoprazole 40mg + Domperidone 10mg SR", category: "Stomach/Digestion", genericAlts: [
    { name: "Panto+Dom (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "P2 D Cap", manufacturer: "Cadila", price: 55 },
  ]},
  { id: 198, brand: "Ivermectin 12", manufacturer: "Various", mrp: 35, salt: "Ivermectin 12mg", category: "Antibiotics", genericAlts: [
    { name: "Ivermectin 12mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Ivecop 12", manufacturer: "Menarini", price: 18 },
  ]},
  { id: 199, brand: "Cetaphil Cleanser", manufacturer: "Galderma", mrp: 350, salt: "Gentle Skin Cleanser (Cetyl Alcohol, SLS-free)", category: "Skin", genericAlts: [
    { name: "Gentle Cleanser (Generic)", manufacturer: "Jan Aushadhi", price: 45 },
    { name: "Physiogel Cleanser", manufacturer: "GSK", price: 250 },
  ]},
  { id: 200, brand: "Ketoconazole Shampoo", manufacturer: "Various", mrp: 180, salt: "Ketoconazole 2% Shampoo", category: "Skin", genericAlts: [
    { name: "Ketoconazole 2% (Generic)", manufacturer: "Jan Aushadhi", price: 20 },
    { name: "Nizral Shampoo", manufacturer: "J&J", price: 110 },
    { name: "Scalpe Pro", manufacturer: "Glenmark", price: 95 },
  ]},
  { id: 201, brand: "Spironolactone 25", manufacturer: "Various", mrp: 35, salt: "Spironolactone 25mg", category: "BP/Heart", genericAlts: [
    { name: "Spironolactone 25mg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Aldactone 25", manufacturer: "RPG", price: 20 },
  ]},
  { id: 202, brand: "Furosemide 40", manufacturer: "Various", mrp: 15, salt: "Furosemide 40mg", category: "BP/Heart", genericAlts: [
    { name: "Furosemide 40mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Lasix 40", manufacturer: "Sanofi", price: 10 },
  ]},
  { id: 203, brand: "Hydrochlorothiazide 25", manufacturer: "Various", mrp: 15, salt: "Hydrochlorothiazide 25mg", category: "BP/Heart", genericAlts: [
    { name: "HCTZ 25mg (Generic)", manufacturer: "Jan Aushadhi", price: 2 },
    { name: "Aquazide 25", manufacturer: "Sun Pharma", price: 8 },
  ]},
  { id: 204, brand: "Torsemide 10", manufacturer: "Various", mrp: 45, salt: "Torsemide 10mg", category: "BP/Heart", genericAlts: [
    { name: "Torsemide 10mg (Generic)", manufacturer: "Jan Aushadhi", price: 5 },
    { name: "Dytor 10", manufacturer: "Cipla", price: 25 },
  ]},
  { id: 205, brand: "Doxofylline 400", manufacturer: "Various", mrp: 90, salt: "Doxofylline 400mg", category: "Respiratory", genericAlts: [
    { name: "Doxofylline 400mg (Generic)", manufacturer: "Jan Aushadhi", price: 10 },
    { name: "Doxolin 400", manufacturer: "Zydus", price: 50 },
  ]},
  { id: 206, brand: "Montelukast 4 (Chewable)", manufacturer: "Various", mrp: 85, salt: "Montelukast 4mg (Paediatric)", category: "Allergies", genericAlts: [
    { name: "Montelukast 4mg (Generic)", manufacturer: "Jan Aushadhi", price: 8 },
    { name: "Montair 4", manufacturer: "Cipla", price: 40 },
  ]},
  { id: 207, brand: "Budesonide Inhaler 200", manufacturer: "Various", mrp: 280, salt: "Budesonide 200mcg Inhaler", category: "Respiratory", genericAlts: [
    { name: "Budesonide 200mcg (Generic)", manufacturer: "Jan Aushadhi", price: 35 },
    { name: "Budecort 200", manufacturer: "Sun Pharma", price: 160 },
    { name: "Pulmicort 200", manufacturer: "AstraZeneca", price: 240 },
  ]},
  { id: 208, brand: "Ipratropium Inhaler", manufacturer: "Various", mrp: 95, salt: "Ipratropium Bromide 20mcg/dose", category: "Respiratory", genericAlts: [
    { name: "Ipratropium Inhaler (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Ipravent Inhaler", manufacturer: "Cipla", price: 60 },
  ]},
  { id: 209, brand: "Misoprostol 200", manufacturer: "Various", mrp: 35, salt: "Misoprostol 200mcg", category: "Stomach/Digestion", genericAlts: [
    { name: "Misoprostol 200mcg (Generic)", manufacturer: "Jan Aushadhi", price: 4 },
    { name: "Misoprost 200", manufacturer: "Cipla", price: 18 },
  ]},
  { id: 210, brand: "Ursodeoxycholic Acid 300", manufacturer: "Various", mrp: 120, salt: "Ursodeoxycholic Acid 300mg", category: "Stomach/Digestion", genericAlts: [
    { name: "UDCA 300mg (Generic)", manufacturer: "Jan Aushadhi", price: 12 },
    { name: "Udiliv 300", manufacturer: "Abbott", price: 70 },
    { name: "Ursocol 300", manufacturer: "Sun Pharma", price: 65 },
  ]},
];

// ─── Fuzzy Search ────────────────────────────────────────────────────────────

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function fuzzyScore(query, target) {
  const q = normalize(query);
  const t = normalize(target);
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 80;

  // Levenshtein-like partial match
  let matched = 0;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) { matched++; qi++; }
  }
  const score = (matched / q.length) * 70;
  return score;
}

function searchByBrand(query) {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim();
  const scored = medicines.map(med => {
    const brandScore = fuzzyScore(q, med.brand);
    const saltScore = fuzzyScore(q, med.salt) * 0.7;
    const score = Math.max(brandScore, saltScore);
    return { ...med, score };
  });
  return scored
    .filter(m => m.score > 30)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(formatResult);
}

function searchBySalt(saltQuery) {
  if (!saltQuery || saltQuery.trim().length === 0) return [];
  const q = saltQuery.trim();
  const scored = medicines.map(med => {
    const score = fuzzyScore(q, med.salt);
    return { ...med, score };
  });
  return scored
    .filter(m => m.score > 35)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(formatResult);
}

function formatResult(med) {
  const cheapest = med.genericAlts.reduce((min, alt) => alt.price < min.price ? alt : min, med.genericAlts[0]);
  const savings = med.mrp - cheapest.price;
  const savingsPercent = Math.round((savings / med.mrp) * 100);
  const monthlySavings = savings; // per strip/unit
  const yearlySavings = monthlySavings * 12;

  return {
    id: med.id,
    brand: med.brand,
    manufacturer: med.manufacturer,
    mrp: med.mrp,
    salt: med.salt,
    category: med.category,
    genericAlternatives: med.genericAlts.map(alt => ({
      name: alt.name,
      manufacturer: alt.manufacturer,
      price: alt.price,
      savings: med.mrp - alt.price,
      savingsPercent: Math.round(((med.mrp - alt.price) / med.mrp) * 100),
    })),
    bestSavings: {
      amount: savings,
      percent: savingsPercent,
      monthly: monthlySavings,
      yearly: yearlySavings,
      cheapestOption: cheapest.name,
    },
  };
}

// ─── Get all categories ──────────────────────────────────────────────────────
function getCategories() {
  const cats = {};
  medicines.forEach(m => {
    if (!cats[m.category]) cats[m.category] = 0;
    cats[m.category]++;
  });
  return cats;
}

// ─── Route handlers ──────────────────────────────────────────────────────────

function handleSearch(req, res) {
  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'Please provide a medicine name' });
  const results = searchByBrand(query);
  res.json({ results, count: results.length });
}

function handleBySalt(req, res) {
  const { salt } = req.body || {};
  if (!salt) return res.status(400).json({ error: 'Please provide a salt/composition' });
  const results = searchBySalt(salt);
  res.json({ results, count: results.length });
}

function handleCategories(req, res) {
  res.json({ categories: getCategories() });
}

module.exports = {
  handleSearch,
  handleBySalt,
  handleCategories,
  searchByBrand,
  searchBySalt,
  medicines,
};
