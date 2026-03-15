/**
 * ThaaliScore — Indian Food Nutrition Scanner
 * Backend logic with 300+ Indian dishes
 */

// Nutrition per standard serving: { cal, protein, carbs, fat, fiber, vitamins[], healthScore (1-10) }
// healthScore: 10=superfood, 7-9=healthy, 4-6=moderate, 1-3=indulgent

const dishes = [
  // ── North Indian Mains ────────────────────────────────────────────────
  { id:1, name:"Dal Makhani", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:260, protein:9, carbs:28, fat:13, fiber:4, vitamins:["Iron","Folate","B6"], healthScore:6, swap:"Use less butter/cream → Save 80 cal" },
  { id:2, name:"Rajma Curry", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:11, carbs:32, fat:5, fiber:7, vitamins:["Iron","Folate","Potassium"], healthScore:8, swap:"Already healthy! Add brown rice instead of white" },
  { id:3, name:"Chole (Chana Masala)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:240, protein:10, carbs:35, fat:6, fiber:8, vitamins:["Iron","Folate","Manganese"], healthScore:8, swap:"Skip the bhatura, pair with roti instead" },
  { id:4, name:"Paneer Butter Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:370, protein:14, carbs:18, fat:28, fiber:2, vitamins:["Calcium","B12","Phosphorus"], healthScore:4, swap:"Replace with palak paneer → Save 150 cal, gain iron" },
  { id:5, name:"Palak Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:12, carbs:10, fat:15, fiber:3, vitamins:["Iron","Calcium","Vitamin A","Vitamin K"], healthScore:7, swap:"Use tofu instead of paneer → Save 60 cal, less fat" },
  { id:6, name:"Aloo Gobi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:4, carbs:22, fat:8, fiber:4, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:7, swap:"Add paneer/tofu for protein boost" },
  { id:7, name:"Shahi Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:390, protein:15, carbs:16, fat:30, fiber:2, vitamins:["Calcium","B12","Phosphorus"], healthScore:3, swap:"Replace with palak paneer → Save 170 cal" },
  { id:8, name:"Matar Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:280, protein:13, carbs:18, fat:18, fiber:4, vitamins:["Calcium","Vitamin C","Iron"], healthScore:6, swap:"Use cottage cheese → Save 50 cal" },
  { id:9, name:"Aloo Matar", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:190, protein:5, carbs:28, fat:6, fiber:4, vitamins:["Vitamin C","Potassium","B6"], healthScore:6, swap:"Add sprouted moong for protein" },
  { id:10, name:"Baingan Bharta", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:3, carbs:14, fat:10, fiber:5, vitamins:["Fiber","Potassium","Manganese"], healthScore:8, swap:"Already healthy! Great low-cal choice" },
  { id:11, name:"Sarson Ka Saag", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:12, fat:12, fiber:4, vitamins:["Vitamin A","Vitamin K","Iron","Calcium"], healthScore:8, swap:"Use less ghee → Save 60 cal" },
  { id:12, name:"Kadhi Pakora", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:210, protein:6, carbs:18, fat:12, fiber:2, vitamins:["Calcium","B12","Probiotics"], healthScore:5, swap:"Skip pakoras, have plain kadhi → Save 80 cal" },
  { id:13, name:"Dal Tadka", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:24, fat:5, fiber:5, vitamins:["Iron","Folate","B6"], healthScore:8, swap:"Already nutritious! Great protein source" },
  { id:14, name:"Mixed Veg Curry", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:4, carbs:20, fat:7, fiber:5, vitamins:["Vitamin A","Vitamin C","Potassium"], healthScore:8, swap:"Add paneer/tofu for extra protein" },
  { id:15, name:"Malai Kofta", category:"North Indian", veg:true, serving:"2 pcs + gravy", cal:420, protein:10, carbs:28, fat:30, fiber:2, vitamins:["Calcium","B12"], healthScore:3, swap:"Have paneer bhurji instead → Save 200 cal" },
  { id:16, name:"Dum Aloo", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:250, protein:5, carbs:30, fat:12, fiber:3, vitamins:["Vitamin C","Potassium","B6"], healthScore:5, swap:"Use sweet potato → gain fiber and Vitamin A" },
  { id:17, name:"Chana Dal", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:28, fat:3, fiber:6, vitamins:["Iron","Folate","Zinc"], healthScore:9, swap:"Already excellent! High protein, low fat" },
  { id:18, name:"Bhindi Masala", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:130, protein:3, carbs:12, fat:8, fiber:4, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:7, swap:"Stir-fry instead of deep fry → Save 40 cal" },
  { id:19, name:"Lauki Ki Sabzi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:90, protein:2, carbs:12, fat:4, fiber:3, vitamins:["Vitamin C","Calcium","Zinc"], healthScore:9, swap:"Already very low-cal and healthy!" },
  { id:20, name:"Tinda Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:100, protein:2, carbs:14, fat:4, fiber:3, vitamins:["Vitamin C","Calcium"], healthScore:8, swap:"Great low-cal vegetable dish" },

  // ── Non-Veg Mains ─────────────────────────────────────────────────────
  { id:21, name:"Butter Chicken", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:390, protein:28, carbs:14, fat:24, fiber:1, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:5, swap:"Have tandoori chicken → Save 180 cal" },
  { id:22, name:"Chicken Tikka", category:"Non-Veg", veg:false, serving:"6 pcs (180g)", cal:250, protein:32, carbs:6, fat:11, fiber:1, vitamins:["B12","Iron","Zinc","B6"], healthScore:8, swap:"Already a great high-protein choice!" },
  { id:23, name:"Tandoori Chicken", category:"Non-Veg", veg:false, serving:"2 pcs (200g)", cal:220, protein:30, carbs:4, fat:9, fiber:0, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:8, swap:"Remove skin → Save 50 cal" },
  { id:24, name:"Fish Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:230, protein:22, carbs:10, fat:12, fiber:1, vitamins:["Omega-3","B12","Vitamin D","Selenium"], healthScore:8, swap:"Use less oil in gravy → Save 40 cal" },
  { id:25, name:"Egg Curry", category:"Non-Veg", veg:false, serving:"2 eggs + gravy", cal:280, protein:16, carbs:12, fat:18, fiber:1, vitamins:["B12","Vitamin D","Selenium","Choline"], healthScore:7, swap:"Use 1 whole + 1 white → Save 50 cal" },
  { id:26, name:"Mutton Curry (Rogan Josh)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:350, protein:26, carbs:8, fat:24, fiber:1, vitamins:["B12","Iron","Zinc","B6"], healthScore:5, swap:"Trim visible fat → Save 80 cal" },
  { id:27, name:"Keema (Mutton Mince)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:320, protein:24, carbs:10, fat:20, fiber:2, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Use chicken keema → Save 100 cal" },
  { id:28, name:"Chicken Biryani", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:450, protein:22, carbs:52, fat:16, fiber:2, vitamins:["B12","Iron","B6","Niacin"], healthScore:5, swap:"Have chicken pulao → Save 120 cal" },
  { id:29, name:"Mutton Biryani", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:520, protein:24, carbs:50, fat:22, fiber:2, vitamins:["B12","Iron","Zinc","B6"], healthScore:4, swap:"Have chicken biryani → Save 70 cal" },
  { id:30, name:"Prawn Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:200, protein:20, carbs:8, fat:10, fiber:1, vitamins:["Selenium","B12","Omega-3","Iodine"], healthScore:8, swap:"Already lean and nutritious!" },
  { id:31, name:"Fish Fry", category:"Non-Veg", veg:false, serving:"2 pcs (150g)", cal:280, protein:20, carbs:14, fat:16, fiber:0, vitamins:["Omega-3","B12","Selenium"], healthScore:6, swap:"Bake or grill → Save 80 cal" },
  { id:32, name:"Chicken Korma", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:380, protein:24, carbs:16, fat:26, fiber:1, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Have chicken tikka masala (dry) → Save 130 cal" },
  { id:33, name:"Tandoori Fish", category:"Non-Veg", veg:false, serving:"1 fillet (180g)", cal:190, protein:26, carbs:4, fat:8, fiber:0, vitamins:["Omega-3","B12","Vitamin D","Selenium"], healthScore:9, swap:"Already one of the healthiest options!" },

  // ── South Indian ──────────────────────────────────────────────────────
  { id:34, name:"Plain Dosa", category:"South Indian", veg:true, serving:"1 dosa (120g)", cal:170, protein:4, carbs:28, fat:5, fiber:1, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Have ragi dosa → gain calcium and fiber" },
  { id:35, name:"Masala Dosa", category:"South Indian", veg:true, serving:"1 dosa + filling", cal:280, protein:6, carbs:40, fat:10, fiber:3, vitamins:["Iron","Vitamin C","Potassium"], healthScore:6, swap:"Have plain dosa + sambar → Save 60 cal, gain protein" },
  { id:36, name:"Idli", category:"South Indian", veg:true, serving:"3 pcs (180g)", cal:180, protein:5, carbs:36, fat:1, fiber:2, vitamins:["Iron","B vitamins","Probiotics"], healthScore:8, swap:"Have ragi idli → gain calcium" },
  { id:37, name:"Medu Vada", category:"South Indian", veg:true, serving:"2 pcs (100g)", cal:260, protein:8, carbs:22, fat:16, fiber:3, vitamins:["Iron","Protein","B6"], healthScore:4, swap:"Have idli instead → Save 80 cal, less oil" },
  { id:38, name:"Sambar", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:120, protein:6, carbs:18, fat:3, fiber:4, vitamins:["Iron","Folate","Vitamin C","Potassium"], healthScore:9, swap:"Already excellent! Rich in nutrients" },
  { id:39, name:"Rasam", category:"South Indian", veg:true, serving:"1 bowl (200ml)", cal:60, protein:2, carbs:10, fat:1, fiber:1, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:9, swap:"Already very low-cal and healing" },
  { id:40, name:"Upma", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:210, protein:5, carbs:30, fat:8, fiber:3, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Use oats upma → gain fiber, save 30 cal" },
  { id:41, name:"Pongal (Ven)", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:240, protein:6, carbs:34, fat:8, fiber:2, vitamins:["Iron","B vitamins","Potassium"], healthScore:6, swap:"Use less ghee → Save 50 cal" },
  { id:42, name:"Uttapam", category:"South Indian", veg:true, serving:"1 pc (150g)", cal:200, protein:5, carbs:30, fat:6, fiber:3, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:7, swap:"Add more veggies for fiber" },
  { id:43, name:"Appam", category:"South Indian", veg:true, serving:"2 pcs (120g)", cal:160, protein:3, carbs:28, fat:4, fiber:1, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Pair with egg curry for protein" },
  { id:44, name:"Puttu", category:"South Indian", veg:true, serving:"1 cylinder (150g)", cal:220, protein:4, carbs:38, fat:6, fiber:3, vitamins:["Iron","B vitamins","Fiber"], healthScore:6, swap:"Use ragi puttu → gain calcium" },
  { id:45, name:"Avial", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:4, carbs:16, fat:9, fiber:5, vitamins:["Vitamin A","Vitamin C","Potassium","Fiber"], healthScore:8, swap:"Already very nutritious!" },
  { id:46, name:"Thoran (Cabbage)", category:"South Indian", veg:true, serving:"1 bowl (150g)", cal:110, protein:3, carbs:10, fat:7, fiber:4, vitamins:["Vitamin C","Vitamin K","Fiber"], healthScore:8, swap:"Great low-cal side dish" },
  { id:47, name:"Kootu", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:140, protein:6, carbs:18, fat:5, fiber:5, vitamins:["Iron","Folate","Vitamin C"], healthScore:8, swap:"Already healthy — dal + veggies combo" },
  { id:48, name:"Curd Rice", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:220, protein:6, carbs:36, fat:5, fiber:1, vitamins:["Calcium","B12","Probiotics"], healthScore:6, swap:"Use brown rice → gain 3g fiber" },
  { id:49, name:"Lemon Rice", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:260, protein:4, carbs:42, fat:8, fiber:1, vitamins:["Vitamin C","B vitamins"], healthScore:5, swap:"Use brown rice → gain fiber" },
  { id:50, name:"Tamarind Rice", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:280, protein:4, carbs:44, fat:9, fiber:2, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Use brown rice and reduce oil" },
  { id:51, name:"Coconut Chutney", category:"South Indian", veg:true, serving:"2 tbsp (30g)", cal:50, protein:1, carbs:3, fat:4, fiber:1, vitamins:["Iron","Manganese"], healthScore:6, swap:"Use less coconut, add mint" },
  { id:52, name:"Tomato Chutney", category:"South Indian", veg:true, serving:"2 tbsp (30g)", cal:35, protein:1, carbs:5, fat:1, fiber:1, vitamins:["Vitamin C","Lycopene"], healthScore:7, swap:"Already low-cal" },
  { id:53, name:"Ragi Dosa", category:"South Indian", veg:true, serving:"1 dosa (120g)", cal:150, protein:4, carbs:26, fat:3, fiber:3, vitamins:["Calcium","Iron","Fiber"], healthScore:8, swap:"Great millet-based alternative!" },
  { id:54, name:"Pesarattu", category:"South Indian", veg:true, serving:"1 pc (150g)", cal:180, protein:8, carbs:24, fat:5, fiber:4, vitamins:["Iron","Folate","Protein"], healthScore:8, swap:"High-protein dosa alternative" },

  // ── Breakfast ──────────────────────────────────────────────────────────
  { id:55, name:"Poha", category:"Breakfast", veg:true, serving:"1 plate (200g)", cal:220, protein:4, carbs:36, fat:7, fiber:2, vitamins:["Iron","B vitamins","Vitamin C"], healthScore:7, swap:"Add peanuts & veggies for nutrition" },
  { id:56, name:"Aloo Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:280, protein:6, carbs:36, fat:12, fiber:2, vitamins:["Vitamin C","B6","Potassium"], healthScore:5, swap:"Have gobhi/methi paratha → Save 40 cal, gain nutrients" },
  { id:57, name:"Paneer Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:310, protein:10, carbs:32, fat:16, fiber:2, vitamins:["Calcium","B12","Phosphorus"], healthScore:5, swap:"Use low-fat paneer → Save 60 cal" },
  { id:58, name:"Methi Paratha", category:"Breakfast", veg:true, serving:"1 pc (100g)", cal:230, protein:5, carbs:30, fat:10, fiber:3, vitamins:["Iron","Vitamin K","Folate"], healthScore:7, swap:"Already nutritious with methi benefits" },
  { id:59, name:"Omelette (2 eggs)", category:"Breakfast", veg:false, serving:"1 omelette", cal:190, protein:14, carbs:2, fat:14, fiber:0, vitamins:["B12","Vitamin D","Selenium","Choline"], healthScore:7, swap:"Use 1 whole + 2 whites → Save 50 cal" },
  { id:60, name:"Bread Butter (2 slices)", category:"Breakfast", veg:true, serving:"2 slices", cal:220, protein:4, carbs:28, fat:10, fiber:1, vitamins:["B vitamins"], healthScore:4, swap:"Use multigrain bread → gain fiber" },
  { id:61, name:"Cornflakes with Milk", category:"Breakfast", veg:true, serving:"1 bowl (250ml)", cal:240, protein:7, carbs:42, fat:4, fiber:1, vitamins:["Iron","B vitamins","Calcium"], healthScore:5, swap:"Use oats or muesli → gain fiber, less sugar" },
  { id:62, name:"Oats Porridge", category:"Breakfast", veg:true, serving:"1 bowl (200g)", cal:160, protein:6, carbs:28, fat:3, fiber:4, vitamins:["Iron","Manganese","Phosphorus","Fiber"], healthScore:9, swap:"Already one of the healthiest breakfasts!" },
  { id:63, name:"Besan Chilla", category:"Breakfast", veg:true, serving:"2 pcs (150g)", cal:200, protein:10, carbs:22, fat:8, fiber:4, vitamins:["Iron","Folate","Protein"], healthScore:8, swap:"Already high-protein, low-cal" },
  { id:64, name:"Moong Dal Chilla", category:"Breakfast", veg:true, serving:"2 pcs (150g)", cal:180, protein:12, carbs:20, fat:5, fiber:4, vitamins:["Iron","Folate","Protein","B6"], healthScore:9, swap:"Excellent protein-rich breakfast!" },
  { id:65, name:"Sabudana Khichdi", category:"Breakfast", veg:true, serving:"1 plate (200g)", cal:300, protein:4, carbs:50, fat:10, fiber:1, vitamins:["Potassium","Calcium"], healthScore:4, swap:"Have oats khichdi → Save 100 cal, gain fiber" },
  { id:66, name:"Rava Idli", category:"Breakfast", veg:true, serving:"3 pcs (180g)", cal:190, protein:5, carbs:32, fat:4, fiber:2, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Add vegetables to batter" },
  { id:67, name:"Dhokla", category:"Breakfast", veg:true, serving:"4 pcs (150g)", cal:160, protein:6, carbs:24, fat:4, fiber:2, vitamins:["Iron","Probiotics","B vitamins"], healthScore:8, swap:"Already steamed and healthy!" },
  { id:68, name:"Thepla", category:"Breakfast", veg:true, serving:"2 pcs (100g)", cal:220, protein:5, carbs:28, fat:10, fiber:3, vitamins:["Iron","Folate","Vitamin K"], healthScore:7, swap:"Great travel-friendly healthy option" },
  { id:69, name:"Misal Pav", category:"Breakfast", veg:true, serving:"1 plate (250g)", cal:350, protein:12, carbs:42, fat:14, fiber:6, vitamins:["Iron","Protein","B vitamins"], healthScore:6, swap:"Skip pav, have with brown rice → Save 100 cal" },
  { id:70, name:"Boiled Eggs (2)", category:"Breakfast", veg:false, serving:"2 eggs", cal:150, protein:12, carbs:1, fat:10, fiber:0, vitamins:["B12","Vitamin D","Selenium","Choline"], healthScore:8, swap:"Great portable protein source!" },

  // ── Rice / Breads ─────────────────────────────────────────────────────
  { id:71, name:"White Rice (Steamed)", category:"Rice/Breads", veg:true, serving:"1 bowl (150g cooked)", cal:180, protein:3, carbs:40, fat:0.5, fiber:0.5, vitamins:["B vitamins","Manganese"], healthScore:5, swap:"Switch to brown rice → Save 20 cal, gain 3g fiber" },
  { id:72, name:"Brown Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (150g cooked)", cal:160, protein:4, carbs:34, fat:1.5, fiber:3, vitamins:["Manganese","Selenium","Magnesium","Fiber"], healthScore:8, swap:"Already a healthier rice choice!" },
  { id:73, name:"Jeera Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (200g)", cal:220, protein:4, carbs:38, fat:6, fiber:1, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Use brown rice + jeera → gain fiber" },
  { id:74, name:"Veg Pulao", category:"Rice/Breads", veg:true, serving:"1 plate (250g)", cal:280, protein:5, carbs:44, fat:8, fiber:3, vitamins:["Vitamin A","Vitamin C","B vitamins"], healthScore:6, swap:"Use brown rice → gain fiber" },
  { id:75, name:"Veg Biryani", category:"Rice/Breads", veg:true, serving:"1 plate (300g)", cal:340, protein:7, carbs:50, fat:12, fiber:3, vitamins:["Vitamin A","Iron","B vitamins"], healthScore:5, swap:"Have veg pulao → Save 60 cal" },
  { id:76, name:"Roti (Chapati)", category:"Rice/Breads", veg:true, serving:"1 pc (30g dry)", cal:80, protein:3, carbs:16, fat:1, fiber:2, vitamins:["Iron","B vitamins","Fiber"], healthScore:8, swap:"Already a healthy staple!" },
  { id:77, name:"Naan", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:260, protein:7, carbs:42, fat:6, fiber:2, vitamins:["B vitamins","Iron"], healthScore:4, swap:"Have tandoori roti → Save 120 cal" },
  { id:78, name:"Butter Naan", category:"Rice/Breads", veg:true, serving:"1 pc (90g)", cal:310, protein:7, carbs:44, fat:12, fiber:2, vitamins:["B vitamins"], healthScore:3, swap:"Have plain roti → Save 230 cal" },
  { id:79, name:"Plain Paratha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:220, protein:4, carbs:28, fat:10, fiber:2, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Have roti → Save 140 cal" },
  { id:80, name:"Puri", category:"Rice/Breads", veg:true, serving:"2 pcs (60g)", cal:240, protein:4, carbs:28, fat:12, fiber:1, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have roti → Save 160 cal, avoid deep frying" },
  { id:81, name:"Bhatura", category:"Rice/Breads", veg:true, serving:"1 pc (100g)", cal:310, protein:6, carbs:40, fat:14, fiber:1, vitamins:["B vitamins","Iron"], healthScore:3, swap:"Have roti/kulcha → Save 180 cal" },
  { id:82, name:"Tandoori Roti", category:"Rice/Breads", veg:true, serving:"1 pc (40g)", cal:100, protein:3, carbs:20, fat:1, fiber:2, vitamins:["Iron","B vitamins","Fiber"], healthScore:8, swap:"Already healthy — no oil used" },
  { id:83, name:"Makki Ki Roti", category:"Rice/Breads", veg:true, serving:"1 pc (60g)", cal:120, protein:3, carbs:24, fat:2, fiber:3, vitamins:["Fiber","Iron","Vitamin A"], healthScore:7, swap:"Great gluten-free option" },
  { id:84, name:"Missi Roti", category:"Rice/Breads", veg:true, serving:"1 pc (50g)", cal:110, protein:5, carbs:18, fat:2, fiber:3, vitamins:["Iron","Protein","Folate"], healthScore:8, swap:"High-protein roti — great choice!" },
  { id:85, name:"Bajra Roti", category:"Rice/Breads", veg:true, serving:"1 pc (50g)", cal:100, protein:3, carbs:20, fat:2, fiber:3, vitamins:["Iron","Magnesium","Fiber"], healthScore:8, swap:"Excellent millet choice!" },
  { id:86, name:"Kulcha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:240, protein:6, carbs:36, fat:8, fiber:2, vitamins:["B vitamins","Iron"], healthScore:4, swap:"Have tandoori roti → Save 140 cal" },

  // ── Snacks ────────────────────────────────────────────────────────────
  { id:87, name:"Samosa", category:"Snacks", veg:true, serving:"1 pc (80g)", cal:250, protein:4, carbs:28, fat:14, fiber:2, vitamins:["Potassium","Vitamin C"], healthScore:3, swap:"Have baked samosa → Save 80 cal" },
  { id:88, name:"Pakora (Mixed Veg)", category:"Snacks", veg:true, serving:"5 pcs (100g)", cal:280, protein:5, carbs:24, fat:18, fiber:2, vitamins:["Iron","Vitamin C"], healthScore:3, swap:"Air-fry pakoras → Save 100 cal" },
  { id:89, name:"Bhel Puri", category:"Snacks", veg:true, serving:"1 plate (150g)", cal:180, protein:4, carbs:30, fat:5, fiber:3, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Already a lighter snack option!" },
  { id:90, name:"Sev Puri", category:"Snacks", veg:true, serving:"6 pcs (120g)", cal:220, protein:4, carbs:28, fat:10, fiber:2, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Have bhel puri → Save 40 cal" },
  { id:91, name:"Pani Puri", category:"Snacks", veg:true, serving:"6 pcs", cal:150, protein:3, carbs:26, fat:4, fiber:2, vitamins:["Vitamin C","Iron"], healthScore:5, swap:"Use sprout filling → gain protein" },
  { id:92, name:"Vada Pav", category:"Snacks", veg:true, serving:"1 pc", cal:310, protein:6, carbs:38, fat:14, fiber:2, vitamins:["Potassium","Vitamin C"], healthScore:3, swap:"Have dabeli instead → Save 80 cal, gain nutrients" },
  { id:93, name:"Pav Bhaji", category:"Snacks", veg:true, serving:"1 plate (2 pav)", cal:420, protein:10, carbs:52, fat:18, fiber:4, vitamins:["Vitamin A","Vitamin C","Iron"], healthScore:4, swap:"Skip 1 pav, add extra bhaji → Save 120 cal" },
  { id:94, name:"Aloo Tikki Chaat", category:"Snacks", veg:true, serving:"2 pcs + chutney", cal:280, protein:5, carbs:34, fat:14, fiber:3, vitamins:["Potassium","Vitamin C"], healthScore:4, swap:"Have sprout chaat → Save 100 cal, gain protein" },
  { id:95, name:"Momos (Veg Steamed)", category:"Snacks", veg:true, serving:"6 pcs", cal:180, protein:5, carbs:28, fat:5, fiber:2, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Already steamed — avoid fried momos" },
  { id:96, name:"Momos (Chicken Steamed)", category:"Snacks", veg:false, serving:"6 pcs", cal:220, protein:12, carbs:24, fat:8, fiber:1, vitamins:["B12","Iron","B6"], healthScore:6, swap:"Good protein snack — avoid fried" },
  { id:97, name:"Momos (Fried)", category:"Snacks", veg:true, serving:"6 pcs", cal:310, protein:5, carbs:30, fat:18, fiber:2, vitamins:["Iron"], healthScore:3, swap:"Have steamed momos → Save 130 cal" },
  { id:98, name:"Maggi Noodles", category:"Snacks", veg:true, serving:"1 pack (70g)", cal:310, protein:7, carbs:42, fat:13, fiber:2, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have oats or poha → Save 100 cal, gain nutrition" },
  { id:99, name:"Dahi Puri", category:"Snacks", veg:true, serving:"6 pcs", cal:200, protein:5, carbs:28, fat:7, fiber:2, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:5, swap:"Good — has probiotics from dahi" },
  { id:100, name:"Kachori", category:"Snacks", veg:true, serving:"1 pc (80g)", cal:290, protein:5, carbs:30, fat:16, fiber:2, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have baked kachori → Save 100 cal" },
  { id:101, name:"Dabeli", category:"Snacks", veg:true, serving:"1 pc", cal:230, protein:5, carbs:32, fat:9, fiber:3, vitamins:["Potassium","Iron","Vitamin C"], healthScore:5, swap:"Lighter than vada pav" },
  { id:102, name:"Spring Roll (Fried)", category:"Snacks", veg:true, serving:"2 pcs", cal:260, protein:4, carbs:28, fat:14, fiber:2, vitamins:["Vitamin C"], healthScore:3, swap:"Bake instead of fry → Save 80 cal" },
  { id:103, name:"Bread Pakora", category:"Snacks", veg:true, serving:"2 pcs", cal:320, protein:6, carbs:32, fat:18, fiber:1, vitamins:["Iron"], healthScore:2, swap:"Have besan chilla → Save 120 cal, gain protein" },
  { id:104, name:"Sprout Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:120, protein:8, carbs:18, fat:2, fiber:5, vitamins:["Iron","Folate","Vitamin C","Protein"], healthScore:9, swap:"Already one of the healthiest snacks!" },
  { id:105, name:"Roasted Chana", category:"Snacks", veg:true, serving:"50g", cal:180, protein:9, carbs:28, fat:3, fiber:5, vitamins:["Iron","Folate","Manganese"], healthScore:8, swap:"Great healthy snack!" },
  { id:106, name:"Makhana (Fox Nuts)", category:"Snacks", veg:true, serving:"50g roasted", cal:180, protein:5, carbs:32, fat:3, fiber:2, vitamins:["Calcium","Magnesium","Potassium"], healthScore:8, swap:"Excellent low-cal snack!" },

  // ── Sweets ────────────────────────────────────────────────────────────
  { id:107, name:"Gulab Jamun", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:300, protein:4, carbs:44, fat:12, fiber:0, vitamins:["Calcium"], healthScore:2, swap:"Have 1 pc only → Save 150 cal" },
  { id:108, name:"Rasgulla", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:180, protein:4, carbs:36, fat:2, fiber:0, vitamins:["Calcium"], healthScore:4, swap:"Lower fat than gulab jamun — better choice" },
  { id:109, name:"Jalebi", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:250, protein:2, carbs:40, fat:10, fiber:0, vitamins:["Iron"], healthScore:2, swap:"Have a fruit instead → Save 200 cal" },
  { id:110, name:"Sooji Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:280, protein:3, carbs:36, fat:14, fiber:1, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Make with less sugar/ghee → Save 100 cal" },
  { id:111, name:"Moong Dal Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:350, protein:6, carbs:38, fat:20, fiber:2, vitamins:["Iron","Folate"], healthScore:3, swap:"Have in small portions — nutrient dense" },
  { id:112, name:"Gajar Ka Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:260, protein:4, carbs:32, fat:14, fiber:2, vitamins:["Vitamin A","Calcium","Iron"], healthScore:4, swap:"Use jaggery instead of sugar → gain iron" },
  { id:113, name:"Kheer (Rice)", category:"Sweets", veg:true, serving:"1 bowl (150g)", cal:240, protein:6, carbs:36, fat:8, fiber:0, vitamins:["Calcium","B12"], healthScore:4, swap:"Use low-fat milk → Save 60 cal" },
  { id:114, name:"Besan Ladoo", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:280, protein:6, carbs:28, fat:16, fiber:2, vitamins:["Iron","Protein","Folate"], healthScore:3, swap:"Have 1 ladoo → Save 140 cal" },
  { id:115, name:"Barfi (Kaju)", category:"Sweets", veg:true, serving:"2 pcs (50g)", cal:260, protein:4, carbs:30, fat:14, fiber:1, vitamins:["Magnesium","Copper"], healthScore:3, swap:"Have 1 small pc → Save 130 cal" },
  { id:116, name:"Rasmalai", category:"Sweets", veg:true, serving:"2 pcs (100g)", cal:220, protein:6, carbs:28, fat:10, fiber:0, vitamins:["Calcium","B12"], healthScore:4, swap:"Lower fat than gulab jamun — better choice" },
  { id:117, name:"Sandesh", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:160, protein:5, carbs:22, fat:6, fiber:0, vitamins:["Calcium"], healthScore:5, swap:"Lower cal Bengali sweet — good choice" },
  { id:118, name:"Mysore Pak", category:"Sweets", veg:true, serving:"1 pc (50g)", cal:280, protein:3, carbs:24, fat:20, fiber:1, vitamins:["Iron"], healthScore:2, swap:"Very high in ghee — have sandesh instead" },
  { id:119, name:"Phirni", category:"Sweets", veg:true, serving:"1 bowl (120g)", cal:200, protein:4, carbs:30, fat:7, fiber:0, vitamins:["Calcium","B vitamins"], healthScore:4, swap:"Use low-fat milk → Save 40 cal" },
  { id:120, name:"Malpua", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:320, protein:4, carbs:38, fat:16, fiber:1, vitamins:["Iron"], healthScore:2, swap:"Have sandesh → Save 160 cal" },

  // ── Drinks ────────────────────────────────────────────────────────────
  { id:121, name:"Chai (with sugar & milk)", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:80, protein:2, carbs:12, fat:3, fiber:0, vitamins:["Calcium","Antioxidants"], healthScore:5, swap:"Skip sugar → Save 40 cal" },
  { id:122, name:"Black Coffee", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:5, protein:0, carbs:1, fat:0, fiber:0, vitamins:["Antioxidants","Magnesium"], healthScore:8, swap:"Already zero-cal!" },
  { id:123, name:"Filter Coffee (South Indian)", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:90, protein:2, carbs:10, fat:4, fiber:0, vitamins:["Calcium","Antioxidants"], healthScore:5, swap:"Use less sugar → Save 30 cal" },
  { id:124, name:"Sweet Lassi", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:180, protein:5, carbs:28, fat:5, fiber:0, vitamins:["Calcium","B12","Probiotics"], healthScore:5, swap:"Have chaas/buttermilk → Save 120 cal" },
  { id:125, name:"Salt Lassi", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:80, protein:5, carbs:6, fat:4, fiber:0, vitamins:["Calcium","B12","Probiotics"], healthScore:8, swap:"Already healthy and probiotic-rich!" },
  { id:126, name:"Buttermilk (Chaas)", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:40, protein:3, carbs:4, fat:1, fiber:0, vitamins:["Calcium","B12","Probiotics"], healthScore:9, swap:"Excellent digestive drink — very low cal!" },
  { id:127, name:"Nimbu Pani (Lemonade)", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:60, protein:0, carbs:15, fat:0, fiber:0, vitamins:["Vitamin C","Electrolytes"], healthScore:7, swap:"Use less sugar/honey → Save 30 cal" },
  { id:128, name:"Sugarcane Juice", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:180, protein:0, carbs:45, fat:0, fiber:0, vitamins:["Iron","Potassium","Magnesium"], healthScore:4, swap:"Have coconut water → Save 130 cal" },
  { id:129, name:"Mango Shake", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:250, protein:5, carbs:42, fat:7, fiber:1, vitamins:["Vitamin A","Vitamin C","Calcium"], healthScore:4, swap:"Blend mango + water (no sugar) → Save 80 cal" },
  { id:130, name:"Coconut Water", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:45, protein:1, carbs:10, fat:0, fiber:0, vitamins:["Potassium","Magnesium","Electrolytes"], healthScore:9, swap:"Best natural hydration drink!" },
  { id:131, name:"Banana Shake", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:220, protein:6, carbs:36, fat:6, fiber:2, vitamins:["Potassium","Calcium","B6"], healthScore:5, swap:"Use low-fat milk → Save 40 cal" },
  { id:132, name:"Badam Milk", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:180, protein:7, carbs:22, fat:7, fiber:1, vitamins:["Vitamin E","Calcium","Magnesium"], healthScore:6, swap:"Use less sugar → Save 40 cal" },
  { id:133, name:"Thandai", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:220, protein:6, carbs:28, fat:9, fiber:1, vitamins:["Calcium","Iron","Magnesium"], healthScore:5, swap:"Use less sugar → Save 50 cal" },
  { id:134, name:"Aam Panna", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:90, protein:0, carbs:22, fat:0, fiber:1, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:7, swap:"Great summer coolant!" },
  { id:135, name:"Jaljeera", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:30, protein:0, carbs:7, fat:0, fiber:0, vitamins:["Iron","Vitamin C","Digestive spices"], healthScore:8, swap:"Very low-cal digestive drink!" },
  { id:136, name:"Green Tea", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:2, protein:0, carbs:0, fat:0, fiber:0, vitamins:["Antioxidants","L-Theanine"], healthScore:9, swap:"Zero cal! Great for metabolism" },

  // ── Dal Varieties ─────────────────────────────────────────────────────
  { id:137, name:"Toor Dal (Arhar)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:26, fat:2, fiber:5, vitamins:["Iron","Folate","Potassium","B6"], healthScore:9, swap:"Already excellent! Protein-rich staple" },
  { id:138, name:"Moong Dal (Yellow)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:150, protein:10, carbs:22, fat:1, fiber:4, vitamins:["Iron","Folate","Manganese","B6"], healthScore:9, swap:"Lightest and most digestible dal!" },
  { id:139, name:"Masoor Dal (Red Lentil)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:160, protein:10, carbs:24, fat:1, fiber:5, vitamins:["Iron","Folate","Manganese"], healthScore:9, swap:"Excellent iron source!" },
  { id:140, name:"Chana Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:28, fat:3, fiber:6, vitamins:["Iron","Folate","Zinc","Manganese"], healthScore:9, swap:"High fiber, low GI — great for diabetics" },
  { id:141, name:"Urad Dal (Black Gram)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:200, protein:11, carbs:28, fat:3, fiber:5, vitamins:["Iron","Folate","Magnesium","Potassium"], healthScore:8, swap:"Very nutritious but heavier to digest" },
  { id:142, name:"Dal Fry", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:24, fat:6, fiber:4, vitamins:["Iron","Folate","B6"], healthScore:7, swap:"Use less tadka oil → Save 30 cal" },
  { id:143, name:"Dal Palak", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:22, fat:4, fiber:5, vitamins:["Iron","Vitamin A","Folate","Calcium"], healthScore:9, swap:"Best of both worlds — dal + greens!" },
  { id:144, name:"Whole Moong Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:180, protein:12, carbs:26, fat:2, fiber:6, vitamins:["Iron","Folate","Manganese","Fiber"], healthScore:9, swap:"Highest protein dal variety!" },
  { id:145, name:"Panchmel Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:185, protein:11, carbs:26, fat:3, fiber:5, vitamins:["Iron","Folate","Zinc","Multiple minerals"], healthScore:9, swap:"Great variety of nutrients from mixed dals!" },

  // ── More North Indian / Paneer ────────────────────────────────────────
  { id:146, name:"Paneer Bhurji", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:260, protein:16, carbs:6, fat:20, fiber:1, vitamins:["Calcium","B12","Phosphorus"], healthScore:6, swap:"Use low-fat paneer → Save 70 cal" },
  { id:147, name:"Paneer Tikka", category:"North Indian", veg:true, serving:"6 pcs (150g)", cal:280, protein:16, carbs:8, fat:20, fiber:1, vitamins:["Calcium","B12","Phosphorus"], healthScore:6, swap:"Grill instead of tandoor with less oil" },
  { id:148, name:"Kadai Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:340, protein:14, carbs:14, fat:26, fiber:2, vitamins:["Calcium","Vitamin C","B12"], healthScore:5, swap:"Have palak paneer → Save 120 cal" },
  { id:149, name:"Paneer Do Pyaza", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:310, protein:14, carbs:16, fat:22, fiber:2, vitamins:["Calcium","B12","Quercetin"], healthScore:5, swap:"Use less oil → Save 60 cal" },
  { id:150, name:"Mushroom Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:6, carbs:14, fat:9, fiber:3, vitamins:["Selenium","B vitamins","Vitamin D"], healthScore:7, swap:"Already low-cal and nutritious!" },

  // ── More Snacks / Street ──────────────────────────────────────────────
  { id:151, name:"Chole Bhature", category:"Snacks", veg:true, serving:"2 bhature + chole", cal:550, protein:14, carbs:62, fat:26, fiber:6, vitamins:["Iron","Folate","Protein"], healthScore:3, swap:"Have chole with roti → Save 250 cal" },
  { id:152, name:"Aloo Chaat", category:"Snacks", veg:true, serving:"1 plate (150g)", cal:220, protein:3, carbs:30, fat:10, fiber:2, vitamins:["Vitamin C","Potassium"], healthScore:4, swap:"Have sprout chaat → Save 100 cal" },
  { id:153, name:"Papdi Chaat", category:"Snacks", veg:true, serving:"1 plate (150g)", cal:250, protein:5, carbs:32, fat:11, fiber:2, vitamins:["Calcium","Vitamin C"], healthScore:4, swap:"Have bhel puri → Save 70 cal" },
  { id:154, name:"Ragda Pattice", category:"Snacks", veg:true, serving:"2 pcs + ragda", cal:300, protein:8, carbs:40, fat:12, fiber:4, vitamins:["Iron","Potassium","Vitamin C"], healthScore:4, swap:"Have sprout chaat → Save 180 cal" },
  { id:155, name:"Onion Bhaji", category:"Snacks", veg:true, serving:"4 pcs (80g)", cal:220, protein:4, carbs:20, fat:14, fiber:2, vitamins:["Quercetin","Vitamin C"], healthScore:3, swap:"Air-fry → Save 80 cal" },
  { id:156, name:"Paneer Tikka Roll", category:"Snacks", veg:true, serving:"1 roll", cal:350, protein:14, carbs:36, fat:16, fiber:2, vitamins:["Calcium","B12","Vitamin C"], healthScore:5, swap:"Use roomali roti → Save 50 cal" },
  { id:157, name:"Chicken Tikka Roll", category:"Snacks", veg:false, serving:"1 roll", cal:320, protein:18, carbs:34, fat:12, fiber:2, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Good protein-to-cal ratio" },

  // ── Egg Dishes ────────────────────────────────────────────────────────
  { id:158, name:"Egg Bhurji", category:"Non-Veg", veg:false, serving:"2 eggs scrambled", cal:210, protein:14, carbs:4, fat:16, fiber:0, vitamins:["B12","Selenium","Choline","Vitamin D"], healthScore:7, swap:"Use 1 whole + 2 whites → Save 60 cal" },
  { id:159, name:"Anda Curry", category:"Non-Veg", veg:false, serving:"2 eggs + gravy", cal:280, protein:16, carbs:12, fat:18, fiber:1, vitamins:["B12","Vitamin D","Selenium"], healthScore:7, swap:"Light gravy version → Save 50 cal" },
  { id:160, name:"Egg Biryani", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:380, protein:16, carbs:48, fat:14, fiber:2, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Have egg fried rice (less) → Save 80 cal" },

  // ── More Regional ─────────────────────────────────────────────────────
  { id:161, name:"Undhiyu", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:260, protein:7, carbs:28, fat:14, fiber:6, vitamins:["Vitamin A","Iron","Fiber"], healthScore:6, swap:"Very nutritious Gujarati dish" },
  { id:162, name:"Handvo", category:"Breakfast", veg:true, serving:"1 slice (100g)", cal:170, protein:6, carbs:24, fat:5, fiber:3, vitamins:["Iron","B vitamins","Protein"], healthScore:7, swap:"Healthy Gujarati snack!" },
  { id:163, name:"Khandvi", category:"Snacks", veg:true, serving:"6 pcs (100g)", cal:140, protein:6, carbs:18, fat:5, fiber:2, vitamins:["Folate","Iron","Protein"], healthScore:7, swap:"Healthy steamed snack!" },
  { id:164, name:"Patra", category:"Snacks", veg:true, serving:"4 pcs (100g)", cal:150, protein:3, carbs:22, fat:6, fiber:3, vitamins:["Vitamin A","Iron","Calcium"], healthScore:7, swap:"Steamed version is healthier" },
  { id:165, name:"Litti Chokha", category:"North Indian", veg:true, serving:"2 litti + chokha", cal:380, protein:10, carbs:52, fat:14, fiber:5, vitamins:["Iron","Folate","Fiber"], healthScore:6, swap:"Baked not fried — decent option" },
  { id:166, name:"Pindi Chole", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:230, protein:10, carbs:34, fat:6, fiber:7, vitamins:["Iron","Folate","Manganese"], healthScore:7, swap:"Dry style = less oil than curry" },

  // ── Non-Veg extras ────────────────────────────────────────────────────
  { id:167, name:"Chicken Tikka Masala", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:340, protein:26, carbs:14, fat:20, fiber:1, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:5, swap:"Have plain chicken tikka → Save 90 cal" },
  { id:168, name:"Chicken Do Pyaza", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:300, protein:24, carbs:12, fat:18, fiber:2, vitamins:["B12","Iron","Quercetin"], healthScore:6, swap:"Good balance of protein and flavor" },
  { id:169, name:"Palak Chicken", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:260, protein:26, carbs:8, fat:14, fiber:3, vitamins:["Iron","Vitamin A","B12","Zinc"], healthScore:7, swap:"Great combo of protein + iron!" },
  { id:170, name:"Chicken Curry (Home-style)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:1, vitamins:["B12","Iron","Zinc","B6"], healthScore:6, swap:"Use skinless chicken → Save 50 cal" },
  { id:171, name:"Mutton Keema Pav", category:"Non-Veg", veg:false, serving:"1 plate", cal:450, protein:22, carbs:38, fat:22, fiber:2, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Skip pav, eat with roti → Save 120 cal" },
  { id:172, name:"Seekh Kebab", category:"Non-Veg", veg:false, serving:"4 pcs (120g)", cal:240, protein:20, carbs:6, fat:16, fiber:1, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Chicken seekh → Save 50 cal vs mutton" },
  { id:173, name:"Galouti Kebab", category:"Non-Veg", veg:false, serving:"4 pcs (100g)", cal:280, protein:18, carbs:8, fat:20, fiber:0, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Have chicken tikka → Save 30 cal, more protein" },
  { id:174, name:"Reshmi Kebab", category:"Non-Veg", veg:false, serving:"4 pcs (120g)", cal:220, protein:22, carbs:6, fat:12, fiber:0, vitamins:["B12","Iron","B6"], healthScore:7, swap:"Great lean protein source!" },
  { id:175, name:"Nihari", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:420, protein:28, carbs:12, fat:28, fiber:1, vitamins:["B12","Iron","Collagen"], healthScore:4, swap:"Have in small portions — very rich" },

  // ── More Rice Dishes ──────────────────────────────────────────────────
  { id:176, name:"Khichdi", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:200, protein:7, carbs:32, fat:4, fiber:3, vitamins:["Iron","B vitamins","Potassium"], healthScore:8, swap:"Already comfort food that's healthy!" },
  { id:177, name:"Tomato Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:250, protein:4, carbs:40, fat:7, fiber:2, vitamins:["Lycopene","Vitamin C"], healthScore:5, swap:"Use brown rice → gain fiber" },
  { id:178, name:"Coconut Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:300, protein:5, carbs:42, fat:12, fiber:2, vitamins:["Iron","Manganese"], healthScore:4, swap:"Use less coconut → Save 60 cal" },
  { id:179, name:"Bisi Bele Bath", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:280, protein:8, carbs:40, fat:8, fiber:4, vitamins:["Iron","Folate","B vitamins"], healthScore:7, swap:"Good one-pot nutritious meal" },
  { id:180, name:"Vangi Bath", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:260, protein:5, carbs:38, fat:9, fiber:3, vitamins:["Fiber","Potassium"], healthScore:6, swap:"Add dal for protein" },

  // ── South Indian extras ───────────────────────────────────────────────
  { id:181, name:"Rava Dosa", category:"South Indian", veg:true, serving:"1 dosa (120g)", cal:200, protein:4, carbs:28, fat:8, fiber:1, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Have regular dosa → Save 30 cal" },
  { id:182, name:"Set Dosa", category:"South Indian", veg:true, serving:"3 pcs", cal:210, protein:5, carbs:36, fat:5, fiber:1, vitamins:["Iron","Probiotics"], healthScore:7, swap:"Soft and easy to digest" },
  { id:183, name:"Neer Dosa", category:"South Indian", veg:true, serving:"2 pcs", cal:140, protein:3, carbs:26, fat:2, fiber:0, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Very light rice crepe" },
  { id:184, name:"Mysore Masala Dosa", category:"South Indian", veg:true, serving:"1 dosa", cal:350, protein:7, carbs:42, fat:16, fiber:3, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:4, swap:"Have plain dosa → Save 180 cal" },
  { id:185, name:"Onion Rava Dosa", category:"South Indian", veg:true, serving:"1 dosa", cal:240, protein:5, carbs:30, fat:11, fiber:2, vitamins:["Iron","Quercetin"], healthScore:5, swap:"Have set dosa → Save 30 cal" },
  { id:186, name:"Medu Vada Sambar", category:"South Indian", veg:true, serving:"2 vada + sambar", cal:340, protein:12, carbs:34, fat:17, fiber:5, vitamins:["Iron","Protein","Folate"], healthScore:5, swap:"Have idli sambar → Save 160 cal" },
  { id:187, name:"Idli Sambar", category:"South Indian", veg:true, serving:"3 idli + sambar", cal:260, protein:9, carbs:46, fat:4, fiber:5, vitamins:["Iron","Folate","Probiotics","Vitamin C"], healthScore:8, swap:"Perfect balanced South Indian meal!" },
  { id:188, name:"Dosa Sambar", category:"South Indian", veg:true, serving:"1 dosa + sambar", cal:250, protein:8, carbs:38, fat:7, fiber:4, vitamins:["Iron","Folate","B vitamins"], healthScore:7, swap:"Great combination!" },
  { id:189, name:"Payasam (Kheer)", category:"Sweets", veg:true, serving:"1 bowl (150g)", cal:250, protein:5, carbs:38, fat:8, fiber:1, vitamins:["Calcium","Vitamin A"], healthScore:4, swap:"Use low-fat milk → Save 50 cal" },

  // ── Raita / Sides ─────────────────────────────────────────────────────
  { id:190, name:"Boondi Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:100, protein:3, carbs:10, fat:5, fiber:0, vitamins:["Calcium","Probiotics"], healthScore:5, swap:"Have plain raita → Save 30 cal" },
  { id:191, name:"Mixed Veg Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:70, protein:3, carbs:6, fat:3, fiber:1, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:7, swap:"Already light and probiotic-rich" },
  { id:192, name:"Onion Salad", category:"Sides", veg:true, serving:"1 serving (50g)", cal:20, protein:1, carbs:4, fat:0, fiber:1, vitamins:["Quercetin","Vitamin C"], healthScore:9, swap:"Zero fat! Great digestive aid" },
  { id:193, name:"Green Salad", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:25, protein:1, carbs:5, fat:0, fiber:2, vitamins:["Vitamin C","Vitamin A","Fiber"], healthScore:10, swap:"Perfect addition to any meal!" },
  { id:194, name:"Pickle (Achar)", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:30, protein:0, carbs:2, fat:2, fiber:0, vitamins:["Vitamin C"], healthScore:4, swap:"High sodium — use sparingly" },
  { id:195, name:"Papad (Roasted)", category:"Sides", veg:true, serving:"1 pc", cal:40, protein:2, carbs:6, fat:1, fiber:1, vitamins:["Iron","Protein"], healthScore:6, swap:"Roasted > fried → saves 30 cal" },
  { id:196, name:"Papad (Fried)", category:"Sides", veg:true, serving:"1 pc", cal:70, protein:2, carbs:6, fat:4, fiber:1, vitamins:["Iron"], healthScore:4, swap:"Roast instead → Save 30 cal" },

  // ── More Breakfast ────────────────────────────────────────────────────
  { id:197, name:"Stuffed Gobhi Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:250, protein:5, carbs:32, fat:11, fiber:3, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:6, swap:"Have methi paratha → Save 20 cal" },
  { id:198, name:"Mooli Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:240, protein:5, carbs:30, fat:11, fiber:3, vitamins:["Vitamin C","Potassium","Fiber"], healthScore:6, swap:"Good — radish aids digestion" },
  { id:199, name:"Sattu Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:260, protein:8, carbs:32, fat:11, fiber:4, vitamins:["Iron","Protein","Calcium","Fiber"], healthScore:7, swap:"High protein filling — great choice!" },
  { id:200, name:"Curd (Plain Dahi)", category:"Breakfast", veg:true, serving:"1 bowl (100g)", cal:60, protein:4, carbs:5, fat:3, fiber:0, vitamins:["Calcium","B12","Probiotics"], healthScore:8, swap:"Low-fat curd → Save 15 cal" },

  // ── More Non-Veg ──────────────────────────────────────────────────────
  { id:201, name:"Chicken Fried Rice", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:420, protein:18, carbs:52, fat:16, fiber:2, vitamins:["B12","Iron","B6"], healthScore:4, swap:"Have chicken pulao → Save 80 cal" },
  { id:202, name:"Chicken Manchurian", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:360, protein:20, carbs:22, fat:22, fiber:1, vitamins:["B12","Iron"], healthScore:3, swap:"Have chicken tikka → Save 110 cal" },
  { id:203, name:"Chicken Lollipop", category:"Non-Veg", veg:false, serving:"6 pcs", cal:380, protein:22, carbs:18, fat:24, fiber:0, vitamins:["B12","Iron","Zinc"], healthScore:3, swap:"Have tandoori chicken → Save 160 cal" },
  { id:204, name:"Fish Tikka", category:"Non-Veg", veg:false, serving:"4 pcs (150g)", cal:180, protein:24, carbs:4, fat:8, fiber:0, vitamins:["Omega-3","B12","Selenium"], healthScore:8, swap:"Excellent lean protein!" },
  { id:205, name:"Crab Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:200, protein:18, carbs:10, fat:10, fiber:1, vitamins:["B12","Zinc","Selenium","Omega-3"], healthScore:7, swap:"Already nutrient-dense!" },

  // ── Rajasthani / Gujarati ─────────────────────────────────────────────
  { id:206, name:"Dal Baati Churma", category:"North Indian", veg:true, serving:"1 plate", cal:550, protein:14, carbs:64, fat:26, fiber:4, vitamins:["Iron","Folate","B vitamins"], healthScore:4, swap:"Eat less churma → Save 150 cal" },
  { id:207, name:"Gatte Ki Sabzi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:8, carbs:24, fat:10, fiber:3, vitamins:["Iron","Folate","Protein"], healthScore:6, swap:"Good besan-based protein dish" },
  { id:208, name:"Ker Sangri", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:120, protein:3, carbs:14, fat:6, fiber:4, vitamins:["Vitamin C","Iron","Fiber"], healthScore:7, swap:"Traditional Rajasthani superfood!" },
  { id:209, name:"Kadi Khichdi", category:"North Indian", veg:true, serving:"1 plate", cal:280, protein:9, carbs:38, fat:10, fiber:3, vitamins:["Calcium","Iron","Probiotics"], healthScore:6, swap:"Comfort food with probiotics" },

  // ── More Sweets ───────────────────────────────────────────────────────
  { id:210, name:"Shrikhand", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:180, protein:5, carbs:26, fat:6, fiber:0, vitamins:["Calcium","B12","Probiotics"], healthScore:4, swap:"Use less sugar → Save 40 cal" },
  { id:211, name:"Basundi", category:"Sweets", veg:true, serving:"1 bowl (120g)", cal:220, protein:6, carbs:30, fat:8, fiber:0, vitamins:["Calcium","B12","Vitamin A"], healthScore:4, swap:"Have in small portions" },
  { id:212, name:"Rabdi", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:200, protein:5, carbs:24, fat:10, fiber:0, vitamins:["Calcium","Vitamin A"], healthScore:3, swap:"Use low-fat milk → Save 50 cal" },
  { id:213, name:"Kulfi", category:"Sweets", veg:true, serving:"1 pc (80g)", cal:180, protein:4, carbs:22, fat:9, fiber:0, vitamins:["Calcium","Vitamin A"], healthScore:4, swap:"Better than ice cream — no air whipped" },
  { id:214, name:"Imarti", category:"Sweets", veg:true, serving:"1 pc (50g)", cal:200, protein:2, carbs:30, fat:8, fiber:0, vitamins:["Iron"], healthScore:2, swap:"Have rasgulla → Save 20 cal, less oil" },
  { id:215, name:"Peda", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:180, protein:4, carbs:24, fat:8, fiber:0, vitamins:["Calcium"], healthScore:3, swap:"Have sandesh → Save 20 cal" },
  { id:216, name:"Coconut Ladoo", category:"Sweets", veg:true, serving:"2 pcs (50g)", cal:220, protein:2, carbs:24, fat:14, fiber:2, vitamins:["Iron","Manganese"], healthScore:3, swap:"Use jaggery → gain iron" },
  { id:217, name:"Ras Malai", category:"Sweets", veg:true, serving:"2 pcs (100g)", cal:220, protein:6, carbs:28, fat:10, fiber:0, vitamins:["Calcium","B12","Cardamom"], healthScore:4, swap:"One of the lighter milk sweets" },

  // ── Indo-Chinese ──────────────────────────────────────────────────────
  { id:218, name:"Veg Manchurian (Dry)", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:280, protein:5, carbs:28, fat:16, fiber:2, vitamins:["Vitamin C","Iron"], healthScore:3, swap:"Have stir-fried veggies → Save 150 cal" },
  { id:219, name:"Veg Manchurian (Gravy)", category:"Snacks", veg:true, serving:"1 bowl (200g)", cal:320, protein:5, carbs:32, fat:18, fiber:2, vitamins:["Vitamin C"], healthScore:3, swap:"Have dry version → Save 40 cal" },
  { id:220, name:"Hakka Noodles", category:"Snacks", veg:true, serving:"1 plate (250g)", cal:350, protein:7, carbs:48, fat:14, fiber:2, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have rice with stir-fried veg → Save 100 cal" },
  { id:221, name:"Schezwan Fried Rice", category:"Snacks", veg:true, serving:"1 plate (300g)", cal:400, protein:6, carbs:52, fat:18, fiber:2, vitamins:["Iron","Vitamin C"], healthScore:3, swap:"Have jeera rice → Save 180 cal" },
  { id:222, name:"Chilli Paneer", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:310, protein:12, carbs:16, fat:22, fiber:2, vitamins:["Calcium","Vitamin C"], healthScore:4, swap:"Have paneer tikka → Save 30 cal" },
  { id:223, name:"Gobi Manchurian", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:260, protein:4, carbs:26, fat:15, fiber:3, vitamins:["Vitamin C","Vitamin K"], healthScore:3, swap:"Have roasted gobhi → Save 160 cal" },
  { id:224, name:"Sweet Corn Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:90, protein:3, carbs:16, fat:2, fiber:1, vitamins:["Vitamin C","Iron"], healthScore:6, swap:"Good light starter" },
  { id:225, name:"Hot & Sour Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:70, protein:3, carbs:10, fat:2, fiber:1, vitamins:["Vitamin C"], healthScore:6, swap:"Low-cal soup option" },

  // ── More Dals / Legumes ───────────────────────────────────────────────
  { id:226, name:"Rajma Rice", category:"North Indian", veg:true, serving:"1 plate (350g)", cal:380, protein:14, carbs:60, fat:8, fiber:8, vitamins:["Iron","Folate","Potassium","Fiber"], healthScore:7, swap:"Use brown rice → gain more fiber" },
  { id:227, name:"Chole Rice", category:"North Indian", veg:true, serving:"1 plate (350g)", cal:400, protein:13, carbs:62, fat:10, fiber:8, vitamins:["Iron","Folate","Manganese"], healthScore:7, swap:"Use brown rice → gain fiber" },
  { id:228, name:"Kadhi Chawal", category:"North Indian", veg:true, serving:"1 plate (350g)", cal:350, protein:10, carbs:52, fat:11, fiber:3, vitamins:["Calcium","Probiotics","B12"], healthScore:6, swap:"Use brown rice → gain fiber" },
  { id:229, name:"Sambhar Rice", category:"South Indian", veg:true, serving:"1 plate (350g)", cal:300, protein:10, carbs:50, fat:6, fiber:5, vitamins:["Iron","Folate","Vitamin C"], healthScore:8, swap:"Already a balanced complete meal!" },
  { id:230, name:"Rasam Rice", category:"South Indian", veg:true, serving:"1 plate (300g)", cal:220, protein:4, carbs:42, fat:3, fiber:2, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:7, swap:"Add dal for protein" },

  // ── Health Foods ──────────────────────────────────────────────────────
  { id:231, name:"Sprouts Salad", category:"Sides", veg:true, serving:"1 bowl (150g)", cal:100, protein:8, carbs:14, fat:1, fiber:5, vitamins:["Iron","Folate","Vitamin C","Protein"], healthScore:10, swap:"Superfood! No swap needed" },
  { id:232, name:"Ragi Mudde", category:"South Indian", veg:true, serving:"2 balls (150g)", cal:170, protein:4, carbs:34, fat:1, fiber:4, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Excellent millet staple!" },
  { id:233, name:"Bajra Khichdi", category:"North Indian", veg:true, serving:"1 bowl (250g)", cal:220, protein:7, carbs:34, fat:6, fiber:4, vitamins:["Iron","Magnesium","Fiber"], healthScore:8, swap:"Great millet-based comfort food" },
  { id:234, name:"Jowar Roti", category:"Rice/Breads", veg:true, serving:"1 pc (50g)", cal:95, protein:3, carbs:20, fat:1, fiber:3, vitamins:["Iron","Fiber","Phosphorus"], healthScore:8, swap:"Excellent gluten-free millet roti!" },
  { id:235, name:"Nachni Satva", category:"Breakfast", veg:true, serving:"1 bowl (200g)", cal:140, protein:4, carbs:28, fat:1, fiber:3, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Great ragi porridge for babies & adults!" },

  // ── Continental/Fusion (popular in India) ──────────────────────────────
  { id:236, name:"Paneer Sandwich (Grilled)", category:"Snacks", veg:true, serving:"1 sandwich", cal:280, protein:12, carbs:30, fat:12, fiber:2, vitamins:["Calcium","B12"], healthScore:5, swap:"Use multigrain bread → gain fiber" },
  { id:237, name:"Veg Sandwich", category:"Snacks", veg:true, serving:"1 sandwich", cal:200, protein:6, carbs:28, fat:7, fiber:3, vitamins:["Vitamin C","Fiber"], healthScore:6, swap:"Use multigrain bread → gain fiber" },
  { id:238, name:"Cheese Toast", category:"Snacks", veg:true, serving:"2 slices", cal:260, protein:8, carbs:26, fat:14, fiber:1, vitamins:["Calcium","B12"], healthScore:4, swap:"Use multigrain + less cheese → Save 60 cal" },
  { id:239, name:"Masala Omelette", category:"Breakfast", veg:false, serving:"2 eggs + veggies", cal:200, protein:15, carbs:4, fat:14, fiber:1, vitamins:["B12","Vitamin D","Selenium","Vitamin C"], healthScore:7, swap:"Add more veggies for fiber" },

  // ── Biryanis ──────────────────────────────────────────────────────────
  { id:240, name:"Hyderabadi Biryani (Chicken)", category:"Non-Veg", veg:false, serving:"1 plate (350g)", cal:480, protein:24, carbs:54, fat:18, fiber:2, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Have smaller portion + raita" },
  { id:241, name:"Lucknowi Biryani", category:"Non-Veg", veg:false, serving:"1 plate (350g)", cal:460, protein:22, carbs:52, fat:18, fiber:2, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Lighter than Hyderabadi (pukki style)" },
  { id:242, name:"Kolkata Biryani", category:"Non-Veg", veg:false, serving:"1 plate (350g)", cal:440, protein:20, carbs:56, fat:14, fiber:2, vitamins:["B12","Iron","Potassium"], healthScore:5, swap:"Has potato — remove for lower carbs" },

  // ── More Regional Specials ────────────────────────────────────────────
  { id:243, name:"Prawn Malai Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:280, protein:18, carbs:8, fat:20, fiber:1, vitamins:["Selenium","B12","Omega-3"], healthScore:5, swap:"Use less coconut cream → Save 60 cal" },
  { id:244, name:"Fish Moilee", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:240, protein:20, carbs:8, fat:14, fiber:1, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Light coconut-based curry — good choice" },
  { id:245, name:"Sorpotel", category:"Non-Veg", veg:false, serving:"1 bowl (150g)", cal:320, protein:18, carbs:8, fat:24, fiber:1, vitamins:["B12","Iron","Zinc"], healthScore:3, swap:"Have vindaloo instead → less fat" },
  { id:246, name:"Vindaloo (Pork)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:350, protein:24, carbs:10, fat:24, fiber:1, vitamins:["B12","B1","Zinc","Iron"], healthScore:4, swap:"Use lean cuts → Save 80 cal" },
  { id:247, name:"Goan Fish Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:220, protein:22, carbs:8, fat:12, fiber:1, vitamins:["Omega-3","B12","Vitamin D"], healthScore:8, swap:"Excellent! Light and nutritious" },

  // ── More Drinks ───────────────────────────────────────────────────────
  { id:248, name:"Masala Chai", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:85, protein:2, carbs:12, fat:3, fiber:0, vitamins:["Antioxidants","Calcium"], healthScore:5, swap:"Skip sugar → Save 40 cal" },
  { id:249, name:"Turmeric Milk (Haldi Doodh)", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:120, protein:5, carbs:14, fat:4, fiber:0, vitamins:["Calcium","Curcumin","Vitamin D"], healthScore:8, swap:"Great anti-inflammatory bedtime drink!" },
  { id:250, name:"Sattu Drink", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:100, protein:6, carbs:16, fat:1, fiber:2, vitamins:["Iron","Protein","Calcium","Fiber"], healthScore:9, swap:"Bihar's protein shake — excellent!" },

  // ── More Complete Meals ───────────────────────────────────────────────
  { id:251, name:"Thali (Veg North Indian)", category:"North Indian", veg:true, serving:"Full thali", cal:800, protein:22, carbs:110, fat:28, fiber:12, vitamins:["Iron","Calcium","B vitamins","Vitamin C"], healthScore:6, swap:"Skip 1 roti + sweet → Save 200 cal" },
  { id:252, name:"Thali (South Indian Meals)", category:"South Indian", veg:true, serving:"Full meals", cal:700, protein:18, carbs:100, fat:22, fiber:10, vitamins:["Iron","Vitamin C","B vitamins","Calcium"], healthScore:7, swap:"Skip papad + payasam → Save 150 cal" },

  // ── Filling remaining to 300+ ─────────────────────────────────────────
  { id:253, name:"Aloo Paratha with Curd", category:"Breakfast", veg:true, serving:"1 paratha + curd", cal:340, protein:10, carbs:42, fat:14, fiber:3, vitamins:["Vitamin C","Calcium","Probiotics"], healthScore:6, swap:"Use gobhi filling → Save 40 cal" },
  { id:254, name:"Chole Kulche", category:"Snacks", veg:true, serving:"2 kulche + chole", cal:520, protein:14, carbs:66, fat:22, fiber:6, vitamins:["Iron","Folate"], healthScore:4, swap:"Have chole with roti → Save 200 cal" },
  { id:255, name:"Masala Puri", category:"Snacks", veg:true, serving:"4 puri + curry", cal:450, protein:8, carbs:50, fat:24, fiber:3, vitamins:["Iron","Potassium"], healthScore:3, swap:"Have roti instead of puri → Save 150 cal" },
  { id:256, name:"Pav Bhaji (Dry)", category:"Snacks", veg:true, serving:"bhaji only (200g)", cal:200, protein:6, carbs:24, fat:9, fiber:4, vitamins:["Vitamin A","Vitamin C","Iron"], healthScore:6, swap:"Without pav — good veggie dish" },
  { id:257, name:"Masala Papad", category:"Sides", veg:true, serving:"1 pc", cal:50, protein:2, carbs:6, fat:2, fiber:1, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Good low-cal starter" },
  { id:258, name:"Dal Khichdi", category:"Dals", veg:true, serving:"1 bowl (250g)", cal:210, protein:8, carbs:34, fat:4, fiber:4, vitamins:["Iron","Folate","B vitamins"], healthScore:8, swap:"Comfort food that's nutritious!" },
  { id:259, name:"Palak Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:22, fat:4, fiber:5, vitamins:["Iron","Vitamin A","Folate","Calcium"], healthScore:9, swap:"Iron-rich superfood dal!" },
  { id:260, name:"Lauki Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:140, protein:8, carbs:20, fat:2, fiber:4, vitamins:["Vitamin C","Calcium","Iron"], healthScore:9, swap:"Very light and digestible" },
  { id:261, name:"Egg Fried Rice", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:380, protein:14, carbs:50, fat:14, fiber:2, vitamins:["B12","Iron","B6"], healthScore:4, swap:"Have egg pulao → Save 60 cal" },
  { id:262, name:"Keema Paratha", category:"Breakfast", veg:false, serving:"1 pc (130g)", cal:340, protein:14, carbs:34, fat:16, fiber:2, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Use chicken keema → Save 60 cal" },
  { id:263, name:"Mutton Paya", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:300, protein:22, carbs:6, fat:22, fiber:0, vitamins:["Collagen","B12","Iron","Calcium"], healthScore:5, swap:"Rich in collagen — good for joints" },
  { id:264, name:"Haleem", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:350, protein:20, carbs:30, fat:16, fiber:4, vitamins:["Iron","B12","Protein","Fiber"], healthScore:6, swap:"High protein — Hyderabadi specialty" },
  { id:265, name:"Brain Fry (Bheja Fry)", category:"Non-Veg", veg:false, serving:"1 bowl (100g)", cal:280, protein:12, carbs:6, fat:24, fiber:0, vitamins:["B12","Omega-3","DHA"], healthScore:3, swap:"Very high cholesterol — eat rarely" },
  { id:266, name:"Liver Fry", category:"Non-Veg", veg:false, serving:"1 bowl (100g)", cal:200, protein:20, carbs:4, fat:12, fiber:0, vitamins:["Iron","B12","Vitamin A","Folate"], healthScore:5, swap:"Very iron-rich — good for anemia" },
  { id:267, name:"Rumali Roti", category:"Rice/Breads", veg:true, serving:"1 pc (40g)", cal:90, protein:3, carbs:18, fat:1, fiber:1, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Thinner = fewer calories than naan" },
  { id:268, name:"Laccha Paratha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:260, protein:4, carbs:30, fat:14, fiber:2, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have tandoori roti → Save 170 cal" },
  { id:269, name:"Garlic Naan", category:"Rice/Breads", veg:true, serving:"1 pc (85g)", cal:280, protein:7, carbs:42, fat:8, fiber:2, vitamins:["B vitamins","Allicin"], healthScore:4, swap:"Have tandoori roti → Save 180 cal" },
  { id:270, name:"Cheese Naan", category:"Rice/Breads", veg:true, serving:"1 pc (100g)", cal:350, protein:10, carbs:42, fat:16, fiber:2, vitamins:["Calcium","B vitamins"], healthScore:3, swap:"Have plain roti → Save 270 cal" },

  // ── Filling to 305 ───────────────────────────────────────────────────
  { id:271, name:"Paneer Lababdar", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:360, protein:14, carbs:16, fat:28, fiber:2, vitamins:["Calcium","B12"], healthScore:4, swap:"Have palak paneer → Save 140 cal" },
  { id:272, name:"Navratan Korma", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:320, protein:8, carbs:24, fat:22, fiber:3, vitamins:["Vitamin A","Vitamin C","Iron"], healthScore:5, swap:"Rich but nutrient-diverse" },
  { id:273, name:"Achari Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:330, protein:14, carbs:14, fat:24, fiber:2, vitamins:["Calcium","B12","Mustard oil benefits"], healthScore:5, swap:"Use less oil → Save 60 cal" },
  { id:274, name:"Methi Malai Murg", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:320, protein:24, carbs:8, fat:22, fiber:2, vitamins:["B12","Iron","Vitamin K","Folate"], healthScore:5, swap:"Use less cream → Save 60 cal" },
  { id:275, name:"Chicken Chettinad", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:290, protein:26, carbs:10, fat:16, fiber:2, vitamins:["B12","Iron","Zinc","Black pepper"], healthScore:6, swap:"Spice-rich — good metabolism booster" },
  { id:276, name:"Pepper Chicken", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:260, protein:26, carbs:8, fat:14, fiber:1, vitamins:["B12","Iron","Piperine","Zinc"], healthScore:7, swap:"Already lean and spicy!" },
  { id:277, name:"Dal Gosht", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:340, protein:24, carbs:22, fat:18, fiber:4, vitamins:["B12","Iron","Folate","Zinc"], healthScore:6, swap:"Good protein combo — dal + meat" },
  { id:278, name:"Bhuna Gosht", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:320, protein:26, carbs:6, fat:22, fiber:1, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Use lean meat → Save 60 cal" },
  { id:279, name:"Tadka Dal (Restaurant)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:200, protein:9, carbs:24, fat:8, fiber:4, vitamins:["Iron","Folate","B6"], healthScore:7, swap:"Home version with less ghee is healthier" },
  { id:280, name:"Mango Lassi", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:220, protein:5, carbs:36, fat:6, fiber:1, vitamins:["Vitamin A","Calcium","Vitamin C","Probiotics"], healthScore:5, swap:"Use less sugar → Save 40 cal" },
  { id:281, name:"Rose Sharbat", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:100, protein:0, carbs:25, fat:0, fiber:0, vitamins:["Cooling properties"], healthScore:4, swap:"Mostly sugar — dilute more" },
  { id:282, name:"Jal Jeera Pani Puri", category:"Snacks", veg:true, serving:"6 pcs", cal:140, protein:3, carbs:24, fat:4, fiber:2, vitamins:["Vitamin C","Iron","Digestive spices"], healthScore:5, swap:"Better than sweet/dahi puri" },
  { id:283, name:"Bhutta (Roasted Corn)", category:"Snacks", veg:true, serving:"1 cob", cal:120, protein:4, carbs:22, fat:2, fiber:3, vitamins:["Fiber","Vitamin B","Manganese"], healthScore:7, swap:"Healthy street snack!" },
  { id:284, name:"Chana Jor Garam", category:"Snacks", veg:true, serving:"50g", cal:160, protein:7, carbs:24, fat:4, fiber:4, vitamins:["Iron","Protein","Fiber"], healthScore:7, swap:"Good protein snack" },
  { id:285, name:"Murmura (Puffed Rice)", category:"Snacks", veg:true, serving:"50g", cal:180, protein:3, carbs:40, fat:0.5, fiber:1, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Light but low nutrition — add peanuts" },
  { id:286, name:"Kala Chana Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:160, protein:9, carbs:24, fat:3, fiber:6, vitamins:["Iron","Folate","Fiber","Protein"], healthScore:9, swap:"Excellent high-fiber, high-protein snack!" },
  { id:287, name:"Sweet Potato Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:140, protein:2, carbs:28, fat:2, fiber:4, vitamins:["Vitamin A","Vitamin C","Potassium","Fiber"], healthScore:8, swap:"Healthier than aloo chaat!" },
  { id:288, name:"Fruit Chaat", category:"Snacks", veg:true, serving:"1 bowl (200g)", cal:100, protein:1, carbs:24, fat:0, fiber:3, vitamins:["Vitamin C","Vitamin A","Potassium","Fiber"], healthScore:9, swap:"One of the healthiest snack options!" },
  { id:289, name:"Peanut Chikki", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:200, protein:6, carbs:22, fat:10, fiber:2, vitamins:["Protein","Magnesium","Iron"], healthScore:5, swap:"Uses jaggery — better than refined sugar sweets" },
  { id:290, name:"Tilgul (Sesame Ladoo)", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:190, protein:4, carbs:20, fat:10, fiber:2, vitamins:["Calcium","Iron","Sesame benefits"], healthScore:5, swap:"Rich in calcium — good winter sweet" },
  { id:291, name:"Dry Fruit Ladoo", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:200, protein:5, carbs:18, fat:12, fiber:2, vitamins:["Vitamin E","Iron","Omega-3","Protein"], healthScore:6, swap:"Nutrient-dense — healthier sweet option" },
  { id:292, name:"Date & Nut Ball", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:160, protein:3, carbs:24, fat:6, fiber:3, vitamins:["Iron","Potassium","Fiber","Magnesium"], healthScore:7, swap:"No added sugar — great natural sweet!" },
  { id:293, name:"Banana Chips", category:"Snacks", veg:true, serving:"50g", cal:260, protein:1, carbs:30, fat:16, fiber:2, vitamins:["Potassium"], healthScore:3, swap:"Have roasted makhana → Save 80 cal" },
  { id:294, name:"Mixture (Namkeen)", category:"Snacks", veg:true, serving:"50g", cal:250, protein:5, carbs:28, fat:13, fiber:2, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have roasted chana → Save 70 cal" },
  { id:295, name:"Chakli/Murukku", category:"Snacks", veg:true, serving:"3 pcs (50g)", cal:230, protein:4, carbs:28, fat:12, fiber:2, vitamins:["Iron"], healthScore:3, swap:"Have thattai (baked) → Save 60 cal" },
  { id:296, name:"Mathri", category:"Snacks", veg:true, serving:"3 pcs (50g)", cal:240, protein:4, carbs:26, fat:14, fiber:1, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have baked mathri → Save 80 cal" },
  { id:297, name:"Kachumber Salad", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:30, protein:1, carbs:6, fat:0, fiber:2, vitamins:["Vitamin C","Vitamin A","Fiber"], healthScore:10, swap:"Perfect accompaniment — virtually zero cal!" },
  { id:298, name:"Mint Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:15, protein:1, carbs:2, fat:0, fiber:1, vitamins:["Vitamin C","Iron","Menthol"], healthScore:9, swap:"Virtually zero cal condiment!" },
  { id:299, name:"Tamarind Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:40, protein:0, carbs:10, fat:0, fiber:1, vitamins:["Iron","Potassium"], healthScore:5, swap:"High sugar — use sparingly" },
  { id:300, name:"Coconut Chutney (South)", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:55, protein:1, carbs:4, fat:4, fiber:1, vitamins:["Iron","Manganese","MCT"], healthScore:6, swap:"Use less coconut for fewer cal" },
  { id:301, name:"Tomato Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:80, protein:2, carbs:14, fat:2, fiber:2, vitamins:["Lycopene","Vitamin C","Vitamin A"], healthScore:7, swap:"Great low-cal starter!" },
  { id:302, name:"Mulligatawny Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:110, protein:4, carbs:16, fat:3, fiber:2, vitamins:["Iron","Turmeric","Vitamin C"], healthScore:7, swap:"Good Anglo-Indian classic" },
  { id:303, name:"Pani Puri Water (Pudina)", category:"Drinks", veg:true, serving:"1 glass (100ml)", cal:15, protein:0, carbs:3, fat:0, fiber:0, vitamins:["Vitamin C","Menthol","Iron"], healthScore:7, swap:"Almost zero cal — great digestive" },
  { id:304, name:"Solkadhi", category:"Drinks", veg:true, serving:"1 glass (150ml)", cal:45, protein:1, carbs:4, fat:3, fiber:0, vitamins:["Probiotics","Kokum benefits"], healthScore:7, swap:"Konkan digestive drink" },
  { id:305, name:"Kanji (Fermented Carrot)", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:30, protein:1, carbs:6, fat:0, fiber:1, vitamins:["Probiotics","Vitamin A","B vitamins"], healthScore:8, swap:"Probiotic-rich fermented drink!" },
];

// ─── RDA (Recommended Daily Allowance) for Indian adults ─────────────────
const RDA = { cal: 2000, protein: 55, carbs: 275, fat: 65, fiber: 30 };

// ─── Search dishes ───────────────────────────────────────────────────────
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

function searchDishes(query) {
  if (!query || query.trim().length === 0) return dishes.slice(0, 20);
  const q = normalize(query);
  const words = q.split(/\s+/);

  const scored = dishes.map(d => {
    const name = normalize(d.name);
    const cat = normalize(d.category);
    let score = 0;
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 90;
    else if (name.includes(q)) score = 80;
    else {
      words.forEach(w => {
        if (name.includes(w)) score += 30;
        if (cat.includes(w)) score += 10;
      });
    }
    return { ...d, score };
  });

  return scored.filter(d => d.score > 0).sort((a, b) => b.score - a.score).slice(0, 20);
}

// ─── Analyze a thali (list of dish IDs/names) ───────────────────────────
function analyzeThali(dishIds) {
  const selected = [];
  for (const id of dishIds) {
    const dish = typeof id === 'number'
      ? dishes.find(d => d.id === id)
      : dishes.find(d => normalize(d.name) === normalize(String(id)));
    if (dish) selected.push(dish);
  }

  if (selected.length === 0) return { error: 'No valid dishes found' };

  const totals = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  selected.forEach(d => {
    totals.cal += d.cal;
    totals.protein += d.protein;
    totals.carbs += d.carbs;
    totals.fat += d.fat;
    totals.fiber += d.fiber;
  });

  const rdaPercent = {
    cal: Math.round((totals.cal / RDA.cal) * 100),
    protein: Math.round((totals.protein / RDA.protein) * 100),
    carbs: Math.round((totals.carbs / RDA.carbs) * 100),
    fat: Math.round((totals.fat / RDA.fat) * 100),
    fiber: Math.round((totals.fiber / RDA.fiber) * 100),
  };

  // Walking equivalent (approx 4 cal/min moderate walk)
  const walkingMinutes = Math.round(totals.cal / 4);

  // Health score average
  const avgHealthScore = +(selected.reduce((s, d) => s + d.healthScore, 0) / selected.length).toFixed(1);

  // Meal rating
  const ratings = [];
  if (totals.protein < 10) ratings.push("Your meal is protein-deficient. Add a dal, paneer, or egg dish.");
  if (totals.fiber < 4) ratings.push("Low fiber! Add a salad, sabzi, or switch to brown rice/roti.");
  if (totals.fat > 40) ratings.push("High fat content. Consider lighter cooking methods or fewer fried items.");
  if (totals.cal > 700) ratings.push("Heavy meal! Consider smaller portions or skip one fried/rich item.");
  if (totals.cal < 200) ratings.push("Very light meal. Make sure you're eating enough throughout the day.");
  if (selected.every(d => d.veg === true) && totals.protein < 15) ratings.push("Add paneer, dal, or curd for more protein in your vegetarian meal.");
  if (ratings.length === 0) ratings.push("Well-balanced meal! Good job.");

  // Swaps
  const swaps = selected
    .filter(d => d.healthScore < 7 && d.swap)
    .map(d => ({ dish: d.name, suggestion: d.swap }));

  return {
    dishes: selected.map(d => ({
      id: d.id,
      name: d.name,
      category: d.category,
      veg: d.veg,
      serving: d.serving,
      nutrition: { cal: d.cal, protein: d.protein, carbs: d.carbs, fat: d.fat, fiber: d.fiber },
      vitamins: d.vitamins,
      healthScore: d.healthScore,
    })),
    totals,
    rdaPercent,
    walkingMinutes,
    avgHealthScore,
    ratings,
    healthierSwaps: swaps,
  };
}

// ─── Get single dish ─────────────────────────────────────────────────────
function getDish(id) {
  const dish = dishes.find(d => d.id === parseInt(id));
  if (!dish) return null;
  return {
    ...dish,
    rdaPercent: {
      cal: Math.round((dish.cal / RDA.cal) * 100),
      protein: Math.round((dish.protein / RDA.protein) * 100),
      carbs: Math.round((dish.carbs / RDA.carbs) * 100),
      fat: Math.round((dish.fat / RDA.fat) * 100),
      fiber: Math.round((dish.fiber / RDA.fiber) * 100),
    },
  };
}

// ─── Route handlers ──────────────────────────────────────────────────────
function handleAnalyze(req, res) {
  const { dishes: dishIds } = req.body || {};
  if (!dishIds || !Array.isArray(dishIds) || dishIds.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of dish IDs or names' });
  }
  const result = analyzeThali(dishIds);
  res.json(result);
}

function handleSearch(req, res) {
  const q = req.query.q || '';
  const results = searchDishes(q);
  res.json({ results: results.map(d => ({ id: d.id, name: d.name, category: d.category, veg: d.veg, cal: d.cal, serving: d.serving, healthScore: d.healthScore })), count: results.length });
}

function handleGetDish(req, res) {
  const dish = getDish(req.params.id);
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  res.json(dish);
}

module.exports = {
  handleAnalyze,
  handleSearch,
  handleGetDish,
  searchDishes,
  analyzeThali,
  getDish,
  dishes,
  RDA,
};
