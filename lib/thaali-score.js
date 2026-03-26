/**
 * ThaaliScore — Indian Food Nutrition Scanner
 * Backend logic with 300+ Indian dishes
 */

// Nutrition per standard serving: { cal, protein, carbs, fat, fiber, vitamins[], healthScore (1-10) }
// healthScore: 10=superfood, 7-9=healthy, 4-6=moderate, 1-3=indulgent

const dishes = [
  // ── North Indian Mains ────────────────────────────────────────────────
  { id:1, name:"Dal Makhani", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:260, protein:9, carbs:28, fat:13, fiber:4, gi:"low", micro:{iron:2.5,calcium:60,vitC:2,vitB12:0,folate:65}, vitamins:["Iron","Folate","B6"], healthScore:6, swap:"Use less butter/cream → Save 80 cal" },
  { id:2, name:"Rajma Curry", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:11, carbs:32, fat:5, fiber:7, gi:"low", micro:{iron:3,calcium:50,vitC:3,vitB12:0,folate:70}, vitamins:["Iron","Folate","Potassium"], healthScore:8, swap:"Already healthy! Add brown rice instead of white" },
  { id:3, name:"Chole (Chana Masala)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:240, protein:10, carbs:35, fat:6, fiber:8, gi:"low", micro:{iron:3,calcium:55,vitC:4,vitB12:0,folate:75}, vitamins:["Iron","Folate","Manganese"], healthScore:8, swap:"Skip the bhatura, pair with roti instead" },
  { id:4, name:"Paneer Butter Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:370, protein:14, carbs:18, fat:28, fiber:2, gi:"low", micro:{iron:0.8,calcium:200,vitC:2,vitB12:0.5,folate:15}, vitamins:["Calcium","B12","Phosphorus"], healthScore:4, swap:"Replace with palak paneer → Save 150 cal, gain iron" },
  { id:5, name:"Palak Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:12, carbs:10, fat:15, fiber:3, gi:"low", micro:{iron:3.5,calcium:220,vitC:8,vitB12:0.5,folate:50}, vitamins:["Iron","Calcium","Vitamin A","Vitamin K"], healthScore:7, swap:"Use tofu instead of paneer → Save 60 cal, less fat" },
  { id:6, name:"Aloo Gobi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:4, carbs:22, fat:8, fiber:4, gi:"low", micro:{iron:1.2,calcium:35,vitC:25,vitB12:0,folate:30}, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:7, swap:"Add paneer/tofu for protein boost" },
  { id:7, name:"Shahi Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:390, protein:15, carbs:16, fat:30, fiber:2, gi:"low", micro:{iron:0.8,calcium:200,vitC:1,vitB12:0.5,folate:15}, vitamins:["Calcium","B12","Phosphorus"], healthScore:3, swap:"Replace with palak paneer → Save 170 cal" },
  { id:8, name:"Matar Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:280, protein:13, carbs:18, fat:18, fiber:4, gi:"low", micro:{iron:1.5,calcium:180,vitC:12,vitB12:0.5,folate:25}, vitamins:["Calcium","Vitamin C","Iron"], healthScore:6, swap:"Use cottage cheese → Save 50 cal" },
  { id:9, name:"Aloo Matar", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:190, protein:5, carbs:28, fat:6, fiber:4, gi:"low", micro:{iron:1,calcium:25,vitC:15,vitB12:0,folate:20}, vitamins:["Vitamin C","Potassium","B6"], healthScore:6, swap:"Add sprouted moong for protein" },
  { id:10, name:"Baingan Bharta", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:3, carbs:14, fat:10, fiber:5, gi:"low", micro:{iron:0.8,calcium:20,vitC:5,vitB12:0,folate:18}, vitamins:["Fiber","Potassium","Manganese"], healthScore:8, swap:"Already healthy! Great low-cal choice" },
  { id:11, name:"Sarson Ka Saag", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:12, fat:12, fiber:4, gi:"low", micro:{iron:3,calcium:100,vitC:15,vitB12:0,folate:40}, vitamins:["Vitamin A","Vitamin K","Iron","Calcium"], healthScore:8, swap:"Use less ghee → Save 60 cal" },
  { id:12, name:"Kadhi Pakora", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:210, protein:6, carbs:18, fat:12, fiber:2, gi:"low", micro:{iron:0.8,calcium:80,vitC:2,vitB12:0.4,folate:15}, vitamins:["Calcium","B12","Probiotics"], healthScore:5, swap:"Skip pakoras, have plain kadhi → Save 80 cal" },
  { id:13, name:"Dal Tadka", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:24, fat:5, fiber:5, gi:"low", micro:{iron:2.5,calcium:40,vitC:3,vitB12:0,folate:60}, vitamins:["Iron","Folate","B6"], healthScore:8, swap:"Already nutritious! Great protein source" },
  { id:14, name:"Mixed Veg Curry", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:4, carbs:20, fat:7, fiber:5, gi:"low", micro:{iron:1.5,calcium:30,vitC:15,vitB12:0,folate:25}, vitamins:["Vitamin A","Vitamin C","Potassium"], healthScore:8, swap:"Add paneer/tofu for extra protein" },
  { id:15, name:"Malai Kofta", category:"North Indian", veg:true, serving:"2 pcs + gravy", cal:420, protein:10, carbs:28, fat:30, fiber:2, gi:"low", micro:{iron:1,calcium:180,vitC:2,vitB12:0.4,folate:15}, vitamins:["Calcium","B12"], healthScore:3, swap:"Have paneer bhurji instead → Save 200 cal" },
  { id:16, name:"Dum Aloo", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:250, protein:5, carbs:30, fat:12, fiber:3, gi:"medium", micro:{iron:0.8,calcium:20,vitC:12,vitB12:0,folate:15}, vitamins:["Vitamin C","Potassium","B6"], healthScore:5, swap:"Use sweet potato → gain fiber and Vitamin A" },
  { id:17, name:"Chana Dal", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:28, fat:3, fiber:6, gi:"low", micro:{iron:2.8,calcium:45,vitC:2,vitB12:0,folate:65}, vitamins:["Iron","Folate","Zinc"], healthScore:9, swap:"Already excellent! High protein, low fat" },
  { id:18, name:"Bhindi Masala", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:130, protein:3, carbs:12, fat:8, fiber:4, gi:"low", micro:{iron:1,calcium:30,vitC:18,vitB12:0,folate:35}, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:7, swap:"Stir-fry instead of deep fry → Save 40 cal" },
  { id:19, name:"Lauki Ki Sabzi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:90, protein:2, carbs:12, fat:4, fiber:3, gi:"low", micro:{iron:0.5,calcium:25,vitC:10,vitB12:0,folate:12}, vitamins:["Vitamin C","Calcium","Zinc"], healthScore:9, swap:"Already very low-cal and healthy!" },
  { id:20, name:"Tinda Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:100, protein:2, carbs:14, fat:4, fiber:3, gi:"low", micro:{iron:0.5,calcium:20,vitC:8,vitB12:0,folate:10}, vitamins:["Vitamin C","Calcium"], healthScore:8, swap:"Great low-cal vegetable dish" },

  // ── Non-Veg Mains ─────────────────────────────────────────────────────
  { id:21, name:"Butter Chicken", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:390, protein:28, carbs:14, fat:24, fiber:1, gi:"low", micro:{iron:1.2,calcium:30,vitC:2,vitB12:2,folate:10}, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:5, swap:"Have tandoori chicken → Save 180 cal" },
  { id:22, name:"Chicken Tikka", category:"Non-Veg", veg:false, serving:"6 pcs (180g)", cal:250, protein:32, carbs:6, fat:11, fiber:1, gi:"low", micro:{iron:1.5,calcium:20,vitC:2,vitB12:2.5,folate:8}, vitamins:["B12","Iron","Zinc","B6"], healthScore:8, swap:"Already a great high-protein choice!" },
  { id:23, name:"Tandoori Chicken", category:"Non-Veg", veg:false, serving:"2 pcs (200g)", cal:220, protein:30, carbs:4, fat:9, fiber:0, gi:"low", micro:{iron:1.5,calcium:18,vitC:1,vitB12:2.5,folate:8}, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:8, swap:"Remove skin → Save 50 cal" },
  { id:24, name:"Fish Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:230, protein:22, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:30,vitC:4,vitB12:3,folate:10}, vitamins:["Omega-3","B12","Vitamin D","Selenium"], healthScore:8, swap:"Use less oil in gravy → Save 40 cal" },
  { id:25, name:"Egg Curry", category:"Non-Veg", veg:false, serving:"2 eggs + gravy", cal:280, protein:16, carbs:12, fat:18, fiber:1, gi:"low", micro:{iron:1.8,calcium:45,vitC:3,vitB12:1.2,folate:50}, vitamins:["B12","Vitamin D","Selenium","Choline"], healthScore:7, swap:"Use 1 whole + 1 white → Save 50 cal" },
  { id:26, name:"Mutton Curry (Rogan Josh)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:350, protein:26, carbs:8, fat:24, fiber:1, gi:"low", micro:{iron:2.5,calcium:20,vitC:2,vitB12:2.8,folate:8}, vitamins:["B12","Iron","Zinc","B6"], healthScore:5, swap:"Trim visible fat → Save 80 cal" },
  { id:27, name:"Keema (Mutton Mince)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:320, protein:24, carbs:10, fat:20, fiber:2, gi:"low", micro:{iron:2.5,calcium:18,vitC:3,vitB12:2.5,folate:10}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Use chicken keema → Save 100 cal" },
  { id:28, name:"Chicken Biryani", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:450, protein:22, carbs:52, fat:16, fiber:2, gi:"medium", micro:{iron:1.5,calcium:25,vitC:2,vitB12:1.8,folate:15}, vitamins:["B12","Iron","B6","Niacin"], healthScore:5, swap:"Have chicken pulao → Save 120 cal" },
  { id:29, name:"Mutton Biryani", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:520, protein:24, carbs:50, fat:22, fiber:2, gi:"medium", micro:{iron:2,calcium:22,vitC:2,vitB12:2.5,folate:12}, vitamins:["B12","Iron","Zinc","B6"], healthScore:4, swap:"Have chicken biryani → Save 70 cal" },
  { id:30, name:"Prawn Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:200, protein:20, carbs:8, fat:10, fiber:1, gi:"low", micro:{iron:1,calcium:50,vitC:3,vitB12:2,folate:10}, vitamins:["Selenium","B12","Omega-3","Iodine"], healthScore:8, swap:"Already lean and nutritious!" },
  { id:31, name:"Fish Fry", category:"Non-Veg", veg:false, serving:"2 pcs (150g)", cal:280, protein:20, carbs:14, fat:16, fiber:0, gi:"low", micro:{iron:1,calcium:25,vitC:1,vitB12:2.5,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:6, swap:"Bake or grill → Save 80 cal" },
  { id:32, name:"Chicken Korma", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:380, protein:24, carbs:16, fat:26, fiber:1, gi:"low", micro:{iron:1.2,calcium:25,vitC:2,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Have chicken tikka masala (dry) → Save 130 cal" },
  { id:33, name:"Tandoori Fish", category:"Non-Veg", veg:false, serving:"1 fillet (180g)", cal:190, protein:26, carbs:4, fat:8, fiber:0, gi:"low", micro:{iron:1,calcium:20,vitC:1,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Vitamin D","Selenium"], healthScore:9, swap:"Already one of the healthiest options!" },

  // ── South Indian ──────────────────────────────────────────────────────
  { id:34, name:"Plain Dosa", category:"South Indian", veg:true, serving:"1 dosa (120g)", cal:170, protein:4, carbs:28, fat:5, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:1,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Have ragi dosa → gain calcium and fiber" },
  { id:35, name:"Masala Dosa", category:"South Indian", veg:true, serving:"1 dosa + filling", cal:280, protein:6, carbs:40, fat:10, fiber:3, gi:"medium", micro:{iron:1.5,calcium:18,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Vitamin C","Potassium"], healthScore:6, swap:"Have plain dosa + sambar → Save 60 cal, gain protein" },
  { id:36, name:"Idli", category:"South Indian", veg:true, serving:"3 pcs (180g)", cal:180, protein:5, carbs:36, fat:1, fiber:2, gi:"medium", micro:{iron:1.5,calcium:12,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins","Probiotics"], healthScore:8, swap:"Have ragi idli → gain calcium" },
  { id:37, name:"Medu Vada", category:"South Indian", veg:true, serving:"2 pcs (100g)", cal:260, protein:8, carbs:22, fat:16, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:1,vitB12:0,folate:30}, vitamins:["Iron","Protein","B6"], healthScore:4, swap:"Have idli instead → Save 80 cal, less oil" },
  { id:38, name:"Sambar", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:120, protein:6, carbs:18, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:35,vitC:12,vitB12:0,folate:45}, vitamins:["Iron","Folate","Vitamin C","Potassium"], healthScore:9, swap:"Already excellent! Rich in nutrients" },
  { id:39, name:"Rasam", category:"South Indian", veg:true, serving:"1 bowl (200ml)", cal:60, protein:2, carbs:10, fat:1, fiber:1, gi:"low", micro:{iron:1,calcium:15,vitC:15,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:9, swap:"Already very low-cal and healing" },
  { id:40, name:"Upma", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:210, protein:5, carbs:30, fat:8, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:1,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Use oats upma → gain fiber, save 30 cal" },
  { id:41, name:"Pongal (Ven)", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:240, protein:6, carbs:34, fat:8, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:1,vitB12:0,folate:12}, vitamins:["Iron","B vitamins","Potassium"], healthScore:6, swap:"Use less ghee → Save 50 cal" },
  { id:42, name:"Uttapam", category:"South Indian", veg:true, serving:"1 pc (150g)", cal:200, protein:5, carbs:30, fat:6, fiber:3, gi:"medium", micro:{iron:1.5,calcium:18,vitC:8,vitB12:0,folate:12}, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:7, swap:"Add more veggies for fiber" },
  { id:43, name:"Appam", category:"South Indian", veg:true, serving:"2 pcs (120g)", cal:160, protein:3, carbs:28, fat:4, fiber:1, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Pair with egg curry for protein" },
  { id:44, name:"Puttu", category:"South Indian", veg:true, serving:"1 cylinder (150g)", cal:220, protein:4, carbs:38, fat:6, fiber:3, gi:"medium", micro:{iron:1.5,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins","Fiber"], healthScore:6, swap:"Use ragi puttu → gain calcium" },
  { id:45, name:"Avial", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:4, carbs:16, fat:9, fiber:5, gi:"low", micro:{iron:1.5,calcium:40,vitC:15,vitB12:0,folate:25}, vitamins:["Vitamin A","Vitamin C","Potassium","Fiber"], healthScore:8, swap:"Already very nutritious!" },
  { id:46, name:"Thoran (Cabbage)", category:"South Indian", veg:true, serving:"1 bowl (150g)", cal:110, protein:3, carbs:10, fat:7, fiber:4, gi:"low", micro:{iron:0.8,calcium:35,vitC:20,vitB12:0,folate:20}, vitamins:["Vitamin C","Vitamin K","Fiber"], healthScore:8, swap:"Great low-cal side dish" },
  { id:47, name:"Kootu", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:140, protein:6, carbs:18, fat:5, fiber:5, gi:"low", micro:{iron:2,calcium:40,vitC:10,vitB12:0,folate:40}, vitamins:["Iron","Folate","Vitamin C"], healthScore:8, swap:"Already healthy — dal + veggies combo" },
  { id:48, name:"Curd Rice", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:220, protein:6, carbs:36, fat:5, fiber:1, gi:"high", micro:{iron:0.8,calcium:80,vitC:1,vitB12:0.5,folate:10}, vitamins:["Calcium","B12","Probiotics"], healthScore:6, swap:"Use brown rice → gain 3g fiber" },
  { id:49, name:"Lemon Rice", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:260, protein:4, carbs:42, fat:8, fiber:1, gi:"high", micro:{iron:0.8,calcium:10,vitC:12,vitB12:0,folate:8}, vitamins:["Vitamin C","B vitamins"], healthScore:5, swap:"Use brown rice → gain fiber" },
  { id:50, name:"Tamarind Rice", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:280, protein:4, carbs:44, fat:9, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Use brown rice and reduce oil" },
  { id:51, name:"Coconut Chutney", category:"South Indian", veg:true, serving:"2 tbsp (30g)", cal:50, protein:1, carbs:3, fat:4, fiber:1, gi:"low", micro:{iron:0.5,calcium:5,vitC:1,vitB12:0,folate:3}, vitamins:["Iron","Manganese"], healthScore:6, swap:"Use less coconut, add mint" },
  { id:52, name:"Tomato Chutney", category:"South Indian", veg:true, serving:"2 tbsp (30g)", cal:35, protein:1, carbs:5, fat:1, fiber:1, gi:"low", micro:{iron:0.3,calcium:5,vitC:8,vitB12:0,folate:5}, vitamins:["Vitamin C","Lycopene"], healthScore:7, swap:"Already low-cal" },
  { id:53, name:"Ragi Dosa", category:"South Indian", veg:true, serving:"1 dosa (120g)", cal:150, protein:4, carbs:26, fat:3, fiber:3, gi:"low", micro:{iron:3,calcium:200,vitC:1,vitB12:0,folate:15}, vitamins:["Calcium","Iron","Fiber"], healthScore:8, swap:"Great millet-based alternative!" },
  { id:54, name:"Pesarattu", category:"South Indian", veg:true, serving:"1 pc (150g)", cal:180, protein:8, carbs:24, fat:5, fiber:4, gi:"low", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","Protein"], healthScore:8, swap:"High-protein dosa alternative" },

  // ── Breakfast ──────────────────────────────────────────────────────────
  { id:55, name:"Poha", category:"Breakfast", veg:true, serving:"1 plate (200g)", cal:220, protein:4, carbs:36, fat:7, fiber:2, gi:"medium", micro:{iron:2,calcium:12,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","B vitamins","Vitamin C"], healthScore:7, swap:"Add peanuts & veggies for nutrition" },
  { id:56, name:"Aloo Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:280, protein:6, carbs:36, fat:12, fiber:2, gi:"medium", micro:{iron:1.2,calcium:20,vitC:8,vitB12:0,folate:12}, vitamins:["Vitamin C","B6","Potassium"], healthScore:5, swap:"Have gobhi/methi paratha → Save 40 cal, gain nutrients" },
  { id:57, name:"Paneer Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:310, protein:10, carbs:32, fat:16, fiber:2, gi:"medium", micro:{iron:1,calcium:150,vitC:1,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Phosphorus"], healthScore:5, swap:"Use low-fat paneer → Save 60 cal" },
  { id:58, name:"Methi Paratha", category:"Breakfast", veg:true, serving:"1 pc (100g)", cal:230, protein:5, carbs:30, fat:10, fiber:3, gi:"medium", micro:{iron:2.5,calcium:30,vitC:3,vitB12:0,folate:30}, vitamins:["Iron","Vitamin K","Folate"], healthScore:7, swap:"Already nutritious with methi benefits" },
  { id:59, name:"Omelette (2 eggs)", category:"Breakfast", veg:false, serving:"1 omelette", cal:190, protein:14, carbs:2, fat:14, fiber:0, gi:"low", micro:{iron:1.2,calcium:30,vitC:1,vitB12:0.6,folate:25}, vitamins:["B12","Vitamin D","Selenium","Choline"], healthScore:7, swap:"Use 1 whole + 2 whites → Save 50 cal" },
  { id:60, name:"Bread Butter (2 slices)", category:"Breakfast", veg:true, serving:"2 slices", cal:220, protein:4, carbs:28, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:20,vitC:0,vitB12:0,folate:15}, vitamins:["B vitamins"], healthScore:4, swap:"Use multigrain bread → gain fiber" },
  { id:61, name:"Cornflakes with Milk", category:"Breakfast", veg:true, serving:"1 bowl (250ml)", cal:240, protein:7, carbs:42, fat:4, fiber:1, gi:"high", micro:{iron:4,calcium:120,vitC:0,vitB12:0.3,folate:10}, vitamins:["Iron","B vitamins","Calcium"], healthScore:5, swap:"Use oats or muesli → gain fiber, less sugar" },
  { id:62, name:"Oats Porridge", category:"Breakfast", veg:true, serving:"1 bowl (200g)", cal:160, protein:6, carbs:28, fat:3, fiber:4, gi:"medium", micro:{iron:2,calcium:15,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","Manganese","Phosphorus","Fiber"], healthScore:9, swap:"Already one of the healthiest breakfasts!" },
  { id:63, name:"Besan Chilla", category:"Breakfast", veg:true, serving:"2 pcs (150g)", cal:200, protein:10, carbs:22, fat:8, fiber:4, gi:"low", micro:{iron:2.5,calcium:20,vitC:2,vitB12:0,folate:45}, vitamins:["Iron","Folate","Protein"], healthScore:8, swap:"Already high-protein, low-cal" },
  { id:64, name:"Moong Dal Chilla", category:"Breakfast", veg:true, serving:"2 pcs (150g)", cal:180, protein:12, carbs:20, fat:5, fiber:4, gi:"low", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","Protein","B6"], healthScore:9, swap:"Excellent protein-rich breakfast!" },
  { id:65, name:"Sabudana Khichdi", category:"Breakfast", veg:true, serving:"1 plate (200g)", cal:300, protein:4, carbs:50, fat:10, fiber:1, gi:"high", micro:{iron:0.5,calcium:15,vitC:1,vitB12:0,folate:5}, vitamins:["Potassium","Calcium"], healthScore:4, swap:"Have oats khichdi → Save 100 cal, gain fiber" },
  { id:66, name:"Rava Idli", category:"Breakfast", veg:true, serving:"3 pcs (180g)", cal:190, protein:5, carbs:32, fat:4, fiber:2, gi:"medium", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Add vegetables to batter" },
  { id:67, name:"Dhokla", category:"Breakfast", veg:true, serving:"4 pcs (150g)", cal:160, protein:6, carbs:24, fat:4, fiber:2, gi:"low", micro:{iron:2,calcium:15,vitC:1,vitB12:0,folate:30}, vitamins:["Iron","Probiotics","B vitamins"], healthScore:8, swap:"Already steamed and healthy!" },
  { id:68, name:"Thepla", category:"Breakfast", veg:true, serving:"2 pcs (100g)", cal:220, protein:5, carbs:28, fat:10, fiber:3, gi:"medium", micro:{iron:2.5,calcium:25,vitC:3,vitB12:0,folate:30}, vitamins:["Iron","Folate","Vitamin K"], healthScore:7, swap:"Great travel-friendly healthy option" },
  { id:69, name:"Misal Pav", category:"Breakfast", veg:true, serving:"1 plate (250g)", cal:350, protein:12, carbs:42, fat:14, fiber:6, gi:"medium", micro:{iron:2.5,calcium:30,vitC:5,vitB12:0,folate:35}, vitamins:["Iron","Protein","B vitamins"], healthScore:6, swap:"Skip pav, have with brown rice → Save 100 cal" },
  { id:70, name:"Boiled Eggs (2)", category:"Breakfast", veg:false, serving:"2 eggs", cal:150, protein:12, carbs:1, fat:10, fiber:0, gi:"low", micro:{iron:1.2,calcium:30,vitC:0,vitB12:1.2,folate:25}, vitamins:["B12","Vitamin D","Selenium","Choline"], healthScore:8, swap:"Great portable protein source!" },

  // ── Rice / Breads ─────────────────────────────────────────────────────
  { id:71, name:"White Rice (Steamed)", category:"Rice/Breads", veg:true, serving:"1 bowl (150g cooked)", cal:180, protein:3, carbs:40, fat:0.5, fiber:0.5, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:10}, vitamins:["B vitamins","Manganese"], healthScore:5, swap:"Switch to brown rice → Save 20 cal, gain 3g fiber" },
  { id:72, name:"Brown Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (150g cooked)", cal:160, protein:4, carbs:34, fat:1.5, fiber:3, gi:"medium", micro:{iron:1,calcium:12,vitC:0,vitB12:0,folate:12}, vitamins:["Manganese","Selenium","Magnesium","Fiber"], healthScore:8, swap:"Already a healthier rice choice!" },
  { id:73, name:"Jeera Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (200g)", cal:220, protein:4, carbs:38, fat:6, fiber:1, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Use brown rice + jeera → gain fiber" },
  { id:74, name:"Veg Pulao", category:"Rice/Breads", veg:true, serving:"1 plate (250g)", cal:280, protein:5, carbs:44, fat:8, fiber:3, gi:"high", micro:{iron:1,calcium:15,vitC:6,vitB12:0,folate:10}, vitamins:["Vitamin A","Vitamin C","B vitamins"], healthScore:6, swap:"Use brown rice → gain fiber" },
  { id:75, name:"Veg Biryani", category:"Rice/Breads", veg:true, serving:"1 plate (300g)", cal:340, protein:7, carbs:50, fat:12, fiber:3, gi:"medium", micro:{iron:1.2,calcium:20,vitC:4,vitB12:0,folate:12}, vitamins:["Vitamin A","Iron","B vitamins"], healthScore:5, swap:"Have veg pulao → Save 60 cal" },
  { id:76, name:"Roti (Chapati)", category:"Rice/Breads", veg:true, serving:"1 pc (30g dry)", cal:80, protein:3, carbs:16, fat:1, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins","Fiber"], healthScore:8, swap:"Already a healthy staple!" },
  { id:77, name:"Naan", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:260, protein:7, carbs:42, fat:6, fiber:2, gi:"high", micro:{iron:1.5,calcium:18,vitC:0,vitB12:0,folate:15}, vitamins:["B vitamins","Iron"], healthScore:4, swap:"Have tandoori roti → Save 120 cal" },
  { id:78, name:"Butter Naan", category:"Rice/Breads", veg:true, serving:"1 pc (90g)", cal:310, protein:7, carbs:44, fat:12, fiber:2, gi:"high", micro:{iron:1.5,calcium:18,vitC:0,vitB12:0,folate:15}, vitamins:["B vitamins"], healthScore:3, swap:"Have plain roti → Save 230 cal" },
  { id:79, name:"Plain Paratha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:220, protein:4, carbs:28, fat:10, fiber:2, gi:"medium", micro:{iron:1.2,calcium:15,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Have roti → Save 140 cal" },
  { id:80, name:"Puri", category:"Rice/Breads", veg:true, serving:"2 pcs (60g)", cal:240, protein:4, carbs:28, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have roti → Save 160 cal, avoid deep frying" },
  { id:81, name:"Bhatura", category:"Rice/Breads", veg:true, serving:"1 pc (100g)", cal:310, protein:6, carbs:40, fat:14, fiber:1, gi:"high", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:10}, vitamins:["B vitamins","Iron"], healthScore:3, swap:"Have roti/kulcha → Save 180 cal" },
  { id:82, name:"Tandoori Roti", category:"Rice/Breads", veg:true, serving:"1 pc (40g)", cal:100, protein:3, carbs:20, fat:1, fiber:2, gi:"medium", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins","Fiber"], healthScore:8, swap:"Already healthy — no oil used" },
  { id:83, name:"Makki Ki Roti", category:"Rice/Breads", veg:true, serving:"1 pc (60g)", cal:120, protein:3, carbs:24, fat:2, fiber:3, gi:"medium", micro:{iron:1.5,calcium:8,vitC:0,vitB12:0,folate:8}, vitamins:["Fiber","Iron","Vitamin A"], healthScore:7, swap:"Great gluten-free option" },
  { id:84, name:"Missi Roti", category:"Rice/Breads", veg:true, serving:"1 pc (50g)", cal:110, protein:5, carbs:18, fat:2, fiber:3, gi:"medium", micro:{iron:2,calcium:15,vitC:1,vitB12:0,folate:25}, vitamins:["Iron","Protein","Folate"], healthScore:8, swap:"High-protein roti — great choice!" },
  { id:85, name:"Bajra Roti", category:"Rice/Breads", veg:true, serving:"1 pc (50g)", cal:100, protein:3, carbs:20, fat:2, fiber:3, gi:"medium", micro:{iron:2.5,calcium:20,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","Magnesium","Fiber"], healthScore:8, swap:"Excellent millet choice!" },
  { id:86, name:"Kulcha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:240, protein:6, carbs:36, fat:8, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:12}, vitamins:["B vitamins","Iron"], healthScore:4, swap:"Have tandoori roti → Save 140 cal" },

  // ── Snacks ────────────────────────────────────────────────────────────
  { id:87, name:"Samosa", category:"Snacks", veg:true, serving:"1 pc (80g)", cal:250, protein:4, carbs:28, fat:14, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Potassium","Vitamin C"], healthScore:3, swap:"Have baked samosa → Save 80 cal" },
  { id:88, name:"Pakora (Mixed Veg)", category:"Snacks", veg:true, serving:"5 pcs (100g)", cal:280, protein:5, carbs:24, fat:18, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Vitamin C"], healthScore:3, swap:"Air-fry pakoras → Save 100 cal" },
  { id:89, name:"Bhel Puri", category:"Snacks", veg:true, serving:"1 plate (150g)", cal:180, protein:4, carbs:30, fat:5, fiber:3, gi:"medium", micro:{iron:1.5,calcium:10,vitC:6,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Already a lighter snack option!" },
  { id:90, name:"Sev Puri", category:"Snacks", veg:true, serving:"6 pcs (120g)", cal:220, protein:4, carbs:28, fat:10, fiber:2, gi:"medium", micro:{iron:1.2,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Have bhel puri → Save 40 cal" },
  { id:91, name:"Pani Puri", category:"Snacks", veg:true, serving:"6 pcs", cal:150, protein:3, carbs:26, fat:4, fiber:2, gi:"high", micro:{iron:1,calcium:8,vitC:5,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron"], healthScore:5, swap:"Use sprout filling → gain protein" },
  { id:92, name:"Vada Pav", category:"Snacks", veg:true, serving:"1 pc", cal:310, protein:6, carbs:38, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:6,vitB12:0,folate:8}, vitamins:["Potassium","Vitamin C"], healthScore:3, swap:"Have dabeli instead → Save 80 cal, gain nutrients" },
  { id:93, name:"Pav Bhaji", category:"Snacks", veg:true, serving:"1 plate (2 pav)", cal:420, protein:10, carbs:52, fat:18, fiber:4, gi:"high", micro:{iron:1.5,calcium:20,vitC:12,vitB12:0,folate:15}, vitamins:["Vitamin A","Vitamin C","Iron"], healthScore:4, swap:"Skip 1 pav, add extra bhaji → Save 120 cal" },
  { id:94, name:"Aloo Tikki Chaat", category:"Snacks", veg:true, serving:"2 pcs + chutney", cal:280, protein:5, carbs:34, fat:14, fiber:3, gi:"high", micro:{iron:1,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Potassium","Vitamin C"], healthScore:4, swap:"Have sprout chaat → Save 100 cal, gain protein" },
  { id:95, name:"Momos (Veg Steamed)", category:"Snacks", veg:true, serving:"6 pcs", cal:180, protein:5, carbs:28, fat:5, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:4,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Already steamed — avoid fried momos" },
  { id:96, name:"Momos (Chicken Steamed)", category:"Snacks", veg:false, serving:"6 pcs", cal:220, protein:12, carbs:24, fat:8, fiber:1, gi:"medium", micro:{iron:1,calcium:10,vitC:2,vitB12:1,folate:6}, vitamins:["B12","Iron","B6"], healthScore:6, swap:"Good protein snack — avoid fried" },
  { id:97, name:"Momos (Fried)", category:"Snacks", veg:true, serving:"6 pcs", cal:310, protein:5, carbs:30, fat:18, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:3,vitB12:0,folate:8}, vitamins:["Iron"], healthScore:3, swap:"Have steamed momos → Save 130 cal" },
  { id:98, name:"Maggi Noodles", category:"Snacks", veg:true, serving:"1 pack (70g)", cal:310, protein:7, carbs:42, fat:13, fiber:2, gi:"high", micro:{iron:2,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have oats or poha → Save 100 cal, gain nutrition" },
  { id:99, name:"Dahi Puri", category:"Snacks", veg:true, serving:"6 pcs", cal:200, protein:5, carbs:28, fat:7, fiber:2, gi:"high", micro:{iron:0.8,calcium:40,vitC:3,vitB12:0.3,folate:8}, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:5, swap:"Good — has probiotics from dahi" },
  { id:100, name:"Kachori", category:"Snacks", veg:true, serving:"1 pc (80g)", cal:290, protein:5, carbs:30, fat:16, fiber:2, gi:"high", micro:{iron:1.5,calcium:10,vitC:1,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have baked kachori → Save 100 cal" },
  { id:101, name:"Dabeli", category:"Snacks", veg:true, serving:"1 pc", cal:230, protein:5, carbs:32, fat:9, fiber:3, gi:"medium", micro:{iron:1,calcium:12,vitC:5,vitB12:0,folate:10}, vitamins:["Potassium","Iron","Vitamin C"], healthScore:5, swap:"Lighter than vada pav" },
  { id:102, name:"Spring Roll (Fried)", category:"Snacks", veg:true, serving:"2 pcs", cal:260, protein:4, carbs:28, fat:14, fiber:2, gi:"high", micro:{iron:0.5,calcium:8,vitC:4,vitB12:0,folate:5}, vitamins:["Vitamin C"], healthScore:3, swap:"Bake instead of fry → Save 80 cal" },
  { id:103, name:"Bread Pakora", category:"Snacks", veg:true, serving:"2 pcs", cal:320, protein:6, carbs:32, fat:18, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:1,vitB12:0,folate:8}, vitamins:["Iron"], healthScore:2, swap:"Have besan chilla → Save 120 cal, gain protein" },
  { id:104, name:"Sprout Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:120, protein:8, carbs:18, fat:2, fiber:5, gi:"low", micro:{iron:2.5,calcium:25,vitC:12,vitB12:0,folate:60}, vitamins:["Iron","Folate","Vitamin C","Protein"], healthScore:9, swap:"Already one of the healthiest snacks!" },
  { id:105, name:"Roasted Chana", category:"Snacks", veg:true, serving:"50g", cal:180, protein:9, carbs:28, fat:3, fiber:5, gi:"low", micro:{iron:2.5,calcium:30,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","Manganese"], healthScore:8, swap:"Great healthy snack!" },
  { id:106, name:"Makhana (Fox Nuts)", category:"Snacks", veg:true, serving:"50g roasted", cal:180, protein:5, carbs:32, fat:3, fiber:2, gi:"low", micro:{iron:0.8,calcium:40,vitC:0,vitB12:0,folate:5}, vitamins:["Calcium","Magnesium","Potassium"], healthScore:8, swap:"Excellent low-cal snack!" },

  // ── Sweets ────────────────────────────────────────────────────────────
  { id:107, name:"Gulab Jamun", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:300, protein:4, carbs:44, fat:12, fiber:0, gi:"high", micro:{iron:0.5,calcium:40,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium"], healthScore:2, swap:"Have 1 pc only → Save 150 cal" },
  { id:108, name:"Rasgulla", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:180, protein:4, carbs:36, fat:2, fiber:0, gi:"high", micro:{iron:0.3,calcium:50,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium"], healthScore:4, swap:"Lower fat than gulab jamun — better choice" },
  { id:109, name:"Jalebi", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:250, protein:2, carbs:40, fat:10, fiber:0, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Have a fruit instead → Save 200 cal" },
  { id:110, name:"Sooji Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:280, protein:3, carbs:36, fat:14, fiber:1, gi:"high", micro:{iron:1.5,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Make with less sugar/ghee → Save 100 cal" },
  { id:111, name:"Moong Dal Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:350, protein:6, carbs:38, fat:20, fiber:2, gi:"high", micro:{iron:2,calcium:20,vitC:0,vitB12:0,folate:25}, vitamins:["Iron","Folate"], healthScore:3, swap:"Have in small portions — nutrient dense" },
  { id:112, name:"Gajar Ka Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:260, protein:4, carbs:32, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:45,vitC:3,vitB12:0.2,folate:10}, vitamins:["Vitamin A","Calcium","Iron"], healthScore:4, swap:"Use jaggery instead of sugar → gain iron" },
  { id:113, name:"Kheer (Rice)", category:"Sweets", veg:true, serving:"1 bowl (150g)", cal:240, protein:6, carbs:36, fat:8, fiber:0, gi:"high", micro:{iron:0.5,calcium:80,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","B12"], healthScore:4, swap:"Use low-fat milk → Save 60 cal" },
  { id:114, name:"Besan Ladoo", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:280, protein:6, carbs:28, fat:16, fiber:2, gi:"high", micro:{iron:2,calcium:15,vitC:0,vitB12:0,folate:30}, vitamins:["Iron","Protein","Folate"], healthScore:3, swap:"Have 1 ladoo → Save 140 cal" },
  { id:115, name:"Barfi (Kaju)", category:"Sweets", veg:true, serving:"2 pcs (50g)", cal:260, protein:4, carbs:30, fat:14, fiber:1, gi:"high", micro:{iron:0.8,calcium:12,vitC:0,vitB12:0,folate:5}, vitamins:["Magnesium","Copper"], healthScore:3, swap:"Have 1 small pc → Save 130 cal" },
  { id:116, name:"Rasmalai", category:"Sweets", veg:true, serving:"2 pcs (100g)", cal:220, protein:6, carbs:28, fat:10, fiber:0, gi:"high", micro:{iron:0.3,calcium:60,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","B12"], healthScore:4, swap:"Lower fat than gulab jamun — better choice" },
  { id:117, name:"Sandesh", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:160, protein:5, carbs:22, fat:6, fiber:0, gi:"high", micro:{iron:0.3,calcium:50,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium"], healthScore:5, swap:"Lower cal Bengali sweet — good choice" },
  { id:118, name:"Mysore Pak", category:"Sweets", veg:true, serving:"1 pc (50g)", cal:280, protein:3, carbs:24, fat:20, fiber:1, gi:"high", micro:{iron:1.5,calcium:10,vitC:0,vitB12:0,folate:10}, vitamins:["Iron"], healthScore:2, swap:"Very high in ghee — have sandesh instead" },
  { id:119, name:"Phirni", category:"Sweets", veg:true, serving:"1 bowl (120g)", cal:200, protein:4, carbs:30, fat:7, fiber:0, gi:"high", micro:{iron:0.5,calcium:60,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium","B vitamins"], healthScore:4, swap:"Use low-fat milk → Save 40 cal" },
  { id:120, name:"Malpua", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:320, protein:4, carbs:38, fat:16, fiber:1, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:2, swap:"Have sandesh → Save 160 cal" },

  // ── Drinks ────────────────────────────────────────────────────────────
  { id:121, name:"Chai (with sugar & milk)", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:80, protein:2, carbs:12, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","Antioxidants"], healthScore:5, swap:"Skip sugar → Save 40 cal" },
  { id:122, name:"Black Coffee", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:5, protein:0, carbs:1, fat:0, fiber:0, gi:"low", micro:{iron:0.1,calcium:2,vitC:0,vitB12:0,folate:1}, vitamins:["Antioxidants","Magnesium"], healthScore:8, swap:"Already zero-cal!" },
  { id:123, name:"Filter Coffee (South Indian)", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:90, protein:2, carbs:10, fat:4, fiber:0, gi:"low", micro:{iron:0.2,calcium:50,vitC:0,vitB12:0.2,folate:2}, vitamins:["Calcium","Antioxidants"], healthScore:5, swap:"Use less sugar → Save 30 cal" },
  { id:124, name:"Sweet Lassi", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:180, protein:5, carbs:28, fat:5, fiber:0, gi:"medium", micro:{iron:0.3,calcium:120,vitC:2,vitB12:0.5,folate:8}, vitamins:["Calcium","B12","Probiotics"], healthScore:5, swap:"Have chaas/buttermilk → Save 120 cal" },
  { id:125, name:"Salt Lassi", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:80, protein:5, carbs:6, fat:4, fiber:0, gi:"low", micro:{iron:0.2,calcium:120,vitC:1,vitB12:0.5,folate:5}, vitamins:["Calcium","B12","Probiotics"], healthScore:8, swap:"Already healthy and probiotic-rich!" },
  { id:126, name:"Buttermilk (Chaas)", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:40, protein:3, carbs:4, fat:1, fiber:0, gi:"low", micro:{iron:0.2,calcium:80,vitC:1,vitB12:0.3,folate:3}, vitamins:["Calcium","B12","Probiotics"], healthScore:9, swap:"Excellent digestive drink — very low cal!" },
  { id:127, name:"Nimbu Pani (Lemonade)", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:60, protein:0, carbs:15, fat:0, fiber:0, gi:"medium", micro:{iron:0.3,calcium:5,vitC:20,vitB12:0,folate:3}, vitamins:["Vitamin C","Electrolytes"], healthScore:7, swap:"Use less sugar/honey → Save 30 cal" },
  { id:128, name:"Sugarcane Juice", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:180, protein:0, carbs:45, fat:0, fiber:0, gi:"high", micro:{iron:1,calcium:15,vitC:3,vitB12:0,folate:5}, vitamins:["Iron","Potassium","Magnesium"], healthScore:4, swap:"Have coconut water → Save 130 cal" },
  { id:129, name:"Mango Shake", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:250, protein:5, carbs:42, fat:7, fiber:1, gi:"medium", micro:{iron:0.5,calcium:100,vitC:15,vitB12:0.3,folate:10}, vitamins:["Vitamin A","Vitamin C","Calcium"], healthScore:4, swap:"Blend mango + water (no sugar) → Save 80 cal" },
  { id:130, name:"Coconut Water", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:45, protein:1, carbs:10, fat:0, fiber:0, gi:"low", micro:{iron:0.3,calcium:15,vitC:3,vitB12:0,folate:5}, vitamins:["Potassium","Magnesium","Electrolytes"], healthScore:9, swap:"Best natural hydration drink!" },
  { id:131, name:"Banana Shake", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:220, protein:6, carbs:36, fat:6, fiber:2, gi:"medium", micro:{iron:0.5,calcium:100,vitC:5,vitB12:0.3,folate:12}, vitamins:["Potassium","Calcium","B6"], healthScore:5, swap:"Use low-fat milk → Save 40 cal" },
  { id:132, name:"Badam Milk", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:180, protein:7, carbs:22, fat:7, fiber:1, gi:"medium", micro:{iron:0.8,calcium:150,vitC:1,vitB12:0.3,folate:8}, vitamins:["Vitamin E","Calcium","Magnesium"], healthScore:6, swap:"Use less sugar → Save 40 cal" },
  { id:133, name:"Thandai", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:220, protein:6, carbs:28, fat:9, fiber:1, gi:"medium", micro:{iron:1.5,calcium:120,vitC:2,vitB12:0.3,folate:10}, vitamins:["Calcium","Iron","Magnesium"], healthScore:5, swap:"Use less sugar → Save 50 cal" },
  { id:134, name:"Aam Panna", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:90, protein:0, carbs:22, fat:0, fiber:1, gi:"low", micro:{iron:0.5,calcium:8,vitC:20,vitB12:0,folate:5}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:7, swap:"Great summer coolant!" },
  { id:135, name:"Jaljeera", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:30, protein:0, carbs:7, fat:0, fiber:0, gi:"low", micro:{iron:0.5,calcium:5,vitC:8,vitB12:0,folate:3}, vitamins:["Iron","Vitamin C","Digestive spices"], healthScore:8, swap:"Very low-cal digestive drink!" },
  { id:136, name:"Green Tea", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:2, protein:0, carbs:0, fat:0, fiber:0, gi:"low", micro:{iron:0.1,calcium:2,vitC:0,vitB12:0,folate:1}, vitamins:["Antioxidants","L-Theanine"], healthScore:9, swap:"Zero cal! Great for metabolism" },

  // ── Dal Varieties ─────────────────────────────────────────────────────
  { id:137, name:"Toor Dal (Arhar)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:26, fat:2, fiber:5, gi:"low", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:60}, vitamins:["Iron","Folate","Potassium","B6"], healthScore:9, swap:"Already excellent! Protein-rich staple" },
  { id:138, name:"Moong Dal (Yellow)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:150, protein:10, carbs:22, fat:1, fiber:4, gi:"low", micro:{iron:2,calcium:35,vitC:1,vitB12:0,folate:55}, vitamins:["Iron","Folate","Manganese","B6"], healthScore:9, swap:"Lightest and most digestible dal!" },
  { id:139, name:"Masoor Dal (Red Lentil)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:160, protein:10, carbs:24, fat:1, fiber:5, gi:"low", micro:{iron:3,calcium:30,vitC:1,vitB12:0,folate:60}, vitamins:["Iron","Folate","Manganese"], healthScore:9, swap:"Excellent iron source!" },
  { id:140, name:"Chana Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:28, fat:3, fiber:6, gi:"low", micro:{iron:2.8,calcium:45,vitC:2,vitB12:0,folate:65}, vitamins:["Iron","Folate","Zinc","Manganese"], healthScore:9, swap:"High fiber, low GI — great for diabetics" },
  { id:141, name:"Urad Dal (Black Gram)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:200, protein:11, carbs:28, fat:3, fiber:5, gi:"low", micro:{iron:3,calcium:50,vitC:1,vitB12:0,folate:55}, vitamins:["Iron","Folate","Magnesium","Potassium"], healthScore:8, swap:"Very nutritious but heavier to digest" },
  { id:142, name:"Dal Fry", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:24, fat:6, fiber:4, gi:"low", micro:{iron:2.5,calcium:35,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","B6"], healthScore:7, swap:"Use less tadka oil → Save 30 cal" },
  { id:143, name:"Dal Palak", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:22, fat:4, fiber:5, gi:"low", micro:{iron:3.5,calcium:80,vitC:10,vitB12:0,folate:60}, vitamins:["Iron","Vitamin A","Folate","Calcium"], healthScore:9, swap:"Best of both worlds — dal + greens!" },
  { id:144, name:"Whole Moong Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:180, protein:12, carbs:26, fat:2, fiber:6, gi:"low", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:60}, vitamins:["Iron","Folate","Manganese","Fiber"], healthScore:9, swap:"Highest protein dal variety!" },
  { id:145, name:"Panchmel Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:185, protein:11, carbs:26, fat:3, fiber:5, gi:"low", micro:{iron:2.8,calcium:42,vitC:2,vitB12:0,folate:62}, vitamins:["Iron","Folate","Zinc","Multiple minerals"], healthScore:9, swap:"Great variety of nutrients from mixed dals!" },

  // ── More North Indian / Paneer ────────────────────────────────────────
  { id:146, name:"Paneer Bhurji", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:260, protein:16, carbs:6, fat:20, fiber:1, gi:"low", micro:{iron:0.8,calcium:180,vitC:2,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Phosphorus"], healthScore:6, swap:"Use low-fat paneer → Save 70 cal" },
  { id:147, name:"Paneer Tikka", category:"North Indian", veg:true, serving:"6 pcs (150g)", cal:280, protein:16, carbs:8, fat:20, fiber:1, gi:"low", micro:{iron:0.8,calcium:200,vitC:3,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Phosphorus"], healthScore:6, swap:"Grill instead of tandoor with less oil" },
  { id:148, name:"Kadai Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:340, protein:14, carbs:14, fat:26, fiber:2, gi:"low", micro:{iron:1,calcium:190,vitC:8,vitB12:0.5,folate:15}, vitamins:["Calcium","Vitamin C","B12"], healthScore:5, swap:"Have palak paneer → Save 120 cal" },
  { id:149, name:"Paneer Do Pyaza", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:310, protein:14, carbs:16, fat:22, fiber:2, gi:"low", micro:{iron:1,calcium:180,vitC:5,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Quercetin"], healthScore:5, swap:"Use less oil → Save 60 cal" },
  { id:150, name:"Mushroom Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:6, carbs:14, fat:9, fiber:3, gi:"low", micro:{iron:1,calcium:5,vitC:3,vitB12:0,folate:15}, vitamins:["Selenium","B vitamins","Vitamin D"], healthScore:7, swap:"Already low-cal and nutritious!" },

  // ── More Snacks / Street ──────────────────────────────────────────────
  { id:151, name:"Chole Bhature", category:"Snacks", veg:true, serving:"2 bhature + chole", cal:550, protein:14, carbs:62, fat:26, fiber:6, gi:"high", micro:{iron:3,calcium:55,vitC:4,vitB12:0,folate:70}, vitamins:["Iron","Folate","Protein"], healthScore:3, swap:"Have chole with roti → Save 250 cal" },
  { id:152, name:"Aloo Chaat", category:"Snacks", veg:true, serving:"1 plate (150g)", cal:220, protein:3, carbs:30, fat:10, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:10,vitB12:0,folate:8}, vitamins:["Vitamin C","Potassium"], healthScore:4, swap:"Have sprout chaat → Save 100 cal" },
  { id:153, name:"Papdi Chaat", category:"Snacks", veg:true, serving:"1 plate (150g)", cal:250, protein:5, carbs:32, fat:11, fiber:2, gi:"high", micro:{iron:0.8,calcium:30,vitC:5,vitB12:0.2,folate:8}, vitamins:["Calcium","Vitamin C"], healthScore:4, swap:"Have bhel puri → Save 70 cal" },
  { id:154, name:"Ragda Pattice", category:"Snacks", veg:true, serving:"2 pcs + ragda", cal:300, protein:8, carbs:40, fat:12, fiber:4, gi:"high", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Potassium","Vitamin C"], healthScore:4, swap:"Have sprout chaat → Save 180 cal" },
  { id:155, name:"Onion Bhaji", category:"Snacks", veg:true, serving:"4 pcs (80g)", cal:220, protein:4, carbs:20, fat:14, fiber:2, gi:"medium", micro:{iron:0.8,calcium:12,vitC:6,vitB12:0,folate:10}, vitamins:["Quercetin","Vitamin C"], healthScore:3, swap:"Air-fry → Save 80 cal" },
  { id:156, name:"Paneer Tikka Roll", category:"Snacks", veg:true, serving:"1 roll", cal:350, protein:14, carbs:36, fat:16, fiber:2, gi:"medium", micro:{iron:1,calcium:160,vitC:5,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Vitamin C"], healthScore:5, swap:"Use roomali roti → Save 50 cal" },
  { id:157, name:"Chicken Tikka Roll", category:"Snacks", veg:false, serving:"1 roll", cal:320, protein:18, carbs:34, fat:12, fiber:2, gi:"medium", micro:{iron:1.2,calcium:20,vitC:3,vitB12:1.5,folate:10}, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Good protein-to-cal ratio" },

  // ── Egg Dishes ────────────────────────────────────────────────────────
  { id:158, name:"Egg Bhurji", category:"Non-Veg", veg:false, serving:"2 eggs scrambled", cal:210, protein:14, carbs:4, fat:16, fiber:0, gi:"low", micro:{iron:1.5,calcium:35,vitC:2,vitB12:1.2,folate:25}, vitamins:["B12","Selenium","Choline","Vitamin D"], healthScore:7, swap:"Use 1 whole + 2 whites → Save 60 cal" },
  { id:159, name:"Anda Curry", category:"Non-Veg", veg:false, serving:"2 eggs + gravy", cal:280, protein:16, carbs:12, fat:18, fiber:1, gi:"low", micro:{iron:1.8,calcium:45,vitC:3,vitB12:1.2,folate:30}, vitamins:["B12","Vitamin D","Selenium"], healthScore:7, swap:"Light gravy version → Save 50 cal" },
  { id:160, name:"Egg Biryani", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:380, protein:16, carbs:48, fat:14, fiber:2, gi:"medium", micro:{iron:1.5,calcium:35,vitC:1,vitB12:1,folate:20}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Have egg fried rice (less) → Save 80 cal" },

  // ── More Regional ─────────────────────────────────────────────────────
  { id:161, name:"Undhiyu", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:260, protein:7, carbs:28, fat:14, fiber:6, gi:"low", micro:{iron:2,calcium:40,vitC:10,vitB12:0,folate:30}, vitamins:["Vitamin A","Iron","Fiber"], healthScore:6, swap:"Very nutritious Gujarati dish" },
  { id:162, name:"Handvo", category:"Breakfast", veg:true, serving:"1 slice (100g)", cal:170, protein:6, carbs:24, fat:5, fiber:3, gi:"low", micro:{iron:2,calcium:20,vitC:3,vitB12:0,folate:25}, vitamins:["Iron","B vitamins","Protein"], healthScore:7, swap:"Healthy Gujarati snack!" },
  { id:163, name:"Khandvi", category:"Snacks", veg:true, serving:"6 pcs (100g)", cal:140, protein:6, carbs:18, fat:5, fiber:2, gi:"low", micro:{iron:2,calcium:15,vitC:1,vitB12:0,folate:30}, vitamins:["Folate","Iron","Protein"], healthScore:7, swap:"Healthy steamed snack!" },
  { id:164, name:"Patra", category:"Snacks", veg:true, serving:"4 pcs (100g)", cal:150, protein:3, carbs:22, fat:6, fiber:3, gi:"low", micro:{iron:1.5,calcium:60,vitC:5,vitB12:0,folate:20}, vitamins:["Vitamin A","Iron","Calcium"], healthScore:7, swap:"Steamed version is healthier" },
  { id:165, name:"Litti Chokha", category:"North Indian", veg:true, serving:"2 litti + chokha", cal:380, protein:10, carbs:52, fat:14, fiber:5, gi:"medium", micro:{iron:3,calcium:30,vitC:5,vitB12:0,folate:40}, vitamins:["Iron","Folate","Fiber"], healthScore:6, swap:"Baked not fried — decent option" },
  { id:166, name:"Pindi Chole", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:230, protein:10, carbs:34, fat:6, fiber:7, gi:"low", micro:{iron:3,calcium:50,vitC:4,vitB12:0,folate:70}, vitamins:["Iron","Folate","Manganese"], healthScore:7, swap:"Dry style = less oil than curry" },

  // ── Non-Veg extras ────────────────────────────────────────────────────
  { id:167, name:"Chicken Tikka Masala", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:340, protein:26, carbs:14, fat:20, fiber:1, gi:"low", micro:{iron:1.5,calcium:25,vitC:3,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:5, swap:"Have plain chicken tikka → Save 90 cal" },
  { id:168, name:"Chicken Do Pyaza", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:300, protein:24, carbs:12, fat:18, fiber:2, gi:"low", micro:{iron:1.2,calcium:22,vitC:5,vitB12:1.8,folate:10}, vitamins:["B12","Iron","Quercetin"], healthScore:6, swap:"Good balance of protein and flavor" },
  { id:169, name:"Palak Chicken", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:260, protein:26, carbs:8, fat:14, fiber:3, gi:"low", micro:{iron:3.5,calcium:80,vitC:10,vitB12:2,folate:40}, vitamins:["Iron","Vitamin A","B12","Zinc"], healthScore:7, swap:"Great combo of protein + iron!" },
  { id:170, name:"Chicken Curry (Home-style)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:1, gi:"low", micro:{iron:1.2,calcium:18,vitC:3,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc","B6"], healthScore:6, swap:"Use skinless chicken → Save 50 cal" },
  { id:171, name:"Mutton Keema Pav", category:"Non-Veg", veg:false, serving:"1 plate", cal:450, protein:22, carbs:38, fat:22, fiber:2, gi:"high", micro:{iron:2.5,calcium:20,vitC:2,vitB12:2.5,folate:10}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Skip pav, eat with roti → Save 120 cal" },
  { id:172, name:"Seekh Kebab", category:"Non-Veg", veg:false, serving:"4 pcs (120g)", cal:240, protein:20, carbs:6, fat:16, fiber:1, gi:"low", micro:{iron:2,calcium:15,vitC:2,vitB12:2.5,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Chicken seekh → Save 50 cal vs mutton" },
  { id:173, name:"Galouti Kebab", category:"Non-Veg", veg:false, serving:"4 pcs (100g)", cal:280, protein:18, carbs:8, fat:20, fiber:0, gi:"low", micro:{iron:2,calcium:12,vitC:1,vitB12:2.5,folate:5}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Have chicken tikka → Save 30 cal, more protein" },
  { id:174, name:"Reshmi Kebab", category:"Non-Veg", veg:false, serving:"4 pcs (120g)", cal:220, protein:22, carbs:6, fat:12, fiber:0, gi:"low", micro:{iron:1,calcium:15,vitC:1,vitB12:2,folate:6}, vitamins:["B12","Iron","B6"], healthScore:7, swap:"Great lean protein source!" },
  { id:175, name:"Nihari", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:420, protein:28, carbs:12, fat:28, fiber:1, gi:"low", micro:{iron:3.5,calcium:25,vitC:1,vitB12:3,folate:8}, vitamins:["B12","Iron","Collagen"], healthScore:4, swap:"Have in small portions — very rich" },

  // ── More Rice Dishes ──────────────────────────────────────────────────
  { id:176, name:"Khichdi", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:200, protein:7, carbs:32, fat:4, fiber:3, gi:"medium", micro:{iron:2,calcium:25,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","B vitamins","Potassium"], healthScore:8, swap:"Already comfort food that's healthy!" },
  { id:177, name:"Tomato Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:250, protein:4, carbs:40, fat:7, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:10,vitB12:0,folate:8}, vitamins:["Lycopene","Vitamin C"], healthScore:5, swap:"Use brown rice → gain fiber" },
  { id:178, name:"Coconut Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:300, protein:5, carbs:42, fat:12, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","Manganese"], healthScore:4, swap:"Use less coconut → Save 60 cal" },
  { id:179, name:"Bisi Bele Bath", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:280, protein:8, carbs:40, fat:8, fiber:4, gi:"medium", micro:{iron:2,calcium:30,vitC:5,vitB12:0,folate:35}, vitamins:["Iron","Folate","B vitamins"], healthScore:7, swap:"Good one-pot nutritious meal" },
  { id:180, name:"Vangi Bath", category:"South Indian", veg:true, serving:"1 bowl (250g)", cal:260, protein:5, carbs:38, fat:9, fiber:3, gi:"medium", micro:{iron:1,calcium:15,vitC:4,vitB12:0,folate:12}, vitamins:["Fiber","Potassium"], healthScore:6, swap:"Add dal for protein" },

  // ── South Indian extras ───────────────────────────────────────────────
  { id:181, name:"Rava Dosa", category:"South Indian", veg:true, serving:"1 dosa (120g)", cal:200, protein:4, carbs:28, fat:8, fiber:1, gi:"medium", micro:{iron:1.2,calcium:12,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Have regular dosa → Save 30 cal" },
  { id:182, name:"Set Dosa", category:"South Indian", veg:true, serving:"3 pcs", cal:210, protein:5, carbs:36, fat:5, fiber:1, gi:"medium", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","Probiotics"], healthScore:7, swap:"Soft and easy to digest" },
  { id:183, name:"Neer Dosa", category:"South Indian", veg:true, serving:"2 pcs", cal:140, protein:3, carbs:26, fat:2, fiber:0, gi:"medium", micro:{iron:0.8,calcium:8,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Very light rice crepe" },
  { id:184, name:"Mysore Masala Dosa", category:"South Indian", veg:true, serving:"1 dosa", cal:350, protein:7, carbs:42, fat:16, fiber:3, gi:"medium", micro:{iron:1.5,calcium:18,vitC:8,vitB12:0,folate:12}, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:4, swap:"Have plain dosa → Save 180 cal" },
  { id:185, name:"Onion Rava Dosa", category:"South Indian", veg:true, serving:"1 dosa", cal:240, protein:5, carbs:30, fat:11, fiber:2, gi:"medium", micro:{iron:1.5,calcium:12,vitC:3,vitB12:0,folate:10}, vitamins:["Iron","Quercetin"], healthScore:5, swap:"Have set dosa → Save 30 cal" },
  { id:186, name:"Medu Vada Sambar", category:"South Indian", veg:true, serving:"2 vada + sambar", cal:340, protein:12, carbs:34, fat:17, fiber:5, gi:"medium", micro:{iron:2.5,calcium:25,vitC:8,vitB12:0,folate:35}, vitamins:["Iron","Protein","Folate"], healthScore:5, swap:"Have idli sambar → Save 160 cal" },
  { id:187, name:"Idli Sambar", category:"South Indian", veg:true, serving:"3 idli + sambar", cal:260, protein:9, carbs:46, fat:4, fiber:5, gi:"medium", micro:{iron:2.5,calcium:25,vitC:10,vitB12:0,folate:40}, vitamins:["Iron","Folate","Probiotics","Vitamin C"], healthScore:8, swap:"Perfect balanced South Indian meal!" },
  { id:188, name:"Dosa Sambar", category:"South Indian", veg:true, serving:"1 dosa + sambar", cal:250, protein:8, carbs:38, fat:7, fiber:4, gi:"medium", micro:{iron:2,calcium:20,vitC:8,vitB12:0,folate:30}, vitamins:["Iron","Folate","B vitamins"], healthScore:7, swap:"Great combination!" },
  { id:189, name:"Payasam (Kheer)", category:"Sweets", veg:true, serving:"1 bowl (150g)", cal:250, protein:5, carbs:38, fat:8, fiber:1, gi:"high", micro:{iron:0.5,calcium:70,vitC:2,vitB12:0.3,folate:5}, vitamins:["Calcium","Vitamin A"], healthScore:4, swap:"Use low-fat milk → Save 50 cal" },

  // ── Raita / Sides ─────────────────────────────────────────────────────
  { id:190, name:"Boondi Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:100, protein:3, carbs:10, fat:5, fiber:0, gi:"low", micro:{iron:0.5,calcium:60,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","Probiotics"], healthScore:5, swap:"Have plain raita → Save 30 cal" },
  { id:191, name:"Mixed Veg Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:70, protein:3, carbs:6, fat:3, fiber:1, gi:"low", micro:{iron:0.5,calcium:60,vitC:5,vitB12:0.3,folate:8}, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:7, swap:"Already light and probiotic-rich" },
  { id:192, name:"Onion Salad", category:"Sides", veg:true, serving:"1 serving (50g)", cal:20, protein:1, carbs:4, fat:0, fiber:1, gi:"low", micro:{iron:0.2,calcium:10,vitC:4,vitB12:0,folate:5}, vitamins:["Quercetin","Vitamin C"], healthScore:9, swap:"Zero fat! Great digestive aid" },
  { id:193, name:"Green Salad", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:25, protein:1, carbs:5, fat:0, fiber:2, gi:"low", micro:{iron:0.5,calcium:20,vitC:12,vitB12:0,folate:15}, vitamins:["Vitamin C","Vitamin A","Fiber"], healthScore:10, swap:"Perfect addition to any meal!" },
  { id:194, name:"Pickle (Achar)", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:30, protein:0, carbs:2, fat:2, fiber:0, gi:"low", micro:{iron:0.2,calcium:3,vitC:2,vitB12:0,folate:1}, vitamins:["Vitamin C"], healthScore:4, swap:"High sodium — use sparingly" },
  { id:195, name:"Papad (Roasted)", category:"Sides", veg:true, serving:"1 pc", cal:40, protein:2, carbs:6, fat:1, fiber:1, gi:"low", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","Protein"], healthScore:6, swap:"Roasted > fried → saves 30 cal" },
  { id:196, name:"Papad (Fried)", category:"Sides", veg:true, serving:"1 pc", cal:70, protein:2, carbs:6, fat:4, fiber:1, gi:"low", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron"], healthScore:4, swap:"Roast instead → Save 30 cal" },

  // ── More Breakfast ────────────────────────────────────────────────────
  { id:197, name:"Stuffed Gobhi Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:250, protein:5, carbs:32, fat:11, fiber:3, gi:"medium", micro:{iron:1,calcium:25,vitC:15,vitB12:0,folate:25}, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:6, swap:"Have methi paratha → Save 20 cal" },
  { id:198, name:"Mooli Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:240, protein:5, carbs:30, fat:11, fiber:3, gi:"medium", micro:{iron:1,calcium:20,vitC:10,vitB12:0,folate:15}, vitamins:["Vitamin C","Potassium","Fiber"], healthScore:6, swap:"Good — radish aids digestion" },
  { id:199, name:"Sattu Paratha", category:"Breakfast", veg:true, serving:"1 pc (120g)", cal:260, protein:8, carbs:32, fat:11, fiber:4, gi:"medium", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Protein","Calcium","Fiber"], healthScore:7, swap:"High protein filling — great choice!" },
  { id:200, name:"Curd (Plain Dahi)", category:"Breakfast", veg:true, serving:"1 bowl (100g)", cal:60, protein:4, carbs:5, fat:3, fiber:0, gi:"low", micro:{iron:0.2,calcium:80,vitC:1,vitB12:0.5,folate:5}, vitamins:["Calcium","B12","Probiotics"], healthScore:8, swap:"Low-fat curd → Save 15 cal" },

  // ── More Non-Veg ──────────────────────────────────────────────────────
  { id:201, name:"Chicken Fried Rice", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:420, protein:18, carbs:52, fat:16, fiber:2, gi:"high", micro:{iron:1.2,calcium:18,vitC:2,vitB12:1.5,folate:10}, vitamins:["B12","Iron","B6"], healthScore:4, swap:"Have chicken pulao → Save 80 cal" },
  { id:202, name:"Chicken Manchurian", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:360, protein:20, carbs:22, fat:22, fiber:1, gi:"medium", micro:{iron:1,calcium:15,vitC:3,vitB12:1.5,folate:6}, vitamins:["B12","Iron"], healthScore:3, swap:"Have chicken tikka → Save 110 cal" },
  { id:203, name:"Chicken Lollipop", category:"Non-Veg", veg:false, serving:"6 pcs", cal:380, protein:22, carbs:18, fat:24, fiber:0, gi:"medium", micro:{iron:1.2,calcium:12,vitC:1,vitB12:1.5,folate:5}, vitamins:["B12","Iron","Zinc"], healthScore:3, swap:"Have tandoori chicken → Save 160 cal" },
  { id:204, name:"Fish Tikka", category:"Non-Veg", veg:false, serving:"4 pcs (150g)", cal:180, protein:24, carbs:4, fat:8, fiber:0, gi:"low", micro:{iron:1,calcium:18,vitC:1,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:8, swap:"Excellent lean protein!" },
  { id:205, name:"Crab Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:200, protein:18, carbs:10, fat:10, fiber:1, gi:"low", micro:{iron:1.5,calcium:50,vitC:3,vitB12:2.5,folate:10}, vitamins:["B12","Zinc","Selenium","Omega-3"], healthScore:7, swap:"Already nutrient-dense!" },

  // ── Rajasthani / Gujarati ─────────────────────────────────────────────
  { id:206, name:"Dal Baati Churma", category:"North Indian", veg:true, serving:"1 plate", cal:550, protein:14, carbs:64, fat:26, fiber:4, gi:"high", micro:{iron:3,calcium:40,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","B vitamins"], healthScore:4, swap:"Eat less churma → Save 150 cal" },
  { id:207, name:"Gatte Ki Sabzi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:8, carbs:24, fat:10, fiber:3, gi:"low", micro:{iron:2,calcium:20,vitC:2,vitB12:0,folate:35}, vitamins:["Iron","Folate","Protein"], healthScore:6, swap:"Good besan-based protein dish" },
  { id:208, name:"Ker Sangri", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:120, protein:3, carbs:14, fat:6, fiber:4, gi:"low", micro:{iron:1.5,calcium:15,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:7, swap:"Traditional Rajasthani superfood!" },
  { id:209, name:"Kadi Khichdi", category:"North Indian", veg:true, serving:"1 plate", cal:280, protein:9, carbs:38, fat:10, fiber:3, gi:"medium", micro:{iron:1.5,calcium:60,vitC:2,vitB12:0.3,folate:20}, vitamins:["Calcium","Iron","Probiotics"], healthScore:6, swap:"Comfort food with probiotics" },

  // ── More Sweets ───────────────────────────────────────────────────────
  { id:210, name:"Shrikhand", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:180, protein:5, carbs:26, fat:6, fiber:0, gi:"high", micro:{iron:0.3,calcium:70,vitC:1,vitB12:0.4,folate:5}, vitamins:["Calcium","B12","Probiotics"], healthScore:4, swap:"Use less sugar → Save 40 cal" },
  { id:211, name:"Basundi", category:"Sweets", veg:true, serving:"1 bowl (120g)", cal:220, protein:6, carbs:30, fat:8, fiber:0, gi:"high", micro:{iron:0.3,calcium:80,vitC:1,vitB12:0.4,folate:5}, vitamins:["Calcium","B12","Vitamin A"], healthScore:4, swap:"Have in small portions" },
  { id:212, name:"Rabdi", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:200, protein:5, carbs:24, fat:10, fiber:0, gi:"high", micro:{iron:0.3,calcium:70,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","Vitamin A"], healthScore:3, swap:"Use low-fat milk → Save 50 cal" },
  { id:213, name:"Kulfi", category:"Sweets", veg:true, serving:"1 pc (80g)", cal:180, protein:4, carbs:22, fat:9, fiber:0, gi:"high", micro:{iron:0.3,calcium:60,vitC:0,vitB12:0.3,folate:3}, vitamins:["Calcium","Vitamin A"], healthScore:4, swap:"Better than ice cream — no air whipped" },
  { id:214, name:"Imarti", category:"Sweets", veg:true, serving:"1 pc (50g)", cal:200, protein:2, carbs:30, fat:8, fiber:0, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Have rasgulla → Save 20 cal, less oil" },
  { id:215, name:"Peda", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:180, protein:4, carbs:24, fat:8, fiber:0, gi:"high", micro:{iron:0.3,calcium:40,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium"], healthScore:3, swap:"Have sandesh → Save 20 cal" },
  { id:216, name:"Coconut Ladoo", category:"Sweets", veg:true, serving:"2 pcs (50g)", cal:220, protein:2, carbs:24, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron","Manganese"], healthScore:3, swap:"Use jaggery → gain iron" },
  { id:217, name:"Ras Malai", category:"Sweets", veg:true, serving:"2 pcs (100g)", cal:220, protein:6, carbs:28, fat:10, fiber:0, gi:"high", micro:{iron:0.3,calcium:60,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","B12","Cardamom"], healthScore:4, swap:"One of the lighter milk sweets" },

  // ── Indo-Chinese ──────────────────────────────────────────────────────
  { id:218, name:"Veg Manchurian (Dry)", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:280, protein:5, carbs:28, fat:16, fiber:2, gi:"high", micro:{iron:1,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron"], healthScore:3, swap:"Have stir-fried veggies → Save 150 cal" },
  { id:219, name:"Veg Manchurian (Gravy)", category:"Snacks", veg:true, serving:"1 bowl (200g)", cal:320, protein:5, carbs:32, fat:18, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:6,vitB12:0,folate:8}, vitamins:["Vitamin C"], healthScore:3, swap:"Have dry version → Save 40 cal" },
  { id:220, name:"Hakka Noodles", category:"Snacks", veg:true, serving:"1 plate (250g)", cal:350, protein:7, carbs:48, fat:14, fiber:2, gi:"high", micro:{iron:1.5,calcium:12,vitC:3,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have rice with stir-fried veg → Save 100 cal" },
  { id:221, name:"Schezwan Fried Rice", category:"Snacks", veg:true, serving:"1 plate (300g)", cal:400, protein:6, carbs:52, fat:18, fiber:2, gi:"high", micro:{iron:1.2,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:3, swap:"Have jeera rice → Save 180 cal" },
  { id:222, name:"Chilli Paneer", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:310, protein:12, carbs:16, fat:22, fiber:2, gi:"low", micro:{iron:0.8,calcium:170,vitC:10,vitB12:0.5,folate:10}, vitamins:["Calcium","Vitamin C"], healthScore:4, swap:"Have paneer tikka → Save 30 cal" },
  { id:223, name:"Gobi Manchurian", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:260, protein:4, carbs:26, fat:15, fiber:3, gi:"medium", micro:{iron:0.8,calcium:20,vitC:18,vitB12:0,folate:15}, vitamins:["Vitamin C","Vitamin K"], healthScore:3, swap:"Have roasted gobhi → Save 160 cal" },
  { id:224, name:"Sweet Corn Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:90, protein:3, carbs:16, fat:2, fiber:1, gi:"medium", micro:{iron:0.5,calcium:8,vitC:5,vitB12:0,folate:5}, vitamins:["Vitamin C","Iron"], healthScore:6, swap:"Good light starter" },
  { id:225, name:"Hot & Sour Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:70, protein:3, carbs:10, fat:2, fiber:1, gi:"low", micro:{iron:0.5,calcium:8,vitC:5,vitB12:0,folate:5}, vitamins:["Vitamin C"], healthScore:6, swap:"Low-cal soup option" },

  // ── More Dals / Legumes ───────────────────────────────────────────────
  { id:226, name:"Rajma Rice", category:"North Indian", veg:true, serving:"1 plate (350g)", cal:380, protein:14, carbs:60, fat:8, fiber:8, gi:"medium", micro:{iron:3.5,calcium:55,vitC:3,vitB12:0,folate:75}, vitamins:["Iron","Folate","Potassium","Fiber"], healthScore:7, swap:"Use brown rice → gain more fiber" },
  { id:227, name:"Chole Rice", category:"North Indian", veg:true, serving:"1 plate (350g)", cal:400, protein:13, carbs:62, fat:10, fiber:8, gi:"medium", micro:{iron:3,calcium:50,vitC:4,vitB12:0,folate:70}, vitamins:["Iron","Folate","Manganese"], healthScore:7, swap:"Use brown rice → gain fiber" },
  { id:228, name:"Kadhi Chawal", category:"North Indian", veg:true, serving:"1 plate (350g)", cal:350, protein:10, carbs:52, fat:11, fiber:3, gi:"medium", micro:{iron:1,calcium:70,vitC:2,vitB12:0.4,folate:12}, vitamins:["Calcium","Probiotics","B12"], healthScore:6, swap:"Use brown rice → gain fiber" },
  { id:229, name:"Sambhar Rice", category:"South Indian", veg:true, serving:"1 plate (350g)", cal:300, protein:10, carbs:50, fat:6, fiber:5, gi:"medium", micro:{iron:2.5,calcium:35,vitC:10,vitB12:0,folate:45}, vitamins:["Iron","Folate","Vitamin C"], healthScore:8, swap:"Already a balanced complete meal!" },
  { id:230, name:"Rasam Rice", category:"South Indian", veg:true, serving:"1 plate (300g)", cal:220, protein:4, carbs:42, fat:3, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:12,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:7, swap:"Add dal for protein" },

  // ── Health Foods ──────────────────────────────────────────────────────
  { id:231, name:"Sprouts Salad", category:"Sides", veg:true, serving:"1 bowl (150g)", cal:100, protein:8, carbs:14, fat:1, fiber:5, gi:"low", micro:{iron:2.5,calcium:25,vitC:15,vitB12:0,folate:60}, vitamins:["Iron","Folate","Vitamin C","Protein"], healthScore:10, swap:"Superfood! No swap needed" },
  { id:232, name:"Ragi Mudde", category:"South Indian", veg:true, serving:"2 balls (150g)", cal:170, protein:4, carbs:34, fat:1, fiber:4, gi:"low", micro:{iron:3,calcium:200,vitC:1,vitB12:0,folate:15}, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Excellent millet staple!" },
  { id:233, name:"Bajra Khichdi", category:"North Indian", veg:true, serving:"1 bowl (250g)", cal:220, protein:7, carbs:34, fat:6, fiber:4, gi:"medium", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:25}, vitamins:["Iron","Magnesium","Fiber"], healthScore:8, swap:"Great millet-based comfort food" },
  { id:234, name:"Jowar Roti", category:"Rice/Breads", veg:true, serving:"1 pc (50g)", cal:95, protein:3, carbs:20, fat:1, fiber:3, gi:"medium", micro:{iron:2,calcium:15,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","Fiber","Phosphorus"], healthScore:8, swap:"Excellent gluten-free millet roti!" },
  { id:235, name:"Nachni Satva", category:"Breakfast", veg:true, serving:"1 bowl (200g)", cal:140, protein:4, carbs:28, fat:1, fiber:3, gi:"low", micro:{iron:3,calcium:200,vitC:1,vitB12:0,folate:12}, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Great ragi porridge for babies & adults!" },

  // ── Continental/Fusion (popular in India) ──────────────────────────────
  { id:236, name:"Paneer Sandwich (Grilled)", category:"Snacks", veg:true, serving:"1 sandwich", cal:280, protein:12, carbs:30, fat:12, fiber:2, gi:"high", micro:{iron:0.8,calcium:140,vitC:2,vitB12:0.4,folate:10}, vitamins:["Calcium","B12"], healthScore:5, swap:"Use multigrain bread → gain fiber" },
  { id:237, name:"Veg Sandwich", category:"Snacks", veg:true, serving:"1 sandwich", cal:200, protein:6, carbs:28, fat:7, fiber:3, gi:"high", micro:{iron:0.8,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Vitamin C","Fiber"], healthScore:6, swap:"Use multigrain bread → gain fiber" },
  { id:238, name:"Cheese Toast", category:"Snacks", veg:true, serving:"2 slices", cal:260, protein:8, carbs:26, fat:14, fiber:1, gi:"high", micro:{iron:0.5,calcium:120,vitC:0,vitB12:0.4,folate:8}, vitamins:["Calcium","B12"], healthScore:4, swap:"Use multigrain + less cheese → Save 60 cal" },
  { id:239, name:"Masala Omelette", category:"Breakfast", veg:false, serving:"2 eggs + veggies", cal:200, protein:15, carbs:4, fat:14, fiber:1, gi:"low", micro:{iron:1.5,calcium:35,vitC:5,vitB12:1,folate:30}, vitamins:["B12","Vitamin D","Selenium","Vitamin C"], healthScore:7, swap:"Add more veggies for fiber" },

  // ── Biryanis ──────────────────────────────────────────────────────────
  { id:240, name:"Hyderabadi Biryani (Chicken)", category:"Non-Veg", veg:false, serving:"1 plate (350g)", cal:480, protein:24, carbs:54, fat:18, fiber:2, gi:"medium", micro:{iron:1.8,calcium:25,vitC:2,vitB12:2,folate:15}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Have smaller portion + raita" },
  { id:241, name:"Lucknowi Biryani", category:"Non-Veg", veg:false, serving:"1 plate (350g)", cal:460, protein:22, carbs:52, fat:18, fiber:2, gi:"medium", micro:{iron:1.5,calcium:22,vitC:2,vitB12:1.8,folate:12}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Lighter than Hyderabadi (pukki style)" },
  { id:242, name:"Kolkata Biryani", category:"Non-Veg", veg:false, serving:"1 plate (350g)", cal:440, protein:20, carbs:56, fat:14, fiber:2, gi:"medium", micro:{iron:1.5,calcium:20,vitC:5,vitB12:1.8,folate:12}, vitamins:["B12","Iron","Potassium"], healthScore:5, swap:"Has potato — remove for lower carbs" },

  // ── More Regional Specials ────────────────────────────────────────────
  { id:243, name:"Prawn Malai Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:280, protein:18, carbs:8, fat:20, fiber:1, gi:"low", micro:{iron:1,calcium:40,vitC:2,vitB12:2,folate:8}, vitamins:["Selenium","B12","Omega-3"], healthScore:5, swap:"Use less coconut cream → Save 60 cal" },
  { id:244, name:"Fish Moilee", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:240, protein:20, carbs:8, fat:14, fiber:1, gi:"low", micro:{iron:1,calcium:30,vitC:3,vitB12:2.5,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Light coconut-based curry — good choice" },
  { id:245, name:"Sorpotel", category:"Non-Veg", veg:false, serving:"1 bowl (150g)", cal:320, protein:18, carbs:8, fat:24, fiber:1, gi:"low", micro:{iron:3,calcium:15,vitC:1,vitB12:3,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:3, swap:"Have vindaloo instead → less fat" },
  { id:246, name:"Vindaloo (Pork)", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:350, protein:24, carbs:10, fat:24, fiber:1, gi:"low", micro:{iron:2,calcium:18,vitC:2,vitB12:2.5,folate:5}, vitamins:["B12","B1","Zinc","Iron"], healthScore:4, swap:"Use lean cuts → Save 80 cal" },
  { id:247, name:"Goan Fish Curry", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:220, protein:22, carbs:8, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:25,vitC:3,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Vitamin D"], healthScore:8, swap:"Excellent! Light and nutritious" },

  // ── More Drinks ───────────────────────────────────────────────────────
  { id:248, name:"Masala Chai", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:85, protein:2, carbs:12, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Antioxidants","Calcium"], healthScore:5, swap:"Skip sugar → Save 40 cal" },
  { id:249, name:"Turmeric Milk (Haldi Doodh)", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:120, protein:5, carbs:14, fat:4, fiber:0, gi:"low", micro:{iron:0.5,calcium:150,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","Curcumin","Vitamin D"], healthScore:8, swap:"Great anti-inflammatory bedtime drink!" },
  { id:250, name:"Sattu Drink", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:100, protein:6, carbs:16, fat:1, fiber:2, gi:"low", micro:{iron:2,calcium:40,vitC:1,vitB12:0,folate:15}, vitamins:["Iron","Protein","Calcium","Fiber"], healthScore:9, swap:"Bihar's protein shake — excellent!" },

  // ── More Complete Meals ───────────────────────────────────────────────
  { id:251, name:"Thali (Veg North Indian)", category:"North Indian", veg:true, serving:"Full thali", cal:800, protein:22, carbs:110, fat:28, fiber:12, gi:"medium", micro:{iron:4,calcium:150,vitC:15,vitB12:0,folate:50}, vitamins:["Iron","Calcium","B vitamins","Vitamin C"], healthScore:6, swap:"Skip 1 roti + sweet → Save 200 cal" },
  { id:252, name:"Thali (South Indian Meals)", category:"South Indian", veg:true, serving:"Full meals", cal:700, protein:18, carbs:100, fat:22, fiber:10, gi:"medium", micro:{iron:3.5,calcium:100,vitC:15,vitB12:0,folate:45}, vitamins:["Iron","Vitamin C","B vitamins","Calcium"], healthScore:7, swap:"Skip papad + payasam → Save 150 cal" },

  // ── Filling remaining to 300+ ─────────────────────────────────────────
  { id:253, name:"Aloo Paratha with Curd", category:"Breakfast", veg:true, serving:"1 paratha + curd", cal:340, protein:10, carbs:42, fat:14, fiber:3, gi:"medium", micro:{iron:1.2,calcium:90,vitC:8,vitB12:0.3,folate:15}, vitamins:["Vitamin C","Calcium","Probiotics"], healthScore:6, swap:"Use gobhi filling → Save 40 cal" },
  { id:254, name:"Chole Kulche", category:"Snacks", veg:true, serving:"2 kulche + chole", cal:520, protein:14, carbs:66, fat:22, fiber:6, gi:"high", micro:{iron:3,calcium:50,vitC:3,vitB12:0,folate:65}, vitamins:["Iron","Folate"], healthScore:4, swap:"Have chole with roti → Save 200 cal" },
  { id:255, name:"Masala Puri", category:"Snacks", veg:true, serving:"4 puri + curry", cal:450, protein:8, carbs:50, fat:24, fiber:3, gi:"high", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Potassium"], healthScore:3, swap:"Have roti instead of puri → Save 150 cal" },
  { id:256, name:"Pav Bhaji (Dry)", category:"Snacks", veg:true, serving:"bhaji only (200g)", cal:200, protein:6, carbs:24, fat:9, fiber:4, gi:"low", micro:{iron:1.5,calcium:20,vitC:15,vitB12:0,folate:15}, vitamins:["Vitamin A","Vitamin C","Iron"], healthScore:6, swap:"Without pav — good veggie dish" },
  { id:257, name:"Masala Papad", category:"Sides", veg:true, serving:"1 pc", cal:50, protein:2, carbs:6, fat:2, fiber:1, gi:"low", micro:{iron:0.8,calcium:10,vitC:3,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Good low-cal starter" },
  { id:258, name:"Dal Khichdi", category:"Dals", veg:true, serving:"1 bowl (250g)", cal:210, protein:8, carbs:34, fat:4, fiber:4, gi:"low", micro:{iron:2.5,calcium:35,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","B vitamins"], healthScore:8, swap:"Comfort food that's nutritious!" },
  { id:259, name:"Palak Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:22, fat:4, fiber:5, gi:"low", micro:{iron:3.5,calcium:80,vitC:10,vitB12:0,folate:60}, vitamins:["Iron","Vitamin A","Folate","Calcium"], healthScore:9, swap:"Iron-rich superfood dal!" },
  { id:260, name:"Lauki Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:140, protein:8, carbs:20, fat:2, fiber:4, gi:"low", micro:{iron:2,calcium:35,vitC:8,vitB12:0,folate:40}, vitamins:["Vitamin C","Calcium","Iron"], healthScore:9, swap:"Very light and digestible" },
  { id:261, name:"Egg Fried Rice", category:"Non-Veg", veg:false, serving:"1 plate (300g)", cal:380, protein:14, carbs:50, fat:14, fiber:2, gi:"high", micro:{iron:1.5,calcium:30,vitC:2,vitB12:1,folate:18}, vitamins:["B12","Iron","B6"], healthScore:4, swap:"Have egg pulao → Save 60 cal" },
  { id:262, name:"Keema Paratha", category:"Breakfast", veg:false, serving:"1 pc (130g)", cal:340, protein:14, carbs:34, fat:16, fiber:2, gi:"medium", micro:{iron:2,calcium:20,vitC:1,vitB12:2,folate:12}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Use chicken keema → Save 60 cal" },
  { id:263, name:"Mutton Paya", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:300, protein:22, carbs:6, fat:22, fiber:0, gi:"low", micro:{iron:2.5,calcium:30,vitC:1,vitB12:3,folate:5}, vitamins:["Collagen","B12","Iron","Calcium"], healthScore:5, swap:"Rich in collagen — good for joints" },
  { id:264, name:"Haleem", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:350, protein:20, carbs:30, fat:16, fiber:4, gi:"low", micro:{iron:3,calcium:30,vitC:2,vitB12:2,folate:30}, vitamins:["Iron","B12","Protein","Fiber"], healthScore:6, swap:"High protein — Hyderabadi specialty" },
  { id:265, name:"Brain Fry (Bheja Fry)", category:"Non-Veg", veg:false, serving:"1 bowl (100g)", cal:280, protein:12, carbs:6, fat:24, fiber:0, gi:"low", micro:{iron:1.5,calcium:8,vitC:0,vitB12:3,folate:5}, vitamins:["B12","Omega-3","DHA"], healthScore:3, swap:"Very high cholesterol — eat rarely" },
  { id:266, name:"Liver Fry", category:"Non-Veg", veg:false, serving:"1 bowl (100g)", cal:200, protein:20, carbs:4, fat:12, fiber:0, gi:"low", micro:{iron:8,calcium:10,vitC:2,vitB12:3,folate:80}, vitamins:["Iron","B12","Vitamin A","Folate"], healthScore:5, swap:"Very iron-rich — good for anemia" },
  { id:267, name:"Rumali Roti", category:"Rice/Breads", veg:true, serving:"1 pc (40g)", cal:90, protein:3, carbs:18, fat:1, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Thinner = fewer calories than naan" },
  { id:268, name:"Laccha Paratha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:260, protein:4, carbs:30, fat:14, fiber:2, gi:"medium", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have tandoori roti → Save 170 cal" },
  { id:269, name:"Garlic Naan", category:"Rice/Breads", veg:true, serving:"1 pc (85g)", cal:280, protein:7, carbs:42, fat:8, fiber:2, gi:"high", micro:{iron:1.5,calcium:18,vitC:1,vitB12:0,folate:15}, vitamins:["B vitamins","Allicin"], healthScore:4, swap:"Have tandoori roti → Save 180 cal" },
  { id:270, name:"Cheese Naan", category:"Rice/Breads", veg:true, serving:"1 pc (100g)", cal:350, protein:10, carbs:42, fat:16, fiber:2, gi:"high", micro:{iron:1.5,calcium:80,vitC:0,vitB12:0.3,folate:15}, vitamins:["Calcium","B vitamins"], healthScore:3, swap:"Have plain roti → Save 270 cal" },

  // ── Filling to 305 ───────────────────────────────────────────────────
  { id:271, name:"Paneer Lababdar", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:360, protein:14, carbs:16, fat:28, fiber:2, gi:"low", micro:{iron:0.8,calcium:190,vitC:3,vitB12:0.5,folate:12}, vitamins:["Calcium","B12"], healthScore:4, swap:"Have palak paneer → Save 140 cal" },
  { id:272, name:"Navratan Korma", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:320, protein:8, carbs:24, fat:22, fiber:3, gi:"low", micro:{iron:1.5,calcium:60,vitC:8,vitB12:0,folate:20}, vitamins:["Vitamin A","Vitamin C","Iron"], healthScore:5, swap:"Rich but nutrient-diverse" },
  { id:273, name:"Achari Paneer", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:330, protein:14, carbs:14, fat:24, fiber:2, gi:"low", micro:{iron:1,calcium:185,vitC:3,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Mustard oil benefits"], healthScore:5, swap:"Use less oil → Save 60 cal" },
  { id:274, name:"Methi Malai Murg", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:320, protein:24, carbs:8, fat:22, fiber:2, gi:"low", micro:{iron:1.5,calcium:20,vitC:3,vitB12:2,folate:25}, vitamins:["B12","Iron","Vitamin K","Folate"], healthScore:5, swap:"Use less cream → Save 60 cal" },
  { id:275, name:"Chicken Chettinad", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:290, protein:26, carbs:10, fat:16, fiber:2, gi:"low", micro:{iron:1.5,calcium:18,vitC:3,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc","Black pepper"], healthScore:6, swap:"Spice-rich — good metabolism booster" },
  { id:276, name:"Pepper Chicken", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:260, protein:26, carbs:8, fat:14, fiber:1, gi:"low", micro:{iron:1.2,calcium:15,vitC:2,vitB12:2,folate:6}, vitamins:["B12","Iron","Piperine","Zinc"], healthScore:7, swap:"Already lean and spicy!" },
  { id:277, name:"Dal Gosht", category:"Non-Veg", veg:false, serving:"1 bowl (250g)", cal:340, protein:24, carbs:22, fat:18, fiber:4, gi:"low", micro:{iron:3,calcium:30,vitC:2,vitB12:2.5,folate:35}, vitamins:["B12","Iron","Folate","Zinc"], healthScore:6, swap:"Good protein combo — dal + meat" },
  { id:278, name:"Bhuna Gosht", category:"Non-Veg", veg:false, serving:"1 bowl (200g)", cal:320, protein:26, carbs:6, fat:22, fiber:1, gi:"low", micro:{iron:2.5,calcium:15,vitC:2,vitB12:2.5,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Use lean meat → Save 60 cal" },
  { id:279, name:"Tadka Dal (Restaurant)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:200, protein:9, carbs:24, fat:8, fiber:4, gi:"low", micro:{iron:2.5,calcium:35,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","B6"], healthScore:7, swap:"Home version with less ghee is healthier" },
  { id:280, name:"Mango Lassi", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:220, protein:5, carbs:36, fat:6, fiber:1, gi:"medium", micro:{iron:0.5,calcium:100,vitC:12,vitB12:0.4,folate:10}, vitamins:["Vitamin A","Calcium","Vitamin C","Probiotics"], healthScore:5, swap:"Use less sugar → Save 40 cal" },
  { id:281, name:"Rose Sharbat", category:"Drinks", veg:true, serving:"1 glass (250ml)", cal:100, protein:0, carbs:25, fat:0, fiber:0, gi:"high", micro:{iron:0.1,calcium:3,vitC:0,vitB12:0,folate:1}, vitamins:["Cooling properties"], healthScore:4, swap:"Mostly sugar — dilute more" },
  { id:282, name:"Jal Jeera Pani Puri", category:"Snacks", veg:true, serving:"6 pcs", cal:140, protein:3, carbs:24, fat:4, fiber:2, gi:"high", micro:{iron:0.8,calcium:8,vitC:5,vitB12:0,folate:6}, vitamins:["Vitamin C","Iron","Digestive spices"], healthScore:5, swap:"Better than sweet/dahi puri" },
  { id:283, name:"Bhutta (Roasted Corn)", category:"Snacks", veg:true, serving:"1 cob", cal:120, protein:4, carbs:22, fat:2, fiber:3, gi:"medium", micro:{iron:0.8,calcium:5,vitC:5,vitB12:0,folate:15}, vitamins:["Fiber","Vitamin B","Manganese"], healthScore:7, swap:"Healthy street snack!" },
  { id:284, name:"Chana Jor Garam", category:"Snacks", veg:true, serving:"50g", cal:160, protein:7, carbs:24, fat:4, fiber:4, gi:"low", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:45}, vitamins:["Iron","Protein","Fiber"], healthScore:7, swap:"Good protein snack" },
  { id:285, name:"Murmura (Puffed Rice)", category:"Snacks", veg:true, serving:"50g", cal:180, protein:3, carbs:40, fat:0.5, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Light but low nutrition — add peanuts" },
  { id:286, name:"Kala Chana Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:160, protein:9, carbs:24, fat:3, fiber:6, gi:"low", micro:{iron:3,calcium:40,vitC:5,vitB12:0,folate:60}, vitamins:["Iron","Folate","Fiber","Protein"], healthScore:9, swap:"Excellent high-fiber, high-protein snack!" },
  { id:287, name:"Sweet Potato Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:140, protein:2, carbs:28, fat:2, fiber:4, gi:"medium", micro:{iron:0.8,calcium:25,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin A","Vitamin C","Potassium","Fiber"], healthScore:8, swap:"Healthier than aloo chaat!" },
  { id:288, name:"Fruit Chaat", category:"Snacks", veg:true, serving:"1 bowl (200g)", cal:100, protein:1, carbs:24, fat:0, fiber:3, gi:"low", micro:{iron:0.5,calcium:15,vitC:25,vitB12:0,folate:15}, vitamins:["Vitamin C","Vitamin A","Potassium","Fiber"], healthScore:9, swap:"One of the healthiest snack options!" },
  { id:289, name:"Peanut Chikki", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:200, protein:6, carbs:22, fat:10, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:20}, vitamins:["Protein","Magnesium","Iron"], healthScore:5, swap:"Uses jaggery — better than refined sugar sweets" },
  { id:290, name:"Tilgul (Sesame Ladoo)", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:190, protein:4, carbs:20, fat:10, fiber:2, gi:"high", micro:{iron:2,calcium:50,vitC:0,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Sesame benefits"], healthScore:5, swap:"Rich in calcium — good winter sweet" },
  { id:291, name:"Dry Fruit Ladoo", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:200, protein:5, carbs:18, fat:12, fiber:2, gi:"medium", micro:{iron:1.5,calcium:30,vitC:1,vitB12:0,folate:15}, vitamins:["Vitamin E","Iron","Omega-3","Protein"], healthScore:6, swap:"Nutrient-dense — healthier sweet option" },
  { id:292, name:"Date & Nut Ball", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:160, protein:3, carbs:24, fat:6, fiber:3, gi:"low", micro:{iron:1,calcium:20,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","Potassium","Fiber","Magnesium"], healthScore:7, swap:"No added sugar — great natural sweet!" },
  { id:293, name:"Banana Chips", category:"Snacks", veg:true, serving:"50g", cal:260, protein:1, carbs:30, fat:16, fiber:2, gi:"high", micro:{iron:0.5,calcium:5,vitC:2,vitB12:0,folate:3}, vitamins:["Potassium"], healthScore:3, swap:"Have roasted makhana → Save 80 cal" },
  { id:294, name:"Mixture (Namkeen)", category:"Snacks", veg:true, serving:"50g", cal:250, protein:5, carbs:28, fat:13, fiber:2, gi:"high", micro:{iron:1.5,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have roasted chana → Save 70 cal" },
  { id:295, name:"Chakli/Murukku", category:"Snacks", veg:true, serving:"3 pcs (50g)", cal:230, protein:4, carbs:28, fat:12, fiber:2, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:3, swap:"Have thattai (baked) → Save 60 cal" },
  { id:296, name:"Mathri", category:"Snacks", veg:true, serving:"3 pcs (50g)", cal:240, protein:4, carbs:26, fat:14, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have baked mathri → Save 80 cal" },
  { id:297, name:"Kachumber Salad", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:30, protein:1, carbs:6, fat:0, fiber:2, gi:"low", micro:{iron:0.3,calcium:15,vitC:10,vitB12:0,folate:10}, vitamins:["Vitamin C","Vitamin A","Fiber"], healthScore:10, swap:"Perfect accompaniment — virtually zero cal!" },
  { id:298, name:"Mint Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:15, protein:1, carbs:2, fat:0, fiber:1, gi:"low", micro:{iron:0.5,calcium:8,vitC:8,vitB12:0,folate:5}, vitamins:["Vitamin C","Iron","Menthol"], healthScore:9, swap:"Virtually zero cal condiment!" },
  { id:299, name:"Tamarind Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:40, protein:0, carbs:10, fat:0, fiber:1, gi:"low", micro:{iron:0.5,calcium:10,vitC:2,vitB12:0,folate:3}, vitamins:["Iron","Potassium"], healthScore:5, swap:"High sugar — use sparingly" },
  { id:300, name:"Coconut Chutney (South)", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:55, protein:1, carbs:4, fat:4, fiber:1, gi:"low", micro:{iron:0.5,calcium:5,vitC:1,vitB12:0,folate:3}, vitamins:["Iron","Manganese","MCT"], healthScore:6, swap:"Use less coconut for fewer cal" },
  { id:301, name:"Tomato Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:80, protein:2, carbs:14, fat:2, fiber:2, gi:"low", micro:{iron:0.5,calcium:10,vitC:12,vitB12:0,folate:10}, vitamins:["Lycopene","Vitamin C","Vitamin A"], healthScore:7, swap:"Great low-cal starter!" },
  { id:302, name:"Mulligatawny Soup", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:110, protein:4, carbs:16, fat:3, fiber:2, gi:"low", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Turmeric","Vitamin C"], healthScore:7, swap:"Good Anglo-Indian classic" },
  { id:303, name:"Pani Puri Water (Pudina)", category:"Drinks", veg:true, serving:"1 glass (100ml)", cal:15, protein:0, carbs:3, fat:0, fiber:0, gi:"low", micro:{iron:0.3,calcium:3,vitC:5,vitB12:0,folate:2}, vitamins:["Vitamin C","Menthol","Iron"], healthScore:7, swap:"Almost zero cal — great digestive" },
  { id:304, name:"Solkadhi", category:"Drinks", veg:true, serving:"1 glass (150ml)", cal:45, protein:1, carbs:4, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:5,vitC:2,vitB12:0,folate:2}, vitamins:["Probiotics","Kokum benefits"], healthScore:7, swap:"Konkan digestive drink" },
  { id:305, name:"Kanji (Fermented Carrot)", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:30, protein:1, carbs:6, fat:0, fiber:1, gi:"low", micro:{iron:0.5,calcium:10,vitC:5,vitB12:0,folate:5}, vitamins:["Probiotics","Vitamin A","B vitamins"], healthScore:8, swap:"Probiotic-rich fermented drink!" },

  // ─── Bengali Dishes (306–325) ─────────────────────────────────────────
  { id:306, name:"Machher Jhol (Fish Stew)", category:"Bengali", veg:false, serving:"1 bowl (250g)", cal:220, protein:22, carbs:12, fat:10, fiber:2, gi:"low", micro:{iron:1.8,calcium:40,vitC:6,vitB12:2.5,folate:12}, vitamins:["B12","Omega-3","Iron"], healthScore:7, swap:"Use less oil for lighter version" },
  { id:307, name:"Kosha Mangsho (Mutton)", category:"Bengali", veg:false, serving:"1 bowl (200g)", cal:380, protein:26, carbs:8, fat:28, fiber:1, gi:"low", micro:{iron:3.5,calcium:20,vitC:3,vitB12:3,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"High fat — eat in moderation" },
  { id:308, name:"Aloo Posto (Potato Poppy Seed)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:210, protein:5, carbs:28, fat:9, fiber:3, gi:"medium", micro:{iron:1.5,calcium:80,vitC:12,vitB12:0,folate:15}, vitamins:["Calcium","Iron","B6"], healthScore:6, swap:"Rich in calcium from poppy seeds" },
  { id:309, name:"Shukto (Bitter Veg Mix)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:150, protein:4, carbs:18, fat:7, fiber:4, gi:"low", micro:{iron:1.8,calcium:50,vitC:15,vitB12:0,folate:30}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:8, swap:"Very healthy bitter veg dish!" },
  { id:310, name:"Chingri Malai Curry (Prawn Coconut)", category:"Bengali", veg:false, serving:"1 bowl (200g)", cal:310, protein:20, carbs:8, fat:22, fiber:1, gi:"low", micro:{iron:2,calcium:60,vitC:3,vitB12:2,folate:10}, vitamins:["B12","Selenium","Iron"], healthScore:5, swap:"Use light coconut milk → save 60 cal" },
  { id:311, name:"Doi Maach (Fish in Yogurt)", category:"Bengali", veg:false, serving:"1 bowl (200g)", cal:240, protein:22, carbs:10, fat:12, fiber:0, gi:"low", micro:{iron:1.5,calcium:80,vitC:2,vitB12:2.5,folate:10}, vitamins:["B12","Calcium","Probiotics"], healthScore:7, swap:"Yogurt-based — great protein source" },
  { id:312, name:"Bhapa Ilish (Steamed Hilsa)", category:"Bengali", veg:false, serving:"1 pc (150g)", cal:280, protein:20, carbs:4, fat:20, fiber:0, gi:"low", micro:{iron:1.5,calcium:30,vitC:1,vitB12:4,folate:8}, vitamins:["Omega-3","B12","Vitamin D"], healthScore:7, swap:"Steamed — healthy cooking method!" },
  { id:313, name:"Begun Bhaja (Fried Eggplant)", category:"Bengali", veg:true, serving:"4 pcs (100g)", cal:180, protein:2, carbs:14, fat:13, fiber:3, gi:"medium", micro:{iron:0.8,calcium:10,vitC:3,vitB12:0,folate:15}, vitamins:["Fiber","Iron","Antioxidants"], healthScore:4, swap:"Air fry instead → save 80 cal" },
  { id:314, name:"Luchi (Deep-fried Bread)", category:"Bengali", veg:true, serving:"2 pcs (80g)", cal:240, protein:4, carbs:30, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Swap for roti → save 100+ cal" },
  { id:315, name:"Mughlai Paratha", category:"Bengali", veg:false, serving:"1 pc (150g)", cal:350, protein:12, carbs:35, fat:18, fiber:2, gi:"high", micro:{iron:2,calcium:30,vitC:1,vitB12:0.5,folate:20}, vitamins:["Iron","Protein","B vitamins"], healthScore:3, swap:"Very rich — share or eat half" },
  { id:316, name:"Cholar Dal (Bengal Gram)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:200, protein:10, carbs:30, fat:5, fiber:6, gi:"low", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:70}, vitamins:["Folate","Iron","Fiber"], healthScore:8, swap:"High fiber — great for digestion" },
  { id:317, name:"Jhalmuri (Spiced Puffed Rice)", category:"Bengali", veg:true, serving:"1 bowl (80g)", cal:180, protein:4, carbs:32, fat:5, fiber:2, gi:"high", micro:{iron:1.5,calcium:8,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","B vitamins","Vitamin C"], healthScore:5, swap:"Light street snack — skip the oil" },
  { id:318, name:"Panta Bhat (Fermented Rice)", category:"Bengali", veg:true, serving:"1 bowl (250g)", cal:180, protein:4, carbs:38, fat:1, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:2,vitB12:0,folate:10}, vitamins:["Probiotics","B vitamins","Iron"], healthScore:6, swap:"Probiotic-rich — pair with fish fry" },
  { id:319, name:"Mishti Doi (Sweet Curd)", category:"Bengali", veg:true, serving:"1 bowl (100g)", cal:140, protein:4, carbs:22, fat:4, fiber:0, gi:"medium", micro:{iron:0.2,calcium:100,vitC:1,vitB12:0.5,folate:5}, vitamins:["Calcium","Probiotics","B12"], healthScore:5, swap:"High sugar — enjoy small portions" },
  { id:320, name:"Payesh (Milk Rice Pudding)", category:"Bengali", veg:true, serving:"1 bowl (150g)", cal:220, protein:6, carbs:36, fat:6, fiber:0, gi:"high", micro:{iron:0.5,calcium:120,vitC:1,vitB12:0.4,folate:5}, vitamins:["Calcium","B12","B2"], healthScore:4, swap:"Use jaggery instead of sugar" },
  { id:321, name:"Patishapta (Crepe Roll)", category:"Bengali", veg:true, serving:"2 pcs (100g)", cal:240, protein:5, carbs:38, fat:8, fiber:1, gi:"high", micro:{iron:0.8,calcium:60,vitC:0,vitB12:0.2,folate:8}, vitamins:["Calcium","Iron","B vitamins"], healthScore:4, swap:"Sweet filling — eat 1 piece only" },
  { id:322, name:"Rosogolla (Bengali)", category:"Bengali", veg:true, serving:"2 pcs (80g)", cal:180, protein:4, carbs:32, fat:4, fiber:0, gi:"high", micro:{iron:0.2,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:3, swap:"Pure sugar — limit to 1 piece" },
  { id:323, name:"Cham Cham", category:"Bengali", veg:true, serving:"2 pcs (80g)", cal:200, protein:5, carbs:30, fat:7, fiber:0, gi:"high", micro:{iron:0.3,calcium:55,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","B2","Protein"], healthScore:3, swap:"Sweet — share or limit portion" },
  { id:324, name:"Sondesh", category:"Bengali", veg:true, serving:"2 pcs (60g)", cal:150, protein:5, carbs:20, fat:5, fiber:0, gi:"high", micro:{iron:0.2,calcium:60,vitC:0,vitB12:0.2,folate:4}, vitamins:["Calcium","Protein"], healthScore:5, swap:"Lower cal Bengali sweet option" },
  { id:325, name:"Kathi Roll (Egg)", category:"Bengali", veg:false, serving:"1 roll (180g)", cal:320, protein:14, carbs:32, fat:16, fiber:2, gi:"medium", micro:{iron:2,calcium:30,vitC:5,vitB12:0.8,folate:20}, vitamins:["Iron","B12","Protein"], healthScore:5, swap:"Skip extra butter on paratha" },

  // ─── Kerala Dishes (326–340) ──────────────────────────────────────────
  { id:326, name:"Idiyappam (String Hoppers)", category:"Kerala", veg:true, serving:"3 pcs (120g)", cal:170, protein:3, carbs:34, fat:2, fiber:1, gi:"medium", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Pair with egg curry for protein" },
  { id:327, name:"Kadala Curry", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:220, protein:10, carbs:30, fat:7, fiber:6, gi:"low", micro:{iron:3,calcium:50,vitC:4,vitB12:0,folate:60}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"High fiber — great with puttu/appam" },
  { id:328, name:"Kerala Parotta", category:"Kerala", veg:true, serving:"1 pc (100g)", cal:280, protein:5, carbs:38, fat:12, fiber:1, gi:"high", micro:{iron:1.2,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Maida-based — switch to wheat roti" },
  { id:329, name:"Erissery (Pumpkin Curry)", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:180, protein:6, carbs:24, fat:7, fiber:4, gi:"low", micro:{iron:1.5,calcium:30,vitC:10,vitB12:0,folate:25}, vitamins:["Vitamin A","Iron","Fiber"], healthScore:8, swap:"Nutritious pumpkin + beans combo" },
  { id:330, name:"Kerala Prawn Curry", category:"Kerala", veg:false, serving:"1 bowl (200g)", cal:260, protein:22, carbs:10, fat:15, fiber:2, gi:"low", micro:{iron:2,calcium:50,vitC:5,vitB12:2,folate:12}, vitamins:["B12","Selenium","Omega-3"], healthScore:7, swap:"Use less coconut oil → save cal" },
  { id:331, name:"Malabar Fish Curry", category:"Kerala", veg:false, serving:"1 bowl (200g)", cal:240, protein:20, carbs:12, fat:13, fiber:2, gi:"low", micro:{iron:1.8,calcium:40,vitC:8,vitB12:2.5,folate:10}, vitamins:["B12","Omega-3","Vitamin C"], healthScore:7, swap:"Tamarind-based — lighter than coconut" },
  { id:332, name:"Banana Fry (Ethakka Mezhukupuratti)", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:200, protein:2, carbs:32, fat:8, fiber:3, gi:"medium", micro:{iron:0.5,calcium:8,vitC:10,vitB12:0,folate:15}, vitamins:["Potassium","Vitamin C","B6"], healthScore:5, swap:"Use raw banana for lower GI" },
  { id:333, name:"Palada Payasam", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:280, protein:6, carbs:40, fat:11, fiber:0, gi:"high", micro:{iron:0.3,calcium:120,vitC:1,vitB12:0.4,folate:5}, vitamins:["Calcium","B12","B2"], healthScore:3, swap:"Very rich — limit to small serving" },
  { id:334, name:"Ada Pradhaman", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:300, protein:4, carbs:45, fat:12, fiber:1, gi:"high", micro:{iron:0.8,calcium:30,vitC:1,vitB12:0,folate:5}, vitamins:["Iron","Coconut MCTs"], healthScore:3, swap:"Jaggery-based but still high cal" },
  { id:335, name:"Kerala Chicken Stew", category:"Kerala", veg:false, serving:"1 bowl (250g)", cal:240, protein:20, carbs:14, fat:12, fiber:2, gi:"low", micro:{iron:1.5,calcium:30,vitC:8,vitB12:0.5,folate:10}, vitamins:["Protein","B6","Potassium"], healthScore:7, swap:"Coconut milk-based — lighter than curry" },
  { id:336, name:"Kerala Egg Roast", category:"Kerala", veg:false, serving:"2 eggs (200g)", cal:260, protein:14, carbs:10, fat:18, fiber:2, gi:"low", micro:{iron:2,calcium:50,vitC:5,vitB12:1.2,folate:25}, vitamins:["B12","Iron","Protein"], healthScore:6, swap:"Good protein — pair with appam" },
  { id:337, name:"Pazham Pori (Banana Fritter)", category:"Kerala", veg:true, serving:"2 pcs (100g)", cal:280, protein:3, carbs:40, fat:12, fiber:2, gi:"high", micro:{iron:0.5,calcium:8,vitC:5,vitB12:0,folate:8}, vitamins:["Potassium","B6"], healthScore:3, swap:"Deep fried — enjoy occasionally" },
  { id:338, name:"Olan (Ash Gourd Curry)", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:130, protein:3, carbs:16, fat:6, fiber:3, gi:"low", micro:{iron:0.8,calcium:25,vitC:8,vitB12:0,folate:12}, vitamins:["Vitamin C","Potassium","Fiber"], healthScore:8, swap:"Very light and healthy!" },
  { id:339, name:"Thoran (Cabbage Stir Fry)", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:110, protein:3, carbs:12, fat:6, fiber:4, gi:"low", micro:{iron:1,calcium:35,vitC:20,vitB12:0,folate:30}, vitamins:["Vitamin C","Fiber","Folate"], healthScore:8, swap:"Great low-cal veggie side" },
  { id:340, name:"Kerala Fish Moilee", category:"Kerala", veg:false, serving:"1 bowl (200g)", cal:250, protein:20, carbs:8, fat:16, fiber:1, gi:"low", micro:{iron:1.5,calcium:35,vitC:5,vitB12:2.5,folate:10}, vitamins:["B12","Omega-3","Vitamin D"], healthScore:7, swap:"Mild coconut curry — lighter option" },

  // ─── Tamil Nadu Dishes (341–355) ──────────────────────────────────────
  { id:341, name:"Ven Pongal", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:250, protein:7, carbs:36, fat:9, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:20}, vitamins:["Iron","B vitamins","Fiber"], healthScore:6, swap:"Use less ghee → save 50 cal" },
  { id:342, name:"Sakkarai Pongal (Sweet Pongal)", category:"South Indian", veg:true, serving:"1 bowl (150g)", cal:300, protein:5, carbs:48, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:20,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Festival food — limit portion" },
  { id:343, name:"Sundal (Chickpea Snack)", category:"South Indian", veg:true, serving:"1 bowl (150g)", cal:180, protein:9, carbs:26, fat:4, fiber:6, gi:"low", micro:{iron:2.5,calcium:40,vitC:3,vitB12:0,folate:55}, vitamins:["Folate","Iron","Fiber"], healthScore:9, swap:"Great healthy snack!" },
  { id:344, name:"Paniyaram (Sweet/Savory)", category:"South Indian", veg:true, serving:"5 pcs (120g)", cal:190, protein:4, carbs:30, fat:6, fiber:2, gi:"medium", micro:{iron:1.2,calcium:12,vitC:1,vitB12:0,folate:15}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Fermented batter — good for gut" },
  { id:345, name:"Adai (Multi-Lentil Dosa)", category:"South Indian", veg:true, serving:"1 pc (100g)", cal:200, protein:8, carbs:28, fat:6, fiber:4, gi:"low", micro:{iron:2,calcium:20,vitC:2,vitB12:0,folate:40}, vitamins:["Folate","Iron","Protein"], healthScore:8, swap:"Multi-lentil = more protein than dosa" },
  { id:346, name:"Kothu Parotta", category:"South Indian", veg:false, serving:"1 plate (250g)", cal:420, protein:16, carbs:42, fat:22, fiber:2, gi:"high", micro:{iron:2.5,calcium:25,vitC:3,vitB12:0.5,folate:15}, vitamins:["Iron","B vitamins","Protein"], healthScore:3, swap:"Very heavy — share a plate" },
  { id:347, name:"Kozhambu (Tamarind Curry)", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:130, protein:4, carbs:18, fat:5, fiber:3, gi:"low", micro:{iron:1.5,calcium:30,vitC:10,vitB12:0,folate:20}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:8, swap:"Tangy low-cal curry — excellent!" },
  { id:348, name:"Murukku", category:"South Indian", veg:true, serving:"5 pcs (50g)", cal:250, protein:4, carbs:28, fat:14, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Deep fried snack — eat sparingly" },
  { id:349, name:"Poriyal (Dry Vegetable Stir Fry)", category:"South Indian", veg:true, serving:"1 bowl (150g)", cal:100, protein:3, carbs:12, fat:5, fiber:4, gi:"low", micro:{iron:1,calcium:30,vitC:15,vitB12:0,folate:25}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:9, swap:"Healthy everyday veggie side" },
  { id:350, name:"Kootu Curry", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:7, carbs:22, fat:5, fiber:5, gi:"low", micro:{iron:2,calcium:35,vitC:8,vitB12:0,folate:40}, vitamins:["Folate","Iron","Fiber"], healthScore:8, swap:"Dal + veggie combo — nutritious" },
  { id:351, name:"Nattu Kozhi Kulambu (Country Chicken)", category:"South Indian", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:2, gi:"low", micro:{iron:2.5,calcium:20,vitC:5,vitB12:0.8,folate:10}, vitamins:["Protein","Iron","B6"], healthScore:6, swap:"Country chicken = leaner than broiler" },
  { id:352, name:"Kuzhi Paniyaram", category:"South Indian", veg:true, serving:"6 pcs (120g)", cal:180, protein:4, carbs:28, fat:6, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:1,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Fermented snack — better than fried" },
  { id:353, name:"Parotta (Malabar)", category:"South Indian", veg:true, serving:"1 pc (100g)", cal:280, protein:5, carbs:38, fat:12, fiber:1, gi:"high", micro:{iron:1.2,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Maida-based — choose chapati instead" },
  { id:354, name:"Vazhakkai Bajji (Banana Bajji)", category:"South Indian", veg:true, serving:"4 pcs (100g)", cal:220, protein:3, carbs:30, fat:10, fiber:2, gi:"medium", micro:{iron:0.5,calcium:8,vitC:6,vitB12:0,folate:10}, vitamins:["Potassium","B6","Iron"], healthScore:4, swap:"Air fry for fewer calories" },
  { id:355, name:"Mor Kuzhambu (Yogurt Curry)", category:"South Indian", veg:true, serving:"1 bowl (200g)", cal:120, protein:4, carbs:14, fat:5, fiber:2, gi:"low", micro:{iron:0.8,calcium:90,vitC:3,vitB12:0.3,folate:12}, vitamins:["Calcium","Probiotics","B2"], healthScore:8, swap:"Low-cal probiotic curry — excellent!" },

  // ─── Kashmiri Dishes (356–365) ────────────────────────────────────────
  { id:356, name:"Kashmiri Dum Aloo", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:280, protein:5, carbs:30, fat:16, fiber:3, gi:"medium", micro:{iron:1.5,calcium:25,vitC:12,vitB12:0,folate:15}, vitamins:["Vitamin C","Iron","B6"], healthScore:5, swap:"Rich gravy — eat with roti not rice" },
  { id:357, name:"Yakhni (Yogurt Curry)", category:"North Indian", veg:false, serving:"1 bowl (250g)", cal:300, protein:22, carbs:10, fat:20, fiber:1, gi:"low", micro:{iron:2,calcium:80,vitC:2,vitB12:1.5,folate:8}, vitamins:["Calcium","B12","Protein"], healthScore:6, swap:"Yogurt-based — lighter than red curry" },
  { id:358, name:"Gustaba (Meatball Curry)", category:"North Indian", veg:false, serving:"1 bowl (200g)", cal:360, protein:22, carbs:8, fat:28, fiber:1, gi:"low", micro:{iron:3,calcium:60,vitC:2,vitB12:2.5,folate:8}, vitamins:["B12","Iron","Calcium"], healthScore:4, swap:"Rich Wazwan dish — eat moderately" },
  { id:359, name:"Kashmiri Pulao", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:320, protein:6, carbs:48, fat:12, fiber:2, gi:"high", micro:{iron:1,calcium:25,vitC:2,vitB12:0,folate:10}, vitamins:["Iron","Vitamin E","B vitamins"], healthScore:5, swap:"Sweet pulao — watch portion size" },
  { id:360, name:"Kahwah (Kashmiri Tea)", category:"Drinks", veg:true, serving:"1 cup (150ml)", cal:30, protein:1, carbs:5, fat:1, fiber:0, gi:"low", micro:{iron:0.3,calcium:5,vitC:3,vitB12:0,folate:2}, vitamins:["Antioxidants","Vitamin E","Saffron"], healthScore:9, swap:"Healthy spiced tea — skip sugar" },
  { id:361, name:"Nadru Yakhni (Lotus Stem Curry)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:22, fat:8, fiber:4, gi:"low", micro:{iron:1.5,calcium:40,vitC:10,vitB12:0,folate:15}, vitamins:["Iron","Vitamin C","Fiber"], healthScore:7, swap:"Lotus stem = good fiber source" },
  { id:362, name:"Haak Saag (Collard Greens)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:100, protein:4, carbs:10, fat:5, fiber:5, gi:"low", micro:{iron:2.5,calcium:120,vitC:30,vitB12:0,folate:60}, vitamins:["Calcium","Vitamin C","Iron","Folate"], healthScore:9, swap:"Super nutritious leafy green!" },
  { id:363, name:"Modur Pulao (Sweet Rice)", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:340, protein:5, carbs:55, fat:11, fiber:1, gi:"high", micro:{iron:0.8,calcium:20,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","Vitamin E"], healthScore:4, swap:"Sweet dish — treat as dessert" },
  { id:364, name:"Rista (Mutton Meatballs Red)", category:"North Indian", veg:false, serving:"3 pcs (180g)", cal:340, protein:24, carbs:8, fat:24, fiber:1, gi:"low", micro:{iron:3.5,calcium:20,vitC:4,vitB12:3,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Part of Wazwan — limit portion" },
  { id:365, name:"Kashmiri Rajma", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:220, protein:12, carbs:32, fat:5, fiber:8, gi:"low", micro:{iron:3,calcium:50,vitC:3,vitB12:0,folate:80}, vitamins:["Folate","Iron","Fiber"], healthScore:8, swap:"High fiber — great everyday dal" },

  // ─── Maharashtrian Dishes (366–380) ───────────────────────────────────
  { id:366, name:"Sabudana Vada", category:"Maharashtrian", veg:true, serving:"2 pcs (100g)", cal:260, protein:4, carbs:34, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Potassium","B vitamins"], healthScore:4, swap:"Fasting snack — deep fried though" },
  { id:367, name:"Thalipeeth", category:"Maharashtrian", veg:true, serving:"1 pc (100g)", cal:200, protein:6, carbs:28, fat:8, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:2,vitB12:0,folate:25}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Multi-grain flatbread — nutritious!" },
  { id:368, name:"Modak (Steamed)", category:"Maharashtrian", veg:true, serving:"2 pcs (80g)", cal:200, protein:3, carbs:32, fat:7, fiber:2, gi:"high", micro:{iron:0.5,calcium:15,vitC:1,vitB12:0,folate:5}, vitamins:["Iron","Coconut MCTs"], healthScore:4, swap:"Steamed is better than fried version" },
  { id:369, name:"Puran Poli", category:"Maharashtrian", veg:true, serving:"1 pc (100g)", cal:280, protein:6, carbs:45, fat:8, fiber:3, gi:"high", micro:{iron:1.5,calcium:20,vitC:1,vitB12:0,folate:20}, vitamins:["Iron","Fiber","B vitamins"], healthScore:4, swap:"Festival sweet — eat 1 piece max" },
  { id:370, name:"Bharli Vangi (Stuffed Eggplant)", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:180, protein:4, carbs:18, fat:10, fiber:5, gi:"low", micro:{iron:1.5,calcium:25,vitC:8,vitB12:0,folate:20}, vitamins:["Fiber","Iron","Antioxidants"], healthScore:7, swap:"Good masala base — nutritious" },
  { id:371, name:"Usal (Sprouts Curry)", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:26, fat:5, fiber:6, gi:"low", micro:{iron:2.5,calcium:35,vitC:8,vitB12:0,folate:65}, vitamins:["Folate","Iron","Protein","Fiber"], healthScore:9, swap:"Sprout-based — excellent nutrition!" },
  { id:372, name:"Batata Vada", category:"Maharashtrian", veg:true, serving:"2 pcs (120g)", cal:280, protein:5, carbs:30, fat:16, fiber:2, gi:"high", micro:{iron:1.2,calcium:12,vitC:8,vitB12:0,folate:12}, vitamins:["Vitamin C","Iron","B6"], healthScore:3, swap:"Deep fried — try baked version" },
  { id:373, name:"Kothimbir Vadi (Coriander Fritters)", category:"Maharashtrian", veg:true, serving:"4 pcs (80g)", cal:180, protein:4, carbs:22, fat:8, fiber:2, gi:"medium", micro:{iron:1.5,calcium:20,vitC:10,vitB12:0,folate:15}, vitamins:["Vitamin C","Iron","Folate"], healthScore:5, swap:"Steam first, then shallow fry" },
  { id:374, name:"Pithla Bhakri", category:"Maharashtrian", veg:true, serving:"1 plate (200g)", cal:280, protein:10, carbs:40, fat:9, fiber:4, gi:"medium", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Besan + jowar — good protein combo" },
  { id:375, name:"Varan Bhaat (Dal Rice)", category:"Maharashtrian", veg:true, serving:"1 plate (300g)", cal:310, protein:10, carbs:50, fat:7, fiber:4, gi:"medium", micro:{iron:2,calcium:25,vitC:2,vitB12:0,folate:40}, vitamins:["Iron","Folate","Fiber"], healthScore:7, swap:"Everyday comfort meal — balanced" },
  { id:376, name:"Alu Vadi (Colocasia Rolls)", category:"Maharashtrian", veg:true, serving:"4 pcs (100g)", cal:170, protein:3, carbs:22, fat:8, fiber:3, gi:"medium", micro:{iron:1.2,calcium:30,vitC:5,vitB12:0,folate:15}, vitamins:["Iron","Calcium","Fiber"], healthScore:6, swap:"Steamed version is healthier" },
  { id:377, name:"Shev Bhaji", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:200, protein:5, carbs:24, fat:10, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:12}, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:5, swap:"Use less sev topping" },
  { id:378, name:"Amti (Maharashtrian Dal)", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:180, protein:8, carbs:26, fat:5, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:4,vitB12:0,folate:50}, vitamins:["Folate","Iron","Fiber"], healthScore:8, swap:"Kokum-flavored dal — great taste" },
  { id:379, name:"Zunka (Dry Besan Curry)", category:"Maharashtrian", veg:true, serving:"1 bowl (150g)", cal:160, protein:7, carbs:18, fat:7, fiber:3, gi:"low", micro:{iron:2,calcium:20,vitC:3,vitB12:0,folate:25}, vitamins:["Iron","Protein","Folate"], healthScore:7, swap:"High protein from besan" },
  { id:380, name:"Kolhapuri Chicken", category:"Maharashtrian", veg:false, serving:"1 bowl (200g)", cal:320, protein:24, carbs:10, fat:22, fiber:2, gi:"low", micro:{iron:2.5,calcium:20,vitC:5,vitB12:0.8,folate:10}, vitamins:["Protein","Iron","B6"], healthScore:5, swap:"Spicy — reduce oil for fewer cal" },

  // ─── Andhra/Telangana Dishes (381–393) ────────────────────────────────
  { id:381, name:"Gongura Chicken", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:300, protein:24, carbs:8, fat:20, fiber:3, gi:"low", micro:{iron:3,calcium:60,vitC:15,vitB12:0.8,folate:30}, vitamins:["Iron","Vitamin C","Folate"], healthScore:6, swap:"Gongura leaf adds great nutrition" },
  { id:382, name:"Gongura Pachadi (Chutney)", category:"Andhra", veg:true, serving:"2 tbsp (40g)", cal:50, protein:1, carbs:4, fat:3, fiber:2, gi:"low", micro:{iron:1.5,calcium:40,vitC:12,vitB12:0,folate:20}, vitamins:["Iron","Vitamin C","Folate"], healthScore:8, swap:"Very nutritious condiment!" },
  { id:383, name:"Punugulu (Bonda)", category:"Andhra", veg:true, serving:"5 pcs (100g)", cal:250, protein:4, carbs:32, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:1,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Deep fried — try paniyaram instead" },
  { id:384, name:"Mirchi Bajji", category:"Andhra", veg:true, serving:"3 pcs (100g)", cal:220, protein:4, carbs:24, fat:12, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:30,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron"], healthScore:4, swap:"Rich in Vit C but fried — air fry" },
  { id:385, name:"Gutti Vankaya (Stuffed Eggplant)", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:190, protein:4, carbs:18, fat:12, fiber:5, gi:"low", micro:{iron:1.5,calcium:20,vitC:6,vitB12:0,folate:18}, vitamins:["Fiber","Iron","Antioxidants"], healthScore:7, swap:"Peanut stuffing adds protein" },
  { id:386, name:"Hyderabadi Double Ka Meetha", category:"Andhra", veg:true, serving:"1 bowl (100g)", cal:300, protein:6, carbs:40, fat:13, fiber:0, gi:"high", micro:{iron:0.5,calcium:60,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","B2"], healthScore:2, swap:"Very rich dessert — small portion" },
  { id:387, name:"Hyderabadi Marag (Bone Soup)", category:"Andhra", veg:false, serving:"1 bowl (200ml)", cal:180, protein:15, carbs:5, fat:12, fiber:0, gi:"low", micro:{iron:2,calcium:20,vitC:2,vitB12:2,folate:5}, vitamins:["Collagen","B12","Iron"], healthScore:6, swap:"Rich in collagen — good for joints" },
  { id:388, name:"Pesarattu Upma", category:"Andhra", veg:true, serving:"1 plate (200g)", cal:260, protein:10, carbs:36, fat:8, fiber:4, gi:"low", micro:{iron:2.5,calcium:20,vitC:3,vitB12:0,folate:45}, vitamins:["Folate","Iron","Protein"], healthScore:8, swap:"Moong dosa + upma = power combo" },
  { id:389, name:"Andhra Chicken Curry", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:300, protein:24, carbs:8, fat:20, fiber:2, gi:"low", micro:{iron:2,calcium:20,vitC:6,vitB12:0.8,folate:10}, vitamins:["Protein","Iron","B6"], healthScore:6, swap:"Spicy — use less oil" },
  { id:390, name:"Bobbatlu (Andhra Puran Poli)", category:"Andhra", veg:true, serving:"1 pc (100g)", cal:270, protein:6, carbs:44, fat:8, fiber:3, gi:"high", micro:{iron:1.5,calcium:20,vitC:1,vitB12:0,folate:20}, vitamins:["Iron","Fiber","B vitamins"], healthScore:4, swap:"Sweet — eat 1 piece only" },
  { id:391, name:"Gongura Mutton", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:360, protein:26, carbs:8, fat:26, fiber:3, gi:"low", micro:{iron:4,calcium:60,vitC:12,vitB12:3,folate:25}, vitamins:["B12","Iron","Vitamin C"], healthScore:5, swap:"Rich but nutritious from gongura" },
  { id:392, name:"Natu Kodi Pulusu (Country Chicken)", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:2, gi:"low", micro:{iron:2.5,calcium:20,vitC:8,vitB12:0.8,folate:10}, vitamins:["Protein","Iron","B6"], healthScore:6, swap:"Tamarind-based — tangy & lighter" },
  { id:393, name:"Pesara Pappu (Moong Dal Andhra)", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:26, fat:4, fiber:5, gi:"low", micro:{iron:2,calcium:25,vitC:3,vitB12:0,folate:60}, vitamins:["Folate","Iron","Fiber"], healthScore:9, swap:"Simple nutritious everyday dal" },

  // ─── Gujarati Dishes (394–405) ────────────────────────────────────────
  { id:394, name:"Fafda", category:"Gujarati", veg:true, serving:"4 pcs (80g)", cal:280, protein:6, carbs:28, fat:16, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:15}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Deep fried besan — eat with jalebi sparingly" },
  { id:395, name:"Gathiya", category:"Gujarati", veg:true, serving:"1 bowl (60g)", cal:260, protein:6, carbs:24, fat:16, fiber:2, gi:"high", micro:{iron:1.5,calcium:12,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","Protein"], healthScore:3, swap:"Similar to fafda — enjoy occasionally" },
  { id:396, name:"Khaman (Besan Dhokla)", category:"Gujarati", veg:true, serving:"4 pcs (120g)", cal:180, protein:7, carbs:26, fat:5, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:2,vitB12:0,folate:25}, vitamins:["Folate","Iron","Protein"], healthScore:7, swap:"Steamed — healthier than fried snacks" },
  { id:397, name:"Sev Khamani", category:"Gujarati", veg:true, serving:"1 bowl (150g)", cal:220, protein:8, carbs:28, fat:8, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:20}, vitamins:["Iron","Protein","B vitamins"], healthScore:6, swap:"Tasty snack — skip extra sev" },
  { id:398, name:"Locho", category:"Gujarati", veg:true, serving:"1 bowl (150g)", cal:200, protein:7, carbs:28, fat:6, fiber:2, gi:"medium", micro:{iron:1.5,calcium:12,vitC:2,vitB12:0,folate:20}, vitamins:["Iron","Folate","Protein"], healthScore:6, swap:"Soft dhokla variant — nutritious" },
  { id:399, name:"Dal Dhokli", category:"Gujarati", veg:true, serving:"1 bowl (250g)", cal:280, protein:10, carbs:40, fat:8, fiber:4, gi:"medium", micro:{iron:2.5,calcium:25,vitC:3,vitB12:0,folate:40}, vitamins:["Folate","Iron","Fiber"], healthScore:7, swap:"Dal + wheat — complete protein meal" },
  { id:400, name:"Sev Tameta (Tomato Sev Curry)", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:200, protein:4, carbs:24, fat:10, fiber:2, gi:"medium", micro:{iron:1,calcium:15,vitC:15,vitB12:0,folate:12}, vitamins:["Vitamin C","Lycopene","Iron"], healthScore:5, swap:"Quick curry — use less sev" },
  { id:401, name:"Muthiya (Steamed Dumplings)", category:"Gujarati", veg:true, serving:"4 pcs (100g)", cal:180, protein:5, carbs:26, fat:6, fiber:3, gi:"medium", micro:{iron:1.5,calcium:20,vitC:5,vitB12:0,folate:20}, vitamins:["Iron","Fiber","Folate"], healthScore:7, swap:"Steamed — healthy snack option" },
  { id:402, name:"Khakhra", category:"Gujarati", veg:true, serving:"2 pcs (40g)", cal:130, protein:4, carbs:20, fat:4, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Low cal crispy snack — great choice" },
  { id:403, name:"Gujarati Kadhi", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:150, protein:5, carbs:18, fat:6, fiber:1, gi:"low", micro:{iron:0.8,calcium:70,vitC:2,vitB12:0.2,folate:12}, vitamins:["Calcium","Probiotics","B2"], healthScore:7, swap:"Sweet-tangy kadhi — balanced meal" },
  { id:404, name:"Handvo (Mixed Veggie Cake)", category:"Gujarati", veg:true, serving:"1 slice (100g)", cal:190, protein:6, carbs:28, fat:6, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:20}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Fermented + veggies = nutritious" },
  { id:405, name:"Dabeli", category:"Gujarati", veg:true, serving:"1 pc (120g)", cal:250, protein:5, carbs:35, fat:10, fiber:2, gi:"medium", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:5, swap:"Street food — skip extra butter" },

  // ─── Rajasthani Dishes (406–413) ──────────────────────────────────────
  { id:406, name:"Pyaaz Kachori", category:"North Indian", veg:true, serving:"1 pc (80g)", cal:280, protein:5, carbs:30, fat:16, fiber:2, gi:"high", micro:{iron:1.2,calcium:12,vitC:3,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Deep fried — enjoy only occasionally" },
  { id:407, name:"Mirchi Vada", category:"North Indian", veg:true, serving:"1 pc (80g)", cal:200, protein:4, carbs:22, fat:11, fiber:2, gi:"medium", micro:{iron:0.8,calcium:10,vitC:25,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron"], healthScore:4, swap:"High Vit C from chili but fried" },
  { id:408, name:"Papad Ki Sabzi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:150, protein:5, carbs:16, fat:7, fiber:2, gi:"medium", micro:{iron:1,calcium:15,vitC:3,vitB12:0,folate:10}, vitamins:["Iron","Protein"], healthScore:6, swap:"Quick Rajasthani curry — low effort" },
  { id:409, name:"Bajre Ka Sogra", category:"North Indian", veg:true, serving:"1 pc (80g)", cal:200, protein:4, carbs:30, fat:8, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:0,vitB12:0,folate:15}, vitamins:["Iron","Fiber","B vitamins"], healthScore:6, swap:"Millet-based — nutritious" },
  { id:410, name:"Ghevar", category:"Sweets", veg:true, serving:"1 pc (80g)", cal:320, protein:3, carbs:42, fat:16, fiber:0, gi:"high", micro:{iron:0.5,calcium:15,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Festival sweet — very high cal" },
  { id:411, name:"Mawa Kachori", category:"Sweets", veg:true, serving:"1 pc (60g)", cal:280, protein:4, carbs:30, fat:16, fiber:1, gi:"high", micro:{iron:0.5,calcium:30,vitC:0,vitB12:0.1,folate:3}, vitamins:["Calcium","Iron"], healthScore:2, swap:"Sweet + fried = double trouble" },
  { id:412, name:"Laal Maas (Red Mutton Curry)", category:"North Indian", veg:false, serving:"1 bowl (200g)", cal:380, protein:26, carbs:6, fat:28, fiber:1, gi:"low", micro:{iron:3.5,calcium:20,vitC:5,vitB12:3,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Very rich — small portions only" },
  { id:413, name:"Bajra Roti", category:"North Indian", veg:true, serving:"1 pc (60g)", cal:120, protein:3, carbs:22, fat:2, fiber:3, gi:"low", micro:{iron:2.5,calcium:25,vitC:0,vitB12:0,folate:15}, vitamins:["Iron","Fiber","Magnesium"], healthScore:8, swap:"Millet roti — great for diabetics" },

  // ─── Assamese/Northeast Dishes (414–421) ──────────────────────────────
  { id:414, name:"Masor Tenga (Sour Fish Curry)", category:"North Indian", veg:false, serving:"1 bowl (250g)", cal:220, protein:20, carbs:12, fat:10, fiber:2, gi:"low", micro:{iron:1.5,calcium:30,vitC:15,vitB12:2.5,folate:10}, vitamins:["B12","Vitamin C","Omega-3"], healthScore:7, swap:"Light tangy fish curry — healthy" },
  { id:415, name:"Khar (Alkaline Dish)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:100, protein:3, carbs:14, fat:4, fiber:3, gi:"low", micro:{iron:1,calcium:20,vitC:8,vitB12:0,folate:15}, vitamins:["Potassium","Iron","Fiber"], healthScore:8, swap:"Traditional alkaline dish — detoxing" },
  { id:416, name:"Aloo Pitika (Mashed Potato)", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:140, protein:3, carbs:24, fat:4, fiber:2, gi:"medium", micro:{iron:0.8,calcium:10,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin C","B6","Potassium"], healthScore:6, swap:"Simple comfort food — watch oil" },
  { id:417, name:"Pitha (Rice Cake Assamese)", category:"North Indian", veg:true, serving:"2 pcs (100g)", cal:200, protein:4, carbs:36, fat:5, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Festival rice cake — moderate portion" },
  { id:418, name:"Bamboo Shoot Curry", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:120, protein:4, carbs:14, fat:5, fiber:4, gi:"low", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Potassium","Iron"], healthScore:8, swap:"Low cal Northeast specialty" },
  { id:419, name:"Ou Tenga Curry (Elephant Apple)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:110, protein:2, carbs:16, fat:4, fiber:3, gi:"low", micro:{iron:0.8,calcium:15,vitC:20,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:8, swap:"Sour tangy curry — very light" },
  { id:420, name:"Xaak Bhaji (Assamese Greens)", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:80, protein:3, carbs:8, fat:4, fiber:4, gi:"low", micro:{iron:2.5,calcium:100,vitC:25,vitB12:0,folate:50}, vitamins:["Calcium","Iron","Vitamin C","Folate"], healthScore:9, swap:"Excellent leafy green nutrition!" },
  { id:421, name:"Duck Curry (Assamese)", category:"North Indian", veg:false, serving:"1 bowl (200g)", cal:340, protein:24, carbs:6, fat:24, fiber:1, gi:"low", micro:{iron:3,calcium:15,vitC:3,vitB12:1.5,folate:8}, vitamins:["B12","Iron","Protein"], healthScore:5, swap:"Rich — eat in moderation" },

  // ─── Odia Dishes (422–427) ────────────────────────────────────────────
  { id:422, name:"Dalma (Dal with Vegetables)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:8, carbs:26, fat:5, fiber:5, gi:"low", micro:{iron:2,calcium:30,vitC:10,vitB12:0,folate:45}, vitamins:["Folate","Iron","Fiber","Vitamin C"], healthScore:9, swap:"Odia superfood — dal + veggies!" },
  { id:423, name:"Chhena Poda (Baked Cheese)", category:"Sweets", veg:true, serving:"1 slice (80g)", cal:220, protein:8, carbs:28, fat:8, fiber:0, gi:"high", micro:{iron:0.3,calcium:80,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","Protein","B2"], healthScore:5, swap:"Baked — better than fried sweets" },
  { id:424, name:"Rasabali (Sweet)", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:240, protein:5, carbs:35, fat:9, fiber:0, gi:"high", micro:{iron:0.3,calcium:60,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:3, swap:"Rich Odia sweet — limit portion" },
  { id:425, name:"Pakhala Bhaat (Fermented Rice)", category:"North Indian", veg:true, serving:"1 bowl (250g)", cal:190, protein:4, carbs:40, fat:1, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:10}, vitamins:["Probiotics","B vitamins","Iron"], healthScore:6, swap:"Cooling fermented rice — summer food" },
  { id:426, name:"Santula (Mixed Veg Odia)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:110, protein:4, carbs:14, fat:4, fiber:5, gi:"low", micro:{iron:1.5,calcium:35,vitC:18,vitB12:0,folate:30}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:9, swap:"No oil/minimal oil — super healthy!" },
  { id:427, name:"Chhena Gaja", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:200, protein:4, carbs:28, fat:8, fiber:0, gi:"high", micro:{iron:0.2,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","Protein"], healthScore:3, swap:"Fried + sugary — eat sparingly" },

  // ─── Bihari/UP Dishes (428–436) ───────────────────────────────────────
  { id:428, name:"Thekua", category:"North Indian", veg:true, serving:"3 pcs (80g)", cal:260, protein:4, carbs:36, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Festival sweet — deep fried" },
  { id:429, name:"Baingan Chokha", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:100, protein:2, carbs:12, fat:5, fiber:4, gi:"low", micro:{iron:0.8,calcium:15,vitC:5,vitB12:0,folate:15}, vitamins:["Fiber","Iron","Antioxidants"], healthScore:8, swap:"Roasted eggplant — very healthy!" },
  { id:430, name:"Kadhi Bari (UP Style)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:200, protein:7, carbs:20, fat:10, fiber:2, gi:"medium", micro:{iron:1,calcium:70,vitC:2,vitB12:0.2,folate:15}, vitamins:["Calcium","Protein","Probiotics"], healthScore:6, swap:"Yogurt-based — good for digestion" },
  { id:431, name:"Bihari Mutton Curry", category:"North Indian", veg:false, serving:"1 bowl (200g)", cal:360, protein:26, carbs:8, fat:26, fiber:1, gi:"low", micro:{iron:3.5,calcium:20,vitC:3,vitB12:3,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Rich mutton — eat in moderation" },
  { id:432, name:"Tehri (Veg Rice UP)", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:260, protein:5, carbs:42, fat:8, fiber:3, gi:"medium", micro:{iron:1.5,calcium:20,vitC:5,vitB12:0,folate:15}, vitamins:["Iron","Vitamin A","B vitamins"], healthScore:6, swap:"One-pot rice — add more veggies" },
  { id:433, name:"Bedmi Puri", category:"North Indian", veg:true, serving:"2 pcs (80g)", cal:260, protein:6, carbs:28, fat:14, fiber:3, gi:"high", micro:{iron:1.5,calcium:15,vitC:1,vitB12:0,folate:20}, vitamins:["Iron","Protein","Fiber"], healthScore:4, swap:"Urad dal stuffed — deep fried though" },
  { id:434, name:"Baati (Plain)", category:"North Indian", veg:true, serving:"2 pcs (100g)", cal:300, protein:6, carbs:40, fat:13, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Baked wheat balls — skip extra ghee" },
  { id:435, name:"Chura Matar", category:"North Indian", veg:true, serving:"1 plate (150g)", cal:280, protein:6, carbs:40, fat:10, fiber:3, gi:"high", micro:{iron:2,calcium:15,vitC:5,vitB12:0,folate:20}, vitamins:["Iron","B vitamins","Fiber"], healthScore:5, swap:"Flattened rice + peas — quick meal" },
  { id:436, name:"Dhuska (Rice Lentil Fritter)", category:"North Indian", veg:true, serving:"2 pcs (100g)", cal:240, protein:6, carbs:30, fat:11, fiber:2, gi:"high", micro:{iron:1.5,calcium:12,vitC:1,vitB12:0,folate:15}, vitamins:["Iron","Protein","B vitamins"], healthScore:4, swap:"Deep fried — try steamed version" },

  // ─── Missing General: Parathas & Breads (437–443) ─────────────────────
  { id:437, name:"Egg Paratha", category:"Breakfast", veg:false, serving:"1 pc (120g)", cal:280, protein:10, carbs:30, fat:14, fiber:2, gi:"medium", micro:{iron:1.8,calcium:35,vitC:1,vitB12:0.6,folate:20}, vitamins:["B12","Iron","Protein"], healthScore:6, swap:"Good protein breakfast option" },
  { id:438, name:"Onion Paratha", category:"Breakfast", veg:true, serving:"1 pc (100g)", cal:240, protein:5, carbs:32, fat:10, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:4,vitB12:0,folate:12}, vitamins:["Iron","B vitamins","Quercetin"], healthScore:5, swap:"Use less oil when cooking" },
  { id:439, name:"Dal Paratha", category:"Breakfast", veg:true, serving:"1 pc (100g)", cal:230, protein:7, carbs:30, fat:9, fiber:3, gi:"medium", micro:{iron:2,calcium:18,vitC:1,vitB12:0,folate:25}, vitamins:["Iron","Folate","Protein"], healthScore:6, swap:"Dal stuffing adds protein" },
  { id:440, name:"Gobhi Paratha", category:"Breakfast", veg:true, serving:"1 pc (100g)", cal:220, protein:5, carbs:28, fat:10, fiber:3, gi:"medium", micro:{iron:1.2,calcium:20,vitC:15,vitB12:0,folate:20}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:6, swap:"Cauliflower adds fiber + Vit C" },
  { id:441, name:"Ragi Roti", category:"Breakfast", veg:true, serving:"1 pc (60g)", cal:110, protein:3, carbs:22, fat:1, fiber:4, gi:"low", micro:{iron:2,calcium:140,vitC:0,vitB12:0,folate:12}, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Ragi = calcium powerhouse!" },
  { id:442, name:"Akki Roti (Karnataka Rice Roti)", category:"South Indian", veg:true, serving:"1 pc (80g)", cal:150, protein:3, carbs:28, fat:3, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Rice flour roti — add veggies" },
  { id:443, name:"Jolada Rotti (Jowar Roti)", category:"South Indian", veg:true, serving:"1 pc (60g)", cal:120, protein:3, carbs:24, fat:1, fiber:3, gi:"low", micro:{iron:2.5,calcium:18,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","Fiber","Magnesium"], healthScore:8, swap:"Millet roti — great for health" },

  // ─── Missing General: Rice Dishes (444–449) ───────────────────────────
  { id:444, name:"Veg Fried Rice", category:"Chinese", veg:true, serving:"1 plate (250g)", cal:320, protein:7, carbs:48, fat:11, fiber:3, gi:"high", micro:{iron:1.5,calcium:20,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Vitamin C","B vitamins"], healthScore:5, swap:"Use brown rice for more fiber" },
  { id:445, name:"Mushroom Rice", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:260, protein:7, carbs:42, fat:7, fiber:3, gi:"medium", micro:{iron:1.5,calcium:10,vitC:3,vitB12:0,folate:20}, vitamins:["B vitamins","Selenium","Iron"], healthScore:6, swap:"Mushrooms add B vitamins" },
  { id:446, name:"Peas Pulao", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:250, protein:6, carbs:40, fat:7, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:25}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:6, swap:"Peas add protein + fiber to rice" },
  { id:447, name:"Paneer Fried Rice", category:"Chinese", veg:true, serving:"1 plate (250g)", cal:380, protein:14, carbs:46, fat:16, fiber:2, gi:"high", micro:{iron:1.5,calcium:120,vitC:5,vitB12:0.2,folate:12}, vitamins:["Calcium","Protein","Iron"], healthScore:5, swap:"High cal — eat smaller portion" },
  { id:448, name:"Quinoa Pulao", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:230, protein:8, carbs:36, fat:6, fiber:4, gi:"low", micro:{iron:2.5,calcium:25,vitC:3,vitB12:0,folate:35}, vitamins:["Iron","Folate","Complete Protein"], healthScore:9, swap:"Superfood grain — excellent choice!" },
  { id:449, name:"Foxtail Millet Rice", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:200, protein:5, carbs:38, fat:3, fiber:5, gi:"low", micro:{iron:2.5,calcium:20,vitC:0,vitB12:0,folate:15}, vitamins:["Iron","Fiber","Magnesium"], healthScore:9, swap:"Millet rice — great for diabetics" },

  // ─── Missing General: Veggie Curries & Sides (450–462) ────────────────
  { id:450, name:"Stuffed Capsicum", category:"North Indian", veg:true, serving:"2 pcs (200g)", cal:180, protein:5, carbs:20, fat:9, fiber:4, gi:"low", micro:{iron:1,calcium:15,vitC:60,vitB12:0,folate:20}, vitamins:["Vitamin C","Vitamin A","Fiber"], healthScore:8, swap:"Bell peppers = Vit C bombs!" },
  { id:451, name:"Tawa Vegetables", category:"North Indian", veg:true, serving:"1 plate (200g)", cal:160, protein:4, carbs:18, fat:8, fiber:4, gi:"low", micro:{iron:1.5,calcium:25,vitC:20,vitB12:0,folate:20}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:7, swap:"Good mixed veggie option" },
  { id:452, name:"Alu Methi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:24, fat:7, fiber:4, gi:"medium", micro:{iron:3,calcium:40,vitC:10,vitB12:0,folate:35}, vitamins:["Iron","Folate","Fiber"], healthScore:7, swap:"Methi adds iron + folate!" },
  { id:453, name:"Methi Matar", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:150, protein:7, carbs:18, fat:5, fiber:5, gi:"low", micro:{iron:3,calcium:35,vitC:12,vitB12:0,folate:40}, vitamins:["Iron","Folate","Vitamin C","Fiber"], healthScore:9, swap:"Iron-rich powerhouse dish!" },
  { id:454, name:"Veg Kofta Curry", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:300, protein:7, carbs:22, fat:20, fiber:3, gi:"medium", micro:{iron:1.5,calcium:30,vitC:5,vitB12:0,folate:15}, vitamins:["Iron","Vitamin A","B vitamins"], healthScore:4, swap:"Fried koftas — try baked version" },
  { id:455, name:"Paneer Kofta", category:"North Indian", veg:true, serving:"3 pcs + gravy (200g)", cal:350, protein:12, carbs:20, fat:26, fiber:2, gi:"medium", micro:{iron:1.5,calcium:120,vitC:4,vitB12:0.2,folate:10}, vitamins:["Calcium","Protein","Iron"], healthScore:4, swap:"Rich — eat with roti not naan" },
  { id:456, name:"Baby Corn Masala", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:160, protein:5, carbs:20, fat:7, fiber:3, gi:"low", micro:{iron:1,calcium:15,vitC:8,vitB12:0,folate:15}, vitamins:["Fiber","Iron","Vitamin C"], healthScore:7, swap:"Low cal veggie curry — good choice" },
  { id:457, name:"Corn Palak", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:180, protein:6, carbs:22, fat:8, fiber:4, gi:"low", micro:{iron:2.5,calcium:80,vitC:15,vitB12:0,folate:50}, vitamins:["Iron","Calcium","Folate","Vitamin C"], healthScore:8, swap:"Spinach + corn = nutrient-dense" },
  { id:458, name:"Soya Chunks Curry", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:220, protein:20, carbs:16, fat:8, fiber:4, gi:"low", micro:{iron:3,calcium:80,vitC:3,vitB12:0,folate:30}, vitamins:["Iron","Calcium","Protein"], healthScore:8, swap:"High protein veg option — excellent!" },
  { id:459, name:"Soya Granules Curry", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:200, protein:18, carbs:14, fat:7, fiber:3, gi:"low", micro:{iron:3,calcium:70,vitC:3,vitB12:0,folate:28}, vitamins:["Iron","Calcium","Protein"], healthScore:8, swap:"Versatile protein source" },
  { id:460, name:"Sabut Masoor Dal", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:190, protein:12, carbs:28, fat:3, fiber:6, gi:"low", micro:{iron:3,calcium:25,vitC:2,vitB12:0,folate:80}, vitamins:["Folate","Iron","Fiber"], healthScore:9, swap:"Whole lentil — very nutritious" },
  { id:461, name:"Lobia (Black-eyed Peas Curry)", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:200, protein:10, carbs:30, fat:4, fiber:6, gi:"low", micro:{iron:3,calcium:30,vitC:3,vitB12:0,folate:70}, vitamins:["Folate","Iron","Fiber"], healthScore:9, swap:"High fiber legume — excellent!" },
  { id:462, name:"Multi-grain Roti", category:"Breakfast", veg:true, serving:"1 pc (50g)", cal:110, protein:4, carbs:20, fat:2, fiber:3, gi:"low", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","Fiber","B vitamins"], healthScore:8, swap:"Better than plain wheat roti" },

  // ─── Non-Veg: Chicken Varieties (463–468) ─────────────────────────────
  { id:463, name:"Chicken 65", category:"Non-Veg", veg:false, serving:"6 pcs (150g)", cal:320, protein:22, carbs:18, fat:18, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0.5,folate:8}, vitamins:["Protein","Iron","B6"], healthScore:4, swap:"Deep fried — try grilled version" },
  { id:464, name:"Chilli Chicken", category:"Chinese", veg:false, serving:"1 plate (200g)", cal:340, protein:22, carbs:20, fat:20, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:15,vitB12:0.5,folate:8}, vitamins:["Protein","Vitamin C","Iron"], healthScore:4, swap:"Indo-Chinese — use less oil" },
  { id:465, name:"Dragon Chicken", category:"Chinese", veg:false, serving:"1 plate (200g)", cal:360, protein:20, carbs:24, fat:22, fiber:1, gi:"medium", micro:{iron:1.5,calcium:12,vitC:8,vitB12:0.5,folate:6}, vitamins:["Protein","Iron"], healthScore:3, swap:"Sweet + fried = high cal" },
  { id:466, name:"Schezwan Chicken", category:"Chinese", veg:false, serving:"1 plate (200g)", cal:330, protein:22, carbs:18, fat:20, fiber:2, gi:"medium", micro:{iron:1.5,calcium:12,vitC:10,vitB12:0.5,folate:6}, vitamins:["Protein","Iron","Vitamin C"], healthScore:4, swap:"Spicy — watch the oil content" },
  { id:467, name:"Shammi Kebab", category:"Non-Veg", veg:false, serving:"3 pcs (120g)", cal:240, protein:18, carbs:12, fat:14, fiber:1, gi:"low", micro:{iron:2.5,calcium:20,vitC:2,vitB12:1.5,folate:10}, vitamins:["B12","Iron","Protein"], healthScore:6, swap:"Pan fried — better than deep fried" },
  { id:468, name:"Kakori Kebab", category:"Non-Veg", veg:false, serving:"3 pcs (100g)", cal:220, protein:16, carbs:8, fat:14, fiber:0, gi:"low", micro:{iron:2.5,calcium:15,vitC:1,vitB12:2,folate:8}, vitamins:["B12","Iron","Protein"], healthScore:6, swap:"Lucknowi delicacy — melt in mouth" },

  // ─── Non-Veg: Fish & Seafood (469–472) ────────────────────────────────
  { id:469, name:"Fish Amritsari", category:"Non-Veg", veg:false, serving:"4 pcs (150g)", cal:300, protein:20, carbs:18, fat:18, fiber:1, gi:"medium", micro:{iron:1.5,calcium:25,vitC:3,vitB12:2,folate:8}, vitamins:["B12","Omega-3","Protein"], healthScore:5, swap:"Batter fried — try tandoori fish" },
  { id:470, name:"Pomfret Fry", category:"Non-Veg", veg:false, serving:"1 pc (150g)", cal:250, protein:22, carbs:10, fat:14, fiber:0, gi:"low", micro:{iron:1.5,calcium:30,vitC:2,vitB12:3,folate:6}, vitamins:["B12","Omega-3","Protein"], healthScore:6, swap:"Shallow fry with less oil" },
  { id:471, name:"Bombay Duck Fry", category:"Non-Veg", veg:false, serving:"4 pcs (100g)", cal:200, protein:16, carbs:10, fat:12, fiber:0, gi:"low", micro:{iron:1,calcium:20,vitC:1,vitB12:2,folate:5}, vitamins:["B12","Protein","Iron"], healthScore:5, swap:"Bombil fry — coastal specialty" },
  { id:472, name:"Paya Soup (Trotters)", category:"Non-Veg", veg:false, serving:"1 bowl (250ml)", cal:200, protein:18, carbs:8, fat:12, fiber:0, gi:"low", micro:{iron:2.5,calcium:30,vitC:2,vitB12:2,folate:5}, vitamins:["Collagen","B12","Iron"], healthScore:6, swap:"Rich in collagen — good for joints" },

  // ─── Drinks (473–482) ─────────────────────────────────────────────────
  { id:473, name:"Rooh Afza Sharbat", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:100, protein:0, carbs:25, fat:0, fiber:0, gi:"high", micro:{iron:0.2,calcium:5,vitC:2,vitB12:0,folate:2}, vitamins:["Herbal extracts"], healthScore:4, swap:"High sugar — dilute more" },
  { id:474, name:"Falooda", category:"Drinks", veg:true, serving:"1 glass (300ml)", cal:350, protein:6, carbs:55, fat:12, fiber:1, gi:"high", micro:{iron:0.5,calcium:80,vitC:2,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:2, swap:"Dessert drink — very high cal" },
  { id:475, name:"Kulfi Falooda", category:"Sweets", veg:true, serving:"1 serving (200g)", cal:380, protein:7, carbs:50, fat:16, fiber:1, gi:"high", micro:{iron:0.5,calcium:100,vitC:2,vitB12:0.3,folate:3}, vitamins:["Calcium","B2","Protein"], healthScore:2, swap:"Share — very high calorie dessert" },
  { id:476, name:"Shikanji (Lemon Drink)", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:60, protein:0, carbs:15, fat:0, fiber:0, gi:"medium", micro:{iron:0.2,calcium:5,vitC:20,vitB12:0,folate:3}, vitamins:["Vitamin C","Electrolytes"], healthScore:7, swap:"Use less sugar — refreshing!" },
  { id:477, name:"Kokum Sharbat", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:50, protein:0, carbs:12, fat:0, fiber:0, gi:"medium", micro:{iron:0.3,calcium:5,vitC:5,vitB12:0,folate:2}, vitamins:["Antioxidants","HCA"], healthScore:7, swap:"Natural coolant — low cal" },
  { id:478, name:"Aam Ras", category:"Drinks", veg:true, serving:"1 bowl (150g)", cal:130, protein:1, carbs:30, fat:1, fiber:2, gi:"high", micro:{iron:0.3,calcium:10,vitC:25,vitB12:0,folate:10}, vitamins:["Vitamin A","Vitamin C","Beta-carotene"], healthScore:5, swap:"Natural mango — enjoy in season" },
  { id:479, name:"Ragi Porridge", category:"Drinks", veg:true, serving:"1 bowl (200ml)", cal:120, protein:4, carbs:22, fat:2, fiber:3, gi:"low", micro:{iron:2,calcium:150,vitC:0,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Ragi = best calcium source!" },
  { id:480, name:"Sattu Sharbat", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:100, protein:6, carbs:16, fat:2, fiber:2, gi:"low", micro:{iron:2,calcium:15,vitC:1,vitB12:0,folate:15}, vitamins:["Iron","Protein","Fiber"], healthScore:8, swap:"Protein-rich traditional drink" },
  { id:481, name:"Jal Jeera", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:25, protein:0, carbs:5, fat:0, fiber:0, gi:"low", micro:{iron:0.5,calcium:5,vitC:5,vitB12:0,folate:3}, vitamins:["Iron","Vitamin C","Digestive"], healthScore:8, swap:"Almost zero cal — great digestive" },
  { id:482, name:"Thandai", category:"Drinks", veg:true, serving:"1 glass (200ml)", cal:200, protein:5, carbs:28, fat:8, fiber:1, gi:"medium", micro:{iron:1,calcium:80,vitC:2,vitB12:0.2,folate:8}, vitamins:["Calcium","Iron","Vitamin E"], healthScore:5, swap:"Nut-based — nutritious but rich" },

  // ─── Sweets (483–500) ─────────────────────────────────────────────────
  { id:483, name:"Balushahi", category:"Sweets", veg:true, serving:"1 pc (50g)", cal:220, protein:2, carbs:28, fat:12, fiber:0, gi:"high", micro:{iron:0.3,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Deep fried + sugar soaked — avoid" },
  { id:484, name:"Petha (Agra)", category:"Sweets", veg:true, serving:"2 pcs (60g)", cal:140, protein:0, carbs:35, fat:0, fiber:0, gi:"high", micro:{iron:0.2,calcium:5,vitC:2,vitB12:0,folate:2}, vitamins:["Vitamin C"], healthScore:3, swap:"Pure sugar — eat 1 piece max" },
  { id:485, name:"Gujiya", category:"Sweets", veg:true, serving:"1 pc (50g)", cal:200, protein:3, carbs:26, fat:10, fiber:1, gi:"high", micro:{iron:0.5,calcium:15,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Dry fruit minerals"], healthScore:3, swap:"Bake instead of frying" },
  { id:486, name:"Mawa Gujiya", category:"Sweets", veg:true, serving:"1 pc (60g)", cal:250, protein:4, carbs:28, fat:14, fiber:1, gi:"high", micro:{iron:0.5,calcium:30,vitC:0,vitB12:0.1,folate:3}, vitamins:["Calcium","Iron"], healthScore:2, swap:"Extra rich — share with others" },
  { id:487, name:"Til Chikki", category:"Sweets", veg:true, serving:"2 pcs (40g)", cal:180, protein:4, carbs:22, fat:8, fiber:2, gi:"medium", micro:{iron:2,calcium:80,vitC:0,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Zinc"], healthScore:5, swap:"Sesame = good calcium + iron" },
  { id:488, name:"Gond Ladoo", category:"Sweets", veg:true, serving:"1 pc (40g)", cal:200, protein:3, carbs:22, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:20,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Calcium"], healthScore:4, swap:"Winter energy food — limit 1/day" },
  { id:489, name:"Atta Halwa", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:300, protein:4, carbs:36, fat:16, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Lots of ghee + sugar — limit portion" },
  { id:490, name:"Double Ka Meetha", category:"Sweets", veg:true, serving:"1 bowl (100g)", cal:300, protein:6, carbs:38, fat:14, fiber:0, gi:"high", micro:{iron:0.5,calcium:60,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","B2"], healthScore:2, swap:"Fried bread + sugar syrup — heavy" },
  { id:491, name:"Sheer Khurma", category:"Sweets", veg:true, serving:"1 bowl (150g)", cal:280, protein:7, carbs:36, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:80,vitC:1,vitB12:0.3,folate:8}, vitamins:["Calcium","Iron","Vitamin E"], healthScore:4, swap:"Eid special — enjoy small bowl" },
  { id:492, name:"Malpua (Bengali Style)", category:"Sweets", veg:true, serving:"2 pcs (80g)", cal:280, protein:4, carbs:36, fat:14, fiber:0, gi:"high", micro:{iron:0.8,calcium:30,vitC:0,vitB12:0.1,folate:5}, vitamins:["Iron","Calcium"], healthScore:2, swap:"Fried + syrup — special occasion only" },

  // ─── Snacks (493–510) ─────────────────────────────────────────────────
  { id:493, name:"Dahi Vada", category:"Snacks", veg:true, serving:"2 pcs (150g)", cal:220, protein:8, carbs:28, fat:8, fiber:2, gi:"medium", micro:{iron:1.5,calcium:60,vitC:3,vitB12:0.2,folate:15}, vitamins:["Calcium","Iron","Probiotics"], healthScore:6, swap:"Bake vadas instead of frying" },
  { id:494, name:"Raj Kachori", category:"Snacks", veg:true, serving:"1 pc (120g)", cal:300, protein:6, carbs:34, fat:16, fiber:3, gi:"high", micro:{iron:1.5,calcium:30,vitC:5,vitB12:0,folate:12}, vitamins:["Iron","Calcium","B vitamins"], healthScore:3, swap:"Loaded chaat — occasional treat" },
  { id:495, name:"Paneer Pakora", category:"Snacks", veg:true, serving:"4 pcs (100g)", cal:280, protein:12, carbs:16, fat:20, fiber:1, gi:"medium", micro:{iron:1,calcium:120,vitC:2,vitB12:0.2,folate:8}, vitamins:["Calcium","Protein"], healthScore:4, swap:"Air fry for fewer calories" },
  { id:496, name:"Corn Tikki", category:"Snacks", veg:true, serving:"2 pcs (100g)", cal:200, protein:4, carbs:26, fat:9, fiber:2, gi:"medium", micro:{iron:0.8,calcium:10,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Fiber","B vitamins"], healthScore:5, swap:"Shallow fry or bake" },
  { id:497, name:"Palak Patta Chaat", category:"Snacks", veg:true, serving:"1 plate (100g)", cal:200, protein:5, carbs:22, fat:10, fiber:3, gi:"medium", micro:{iron:2,calcium:60,vitC:10,vitB12:0,folate:30}, vitamins:["Iron","Calcium","Folate"], healthScore:5, swap:"Spinach base = some nutrition" },
  { id:498, name:"Bhakarwadi", category:"Snacks", veg:true, serving:"5 pcs (50g)", cal:220, protein:3, carbs:24, fat:12, fiber:1, gi:"high", micro:{iron:0.8,calcium:10,vitC:1,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Pune specialty — deep fried" },
  { id:499, name:"Khasta Kachori", category:"Snacks", veg:true, serving:"1 pc (60g)", cal:220, protein:4, carbs:22, fat:13, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Flaky fried — eat occasionally" },
  { id:500, name:"Millet Khichdi", category:"North Indian", veg:true, serving:"1 bowl (200g)", cal:200, protein:7, carbs:34, fat:4, fiber:5, gi:"low", micro:{iron:2.5,calcium:25,vitC:3,vitB12:0,folate:25}, vitamins:["Iron","Fiber","Magnesium"], healthScore:9, swap:"Millet-based — super healthy!" },
  { id:501, name:"Oats Idli", category:"Breakfast", veg:true, serving:"3 pcs (120g)", cal:150, protein:5, carbs:24, fat:3, fiber:4, gi:"low", micro:{iron:1.5,calcium:15,vitC:1,vitB12:0,folate:10}, vitamins:["Fiber","Iron","Beta-glucan"], healthScore:9, swap:"Healthy twist on idli!" },
  { id:502, name:"Jowar Upma", category:"Breakfast", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:30, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:18,vitC:3,vitB12:0,folate:12}, vitamins:["Iron","Fiber","Magnesium"], healthScore:8, swap:"Millet upma — diabetic-friendly" },
  { id:503, name:"Sprout Chaat", category:"Snacks", veg:true, serving:"1 bowl (150g)", cal:140, protein:8, carbs:20, fat:3, fiber:5, gi:"low", micro:{iron:2,calcium:25,vitC:15,vitB12:0,folate:50}, vitamins:["Folate","Vitamin C","Iron","Fiber"], healthScore:9, swap:"Excellent protein snack!" },
  { id:504, name:"Kathi Roll (Paneer)", category:"North Indian", veg:true, serving:"1 roll (180g)", cal:340, protein:14, carbs:34, fat:16, fiber:2, gi:"medium", micro:{iron:2,calcium:120,vitC:5,vitB12:0.2,folate:15}, vitamins:["Calcium","Protein","Iron"], healthScore:5, swap:"Skip extra butter/cheese" },
  { id:505, name:"Egg Bhurji", category:"Breakfast", veg:false, serving:"2 eggs (150g)", cal:220, protein:14, carbs:4, fat:16, fiber:1, gi:"low", micro:{iron:2,calcium:40,vitC:3,vitB12:1.2,folate:20}, vitamins:["B12","Protein","Iron"], healthScore:7, swap:"High protein breakfast — use less oil" },
  { id:506, name:"Chicken Shawarma (Indian)", category:"Non-Veg", veg:false, serving:"1 roll (200g)", cal:380, protein:22, carbs:32, fat:18, fiber:2, gi:"medium", micro:{iron:2,calcium:30,vitC:5,vitB12:0.5,folate:10}, vitamins:["Protein","Iron","B6"], healthScore:5, swap:"Skip mayo — use mint chutney" },
  { id:507, name:"Paneer Bhurji", category:"North Indian", veg:true, serving:"1 bowl (150g)", cal:280, protein:14, carbs:8, fat:22, fiber:2, gi:"low", micro:{iron:1.5,calcium:200,vitC:8,vitB12:0.3,folate:15}, vitamins:["Calcium","Protein","Iron"], healthScore:6, swap:"High protein — use less oil" },
  { id:508, name:"Masala Omelette", category:"Breakfast", veg:false, serving:"2 eggs (150g)", cal:200, protein:14, carbs:4, fat:14, fiber:1, gi:"low", micro:{iron:2,calcium:40,vitC:5,vitB12:1.2,folate:22}, vitamins:["B12","Protein","Iron","Vitamin D"], healthScore:7, swap:"Great protein start to the day" },
  { id:509, name:"Aloo Tikki Chole", category:"Snacks", veg:true, serving:"1 plate (200g)", cal:350, protein:10, carbs:42, fat:16, fiber:5, gi:"medium", micro:{iron:2.5,calcium:30,vitC:10,vitB12:0,folate:30}, vitamins:["Iron","Fiber","Vitamin C"], healthScore:5, swap:"Bake tikki instead of frying" },
  { id:510, name:"Pav Bhaji (Street Style)", category:"North Indian", veg:true, serving:"2 pav + bhaji (300g)", cal:420, protein:10, carbs:55, fat:18, fiber:5, gi:"high", micro:{iron:2,calcium:30,vitC:15,vitB12:0,folate:20}, vitamins:["Vitamin C","Iron","Vitamin A"], healthScore:4, swap:"Skip extra butter on pav" },

  // ── Bengali (511–540) ───────────────────────────────────────────────────
  { id:511, name:"Luchi", category:"Bengali", veg:true, serving:"4 pcs (80g)", cal:280, protein:5, carbs:34, fat:14, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have roti instead → Save 200 cal" },
  { id:512, name:"Koraishutir Kochuri", category:"Bengali", veg:true, serving:"2 pcs (80g)", cal:260, protein:6, carbs:30, fat:13, fiber:3, gi:"high", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:20}, vitamins:["Iron","Vitamin C","Fiber"], healthScore:4, swap:"Pea stuffing adds protein" },
  { id:513, name:"Dhokar Dalna", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:220, protein:10, carbs:22, fat:10, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:3,vitB12:0,folate:40}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Chana dal cakes — good protein" },
  { id:514, name:"Posto Bora", category:"Bengali", veg:true, serving:"4 pcs (60g)", cal:180, protein:4, carbs:12, fat:13, fiber:2, gi:"low", micro:{iron:1.5,calcium:80,vitC:0,vitB12:0,folate:8}, vitamins:["Calcium","Iron","Omega-3"], healthScore:5, swap:"Poppy seed fritters — calcium rich" },
  { id:515, name:"Mochar Ghonto", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:160, protein:4, carbs:20, fat:7, fiber:4, gi:"low", micro:{iron:1.5,calcium:25,vitC:8,vitB12:0,folate:20}, vitamins:["Iron","Fiber","Potassium"], healthScore:7, swap:"Banana flower — very nutritious" },
  { id:516, name:"Echorer Dalna", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:170, protein:3, carbs:24, fat:7, fiber:4, gi:"low", micro:{iron:1,calcium:20,vitC:10,vitB12:0,folate:15}, vitamins:["Fiber","Vitamin C","Potassium"], healthScore:7, swap:"Raw jackfruit curry — fiber rich" },
  { id:517, name:"Begun Bhaja", category:"Bengali", veg:true, serving:"4 slices (80g)", cal:160, protein:2, carbs:12, fat:12, fiber:2, gi:"low", micro:{iron:0.5,calcium:10,vitC:3,vitB12:0,folate:10}, vitamins:["Fiber","Antioxidants"], healthScore:4, swap:"Air fry eggplant → Save 60 cal" },
  { id:518, name:"Potol Dolma", category:"Bengali", veg:true, serving:"4 pcs (200g)", cal:200, protein:8, carbs:18, fat:11, fiber:3, gi:"low", micro:{iron:1.5,calcium:40,vitC:8,vitB12:0,folate:20}, vitamins:["Iron","Calcium","Fiber"], healthScore:7, swap:"Stuffed pointed gourd — unique dish" },
  { id:519, name:"Cholar Dal (Bengali)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:200, protein:10, carbs:30, fat:4, fiber:6, gi:"low", micro:{iron:2.8,calcium:45,vitC:2,vitB12:0,folate:65}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Bengali style with coconut — nutritious" },
  { id:520, name:"Mishti Doi", category:"Bengali", veg:true, serving:"1 bowl (100g)", cal:140, protein:4, carbs:22, fat:4, fiber:0, gi:"high", micro:{iron:0.2,calcium:70,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","Probiotics","B12"], healthScore:5, swap:"Sweet curd — has probiotics" },
  { id:521, name:"Chomchom", category:"Bengali", veg:true, serving:"2 pcs (80g)", cal:200, protein:5, carbs:30, fat:7, fiber:0, gi:"high", micro:{iron:0.2,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:3, swap:"Have sandesh → fewer calories" },
  { id:522, name:"Pantua", category:"Bengali", veg:true, serving:"2 pcs (80g)", cal:290, protein:4, carbs:40, fat:12, fiber:0, gi:"high", micro:{iron:0.5,calcium:40,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium"], healthScore:2, swap:"Bengali gulab jamun — limit to 1 pc" },
  { id:523, name:"Jhinge Posto", category:"Bengali", veg:true, serving:"1 bowl (150g)", cal:140, protein:4, carbs:10, fat:9, fiber:2, gi:"low", micro:{iron:1.2,calcium:70,vitC:5,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Fiber"], healthScore:7, swap:"Ridge gourd + poppy seeds — calcium rich" },
  { id:524, name:"Dharosh Bhaja", category:"Bengali", veg:true, serving:"1 bowl (150g)", cal:150, protein:3, carbs:14, fat:10, fiber:4, gi:"low", micro:{iron:1,calcium:30,vitC:18,vitB12:0,folate:35}, vitamins:["Vitamin C","Folate","Fiber"], healthScore:6, swap:"Stir fry with less oil → Save 40 cal" },
  { id:525, name:"Sukto", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:130, protein:4, carbs:16, fat:6, fiber:4, gi:"low", micro:{iron:1.5,calcium:30,vitC:12,vitB12:0,folate:20}, vitamins:["Fiber","Vitamin C","Iron"], healthScore:8, swap:"Bengali bitter veggie stew — very healthy" },
  { id:526, name:"Chhana Jalebi", category:"Bengali", veg:true, serving:"3 pcs (80g)", cal:270, protein:5, carbs:38, fat:11, fiber:0, gi:"high", micro:{iron:0.3,calcium:40,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium"], healthScore:2, swap:"Have rasgulla → less oil" },
  { id:527, name:"Narkel Naru", category:"Bengali", veg:true, serving:"3 pcs (60g)", cal:220, protein:2, carbs:22, fat:14, fiber:3, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:3}, vitamins:["Iron","Manganese","Fiber"], healthScore:4, swap:"Coconut ladoo — moderate portion" },
  { id:528, name:"Gondhoraj Chicken", category:"Bengali", veg:false, serving:"1 bowl (200g)", cal:280, protein:26, carbs:8, fat:16, fiber:1, gi:"low", micro:{iron:1.5,calcium:18,vitC:8,vitB12:2,folate:8}, vitamins:["B12","Vitamin C","Iron"], healthScore:6, swap:"Fragrant lime chicken — good protein" },
  { id:529, name:"Ilish Bhapa", category:"Bengali", veg:false, serving:"1 pc (150g)", cal:280, protein:20, carbs:4, fat:20, fiber:0, gi:"low", micro:{iron:1.5,calcium:30,vitC:2,vitB12:4,folate:8}, vitamins:["Omega-3","B12","Vitamin D"], healthScore:7, swap:"Steamed hilsa — rich in omega-3" },
  { id:530, name:"Panta Bhat", category:"Bengali", veg:true, serving:"1 bowl (250g)", cal:180, protein:4, carbs:38, fat:1, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:10}, vitamins:["Probiotics","Iron","B vitamins"], healthScore:6, swap:"Fermented rice — cooling summer food" },
  { id:531, name:"Tel Koi", category:"Bengali", veg:false, serving:"2 pcs (150g)", cal:240, protein:18, carbs:8, fat:16, fiber:0, gi:"low", micro:{iron:1.5,calcium:25,vitC:1,vitB12:2.5,folate:6}, vitamins:["B12","Iron","Omega-3"], healthScore:5, swap:"Climbing perch fish — fried in mustard oil" },
  { id:532, name:"Muri Ghonto", category:"Bengali", veg:false, serving:"1 bowl (200g)", cal:220, protein:16, carbs:20, fat:8, fiber:1, gi:"medium", micro:{iron:1.5,calcium:40,vitC:2,vitB12:2,folate:10}, vitamins:["Calcium","B12","Iron"], healthScore:6, swap:"Fish head with rice — calcium from bones" },
  { id:533, name:"Alu Dum (Bengali)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:200, protein:4, carbs:28, fat:8, fiber:3, gi:"medium", micro:{iron:0.8,calcium:15,vitC:12,vitB12:0,folate:12}, vitamins:["Vitamin C","Potassium","B6"], healthScore:5, swap:"Bengali baby potato curry" },
  { id:534, name:"Kathi Roll (Kolkata)", category:"Bengali", veg:false, serving:"1 roll (180g)", cal:320, protein:16, carbs:32, fat:14, fiber:2, gi:"medium", micro:{iron:1.5,calcium:25,vitC:5,vitB12:1,folate:12}, vitamins:["Protein","Iron","B12"], healthScore:5, swap:"Use egg white wrap → Save 40 cal" },
  { id:535, name:"Ghugni (Bengali)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:190, protein:8, carbs:26, fat:6, fiber:5, gi:"low", micro:{iron:2.5,calcium:30,vitC:5,vitB12:0,folate:50}, vitamins:["Iron","Folate","Fiber"], healthScore:7, swap:"Yellow pea curry — good protein snack" },
  { id:536, name:"Mughlai Paratha", category:"Bengali", veg:false, serving:"1 pc (150g)", cal:380, protein:12, carbs:36, fat:20, fiber:1, gi:"high", micro:{iron:1.5,calcium:30,vitC:2,vitB12:0.8,folate:15}, vitamins:["Protein","B12","Iron"], healthScore:3, swap:"Egg-stuffed paratha — very rich" },
  { id:537, name:"Payesh (Bengali Kheer)", category:"Bengali", veg:true, serving:"1 bowl (150g)", cal:240, protein:5, carbs:36, fat:8, fiber:0, gi:"high", micro:{iron:0.5,calcium:80,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","B12","Vitamin A"], healthScore:4, swap:"Use less sugar and low-fat milk" },
  { id:538, name:"Bengali Fish Fry", category:"Bengali", veg:false, serving:"1 pc (120g)", cal:220, protein:18, carbs:12, fat:12, fiber:0, gi:"low", micro:{iron:1,calcium:20,vitC:2,vitB12:2.5,folate:6}, vitamins:["B12","Omega-3","Protein"], healthScore:5, swap:"Grill instead of frying" },
  { id:539, name:"Shukto (Bitter Veg Mix)", category:"Bengali", veg:true, serving:"1 bowl (200g)", cal:140, protein:4, carbs:18, fat:6, fiber:5, gi:"low", micro:{iron:2,calcium:40,vitC:15,vitB12:0,folate:25}, vitamins:["Fiber","Vitamin C","Iron"], healthScore:8, swap:"Bengali digestive starter — excellent" },
  { id:540, name:"Chingri Malai Curry", category:"Bengali", veg:false, serving:"1 bowl (200g)", cal:290, protein:18, carbs:8, fat:22, fiber:1, gi:"low", micro:{iron:1.5,calcium:45,vitC:3,vitB12:2,folate:8}, vitamins:["Selenium","B12","Omega-3"], healthScore:5, swap:"Use less coconut milk → Save 60 cal" },

  // ── Kerala (541–575) ────────────────────────────────────────────────────
  { id:541, name:"Puttu (Kerala)", category:"Kerala", veg:true, serving:"1 cylinder (150g)", cal:220, protein:4, carbs:38, fat:6, fiber:3, gi:"medium", micro:{iron:1.5,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins","Fiber"], healthScore:6, swap:"Use ragi puttu → gain calcium" },
  { id:542, name:"Appam (Kerala)", category:"Kerala", veg:true, serving:"2 pcs (120g)", cal:160, protein:3, carbs:28, fat:4, fiber:1, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Pair with stew for balanced meal" },
  { id:543, name:"Olan", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:130, protein:3, carbs:14, fat:7, fiber:3, gi:"low", micro:{iron:0.8,calcium:20,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Potassium","Iron"], healthScore:8, swap:"Ash gourd + coconut milk — very light" },
  { id:544, name:"Kerala Avial", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:165, protein:4, carbs:16, fat:10, fiber:5, gi:"low", micro:{iron:1.5,calcium:40,vitC:15,vitB12:0,folate:25}, vitamins:["Vitamin A","Vitamin C","Fiber"], healthScore:8, swap:"Mixed veg in coconut — nutritious" },
  { id:545, name:"Pachadi (Kerala)", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:90, protein:3, carbs:10, fat:4, fiber:2, gi:"low", micro:{iron:0.5,calcium:50,vitC:5,vitB12:0.2,folate:8}, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:7, swap:"Yogurt-based — good for gut" },
  { id:546, name:"Kichadi (Kerala)", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:100, protein:3, carbs:12, fat:5, fiber:2, gi:"low", micro:{iron:0.5,calcium:50,vitC:6,vitB12:0.2,folate:8}, vitamins:["Calcium","Probiotics"], healthScore:7, swap:"Yogurt + veggie side dish" },
  { id:547, name:"Kerala Thoran (Beans)", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:110, protein:4, carbs:12, fat:6, fiber:4, gi:"low", micro:{iron:1,calcium:35,vitC:10,vitB12:0,folate:20}, vitamins:["Fiber","Vitamin C","Iron"], healthScore:8, swap:"Stir-fried veggies with coconut" },
  { id:548, name:"Kootu Curry (Kerala)", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:150, protein:6, carbs:18, fat:6, fiber:5, gi:"low", micro:{iron:2,calcium:40,vitC:8,vitB12:0,folate:35}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Dal + veggies in coconut — balanced" },
  { id:549, name:"Pulissery", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:110, protein:3, carbs:14, fat:5, fiber:2, gi:"low", micro:{iron:0.5,calcium:50,vitC:5,vitB12:0.2,folate:10}, vitamins:["Calcium","Probiotics","Potassium"], healthScore:7, swap:"Yogurt curry — good digestive" },
  { id:550, name:"Kerala Sambar", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:130, protein:6, carbs:18, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:35,vitC:12,vitB12:0,folate:45}, vitamins:["Iron","Folate","Vitamin C"], healthScore:9, swap:"Excellent balanced dish" },
  { id:551, name:"Parippu Curry", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:24, fat:4, fiber:5, gi:"low", micro:{iron:2.5,calcium:35,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","Protein"], healthScore:9, swap:"Simple dal — staple of Kerala Sadya" },
  { id:552, name:"Unniyappam", category:"Kerala", veg:true, serving:"5 pcs (80g)", cal:250, protein:3, carbs:36, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Sweet banana fritters — festival treat" },
  { id:553, name:"Palada Payasam", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:280, protein:6, carbs:40, fat:10, fiber:0, gi:"high", micro:{iron:0.5,calcium:80,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","B12","Vitamin A"], healthScore:3, swap:"Rich milk dessert — small portion" },
  { id:554, name:"Ada Pradhaman", category:"Kerala", veg:true, serving:"1 bowl (150g)", cal:300, protein:4, carbs:45, fat:12, fiber:1, gi:"high", micro:{iron:0.8,calcium:30,vitC:1,vitB12:0,folate:5}, vitamins:["Iron","Manganese"], healthScore:3, swap:"Jaggery-based — still sugary though" },
  { id:555, name:"Kerala Beef Fry", category:"Kerala", veg:false, serving:"1 bowl (150g)", cal:300, protein:24, carbs:8, fat:20, fiber:2, gi:"low", micro:{iron:3.5,calcium:12,vitC:5,vitB12:2.5,folate:6}, vitamins:["Iron","B12","Zinc","Protein"], healthScore:5, swap:"High iron — watch the oil" },
  { id:556, name:"Nadan Kozhi Curry", category:"Kerala", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:2, gi:"low", micro:{iron:1.5,calcium:20,vitC:5,vitB12:2,folate:8}, vitamins:["B12","Iron","B6"], healthScore:6, swap:"Home-style chicken curry — good protein" },
  { id:557, name:"Meen Pollichathu", category:"Kerala", veg:false, serving:"1 pc (200g)", cal:260, protein:22, carbs:6, fat:16, fiber:1, gi:"low", micro:{iron:1.2,calcium:30,vitC:3,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Fish in banana leaf — healthy cooking" },
  { id:558, name:"Karimeen Fry", category:"Kerala", veg:false, serving:"1 pc (150g)", cal:240, protein:20, carbs:10, fat:14, fiber:0, gi:"low", micro:{iron:1.2,calcium:30,vitC:2,vitB12:2.5,folate:6}, vitamins:["Omega-3","B12","Protein"], healthScore:6, swap:"Pearl spot fish — Kerala specialty" },
  { id:559, name:"Mutta Curry (Egg)", category:"Kerala", veg:false, serving:"2 eggs + gravy", cal:270, protein:15, carbs:12, fat:18, fiber:1, gi:"low", micro:{iron:1.8,calcium:40,vitC:3,vitB12:1.2,folate:30}, vitamins:["B12","Vitamin D","Choline"], healthScore:6, swap:"Kerala egg curry — coconut based" },
  { id:560, name:"Kallummakkaya Fry (Mussel)", category:"Kerala", veg:false, serving:"1 bowl (150g)", cal:220, protein:18, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:3,calcium:30,vitC:3,vitB12:2.5,folate:10}, vitamins:["Iron","B12","Selenium","Zinc"], healthScore:6, swap:"Mussels are iron-rich — good choice" },
  { id:561, name:"Pathiri", category:"Kerala", veg:true, serving:"3 pcs (90g)", cal:150, protein:3, carbs:28, fat:3, fiber:1, gi:"medium", micro:{iron:0.8,calcium:8,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Rice flour flatbread — light" },
  { id:562, name:"Neypathiri", category:"Kerala", veg:true, serving:"2 pcs (80g)", cal:200, protein:3, carbs:26, fat:9, fiber:1, gi:"medium", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Ghee-enriched pathiri — richer" },
  { id:563, name:"Kappa (Tapioca)", category:"Kerala", veg:true, serving:"1 bowl (200g)", cal:210, protein:2, carbs:48, fat:1, fiber:3, gi:"high", micro:{iron:0.5,calcium:20,vitC:15,vitB12:0,folate:8}, vitamins:["Vitamin C","Potassium","Fiber"], healthScore:5, swap:"High carb — pair with fish curry" },
  { id:564, name:"Pazham Pori (Banana Fry)", category:"Kerala", veg:true, serving:"2 pcs (100g)", cal:280, protein:2, carbs:40, fat:12, fiber:2, gi:"high", micro:{iron:0.5,calcium:8,vitC:5,vitB12:0,folate:8}, vitamins:["Potassium","B6"], healthScore:3, swap:"Fried banana — occasional treat" },
  { id:565, name:"Kerala Porotta", category:"Kerala", veg:true, serving:"1 pc (80g)", cal:250, protein:5, carbs:34, fat:10, fiber:1, gi:"high", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have roti instead → Save 170 cal" },
  { id:566, name:"Achappam", category:"Kerala", veg:true, serving:"3 pcs (40g)", cal:180, protein:2, carbs:20, fat:10, fiber:0, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Rose cookie — deep fried crisp" },
  { id:567, name:"Kerala Banana Chips", category:"Kerala", veg:true, serving:"30g", cal:160, protein:1, carbs:18, fat:10, fiber:1, gi:"high", micro:{iron:0.3,calcium:5,vitC:2,vitB12:0,folate:3}, vitamins:["Potassium"], healthScore:3, swap:"Limit to small handful" },
  { id:568, name:"Ela Ada", category:"Kerala", veg:true, serving:"2 pcs (100g)", cal:200, protein:3, carbs:34, fat:6, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Steamed rice crepe — better than fried" },
  { id:569, name:"Kuzhalappam", category:"Kerala", veg:true, serving:"5 pcs (40g)", cal:190, protein:2, carbs:22, fat:10, fiber:1, gi:"high", micro:{iron:0.5,calcium:5,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Fried rice tube snack — limit portion" },
  { id:570, name:"Kozhukatta", category:"Kerala", veg:true, serving:"4 pcs (100g)", cal:180, protein:3, carbs:32, fat:5, fiber:2, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Manganese"], healthScore:5, swap:"Steamed rice dumpling — moderate" },
  { id:571, name:"Chemeen Thoran", category:"Kerala", veg:false, serving:"1 bowl (150g)", cal:180, protein:16, carbs:8, fat:10, fiber:2, gi:"low", micro:{iron:1.5,calcium:40,vitC:5,vitB12:1.5,folate:10}, vitamins:["Selenium","B12","Iron"], healthScore:7, swap:"Prawn stir-fry with coconut — good" },
  { id:572, name:"Meen Curry (Kerala)", category:"Kerala", veg:false, serving:"1 bowl (200g)", cal:230, protein:20, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:30,vitC:5,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Kerala fish curry — tangy & nutritious" },
  { id:573, name:"Goan Fish Curry Rice", category:"Kerala", veg:false, serving:"1 plate (350g)", cal:380, protein:22, carbs:46, fat:12, fiber:2, gi:"medium", micro:{iron:1.5,calcium:30,vitC:5,vitB12:3,folate:10}, vitamins:["Omega-3","B12","Iron"], healthScore:6, swap:"Classic combo — watch rice portion" },
  { id:574, name:"Thari Kanji (Rice Porridge)", category:"Kerala", veg:true, serving:"1 bowl (250g)", cal:140, protein:3, carbs:28, fat:2, fiber:1, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Light rice gruel — easy to digest" },
  { id:575, name:"Kerala Prawn Curry", category:"Kerala", veg:false, serving:"1 bowl (200g)", cal:220, protein:20, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1.5,calcium:50,vitC:4,vitB12:2,folate:10}, vitamins:["Selenium","B12","Omega-3","Iodine"], healthScore:7, swap:"Coconut-based prawn curry — lean protein" },

  // ── Maharashtrian (576–610) ─────────────────────────────────────────────
  { id:576, name:"Misal Pav (Maharashtrian)", category:"Maharashtrian", veg:true, serving:"1 plate (250g)", cal:350, protein:12, carbs:42, fat:14, fiber:6, gi:"medium", micro:{iron:2.5,calcium:30,vitC:5,vitB12:0,folate:35}, vitamins:["Iron","Protein","Fiber"], healthScore:6, swap:"Skip pav → Save 100 cal" },
  { id:577, name:"Vada Pav (Maharashtrian)", category:"Maharashtrian", veg:true, serving:"1 pc", cal:310, protein:6, carbs:38, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:6,vitB12:0,folate:8}, vitamins:["Potassium","Vitamin C"], healthScore:3, swap:"Mumbai iconic — but deep fried" },
  { id:578, name:"Zunka Bhakri", category:"Maharashtrian", veg:true, serving:"1 plate (200g)", cal:250, protein:8, carbs:34, fat:9, fiber:4, gi:"medium", micro:{iron:2.5,calcium:20,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Besan + millet bread — nutritious rural food" },
  { id:579, name:"Pitla", category:"Maharashtrian", veg:true, serving:"1 bowl (150g)", cal:140, protein:7, carbs:16, fat:5, fiber:3, gi:"low", micro:{iron:2,calcium:18,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Folate","Protein"], healthScore:8, swap:"Simple besan curry — high protein" },
  { id:580, name:"Sol Kadhi", category:"Maharashtrian", veg:true, serving:"1 glass (200ml)", cal:60, protein:1, carbs:6, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:8,vitC:5,vitB12:0,folate:3}, vitamins:["Vitamin C","Antioxidants","Iron"], healthScore:8, swap:"Kokum-coconut drink — great digestive" },
  { id:581, name:"Batata Vada", category:"Maharashtrian", veg:true, serving:"2 pcs (100g)", cal:280, protein:4, carbs:30, fat:16, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:8,vitB12:0,folate:8}, vitamins:["Potassium","Vitamin C"], healthScore:3, swap:"Deep fried — limit to 1 piece" },
  { id:582, name:"Kothimbir Vadi", category:"Maharashtrian", veg:true, serving:"4 pcs (80g)", cal:160, protein:4, carbs:18, fat:8, fiber:2, gi:"low", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:20}, vitamins:["Vitamin C","Iron","Folate"], healthScore:6, swap:"Coriander + besan snack — steamed is better" },
  { id:583, name:"Maharashtra Shrikhand", category:"Maharashtrian", veg:true, serving:"1 bowl (100g)", cal:180, protein:5, carbs:26, fat:6, fiber:0, gi:"high", micro:{iron:0.3,calcium:70,vitC:1,vitB12:0.4,folate:5}, vitamins:["Calcium","Probiotics","B12"], healthScore:4, swap:"Hung curd sweet — limit sugar" },
  { id:584, name:"Amti", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:160, protein:8, carbs:22, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:3,vitB12:0,folate:45}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Maharashtrian spiced dal — excellent" },
  { id:585, name:"Masala Bhaat", category:"Maharashtrian", veg:true, serving:"1 bowl (250g)", cal:300, protein:6, carbs:46, fat:10, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:15}, vitamins:["Iron","B vitamins","Fiber"], healthScore:5, swap:"Spiced rice — moderate portion" },
  { id:586, name:"Vangi Bhaat (Maharashtrian)", category:"Maharashtrian", veg:true, serving:"1 bowl (250g)", cal:270, protein:5, carbs:40, fat:10, fiber:3, gi:"medium", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Potassium","Iron"], healthScore:6, swap:"Eggplant rice — add dal for protein" },
  { id:587, name:"Kolhapuri Chicken", category:"Maharashtrian", veg:false, serving:"1 bowl (200g)", cal:320, protein:26, carbs:10, fat:20, fiber:2, gi:"low", micro:{iron:2,calcium:20,vitC:8,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Spicy — reduce oil for fewer cal" },
  { id:588, name:"Tambda Rassa", category:"Maharashtrian", veg:false, serving:"1 bowl (200g)", cal:300, protein:22, carbs:10, fat:20, fiber:2, gi:"low", micro:{iron:2.5,calcium:18,vitC:5,vitB12:2.5,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Red mutton curry — rich and spicy" },
  { id:589, name:"Pandhra Rassa", category:"Maharashtrian", veg:false, serving:"1 bowl (200g)", cal:260, protein:22, carbs:8, fat:16, fiber:1, gi:"low", micro:{iron:1.5,calcium:20,vitC:3,vitB12:2,folate:6}, vitamins:["B12","Iron","Calcium"], healthScore:6, swap:"White coconut mutton curry — lighter" },
  { id:590, name:"Sukka Mutton", category:"Maharashtrian", veg:false, serving:"1 bowl (150g)", cal:310, protein:24, carbs:6, fat:22, fiber:1, gi:"low", micro:{iron:3,calcium:15,vitC:3,vitB12:3,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Dry mutton — eat in moderation" },
  { id:591, name:"Bombil Fry (Bombay Duck)", category:"Maharashtrian", veg:false, serving:"4 pcs (100g)", cal:200, protein:16, carbs:10, fat:12, fiber:0, gi:"low", micro:{iron:1,calcium:20,vitC:1,vitB12:2,folate:5}, vitamins:["B12","Protein","Iron"], healthScore:5, swap:"Shallow fry with less oil" },
  { id:592, name:"Surmai Fry", category:"Maharashtrian", veg:false, serving:"1 pc (150g)", cal:250, protein:22, carbs:10, fat:14, fiber:0, gi:"low", micro:{iron:1.5,calcium:25,vitC:2,vitB12:3,folate:6}, vitamins:["Omega-3","B12","Selenium"], healthScore:6, swap:"Kingfish — rich in omega-3" },
  { id:593, name:"Bhakri", category:"Maharashtrian", veg:true, serving:"1 pc (60g)", cal:110, protein:3, carbs:22, fat:1, fiber:3, gi:"medium", micro:{iron:2,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","Fiber","Magnesium"], healthScore:8, swap:"Millet flatbread — great staple" },
  { id:594, name:"Ukdiche Modak", category:"Maharashtrian", veg:true, serving:"3 pcs (90g)", cal:210, protein:3, carbs:32, fat:8, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Manganese"], healthScore:5, swap:"Steamed — better than fried modak" },
  { id:595, name:"Aamras", category:"Maharashtrian", veg:true, serving:"1 bowl (150g)", cal:130, protein:1, carbs:30, fat:1, fiber:2, gi:"high", micro:{iron:0.3,calcium:10,vitC:25,vitB12:0,folate:10}, vitamins:["Vitamin A","Vitamin C","Beta-carotene"], healthScore:5, swap:"Pure mango pulp — seasonal treat" },
  { id:596, name:"Matki Usal", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:24, fat:5, fiber:6, gi:"low", micro:{iron:3,calcium:30,vitC:5,vitB12:0,folate:60}, vitamins:["Iron","Folate","Fiber","Protein"], healthScore:8, swap:"Sprouted moth bean — excellent nutrition" },
  { id:597, name:"Aluvadi (Patravdi)", category:"Maharashtrian", veg:true, serving:"4 pcs (80g)", cal:150, protein:3, carbs:20, fat:7, fiber:3, gi:"low", micro:{iron:1.5,calcium:50,vitC:5,vitB12:0,folate:18}, vitamins:["Calcium","Iron","Vitamin A"], healthScore:7, swap:"Colocasia leaf rolls — steamed is better" },
  { id:598, name:"Bharli Vangi", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:180, protein:4, carbs:18, fat:10, fiber:4, gi:"low", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Antioxidants","Iron"], healthScore:7, swap:"Stuffed eggplant — peanut filling" },
  { id:599, name:"Sabudana Khichdi (Maharashtrian)", category:"Maharashtrian", veg:true, serving:"1 plate (200g)", cal:300, protein:4, carbs:50, fat:10, fiber:1, gi:"high", micro:{iron:0.5,calcium:15,vitC:3,vitB12:0,folate:5}, vitamins:["Potassium","B6"], healthScore:4, swap:"Fasting food — high carb" },
  { id:600, name:"Pithla Bhakri", category:"Maharashtrian", veg:true, serving:"1 plate (200g)", cal:230, protein:9, carbs:32, fat:7, fiber:5, gi:"medium", micro:{iron:2.5,calcium:22,vitC:2,vitB12:0,folate:35}, vitamins:["Iron","Folate","Protein","Fiber"], healthScore:8, swap:"Besan curry + millet bread — rural superfood" },
  { id:601, name:"Kombdi Vade", category:"Maharashtrian", veg:false, serving:"1 plate (250g)", cal:420, protein:22, carbs:38, fat:20, fiber:2, gi:"high", micro:{iron:2,calcium:20,vitC:3,vitB12:1.5,folate:10}, vitamins:["B12","Iron","Protein"], healthScore:4, swap:"Chicken with fried bread — rich meal" },
  { id:602, name:"Amrakhand", category:"Maharashtrian", veg:true, serving:"1 bowl (100g)", cal:200, protein:4, carbs:30, fat:7, fiber:1, gi:"high", micro:{iron:0.3,calcium:60,vitC:15,vitB12:0.3,folate:8}, vitamins:["Vitamin A","Calcium","Vitamin C"], healthScore:4, swap:"Mango shrikhand — seasonal" },
  { id:603, name:"Kokum Sherbet", category:"Maharashtrian", veg:true, serving:"1 glass (200ml)", cal:50, protein:0, carbs:12, fat:0, fiber:0, gi:"medium", micro:{iron:0.3,calcium:5,vitC:5,vitB12:0,folate:2}, vitamins:["Antioxidants","Vitamin C"], healthScore:8, swap:"Natural coolant — very low cal" },
  { id:604, name:"Thalipeeth", category:"Maharashtrian", veg:true, serving:"1 pc (80g)", cal:180, protein:5, carbs:26, fat:6, fiber:3, gi:"medium", micro:{iron:2,calcium:18,vitC:2,vitB12:0,folate:20}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Multi-grain flatbread — nutritious" },
  { id:605, name:"Puran Poli", category:"Maharashtrian", veg:true, serving:"1 pc (100g)", cal:280, protein:6, carbs:44, fat:8, fiber:3, gi:"high", micro:{iron:1.5,calcium:20,vitC:1,vitB12:0,folate:20}, vitamins:["Iron","Folate","Fiber"], healthScore:4, swap:"Sweet lentil flatbread — festival food" },
  { id:606, name:"Usal Pav", category:"Maharashtrian", veg:true, serving:"1 plate (200g)", cal:300, protein:10, carbs:38, fat:12, fiber:5, gi:"medium", micro:{iron:2.5,calcium:25,vitC:5,vitB12:0,folate:40}, vitamins:["Iron","Folate","Fiber"], healthScore:6, swap:"Sprouted curry with bread" },
  { id:607, name:"Chatpata Chana (Maharashtrian)", category:"Maharashtrian", veg:true, serving:"1 bowl (150g)", cal:190, protein:9, carbs:28, fat:4, fiber:6, gi:"low", micro:{iron:2.5,calcium:35,vitC:5,vitB12:0,folate:50}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Spiced chickpeas — great protein snack" },
  { id:608, name:"Rassa Bhaji", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:150, protein:4, carbs:18, fat:7, fiber:3, gi:"low", micro:{iron:1,calcium:20,vitC:10,vitB12:0,folate:15}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:7, swap:"Maharashtrian watery veggie curry" },
  { id:609, name:"Poha Chivda", category:"Maharashtrian", veg:true, serving:"50g", cal:220, protein:3, carbs:26, fat:12, fiber:2, gi:"high", micro:{iron:1.5,calcium:8,vitC:1,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Roasted snack mix — limit portion" },
  { id:610, name:"Kairi Chi Dal", category:"Maharashtrian", veg:true, serving:"1 bowl (200g)", cal:160, protein:8, carbs:24, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:15,vitB12:0,folate:40}, vitamins:["Vitamin C","Iron","Folate"], healthScore:8, swap:"Raw mango dal — tangy and nutritious" },

  // ── Gujarati (611–648) ──────────────────────────────────────────────────
  { id:611, name:"Khaman Dhokla", category:"Gujarati", veg:true, serving:"4 pcs (120g)", cal:170, protein:6, carbs:26, fat:4, fiber:2, gi:"low", micro:{iron:2,calcium:15,vitC:1,vitB12:0,folate:30}, vitamins:["Iron","Probiotics","B vitamins"], healthScore:8, swap:"Steamed and fermented — very healthy!" },
  { id:612, name:"Gujarati Thepla", category:"Gujarati", veg:true, serving:"2 pcs (100g)", cal:220, protein:5, carbs:28, fat:10, fiber:3, gi:"medium", micro:{iron:2.5,calcium:25,vitC:3,vitB12:0,folate:30}, vitamins:["Iron","Folate","Vitamin K"], healthScore:7, swap:"Great travel food — methi adds iron" },
  { id:613, name:"Handvo (Gujarati)", category:"Gujarati", veg:true, serving:"1 slice (100g)", cal:170, protein:6, carbs:24, fat:5, fiber:3, gi:"low", micro:{iron:2,calcium:20,vitC:3,vitB12:0,folate:25}, vitamins:["Iron","B vitamins","Protein"], healthScore:7, swap:"Fermented veggie cake — nutritious" },
  { id:614, name:"Undhiyu (Gujarati)", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:260, protein:7, carbs:28, fat:14, fiber:6, gi:"low", micro:{iron:2,calcium:40,vitC:10,vitB12:0,folate:30}, vitamins:["Vitamin A","Iron","Fiber"], healthScore:6, swap:"Mixed veggie casserole — winter special" },
  { id:615, name:"Sev Tameta", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:200, protein:4, carbs:26, fat:9, fiber:2, gi:"medium", micro:{iron:1,calcium:12,vitC:12,vitB12:0,folate:10}, vitamins:["Lycopene","Vitamin C","Iron"], healthScore:5, swap:"Tomato-sev curry — quick comfort food" },
  { id:616, name:"Ringan no Olo", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:160, protein:3, carbs:18, fat:9, fiber:4, gi:"low", micro:{iron:0.8,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Antioxidants","Potassium"], healthScore:7, swap:"Smoky eggplant — healthy" },
  { id:617, name:"Dal Dhokli", category:"Gujarati", veg:true, serving:"1 bowl (250g)", cal:280, protein:10, carbs:40, fat:8, fiber:4, gi:"medium", micro:{iron:2.5,calcium:30,vitC:3,vitB12:0,folate:45}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Dal with wheat dumplings — complete meal" },
  { id:618, name:"Khakhra (Plain)", category:"Gujarati", veg:true, serving:"2 pcs (40g)", cal:130, protein:3, carbs:20, fat:4, fiber:2, gi:"medium", micro:{iron:1.2,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Crispy thin roti — light snack" },
  { id:619, name:"Muthiya", category:"Gujarati", veg:true, serving:"4 pcs (100g)", cal:160, protein:5, carbs:22, fat:5, fiber:3, gi:"low", micro:{iron:2,calcium:20,vitC:3,vitB12:0,folate:25}, vitamins:["Iron","Fiber","Folate"], healthScore:7, swap:"Steamed dumplings — healthy snack" },
  { id:620, name:"Aam Shrikhand", category:"Gujarati", veg:true, serving:"1 bowl (100g)", cal:190, protein:4, carbs:28, fat:7, fiber:1, gi:"high", micro:{iron:0.3,calcium:60,vitC:15,vitB12:0.3,folate:8}, vitamins:["Vitamin A","Calcium","Vitamin C"], healthScore:4, swap:"Mango shrikhand — seasonal treat" },
  { id:621, name:"Mohanthal", category:"Gujarati", veg:true, serving:"2 pcs (50g)", cal:240, protein:5, carbs:28, fat:12, fiber:1, gi:"high", micro:{iron:1.5,calcium:15,vitC:0,vitB12:0,folate:15}, vitamins:["Iron","Folate"], healthScore:3, swap:"Besan fudge — rich in ghee" },
  { id:622, name:"Ghughra", category:"Gujarati", veg:true, serving:"2 pcs (60g)", cal:220, protein:3, carbs:26, fat:12, fiber:1, gi:"high", micro:{iron:0.5,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:3, swap:"Fried pastry — occasional treat" },
  { id:623, name:"Surti Locho", category:"Gujarati", veg:true, serving:"1 plate (150g)", cal:180, protein:7, carbs:26, fat:5, fiber:2, gi:"low", micro:{iron:2,calcium:15,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Probiotics","Protein"], healthScore:7, swap:"Steamed snack from Surat — healthy" },
  { id:624, name:"Sev Usal", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:250, protein:8, carbs:30, fat:11, fiber:4, gi:"medium", micro:{iron:2,calcium:20,vitC:5,vitB12:0,folate:30}, vitamins:["Iron","Fiber","Protein"], healthScore:6, swap:"Pea curry with sev — skip extra sev" },
  { id:625, name:"Lilva Kachori", category:"Gujarati", veg:true, serving:"2 pcs (80g)", cal:240, protein:5, carbs:28, fat:12, fiber:3, gi:"high", micro:{iron:1.5,calcium:12,vitC:3,vitB12:0,folate:15}, vitamins:["Iron","Fiber","B vitamins"], healthScore:4, swap:"Pigeon pea kachori — seasonal" },
  { id:626, name:"Methi Thepla", category:"Gujarati", veg:true, serving:"2 pcs (100g)", cal:230, protein:6, carbs:28, fat:10, fiber:4, gi:"medium", micro:{iron:3,calcium:30,vitC:3,vitB12:0,folate:35}, vitamins:["Iron","Folate","Vitamin K"], healthScore:7, swap:"Fenugreek flatbread — iron rich" },
  { id:627, name:"Bajra Rotla (Gujarati)", category:"Gujarati", veg:true, serving:"1 pc (60g)", cal:110, protein:3, carbs:22, fat:2, fiber:3, gi:"medium", micro:{iron:2.5,calcium:20,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","Magnesium","Fiber"], healthScore:8, swap:"Millet bread — excellent choice" },
  { id:628, name:"Gujarati Kadhi", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:120, protein:4, carbs:14, fat:5, fiber:1, gi:"low", micro:{iron:0.5,calcium:60,vitC:2,vitB12:0.3,folate:10}, vitamins:["Calcium","Probiotics","B2"], healthScore:7, swap:"Sweet-sour yogurt curry — light" },
  { id:629, name:"Gujarati Khichdi", category:"Gujarati", veg:true, serving:"1 bowl (250g)", cal:210, protein:7, carbs:34, fat:5, fiber:3, gi:"medium", micro:{iron:2,calcium:25,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","B vitamins","Potassium"], healthScore:7, swap:"Comfort food — pair with kadhi" },
  { id:630, name:"Vaghareli Khichdi", category:"Gujarati", veg:true, serving:"1 bowl (250g)", cal:240, protein:7, carbs:36, fat:7, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:3,vitB12:0,folate:25}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Tempered khichdi — slightly richer" },
  { id:631, name:"Dabeli (Gujarati)", category:"Gujarati", veg:true, serving:"1 pc", cal:230, protein:5, carbs:32, fat:9, fiber:3, gi:"medium", micro:{iron:1,calcium:12,vitC:5,vitB12:0,folate:10}, vitamins:["Potassium","Iron","Vitamin C"], healthScore:5, swap:"Kutchi street food — moderate" },
  { id:632, name:"Sukhdi", category:"Gujarati", veg:true, serving:"2 pcs (50g)", cal:220, protein:2, carbs:24, fat:14, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Wheat + jaggery + ghee — rich" },
  { id:633, name:"Churma Ladoo (Gujarati)", category:"Gujarati", veg:true, serving:"2 pcs (60g)", cal:280, protein:4, carbs:32, fat:16, fiber:1, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Crushed wheat ladoo — high ghee" },
  { id:634, name:"Doodh Pak", category:"Gujarati", veg:true, serving:"1 bowl (150g)", cal:260, protein:7, carbs:36, fat:10, fiber:0, gi:"high", micro:{iron:0.5,calcium:100,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","B12","Vitamin A"], healthScore:4, swap:"Rich milk dessert — moderate portion" },
  { id:635, name:"Kopra Pak", category:"Gujarati", veg:true, serving:"2 pcs (50g)", cal:260, protein:3, carbs:24, fat:18, fiber:3, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Manganese","Iron","Fiber"], healthScore:3, swap:"Coconut barfi — very rich" },
  { id:636, name:"Ghari", category:"Gujarati", veg:true, serving:"1 pc (60g)", cal:280, protein:5, carbs:30, fat:16, fiber:1, gi:"high", micro:{iron:0.5,calcium:25,vitC:0,vitB12:0.1,folate:3}, vitamins:["Calcium"], healthScore:2, swap:"Surat special — very rich" },
  { id:637, name:"Mag ni Dal (Gujarati)", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:160, protein:10, carbs:22, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:35,vitC:1,vitB12:0,folate:55}, vitamins:["Iron","Folate","Protein"], healthScore:9, swap:"Simple moong dal — very nutritious" },
  { id:638, name:"Sakkarpara", category:"Gujarati", veg:true, serving:"50g", cal:210, protein:2, carbs:28, fat:10, fiber:0, gi:"high", micro:{iron:0.5,calcium:5,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Fried sweet crackers — festival snack" },
  { id:639, name:"Bhinda nu Shaak", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:140, protein:3, carbs:14, fat:8, fiber:4, gi:"low", micro:{iron:1,calcium:30,vitC:18,vitB12:0,folate:35}, vitamins:["Vitamin C","Folate","Fiber"], healthScore:7, swap:"Okra curry — good fiber source" },
  { id:640, name:"Tuver ni Dal", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:26, fat:3, fiber:5, gi:"low", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:60}, vitamins:["Iron","Folate","Potassium"], healthScore:9, swap:"Gujarati style toor dal — staple" },
  { id:641, name:"Valor Papdi nu Shaak", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:150, protein:5, carbs:20, fat:5, fiber:5, gi:"low", micro:{iron:1.5,calcium:30,vitC:8,vitB12:0,folate:25}, vitamins:["Fiber","Iron","Vitamin C"], healthScore:8, swap:"Flat bean curry — fiber rich" },
  { id:642, name:"Fansi nu Shaak", category:"Gujarati", veg:true, serving:"1 bowl (200g)", cal:130, protein:4, carbs:16, fat:5, fiber:4, gi:"low", micro:{iron:1,calcium:25,vitC:10,vitB12:0,folate:20}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:8, swap:"French bean curry — nutritious" },
  { id:643, name:"Ragda Pattice (Gujarati)", category:"Gujarati", veg:true, serving:"2 pcs + ragda", cal:300, protein:8, carbs:40, fat:12, fiber:4, gi:"high", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Potassium","Vitamin C"], healthScore:4, swap:"Popular chaat — bake pattice instead" },
  { id:644, name:"Patra (Gujarati)", category:"Gujarati", veg:true, serving:"4 pcs (100g)", cal:150, protein:3, carbs:22, fat:6, fiber:3, gi:"low", micro:{iron:1.5,calcium:60,vitC:5,vitB12:0,folate:20}, vitamins:["Vitamin A","Iron","Calcium"], healthScore:7, swap:"Colocasia leaf rolls — steamed best" },
  { id:645, name:"Ghee-Shakkar Roti", category:"Gujarati", veg:true, serving:"1 pc (80g)", cal:220, protein:3, carbs:28, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Ghee + sugar roti — kids' treat" },
  { id:646, name:"Khichu", category:"Gujarati", veg:true, serving:"1 bowl (150g)", cal:140, protein:3, carbs:26, fat:2, fiber:1, gi:"medium", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Rice flour snack — light and simple" },
  { id:647, name:"Fafda", category:"Gujarati", veg:true, serving:"4 pcs (60g)", cal:230, protein:4, carbs:24, fat:13, fiber:2, gi:"high", micro:{iron:1.5,calcium:10,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Fried besan strips — Sunday breakfast" },
  { id:648, name:"Jalebi Fafda", category:"Gujarati", veg:true, serving:"1 plate", cal:420, protein:5, carbs:52, fat:22, fiber:2, gi:"high", micro:{iron:2,calcium:12,vitC:0,vitB12:0,folate:10}, vitamins:["Iron"], healthScore:2, swap:"Classic combo — very heavy, limit portion" },

  // ── Andhra (649–685) ────────────────────────────────────────────────────
  { id:649, name:"Pesarattu (Andhra)", category:"Andhra", veg:true, serving:"1 pc (150g)", cal:180, protein:8, carbs:24, fat:5, fiber:4, gi:"low", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","Protein"], healthScore:8, swap:"Green gram dosa — high protein" },
  { id:650, name:"Pulihora", category:"Andhra", veg:true, serving:"1 bowl (250g)", cal:270, protein:4, carbs:42, fat:9, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:5,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron"], healthScore:5, swap:"Tamarind rice — use brown rice" },
  { id:651, name:"Gongura Mutton", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:340, protein:24, carbs:8, fat:24, fiber:2, gi:"low", micro:{iron:3.5,calcium:25,vitC:15,vitB12:2.5,folate:15}, vitamins:["Iron","B12","Vitamin C","Zinc"], healthScore:5, swap:"Sorrel leaf mutton — iron-rich" },
  { id:652, name:"Natu Kodi Pulusu", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:1, gi:"low", micro:{iron:1.5,calcium:18,vitC:5,vitB12:2,folate:8}, vitamins:["B12","Iron","Protein"], healthScore:6, swap:"Country chicken curry — lean meat" },
  { id:653, name:"Chepa Pulusu", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:240, protein:20, carbs:10, fat:14, fiber:1, gi:"low", micro:{iron:1,calcium:30,vitC:5,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Andhra fish curry — tangy & nutritious" },
  { id:654, name:"Royyala Iguru", category:"Andhra", veg:false, serving:"1 bowl (150g)", cal:220, protein:18, carbs:8, fat:14, fiber:1, gi:"low", micro:{iron:1.5,calcium:50,vitC:5,vitB12:2,folate:8}, vitamins:["Selenium","B12","Iodine"], healthScore:6, swap:"Prawn dry fry — good protein" },
  { id:655, name:"Ulavacharu", category:"Andhra", veg:true, serving:"1 bowl (200ml)", cal:80, protein:4, carbs:12, fat:1, fiber:2, gi:"low", micro:{iron:2,calcium:15,vitC:5,vitB12:0,folate:25}, vitamins:["Iron","Folate","Protein"], healthScore:9, swap:"Horse gram soup — medicinal & healthy" },
  { id:656, name:"Boorelu", category:"Andhra", veg:true, serving:"3 pcs (80g)", cal:260, protein:4, carbs:36, fat:12, fiber:1, gi:"high", micro:{iron:0.8,calcium:15,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Sweet fried dumpling — festival food" },
  { id:657, name:"Ariselu", category:"Andhra", veg:true, serving:"2 pcs (60g)", cal:220, protein:2, carbs:32, fat:10, fiber:1, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Rice + jaggery sweet — fried" },
  { id:658, name:"Pootharekulu", category:"Andhra", veg:true, serving:"2 pcs (40g)", cal:160, protein:1, carbs:24, fat:7, fiber:0, gi:"high", micro:{iron:0.3,calcium:5,vitC:0,vitB12:0,folate:2}, vitamins:["Iron"], healthScore:3, swap:"Paper-thin rice sweet — unique Andhra" },
  { id:659, name:"Bobbatlu (Andhra)", category:"Andhra", veg:true, serving:"1 pc (100g)", cal:270, protein:6, carbs:42, fat:8, fiber:3, gi:"high", micro:{iron:1.5,calcium:20,vitC:1,vitB12:0,folate:20}, vitamins:["Iron","Folate","Fiber"], healthScore:4, swap:"Sweet lentil flatbread — festival" },
  { id:660, name:"Bellam Payasam", category:"Andhra", veg:true, serving:"1 bowl (150g)", cal:240, protein:4, carbs:40, fat:7, fiber:1, gi:"high", micro:{iron:1.5,calcium:40,vitC:1,vitB12:0.2,folate:5}, vitamins:["Iron","Calcium"], healthScore:4, swap:"Jaggery kheer — iron from jaggery" },
  { id:661, name:"Andhra Chicken Curry", category:"Andhra", veg:false, serving:"1 bowl (200g)", cal:300, protein:26, carbs:10, fat:18, fiber:2, gi:"low", micro:{iron:2,calcium:20,vitC:8,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Spicy — good protein source" },
  { id:662, name:"Gutti Vankaya Kura", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:190, protein:4, carbs:18, fat:12, fiber:4, gi:"low", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Antioxidants","Iron"], healthScore:7, swap:"Stuffed eggplant — peanut masala" },
  { id:663, name:"Bendakaya Fry", category:"Andhra", veg:true, serving:"1 bowl (150g)", cal:150, protein:3, carbs:14, fat:10, fiber:4, gi:"low", micro:{iron:1,calcium:30,vitC:18,vitB12:0,folate:35}, vitamins:["Vitamin C","Folate","Fiber"], healthScore:6, swap:"Okra fry — use less oil" },
  { id:664, name:"Dondakaya Fry", category:"Andhra", veg:true, serving:"1 bowl (150g)", cal:120, protein:2, carbs:12, fat:7, fiber:3, gi:"low", micro:{iron:0.8,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:7, swap:"Ivy gourd fry — low cal" },
  { id:665, name:"Dosakaya Pappu", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:170, protein:8, carbs:24, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:8,vitB12:0,folate:50}, vitamins:["Iron","Folate","Vitamin C"], healthScore:8, swap:"Cucumber-lentil curry — refreshing" },
  { id:666, name:"Mamidikaya Pappu", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:180, protein:8, carbs:26, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:15,vitB12:0,folate:50}, vitamins:["Vitamin C","Iron","Folate"], healthScore:8, swap:"Raw mango dal — tangy & iron-rich" },
  { id:667, name:"Tomato Pappu", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:170, protein:8, carbs:24, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:25,vitC:12,vitB12:0,folate:48}, vitamins:["Lycopene","Iron","Folate"], healthScore:8, swap:"Tomato dal — everyday staple" },
  { id:668, name:"Pachi Pulusu", category:"Andhra", veg:true, serving:"1 bowl (200ml)", cal:60, protein:1, carbs:12, fat:1, fiber:1, gi:"low", micro:{iron:0.5,calcium:8,vitC:15,vitB12:0,folate:5}, vitamins:["Vitamin C","Antioxidants"], healthScore:8, swap:"Raw tamarind soup — no cooking" },
  { id:669, name:"Majjiga Pulusu", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:100, protein:3, carbs:12, fat:4, fiber:2, gi:"low", micro:{iron:0.5,calcium:60,vitC:5,vitB12:0.2,folate:10}, vitamins:["Calcium","Probiotics"], healthScore:7, swap:"Buttermilk curry — great digestive" },
  { id:670, name:"Gongura Pachadi", category:"Andhra", veg:true, serving:"2 tbsp (30g)", cal:40, protein:1, carbs:4, fat:2, fiber:1, gi:"low", micro:{iron:1.5,calcium:10,vitC:20,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:8, swap:"Sorrel leaf chutney — iron-rich" },
  { id:671, name:"Senagapindi Kura", category:"Andhra", veg:true, serving:"1 bowl (150g)", cal:160, protein:7, carbs:18, fat:6, fiber:3, gi:"low", micro:{iron:2,calcium:18,vitC:5,vitB12:0,folate:30}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Besan curry — protein-rich" },
  { id:672, name:"Pesara Pappu", category:"Andhra", veg:true, serving:"1 bowl (200g)", cal:160, protein:10, carbs:22, fat:2, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","Protein"], healthScore:9, swap:"Moong dal Andhra style — excellent" },
  { id:673, name:"Chintapandu Pulihora", category:"Andhra", veg:true, serving:"1 bowl (250g)", cal:280, protein:4, carbs:44, fat:9, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Tamarind rice — tangy festival food" },
  { id:674, name:"Ragi Sangati", category:"Andhra", veg:true, serving:"2 balls (150g)", cal:170, protein:4, carbs:34, fat:1, fiber:4, gi:"low", micro:{iron:3,calcium:200,vitC:1,vitB12:0,folate:15}, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Finger millet balls — calcium powerhouse" },
  { id:675, name:"Gongura Prawns", category:"Andhra", veg:false, serving:"1 bowl (150g)", cal:210, protein:18, carbs:6, fat:12, fiber:1, gi:"low", micro:{iron:2.5,calcium:40,vitC:15,vitB12:2,folate:10}, vitamins:["Iron","Vitamin C","B12","Selenium"], healthScore:7, swap:"Sorrel + prawns — nutrient-rich combo" },
  { id:676, name:"Uggani", category:"Andhra", veg:true, serving:"1 plate (200g)", cal:220, protein:4, carbs:34, fat:8, fiber:2, gi:"medium", micro:{iron:1.5,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","B vitamins","Vitamin C"], healthScore:6, swap:"Puffed rice upma — quick breakfast" },
  { id:677, name:"Punugulu", category:"Andhra", veg:true, serving:"6 pcs (100g)", cal:260, protein:5, carbs:30, fat:14, fiber:2, gi:"high", micro:{iron:1.5,calcium:12,vitC:1,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Fried batter balls — occasional snack" },
  { id:678, name:"Kaja", category:"Andhra", veg:true, serving:"1 pc (50g)", cal:220, protein:2, carbs:30, fat:10, fiber:0, gi:"high", micro:{iron:0.5,calcium:5,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Flaky fried sweet — very rich" },
  { id:679, name:"Purnalu", category:"Andhra", veg:true, serving:"2 pcs (80g)", cal:260, protein:4, carbs:36, fat:12, fiber:2, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","Folate"], healthScore:3, swap:"Sweet stuffed fried — festival only" },
  { id:680, name:"Kakarakaya Fry (Bitter Gourd)", category:"Andhra", veg:true, serving:"1 bowl (150g)", cal:110, protein:3, carbs:10, fat:7, fiber:3, gi:"low", micro:{iron:1,calcium:15,vitC:30,vitB12:0,folate:25}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:8, swap:"Bitter gourd — great for diabetics" },
  { id:681, name:"Natukodi Biryani", category:"Andhra", veg:false, serving:"1 plate (350g)", cal:460, protein:24, carbs:52, fat:16, fiber:2, gi:"medium", micro:{iron:2,calcium:22,vitC:3,vitB12:2,folate:12}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Country chicken biryani — moderate portion" },
  { id:682, name:"Andhra Tomato Rice", category:"Andhra", veg:true, serving:"1 bowl (250g)", cal:260, protein:4, carbs:40, fat:8, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:12,vitB12:0,folate:8}, vitamins:["Lycopene","Vitamin C"], healthScore:5, swap:"Spicy tomato rice — quick meal" },
  { id:683, name:"Avakai Pickle", category:"Andhra", veg:true, serving:"1 tbsp (15g)", cal:35, protein:0, carbs:2, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:5,vitC:3,vitB12:0,folate:1}, vitamins:["Vitamin C"], healthScore:4, swap:"Mango pickle — high sodium, limit portion" },
  { id:684, name:"Sakinalu", category:"Andhra", veg:true, serving:"3 pcs (40g)", cal:180, protein:2, carbs:22, fat:9, fiber:1, gi:"high", micro:{iron:0.5,calcium:5,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Rice flour snack — deep fried" },
  { id:685, name:"Andhra Pappu Charu", category:"Andhra", veg:true, serving:"1 bowl (200ml)", cal:90, protein:5, carbs:12, fat:2, fiber:2, gi:"low", micro:{iron:1.5,calcium:20,vitC:8,vitB12:0,folate:30}, vitamins:["Iron","Folate","Vitamin C"], healthScore:9, swap:"Dal rasam — light and nutritious" },

  // ── Rajasthani (686–725) ────────────────────────────────────────────────
  { id:686, name:"Dal Baati Churma (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 plate", cal:550, protein:14, carbs:64, fat:26, fiber:4, gi:"high", micro:{iron:3,calcium:40,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","B vitamins"], healthScore:4, swap:"Eat less churma → Save 150 cal" },
  { id:687, name:"Laal Maas", category:"Rajasthani", veg:false, serving:"1 bowl (200g)", cal:360, protein:26, carbs:6, fat:26, fiber:1, gi:"low", micro:{iron:3.5,calcium:18,vitC:5,vitB12:3,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Fiery red mutton — eat in moderation" },
  { id:688, name:"Gatte ki Sabzi (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:220, protein:8, carbs:24, fat:10, fiber:3, gi:"low", micro:{iron:2,calcium:25,vitC:2,vitB12:0,folate:35}, vitamins:["Iron","Folate","Protein"], healthScore:6, swap:"Besan dumplings in curry — decent protein" },
  { id:689, name:"Ker Sangri (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 bowl (150g)", cal:120, protein:3, carbs:14, fat:6, fiber:4, gi:"low", micro:{iron:1.5,calcium:15,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:7, swap:"Desert beans — traditional superfood" },
  { id:690, name:"Papad ki Sabzi", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:18, fat:10, fiber:2, gi:"medium", micro:{iron:1,calcium:20,vitC:3,vitB12:0.2,folate:10}, vitamins:["Iron","Calcium","Protein"], healthScore:5, swap:"Papad in yogurt curry — unique dish" },
  { id:691, name:"Besan Chakki", category:"Rajasthani", veg:true, serving:"1 bowl (150g)", cal:180, protein:7, carbs:18, fat:8, fiber:3, gi:"low", micro:{iron:2,calcium:18,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Besan porridge — hearty and protein-rich" },
  { id:692, name:"Bajre ki Roti (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 pc (60g)", cal:110, protein:3, carbs:22, fat:2, fiber:3, gi:"medium", micro:{iron:2.5,calcium:20,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","Magnesium","Fiber"], healthScore:8, swap:"Pearl millet bread — Rajasthani staple" },
  { id:693, name:"Raabdi (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:160, protein:4, carbs:28, fat:4, fiber:3, gi:"medium", micro:{iron:2,calcium:15,vitC:1,vitB12:0,folate:10}, vitamins:["Iron","Fiber","B vitamins"], healthScore:6, swap:"Bajra porridge — winter comfort food" },
  { id:694, name:"Ghevar", category:"Rajasthani", veg:true, serving:"1 pc (80g)", cal:320, protein:4, carbs:40, fat:16, fiber:0, gi:"high", micro:{iron:0.5,calcium:15,vitC:0,vitB12:0,folate:3}, vitamins:["Calcium"], healthScore:2, swap:"Disc-shaped sweet — festival food only" },
  { id:695, name:"Mawa Kachori", category:"Rajasthani", veg:true, serving:"1 pc (60g)", cal:280, protein:4, carbs:30, fat:16, fiber:1, gi:"high", micro:{iron:0.5,calcium:20,vitC:0,vitB12:0.1,folate:3}, vitamins:["Calcium"], healthScore:2, swap:"Sweet fried kachori — very rich" },
  { id:696, name:"Pyaaz Kachori", category:"Rajasthani", veg:true, serving:"1 pc (80g)", cal:260, protein:4, carbs:28, fat:15, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:3,vitB12:0,folate:8}, vitamins:["Iron","Quercetin"], healthScore:3, swap:"Jodhpuri specialty — deep fried" },
  { id:697, name:"Mirchi Vada", category:"Rajasthani", veg:true, serving:"2 pcs (100g)", cal:250, protein:5, carbs:24, fat:15, fiber:2, gi:"high", micro:{iron:1,calcium:15,vitC:15,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron"], healthScore:3, swap:"Chilli fritters — Jodhpur famous" },
  { id:698, name:"Safed Maas", category:"Rajasthani", veg:false, serving:"1 bowl (200g)", cal:340, protein:24, carbs:6, fat:24, fiber:0, gi:"low", micro:{iron:2,calcium:25,vitC:1,vitB12:2.5,folate:5}, vitamins:["B12","Iron","Calcium"], healthScore:5, swap:"White mutton curry — rich but tasty" },
  { id:699, name:"Jungli Maas", category:"Rajasthani", veg:false, serving:"1 bowl (200g)", cal:320, protein:26, carbs:4, fat:22, fiber:0, gi:"low", micro:{iron:3,calcium:15,vitC:8,vitB12:3,folate:5}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Fiery simple mutton — minimal spices" },
  { id:700, name:"Banjari Gosht", category:"Rajasthani", veg:false, serving:"1 bowl (200g)", cal:330, protein:24, carbs:8, fat:22, fiber:1, gi:"low", micro:{iron:3,calcium:18,vitC:5,vitB12:2.5,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Tribal style mutton — rich" },
  { id:701, name:"Rajasthani Kadhi", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:130, protein:4, carbs:14, fat:6, fiber:1, gi:"low", micro:{iron:0.5,calcium:60,vitC:2,vitB12:0.3,folate:10}, vitamins:["Calcium","Probiotics","B2"], healthScore:7, swap:"Buttermilk-based — lighter than North Indian" },
  { id:702, name:"Bajre ka Khichda", category:"Rajasthani", veg:true, serving:"1 bowl (250g)", cal:230, protein:7, carbs:36, fat:6, fiber:4, gi:"medium", micro:{iron:2.5,calcium:25,vitC:2,vitB12:0,folate:25}, vitamins:["Iron","Magnesium","Fiber"], healthScore:7, swap:"Millet porridge — wholesome" },
  { id:703, name:"Makki ki Raab", category:"Rajasthani", veg:true, serving:"1 bowl (200ml)", cal:100, protein:2, carbs:18, fat:2, fiber:2, gi:"medium", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Corn flour porridge — winter drink" },
  { id:704, name:"Churma Ladoo (Rajasthani)", category:"Rajasthani", veg:true, serving:"2 pcs (60g)", cal:280, protein:4, carbs:32, fat:16, fiber:1, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Wheat + ghee + jaggery — festive" },
  { id:705, name:"Sev ki Sabzi", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:240, protein:5, carbs:26, fat:13, fiber:2, gi:"medium", micro:{iron:1.5,calcium:20,vitC:3,vitB12:0.2,folate:10}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Besan sev in yogurt curry" },
  { id:706, name:"Lahsun ki Chutney", category:"Rajasthani", veg:true, serving:"1 tbsp (15g)", cal:25, protein:0, carbs:3, fat:1, fiber:0, gi:"low", micro:{iron:0.2,calcium:3,vitC:2,vitB12:0,folate:1}, vitamins:["Allicin","Vitamin C"], healthScore:7, swap:"Garlic chutney — antibacterial" },
  { id:707, name:"Panchmel Dal (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:190, protein:11, carbs:26, fat:4, fiber:5, gi:"low", micro:{iron:2.8,calcium:42,vitC:2,vitB12:0,folate:62}, vitamins:["Iron","Folate","Zinc"], healthScore:9, swap:"Five-lentil mix — excellent nutrition" },
  { id:708, name:"Bikaneri Bhujia", category:"Rajasthani", veg:true, serving:"50g", cal:250, protein:5, carbs:26, fat:14, fiber:2, gi:"high", micro:{iron:1.5,calcium:10,vitC:0,vitB12:0,folate:10}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Fried besan snack — limit portion" },
  { id:709, name:"Jodhpuri Kabuli", category:"Rajasthani", veg:true, serving:"1 plate (250g)", cal:320, protein:8, carbs:48, fat:10, fiber:3, gi:"medium", micro:{iron:1.5,calcium:20,vitC:3,vitB12:0,folate:15}, vitamins:["Iron","B vitamins","Fiber"], healthScore:5, swap:"Sweet rice dish — moderate portion" },
  { id:710, name:"Aam ka Panna (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 glass (250ml)", cal:90, protein:0, carbs:22, fat:0, fiber:1, gi:"low", micro:{iron:0.5,calcium:8,vitC:20,vitB12:0,folate:5}, vitamins:["Vitamin C","Iron"], healthScore:7, swap:"Raw mango drink — summer coolant" },
  { id:711, name:"Chaach (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 glass (250ml)", cal:40, protein:3, carbs:4, fat:1, fiber:0, gi:"low", micro:{iron:0.2,calcium:80,vitC:1,vitB12:0.3,folate:3}, vitamins:["Calcium","Probiotics","B12"], healthScore:9, swap:"Spiced buttermilk — great digestive" },
  { id:712, name:"Marwari Aloo Pyaaz", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:180, protein:4, carbs:24, fat:8, fiber:3, gi:"medium", micro:{iron:0.8,calcium:15,vitC:10,vitB12:0,folate:10}, vitamins:["Vitamin C","Potassium","B6"], healthScore:6, swap:"Simple potato-onion curry" },
  { id:713, name:"Daal ki Dulhan", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:200, protein:9, carbs:26, fat:6, fiber:4, gi:"low", micro:{iron:2.5,calcium:30,vitC:2,vitB12:0,folate:50}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Dal with wheat dumplings" },
  { id:714, name:"Rajasthani Malpua", category:"Rajasthani", veg:true, serving:"2 pcs (80g)", cal:310, protein:4, carbs:38, fat:16, fiber:1, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:2, swap:"Fried pancake in syrup — rich" },
  { id:715, name:"Mawa Ladoo", category:"Rajasthani", veg:true, serving:"2 pcs (50g)", cal:220, protein:4, carbs:24, fat:12, fiber:0, gi:"high", micro:{iron:0.5,calcium:30,vitC:0,vitB12:0.1,folate:3}, vitamins:["Calcium"], healthScore:3, swap:"Khoya ladoo — rich in fat" },
  { id:716, name:"Sohan Halwa", category:"Rajasthani", veg:true, serving:"1 pc (50g)", cal:240, protein:3, carbs:28, fat:14, fiber:0, gi:"high", micro:{iron:0.5,calcium:10,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Rich halwa — limit to small piece" },
  { id:717, name:"Achari Aloo (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:200, protein:4, carbs:26, fat:9, fiber:3, gi:"medium", micro:{iron:1,calcium:15,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin C","Potassium","Iron"], healthScore:6, swap:"Pickle-spiced potato — tangy" },
  { id:718, name:"Kachhi Haldi ka Saag", category:"Rajasthani", veg:true, serving:"1 bowl (150g)", cal:90, protein:2, carbs:10, fat:5, fiber:3, gi:"low", micro:{iron:2,calcium:30,vitC:10,vitB12:0,folate:20}, vitamins:["Iron","Curcumin","Vitamin C"], healthScore:9, swap:"Fresh turmeric greens — anti-inflammatory" },
  { id:719, name:"Jowar Roti (Rajasthani)", category:"Rajasthani", veg:true, serving:"1 pc (50g)", cal:95, protein:3, carbs:20, fat:1, fiber:3, gi:"medium", micro:{iron:2,calcium:15,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","Fiber","Phosphorus"], healthScore:8, swap:"Sorghum roti — gluten-free option" },
  { id:720, name:"Mohan Maas", category:"Rajasthani", veg:false, serving:"1 bowl (200g)", cal:380, protein:24, carbs:8, fat:28, fiber:0, gi:"low", micro:{iron:2.5,calcium:20,vitC:2,vitB12:2.5,folate:5}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Royal mutton — very rich in ghee" },
  { id:721, name:"Kair Sangri Achaar", category:"Rajasthani", veg:true, serving:"1 tbsp (15g)", cal:30, protein:0, carbs:3, fat:2, fiber:1, gi:"low", micro:{iron:0.3,calcium:5,vitC:5,vitB12:0,folate:2}, vitamins:["Vitamin C","Iron"], healthScore:6, swap:"Desert berry pickle — tangy" },
  { id:722, name:"Rajasthani Sangri", category:"Rajasthani", veg:true, serving:"1 bowl (150g)", cal:110, protein:3, carbs:12, fat:5, fiber:4, gi:"low", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Fiber","Iron","Vitamin C"], healthScore:8, swap:"Desert beans — drought food superfood" },
  { id:723, name:"Chakki ki Sabzi", category:"Rajasthani", veg:true, serving:"1 bowl (200g)", cal:200, protein:6, carbs:22, fat:10, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:2,vitB12:0,folate:25}, vitamins:["Iron","Folate","B vitamins"], healthScore:6, swap:"Wheat cake curry — unique" },
  { id:724, name:"Rajasthani Gatte ka Pulao", category:"Rajasthani", veg:true, serving:"1 plate (250g)", cal:320, protein:8, carbs:44, fat:12, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:2,vitB12:0,folate:25}, vitamins:["Iron","Folate","B vitamins"], healthScore:5, swap:"Rice with besan dumplings" },
  { id:725, name:"Rajasthani Balushahi", category:"Rajasthani", veg:true, serving:"1 pc (50g)", cal:220, protein:2, carbs:28, fat:12, fiber:0, gi:"high", micro:{iron:0.3,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Fried dough in sugar — limit to 1" },

  // ── Kashmiri (726–755) ──────────────────────────────────────────────────
  { id:726, name:"Rogan Josh (Kashmiri)", category:"Kashmiri", veg:false, serving:"1 bowl (200g)", cal:350, protein:26, carbs:8, fat:24, fiber:1, gi:"low", micro:{iron:3,calcium:20,vitC:3,vitB12:3,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Signature lamb — trim fat" },
  { id:727, name:"Yakhni", category:"Kashmiri", veg:false, serving:"1 bowl (200g)", cal:260, protein:22, carbs:6, fat:16, fiber:0, gi:"low", micro:{iron:1.5,calcium:25,vitC:1,vitB12:2.5,folate:5}, vitamins:["B12","Calcium","Iron"], healthScore:6, swap:"Yogurt-based lamb — lighter than rogan josh" },
  { id:728, name:"Dum Aloo Kashmiri", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:250, protein:5, carbs:28, fat:13, fiber:3, gi:"medium", micro:{iron:1,calcium:20,vitC:12,vitB12:0,folate:12}, vitamins:["Vitamin C","Potassium","B6"], healthScore:5, swap:"Rich potato dish — moderate portion" },
  { id:729, name:"Haak Saag", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:90, protein:3, carbs:8, fat:5, fiber:4, gi:"low", micro:{iron:2.5,calcium:100,vitC:25,vitB12:0,folate:50}, vitamins:["Calcium","Iron","Vitamin C","Folate"], healthScore:9, swap:"Kashmiri collard greens — super healthy" },
  { id:730, name:"Nadru Yakhni", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:180, protein:5, carbs:20, fat:9, fiber:3, gi:"low", micro:{iron:1,calcium:40,vitC:15,vitB12:0.2,folate:10}, vitamins:["Vitamin C","Calcium","Fiber"], healthScore:7, swap:"Lotus stem in yogurt — unique" },
  { id:731, name:"Rajma Gogji", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:200, protein:9, carbs:30, fat:5, fiber:6, gi:"low", micro:{iron:2.5,calcium:35,vitC:8,vitB12:0,folate:50}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Kidney beans + turnip — nutritious" },
  { id:732, name:"Modur Pulao", category:"Kashmiri", veg:true, serving:"1 bowl (250g)", cal:310, protein:5, carbs:48, fat:10, fiber:2, gi:"high", micro:{iron:1,calcium:15,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","Vitamin E"], healthScore:4, swap:"Sweet saffron rice — festive" },
  { id:733, name:"Gushtaba", category:"Kashmiri", veg:false, serving:"2 pcs + gravy (200g)", cal:380, protein:22, carbs:10, fat:28, fiber:0, gi:"low", micro:{iron:2.5,calcium:25,vitC:1,vitB12:2.5,folate:5}, vitamins:["B12","Iron","Calcium"], healthScore:4, swap:"Meatballs in yogurt — Wazwan special" },
  { id:734, name:"Tabak Maaz", category:"Kashmiri", veg:false, serving:"2 pcs (150g)", cal:360, protein:22, carbs:4, fat:28, fiber:0, gi:"low", micro:{iron:2.5,calcium:18,vitC:1,vitB12:2.5,folate:5}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Fried lamb ribs — very rich" },
  { id:735, name:"Rishta", category:"Kashmiri", veg:false, serving:"3 pcs + gravy (200g)", cal:340, protein:22, carbs:12, fat:22, fiber:1, gi:"low", micro:{iron:2.5,calcium:18,vitC:3,vitB12:2.5,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Kashmiri meatballs in red sauce" },
  { id:736, name:"Aab Gosht", category:"Kashmiri", veg:false, serving:"1 bowl (200g)", cal:300, protein:22, carbs:6, fat:20, fiber:0, gi:"low", micro:{iron:2,calcium:30,vitC:1,vitB12:2.5,folate:5}, vitamins:["B12","Calcium","Iron"], healthScore:5, swap:"Milk-based lamb — lighter curry" },
  { id:737, name:"Lyodur Tschaman", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:280, protein:14, carbs:10, fat:20, fiber:1, gi:"low", micro:{iron:1,calcium:200,vitC:2,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Turmeric"], healthScore:5, swap:"Yellow paneer — turmeric adds benefits" },
  { id:738, name:"Kashmiri Pulao", category:"Kashmiri", veg:true, serving:"1 bowl (250g)", cal:300, protein:5, carbs:46, fat:10, fiber:2, gi:"high", micro:{iron:1.5,calcium:20,vitC:2,vitB12:0,folate:8}, vitamins:["Iron","Vitamin E","B vitamins"], healthScore:5, swap:"Aromatic rice with dry fruits" },
  { id:739, name:"Nadroo Monje", category:"Kashmiri", veg:true, serving:"4 pcs (100g)", cal:200, protein:4, carbs:22, fat:11, fiber:3, gi:"medium", micro:{iron:1,calcium:25,vitC:15,vitB12:0,folate:8}, vitamins:["Vitamin C","Fiber"], healthScore:5, swap:"Lotus stem fritters — fry less" },
  { id:740, name:"Tsok Vangun", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:170, protein:3, carbs:18, fat:10, fiber:3, gi:"low", micro:{iron:0.8,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Fiber","Antioxidants"], healthScore:6, swap:"Sour eggplant — tangy Kashmiri dish" },
  { id:741, name:"Shab Deg", category:"Kashmiri", veg:false, serving:"1 bowl (200g)", cal:320, protein:20, carbs:12, fat:22, fiber:2, gi:"low", micro:{iron:2.5,calcium:20,vitC:8,vitB12:2,folate:8}, vitamins:["B12","Iron","Vitamin C"], healthScore:5, swap:"Slow-cooked turnip-meat — wedding dish" },
  { id:742, name:"Kahwa", category:"Kashmiri", veg:true, serving:"1 cup (150ml)", cal:25, protein:1, carbs:3, fat:1, fiber:0, gi:"low", micro:{iron:0.3,calcium:5,vitC:3,vitB12:0,folate:2}, vitamins:["Antioxidants","Vitamin E"], healthScore:9, swap:"Kashmiri green tea — saffron + almonds" },
  { id:743, name:"Noon Chai", category:"Kashmiri", veg:true, serving:"1 cup (150ml)", cal:70, protein:2, carbs:6, fat:4, fiber:0, gi:"low", micro:{iron:0.2,calcium:40,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","Sodium"], healthScore:5, swap:"Pink salt tea — unique Kashmiri drink" },
  { id:744, name:"Kashmiri Phirni", category:"Kashmiri", veg:true, serving:"1 bowl (120g)", cal:200, protein:4, carbs:30, fat:7, fiber:0, gi:"high", micro:{iron:0.5,calcium:60,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium","Saffron","B vitamins"], healthScore:4, swap:"Saffron-flavored rice pudding" },
  { id:745, name:"Shufta", category:"Kashmiri", veg:true, serving:"1 bowl (80g)", cal:300, protein:6, carbs:30, fat:18, fiber:2, gi:"high", micro:{iron:1.5,calcium:25,vitC:1,vitB12:0,folate:8}, vitamins:["Vitamin E","Iron","Magnesium"], healthScore:4, swap:"Dry fruit dessert — nutrient-dense but rich" },
  { id:746, name:"Tchot", category:"Kashmiri", veg:true, serving:"2 pcs (80g)", cal:200, protein:4, carbs:30, fat:7, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Kashmiri bread — griddle-cooked" },
  { id:747, name:"Girda", category:"Kashmiri", veg:true, serving:"1 pc (80g)", cal:220, protein:5, carbs:36, fat:6, fiber:1, gi:"high", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Kashmiri round bread" },
  { id:748, name:"Lavasa", category:"Kashmiri", veg:true, serving:"1 pc (60g)", cal:160, protein:3, carbs:26, fat:4, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Kashmiri flatbread — lighter" },
  { id:749, name:"Palak Nadir", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:160, protein:5, carbs:16, fat:8, fiber:4, gi:"low", micro:{iron:3,calcium:80,vitC:20,vitB12:0,folate:40}, vitamins:["Iron","Calcium","Vitamin C"], healthScore:8, swap:"Spinach + lotus stem — iron-rich" },
  { id:750, name:"Tamatar Chaman", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:270, protein:12, carbs:14, fat:18, fiber:2, gi:"low", micro:{iron:1,calcium:180,vitC:10,vitB12:0.5,folate:15}, vitamins:["Calcium","Lycopene","B12"], healthScore:5, swap:"Paneer in tomato — calcium rich" },
  { id:751, name:"Methi Maaz", category:"Kashmiri", veg:false, serving:"1 bowl (200g)", cal:320, protein:24, carbs:8, fat:22, fiber:2, gi:"low", micro:{iron:3.5,calcium:20,vitC:3,vitB12:2.5,folate:15}, vitamins:["Iron","B12","Folate","Zinc"], healthScore:5, swap:"Fenugreek lamb — iron from both" },
  { id:752, name:"Buzith Gaad (Fish)", category:"Kashmiri", veg:false, serving:"1 pc (150g)", cal:200, protein:20, carbs:6, fat:10, fiber:0, gi:"low", micro:{iron:1,calcium:25,vitC:2,vitB12:3,folate:6}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Kashmiri fried fish — local river fish" },
  { id:753, name:"Kashmiri Dum Olav", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:240, protein:5, carbs:28, fat:12, fiber:3, gi:"medium", micro:{iron:1,calcium:20,vitC:10,vitB12:0,folate:10}, vitamins:["Vitamin C","Potassium"], healthScore:5, swap:"Kashmiri dum potato — rich gravy" },
  { id:754, name:"Kashmiri Rajma", category:"Kashmiri", veg:true, serving:"1 bowl (200g)", cal:210, protein:10, carbs:32, fat:4, fiber:7, gi:"low", micro:{iron:3,calcium:40,vitC:3,vitB12:0,folate:65}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Kashmiri kidney beans — protein-rich" },
  { id:755, name:"Kashmiri Kulcha", category:"Kashmiri", veg:true, serving:"1 pc (80g)", cal:230, protein:5, carbs:34, fat:8, fiber:1, gi:"high", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Stuffed bread — festival food" },

  // ── Tamil Nadu (756–795) ────────────────────────────────────────────────
  { id:756, name:"Sakkarai Pongal", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:280, protein:5, carbs:44, fat:10, fiber:2, gi:"high", micro:{iron:1,calcium:20,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Sweet pongal — festival food, limit portion" },
  { id:757, name:"Chettinad Chicken", category:"Tamil Nadu", veg:false, serving:"1 bowl (200g)", cal:300, protein:26, carbs:10, fat:18, fiber:2, gi:"low", micro:{iron:2,calcium:20,vitC:5,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:6, swap:"Fiery chicken — excellent spice blend" },
  { id:758, name:"Kozhi Varuval", category:"Tamil Nadu", veg:false, serving:"1 bowl (150g)", cal:280, protein:24, carbs:8, fat:18, fiber:1, gi:"low", micro:{iron:1.5,calcium:15,vitC:5,vitB12:2,folate:6}, vitamins:["B12","Iron","Protein"], healthScore:5, swap:"Dry chicken fry — use less oil" },
  { id:759, name:"Meen Kuzhambu", category:"Tamil Nadu", veg:false, serving:"1 bowl (200g)", cal:230, protein:20, carbs:12, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:30,vitC:8,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Tamil fish curry — tangy and nutritious" },
  { id:760, name:"Milagu Rasam", category:"Tamil Nadu", veg:true, serving:"1 bowl (200ml)", cal:50, protein:2, carbs:8, fat:1, fiber:1, gi:"low", micro:{iron:1,calcium:10,vitC:12,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:9, swap:"Pepper rasam — anti-cold remedy" },
  { id:761, name:"Tomato Rasam", category:"Tamil Nadu", veg:true, serving:"1 bowl (200ml)", cal:55, protein:2, carbs:9, fat:1, fiber:1, gi:"low", micro:{iron:0.8,calcium:10,vitC:15,vitB12:0,folate:8}, vitamins:["Lycopene","Vitamin C","Iron"], healthScore:9, swap:"Light and healing — very low cal" },
  { id:762, name:"Beans Poriyal", category:"Tamil Nadu", veg:true, serving:"1 bowl (150g)", cal:110, protein:4, carbs:12, fat:5, fiber:4, gi:"low", micro:{iron:1,calcium:25,vitC:10,vitB12:0,folate:20}, vitamins:["Fiber","Vitamin C","Iron"], healthScore:8, swap:"Stir-fried beans with coconut" },
  { id:763, name:"Cabbage Poriyal", category:"Tamil Nadu", veg:true, serving:"1 bowl (150g)", cal:100, protein:3, carbs:10, fat:5, fiber:3, gi:"low", micro:{iron:0.5,calcium:30,vitC:18,vitB12:0,folate:18}, vitamins:["Vitamin C","Vitamin K","Fiber"], healthScore:8, swap:"Light stir-fried cabbage" },
  { id:764, name:"Vathal Kuzhambu", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:140, protein:3, carbs:18, fat:6, fiber:2, gi:"low", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C","Antioxidants"], healthScore:7, swap:"Tamarind-based curry — tangy" },
  { id:765, name:"Mor Kuzhambu", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:100, protein:3, carbs:12, fat:4, fiber:2, gi:"low", micro:{iron:0.5,calcium:60,vitC:4,vitB12:0.2,folate:10}, vitamins:["Calcium","Probiotics"], healthScore:7, swap:"Buttermilk curry — great digestive" },
  { id:766, name:"Thayir Sadam", category:"Tamil Nadu", veg:true, serving:"1 bowl (250g)", cal:220, protein:6, carbs:36, fat:5, fiber:1, gi:"high", micro:{iron:0.8,calcium:80,vitC:1,vitB12:0.5,folate:10}, vitamins:["Calcium","B12","Probiotics"], healthScore:6, swap:"Curd rice — comfort food" },
  { id:767, name:"Murukku", category:"Tamil Nadu", veg:true, serving:"4 pcs (40g)", cal:190, protein:3, carbs:22, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Fried rice snack — limit portion" },
  { id:768, name:"Thattai", category:"Tamil Nadu", veg:true, serving:"4 pcs (40g)", cal:180, protein:3, carbs:20, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Fried disc snack — occasional" },
  { id:769, name:"Ribbon Pakoda", category:"Tamil Nadu", veg:true, serving:"30g", cal:160, protein:3, carbs:18, fat:9, fiber:1, gi:"high", micro:{iron:1,calcium:5,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:3, swap:"Deep fried — small portion only" },
  { id:770, name:"Adhirasam", category:"Tamil Nadu", veg:true, serving:"1 pc (50g)", cal:200, protein:2, carbs:32, fat:8, fiber:1, gi:"high", micro:{iron:0.8,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Rice + jaggery sweet — traditional" },
  { id:771, name:"Sundal", category:"Tamil Nadu", veg:true, serving:"1 bowl (150g)", cal:150, protein:8, carbs:22, fat:3, fiber:5, gi:"low", micro:{iron:2.5,calcium:30,vitC:3,vitB12:0,folate:50}, vitamins:["Iron","Folate","Fiber","Protein"], healthScore:8, swap:"Boiled legumes with coconut — healthy snack" },
  { id:772, name:"Kuzhi Paniyaram", category:"Tamil Nadu", veg:true, serving:"6 pcs (120g)", cal:180, protein:4, carbs:28, fat:5, fiber:2, gi:"medium", micro:{iron:1.5,calcium:12,vitC:2,vitB12:0,folate:10}, vitamins:["Iron","B vitamins","Probiotics"], healthScore:7, swap:"Batter-based — less oil than dosa" },
  { id:773, name:"Kothu Parotta", category:"Tamil Nadu", veg:true, serving:"1 plate (250g)", cal:380, protein:8, carbs:44, fat:18, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Shredded parotta — high cal" },
  { id:774, name:"Parotta with Salna", category:"Tamil Nadu", veg:true, serving:"2 parotta + salna", cal:450, protein:8, carbs:50, fat:24, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Have 1 parotta with dal instead" },
  { id:775, name:"Chicken 65 (Tamil)", category:"Tamil Nadu", veg:false, serving:"6 pcs (150g)", cal:320, protein:22, carbs:18, fat:18, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0.5,folate:8}, vitamins:["Protein","Iron","B6"], healthScore:4, swap:"Deep fried — try grilled version" },
  { id:776, name:"Nandu Masala (Crab)", category:"Tamil Nadu", veg:false, serving:"1 bowl (200g)", cal:220, protein:18, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1.5,calcium:50,vitC:5,vitB12:2.5,folate:10}, vitamins:["B12","Zinc","Selenium"], healthScore:7, swap:"Crab curry — nutrient-dense" },
  { id:777, name:"Eral Masala (Prawn)", category:"Tamil Nadu", veg:false, serving:"1 bowl (150g)", cal:200, protein:18, carbs:8, fat:10, fiber:1, gi:"low", micro:{iron:1.5,calcium:50,vitC:4,vitB12:2,folate:8}, vitamins:["Selenium","B12","Iodine"], healthScore:7, swap:"Prawn masala — lean protein" },
  { id:778, name:"Kaalan", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:130, protein:4, carbs:16, fat:6, fiber:3, gi:"low", micro:{iron:0.5,calcium:50,vitC:5,vitB12:0.2,folate:12}, vitamins:["Calcium","Probiotics","Fiber"], healthScore:7, swap:"Raw banana in yogurt — Sadya dish" },
  { id:779, name:"Filter Coffee (Tamil)", category:"Tamil Nadu", veg:true, serving:"1 cup (150ml)", cal:90, protein:2, carbs:10, fat:4, fiber:0, gi:"low", micro:{iron:0.2,calcium:50,vitC:0,vitB12:0.2,folate:2}, vitamins:["Calcium","Antioxidants"], healthScore:5, swap:"Use less sugar → Save 30 cal" },
  { id:780, name:"Jigarthanda", category:"Tamil Nadu", veg:true, serving:"1 glass (300ml)", cal:280, protein:5, carbs:38, fat:12, fiber:0, gi:"high", micro:{iron:0.5,calcium:80,vitC:1,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:3, swap:"Madurai special cold drink — rich" },
  { id:781, name:"Kambu Koozh", category:"Tamil Nadu", veg:true, serving:"1 glass (250ml)", cal:120, protein:3, carbs:22, fat:2, fiber:3, gi:"low", micro:{iron:2,calcium:20,vitC:1,vitB12:0,folate:10}, vitamins:["Iron","Fiber","Magnesium"], healthScore:8, swap:"Pearl millet porridge — summer coolant" },
  { id:782, name:"Ragi Koozh", category:"Tamil Nadu", veg:true, serving:"1 glass (250ml)", cal:130, protein:3, carbs:24, fat:2, fiber:3, gi:"low", micro:{iron:2,calcium:150,vitC:1,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Fiber"], healthScore:9, swap:"Finger millet porridge — calcium-rich" },
  { id:783, name:"Atho (Burmese Noodle)", category:"Tamil Nadu", veg:true, serving:"1 plate (200g)", cal:300, protein:6, carbs:40, fat:12, fiber:3, gi:"high", micro:{iron:1,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:4, swap:"Street noodle dish — moderate portion" },
  { id:784, name:"Bajji (Banana/Onion)", category:"Tamil Nadu", veg:true, serving:"4 pcs (100g)", cal:240, protein:3, carbs:28, fat:13, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Potassium","Iron"], healthScore:3, swap:"Deep fried fritters — limit portion" },
  { id:785, name:"Bonda (Tamil)", category:"Tamil Nadu", veg:true, serving:"3 pcs (100g)", cal:260, protein:5, carbs:28, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:6,vitB12:0,folate:8}, vitamins:["Potassium","Iron"], healthScore:3, swap:"Potato fritters — deep fried" },
  { id:786, name:"Paal Payasam", category:"Tamil Nadu", veg:true, serving:"1 bowl (150g)", cal:250, protein:6, carbs:36, fat:8, fiber:0, gi:"high", micro:{iron:0.5,calcium:80,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","B12","Vitamin A"], healthScore:4, swap:"Milk kheer — use less sugar" },
  { id:787, name:"Semiya Payasam", category:"Tamil Nadu", veg:true, serving:"1 bowl (150g)", cal:230, protein:4, carbs:34, fat:8, fiber:1, gi:"high", micro:{iron:0.5,calcium:60,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium","B vitamins"], healthScore:4, swap:"Vermicelli kheer — lighter option" },
  { id:788, name:"Paruthi Paal", category:"Tamil Nadu", veg:true, serving:"1 glass (200ml)", cal:80, protein:2, carbs:12, fat:3, fiber:1, gi:"low", micro:{iron:0.5,calcium:15,vitC:2,vitB12:0,folate:5}, vitamins:["Iron","Fiber"], healthScore:7, swap:"Cotton seed milk — traditional drink" },
  { id:789, name:"Ven Pongal", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:240, protein:6, carbs:34, fat:8, fiber:2, gi:"medium", micro:{iron:1.5,calcium:15,vitC:1,vitB12:0,folate:12}, vitamins:["Iron","B vitamins","Potassium"], healthScore:6, swap:"Savory pongal — use less ghee" },
  { id:790, name:"Kozhambu (General)", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:130, protein:4, carbs:16, fat:5, fiber:3, gi:"low", micro:{iron:1.5,calcium:20,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Vitamin C","Fiber"], healthScore:7, swap:"Tamil curry base — nutritious" },
  { id:791, name:"Thengai Paal Kulambu", category:"Tamil Nadu", veg:true, serving:"1 bowl (200g)", cal:160, protein:5, carbs:14, fat:10, fiber:2, gi:"low", micro:{iron:1.5,calcium:20,vitC:5,vitB12:0,folate:15}, vitamins:["Iron","Manganese","Fiber"], healthScore:6, swap:"Coconut milk curry — moderate" },
  { id:792, name:"Ulundu Vadai", category:"Tamil Nadu", veg:true, serving:"2 pcs (100g)", cal:260, protein:8, carbs:22, fat:16, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:1,vitB12:0,folate:30}, vitamins:["Iron","Protein","Folate"], healthScore:4, swap:"Urad dal vada — fried" },
  { id:793, name:"Tamil Chicken Curry", category:"Tamil Nadu", veg:false, serving:"1 bowl (200g)", cal:280, protein:24, carbs:10, fat:16, fiber:2, gi:"low", micro:{iron:1.5,calcium:18,vitC:5,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Spiced chicken — good protein" },
  { id:794, name:"Varuval (General Fry)", category:"Tamil Nadu", veg:true, serving:"1 bowl (150g)", cal:160, protein:3, carbs:16, fat:10, fiber:3, gi:"low", micro:{iron:1,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C","Fiber"], healthScore:6, swap:"Tamil stir-fry — use less oil" },
  { id:795, name:"Coconut Rice (Tamil)", category:"Tamil Nadu", veg:true, serving:"1 bowl (250g)", cal:300, protein:5, carbs:42, fat:12, fiber:2, gi:"high", micro:{iron:1,calcium:12,vitC:1,vitB12:0,folate:8}, vitamins:["Iron","Manganese"], healthScore:4, swap:"Use less coconut → Save 60 cal" },

  // ── Odisha (796–820) ────────────────────────────────────────────────────
  { id:796, name:"Dalma (Odisha)", category:"Odisha", veg:true, serving:"1 bowl (200g)", cal:180, protein:8, carbs:26, fat:5, fiber:5, gi:"low", micro:{iron:2,calcium:30,vitC:10,vitB12:0,folate:45}, vitamins:["Folate","Iron","Fiber","Vitamin C"], healthScore:9, swap:"Odia superfood — dal + veggies!" },
  { id:797, name:"Pakhala Bhata (Odisha)", category:"Odisha", veg:true, serving:"1 bowl (250g)", cal:190, protein:4, carbs:40, fat:1, fiber:1, gi:"medium", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:10}, vitamins:["Probiotics","Iron","B vitamins"], healthScore:6, swap:"Fermented rice water — cooling" },
  { id:798, name:"Chhena Poda (Odisha)", category:"Odisha", veg:true, serving:"1 slice (80g)", cal:220, protein:8, carbs:28, fat:8, fiber:0, gi:"high", micro:{iron:0.3,calcium:80,vitC:0,vitB12:0.3,folate:5}, vitamins:["Calcium","Protein","B2"], healthScore:5, swap:"Baked cheese cake — better than fried" },
  { id:799, name:"Chhena Jhili", category:"Odisha", veg:true, serving:"3 pcs (80g)", cal:240, protein:5, carbs:34, fat:10, fiber:0, gi:"high", micro:{iron:0.3,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:3, swap:"Fried cheese balls in syrup" },
  { id:800, name:"Aarisa Pitha", category:"Odisha", veg:true, serving:"2 pcs (80g)", cal:260, protein:3, carbs:38, fat:10, fiber:1, gi:"high", micro:{iron:0.8,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Rice + jaggery fried cake" },
  { id:801, name:"Manda Pitha", category:"Odisha", veg:true, serving:"3 pcs (100g)", cal:200, protein:3, carbs:34, fat:6, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Manganese"], healthScore:5, swap:"Steamed rice dumpling — moderate" },
  { id:802, name:"Kakara Pitha", category:"Odisha", veg:true, serving:"2 pcs (80g)", cal:240, protein:3, carbs:32, fat:12, fiber:1, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Deep fried sweet — festival food" },
  { id:803, name:"Enduri Pitha", category:"Odisha", veg:true, serving:"2 pcs (100g)", cal:190, protein:4, carbs:32, fat:5, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Manganese"], healthScore:5, swap:"Steamed in turmeric leaf — healthy" },
  { id:804, name:"Santula (Odisha)", category:"Odisha", veg:true, serving:"1 bowl (200g)", cal:110, protein:4, carbs:14, fat:4, fiber:5, gi:"low", micro:{iron:1.5,calcium:35,vitC:18,vitB12:0,folate:30}, vitamins:["Vitamin C","Fiber","Iron"], healthScore:9, swap:"No-oil veggies — super healthy!" },
  { id:805, name:"Besara", category:"Odisha", veg:true, serving:"1 bowl (200g)", cal:140, protein:4, carbs:16, fat:6, fiber:3, gi:"low", micro:{iron:1,calcium:20,vitC:8,vitB12:0,folate:15}, vitamins:["Iron","Vitamin C","Omega-3"], healthScore:7, swap:"Mustard-based veggie — tangy" },
  { id:806, name:"Machha Besara", category:"Odisha", veg:false, serving:"1 bowl (200g)", cal:230, protein:20, carbs:8, fat:14, fiber:1, gi:"low", micro:{iron:1.2,calcium:30,vitC:5,vitB12:2.5,folate:8}, vitamins:["Omega-3","B12","Iron"], healthScore:7, swap:"Fish in mustard — nutritious" },
  { id:807, name:"Machha Jhola", category:"Odisha", veg:false, serving:"1 bowl (200g)", cal:220, protein:20, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:25,vitC:5,vitB12:2.5,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Odia fish curry — light" },
  { id:808, name:"Ambula (Sour Curry)", category:"Odisha", veg:true, serving:"1 bowl (200g)", cal:100, protein:2, carbs:16, fat:3, fiber:2, gi:"low", micro:{iron:0.5,calcium:10,vitC:10,vitB12:0,folate:5}, vitamins:["Vitamin C","Iron"], healthScore:7, swap:"Sour veggie curry — digestive" },
  { id:809, name:"Kanika (Sweet Rice)", category:"Odisha", veg:true, serving:"1 bowl (250g)", cal:300, protein:4, carbs:50, fat:10, fiber:1, gi:"high", micro:{iron:1,calcium:12,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Sweet ghee rice — festival food" },
  { id:810, name:"Ghanta Tarkari", category:"Odisha", veg:true, serving:"1 bowl (200g)", cal:170, protein:5, carbs:22, fat:7, fiber:4, gi:"low", micro:{iron:1.5,calcium:25,vitC:10,vitB12:0,folate:20}, vitamins:["Fiber","Vitamin C","Iron"], healthScore:7, swap:"Mixed veg with banana — unique" },
  { id:811, name:"Mudhi Mansa", category:"Odisha", veg:false, serving:"1 plate (200g)", cal:340, protein:20, carbs:30, fat:16, fiber:1, gi:"medium", micro:{iron:2.5,calcium:15,vitC:3,vitB12:2,folate:6}, vitamins:["B12","Iron","Protein"], healthScore:5, swap:"Puffed rice + mutton — Odia street food" },
  { id:812, name:"Odia Khichudi", category:"Odisha", veg:true, serving:"1 bowl (250g)", cal:220, protein:7, carbs:34, fat:5, fiber:3, gi:"medium", micro:{iron:2,calcium:25,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","B vitamins","Potassium"], healthScore:7, swap:"Odia khichdi — comfort food" },
  { id:813, name:"Saga Bhaja", category:"Odisha", veg:true, serving:"1 bowl (150g)", cal:80, protein:3, carbs:8, fat:4, fiber:4, gi:"low", micro:{iron:2.5,calcium:100,vitC:20,vitB12:0,folate:50}, vitamins:["Calcium","Iron","Vitamin C"], healthScore:9, swap:"Fried greens — iron powerhouse" },
  { id:814, name:"Badi Chura", category:"Odisha", veg:true, serving:"1 bowl (100g)", cal:130, protein:5, carbs:14, fat:6, fiber:2, gi:"low", micro:{iron:1.5,calcium:20,vitC:3,vitB12:0,folate:15}, vitamins:["Iron","Protein","Folate"], healthScore:7, swap:"Crushed lentil nuggets — protein snack" },
  { id:815, name:"Dahi Baigana", category:"Odisha", veg:true, serving:"1 bowl (200g)", cal:150, protein:4, carbs:16, fat:8, fiber:3, gi:"low", micro:{iron:0.8,calcium:50,vitC:5,vitB12:0.2,folate:12}, vitamins:["Calcium","Probiotics","Fiber"], healthScore:7, swap:"Eggplant in yogurt — tangy" },
  { id:816, name:"Chungdi Malai (Odisha Prawn)", category:"Odisha", veg:false, serving:"1 bowl (200g)", cal:260, protein:18, carbs:8, fat:18, fiber:1, gi:"low", micro:{iron:1.5,calcium:45,vitC:3,vitB12:2,folate:8}, vitamins:["Selenium","B12","Omega-3"], healthScore:6, swap:"Coconut prawn curry" },
  { id:817, name:"Chuda Ghasa", category:"Odisha", veg:true, serving:"1 plate (100g)", cal:200, protein:3, carbs:32, fat:7, fiber:2, gi:"high", micro:{iron:1.5,calcium:10,vitC:2,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Sweetened flattened rice — snack" },
  { id:818, name:"Rasabali", category:"Odisha", veg:true, serving:"2 pcs (80g)", cal:240, protein:5, carbs:35, fat:9, fiber:0, gi:"high", micro:{iron:0.3,calcium:60,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:3, swap:"Flattened cheese in flavored milk" },
  { id:819, name:"Odia Chhena Gaja", category:"Odisha", veg:true, serving:"2 pcs (60g)", cal:200, protein:4, carbs:28, fat:8, fiber:0, gi:"high", micro:{iron:0.2,calcium:50,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium","Protein"], healthScore:3, swap:"Fried cheese bar — sugary" },
  { id:820, name:"Bhendi Bhaja (Odisha)", category:"Odisha", veg:true, serving:"1 bowl (150g)", cal:140, protein:3, carbs:12, fat:9, fiber:4, gi:"low", micro:{iron:1,calcium:25,vitC:15,vitB12:0,folate:30}, vitamins:["Vitamin C","Folate","Fiber"], healthScore:6, swap:"Okra fry — use less oil" },

  // ── Bihari (821–845) ────────────────────────────────────────────────────
  { id:821, name:"Litti Chokha (Bihari)", category:"Bihari", veg:true, serving:"2 litti + chokha", cal:380, protein:10, carbs:52, fat:14, fiber:5, gi:"medium", micro:{iron:3,calcium:30,vitC:5,vitB12:0,folate:40}, vitamins:["Iron","Folate","Fiber"], healthScore:6, swap:"Baked wheat balls — decent nutrition" },
  { id:822, name:"Sattu Paratha (Bihari)", category:"Bihari", veg:true, serving:"1 pc (120g)", cal:260, protein:8, carbs:32, fat:11, fiber:4, gi:"medium", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:30}, vitamins:["Iron","Protein","Calcium"], healthScore:7, swap:"High protein filling — great choice" },
  { id:823, name:"Thekua (Bihari)", category:"Bihari", veg:true, serving:"3 pcs (80g)", cal:260, protein:4, carbs:36, fat:12, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Festival sweet — deep fried" },
  { id:824, name:"Dhuska (Bihari)", category:"Bihari", veg:true, serving:"2 pcs (100g)", cal:240, protein:6, carbs:30, fat:11, fiber:2, gi:"high", micro:{iron:1.5,calcium:12,vitC:1,vitB12:0,folate:15}, vitamins:["Iron","Protein"], healthScore:4, swap:"Rice-lentil fritter — fried" },
  { id:825, name:"Bihari Malpua", category:"Bihari", veg:true, serving:"2 pcs (80g)", cal:300, protein:4, carbs:38, fat:14, fiber:1, gi:"high", micro:{iron:0.8,calcium:15,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:2, swap:"Sweet pancake — rich and fried" },
  { id:826, name:"Tilkut", category:"Bihari", veg:true, serving:"2 pcs (40g)", cal:180, protein:4, carbs:18, fat:10, fiber:2, gi:"medium", micro:{iron:2,calcium:80,vitC:0,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Zinc"], healthScore:5, swap:"Sesame sweet — good calcium source" },
  { id:827, name:"Anarsa", category:"Bihari", veg:true, serving:"2 pcs (60g)", cal:220, protein:2, carbs:32, fat:10, fiber:1, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:3, swap:"Rice + jaggery sweet — fried" },
  { id:828, name:"Khaja (Bihari)", category:"Bihari", veg:true, serving:"2 pcs (50g)", cal:210, protein:2, carbs:28, fat:10, fiber:0, gi:"high", micro:{iron:0.5,calcium:5,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Flaky fried sweet — very rich" },
  { id:829, name:"Bihari Chana Ghugni", category:"Bihari", veg:true, serving:"1 bowl (200g)", cal:200, protein:10, carbs:28, fat:5, fiber:6, gi:"low", micro:{iron:2.5,calcium:35,vitC:5,vitB12:0,folate:55}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Spiced chickpea curry — great protein" },
  { id:830, name:"Sattu Drink (Bihari)", category:"Bihari", veg:true, serving:"1 glass (250ml)", cal:110, protein:7, carbs:16, fat:2, fiber:2, gi:"low", micro:{iron:2,calcium:18,vitC:1,vitB12:0,folate:15}, vitamins:["Iron","Protein","Fiber"], healthScore:8, swap:"Roasted gram drink — protein-rich" },
  { id:831, name:"Bihari Mutton Curry", category:"Bihari", veg:false, serving:"1 bowl (200g)", cal:360, protein:26, carbs:8, fat:26, fiber:1, gi:"low", micro:{iron:3.5,calcium:20,vitC:3,vitB12:3,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Rich mutton — eat in moderation" },
  { id:832, name:"Kadhi Bari (Bihari)", category:"Bihari", veg:true, serving:"1 bowl (200g)", cal:200, protein:7, carbs:20, fat:10, fiber:2, gi:"medium", micro:{iron:1,calcium:70,vitC:2,vitB12:0.2,folate:15}, vitamins:["Calcium","Protein","Probiotics"], healthScore:6, swap:"Yogurt curry with dumplings" },
  { id:833, name:"Makhana Kheer", category:"Bihari", veg:true, serving:"1 bowl (150g)", cal:220, protein:6, carbs:30, fat:8, fiber:1, gi:"high", micro:{iron:0.5,calcium:80,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","Magnesium","B12"], healthScore:5, swap:"Fox nut kheer — lighter than regular" },
  { id:834, name:"Bihari Chicken Curry", category:"Bihari", veg:false, serving:"1 bowl (200g)", cal:290, protein:24, carbs:10, fat:18, fiber:1, gi:"low", micro:{iron:1.5,calcium:18,vitC:5,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Home-style — good protein" },
  { id:835, name:"Aaloo Chokha", category:"Bihari", veg:true, serving:"1 bowl (150g)", cal:120, protein:3, carbs:20, fat:4, fiber:2, gi:"medium", micro:{iron:0.8,calcium:10,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin C","B6","Potassium"], healthScore:7, swap:"Mashed potato with mustard oil — simple" },
  { id:836, name:"Dal Pitha", category:"Bihari", veg:true, serving:"4 pcs (120g)", cal:210, protein:8, carbs:30, fat:6, fiber:3, gi:"medium", micro:{iron:2,calcium:20,vitC:1,vitB12:0,folate:25}, vitamins:["Iron","Folate","Protein"], healthScore:7, swap:"Steamed lentil dumplings — healthy" },
  { id:837, name:"Marua Roti", category:"Bihari", veg:true, serving:"1 pc (60g)", cal:110, protein:3, carbs:22, fat:1, fiber:3, gi:"low", micro:{iron:2,calcium:120,vitC:0,vitB12:0,folate:10}, vitamins:["Calcium","Iron","Fiber"], healthScore:8, swap:"Finger millet bread — calcium-rich" },
  { id:838, name:"Nimki (Bihari)", category:"Bihari", veg:true, serving:"6 pcs (40g)", cal:180, protein:3, carbs:18, fat:11, fiber:1, gi:"high", micro:{iron:0.8,calcium:5,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:3, swap:"Fried crispy snack — limit portion" },
  { id:839, name:"Bihari Pedha", category:"Bihari", veg:true, serving:"2 pcs (40g)", cal:170, protein:4, carbs:22, fat:7, fiber:0, gi:"high", micro:{iron:0.3,calcium:40,vitC:0,vitB12:0.2,folate:3}, vitamins:["Calcium"], healthScore:3, swap:"Milk sweet — moderate portion" },
  { id:840, name:"Choora Matar (Bihari)", category:"Bihari", veg:true, serving:"1 plate (150g)", cal:280, protein:6, carbs:40, fat:10, fiber:3, gi:"high", micro:{iron:2,calcium:15,vitC:5,vitB12:0,folate:20}, vitamins:["Iron","B vitamins","Vitamin C"], healthScore:5, swap:"Flattened rice + peas — quick meal" },
  { id:841, name:"Pitta (Bihari)", category:"Bihari", veg:true, serving:"3 pcs (100g)", cal:190, protein:5, carbs:30, fat:5, fiber:2, gi:"medium", micro:{iron:1.5,calcium:12,vitC:0,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:6, swap:"Rice dumplings — traditional" },
  { id:842, name:"Bagiya", category:"Bihari", veg:true, serving:"2 pcs (100g)", cal:180, protein:4, carbs:30, fat:5, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Steamed rice cake — festival food" },
  { id:843, name:"Bihari Baingan Chokha", category:"Bihari", veg:true, serving:"1 bowl (150g)", cal:100, protein:2, carbs:12, fat:5, fiber:4, gi:"low", micro:{iron:0.8,calcium:15,vitC:5,vitB12:0,folate:15}, vitamins:["Fiber","Iron","Antioxidants"], healthScore:8, swap:"Roasted eggplant — very healthy" },
  { id:844, name:"Sattu Laddoo", category:"Bihari", veg:true, serving:"2 pcs (50g)", cal:200, protein:6, carbs:26, fat:8, fiber:2, gi:"medium", micro:{iron:2,calcium:20,vitC:0,vitB12:0,folate:15}, vitamins:["Iron","Protein","Fiber"], healthScore:5, swap:"Roasted gram ladoo — better than fried" },
  { id:845, name:"Bihari Fish Curry", category:"Bihari", veg:false, serving:"1 bowl (200g)", cal:230, protein:20, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:25,vitC:5,vitB12:2.5,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Mustard fish — healthy" },

  // ── Assamese (846–865) ──────────────────────────────────────────────────
  { id:846, name:"Masor Tenga (Assamese)", category:"Assamese", veg:false, serving:"1 bowl (250g)", cal:220, protein:20, carbs:12, fat:10, fiber:2, gi:"low", micro:{iron:1.5,calcium:30,vitC:15,vitB12:2.5,folate:10}, vitamins:["B12","Vitamin C","Omega-3"], healthScore:7, swap:"Sour fish curry — light and tangy" },
  { id:847, name:"Khar (Assamese)", category:"Assamese", veg:true, serving:"1 bowl (200g)", cal:100, protein:3, carbs:14, fat:4, fiber:3, gi:"low", micro:{iron:1,calcium:20,vitC:8,vitB12:0,folate:15}, vitamins:["Potassium","Iron","Fiber"], healthScore:8, swap:"Alkaline dish — traditional detox" },
  { id:848, name:"Ou Tenga Curry", category:"Assamese", veg:true, serving:"1 bowl (200g)", cal:110, protein:2, carbs:16, fat:4, fiber:3, gi:"low", micro:{iron:0.8,calcium:15,vitC:20,vitB12:0,folate:10}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:8, swap:"Elephant apple curry — very light" },
  { id:849, name:"Til Pitha", category:"Assamese", veg:true, serving:"3 pcs (80g)", cal:220, protein:4, carbs:30, fat:9, fiber:2, gi:"high", micro:{iron:2,calcium:60,vitC:0,vitB12:0,folate:8}, vitamins:["Calcium","Iron","Zinc"], healthScore:5, swap:"Sesame rice cake — calcium from til" },
  { id:850, name:"Ghila Pitha", category:"Assamese", veg:true, serving:"3 pcs (80g)", cal:200, protein:3, carbs:32, fat:6, fiber:1, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Fried rice cake — moderate portion" },
  { id:851, name:"Narikol Pitha", category:"Assamese", veg:true, serving:"3 pcs (80g)", cal:210, protein:3, carbs:30, fat:8, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","Manganese"], healthScore:4, swap:"Coconut rice cake — festival food" },
  { id:852, name:"Hanhor Mangxo (Duck Curry)", category:"Assamese", veg:false, serving:"1 bowl (200g)", cal:340, protein:24, carbs:6, fat:24, fiber:1, gi:"low", micro:{iron:3,calcium:15,vitC:3,vitB12:1.5,folate:8}, vitamins:["B12","Iron","Protein"], healthScore:5, swap:"Duck curry — rich, eat in moderation" },
  { id:853, name:"Xaak Bhaji (Assamese)", category:"Assamese", veg:true, serving:"1 bowl (150g)", cal:80, protein:3, carbs:8, fat:4, fiber:4, gi:"low", micro:{iron:2.5,calcium:100,vitC:25,vitB12:0,folate:50}, vitamins:["Calcium","Iron","Vitamin C"], healthScore:9, swap:"Leafy greens — super nutritious" },
  { id:854, name:"Aloo Pitika (Assamese)", category:"Assamese", veg:true, serving:"1 bowl (150g)", cal:140, protein:3, carbs:24, fat:4, fiber:2, gi:"medium", micro:{iron:0.8,calcium:10,vitC:12,vitB12:0,folate:10}, vitamins:["Vitamin C","B6","Potassium"], healthScore:6, swap:"Mashed potato — simple comfort food" },
  { id:855, name:"Kumura Khar", category:"Assamese", veg:true, serving:"1 bowl (200g)", cal:90, protein:2, carbs:14, fat:3, fiber:2, gi:"low", micro:{iron:0.5,calcium:15,vitC:5,vitB12:0,folate:8}, vitamins:["Fiber","Potassium"], healthScore:7, swap:"Pumpkin in alkaline — light dish" },
  { id:856, name:"Poitabhat", category:"Assamese", veg:true, serving:"1 bowl (250g)", cal:170, protein:3, carbs:36, fat:1, fiber:1, gi:"medium", micro:{iron:1,calcium:12,vitC:2,vitB12:0,folate:8}, vitamins:["Probiotics","Iron"], healthScore:6, swap:"Overnight fermented rice — probiotic" },
  { id:857, name:"Bamboo Shoot Curry (Assamese)", category:"Assamese", veg:true, serving:"1 bowl (200g)", cal:120, protein:4, carbs:14, fat:5, fiber:4, gi:"low", micro:{iron:1,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Fiber","Potassium","Iron"], healthScore:8, swap:"Low cal — Northeast specialty" },
  { id:858, name:"Maasor Koni (Fish Egg)", category:"Assamese", veg:false, serving:"1 bowl (100g)", cal:180, protein:14, carbs:4, fat:12, fiber:0, gi:"low", micro:{iron:2,calcium:20,vitC:2,vitB12:3,folate:20}, vitamins:["B12","Omega-3","Folate"], healthScore:7, swap:"Fish roe — very nutrient-dense" },
  { id:859, name:"Bor Pitha", category:"Assamese", veg:true, serving:"4 pcs (80g)", cal:200, protein:3, carbs:28, fat:8, fiber:1, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:4, swap:"Deep fried rice balls — festival" },
  { id:860, name:"Laru (Coconut/Til)", category:"Assamese", veg:true, serving:"3 pcs (50g)", cal:200, protein:3, carbs:22, fat:12, fiber:2, gi:"high", micro:{iron:1.5,calcium:50,vitC:0,vitB12:0,folate:5}, vitamins:["Calcium","Iron"], healthScore:4, swap:"Sweet balls — coconut or sesame" },
  { id:861, name:"Jolpan", category:"Assamese", veg:true, serving:"1 plate (150g)", cal:180, protein:4, carbs:30, fat:5, fiber:2, gi:"medium", micro:{iron:1,calcium:20,vitC:2,vitB12:0.2,folate:8}, vitamins:["Iron","B vitamins","Calcium"], healthScore:6, swap:"Rice flakes + curd + jaggery — snack" },
  { id:862, name:"Xukan Maas", category:"Assamese", veg:false, serving:"1 bowl (100g)", cal:200, protein:20, carbs:4, fat:12, fiber:0, gi:"low", micro:{iron:2,calcium:30,vitC:1,vitB12:3,folate:5}, vitamins:["B12","Iron","Protein"], healthScore:6, swap:"Dried fish — intense flavor, high protein" },
  { id:863, name:"Assamese Fish Tenga", category:"Assamese", veg:false, serving:"1 bowl (200g)", cal:200, protein:18, carbs:10, fat:10, fiber:1, gi:"low", micro:{iron:1,calcium:25,vitC:15,vitB12:2.5,folate:8}, vitamins:["Vitamin C","B12","Omega-3"], healthScore:7, swap:"Tomato-based sour fish — light" },
  { id:864, name:"Papaya Khar", category:"Assamese", veg:true, serving:"1 bowl (200g)", cal:80, protein:1, carbs:14, fat:2, fiber:3, gi:"low", micro:{iron:0.5,calcium:15,vitC:30,vitB12:0,folate:10}, vitamins:["Vitamin C","Vitamin A","Fiber"], healthScore:8, swap:"Raw papaya in alkaline — digestive" },
  { id:865, name:"Assamese Pitha Mix", category:"Assamese", veg:true, serving:"assorted 3 pcs", cal:220, protein:4, carbs:32, fat:8, fiber:2, gi:"high", micro:{iron:1,calcium:15,vitC:0,vitB12:0,folate:5}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Festival rice cakes — various types" },

  // ── Goan (866–890) ──────────────────────────────────────────────────────
  { id:866, name:"Goan Vindaloo", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:350, protein:24, carbs:10, fat:24, fiber:1, gi:"low", micro:{iron:3,calcium:18,vitC:5,vitB12:2.5,folate:6}, vitamins:["B12","Iron","Zinc"], healthScore:5, swap:"Fiery pork curry — eat in moderation" },
  { id:867, name:"Chicken Xacuti", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:300, protein:24, carbs:10, fat:18, fiber:2, gi:"low", micro:{iron:2,calcium:25,vitC:5,vitB12:2,folate:8}, vitamins:["B12","Iron","Zinc"], healthScore:6, swap:"Coconut-spice chicken — good protein" },
  { id:868, name:"Sorpotel", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:380, protein:22, carbs:8, fat:30, fiber:1, gi:"low", micro:{iron:4,calcium:15,vitC:3,vitB12:3,folate:5}, vitamins:["Iron","B12","Zinc"], healthScore:4, swap:"Pork offal curry — very rich in iron" },
  { id:869, name:"Goan Fish Curry", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:230, protein:20, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1,calcium:30,vitC:5,vitB12:3,folate:8}, vitamins:["Omega-3","B12","Selenium"], healthScore:7, swap:"Coconut fish curry — staple Goan food" },
  { id:870, name:"Bebinca", category:"Goan", veg:true, serving:"1 slice (80g)", cal:300, protein:4, carbs:36, fat:16, fiber:0, gi:"high", micro:{iron:0.5,calcium:30,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium","B2"], healthScore:2, swap:"Layered dessert — very rich, small slice" },
  { id:871, name:"Dodol", category:"Goan", veg:true, serving:"2 pcs (50g)", cal:200, protein:2, carbs:30, fat:8, fiber:1, gi:"high", micro:{iron:0.5,calcium:10,vitC:0,vitB12:0,folate:3}, vitamins:["Iron","Manganese"], healthScore:3, swap:"Coconut-jaggery sweet — chewy" },
  { id:872, name:"Ros Omelette", category:"Goan", veg:false, serving:"1 plate", cal:280, protein:14, carbs:18, fat:16, fiber:1, gi:"medium", micro:{iron:1.5,calcium:35,vitC:5,vitB12:0.8,folate:25}, vitamins:["B12","Protein","Iron"], healthScore:5, swap:"Omelette in curry — Goan breakfast" },
  { id:873, name:"Chicken Cafreal", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:280, protein:26, carbs:6, fat:16, fiber:1, gi:"low", micro:{iron:1.5,calcium:15,vitC:8,vitB12:2,folate:8}, vitamins:["B12","Iron","Vitamin C"], healthScore:6, swap:"Green masala chicken — Portuguese influenced" },
  { id:874, name:"Prawn Balchao", category:"Goan", veg:false, serving:"1 bowl (150g)", cal:200, protein:16, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1.5,calcium:40,vitC:5,vitB12:1.5,folate:8}, vitamins:["Selenium","B12","Iron"], healthScore:6, swap:"Pickled prawns — tangy and spicy" },
  { id:875, name:"Goan Feijoada", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:320, protein:20, carbs:22, fat:18, fiber:4, gi:"low", micro:{iron:3,calcium:30,vitC:5,vitB12:2,folate:30}, vitamins:["Iron","Folate","B12"], healthScore:5, swap:"Pork and bean stew — Portuguese origin" },
  { id:876, name:"Pork Bafat", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:340, protein:22, carbs:8, fat:24, fiber:1, gi:"low", micro:{iron:2.5,calcium:15,vitC:3,vitB12:2,folate:5}, vitamins:["B12","Iron","Zinc"], healthScore:4, swap:"Spiced pork — rich and heavy" },
  { id:877, name:"Prawn Rawa Fry", category:"Goan", veg:false, serving:"6 pcs (120g)", cal:250, protein:16, carbs:14, fat:15, fiber:0, gi:"medium", micro:{iron:1.5,calcium:40,vitC:2,vitB12:1.5,folate:6}, vitamins:["Selenium","B12","Protein"], healthScore:5, swap:"Semolina-coated prawns — shallow fry" },
  { id:878, name:"Kingfish Recheado", category:"Goan", veg:false, serving:"1 pc (150g)", cal:260, protein:22, carbs:8, fat:16, fiber:0, gi:"low", micro:{iron:1.5,calcium:25,vitC:3,vitB12:3,folate:6}, vitamins:["Omega-3","B12","Selenium"], healthScore:6, swap:"Stuffed-masala kingfish — rich in omega-3" },
  { id:879, name:"Goan Sol Kadhi", category:"Goan", veg:true, serving:"1 glass (200ml)", cal:60, protein:1, carbs:6, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:8,vitC:5,vitB12:0,folate:3}, vitamins:["Vitamin C","Antioxidants"], healthScore:8, swap:"Kokum-coconut digestive — very low cal" },
  { id:880, name:"Sanna", category:"Goan", veg:true, serving:"3 pcs (120g)", cal:200, protein:4, carbs:36, fat:4, fiber:1, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins","Probiotics"], healthScore:6, swap:"Steamed rice bread — fermented" },
  { id:881, name:"Fugias", category:"Goan", veg:true, serving:"4 pcs (60g)", cal:220, protein:3, carbs:26, fat:12, fiber:1, gi:"high", micro:{iron:0.5,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:3, swap:"Fried Goan cookies — Christmas snack" },
  { id:882, name:"Goan Prawn Curry", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:220, protein:20, carbs:10, fat:12, fiber:1, gi:"low", micro:{iron:1.5,calcium:50,vitC:4,vitB12:2,folate:10}, vitamins:["Selenium","B12","Omega-3"], healthScore:7, swap:"Coconut prawn curry — coastal staple" },
  { id:883, name:"Shark Ambot Tik", category:"Goan", veg:false, serving:"1 bowl (200g)", cal:240, protein:22, carbs:12, fat:12, fiber:1, gi:"low", micro:{iron:1.5,calcium:30,vitC:5,vitB12:2.5,folate:8}, vitamins:["B12","Selenium","Iron"], healthScore:6, swap:"Sour-spicy fish curry — unique Goan" },
  { id:884, name:"Mushroom Xacuti", category:"Goan", veg:true, serving:"1 bowl (200g)", cal:180, protein:6, carbs:14, fat:12, fiber:3, gi:"low", micro:{iron:1.5,calcium:20,vitC:3,vitB12:0,folate:15}, vitamins:["Selenium","B vitamins","Iron"], healthScore:6, swap:"Veg xacuti — coconut-spice blend" },
  { id:885, name:"Tendli Bhaji (Goan)", category:"Goan", veg:true, serving:"1 bowl (150g)", cal:100, protein:2, carbs:10, fat:6, fiber:3, gi:"low", micro:{iron:0.8,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Fiber","Vitamin C"], healthScore:7, swap:"Ivy gourd stir-fry — simple" },
  { id:886, name:"Serradura", category:"Goan", veg:true, serving:"1 cup (100g)", cal:260, protein:3, carbs:26, fat:16, fiber:0, gi:"high", micro:{iron:0.2,calcium:30,vitC:0,vitB12:0.1,folate:2}, vitamins:["Calcium"], healthScore:2, swap:"Portuguese sawdust pudding — rich cream" },
  { id:887, name:"Chourico Pao", category:"Goan", veg:false, serving:"1 pc (120g)", cal:320, protein:14, carbs:28, fat:16, fiber:1, gi:"high", micro:{iron:2,calcium:15,vitC:3,vitB12:1.5,folate:8}, vitamins:["B12","Iron","Protein"], healthScore:4, swap:"Goan sausage bread — smoky and spicy" },
  { id:888, name:"Goan Pao", category:"Goan", veg:true, serving:"2 pcs (80g)", cal:200, protein:5, carbs:36, fat:3, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Portuguese bread rolls — staple" },
  { id:889, name:"Cabbage Fugad", category:"Goan", veg:true, serving:"1 bowl (150g)", cal:100, protein:3, carbs:10, fat:5, fiber:3, gi:"low", micro:{iron:0.5,calcium:30,vitC:18,vitB12:0,folate:18}, vitamins:["Vitamin C","Vitamin K","Fiber"], healthScore:8, swap:"Stir-fried cabbage — Goan style" },
  { id:890, name:"Goan Poi", category:"Goan", veg:true, serving:"1 pc (60g)", cal:150, protein:4, carbs:28, fat:2, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Local Goan bread — everyday staple" },

  // ── Punjabi (891–920) ───────────────────────────────────────────────────
  { id:891, name:"Sarson ka Saag + Makki Roti", category:"Punjabi", veg:true, serving:"1 plate", cal:300, protein:8, carbs:36, fat:14, fiber:7, gi:"medium", micro:{iron:4,calcium:120,vitC:15,vitB12:0,folate:45}, vitamins:["Vitamin A","Vitamin K","Iron","Calcium"], healthScore:8, swap:"Punjabi superfood combo — excellent!" },
  { id:892, name:"Amritsari Kulcha", category:"Punjabi", veg:true, serving:"1 pc (100g)", cal:280, protein:7, carbs:38, fat:10, fiber:2, gi:"high", micro:{iron:1.5,calcium:18,vitC:3,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Stuffed tandoor bread — heavy" },
  { id:893, name:"Pindi Chole (Punjabi)", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:230, protein:10, carbs:34, fat:6, fiber:7, gi:"low", micro:{iron:3,calcium:50,vitC:4,vitB12:0,folate:70}, vitamins:["Iron","Folate","Manganese"], healthScore:7, swap:"Dry style chickpeas — less oil" },
  { id:894, name:"Rajma Chawal (Punjabi)", category:"Punjabi", veg:true, serving:"1 plate (350g)", cal:380, protein:14, carbs:60, fat:8, fiber:8, gi:"medium", micro:{iron:3.5,calcium:55,vitC:3,vitB12:0,folate:75}, vitamins:["Iron","Folate","Fiber"], healthScore:7, swap:"Use brown rice → gain more fiber" },
  { id:895, name:"Punjabi Kadhi Pakoda", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:220, protein:6, carbs:18, fat:14, fiber:2, gi:"low", micro:{iron:0.8,calcium:80,vitC:2,vitB12:0.4,folate:15}, vitamins:["Calcium","Probiotics","B12"], healthScore:5, swap:"Skip pakoras for lighter kadhi" },
  { id:896, name:"Punjabi Lassi", category:"Punjabi", veg:true, serving:"1 glass (300ml)", cal:200, protein:6, carbs:30, fat:6, fiber:0, gi:"medium", micro:{iron:0.3,calcium:150,vitC:2,vitB12:0.5,folate:8}, vitamins:["Calcium","B12","Probiotics"], healthScore:5, swap:"Use less sugar → Save 60 cal" },
  { id:897, name:"Pinni", category:"Punjabi", veg:true, serving:"2 pcs (60g)", cal:280, protein:5, carbs:28, fat:18, fiber:2, gi:"high", micro:{iron:1.5,calcium:20,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Winter energy ball — very rich" },
  { id:898, name:"Gajrela (Gajar Halwa)", category:"Punjabi", veg:true, serving:"1 bowl (100g)", cal:260, protein:4, carbs:32, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:45,vitC:3,vitB12:0.2,folate:10}, vitamins:["Vitamin A","Calcium","Iron"], healthScore:4, swap:"Use jaggery instead of sugar" },
  { id:899, name:"Punjabi Tandoori Chicken", category:"Punjabi", veg:false, serving:"2 pcs (200g)", cal:220, protein:30, carbs:4, fat:9, fiber:0, gi:"low", micro:{iron:1.5,calcium:18,vitC:1,vitB12:2.5,folate:8}, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:8, swap:"Remove skin → even fewer cal" },
  { id:900, name:"Amritsari Fish Fry", category:"Punjabi", veg:false, serving:"4 pcs (150g)", cal:300, protein:20, carbs:18, fat:18, fiber:1, gi:"medium", micro:{iron:1.5,calcium:25,vitC:3,vitB12:2,folate:8}, vitamins:["B12","Omega-3","Protein"], healthScore:5, swap:"Batter fried fish — try baked version" },
  { id:901, name:"Keema Naan", category:"Punjabi", veg:false, serving:"1 pc (120g)", cal:350, protein:14, carbs:38, fat:15, fiber:2, gi:"high", micro:{iron:2,calcium:18,vitC:1,vitB12:1.5,folate:10}, vitamins:["B12","Iron","Protein"], healthScore:4, swap:"Minced meat naan — heavy" },
  { id:902, name:"Punjabi Aloo Gobi", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:180, protein:4, carbs:22, fat:8, fiber:4, gi:"low", micro:{iron:1.2,calcium:35,vitC:25,vitB12:0,folate:30}, vitamins:["Vitamin C","Vitamin K","Folate"], healthScore:7, swap:"Classic — add paneer for protein" },
  { id:903, name:"Stuffed Aloo Paratha", category:"Punjabi", veg:true, serving:"1 pc (120g)", cal:280, protein:6, carbs:36, fat:12, fiber:2, gi:"medium", micro:{iron:1.2,calcium:20,vitC:8,vitB12:0,folate:12}, vitamins:["Vitamin C","B6","Potassium"], healthScore:5, swap:"Gobhi paratha is lighter" },
  { id:904, name:"Stuffed Paneer Paratha", category:"Punjabi", veg:true, serving:"1 pc (120g)", cal:310, protein:10, carbs:32, fat:16, fiber:2, gi:"medium", micro:{iron:1,calcium:150,vitC:1,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Phosphorus"], healthScore:5, swap:"Use low-fat paneer → Save 50 cal" },
  { id:905, name:"Stuffed Mooli Paratha", category:"Punjabi", veg:true, serving:"1 pc (120g)", cal:240, protein:5, carbs:30, fat:11, fiber:3, gi:"medium", micro:{iron:1,calcium:20,vitC:10,vitB12:0,folate:15}, vitamins:["Vitamin C","Potassium","Fiber"], healthScore:6, swap:"Radish paratha — aids digestion" },
  { id:906, name:"Punjabi Chana Masala", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:240, protein:10, carbs:35, fat:6, fiber:8, gi:"low", micro:{iron:3,calcium:55,vitC:4,vitB12:0,folate:75}, vitamins:["Iron","Folate","Manganese"], healthScore:8, swap:"High fiber chickpea curry — excellent" },
  { id:907, name:"Malai Kofta (Punjabi)", category:"Punjabi", veg:true, serving:"2 pcs + gravy", cal:420, protein:10, carbs:28, fat:30, fiber:2, gi:"medium", micro:{iron:1,calcium:180,vitC:2,vitB12:0.4,folate:15}, vitamins:["Calcium","B12"], healthScore:3, swap:"Very rich — have paneer bhurji instead" },
  { id:908, name:"Gajar Halwa (Punjabi)", category:"Punjabi", veg:true, serving:"1 bowl (100g)", cal:260, protein:4, carbs:32, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:45,vitC:3,vitB12:0.2,folate:10}, vitamins:["Vitamin A","Calcium"], healthScore:4, swap:"Use jaggery instead of sugar" },
  { id:909, name:"Punjabi Dahi Bhalle", category:"Punjabi", veg:true, serving:"3 pcs (150g)", cal:200, protein:7, carbs:26, fat:7, fiber:2, gi:"medium", micro:{iron:1.5,calcium:60,vitC:3,vitB12:0.2,folate:15}, vitamins:["Calcium","Iron","Probiotics"], healthScore:5, swap:"Bake vadas instead of frying" },
  { id:910, name:"Punjabi Tikki Chaat", category:"Punjabi", veg:true, serving:"2 pcs + toppings", cal:280, protein:5, carbs:34, fat:14, fiber:3, gi:"high", micro:{iron:1,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Potassium","Vitamin C"], healthScore:4, swap:"Bake tikki → Save 60 cal" },
  { id:911, name:"Punjabi Papdi Chaat", category:"Punjabi", veg:true, serving:"1 plate (150g)", cal:250, protein:5, carbs:32, fat:11, fiber:2, gi:"high", micro:{iron:0.8,calcium:30,vitC:5,vitB12:0.2,folate:8}, vitamins:["Calcium","Vitamin C"], healthScore:4, swap:"Have bhel puri → Save 70 cal" },
  { id:912, name:"Shahi Paneer (Punjabi)", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:390, protein:15, carbs:16, fat:30, fiber:2, gi:"low", micro:{iron:0.8,calcium:200,vitC:1,vitB12:0.5,folate:15}, vitamins:["Calcium","B12"], healthScore:3, swap:"Have palak paneer → Save 170 cal" },
  { id:913, name:"Paneer Tikka (Punjabi)", category:"Punjabi", veg:true, serving:"6 pcs (150g)", cal:280, protein:16, carbs:8, fat:20, fiber:1, gi:"low", micro:{iron:0.8,calcium:200,vitC:3,vitB12:0.5,folate:12}, vitamins:["Calcium","B12","Phosphorus"], healthScore:6, swap:"Grilled paneer — good protein" },
  { id:914, name:"Makki ki Roti (Punjabi)", category:"Punjabi", veg:true, serving:"1 pc (60g)", cal:120, protein:3, carbs:24, fat:2, fiber:3, gi:"medium", micro:{iron:1.5,calcium:8,vitC:0,vitB12:0,folate:8}, vitamins:["Fiber","Iron","Vitamin A"], healthScore:7, swap:"Corn bread — gluten-free option" },
  { id:915, name:"Punjabi Paneer Butter Masala", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:370, protein:14, carbs:18, fat:28, fiber:2, gi:"low", micro:{iron:0.8,calcium:200,vitC:2,vitB12:0.5,folate:15}, vitamins:["Calcium","B12"], healthScore:4, swap:"Have palak paneer → Save 150 cal" },
  { id:916, name:"Punjabi Bhindi Masala", category:"Punjabi", veg:true, serving:"1 bowl (150g)", cal:130, protein:3, carbs:12, fat:8, fiber:4, gi:"low", micro:{iron:1,calcium:30,vitC:18,vitB12:0,folate:35}, vitamins:["Vitamin C","Folate","Fiber"], healthScore:7, swap:"Okra fry — stir-fry for less oil" },
  { id:917, name:"Punjabi Jalebi", category:"Punjabi", veg:true, serving:"3 pcs (80g)", cal:300, protein:2, carbs:48, fat:12, fiber:0, gi:"high", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:3}, vitamins:["Iron"], healthScore:2, swap:"Very sugary — have fruit instead" },
  { id:918, name:"Chole Bhature (Punjabi)", category:"Punjabi", veg:true, serving:"2 bhature + chole", cal:550, protein:14, carbs:62, fat:26, fiber:6, gi:"high", micro:{iron:3,calcium:55,vitC:4,vitB12:0,folate:70}, vitamins:["Iron","Folate","Protein"], healthScore:3, swap:"Have chole with roti → Save 250 cal" },
  { id:919, name:"Dal Makhani (Punjabi)", category:"Punjabi", veg:true, serving:"1 bowl (200g)", cal:260, protein:9, carbs:28, fat:13, fiber:4, gi:"low", micro:{iron:2.5,calcium:60,vitC:2,vitB12:0,folate:65}, vitamins:["Iron","Folate","B6"], healthScore:6, swap:"Use less butter/cream → Save 80 cal" },
  { id:920, name:"Butter Chicken (Punjabi)", category:"Punjabi", veg:false, serving:"1 bowl (200g)", cal:390, protein:28, carbs:14, fat:24, fiber:1, gi:"low", micro:{iron:1.2,calcium:30,vitC:2,vitB12:2,folate:10}, vitamins:["B12","Iron","Zinc","Niacin"], healthScore:5, swap:"Have tandoori chicken → Save 170 cal" },

  // ── Street Food (921–945) ───────────────────────────────────────────────
  { id:921, name:"Pani Puri (Street)", category:"Street Food", veg:true, serving:"8 pcs", cal:180, protein:3, carbs:30, fat:5, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:8,vitB12:0,folate:8}, vitamins:["Vitamin C","Iron"], healthScore:5, swap:"Use sprout filling for protein" },
  { id:922, name:"Sev Puri (Street)", category:"Street Food", veg:true, serving:"6 pcs", cal:220, protein:4, carbs:28, fat:10, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:4, swap:"Have bhel puri → Save 40 cal" },
  { id:923, name:"Bhel Puri (Street)", category:"Street Food", veg:true, serving:"1 plate (150g)", cal:180, protein:4, carbs:30, fat:5, fiber:3, gi:"medium", micro:{iron:1.5,calcium:10,vitC:6,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Lighter chaat option" },
  { id:924, name:"Dahi Puri (Street)", category:"Street Food", veg:true, serving:"6 pcs", cal:200, protein:5, carbs:28, fat:7, fiber:2, gi:"high", micro:{iron:0.8,calcium:40,vitC:3,vitB12:0.3,folate:8}, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:5, swap:"Curd adds probiotics" },
  { id:925, name:"Egg Roll (Street)", category:"Street Food", veg:false, serving:"1 roll", cal:300, protein:12, carbs:32, fat:14, fiber:2, gi:"high", micro:{iron:1.5,calcium:30,vitC:3,vitB12:0.8,folate:15}, vitamins:["B12","Protein","Iron"], healthScore:5, swap:"Kolkata style — moderate" },
  { id:926, name:"Chicken Roll (Street)", category:"Street Food", veg:false, serving:"1 roll", cal:340, protein:18, carbs:34, fat:14, fiber:2, gi:"medium", micro:{iron:1.5,calcium:20,vitC:3,vitB12:1.5,folate:10}, vitamins:["B12","Iron","Protein"], healthScore:5, swap:"Good protein street snack" },
  { id:927, name:"Frankie", category:"Street Food", veg:true, serving:"1 roll", cal:320, protein:8, carbs:38, fat:14, fiber:2, gi:"high", micro:{iron:1,calcium:20,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C"], healthScore:4, swap:"Mumbai wrap — moderate portion" },
  { id:928, name:"Chole Kulche (Street)", category:"Street Food", veg:true, serving:"1 plate", cal:420, protein:12, carbs:54, fat:16, fiber:6, gi:"high", micro:{iron:3,calcium:40,vitC:4,vitB12:0,folate:60}, vitamins:["Iron","Folate","Fiber"], healthScore:4, swap:"Have chole with roti instead" },
  { id:929, name:"Ram Ladoo", category:"Street Food", veg:true, serving:"8 pcs (100g)", cal:220, protein:6, carbs:24, fat:11, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:20}, vitamins:["Iron","Protein","Folate"], healthScore:4, swap:"Moong dal fritters — Delhi street food" },
  { id:930, name:"Jhal Muri", category:"Street Food", veg:true, serving:"1 plate (100g)", cal:180, protein:4, carbs:28, fat:6, fiber:2, gi:"medium", micro:{iron:1.5,calcium:8,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Spicy puffed rice — lighter snack" },
  { id:931, name:"Churmur", category:"Street Food", veg:true, serving:"1 plate (120g)", cal:200, protein:4, carbs:30, fat:7, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:5,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Crushed puri chaat — Kolkata style" },
  { id:932, name:"Telebhaja", category:"Street Food", veg:true, serving:"4 pcs (80g)", cal:240, protein:4, carbs:22, fat:15, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:3,vitB12:0,folate:8}, vitamins:["Iron"], healthScore:3, swap:"Bengali fritters — very oily" },
  { id:933, name:"Ghugni Chaat (Street)", category:"Street Food", veg:true, serving:"1 bowl (150g)", cal:190, protein:8, carbs:26, fat:6, fiber:5, gi:"low", micro:{iron:2.5,calcium:30,vitC:5,vitB12:0,folate:50}, vitamins:["Iron","Folate","Fiber"], healthScore:7, swap:"Spiced peas — good protein snack" },
  { id:934, name:"Kulfi Falooda (Street)", category:"Street Food", veg:true, serving:"1 serving", cal:350, protein:6, carbs:48, fat:14, fiber:1, gi:"high", micro:{iron:0.5,calcium:80,vitC:2,vitB12:0.2,folate:3}, vitamins:["Calcium","B2"], healthScore:2, swap:"Very high cal dessert drink" },
  { id:935, name:"Matar Kulcha (Street)", category:"Street Food", veg:true, serving:"1 plate", cal:380, protein:10, carbs:50, fat:14, fiber:4, gi:"high", micro:{iron:2,calcium:20,vitC:5,vitB12:0,folate:25}, vitamins:["Iron","Vitamin C","Fiber"], healthScore:4, swap:"Have matar with roti → lighter" },
  { id:936, name:"Bread Pakoda (Street)", category:"Street Food", veg:true, serving:"2 pcs", cal:320, protein:6, carbs:32, fat:18, fiber:1, gi:"high", micro:{iron:1,calcium:10,vitC:1,vitB12:0,folate:8}, vitamins:["Iron"], healthScore:2, swap:"Very oily — avoid regularly" },
  { id:937, name:"Rabdi Jalebi (Street)", category:"Street Food", veg:true, serving:"1 plate", cal:450, protein:6, carbs:60, fat:20, fiber:0, gi:"high", micro:{iron:1,calcium:50,vitC:0,vitB12:0.2,folate:5}, vitamins:["Calcium","Iron"], healthScore:2, swap:"Jalebi + cream — festival indulgence" },
  { id:938, name:"Momos (Street Veg Fried)", category:"Street Food", veg:true, serving:"6 pcs", cal:340, protein:5, carbs:32, fat:20, fiber:2, gi:"high", micro:{iron:1,calcium:10,vitC:3,vitB12:0,folate:6}, vitamins:["Iron"], healthScore:3, swap:"Have steamed momos → Save 160 cal" },
  { id:939, name:"Aloo Tikki (Street)", category:"Street Food", veg:true, serving:"2 pcs (120g)", cal:260, protein:4, carbs:30, fat:14, fiber:2, gi:"high", micro:{iron:0.8,calcium:10,vitC:8,vitB12:0,folate:8}, vitamins:["Potassium","Vitamin C"], healthScore:4, swap:"Bake instead of fry → Save 60 cal" },
  { id:940, name:"Chaat (Mixed Fruit)", category:"Street Food", veg:true, serving:"1 bowl (200g)", cal:120, protein:2, carbs:28, fat:1, fiber:4, gi:"low", micro:{iron:0.5,calcium:15,vitC:30,vitB12:0,folate:15}, vitamins:["Vitamin C","Fiber","Potassium"], healthScore:8, swap:"Healthy — fruits with chaat masala" },
  { id:941, name:"Kachori Chaat (Street)", category:"Street Food", veg:true, serving:"2 pcs + toppings", cal:350, protein:6, carbs:38, fat:18, fiber:3, gi:"high", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:12}, vitamins:["Iron","Vitamin C"], healthScore:3, swap:"Heavy — eat occasionally" },
  { id:942, name:"Veg Cutlet", category:"Street Food", veg:true, serving:"2 pcs (100g)", cal:220, protein:4, carbs:24, fat:12, fiber:3, gi:"medium", micro:{iron:1,calcium:15,vitC:6,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C","Fiber"], healthScore:5, swap:"Bake cutlets → Save 50 cal" },
  { id:943, name:"Samosa Chaat", category:"Street Food", veg:true, serving:"1 plate", cal:350, protein:6, carbs:38, fat:18, fiber:3, gi:"high", micro:{iron:1,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C","Potassium"], healthScore:3, swap:"Samosa crushed with chutneys — heavy" },
  { id:944, name:"Tandoori Momos", category:"Street Food", veg:true, serving:"6 pcs", cal:240, protein:6, carbs:28, fat:11, fiber:2, gi:"medium", micro:{iron:1,calcium:10,vitC:3,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Grilled — better than fried momos" },
  { id:945, name:"Pav Bhaji (Street)", category:"Street Food", veg:true, serving:"1 plate", cal:420, protein:10, carbs:52, fat:18, fiber:4, gi:"high", micro:{iron:2,calcium:25,vitC:12,vitB12:0,folate:15}, vitamins:["Vitamin C","Iron","Vitamin A"], healthScore:4, swap:"Skip extra butter on pav" },

  // ── Extra Dals (946–965) ────────────────────────────────────────────────
  { id:946, name:"Kulthi Dal (Horse Gram)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:24, fat:2, fiber:5, gi:"low", micro:{iron:3,calcium:35,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","Calcium"], healthScore:9, swap:"Medicinal dal — great for kidneys" },
  { id:947, name:"Lobia (Black-eyed Peas)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:200, protein:10, carbs:30, fat:4, fiber:6, gi:"low", micro:{iron:3,calcium:30,vitC:3,vitB12:0,folate:70}, vitamins:["Folate","Iron","Fiber"], healthScore:9, swap:"High fiber legume — excellent" },
  { id:948, name:"Moth Dal (Matki)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:26, fat:3, fiber:5, gi:"low", micro:{iron:3,calcium:30,vitC:3,vitB12:0,folate:60}, vitamins:["Iron","Folate","Protein"], healthScore:9, swap:"Sprouted is even more nutritious" },
  { id:949, name:"Rajma Dal (Kidney Bean)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:220, protein:11, carbs:32, fat:5, fiber:7, gi:"low", micro:{iron:3,calcium:50,vitC:3,vitB12:0,folate:70}, vitamins:["Iron","Folate","Fiber","Potassium"], healthScore:8, swap:"Already healthy — great protein + fiber" },
  { id:950, name:"Mixed Dal Tadka", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:24, fat:5, fiber:5, gi:"low", micro:{iron:2.5,calcium:35,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","B6"], healthScore:8, swap:"Multiple lentils — balanced nutrition" },
  { id:951, name:"Sambar Dal (Tiffin Style)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:130, protein:6, carbs:18, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:10,vitB12:0,folate:40}, vitamins:["Iron","Folate","Vitamin C"], healthScore:9, swap:"Dal + veggies — complete nutrition" },
  { id:952, name:"Dhaba Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:220, protein:10, carbs:26, fat:8, fiber:5, gi:"low", micro:{iron:2.5,calcium:40,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","B6"], healthScore:7, swap:"Rich highway dal — use less butter" },
  { id:953, name:"Gojju (Karnataka Dal)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:150, protein:6, carbs:20, fat:4, fiber:3, gi:"low", micro:{iron:1.5,calcium:25,vitC:8,vitB12:0,folate:30}, vitamins:["Iron","Vitamin C","Folate"], healthScore:8, swap:"Tangy dal — South Indian style" },
  { id:954, name:"Sindhi Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:8, carbs:24, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:5,vitB12:0,folate:45}, vitamins:["Iron","Folate","Vitamin C"], healthScore:8, swap:"Sweet-sour lentil — Sindhi specialty" },
  { id:955, name:"Tomato Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:160, protein:8, carbs:22, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:25,vitC:12,vitB12:0,folate:48}, vitamins:["Lycopene","Iron","Folate"], healthScore:8, swap:"Tangy tomato lentil — everyday staple" },
  { id:956, name:"Lauki Chana Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:160, protein:8, carbs:22, fat:3, fiber:5, gi:"low", micro:{iron:2,calcium:30,vitC:8,vitB12:0,folate:50}, vitamins:["Iron","Folate","Vitamin C"], healthScore:9, swap:"Bottle gourd + dal — very healthy" },
  { id:957, name:"Palak Dal (Spinach Lentil)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:10, carbs:22, fat:4, fiber:5, gi:"low", micro:{iron:3.5,calcium:80,vitC:10,vitB12:0,folate:60}, vitamins:["Iron","Calcium","Folate","Vitamin A"], healthScore:9, swap:"Dal + greens — iron powerhouse" },
  { id:958, name:"Amti Dal (Maharashtrian)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:170, protein:9, carbs:24, fat:4, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:3,vitB12:0,folate:50}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Kokum-flavored — tangy lentil" },
  { id:959, name:"Tadka Moong Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:160, protein:10, carbs:22, fat:3, fiber:4, gi:"low", micro:{iron:2,calcium:30,vitC:2,vitB12:0,folate:55}, vitamins:["Iron","Folate","B6"], healthScore:9, swap:"Most digestible dal — light" },
  { id:960, name:"Valache Birde", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:180, protein:8, carbs:26, fat:4, fiber:5, gi:"low", micro:{iron:2,calcium:25,vitC:5,vitB12:0,folate:45}, vitamins:["Iron","Fiber","Folate"], healthScore:8, swap:"Field beans curry — Maharashtrian" },
  { id:961, name:"Whole Masoor (Brown Lentil)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:190, protein:12, carbs:28, fat:3, fiber:6, gi:"low", micro:{iron:3,calcium:25,vitC:2,vitB12:0,folate:80}, vitamins:["Folate","Iron","Fiber"], healthScore:9, swap:"Whole lentil — more fiber than split" },
  { id:962, name:"Chole Palak Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:190, protein:10, carbs:26, fat:5, fiber:6, gi:"low", micro:{iron:3.5,calcium:70,vitC:8,vitB12:0,folate:65}, vitamins:["Iron","Calcium","Folate"], healthScore:9, swap:"Chickpea + spinach — nutrient bomb" },
  { id:963, name:"Gujarati Toor Dal", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:180, protein:10, carbs:26, fat:4, fiber:5, gi:"low", micro:{iron:2.5,calcium:40,vitC:3,vitB12:0,folate:60}, vitamins:["Iron","Folate","Potassium"], healthScore:8, swap:"Sweet-sour toor dal — Gujarati style" },
  { id:964, name:"Rasam with Lentil", category:"Dals", veg:true, serving:"1 bowl (200ml)", cal:70, protein:3, carbs:10, fat:1, fiber:1, gi:"low", micro:{iron:1,calcium:12,vitC:12,vitB12:0,folate:15}, vitamins:["Vitamin C","Iron","Antioxidants"], healthScore:9, swap:"Thin lentil soup — healing" },
  { id:965, name:"Cholar Dal Niramish (Bengali)", category:"Dals", veg:true, serving:"1 bowl (200g)", cal:200, protein:10, carbs:30, fat:5, fiber:6, gi:"low", micro:{iron:2.8,calcium:45,vitC:2,vitB12:0,folate:65}, vitamins:["Iron","Folate","Fiber"], healthScore:8, swap:"Bengali chana dal with coconut" },

  // ── Extra Rice/Breads (966–985) ─────────────────────────────────────────
  { id:966, name:"Hyderabadi Veg Biryani", category:"Rice/Breads", veg:true, serving:"1 plate (300g)", cal:350, protein:7, carbs:50, fat:12, fiber:3, gi:"medium", micro:{iron:1.5,calcium:20,vitC:5,vitB12:0,folate:12}, vitamins:["Iron","Vitamin A","B vitamins"], healthScore:5, swap:"Lighter than non-veg biryani" },
  { id:967, name:"Thalassery Biryani", category:"Rice/Breads", veg:false, serving:"1 plate (350g)", cal:470, protein:22, carbs:54, fat:18, fiber:2, gi:"medium", micro:{iron:1.8,calcium:22,vitC:2,vitB12:2,folate:12}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Kerala style — short grain rice" },
  { id:968, name:"Ambur Biryani", category:"Rice/Breads", veg:false, serving:"1 plate (350g)", cal:450, protein:22, carbs:52, fat:16, fiber:2, gi:"medium", micro:{iron:1.5,calcium:20,vitC:2,vitB12:1.8,folate:12}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Tamil Nadu style — less spicy" },
  { id:969, name:"Dindigul Biryani", category:"Rice/Breads", veg:false, serving:"1 plate (300g)", cal:420, protein:20, carbs:48, fat:16, fiber:2, gi:"medium", micro:{iron:1.5,calcium:18,vitC:3,vitB12:1.8,folate:10}, vitamins:["B12","Iron","B6"], healthScore:5, swap:"Cube meat + seeraga samba rice" },
  { id:970, name:"Kashmiri Pulao", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:300, protein:5, carbs:46, fat:10, fiber:2, gi:"high", micro:{iron:1.5,calcium:20,vitC:2,vitB12:0,folate:8}, vitamins:["Iron","Vitamin E"], healthScore:5, swap:"Aromatic dry fruit rice" },
  { id:971, name:"Egg Fried Rice", category:"Rice/Breads", veg:false, serving:"1 plate (250g)", cal:360, protein:12, carbs:48, fat:14, fiber:2, gi:"high", micro:{iron:1.5,calcium:25,vitC:3,vitB12:0.8,folate:15}, vitamins:["B12","Iron","Protein"], healthScore:4, swap:"Use brown rice → gain fiber" },
  { id:972, name:"Rumali Roti", category:"Rice/Breads", veg:true, serving:"1 pc (40g)", cal:80, protein:2, carbs:16, fat:1, fiber:1, gi:"high", micro:{iron:0.8,calcium:8,vitC:0,vitB12:0,folate:6}, vitamins:["Iron","B vitamins"], healthScore:5, swap:"Thin handkerchief bread — light" },
  { id:973, name:"Laccha Paratha", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:260, protein:4, carbs:30, fat:14, fiber:1, gi:"high", micro:{iron:1,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Flaky layered bread — lots of ghee" },
  { id:974, name:"Garlic Naan", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:270, protein:7, carbs:40, fat:8, fiber:2, gi:"high", micro:{iron:1.5,calcium:18,vitC:1,vitB12:0,folate:15}, vitamins:["B vitamins","Allicin"], healthScore:4, swap:"Have tandoori roti → Save 170 cal" },
  { id:975, name:"Cheese Naan", category:"Rice/Breads", veg:true, serving:"1 pc (100g)", cal:340, protein:10, carbs:40, fat:14, fiber:1, gi:"high", micro:{iron:1.5,calcium:100,vitC:0,vitB12:0.3,folate:12}, vitamins:["Calcium","B vitamins"], healthScore:3, swap:"Very heavy — share with someone" },
  { id:976, name:"Stuffed Kulcha", category:"Rice/Breads", veg:true, serving:"1 pc (100g)", cal:280, protein:7, carbs:36, fat:12, fiber:2, gi:"high", micro:{iron:1.5,calcium:18,vitC:3,vitB12:0,folate:12}, vitamins:["Iron","B vitamins"], healthScore:4, swap:"Amritsari — stuffed bread" },
  { id:977, name:"Lachha Paratha (Frozen Style)", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:240, protein:3, carbs:28, fat:13, fiber:1, gi:"high", micro:{iron:1,calcium:8,vitC:0,vitB12:0,folate:5}, vitamins:["Iron"], healthScore:3, swap:"Processed — make fresh at home" },
  { id:978, name:"Dosa (Plain)", category:"Rice/Breads", veg:true, serving:"1 dosa (80g)", cal:130, protein:3, carbs:22, fat:3, fiber:1, gi:"medium", micro:{iron:1,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:7, swap:"Fermented — good for gut" },
  { id:979, name:"Methi Khakhra", category:"Rice/Breads", veg:true, serving:"2 pcs (40g)", cal:140, protein:4, carbs:20, fat:5, fiber:3, gi:"medium", micro:{iron:2,calcium:15,vitC:2,vitB12:0,folate:15}, vitamins:["Iron","Folate","Fiber"], healthScore:7, swap:"Fenugreek crisp roti — healthy snack" },
  { id:980, name:"Malabar Parotta", category:"Rice/Breads", veg:true, serving:"1 pc (80g)", cal:250, protein:5, carbs:34, fat:10, fiber:1, gi:"high", micro:{iron:1.2,calcium:12,vitC:0,vitB12:0,folate:8}, vitamins:["Iron","B vitamins"], healthScore:3, swap:"Flaky bread — lots of fat" },
  { id:981, name:"Peas Pulao", category:"Rice/Breads", veg:true, serving:"1 plate (200g)", cal:250, protein:6, carbs:40, fat:7, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:8,vitB12:0,folate:25}, vitamins:["Vitamin C","Iron","Fiber"], healthScore:6, swap:"Peas add protein + fiber" },
  { id:982, name:"Mint Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:250, protein:4, carbs:40, fat:7, fiber:2, gi:"high", micro:{iron:1.5,calcium:15,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C"], healthScore:5, swap:"Pudina rice — refreshing flavor" },
  { id:983, name:"Coriander Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (250g)", cal:250, protein:4, carbs:40, fat:7, fiber:2, gi:"high", micro:{iron:1.5,calcium:12,vitC:5,vitB12:0,folate:10}, vitamins:["Iron","Vitamin C","Vitamin K"], healthScore:5, swap:"Dhaniya rice — aromatic" },
  { id:984, name:"Mushroom Biryani", category:"Rice/Breads", veg:true, serving:"1 plate (300g)", cal:320, protein:8, carbs:48, fat:10, fiber:3, gi:"medium", micro:{iron:1.5,calcium:15,vitC:3,vitB12:0,folate:15}, vitamins:["Selenium","B vitamins","Iron"], healthScore:5, swap:"Lighter than meat biryani" },
  { id:985, name:"Bamboo Rice", category:"Rice/Breads", veg:true, serving:"1 bowl (200g)", cal:190, protein:4, carbs:38, fat:2, fiber:3, gi:"medium", micro:{iron:1.5,calcium:10,vitC:2,vitB12:0,folate:10}, vitamins:["Iron","Fiber","B vitamins"], healthScore:7, swap:"Tribal rice — nutty flavor, nutritious" },

  // ── Extra Sides (986–1010) ──────────────────────────────────────────────
  { id:986, name:"Cucumber Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:60, protein:3, carbs:5, fat:3, fiber:1, gi:"low", micro:{iron:0.3,calcium:60,vitC:3,vitB12:0.3,folate:5}, vitamins:["Calcium","Probiotics","Vitamin C"], healthScore:8, swap:"Light and refreshing side" },
  { id:987, name:"Boondi Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:110, protein:3, carbs:12, fat:5, fiber:0, gi:"low", micro:{iron:0.5,calcium:55,vitC:1,vitB12:0.3,folate:5}, vitamins:["Calcium","Probiotics"], healthScore:5, swap:"Skip boondi for plain raita" },
  { id:988, name:"Pineapple Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:80, protein:3, carbs:10, fat:3, fiber:1, gi:"low", micro:{iron:0.3,calcium:55,vitC:10,vitB12:0.3,folate:5}, vitamins:["Vitamin C","Calcium","Probiotics"], healthScore:7, swap:"Fruity side — good with biryani" },
  { id:989, name:"Mint Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:15, protein:0, carbs:2, fat:0, fiber:1, gi:"low", micro:{iron:0.5,calcium:5,vitC:5,vitB12:0,folate:5}, vitamins:["Iron","Vitamin C","Vitamin A"], healthScore:9, swap:"Almost zero-cal — great with anything" },
  { id:990, name:"Tamarind Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:40, protein:0, carbs:10, fat:0, fiber:1, gi:"medium", micro:{iron:0.5,calcium:8,vitC:3,vitB12:0,folate:3}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Sweet-sour — watch the sugar" },
  { id:991, name:"Mango Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:50, protein:0, carbs:12, fat:0, fiber:1, gi:"medium", micro:{iron:0.3,calcium:5,vitC:5,vitB12:0,folate:3}, vitamins:["Vitamin C","Vitamin A"], healthScore:5, swap:"Sweet chutney — limit quantity" },
  { id:992, name:"Garlic Chutney", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:25, protein:0, carbs:3, fat:1, fiber:0, gi:"low", micro:{iron:0.2,calcium:3,vitC:2,vitB12:0,folate:1}, vitamins:["Allicin","Vitamin C"], healthScore:7, swap:"Pungent — antibacterial properties" },
  { id:993, name:"Peanut Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:60, protein:2, carbs:4, fat:4, fiber:1, gi:"low", micro:{iron:0.5,calcium:8,vitC:1,vitB12:0,folate:8}, vitamins:["Protein","Magnesium","B3"], healthScore:7, swap:"Good protein in small amount" },
  { id:994, name:"Kachumber Salad", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:30, protein:1, carbs:6, fat:0, fiber:2, gi:"low", micro:{iron:0.3,calcium:15,vitC:15,vitB12:0,folate:10}, vitamins:["Vitamin C","Fiber","Vitamin A"], healthScore:10, swap:"Perfect zero-fat salad!" },
  { id:995, name:"Carrot Cucumber Salad", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:25, protein:1, carbs:5, fat:0, fiber:2, gi:"low", micro:{iron:0.3,calcium:15,vitC:8,vitB12:0,folate:10}, vitamins:["Vitamin A","Vitamin C","Fiber"], healthScore:10, swap:"Colorful raw salad — excellent" },
  { id:996, name:"Beetroot Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:70, protein:3, carbs:8, fat:3, fiber:1, gi:"low", micro:{iron:0.5,calcium:55,vitC:3,vitB12:0.3,folate:15}, vitamins:["Folate","Iron","Calcium"], healthScore:8, swap:"Beetroot adds iron + color" },
  { id:997, name:"Fried Papad", category:"Sides", veg:true, serving:"1 pc", cal:70, protein:2, carbs:6, fat:4, fiber:1, gi:"low", micro:{iron:0.8,calcium:10,vitC:0,vitB12:0,folate:8}, vitamins:["Iron"], healthScore:4, swap:"Roast instead → Save 30 cal" },
  { id:998, name:"Masala Papad", category:"Sides", veg:true, serving:"1 pc", cal:60, protein:2, carbs:7, fat:3, fiber:1, gi:"low", micro:{iron:0.8,calcium:10,vitC:3,vitB12:0,folate:8}, vitamins:["Iron","Vitamin C"], healthScore:6, swap:"Roasted papad with onion-tomato topping" },
  { id:999, name:"Lemon Pickle", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:25, protein:0, carbs:3, fat:1, fiber:0, gi:"low", micro:{iron:0.2,calcium:5,vitC:8,vitB12:0,folate:1}, vitamins:["Vitamin C"], healthScore:5, swap:"Tangy — high sodium, limit amount" },
  { id:1000, name:"Mixed Pickle", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:30, protein:0, carbs:2, fat:2, fiber:0, gi:"low", micro:{iron:0.3,calcium:5,vitC:3,vitB12:0,folate:1}, vitamins:["Vitamin C"], healthScore:4, swap:"Flavorful — but high sodium" },
  { id:1001, name:"Curd (Set Dahi)", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:60, protein:4, carbs:5, fat:3, fiber:0, gi:"low", micro:{iron:0.2,calcium:80,vitC:1,vitB12:0.5,folate:5}, vitamins:["Calcium","B12","Probiotics"], healthScore:8, swap:"Essential side — aids digestion" },
  { id:1002, name:"Sprouted Moong Salad", category:"Sides", veg:true, serving:"1 bowl (150g)", cal:120, protein:8, carbs:16, fat:1, fiber:5, gi:"low", micro:{iron:2.5,calcium:25,vitC:15,vitB12:0,folate:60}, vitamins:["Iron","Folate","Vitamin C"], healthScore:10, swap:"Superfood salad — no swap needed!" },
  { id:1003, name:"Onion Tomato Chutney", category:"Sides", veg:true, serving:"2 tbsp (30g)", cal:30, protein:1, carbs:5, fat:1, fiber:1, gi:"low", micro:{iron:0.3,calcium:5,vitC:8,vitB12:0,folate:5}, vitamins:["Lycopene","Vitamin C"], healthScore:7, swap:"Great low-cal accompaniment" },
  { id:1004, name:"Mango Pickle (Aachar)", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:35, protein:0, carbs:2, fat:3, fiber:0, gi:"low", micro:{iron:0.3,calcium:5,vitC:3,vitB12:0,folate:1}, vitamins:["Vitamin C"], healthScore:4, swap:"High sodium — use sparingly" },
  { id:1005, name:"Tomato Onion Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:65, protein:3, carbs:6, fat:3, fiber:1, gi:"low", micro:{iron:0.3,calcium:55,vitC:6,vitB12:0.3,folate:8}, vitamins:["Calcium","Lycopene","Probiotics"], healthScore:7, swap:"Tangy side — good with biryani" },
  { id:1006, name:"Pomegranate Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:80, protein:3, carbs:10, fat:3, fiber:1, gi:"low", micro:{iron:0.5,calcium:55,vitC:5,vitB12:0.3,folate:8}, vitamins:["Antioxidants","Calcium","Iron"], healthScore:7, swap:"Fruit raita — festive side dish" },
  { id:1007, name:"Cabbage Salad (Coleslaw)", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:40, protein:1, carbs:6, fat:1, fiber:2, gi:"low", micro:{iron:0.3,calcium:25,vitC:15,vitB12:0,folate:15}, vitamins:["Vitamin C","Vitamin K","Fiber"], healthScore:9, swap:"Skip mayo for Indian style" },
  { id:1008, name:"Aloo Raita", category:"Sides", veg:true, serving:"1 bowl (100g)", cal:90, protein:3, carbs:12, fat:3, fiber:1, gi:"medium", micro:{iron:0.3,calcium:55,vitC:5,vitB12:0.3,folate:5}, vitamins:["Calcium","Potassium","Probiotics"], healthScore:5, swap:"Heavier raita — choose cucumber instead" },
  { id:1009, name:"Ginger Lemon Pickle", category:"Sides", veg:true, serving:"1 tbsp (15g)", cal:20, protein:0, carbs:3, fat:0, fiber:0, gi:"low", micro:{iron:0.2,calcium:3,vitC:5,vitB12:0,folate:1}, vitamins:["Vitamin C","Gingerol"], healthScore:7, swap:"Anti-inflammatory — good with meals" },
  { id:1010, name:"Chana Chaat Salad", category:"Sides", veg:true, serving:"1 bowl (150g)", cal:140, protein:7, carbs:20, fat:3, fiber:5, gi:"low", micro:{iron:2,calcium:25,vitC:8,vitB12:0,folate:40}, vitamins:["Iron","Folate","Fiber","Vitamin C"], healthScore:8, swap:"Protein-rich salad — great side" },
];

// ─── Combo Meals Database ────────────────────────────────────────────────
const comboMeals = [
  // ── Everyday North Indian ──
  { id: "combo_1", name: "Dal-Chawal Classic", desc: "Toor dal + white rice + salad", dishIds: [137, 71, 192], mealType: "lunch", region: "North Indian", veg: true },
  { id: "combo_2", name: "Rajma-Chawal", desc: "Rajma curry + white rice + onion salad + dahi", dishIds: [2, 71, 192, 200], mealType: "lunch", region: "North Indian", veg: true },
  { id: "combo_3", name: "Chole-Roti", desc: "Chole + 2 roti + onion salad", dishIds: [3, 76, 76, 192], mealType: "lunch", region: "North Indian", veg: true },
  { id: "combo_4", name: "Paneer Thali", desc: "Palak paneer + 2 roti + dal + rice + salad", dishIds: [5, 76, 76, 13, 71, 193], mealType: "lunch", region: "North Indian", veg: true },
  { id: "combo_5", name: "Non-Veg Thali", desc: "Chicken curry + 2 roti + dal + rice + salad", dishIds: [170, 76, 76, 13, 71, 193], mealType: "lunch", region: "North Indian", veg: false },

  // ── South Indian ──
  { id: "combo_6", name: "Idli-Sambar Plate", desc: "3 idli + sambar + coconut chutney", dishIds: [36, 38, 51], mealType: "breakfast", region: "South Indian", veg: true },
  { id: "combo_7", name: "Dosa Combo", desc: "Masala dosa + sambar + coconut chutney", dishIds: [35, 38, 51], mealType: "breakfast", region: "South Indian", veg: true },
  { id: "combo_8", name: "South Indian Meals", desc: "Sambar rice + rasam + thoran + curd rice + papad", dishIds: [229, 39, 46, 48, 195], mealType: "lunch", region: "South Indian", veg: true },

  // ── Breakfast Combos ──
  { id: "combo_9", name: "Paratha Breakfast", desc: "Aloo paratha + dahi + pickle", dishIds: [56, 200, 194], mealType: "breakfast", region: "North Indian", veg: true },
  { id: "combo_10", name: "Healthy Breakfast", desc: "Oats porridge + boiled eggs + green tea", dishIds: [62, 70, 136], mealType: "breakfast", region: "Fusion", veg: false },
  { id: "combo_11", name: "Poha-Chai", desc: "Poha + masala chai", dishIds: [55, 248], mealType: "breakfast", region: "North Indian", veg: true },
  { id: "combo_12", name: "Besan Chilla Plate", desc: "2 besan chilla + mint chutney + chai", dishIds: [63, 298, 121], mealType: "breakfast", region: "North Indian", veg: true },

  // ── Light / Diet Meals ──
  { id: "combo_13", name: "Diet Lunch", desc: "Moong dal + brown rice + mixed raita", dishIds: [138, 72, 191], mealType: "lunch", region: "North Indian", veg: true },
  { id: "combo_14", name: "Protein Plate (Non-Veg)", desc: "Chicken tikka + green salad + buttermilk", dishIds: [22, 193, 126], mealType: "lunch", region: "North Indian", veg: false },
  { id: "combo_15", name: "Protein Plate (Veg)", desc: "Paneer tikka + sprout salad + buttermilk", dishIds: [147, 231, 126], mealType: "lunch", region: "North Indian", veg: true },

  // ── Dinner ──
  { id: "combo_16", name: "Light Dinner", desc: "Khichdi + dahi + papad", dishIds: [176, 200, 195], mealType: "dinner", region: "North Indian", veg: true },
  { id: "combo_17", name: "Fish Dinner", desc: "Fish curry + white rice + mixed veg raita", dishIds: [24, 71, 191], mealType: "dinner", region: "Coastal", veg: false },
  { id: "combo_18", name: "Roti-Sabzi Dinner", desc: "Mixed veg + 2 roti + dal tadka + salad", dishIds: [14, 76, 76, 142, 193], mealType: "dinner", region: "North Indian", veg: true },

  // ── Heavy / Weekend ──
  { id: "combo_19", name: "Biryani Feast", desc: "Chicken biryani + raita + salad", dishIds: [28, 190, 192], mealType: "lunch", region: "Hyderabadi", veg: false },
  { id: "combo_20", name: "Chole Bhature", desc: "Chole bhature + lassi", dishIds: [151, 124], mealType: "lunch", region: "North Indian", veg: true },

  // ── Diabetic-Friendly ──
  { id: "combo_21", name: "Diabetic Lunch", desc: "Chana dal + bajra roti + baingan bharta + salad", dishIds: [140, 85, 10, 193], mealType: "lunch", region: "North Indian", veg: true },
  { id: "combo_22", name: "Diabetic Breakfast", desc: "Moong dal chilla + mint chutney + green tea", dishIds: [64, 298, 136], mealType: "breakfast", region: "North Indian", veg: true },

  // ── Regional ──
  { id: "combo_23", name: "Bengali Fish Meal", desc: "Fish curry + white rice + dal + salad", dishIds: [24, 71, 138, 193], mealType: "lunch", region: "Bengali", veg: false },
  { id: "combo_24", name: "Gujarati Thali", desc: "Dal + roti + undhiyu + dhokla + buttermilk", dishIds: [13, 76, 161, 67, 126], mealType: "lunch", region: "Gujarati", veg: true },
  { id: "combo_25", name: "Punjabi Feast", desc: "Butter chicken + naan + dal makhani + lassi", dishIds: [21, 77, 1, 124], mealType: "dinner", region: "Punjabi", veg: false },
];

// ─── RDA (Recommended Daily Allowance) — ICMR 2020 for Indian adults ─────
const RDA = {
  cal: { male: 2320, female: 1900, unit: 'kcal' },
  protein: { male: 54, female: 46, unit: 'g' },
  carbs: { male: 300, female: 250, unit: 'g' },
  fat: { male: 65, female: 55, unit: 'g' },
  fiber: { male: 38, female: 25, unit: 'g' },
  iron: { male: 17, female: 21, unit: 'mg' },
  calcium: { male: 1000, female: 1000, unit: 'mg' },
  zinc: { male: 12, female: 10, unit: 'mg' },
  magnesium: { male: 340, female: 310, unit: 'mg' },
  phosphorus: { male: 700, female: 700, unit: 'mg' },
  potassium: { male: 3500, female: 3500, unit: 'mg' },
  sodium: { male: 2000, female: 2000, unit: 'mg' },
  selenium: { male: 40, female: 40, unit: 'mcg' },
  copper: { male: 2, female: 2, unit: 'mg' },
  manganese: { male: 5, female: 5, unit: 'mg' },
  vitA: { male: 1000, female: 840, unit: 'mcg' },
  vitB1: { male: 1.4, female: 1.1, unit: 'mg' },
  vitB2: { male: 1.7, female: 1.3, unit: 'mg' },
  vitB3: { male: 16, female: 14, unit: 'mg' },
  vitB5: { male: 5, female: 5, unit: 'mg' },
  vitB6: { male: 2, female: 2, unit: 'mg' },
  vitB12: { male: 2.2, female: 2.2, unit: 'mcg' },
  vitC: { male: 80, female: 65, unit: 'mg' },
  vitD: { male: 15, female: 15, unit: 'mcg' },
  vitE: { male: 10, female: 8, unit: 'mg' },
  vitK: { male: 55, female: 55, unit: 'mcg' },
  folate: { male: 300, female: 300, unit: 'mcg' },
  omega3: { male: 1600, female: 1100, unit: 'mg' },
  cholesterol: { male: 300, female: 300, unit: 'mg' },
  sugar: { male: 30, female: 25, unit: 'g' },
};

// Helper: get RDA value for a nutrient (default to male)
function getRDAValue(nutrient, gender) {
  const r = RDA[nutrient];
  if (!r) return 0;
  if (typeof r === 'number') return r;
  return r[gender || 'male'] || r.male || 0;
}

// ─── Nutrient Estimator — fills missing micronutrients for all dishes ────
const ALL_MICRO_FIELDS = ['iron','calcium','zinc','magnesium','phosphorus','potassium','sodium','selenium','copper','manganese','vitA','vitB1','vitB2','vitB3','vitB5','vitB6','vitB12','vitC','vitD','vitE','vitK','folate','omega3','cholesterol','sugar'];

const categoryDefaults = {
  'North Indian': { zinc: 1.2, magnesium: 30, phosphorus: 120, potassium: 250, sodium: 450, selenium: 3, copper: 0.15, manganese: 0.4, vitA: 40, vitB1: 0.1, vitB2: 0.08, vitB3: 1.2, vitB5: 0.4, vitB6: 0.12, vitD: 0, vitE: 0.8, vitK: 8, omega3: 30, cholesterol: 0, sugar: 3 },
  'South Indian': { zinc: 1.0, magnesium: 25, phosphorus: 100, potassium: 200, sodium: 350, selenium: 4, copper: 0.12, manganese: 0.5, vitA: 20, vitB1: 0.08, vitB2: 0.06, vitB3: 1.0, vitB5: 0.35, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 5, omega3: 20, cholesterol: 0, sugar: 2 },
  'Non-Veg': { zinc: 2.5, magnesium: 25, phosphorus: 180, potassium: 280, sodium: 500, selenium: 15, copper: 0.1, manganese: 0.2, vitA: 30, vitB1: 0.08, vitB2: 0.15, vitB3: 4, vitB5: 0.8, vitB6: 0.3, vitD: 0.5, vitE: 0.5, vitK: 2, omega3: 50, cholesterol: 60, sugar: 1 },
  'Breakfast': { zinc: 1.0, magnesium: 25, phosphorus: 100, potassium: 180, sodium: 350, selenium: 5, copper: 0.1, manganese: 0.4, vitA: 20, vitB1: 0.1, vitB2: 0.08, vitB3: 1.2, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.6, vitK: 3, omega3: 15, cholesterol: 0, sugar: 2 },
  'Rice/Breads': { zinc: 0.8, magnesium: 20, phosphorus: 80, potassium: 100, sodium: 300, selenium: 6, copper: 0.08, manganese: 0.6, vitA: 0, vitB1: 0.1, vitB2: 0.04, vitB3: 1.0, vitB5: 0.2, vitB6: 0.06, vitD: 0, vitE: 0.3, vitK: 1, omega3: 10, cholesterol: 0, sugar: 1 },
  'Dals': { zinc: 1.5, magnesium: 40, phosphorus: 150, potassium: 300, sodium: 400, selenium: 4, copper: 0.2, manganese: 0.5, vitA: 10, vitB1: 0.15, vitB2: 0.08, vitB3: 1.5, vitB5: 0.5, vitB6: 0.15, vitD: 0, vitE: 0.3, vitK: 5, omega3: 20, cholesterol: 0, sugar: 2 },
  'Snacks': { zinc: 0.8, magnesium: 15, phosphorus: 70, potassium: 120, sodium: 400, selenium: 3, copper: 0.08, manganese: 0.3, vitA: 10, vitB1: 0.06, vitB2: 0.04, vitB3: 0.8, vitB5: 0.2, vitB6: 0.06, vitD: 0, vitE: 0.5, vitK: 2, omega3: 10, cholesterol: 5, sugar: 3 },
  'Sweets': { zinc: 0.5, magnesium: 15, phosphorus: 60, potassium: 80, sodium: 50, selenium: 2, copper: 0.05, manganese: 0.2, vitA: 20, vitB1: 0.03, vitB2: 0.06, vitB3: 0.3, vitB5: 0.15, vitB6: 0.03, vitD: 0, vitE: 0.3, vitK: 1, omega3: 5, cholesterol: 10, sugar: 18 },
  'Drinks': { zinc: 0.3, magnesium: 12, phosphorus: 40, potassium: 150, sodium: 30, selenium: 1, copper: 0.03, manganese: 0.1, vitA: 10, vitB1: 0.03, vitB2: 0.06, vitB3: 0.2, vitB5: 0.1, vitB6: 0.03, vitD: 0, vitE: 0.2, vitK: 1, omega3: 5, cholesterol: 0, sugar: 8 },
  'Sides': { zinc: 0.5, magnesium: 10, phosphorus: 40, potassium: 80, sodium: 200, selenium: 1, copper: 0.05, manganese: 0.2, vitA: 15, vitB1: 0.03, vitB2: 0.03, vitB3: 0.3, vitB5: 0.1, vitB6: 0.03, vitD: 0, vitE: 0.3, vitK: 3, omega3: 5, cholesterol: 0, sugar: 2 },
  'Street Food': { zinc: 0.8, magnesium: 15, phosphorus: 60, potassium: 130, sodium: 500, selenium: 3, copper: 0.08, manganese: 0.3, vitA: 10, vitB1: 0.05, vitB2: 0.04, vitB3: 0.7, vitB5: 0.2, vitB6: 0.06, vitD: 0, vitE: 0.4, vitK: 2, omega3: 10, cholesterol: 5, sugar: 5 },
  'Bengali': { zinc: 1.2, magnesium: 28, phosphorus: 110, potassium: 230, sodium: 400, selenium: 5, copper: 0.12, manganese: 0.4, vitA: 30, vitB1: 0.08, vitB2: 0.07, vitB3: 1.2, vitB5: 0.35, vitB6: 0.1, vitD: 0.3, vitE: 0.6, vitK: 5, omega3: 80, cholesterol: 15, sugar: 4 },
  'Kerala': { zinc: 1.0, magnesium: 30, phosphorus: 100, potassium: 250, sodium: 350, selenium: 4, copper: 0.12, manganese: 0.5, vitA: 25, vitB1: 0.08, vitB2: 0.06, vitB3: 1.0, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.6, vitK: 5, omega3: 60, cholesterol: 5, sugar: 4 },
  'Tamil Nadu': { zinc: 1.0, magnesium: 25, phosphorus: 95, potassium: 200, sodium: 360, selenium: 4, copper: 0.1, manganese: 0.5, vitA: 20, vitB1: 0.08, vitB2: 0.06, vitB3: 1.0, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 4, omega3: 20, cholesterol: 0, sugar: 3 },
  'Maharashtrian': { zinc: 1.2, magnesium: 28, phosphorus: 110, potassium: 220, sodium: 400, selenium: 4, copper: 0.12, manganese: 0.4, vitA: 25, vitB1: 0.08, vitB2: 0.06, vitB3: 1.1, vitB5: 0.35, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 5, omega3: 25, cholesterol: 5, sugar: 4 },
  'Gujarati': { zinc: 1.0, magnesium: 25, phosphorus: 100, potassium: 200, sodium: 350, selenium: 3, copper: 0.1, manganese: 0.4, vitA: 25, vitB1: 0.08, vitB2: 0.06, vitB3: 1.0, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 4, omega3: 20, cholesterol: 0, sugar: 6 },
  'Andhra': { zinc: 1.1, magnesium: 25, phosphorus: 100, potassium: 210, sodium: 420, selenium: 4, copper: 0.1, manganese: 0.4, vitA: 30, vitB1: 0.08, vitB2: 0.06, vitB3: 1.1, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.6, vitK: 5, omega3: 20, cholesterol: 5, sugar: 3 },
  'Rajasthani': { zinc: 1.0, magnesium: 25, phosphorus: 100, potassium: 180, sodium: 450, selenium: 3, copper: 0.1, manganese: 0.3, vitA: 30, vitB1: 0.08, vitB2: 0.07, vitB3: 1.0, vitB5: 0.3, vitB6: 0.08, vitD: 0, vitE: 0.6, vitK: 4, omega3: 15, cholesterol: 5, sugar: 4 },
  'Kashmiri': { zinc: 1.3, magnesium: 28, phosphorus: 130, potassium: 250, sodium: 450, selenium: 5, copper: 0.12, manganese: 0.3, vitA: 40, vitB1: 0.08, vitB2: 0.1, vitB3: 1.5, vitB5: 0.4, vitB6: 0.12, vitD: 0.3, vitE: 0.7, vitK: 5, omega3: 40, cholesterol: 15, sugar: 3 },
  'Goan': { zinc: 1.2, magnesium: 28, phosphorus: 120, potassium: 240, sodium: 420, selenium: 8, copper: 0.12, manganese: 0.4, vitA: 25, vitB1: 0.08, vitB2: 0.08, vitB3: 1.3, vitB5: 0.35, vitB6: 0.12, vitD: 0.5, vitE: 0.6, vitK: 4, omega3: 100, cholesterol: 20, sugar: 4 },
  'Punjabi': { zinc: 1.3, magnesium: 30, phosphorus: 130, potassium: 260, sodium: 480, selenium: 4, copper: 0.15, manganese: 0.4, vitA: 40, vitB1: 0.1, vitB2: 0.08, vitB3: 1.3, vitB5: 0.4, vitB6: 0.12, vitD: 0.2, vitE: 0.7, vitK: 6, omega3: 30, cholesterol: 10, sugar: 3 },
  'Odisha': { zinc: 1.0, magnesium: 25, phosphorus: 100, potassium: 200, sodium: 370, selenium: 4, copper: 0.1, manganese: 0.4, vitA: 20, vitB1: 0.08, vitB2: 0.06, vitB3: 1.0, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 4, omega3: 30, cholesterol: 5, sugar: 4 },
  'Bihari': { zinc: 1.1, magnesium: 28, phosphorus: 110, potassium: 220, sodium: 400, selenium: 4, copper: 0.12, manganese: 0.4, vitA: 20, vitB1: 0.08, vitB2: 0.06, vitB3: 1.1, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 4, omega3: 20, cholesterol: 5, sugar: 4 },
  'Assamese': { zinc: 1.0, magnesium: 25, phosphorus: 100, potassium: 210, sodium: 350, selenium: 3, copper: 0.1, manganese: 0.4, vitA: 25, vitB1: 0.07, vitB2: 0.06, vitB3: 1.0, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 5, omega3: 40, cholesterol: 5, sugar: 3 },
  'Indo-Chinese': { zinc: 1.0, magnesium: 18, phosphorus: 80, potassium: 150, sodium: 650, selenium: 3, copper: 0.08, manganese: 0.3, vitA: 15, vitB1: 0.06, vitB2: 0.05, vitB3: 1.0, vitB5: 0.2, vitB6: 0.08, vitD: 0, vitE: 0.4, vitK: 3, omega3: 10, cholesterol: 5, sugar: 5 },
  'Health Foods': { zinc: 1.5, magnesium: 45, phosphorus: 150, potassium: 300, sodium: 100, selenium: 8, copper: 0.2, manganese: 0.8, vitA: 50, vitB1: 0.12, vitB2: 0.1, vitB3: 1.5, vitB5: 0.5, vitB6: 0.15, vitD: 0, vitE: 1.5, vitK: 10, omega3: 100, cholesterol: 0, sugar: 3 },
  'Continental': { zinc: 1.0, magnesium: 20, phosphorus: 90, potassium: 160, sodium: 450, selenium: 5, copper: 0.08, manganese: 0.3, vitA: 20, vitB1: 0.08, vitB2: 0.06, vitB3: 1.0, vitB5: 0.3, vitB6: 0.1, vitD: 0, vitE: 0.5, vitK: 3, omega3: 15, cholesterol: 10, sugar: 3 },
};

function estimateNutrients(dish) {
  const name = dish.name.toLowerCase();
  const existing = Object.assign({}, dish.micro || {});

  // ── Ingredient-based adjustments (30+ ingredients) ──

  // Dairy
  if (name.includes('paneer') || name.includes('cheese') || name.includes('cottage')) {
    existing.calcium = Math.max(existing.calcium || 0, 180);
    existing.phosphorus = (existing.phosphorus || 0) + 150;
    existing.vitB12 = Math.max(existing.vitB12 || 0, 0.5);
    existing.vitB2 = (existing.vitB2 || 0) + 0.15;
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.cholesterol = (existing.cholesterol || 0) + 20;
    existing.vitD = (existing.vitD || 0) + 0.3;
  }
  if (name.includes('milk') || name.includes('dudh') || name.includes('kheer')) {
    existing.calcium = Math.max(existing.calcium || 0, 150);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 0.5);
    existing.vitD = (existing.vitD || 0) + 0.5;
    existing.phosphorus = (existing.phosphorus || 0) + 100;
    existing.vitB2 = (existing.vitB2 || 0) + 0.2;
    existing.potassium = (existing.potassium || 0) + 150;
  }
  if (name.includes('curd') || name.includes('dahi') || name.includes('raita') || name.includes('lassi') || name.includes('chaas') || name.includes('buttermilk')) {
    existing.calcium = Math.max(existing.calcium || 0, 120);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 0.4);
    existing.phosphorus = (existing.phosphorus || 0) + 90;
    existing.vitB2 = (existing.vitB2 || 0) + 0.15;
    existing.potassium = (existing.potassium || 0) + 120;
    existing.zinc = Math.max(existing.zinc || 0, 0.8);
  }
  if (name.includes('ghee')) {
    existing.vitA = (existing.vitA || 0) + 60;
    existing.vitD = (existing.vitD || 0) + 0.3;
    existing.vitE = (existing.vitE || 0) + 0.5;
    existing.vitK = (existing.vitK || 0) + 3;
    existing.cholesterol = (existing.cholesterol || 0) + 25;
  }
  if (name.includes('butter') && !name.includes('buttermilk')) {
    existing.vitA = (existing.vitA || 0) + 50;
    existing.vitD = (existing.vitD || 0) + 0.2;
    existing.cholesterol = (existing.cholesterol || 0) + 20;
    existing.sodium = (existing.sodium || 0) + 80;
  }
  if (name.includes('cream') || name.includes('malai')) {
    existing.vitA = (existing.vitA || 0) + 40;
    existing.cholesterol = (existing.cholesterol || 0) + 30;
    existing.calcium = Math.max(existing.calcium || 0, 50);
  }

  // Non-veg proteins
  if (name.includes('chicken') || name.includes('murgh') || name.includes('tandoori')) {
    existing.zinc = Math.max(existing.zinc || 0, 2.5);
    existing.phosphorus = Math.max(existing.phosphorus || 0, 200);
    existing.selenium = Math.max(existing.selenium || 0, 20);
    existing.vitB3 = Math.max(existing.vitB3 || 0, 6);
    existing.vitB6 = Math.max(existing.vitB6 || 0, 0.4);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 1.5);
    existing.cholesterol = Math.max(existing.cholesterol || 0, 70);
    existing.potassium = Math.max(existing.potassium || 0, 250);
  }
  if (name.includes('mutton') || name.includes('lamb') || name.includes('gosht') || name.includes('keema') || name.includes('rogan')) {
    existing.zinc = Math.max(existing.zinc || 0, 4);
    existing.iron = Math.max(existing.iron || 0, 2.5);
    existing.phosphorus = Math.max(existing.phosphorus || 0, 180);
    existing.selenium = Math.max(existing.selenium || 0, 18);
    existing.vitB3 = Math.max(existing.vitB3 || 0, 5);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 2.5);
    existing.cholesterol = Math.max(existing.cholesterol || 0, 80);
  }
  if (name.includes('fish') || name.includes('machhi') || name.includes('machli') || name.includes('hilsa') || name.includes('pomfret') || name.includes('rohu') || name.includes('surmai') || name.includes('salmon')) {
    existing.omega3 = Math.max(existing.omega3 || 0, 400);
    existing.selenium = Math.max(existing.selenium || 0, 25);
    existing.vitD = Math.max(existing.vitD || 0, 5);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 3);
    existing.phosphorus = Math.max(existing.phosphorus || 0, 200);
    existing.potassium = Math.max(existing.potassium || 0, 300);
    existing.cholesterol = Math.max(existing.cholesterol || 0, 50);
  }
  if (name.includes('prawn') || name.includes('shrimp') || name.includes('jhinga')) {
    existing.selenium = Math.max(existing.selenium || 0, 30);
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 2);
    existing.omega3 = Math.max(existing.omega3 || 0, 200);
    existing.phosphorus = Math.max(existing.phosphorus || 0, 200);
    existing.cholesterol = Math.max(existing.cholesterol || 0, 150);
  }
  if (name.includes('egg') || name.includes('anda') || name.includes('omelette')) {
    existing.vitD = Math.max(existing.vitD || 0, 2);
    existing.vitB12 = Math.max(existing.vitB12 || 0, 1);
    existing.selenium = Math.max(existing.selenium || 0, 15);
    existing.zinc = Math.max(existing.zinc || 0, 1.2);
    existing.vitA = (existing.vitA || 0) + 80;
    existing.phosphorus = Math.max(existing.phosphorus || 0, 100);
    existing.cholesterol = Math.max(existing.cholesterol || 0, 180);
    existing.vitB2 = Math.max(existing.vitB2 || 0, 0.2);
  }

  // Vegetables & Greens
  if (name.includes('spinach') || name.includes('palak') || name.includes('saag')) {
    existing.vitA = (existing.vitA || 0) + 300;
    existing.vitK = (existing.vitK || 0) + 150;
    existing.iron = Math.max(existing.iron || 0, 3);
    existing.folate = Math.max(existing.folate || 0, 80);
    existing.magnesium = (existing.magnesium || 0) + 40;
    existing.manganese = (existing.manganese || 0) + 0.5;
    existing.vitC = Math.max(existing.vitC || 0, 10);
    existing.vitE = (existing.vitE || 0) + 1;
  }
  if (name.includes('methi') || name.includes('fenugreek')) {
    existing.iron = Math.max(existing.iron || 0, 2.5);
    existing.vitK = (existing.vitK || 0) + 40;
    existing.folate = Math.max(existing.folate || 0, 30);
    existing.manganese = (existing.manganese || 0) + 0.3;
    existing.magnesium = (existing.magnesium || 0) + 20;
    existing.vitA = (existing.vitA || 0) + 50;
  }
  if (name.includes('carrot') || name.includes('gajar')) {
    existing.vitA = (existing.vitA || 0) + 500;
    existing.vitK = (existing.vitK || 0) + 10;
    existing.potassium = (existing.potassium || 0) + 150;
    existing.vitC = Math.max(existing.vitC || 0, 5);
  }
  if (name.includes('potato') || name.includes('aloo')) {
    existing.potassium = (existing.potassium || 0) + 300;
    existing.vitC = Math.max(existing.vitC || 0, 10);
    existing.vitB6 = (existing.vitB6 || 0) + 0.2;
    existing.magnesium = (existing.magnesium || 0) + 20;
    existing.phosphorus = (existing.phosphorus || 0) + 50;
  }
  if (name.includes('tomato') || name.includes('tamatar')) {
    existing.vitC = Math.max(existing.vitC || 0, 8);
    existing.potassium = (existing.potassium || 0) + 120;
    existing.vitA = (existing.vitA || 0) + 40;
    existing.vitK = (existing.vitK || 0) + 5;
  }
  if (name.includes('onion') || name.includes('pyaaz')) {
    existing.vitC = Math.max(existing.vitC || 0, 3);
    existing.potassium = (existing.potassium || 0) + 60;
    existing.folate = (existing.folate || 0) + 8;
    existing.manganese = (existing.manganese || 0) + 0.1;
  }
  if (name.includes('peas') || name.includes('matar')) {
    existing.vitC = Math.max(existing.vitC || 0, 12);
    existing.vitK = (existing.vitK || 0) + 15;
    existing.zinc = Math.max(existing.zinc || 0, 1);
    existing.folate = Math.max(existing.folate || 0, 30);
    existing.phosphorus = (existing.phosphorus || 0) + 50;
    existing.vitB1 = (existing.vitB1 || 0) + 0.1;
  }
  if (name.includes('cauliflower') || name.includes('gobi') || name.includes('gobhi')) {
    existing.vitC = Math.max(existing.vitC || 0, 20);
    existing.vitK = (existing.vitK || 0) + 12;
    existing.folate = Math.max(existing.folate || 0, 30);
    existing.vitB6 = (existing.vitB6 || 0) + 0.1;
  }
  if (name.includes('brinjal') || name.includes('baingan') || name.includes('eggplant')) {
    existing.manganese = (existing.manganese || 0) + 0.2;
    existing.potassium = (existing.potassium || 0) + 120;
    existing.copper = (existing.copper || 0) + 0.05;
    existing.vitB1 = (existing.vitB1 || 0) + 0.04;
  }
  if (name.includes('cabbage') || name.includes('patta gobi')) {
    existing.vitC = Math.max(existing.vitC || 0, 15);
    existing.vitK = (existing.vitK || 0) + 50;
    existing.folate = Math.max(existing.folate || 0, 20);
    existing.manganese = (existing.manganese || 0) + 0.1;
  }

  // Grains & Legumes
  if (name.includes('rice') || name.includes('chawal') || name.includes('biryani') || name.includes('pulao') || name.includes('khichdi')) {
    existing.manganese = (existing.manganese || 0) + 0.6;
    existing.selenium = Math.max(existing.selenium || 0, 8);
    existing.phosphorus = (existing.phosphorus || 0) + 60;
    existing.vitB1 = (existing.vitB1 || 0) + 0.1;
  }
  if (name.includes('wheat') || name.includes('atta') || name.includes('roti') || name.includes('chapati') || name.includes('paratha') || name.includes('naan') || name.includes('kulcha') || name.includes('puri') || name.includes('bhatura')) {
    existing.manganese = (existing.manganese || 0) + 0.8;
    existing.selenium = Math.max(existing.selenium || 0, 10);
    existing.phosphorus = (existing.phosphorus || 0) + 80;
    existing.magnesium = (existing.magnesium || 0) + 25;
    existing.zinc = Math.max(existing.zinc || 0, 1);
    existing.vitB1 = (existing.vitB1 || 0) + 0.12;
    existing.vitB3 = (existing.vitB3 || 0) + 1.2;
  }
  if (name.includes('besan') || name.includes('gram flour') || name.includes('chilla')) {
    existing.folate = Math.max(existing.folate || 0, 40);
    existing.iron = Math.max(existing.iron || 0, 2);
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.magnesium = (existing.magnesium || 0) + 30;
    existing.phosphorus = (existing.phosphorus || 0) + 80;
    existing.vitB6 = (existing.vitB6 || 0) + 0.15;
  }
  if (name.includes('dal') || name.includes('lentil') || name.includes('rajma') || name.includes('chole') || name.includes('chana') || name.includes('moong') || name.includes('masoor') || name.includes('urad') || name.includes('toor') || name.includes('sambar') || name.includes('sambhar')) {
    existing.folate = Math.max(existing.folate || 0, 50);
    existing.iron = Math.max(existing.iron || 0, 2.5);
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.magnesium = (existing.magnesium || 0) + 35;
    existing.phosphorus = (existing.phosphorus || 0) + 100;
    existing.potassium = (existing.potassium || 0) + 250;
    existing.vitB1 = (existing.vitB1 || 0) + 0.15;
    existing.vitB6 = (existing.vitB6 || 0) + 0.12;
    existing.copper = (existing.copper || 0) + 0.15;
    existing.manganese = (existing.manganese || 0) + 0.4;
  }

  // Millets
  if (name.includes('ragi') || name.includes('nachni')) {
    existing.calcium = Math.max(existing.calcium || 0, 200);
    existing.iron = Math.max(existing.iron || 0, 3.5);
    existing.magnesium = (existing.magnesium || 0) + 50;
    existing.phosphorus = (existing.phosphorus || 0) + 120;
    existing.manganese = (existing.manganese || 0) + 1;
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.vitB3 = (existing.vitB3 || 0) + 1;
  }
  if (name.includes('bajra') || name.includes('pearl millet')) {
    existing.iron = Math.max(existing.iron || 0, 3);
    existing.magnesium = (existing.magnesium || 0) + 60;
    existing.phosphorus = (existing.phosphorus || 0) + 140;
    existing.zinc = Math.max(existing.zinc || 0, 2);
    existing.vitB1 = (existing.vitB1 || 0) + 0.15;
    existing.vitB3 = (existing.vitB3 || 0) + 1.5;
  }
  if (name.includes('jowar') || name.includes('sorghum')) {
    existing.iron = Math.max(existing.iron || 0, 2.5);
    existing.magnesium = (existing.magnesium || 0) + 45;
    existing.phosphorus = (existing.phosphorus || 0) + 130;
    existing.manganese = (existing.manganese || 0) + 0.8;
    existing.vitB3 = (existing.vitB3 || 0) + 1.2;
  }

  // Coconut
  if (name.includes('coconut') || name.includes('nariyal') || name.includes('thenga')) {
    existing.manganese = (existing.manganese || 0) + 0.6;
    existing.copper = (existing.copper || 0) + 0.15;
    existing.selenium = Math.max(existing.selenium || 0, 5);
    existing.iron = Math.max(existing.iron || 0, 1);
    existing.magnesium = (existing.magnesium || 0) + 15;
    existing.potassium = (existing.potassium || 0) + 80;
  }

  // Nuts & Seeds
  if (name.includes('cashew') || name.includes('kaju')) {
    existing.magnesium = (existing.magnesium || 0) + 25;
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.copper = (existing.copper || 0) + 0.2;
    existing.phosphorus = (existing.phosphorus || 0) + 50;
    existing.vitK = (existing.vitK || 0) + 5;
    existing.vitE = (existing.vitE || 0) + 0.5;
  }
  if (name.includes('almond') || name.includes('badam')) {
    existing.vitE = (existing.vitE || 0) + 3;
    existing.magnesium = (existing.magnesium || 0) + 40;
    existing.calcium = Math.max(existing.calcium || 0, 40);
    existing.manganese = (existing.manganese || 0) + 0.4;
    existing.copper = (existing.copper || 0) + 0.15;
    existing.phosphorus = (existing.phosphorus || 0) + 60;
  }
  if (name.includes('peanut') || name.includes('mungfali') || name.includes('moongfali')) {
    existing.vitE = (existing.vitE || 0) + 1.5;
    existing.magnesium = (existing.magnesium || 0) + 25;
    existing.zinc = Math.max(existing.zinc || 0, 1);
    existing.vitB3 = (existing.vitB3 || 0) + 2;
    existing.folate = Math.max(existing.folate || 0, 30);
    existing.manganese = (existing.manganese || 0) + 0.3;
  }
  if (name.includes('sesame') || name.includes('til')) {
    existing.calcium = Math.max(existing.calcium || 0, 100);
    existing.iron = Math.max(existing.iron || 0, 2);
    existing.magnesium = (existing.magnesium || 0) + 30;
    existing.zinc = Math.max(existing.zinc || 0, 1.5);
    existing.copper = (existing.copper || 0) + 0.2;
    existing.manganese = (existing.manganese || 0) + 0.4;
    existing.vitB1 = (existing.vitB1 || 0) + 0.1;
  }
  if (name.includes('walnut') || name.includes('akhrot')) {
    existing.omega3 = Math.max(existing.omega3 || 0, 300);
    existing.manganese = (existing.manganese || 0) + 0.5;
    existing.copper = (existing.copper || 0) + 0.2;
    existing.magnesium = (existing.magnesium || 0) + 20;
    existing.vitE = (existing.vitE || 0) + 0.5;
  }

  // Spices & Aromatics
  if (name.includes('turmeric') || name.includes('haldi')) {
    existing.manganese = (existing.manganese || 0) + 0.1;
    existing.iron = Math.max(existing.iron || 0, 0.5);
  }
  if (name.includes('ginger') || name.includes('adrak')) {
    existing.manganese = (existing.manganese || 0) + 0.1;
    existing.potassium = (existing.potassium || 0) + 30;
    existing.magnesium = (existing.magnesium || 0) + 5;
  }
  if (name.includes('garlic') || name.includes('lehsun')) {
    existing.selenium = Math.max(existing.selenium || 0, 2);
    existing.manganese = (existing.manganese || 0) + 0.1;
    existing.vitB6 = (existing.vitB6 || 0) + 0.05;
    existing.vitC = Math.max(existing.vitC || 0, 2);
  }

  // Fruits
  if (name.includes('banana') || name.includes('kela')) {
    existing.potassium = (existing.potassium || 0) + 350;
    existing.vitB6 = (existing.vitB6 || 0) + 0.3;
    existing.magnesium = (existing.magnesium || 0) + 25;
    existing.vitC = Math.max(existing.vitC || 0, 8);
    existing.manganese = (existing.manganese || 0) + 0.3;
    existing.sugar = (existing.sugar || 0) + 8;
  }
  if (name.includes('mango') || name.includes('aam') || name.includes('amras')) {
    existing.vitA = (existing.vitA || 0) + 180;
    existing.vitC = Math.max(existing.vitC || 0, 30);
    existing.folate = Math.max(existing.folate || 0, 30);
    existing.vitE = (existing.vitE || 0) + 0.5;
    existing.sugar = (existing.sugar || 0) + 12;
  }
  if (name.includes('lemon') || name.includes('nimbu') || name.includes('lime')) {
    existing.vitC = Math.max(existing.vitC || 0, 20);
    existing.potassium = (existing.potassium || 0) + 40;
  }
  if (name.includes('pomegranate') || name.includes('anar')) {
    existing.vitK = (existing.vitK || 0) + 12;
    existing.folate = Math.max(existing.folate || 0, 20);
    existing.potassium = (existing.potassium || 0) + 100;
    existing.vitC = Math.max(existing.vitC || 0, 8);
  }

  // Sweeteners
  if (name.includes('jaggery') || name.includes('gur') || name.includes('gud')) {
    existing.iron = Math.max(existing.iron || 0, 2);
    existing.potassium = (existing.potassium || 0) + 80;
    existing.magnesium = (existing.magnesium || 0) + 15;
    existing.calcium = Math.max(existing.calcium || 0, 40);
    existing.sugar = (existing.sugar || 0) + 10;
  }
  if (name.includes('sugar') || name.includes('mithai') || name.includes('sweet')) {
    existing.sugar = Math.max(existing.sugar || 0, 12);
  }

  // Oils
  if (name.includes('oil') || name.includes('fried') || name.includes('fry') || name.includes('pakora') || name.includes('pakoda') || name.includes('bhajia') || name.includes('vada') || name.includes('bonda')) {
    existing.vitE = (existing.vitE || 0) + 1.5;
    existing.vitK = (existing.vitK || 0) + 5;
  }

  // Veg vs Non-veg general adjustments
  if (!dish.veg && existing.cholesterol === undefined) {
    existing.cholesterol = 40;
  }
  if (!dish.veg && existing.vitB12 < 0.5) {
    existing.vitB12 = Math.max(existing.vitB12 || 0, 1);
  }
  if (dish.veg && !name.includes('paneer') && !name.includes('milk') && !name.includes('curd') && !name.includes('dahi') && !name.includes('ghee') && !name.includes('butter') && !name.includes('cheese')) {
    existing.vitB12 = existing.vitB12 || 0;
    existing.vitD = existing.vitD || 0;
  }

  // ── Fill defaults from category ──
  const catKey = dish.category;
  const defaults = categoryDefaults[catKey] || categoryDefaults['North Indian'];
  for (const key in defaults) {
    if (existing[key] === undefined) existing[key] = defaults[key];
  }

  // ── Ensure all fields exist ──
  ALL_MICRO_FIELDS.forEach(f => { if (existing[f] === undefined || existing[f] === null) existing[f] = 0; });

  // Round all values
  ALL_MICRO_FIELDS.forEach(f => { existing[f] = Math.round(existing[f] * 100) / 100; });

  return existing;
}

// Run nutrient estimation on all dishes at load time
dishes.forEach(d => { d.micro = estimateNutrients(d); });

// ─── Search dishes ───────────────────────────────────────────────────────
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
}

function searchDishes(query, category) {
  // If category filter is set with no query, return ALL dishes in that category
  if ((!query || query.trim().length === 0) && category) {
    return dishes.filter(d => d.category === category);
  }
  if (!query || query.trim().length === 0) return dishes.slice(0, 20);
  const q = normalize(query);
  const words = q.split(/\s+/);

  let pool = category ? dishes.filter(d => d.category === category) : dishes;

  const scored = pool.map(d => {
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

  return scored.filter(d => d.score > 0).sort((a, b) => b.score - a.score).slice(0, 50);
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
  const microTotals = {};
  ALL_MICRO_FIELDS.forEach(f => { microTotals[f] = 0; });
  selected.forEach(d => {
    totals.cal += d.cal;
    totals.protein += d.protein;
    totals.carbs += d.carbs;
    totals.fat += d.fat;
    totals.fiber += d.fiber;
    if (d.micro) {
      ALL_MICRO_FIELDS.forEach(f => { microTotals[f] += d.micro[f] || 0; });
    }
  });
  // Round micro totals
  ALL_MICRO_FIELDS.forEach(f => { microTotals[f] = Math.round(microTotals[f] * 100) / 100; });

  const gender = 'male'; // default; frontend can recalculate with user gender
  const rdaPercent = {
    cal: Math.round((totals.cal / getRDAValue('cal', gender)) * 100),
    protein: Math.round((totals.protein / getRDAValue('protein', gender)) * 100),
    carbs: Math.round((totals.carbs / getRDAValue('carbs', gender)) * 100),
    fat: Math.round((totals.fat / getRDAValue('fat', gender)) * 100),
    fiber: Math.round((totals.fiber / getRDAValue('fiber', gender)) * 100),
  };
  const microRdaPercent = {};
  ALL_MICRO_FIELDS.forEach(f => {
    const rdaVal = getRDAValue(f, gender);
    microRdaPercent[f] = rdaVal > 0 ? Math.round((microTotals[f] / rdaVal) * 100) : 0;
  });

  // Deficiency alerts: nutrients below 25% RDA
  const deficiencies = [];
  const nutrientLabels = { iron:'Iron', calcium:'Calcium', zinc:'Zinc', magnesium:'Magnesium', phosphorus:'Phosphorus', potassium:'Potassium', sodium:'Sodium', selenium:'Selenium', copper:'Copper', manganese:'Manganese', vitA:'Vitamin A', vitB1:'Vitamin B1', vitB2:'Vitamin B2', vitB3:'Vitamin B3', vitB5:'Vitamin B5', vitB6:'Vitamin B6', vitB12:'Vitamin B12', vitC:'Vitamin C', vitD:'Vitamin D', vitE:'Vitamin E', vitK:'Vitamin K', folate:'Folate', omega3:'Omega-3', cholesterol:'Cholesterol', sugar:'Sugar' };
  ALL_MICRO_FIELDS.forEach(f => {
    if (f === 'cholesterol' || f === 'sugar' || f === 'sodium') return; // skip limit nutrients
    if (microRdaPercent[f] < 25) {
      deficiencies.push({ nutrient: nutrientLabels[f] || f, percent: microRdaPercent[f] });
    }
  });
  // Excess alerts
  const excesses = [];
  if (microRdaPercent.sodium > 100) excesses.push({ nutrient: 'Sodium', percent: microRdaPercent.sodium });
  if (microRdaPercent.sugar > 100) excesses.push({ nutrient: 'Sugar', percent: microRdaPercent.sugar });
  if (microRdaPercent.cholesterol > 100) excesses.push({ nutrient: 'Cholesterol', percent: microRdaPercent.cholesterol });

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
      gi: d.gi || null,
      micro: d.micro || null,
      vitamins: d.vitamins,
      healthScore: d.healthScore,
    })),
    totals,
    microTotals,
    rdaPercent,
    microRdaPercent,
    deficiencies,
    excesses,
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
      cal: Math.round((dish.cal / getRDAValue('cal', 'male')) * 100),
      protein: Math.round((dish.protein / getRDAValue('protein', 'male')) * 100),
      carbs: Math.round((dish.carbs / getRDAValue('carbs', 'male')) * 100),
      fat: Math.round((dish.fat / getRDAValue('fat', 'male')) * 100),
      fiber: Math.round((dish.fiber / getRDAValue('fiber', 'male')) * 100),
    },
  };
}

// ─── Analyze a combo meal ────────────────────────────────────────────────
function analyzeCombo(comboId) {
  const combo = comboMeals.find(c => c.id === comboId);
  if (!combo) return { error: 'Combo not found' };
  const result = analyzeThali(combo.dishIds);
  return { ...result, combo: { id: combo.id, name: combo.name, desc: combo.desc, mealType: combo.mealType, region: combo.region, veg: combo.veg } };
}

// ─── Smart Plate Builder — suggests what's missing ───────────────────────
function smartSuggestions(selectedDishIds) {
  const selected = selectedDishIds.map(id => typeof id === 'number' ? dishes.find(d => d.id === id) : dishes.find(d => normalize(d.name) === normalize(String(id)))).filter(Boolean);

  if (selected.length === 0) return [];

  const totals = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  let hasProteinSource = false;
  let hasFiber = false;
  let hasProbiotic = false;
  let hasDal = false;
  let hasBread = false;
  let hasRice = false;
  let hasVeg = false;

  selected.forEach(d => {
    totals.cal += d.cal;
    totals.protein += d.protein;
    totals.fiber += d.fiber;
    if (d.protein >= 8) hasProteinSource = true;
    if (d.fiber >= 3) hasFiber = true;
    if (d.vitamins && d.vitamins.includes('Probiotics')) hasProbiotic = true;
    if (d.category === 'Dals' || d.name.toLowerCase().includes('dal')) hasDal = true;
    if (d.category === 'Rice/Breads' && (d.name.toLowerCase().includes('roti') || d.name.toLowerCase().includes('paratha') || d.name.toLowerCase().includes('naan'))) hasBread = true;
    if (d.category === 'Rice/Breads' && d.name.toLowerCase().includes('rice')) hasRice = true;
    if (d.category === 'Sides' || d.name.toLowerCase().includes('salad') || d.name.toLowerCase().includes('raita')) hasVeg = true;
  });

  const suggestions = [];

  // Missing protein
  if (totals.protein < 12 && !hasProteinSource) {
    const isVeg = selected.every(d => d.veg);
    if (isVeg) {
      suggestions.push({ type: 'protein', emoji: '\u{1F4AA}', message: 'Protein kam hai! Add a dal, paneer, or curd dish.', suggested: dishes.filter(d => d.veg && d.protein >= 8 && d.category === 'Dals').slice(0, 3).map(d => ({ id: d.id, name: d.name, protein: d.protein })) });
    } else {
      suggestions.push({ type: 'protein', emoji: '\u{1F4AA}', message: 'Protein kam hai! Add eggs, chicken tikka, or dal.', suggested: dishes.filter(d => d.protein >= 12).slice(0, 3).map(d => ({ id: d.id, name: d.name, protein: d.protein })) });
    }
  }

  // Missing fiber
  if (totals.fiber < 4 && !hasFiber) {
    suggestions.push({ type: 'fiber', emoji: '\u{1F96C}', message: 'Fiber nahi hai! Add a salad, sabzi, or switch to brown rice.', suggested: [
      { id: 193, name: 'Green Salad', fiber: 2 },
      { id: 231, name: 'Sprouts Salad', fiber: 5 },
      { id: 297, name: 'Kachumber Salad', fiber: 2 }
    ]});
  }

  // No probiotic
  if (!hasProbiotic && selected.length >= 2) {
    suggestions.push({ type: 'probiotic', emoji: '\u{1F95B}', message: 'Gut health ke liye dahi, raita, or chaas add karo.', suggested: [
      { id: 200, name: 'Curd (Dahi)', cal: 60 },
      { id: 126, name: 'Buttermilk (Chaas)', cal: 40 },
      { id: 191, name: 'Mixed Veg Raita', cal: 70 }
    ]});
  }

  // No carb source (only if no rice/bread and cal < 300)
  if (!hasRice && !hasBread && totals.cal < 300 && selected.length >= 1) {
    suggestions.push({ type: 'carbs', emoji: '\u{1F35A}', message: 'Carbs add karo — roti ya rice se meal complete hoga.', suggested: [
      { id: 76, name: 'Roti (Chapati)', cal: 80 },
      { id: 72, name: 'Brown Rice', cal: 160 },
      { id: 82, name: 'Tandoori Roti', cal: 100 }
    ]});
  }

  // Too heavy
  if (totals.cal > 800) {
    suggestions.push({ type: 'warning', emoji: '\u{26A0}\u{FE0F}', message: `${totals.cal} cal is heavy! Consider removing a fried/rich item or reducing portion.`, suggested: [] });
  }

  return suggestions;
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
  const category = req.query.category || '';
  const results = searchDishes(q, category);
  res.json({ results: results.map(d => ({ id: d.id, name: d.name, category: d.category, veg: d.veg, cal: d.cal, serving: d.serving, healthScore: d.healthScore, gi: d.gi || null })), count: results.length });
}

function handleGetDish(req, res) {
  const dish = getDish(req.params.id);
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  res.json(dish);
}

function handleCombos(req, res) {
  const { mealType, veg, region } = req.query;
  let filtered = comboMeals;
  if (mealType) filtered = filtered.filter(c => c.mealType === mealType);
  if (veg === 'true') filtered = filtered.filter(c => c.veg);
  if (region) filtered = filtered.filter(c => c.region.toLowerCase().includes(region.toLowerCase()));

  // Add nutrition summary to each combo
  const withNutrition = filtered.map(combo => {
    const comboDishes = combo.dishIds.map(id => dishes.find(d => d.id === id)).filter(Boolean);
    const totals = { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    comboDishes.forEach(d => { totals.cal += d.cal; totals.protein += d.protein; totals.carbs += d.carbs; totals.fat += d.fat; totals.fiber += d.fiber; });
    return { ...combo, nutrition: totals, dishCount: comboDishes.length };
  });

  res.json({ combos: withNutrition, count: withNutrition.length });
}

function handleComboAnalyze(req, res) {
  const { comboId } = req.params;
  const result = analyzeCombo(comboId);
  if (result.error) return res.status(404).json(result);
  res.json(result);
}

function handleSuggestions(req, res) {
  const { dishes: dishIds } = req.body || {};
  if (!dishIds || !Array.isArray(dishIds)) return res.status(400).json({ error: 'Provide dish IDs' });
  res.json({ suggestions: smartSuggestions(dishIds) });
}

function handleAllDishes(req, res) {
  const minimal = dishes.map(d => ({
    id: d.id, name: d.name, category: d.category, veg: d.veg,
    cal: d.cal, protein: d.protein, carbs: d.carbs, fat: d.fat,
    fiber: d.fiber, gi: d.gi, serving: d.serving, healthScore: d.healthScore,
    micro: d.micro || {}
  }));
  res.json({ dishes: minimal, count: minimal.length });
}

// ─── Festival Calendar ───
const festivals = [
  { id: 'navratri', name: 'Navratri', type: 'fast', duration: 9,
    rules: { allowed: ['Fruits','Dairy','Sabudana','Kuttu atta','Singhara atta','Potato','Makhana','Coconut','Rock salt'], avoid: ['Onion','Garlic','Grains','Rice','Wheat','Lentils','Non-veg','Regular salt'], tips: ['Use sendha namak instead of regular salt','Kuttu ka atta for rotis, singhare ka atta for puris','Sabudana khichdi is a high-energy fasting staple'] },
    dates2026: [{start:'2026-03-20',end:'2026-03-28'},{start:'2026-10-01',end:'2026-10-09'}],
    keywords: ['sabudana','khichdi','makhana','aloo','potato','fruit','lassi','curd','banana','kuttu'] },
  { id: 'ekadashi', name: 'Ekadashi', type: 'fast', duration: 1,
    rules: { allowed: ['Fruits','Dairy','Sabudana','Kuttu atta','Potato','Makhana'], avoid: ['Rice','Grains','Lentils','Onion','Garlic','Non-veg'], tips: ['Similar to Navratri but stricter','Break fast next morning with light food'] },
    dates2026: [{start:'2026-01-07'},{start:'2026-01-22'},{start:'2026-02-06'},{start:'2026-02-20'},{start:'2026-03-07'},{start:'2026-03-22'},{start:'2026-04-05'},{start:'2026-04-20'},{start:'2026-05-05'},{start:'2026-05-19'},{start:'2026-06-04'},{start:'2026-06-18'},{start:'2026-07-03'},{start:'2026-07-18'},{start:'2026-08-02'},{start:'2026-08-16'},{start:'2026-08-31'},{start:'2026-09-15'},{start:'2026-09-30'},{start:'2026-10-15'},{start:'2026-10-29'},{start:'2026-11-13'},{start:'2026-11-28'},{start:'2026-12-13'}],
    keywords: ['sabudana','potato','aloo','fruit','lassi','banana','makhana'] },
  { id: 'ramadan', name: 'Ramadan', type: 'fast', duration: 30,
    rules: { allowed: ['All foods at Sehri/Iftar'], avoid: ['Food during daylight hours'], tips: ['Sehri: High protein + complex carbs for energy — eggs, oats, dal paratha','Iftar: Start with dates + water, then light soup, then meal','Avoid salty/fried food at sehri — causes dehydration','Include potassium-rich foods: bananas, dates, yogurt'] },
    dates2026: [{start:'2026-02-18',end:'2026-03-19'}],
    keywords: [] },
  { id: 'paryushana', name: 'Paryushana (Jain)', type: 'fast', duration: 8,
    rules: { allowed: ['Grains','Lentils','Dairy','Fruits','Nuts','Above-ground veggies'], avoid: ['Root vegetables','Onion','Garlic','Potato','Ginger','Non-veg','Mushroom','Eggplant'], tips: ['No root vegetables (potato, carrot, beet, radish)','Green leafy and gourd vegetables preferred','Some observe complete fast on specific days'] },
    dates2026: [{start:'2026-08-28',end:'2026-09-04'}],
    keywords: ['dal','roti','rice','paneer','dahi','sabzi'] },
  { id: 'karwa_chauth', name: 'Karwa Chauth', type: 'fast', duration: 1,
    rules: { allowed: ['Sargi foods pre-dawn','All foods after moonrise'], avoid: ['Food and water during day'], tips: ['Sargi: mathri, dry fruits, sweets, fruits','Break fast after moonrise with water then full meal','Hydrate well during sargi — coconut water, milk, fruits'] },
    dates2026: [{start:'2026-10-22'}],
    keywords: [] },
  { id: 'ganesh_chaturthi', name: 'Ganesh Chaturthi', type: 'festival', duration: 10,
    rules: { allowed: ['All veg','Modak','Laddoo','Coconut sweets'], avoid: ['Non-veg on festival days'], tips: ['Steamed modak is healthier than fried','Coconut-based sweets are traditional'] },
    dates2026: [{start:'2026-08-27',end:'2026-09-05'}],
    keywords: ['modak','laddoo','coconut','sweet'] },
  { id: 'diwali', name: 'Diwali', type: 'festival', duration: 5,
    rules: { allowed: ['All foods','Sweets','Snacks','Dry fruits'], avoid: [], tips: ['Make sweets at home to control sugar/ghee','Baked snacks save 40% calories vs fried','Dry fruit laddoo > Gulab Jamun (half sugar, more nutrients)','Post-Diwali: increase fiber, reduce sugar for a week'] },
    dates2026: [{start:'2026-10-17',end:'2026-10-21'}],
    keywords: ['laddoo','barfi','gulab jamun','mathri','chakli'] },
  { id: 'sankranti', name: 'Makar Sankranti / Pongal', type: 'festival', duration: 3,
    rules: { allowed: ['Til-gul','Jaggery items','Rice','Pongal dish','Khichdi'], avoid: [], tips: ['Til (sesame) is rich in calcium & iron — great winter food','Jaggery > sugar: contains iron & minerals','Traditional Pongal is balanced with lentils'] },
    dates2026: [{start:'2026-01-14',end:'2026-01-16'}],
    keywords: ['khichdi','pongal','laddoo','til','jaggery'] },
  { id: 'onam', name: 'Onam (Kerala)', type: 'festival', duration: 10,
    rules: { allowed: ['All veg','Onasadya feast','Payasam','Avial','Olan'], avoid: ['Non-veg during Onam'], tips: ['Onasadya has 26 dishes on banana leaf','Focus on vegetable dishes for nutrition','Keep payasam portions small — high sugar'] },
    dates2026: [{start:'2026-09-04',end:'2026-09-13'}],
    keywords: ['sambar','avial','payasam','rice','thoran'] },
  { id: 'chhath', name: 'Chhath Puja', type: 'fast', duration: 4,
    rules: { allowed: ['Thekua','Rice','Fruits','Sugarcane','Coconut'], avoid: ['Onion','Garlic','Non-veg','Salt on fast days'], tips: ['36-hour waterless fast on main day — hydrate well before','Thekua (wheat + jaggery + dry fruits) is the main prasad','Break fast with curd rice or khichdi'] },
    dates2026: [{start:'2026-10-28',end:'2026-10-31'}],
    keywords: ['rice','fruit','coconut'] }
];

function getUpcomingFestivals(fromDate) {
  const from = new Date(fromDate || new Date());
  const results = [];
  for (const fest of festivals) {
    for (const dr of fest.dates2026) {
      const start = new Date(dr.start);
      const end = dr.end ? new Date(dr.end) : start;
      const daysUntil = Math.ceil((start - from) / 86400000);
      if (daysUntil >= -(fest.duration) && daysUntil <= 60) {
        results.push({
          id: fest.id, name: fest.name, type: fest.type, duration: fest.duration,
          rules: fest.rules, startDate: dr.start, endDate: dr.end || dr.start,
          daysUntil: Math.max(0, daysUntil), isActive: from >= start && from <= end
        });
      }
    }
  }
  return results.sort((a, b) => a.daysUntil - b.daysUntil);
}

function getFestivalDishes(festivalId) {
  const fest = festivals.find(f => f.id === festivalId);
  if (!fest || !fest.keywords || fest.keywords.length === 0) return dishes.filter(d => d.veg).slice(0, 20);
  return dishes.filter(d => {
    const name = d.name.toLowerCase();
    return fest.keywords.some(kw => name.includes(kw));
  }).slice(0, 25);
}

function handleFestivals(req, res) {
  res.json({ festivals: getUpcomingFestivals(req.query.date) });
}

function handleFestivalDishes(req, res) {
  const festDishes = getFestivalDishes(req.params.festivalId);
  res.json({ festivalId: req.params.festivalId, dishes: festDishes.map(d => ({ id:d.id, name:d.name, cal:d.cal, protein:d.protein, category:d.category, veg:d.veg, healthScore:d.healthScore, gi:d.gi, serving:d.serving })) });
}

// ─── Dadi ke Nuskhe — Traditional Food Wisdom ───
const nuskheRules = [
  { check: (names) => names.some(n=>n.includes('Dal'))&&names.some(n=>n.includes('Rice')||n.includes('Chawal')), tip:'Dal + Rice = Complete Protein! Rice lacks lysine, dal lacks methionine — together they form a complete protein. Dadi was right!', icon:'🧬', cat:'wisdom' },
  { check: (names) => names.some(n=>n.includes('Palak')||n.includes('Spinach')), tip:'Add nimbu (lemon) to palak — Vitamin C increases iron absorption from spinach by up to 6x!', icon:'🍋', cat:'wisdom' },
  { check: (names) => names.some(n=>n.includes('Dahi')||n.includes('Curd')||n.includes('Raita')||n.includes('Lassi')), tip:'Dahi after meals aids digestion — it\'s a natural probiotic. Dadi always said "khana dahi ke saath khatam karo"!', icon:'🥛', cat:'wisdom' },
  { check: (names) => names.some(n=>n.includes('Ghee')), tip:'A spoon of ghee on hot dal/rice helps absorb fat-soluble vitamins (A, D, E, K). Ghee is not the enemy — excess ghee is!', icon:'🧈', cat:'wisdom' },
  { check: (names,t) => names.filter(n=>['Biryani','Chicken','Mutton','Egg'].some(w=>n.includes(w))).length>=2, tip:'Garam taaseer alert! Multiple heat-generating foods in one meal. Balance with cooling dahi, cucumber raita, or chaas (buttermilk).', icon:'🌡️', cat:'taaseer' },
  { check: (names,t) => { const m=new Date().getMonth(); return m>=3&&m<=5&&t.fat>25; }, tip:'Summer tip: Heavy oily foods increase body heat. Prefer chaas, sattu drink, and lighter meals in garmi.', icon:'☀️', cat:'seasonal' },
  { check: (names,t) => { const m=new Date().getMonth(); return m>=10||m<=1; }, tip:'Winter is the season for til (sesame), gond laddoo, and ghee — they keep the body warm. Dadi was right about gond ke laddoo!', icon:'❄️', cat:'seasonal' },
  { check: (names,t) => { const m=new Date().getMonth(); return m>=6&&m<=8; }, tip:'Monsoon tip: Prefer garam haldi doodh, adrak chai, and fresh-cooked meals. Avoid raw salads in barish.', icon:'🌧️', cat:'seasonal' },
  { check: (names,t) => t.fiber<5, tip:'Low fiber! Add sabzi and dal. Dadi says "roti ke saath sabzi zaroor khao" — she was talking about fiber!', icon:'🥬', cat:'health' },
  { check: (names,t) => t.cal>700&&!names.some(n=>n.includes('Salad')||n.includes('Raita')||n.includes('Curd')||n.includes('Dahi')), tip:'Heavy meal without probiotics! Add dahi or raita. Dadi always served dahi with heavy meals for digestion.', icon:'🫗', cat:'health' },
  { check: (names) => names.some(n=>n.includes('Chai')||n.includes('Tea')), tip:'Chai right after meals blocks iron absorption by 60%! Wait 1 hour after eating. Pehle khana, phir chai.', icon:'⏰', cat:'health' },
  { check: (names) => names.filter(n=>n.includes('Fried')||n.includes('Bhature')||n.includes('Pakora')||n.includes('Samosa')||n.includes('Vada')).length>=2, tip:'Multiple fried items! Dadi says "tel mein tala ek hi cheez khao" — one fried item per meal is enough.', icon:'🍳', cat:'health' },
  { check: () => true, tip:'Haldi (turmeric) with kali mirch (black pepper) increases curcumin absorption by 2000%. Always pair them in your cooking!', icon:'✨', cat:'wisdom' },
];

function getNuskhe(dishNames, totals) {
  if (!dishNames || dishNames.length === 0) return [];
  const names = dishNames.map(n => typeof n === 'string' ? n : (n.name || ''));
  return nuskheRules
    .filter(r => { try { return r.check(names, totals || {}); } catch(e) { return false; } })
    .slice(0, 4)
    .map(r => ({ tip: r.tip, icon: r.icon, category: r.cat }));
}

function handleNuskhe(req, res) {
  const { dishes: dishData, totals } = req.body || {};
  if (!dishData) return res.json({ nuskhe: [] });
  const names = dishData.map(d => d.name || '');
  res.json({ nuskhe: getNuskhe(names, totals || {}) });
}

// ─── Grocery List Generator ───
function generateGroceryList(mealPlan) {
  if (!mealPlan || !Array.isArray(mealPlan)) return { items: [], totalCost: 0 };

  const categoriesUsed = new Set();
  const allDishIds = new Set();
  let totalServings = 0;

  mealPlan.forEach(day => {
    [...(day.breakfast||[]),...(day.lunch||[]),...(day.dinner||[])].forEach(d => {
      allDishIds.add(d.id);
      if (d.category) categoriesUsed.add(d.category);
      totalServings++;
    });
  });

  const items = [];
  let totalCost = 0;

  function add(name, qty, cost, category) {
    items.push({ name, qty, cost, category });
    totalCost += cost;
  }

  // Weekly staples (everyone needs these)
  add('Atta (Whole Wheat Flour)', categoriesUsed.has('North Indian') ? '2 kg' : '1 kg', categoriesUsed.has('North Indian') ? 90 : 45, 'Staples');
  add('Rice (Basmati)', categoriesUsed.has('South Indian') || categoriesUsed.has('Rice/Breads') ? '2 kg' : '1 kg', categoriesUsed.has('South Indian') ? 160 : 80, 'Staples');
  add('Cooking Oil', '1 L', 160, 'Staples');
  add('Onions', '2 kg', 70, 'Vegetables');
  add('Tomatoes', '1.5 kg', 60, 'Vegetables');
  add('Potatoes', '1 kg', 30, 'Vegetables');
  add('Green Chillies + Ginger + Garlic', '350g', 50, 'Vegetables');
  add('Milk', '3.5 L (weekly)', 210, 'Dairy');
  add('Curd (Dahi)', '1 kg', 70, 'Dairy');
  add('Ghee', '250g', 140, 'Dairy');
  add('Spice Box (haldi, mirch, dhaniya, jeera, garam masala)', '1 set', 195, 'Spices');
  add('Salt + Fresh Coriander + Curry Leaves', '1 set', 30, 'Spices');

  // Category-specific
  if (categoriesUsed.has('Dals') || categoriesUsed.has('North Indian') || categoriesUsed.has('South Indian')) {
    add('Dal Assorted (toor, moong, chana)', '1.5 kg', 180, 'Pulses');
  }
  if (categoriesUsed.has('North Indian')) {
    add('Paneer', '500g', 160, 'Dairy');
    add('Cream + Butter', '200ml + 100g', 100, 'Dairy');
    add('Kasuri Methi', '50g', 20, 'Spices');
  }
  if (categoriesUsed.has('South Indian')) {
    add('Urad Dal (for dosa/idli batter)', '500g', 65, 'Pulses');
    add('Rava / Sooji', '500g', 40, 'Staples');
    add('Coconut + Sambar Powder', '2 pcs + 100g', 75, 'Spices');
  }
  if (categoriesUsed.has('Non-Veg')) {
    add('Chicken', '1.5 kg', 375, 'Non-Veg');
    add('Eggs', '12 pcs', 84, 'Non-Veg');
  }
  if (categoriesUsed.has('Breakfast')) {
    add('Poha / Oats', '500g', 40, 'Breakfast');
    add('Besan', '500g', 55, 'Breakfast');
  }

  // Always include
  add('Mixed Seasonal Vegetables', '3 kg', 150, 'Vegetables');
  add('Fruits (banana, apple, seasonal)', '2 kg', 120, 'Fruits');

  return { items, totalCost, dishCount: allDishIds.size, servings: totalServings };
}

function handleGroceryList(req, res) {
  const { mealPlan } = req.body || {};
  if (!mealPlan) return res.json({ error: 'No meal plan provided' });
  res.json(generateGroceryList(mealPlan));
}

// ─── FEATURE 1: Ayurvedic Prakriti (Body Type) Mode ─────────────────────────

const prakritiQuiz = {
  questions: [
    { id: 1, text: "What is your body frame?", options: [
      { text: "Thin, light, hard to gain weight", type: "vata" },
      { text: "Medium, athletic, proportionate", type: "pitta" },
      { text: "Large, heavy, gains weight easily", type: "kapha" }
    ]},
    { id: 2, text: "How is your digestion?", options: [
      { text: "Irregular, gas, bloating", type: "vata" },
      { text: "Strong, acidic, gets hungry often", type: "pitta" },
      { text: "Slow, feels heavy after meals", type: "kapha" }
    ]},
    { id: 3, text: "Your skin type?", options: [
      { text: "Dry, rough, cool", type: "vata" },
      { text: "Oily, warm, prone to rashes", type: "pitta" },
      { text: "Thick, moist, smooth", type: "kapha" }
    ]},
    { id: 4, text: "How do you handle stress?", options: [
      { text: "Anxious, worried, restless", type: "vata" },
      { text: "Irritable, angry, frustrated", type: "pitta" },
      { text: "Calm but withdrawn, lethargic", type: "kapha" }
    ]},
    { id: 5, text: "Your sleep pattern?", options: [
      { text: "Light sleeper, difficulty falling asleep", type: "vata" },
      { text: "Moderate, wake up feeling hot", type: "pitta" },
      { text: "Deep, heavy, hard to wake up", type: "kapha" }
    ]},
    { id: 6, text: "Your appetite?", options: [
      { text: "Variable, forget to eat sometimes", type: "vata" },
      { text: "Strong, can't skip meals", type: "pitta" },
      { text: "Low but steady, can skip meals", type: "kapha" }
    ]},
    { id: 7, text: "Weather preference?", options: [
      { text: "Hate cold, love warmth", type: "vata" },
      { text: "Hate heat, love cool weather", type: "pitta" },
      { text: "Hate damp/cold, like warm & dry", type: "kapha" }
    ]},
    { id: 8, text: "Your energy pattern?", options: [
      { text: "Bursts of energy, tire quickly", type: "vata" },
      { text: "Moderate, sustained energy", type: "pitta" },
      { text: "Slow to start, good stamina once going", type: "kapha" }
    ]},
    { id: 9, text: "Your hair type?", options: [
      { text: "Dry, frizzy, thin", type: "vata" },
      { text: "Fine, straight, early greying", type: "pitta" },
      { text: "Thick, oily, wavy", type: "kapha" }
    ]},
    { id: 10, text: "How do you learn?", options: [
      { text: "Quick to learn, quick to forget", type: "vata" },
      { text: "Sharp, focused, analytical", type: "pitta" },
      { text: "Slow to learn, never forgets", type: "kapha" }
    ]}
  ]
};

const prakritiDietRules = {
  vata: {
    title: "Vata (Air + Space)",
    emoji: "\uD83C\uDF2C\uFE0F",
    description: "You have a Vata constitution \u2014 creative, quick-thinking, but prone to anxiety and irregular digestion.",
    favor: ["Warm, cooked, oily foods", "Sweet, sour, salty tastes", "Ghee, sesame oil, warm milk", "Soups, stews, khichdi", "Root vegetables, sweet potatoes", "Ripe fruits \u2014 banana, mango, grapes", "Warm spices \u2014 ginger, cumin, cinnamon"],
    avoid: ["Raw salads, cold foods", "Dry, crunchy snacks (biscuits, chips)", "Bitter, astringent foods", "Excess caffeine", "Frozen/cold drinks", "Dried fruits in excess"],
    bestDishes: [],
    mealTiming: "Eat at regular times. Never skip meals. Warm breakfast is essential.",
    spices: ["Ginger", "Cumin", "Cinnamon", "Cardamom", "Hing (Asafoetida)", "Black pepper"],
    dishFilter: function(dish) {
      var name = dish.name.toLowerCase();
      var warmFoods = ['dal', 'curry', 'khichdi', 'soup', 'stew', 'halwa', 'paratha', 'roti', 'sabzi', 'korma', 'biryani', 'pulao', 'dosa', 'idli', 'upma', 'poha', 'kheer', 'payasam', 'rasam'];
      var coldFoods = ['raita', 'salad', 'chaat', 'ice', 'cold', 'lassi', 'sherbet', 'kulfi'];
      if (warmFoods.some(function(w) { return name.includes(w); })) return 1;
      if (coldFoods.some(function(w) { return name.includes(w); })) return -1;
      return 0;
    }
  },
  pitta: {
    title: "Pitta (Fire + Water)",
    emoji: "\uD83D\uDD25",
    description: "You have a Pitta constitution \u2014 sharp, focused, strong digestion, but prone to acidity and inflammation.",
    favor: ["Cooling, mild foods", "Sweet, bitter, astringent tastes", "Coconut, cucumber, mint", "Rice, oats, wheat", "Sweet fruits \u2014 melon, pear, apple", "Green leafy vegetables", "Milk, ghee, coconut oil"],
    avoid: ["Spicy, hot foods (mirchi, chilli)", "Sour, fermented foods (pickle, vinegar)", "Excess salt", "Fried foods, oily snacks", "Tomatoes, garlic in excess", "Alcohol, coffee"],
    bestDishes: [],
    mealTiming: "Don't skip lunch \u2014 it's your strongest digestion time. Avoid eating when angry.",
    spices: ["Coriander", "Fennel (Saunf)", "Mint", "Cardamom", "Turmeric", "Cumin (mild)"],
    dishFilter: function(dish) {
      var name = dish.name.toLowerCase();
      var coolingFoods = ['raita', 'curd', 'rice', 'coconut', 'kheer', 'lassi', 'buttermilk', 'chaas', 'dahi', 'idli', 'appam', 'puttu', 'oats', 'cucumber'];
      var heatingFoods = ['vindaloo', 'mirchi', 'pickle', 'achari', 'pepper', 'chilli', 'masala', 'fry', 'fried', 'pakora', 'bhaji', 'vada'];
      if (coolingFoods.some(function(w) { return name.includes(w); })) return 1;
      if (heatingFoods.some(function(w) { return name.includes(w); })) return -1;
      return 0;
    }
  },
  kapha: {
    title: "Kapha (Earth + Water)",
    emoji: "\uD83C\uDF0D",
    description: "You have a Kapha constitution \u2014 calm, steady, strong, but prone to weight gain and sluggishness.",
    favor: ["Light, dry, warm foods", "Pungent, bitter, astringent tastes", "Steamed vegetables, salads", "Millets \u2014 bajra, jowar, ragi", "Beans, lentils (moong, masoor)", "Honey (in moderation)", "Light fruits \u2014 apple, pomegranate, berries"],
    avoid: ["Heavy, oily, fried foods", "Sweets, desserts", "Excess dairy (cheese, cream, butter)", "White rice, maida", "Cold drinks, ice cream", "Excess salt", "Sleeping after meals"],
    bestDishes: [],
    mealTiming: "Eat light dinner before 7 PM. Breakfast optional \u2014 listen to your body. Lunch should be the main meal.",
    spices: ["Black pepper", "Ginger", "Turmeric", "Mustard seeds", "Fenugreek (Methi)", "Ajwain"],
    dishFilter: function(dish) {
      var name = dish.name.toLowerCase();
      var lightFoods = ['salad', 'soup', 'sprout', 'chilla', 'moong', 'ragi', 'bajra', 'jowar', 'steamed', 'grilled', 'tandoori', 'rasam', 'sambar'];
      var heavyFoods = ['halwa', 'gulab', 'jalebi', 'ladoo', 'barfi', 'cream', 'butter', 'malai', 'fried', 'puri', 'bhature', 'paratha', 'kheer', 'biryani', 'pulao', 'korma'];
      if (lightFoods.some(function(w) { return name.includes(w); })) return 1;
      if (heavyFoods.some(function(w) { return name.includes(w); })) return -1;
      return 0;
    }
  }
};

function determinePrakriti(answers) {
  if (!answers || !Array.isArray(answers) || answers.length === 0) return { dominant: 'vata', secondary: 'pitta', counts: { vata: 0, pitta: 0, kapha: 0 } };
  var counts = { vata: 0, pitta: 0, kapha: 0 };
  answers.forEach(function(a) { if (counts[a] !== undefined) counts[a]++; });
  var sorted = Object.entries(counts).sort(function(a, b) { return b[1] - a[1]; });
  return { dominant: sorted[0][0], secondary: sorted[1][0], counts: counts };
}

function getPrakritiDishes(prakriti) {
  var rules = prakritiDietRules[prakriti];
  if (!rules) return { favored: [], avoid: [] };
  var favored = [];
  var avoid = [];
  dishes.forEach(function(d) {
    var score = rules.dishFilter(d);
    if (score === 1) favored.push({ id: d.id, name: d.name, cal: d.cal, category: d.category, veg: d.veg, healthScore: d.healthScore, serving: d.serving, gi: d.gi });
    else if (score === -1) avoid.push({ id: d.id, name: d.name, cal: d.cal, category: d.category, veg: d.veg, healthScore: d.healthScore, serving: d.serving, gi: d.gi });
  });
  return { favored: favored.slice(0, 50), avoid: avoid.slice(0, 30) };
}

function handlePrakriti(req, res) {
  var answers = (req.body || {}).answers;
  if (!answers || !Array.isArray(answers)) return res.status(400).json({ error: 'Provide answers array' });
  var result = determinePrakriti(answers);
  var rules = prakritiDietRules[result.dominant];
  res.json({
    prakriti: result,
    profile: {
      title: rules.title,
      emoji: rules.emoji,
      description: rules.description,
      favor: rules.favor,
      avoid: rules.avoid,
      mealTiming: rules.mealTiming,
      spices: rules.spices
    }
  });
}

function handlePrakritiDishes(req, res) {
  var prakriti = req.params.prakriti || req.query.prakriti || 'vata';
  if (!prakritiDietRules[prakriti]) return res.status(400).json({ error: 'Invalid prakriti type' });
  var result = getPrakritiDishes(prakriti);
  res.json({ prakriti: prakriti, ...result });
}

// ─── FEATURE 2: Budget Meal Planner ─────────────────────────────────────────

function estimateDishCost(dish) {
  var baseCosts = {
    'Dals': 15, 'Rice/Breads': 8, 'Sides': 10, 'Drinks': 12,
    'North Indian': 25, 'South Indian': 20, 'Breakfast': 18,
    'Non-Veg': 45, 'Snacks': 20, 'Sweets': 25,
    'Bengali': 30, 'Kerala': 28, 'Maharashtrian': 22,
    'Gujarati': 20, 'Andhra': 22, 'Tamil Nadu': 22,
    'Rajasthani': 20, 'Kashmiri': 35, 'Goan': 35,
    'Punjabi': 28, 'Odisha': 18, 'Bihari': 15,
    'Assamese': 20, 'Street Food': 30, 'Chinese': 25
  };
  var cost = baseCosts[dish.category] || 20;
  if (!dish.veg) cost *= 1.5;
  if (dish.cal > 400) cost *= 1.2;
  if (dish.name.toLowerCase().includes('paneer')) cost += 10;
  if (dish.name.toLowerCase().includes('chicken') || dish.name.toLowerCase().includes('mutton')) cost += 15;
  if (dish.name.toLowerCase().includes('prawn') || dish.name.toLowerCase().includes('fish')) cost += 12;
  return Math.round(cost);
}

function generateBudgetMealPlan(budget, days, vegPref, region) {
  days = days || 7;
  budget = budget || 2000;
  var perDayBudget = Math.round(budget / days);
  var perMealBudget = Math.round(perDayBudget / 3);

  // Filter dishes
  var pool = dishes.filter(function(d) {
    if (vegPref === 'veg' && !d.veg) return false;
    if (region && d.category !== region && d.category !== 'Dals' && d.category !== 'Rice/Breads' && d.category !== 'Sides' && d.category !== 'Drinks') return false;
    return true;
  });

  // Score dishes by value: (healthScore * protein) / cost
  var scoredDishes = pool.map(function(d) {
    var cost = estimateDishCost(d);
    var valueScore = ((d.healthScore * d.protein) + d.fiber) / Math.max(cost, 1);
    return { dish: d, cost: cost, valueScore: valueScore };
  }).sort(function(a, b) { return b.valueScore - a.valueScore; });

  var plan = [];
  var totalCost = 0;
  var usedRecently = new Set();
  var dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  for (var day = 0; day < days; day++) {
    var dayPlan = { day: dayNames[day % 7], breakfast: [], lunch: [], dinner: [], dayCost: 0 };
    var dayCost = 0;

    // Breakfast
    var bfBudget = Math.round(perDayBudget * 0.25);
    var bfCandidates = scoredDishes.filter(function(s) {
      return s.cost <= bfBudget && !usedRecently.has(s.dish.id) && (s.dish.category === 'Breakfast' || s.dish.category === 'South Indian' || s.dish.category === 'Dals' || s.dish.category === 'Drinks');
    });
    if (bfCandidates.length === 0) bfCandidates = scoredDishes.filter(function(s) { return s.cost <= bfBudget; });
    if (bfCandidates.length > 0) {
      var bf = bfCandidates[Math.floor(Math.random() * Math.min(5, bfCandidates.length))];
      dayPlan.breakfast.push({ id: bf.dish.id, name: bf.dish.name, cal: bf.dish.cal, protein: bf.dish.protein, cost: bf.cost, category: bf.dish.category, veg: bf.dish.veg });
      dayCost += bf.cost;
      usedRecently.add(bf.dish.id);
    }

    // Lunch
    var lBudget = Math.round(perDayBudget * 0.40);
    var remaining = lBudget;
    // Main dish
    var lCandidates = scoredDishes.filter(function(s) {
      return s.cost <= remaining && !usedRecently.has(s.dish.id) && s.dish.category !== 'Breakfast' && s.dish.category !== 'Sweets' && s.dish.category !== 'Drinks';
    });
    if (lCandidates.length > 0) {
      var lMain = lCandidates[Math.floor(Math.random() * Math.min(5, lCandidates.length))];
      dayPlan.lunch.push({ id: lMain.dish.id, name: lMain.dish.name, cal: lMain.dish.cal, protein: lMain.dish.protein, cost: lMain.cost, category: lMain.dish.category, veg: lMain.dish.veg });
      remaining -= lMain.cost;
      dayCost += lMain.cost;
      usedRecently.add(lMain.dish.id);
    }
    // Add roti/rice
    var rbCandidates = scoredDishes.filter(function(s) { return s.cost <= remaining && s.dish.category === 'Rice/Breads'; });
    if (rbCandidates.length > 0) {
      var rb = rbCandidates[Math.floor(Math.random() * Math.min(3, rbCandidates.length))];
      dayPlan.lunch.push({ id: rb.dish.id, name: rb.dish.name, cal: rb.dish.cal, protein: rb.dish.protein, cost: rb.cost, category: rb.dish.category, veg: rb.dish.veg });
      remaining -= rb.cost;
      dayCost += rb.cost;
    }

    // Dinner
    var dBudget = perDayBudget - dayCost;
    var dCandidates = scoredDishes.filter(function(s) {
      return s.cost <= dBudget && !usedRecently.has(s.dish.id) && s.dish.category !== 'Breakfast' && s.dish.category !== 'Sweets' && s.dish.category !== 'Drinks';
    });
    if (dCandidates.length > 0) {
      var dMain = dCandidates[Math.floor(Math.random() * Math.min(5, dCandidates.length))];
      dayPlan.dinner.push({ id: dMain.dish.id, name: dMain.dish.name, cal: dMain.dish.cal, protein: dMain.dish.protein, cost: dMain.cost, category: dMain.dish.category, veg: dMain.dish.veg });
      dBudget -= dMain.cost;
      dayCost += dMain.cost;
      usedRecently.add(dMain.dish.id);
    }
    // Add roti/rice for dinner
    var drbCandidates = scoredDishes.filter(function(s) { return s.cost <= dBudget && s.dish.category === 'Rice/Breads'; });
    if (drbCandidates.length > 0) {
      var drb = drbCandidates[Math.floor(Math.random() * Math.min(3, drbCandidates.length))];
      dayPlan.dinner.push({ id: drb.dish.id, name: drb.dish.name, cal: drb.dish.cal, protein: drb.dish.protein, cost: drb.cost, category: drb.dish.category, veg: drb.dish.veg });
      dayCost += drb.cost;
    }

    dayPlan.dayCost = dayCost;
    totalCost += dayCost;
    plan.push(dayPlan);

    if ((day + 1) % 3 === 0) usedRecently.clear();
  }

  // Eating out comparison (avg 150 per meal)
  var eatingOutCost = days * 3 * 150;
  var savings = eatingOutCost - totalCost;

  return {
    plan: plan,
    totalCost: totalCost,
    perDayAvg: Math.round(totalCost / days),
    perMealAvg: Math.round(totalCost / (days * 3)),
    budget: budget,
    days: days,
    eatingOutComparison: eatingOutCost,
    savings: Math.max(0, savings),
    savingsTips: [
      "Buy dals and rice in bulk \u2014 saves 20-30%",
      "Seasonal vegetables are cheapest and most nutritious",
      "Cook at home \u2014 same meal costs 3-5x more outside",
      "Sprouts and curd are cheapest protein sources",
      "Use leftover roti for next-day breakfast (thalipeeth/upma)"
    ]
  };
}

function handleBudgetPlan(req, res) {
  var body = req.body || {};
  var budget = parseInt(body.budget) || 2000;
  var days = parseInt(body.days) || 7;
  var vegPref = body.vegPref || 'veg';
  var region = body.region || '';
  res.json(generateBudgetMealPlan(budget, days, vegPref, region));
}

// ─── FEATURE 3: Allergen & Intolerance Filters ─────────────────────────────

const allergenDatabase = {
  gluten: {
    name: "Gluten", emoji: "\uD83C\uDF3E",
    keywords: ["wheat", "maida", "atta", "roti", "naan", "paratha", "bread", "pasta", "semolina", "suji", "daliya", "seviyan", "biscuit", "cake", "chapati", "bhatura", "kulcha", "puri", "samosa", "kachori", "mathri"],
    safeKeywords: ["rice", "bajra", "jowar", "ragi", "corn", "besan", "singhara"]
  },
  dairy: {
    name: "Dairy", emoji: "\uD83E\uDD5B",
    keywords: ["paneer", "curd", "dahi", "milk", "cream", "malai", "cheese", "butter", "ghee", "kheer", "raita", "lassi", "buttermilk", "chaas", "rabdi", "basundi", "shrikhand", "kulfi", "rasmalai", "rasgulla", "sandesh", "peda", "barfi"],
    safeKeywords: ["coconut milk", "soy milk", "almond milk"]
  },
  nuts: {
    name: "Tree Nuts", emoji: "\uD83E\uDD5C",
    keywords: ["cashew", "kaju", "almond", "badam", "pista", "walnut", "akhrot", "peanut", "mungfali"],
    safeKeywords: ["coconut"]
  },
  egg: {
    name: "Egg", emoji: "\uD83E\uDD5A",
    keywords: ["egg", "anda", "omelette", "bhurji"],
    safeKeywords: []
  },
  shellfish: {
    name: "Shellfish", emoji: "\uD83E\uDD90",
    keywords: ["prawn", "shrimp", "crab", "lobster", "jhinga", "chingri", "kolambi"],
    safeKeywords: []
  },
  soy: {
    name: "Soy", emoji: "\uD83E\uDED8",
    keywords: ["soy", "tofu", "soya"],
    safeKeywords: []
  }
};

function tagDishAllergens(dish) {
  var nameLower = dish.name.toLowerCase();
  var allergens = [];
  Object.keys(allergenDatabase).forEach(function(key) {
    var db = allergenDatabase[key];
    var hasSafe = db.safeKeywords.some(function(sw) { return nameLower.includes(sw); });
    var hasAllergen = db.keywords.some(function(kw) { return nameLower.includes(kw); });
    if (hasAllergen && !hasSafe) allergens.push(key);
  });
  return allergens;
}

function filterByAllergens(dishList, excludeAllergens) {
  if (!excludeAllergens || excludeAllergens.length === 0) return dishList;
  return dishList.filter(function(d) {
    var allergens = tagDishAllergens(d);
    return !excludeAllergens.some(function(ex) { return allergens.includes(ex); });
  });
}

// ─── FEATURE 4: Ingredient Substitution Engine ─────────────────────────────

const substitutions = [
  { from: "Cream", to: "Hung Curd", saveCal: 150, saveMsg: "70% less fat, same creamy texture", applies: ["korma", "malai", "cream", "butter"] },
  { from: "Sugar", to: "Jaggery (Gur)", saveCal: 0, saveMsg: "Added iron & minerals, similar calories", applies: ["halwa", "kheer", "ladoo", "payasam", "chai"] },
  { from: "White Rice", to: "Brown Rice", saveCal: 20, saveMsg: "3x more fiber, lower GI", applies: ["rice", "pulao", "biryani", "khichdi"] },
  { from: "Maida", to: "Whole Wheat Atta", saveCal: 10, saveMsg: "More fiber, lower GI", applies: ["naan", "paratha", "puri", "bhature", "samosa"] },
  { from: "Deep Frying", to: "Air Frying / Baking", saveCal: 120, saveMsg: "60-80% less oil", applies: ["pakora", "vada", "samosa", "fry", "fried", "bhaji", "bajji", "tikki"] },
  { from: "Paneer", to: "Tofu", saveCal: 80, saveMsg: "50% fewer calories, similar protein", applies: ["paneer"] },
  { from: "Ghee (excess)", to: "1 tsp Ghee", saveCal: 100, saveMsg: "Controlled portion = healthy fats", applies: ["dal", "roti", "paratha", "rice", "khichdi"] },
  { from: "Coconut Milk (full)", to: "Lite Coconut Milk", saveCal: 80, saveMsg: "Half the fat, same flavor", applies: ["coconut", "kerala", "stew", "curry"] },
  { from: "Salt", to: "Lemon + Herbs", saveCal: 0, saveMsg: "Reduces sodium, adds Vitamin C", applies: ["chaat", "salad", "dal", "sabzi"] },
  { from: "Butter", to: "Olive Oil", saveCal: 30, saveMsg: "Heart-healthy unsaturated fats", applies: ["butter", "pav bhaji", "toast"] },
  { from: "Paneer", to: "Soy Paneer (Tofu)", saveCal: 80, saveMsg: "Dairy-free, similar protein", applies: ["paneer"], allergenSwap: "dairy" },
  { from: "Wheat Roti", to: "Bajra/Jowar Roti", saveCal: 5, saveMsg: "Gluten-free, higher minerals", applies: ["roti", "chapati", "naan", "paratha"], allergenSwap: "gluten" },
  { from: "Curd/Raita", to: "Coconut Yogurt", saveCal: 10, saveMsg: "Dairy-free probiotic", applies: ["raita", "dahi", "curd", "lassi"], allergenSwap: "dairy" },
  { from: "Cashew Paste", to: "Melon Seed Paste", saveCal: 0, saveMsg: "Nut-free, same creaminess", applies: ["korma", "kaju", "cashew"], allergenSwap: "nuts" },
  { from: "Regular Oil", to: "Mustard Oil", saveCal: 0, saveMsg: "Rich in omega-3, anti-inflammatory", applies: ["pickle", "fish", "sabzi"] },
  { from: "White Bread", to: "Multigrain Bread", saveCal: 15, saveMsg: "More fiber and nutrients", applies: ["bread", "toast", "sandwich"] },
  { from: "Full-fat Milk", to: "Toned Milk", saveCal: 40, saveMsg: "Less fat, same calcium", applies: ["chai", "coffee", "milk", "shake", "kheer"] },
  { from: "Regular Noodles", to: "Whole Wheat Noodles", saveCal: 10, saveMsg: "More fiber, lower GI", applies: ["noodle", "maggi", "hakka"] },
  { from: "Mayo", to: "Hung Curd Dip", saveCal: 80, saveMsg: "Probiotic, less fat", applies: ["sandwich", "roll", "wrap"] },
  { from: "Potato", to: "Sweet Potato", saveCal: 10, saveMsg: "Higher fiber, Vitamin A, lower GI", applies: ["aloo", "potato", "tikki"] },
  { from: "Cornflakes", to: "Oats/Muesli", saveCal: 20, saveMsg: "More fiber, lower GI", applies: ["cornflake", "cereal"] },
  { from: "Sour Cream", to: "Greek Yogurt", saveCal: 50, saveMsg: "High protein, less fat", applies: ["cream", "dip"] },
  { from: "White Sugar Tea", to: "Green Tea", saveCal: 75, saveMsg: "Antioxidants, zero calories", applies: ["chai", "tea"] },
  { from: "Store Chutney", to: "Fresh Mint Chutney", saveCal: 20, saveMsg: "No preservatives, vitamin C", applies: ["chutney", "sauce"] }
];

function getSubstitutions(dish) {
  var nameLower = dish.name.toLowerCase();
  var applicable = substitutions.filter(function(sub) {
    return sub.applies.some(function(keyword) { return nameLower.includes(keyword); });
  });
  return applicable.map(function(sub) {
    return { from: sub.from, to: sub.to, saveCal: sub.saveCal, saveMsg: sub.saveMsg, allergenSwap: sub.allergenSwap || null };
  });
}

function handleSubstitutions(req, res) {
  var dishId = parseInt(req.params.id || req.query.id);
  var dish = dishes.find(function(d) { return d.id === dishId; });
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  var subs = getSubstitutions(dish);
  res.json({ dish: { id: dish.id, name: dish.name, cal: dish.cal }, substitutions: subs });
}

// ─── FEATURE 5: Portion Visualizer ─────────────────────────────────────────

const portionVisuals = {
  "1 bowl": { visual: "\uD83E\uDD32 Size of both palms cupped", grams: "200g", household: "1 standard katori" },
  "1 plate": { visual: "\uD83C\uDF7D\uFE0F Fills a regular dinner plate", grams: "250-300g", household: "1 dinner plate" },
  "1 roti": { visual: "\u270B Size of your open palm", grams: "30g dry / 40g cooked", household: "1 medium chapati" },
  "1 cup": { visual: "\u270A Size of your closed fist", grams: "150-200ml", household: "1 chai cup" },
  "1 tbsp": { visual: "\uD83D\uDC4D Size of your thumb tip", grams: "15g", household: "1 tablespoon" },
  "1 serving": { visual: "\uD83E\uDD1B Size of your fist", grams: "150-200g", household: "1 medium portion" },
  "2 pcs": { visual: "\u270C\uFE0F Two medium-sized pieces", grams: "varies", household: "2 pieces" },
  "3 pcs": { visual: "\uD83E\uDD1F Three pieces, palm-sized each", grams: "varies", household: "3 pieces" },
  "1 glass": { visual: "\uD83E\uDD64 Standard tall glass", grams: "200-250ml", household: "1 regular glass" },
  "1 slice": { visual: "\uD83D\uDCF1 Size of your phone", grams: "30-40g", household: "1 bread slice" },
  "1 pc": { visual: "\uD83D\uDD90\uFE0F Fits in one hand", grams: "varies", household: "1 piece" },
  "1 small bowl": { visual: "\uD83E\uDD32 One cupped palm", grams: "100g", household: "1 small katori" },
  "1 dosa": { visual: "\uD83D\uDCCF 10-12 inches diameter", grams: "60g batter", household: "1 full dosa" },
  "handful": { visual: "\u270A One closed fist", grams: "30-40g", household: "1 handful" }
};

function getPortionVisual(serving) {
  if (!serving) return null;
  var servingLower = serving.toLowerCase();
  // Try exact matches first
  for (var key in portionVisuals) {
    if (servingLower.includes(key)) {
      return portionVisuals[key];
    }
  }
  // Fallback matches
  if (servingLower.includes('bowl')) return portionVisuals['1 bowl'];
  if (servingLower.includes('plate')) return portionVisuals['1 plate'];
  if (servingLower.includes('glass')) return portionVisuals['1 glass'];
  if (servingLower.includes('cup')) return portionVisuals['1 cup'];
  if (servingLower.includes('dosa')) return portionVisuals['1 dosa'];
  if (servingLower.includes('pcs') || servingLower.includes('pieces')) return portionVisuals['2 pcs'];
  if (servingLower.includes('pc') || servingLower.includes('piece')) return portionVisuals['1 pc'];
  if (servingLower.includes('slice')) return portionVisuals['1 slice'];
  if (servingLower.includes('tbsp') || servingLower.includes('tablespoon')) return portionVisuals['1 tbsp'];
  return portionVisuals['1 serving'];
}

module.exports = {
  handleAnalyze,
  handleSearch,
  handleGetDish,
  handleCombos,
  handleComboAnalyze,
  handleSuggestions,
  handleAllDishes,
  searchDishes,
  analyzeThali,
  analyzeCombo,
  smartSuggestions,
  getDish,
  dishes,
  comboMeals,
  RDA,
  getRDAValue,
  estimateNutrients,
  ALL_MICRO_FIELDS,
  festivals, getUpcomingFestivals, getFestivalDishes, handleFestivals, handleFestivalDishes,
  nuskheRules, getNuskhe, handleNuskhe,
  generateGroceryList, handleGroceryList,
  // Feature 1: Prakriti
  prakritiQuiz, prakritiDietRules, determinePrakriti, getPrakritiDishes, handlePrakriti, handlePrakritiDishes,
  // Feature 2: Budget
  estimateDishCost, generateBudgetMealPlan, handleBudgetPlan,
  // Feature 3: Allergens
  allergenDatabase, tagDishAllergens, filterByAllergens,
  // Feature 4: Substitutions
  substitutions, getSubstitutions, handleSubstitutions,
  // Feature 5: Portion Visualizer
  portionVisuals, getPortionVisual,
};
