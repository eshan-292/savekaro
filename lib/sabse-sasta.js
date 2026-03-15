// SabseSasta - Grocery Price Comparator Backend
// 150+ products with realistic Indian market prices across 7 platforms

const PLATFORMS = ['Blinkit', 'Zepto', 'BigBasket', 'Swiggy Instamart', 'JioMart', 'Amazon Fresh', 'DMart'];

// ============================================================
// PRODUCT DATABASE — Realistic 2024-25 Indian prices (₹)
// Format: [Blinkit, Zepto, BigBasket, Swiggy Instamart, JioMart, Amazon Fresh, DMart]
// ============================================================
let _productIdCounter = 0;
function P(name, category, unit, prices, trend) {
  _productIdCounter++;
  return {
    id: _productIdCounter,
    name,
    category,
    unit,
    prices: Object.fromEntries(PLATFORMS.map((p, i) => [p, prices[i]])),
    trend: trend || 'stable', // 'up', 'down', 'stable'
  };
}

const PRODUCTS = [
  // ==================== ATTA / RICE ====================
  P('Aashirvaad Atta 5kg', 'atta-rice', '5 kg', [249, 255, 245, 252, 239, 248, 235], 'up'),
  P('Aashirvaad Atta 10kg', 'atta-rice', '10 kg', [479, 489, 469, 485, 459, 475, 449], 'up'),
  P('Pillsbury Atta 5kg', 'atta-rice', '5 kg', [235, 239, 229, 242, 225, 232, 219]),
  P('Fortune Chakki Fresh Atta 5kg', 'atta-rice', '5 kg', [228, 232, 222, 235, 219, 225, 215]),
  P('India Gate Basmati Rice 5kg', 'atta-rice', '5 kg', [549, 559, 535, 555, 525, 542, 515], 'up'),
  P('Daawat Rozana Basmati 5kg', 'atta-rice', '5 kg', [399, 409, 389, 405, 379, 395, 369]),
  P('India Gate Tibar Basmati 1kg', 'atta-rice', '1 kg', [179, 185, 175, 182, 169, 178, 165]),
  P('Loose Rice (Sona Masoori) 1kg', 'atta-rice', '1 kg', [52, 55, 48, 54, 45, 50, 42]),
  P('Kohinoor Basmati Rice 5kg', 'atta-rice', '5 kg', [589, 599, 579, 595, 565, 585, 555]),
  P('Fortune Biryani Rice 1kg', 'atta-rice', '1 kg', [135, 139, 129, 137, 125, 132, 122]),
  P('Aashirvaad Multigrain Atta 5kg', 'atta-rice', '5 kg', [315, 325, 305, 319, 299, 310, 289]),
  P('Saffola Atta 5kg', 'atta-rice', '5 kg', [289, 295, 279, 292, 275, 285, 265]),
  P('Poha (Flattened Rice) 500g', 'atta-rice', '500 g', [42, 45, 38, 44, 36, 40, 34]),
  P('Suji/Rava 500g', 'atta-rice', '500 g', [38, 40, 35, 39, 33, 37, 31]),
  P('Maida 1kg', 'atta-rice', '1 kg', [42, 45, 39, 43, 37, 41, 35]),
  P('Besan 500g', 'atta-rice', '500 g', [65, 68, 62, 67, 59, 64, 56]),

  // ==================== DAL / PULSES ====================
  P('Tata Toor Dal 1kg', 'dal-pulses', '1 kg', [175, 179, 169, 177, 165, 172, 159], 'up'),
  P('Tata Moong Dal 1kg', 'dal-pulses', '1 kg', [169, 175, 165, 172, 159, 168, 155]),
  P('Tata Masoor Dal 1kg', 'dal-pulses', '1 kg', [109, 115, 105, 112, 99, 108, 95]),
  P('Tata Chana Dal 1kg', 'dal-pulses', '1 kg', [119, 125, 115, 122, 109, 118, 105]),
  P('bb Popular Toor Dal 1kg', 'dal-pulses', '1 kg', [155, 159, 149, 157, 145, 152, 139]),
  P('bb Popular Moong Dal 1kg', 'dal-pulses', '1 kg', [149, 155, 145, 152, 139, 148, 135]),
  P('Loose Toor Dal 1kg', 'dal-pulses', '1 kg', [139, 145, 135, 142, 129, 138, 125], 'up'),
  P('Loose Chana Dal 1kg', 'dal-pulses', '1 kg', [99, 105, 95, 102, 89, 98, 85]),
  P('Rajma (Chitra) 500g', 'dal-pulses', '500 g', [89, 92, 85, 90, 82, 88, 79]),
  P('Kabuli Chana 500g', 'dal-pulses', '500 g', [79, 82, 75, 80, 72, 78, 69]),
  P('Urad Dal 1kg', 'dal-pulses', '1 kg', [159, 165, 155, 162, 149, 158, 145]),
  P('Chole (Kala Chana) 500g', 'dal-pulses', '500 g', [55, 59, 52, 57, 49, 54, 46]),
  P('Moong Sabut 500g', 'dal-pulses', '500 g', [95, 99, 89, 96, 85, 92, 82]),
  P('Yellow Peas 1kg', 'dal-pulses', '1 kg', [65, 69, 62, 67, 59, 64, 55]),

  // ==================== OIL / GHEE ====================
  P('Fortune Sunflower Oil 1L', 'oil-ghee', '1 L', [139, 145, 135, 142, 129, 138, 125]),
  P('Fortune Sunflower Oil 5L', 'oil-ghee', '5 L', [649, 665, 635, 655, 619, 642, 605], 'down'),
  P('Saffola Gold Oil 1L', 'oil-ghee', '1 L', [199, 205, 192, 202, 189, 196, 185]),
  P('Saffola Total Oil 1L', 'oil-ghee', '1 L', [185, 189, 179, 187, 175, 182, 169]),
  P('Mother Dairy Mustard Oil 1L', 'oil-ghee', '1 L', [169, 175, 165, 172, 159, 168, 155]),
  P('Fortune Mustard Oil 1L', 'oil-ghee', '1 L', [162, 168, 158, 165, 152, 160, 149]),
  P('Amul Ghee 1kg', 'oil-ghee', '1 kg', [659, 669, 649, 665, 639, 655, 629], 'up'),
  P('Amul Ghee 500ml', 'oil-ghee', '500 ml', [345, 352, 339, 349, 332, 342, 325]),
  P('Patanjali Cow Ghee 1kg', 'oil-ghee', '1 kg', [599, 609, 589, 605, 579, 595, 569]),
  P('Fortune Refined Soyabean Oil 1L', 'oil-ghee', '1 L', [122, 128, 118, 125, 115, 120, 109]),
  P('Dhara Mustard Oil 1L', 'oil-ghee', '1 L', [158, 162, 152, 160, 148, 155, 142]),
  P('Sundrop Heart Oil 1L', 'oil-ghee', '1 L', [169, 175, 165, 172, 159, 168, 155]),
  P('Olive Oil (Borges) 500ml', 'oil-ghee', '500 ml', [449, 459, 439, 455, 429, 445, 419]),
  P('Coconut Oil (Parachute) 500ml', 'oil-ghee', '500 ml', [119, 125, 115, 122, 109, 118, 105]),

  // ==================== DAIRY ====================
  P('Amul Toned Milk 1L', 'dairy', '1 L', [60, 62, 58, 61, 56, 59, 54]),
  P('Mother Dairy Toned Milk 1L', 'dairy', '1 L', [58, 60, 56, 59, 54, 57, 52]),
  P('Amul Full Cream Milk 1L', 'dairy', '1 L', [72, 75, 70, 74, 68, 71, 66]),
  P('Amul Gold Milk 1L', 'dairy', '1 L', [68, 70, 66, 69, 64, 67, 62]),
  P('Amul Taaza Buttermilk 1L', 'dairy', '1 L', [30, 32, 28, 31, 25, 29, 24]),
  P('Amul Butter 500g', 'dairy', '500 g', [280, 289, 275, 285, 269, 278, 265], 'up'),
  P('Amul Butter 100g', 'dairy', '100 g', [57, 59, 55, 58, 52, 56, 50]),
  P('Amul Cheese Slices 200g', 'dairy', '200 g', [120, 125, 115, 122, 110, 118, 105]),
  P('Amul Cheese Block 200g', 'dairy', '200 g', [105, 109, 99, 107, 95, 102, 92]),
  P('Amul Paneer 200g', 'dairy', '200 g', [95, 99, 89, 97, 85, 92, 82]),
  P('Amul Paneer 1kg', 'dairy', '1 kg', [415, 425, 399, 419, 389, 409, 379]),
  P('Mother Dairy Dahi 400g', 'dairy', '400 g', [35, 37, 33, 36, 30, 34, 29]),
  P('Amul Masti Dahi 1kg', 'dairy', '1 kg', [79, 82, 75, 80, 72, 78, 69]),
  P('Amul Fresh Cream 250ml', 'dairy', '250 ml', [65, 68, 62, 67, 59, 64, 56]),
  P('Mother Dairy Mishti Doi 85g', 'dairy', '85 g', [25, 27, 23, 26, 22, 24, 20]),

  // ==================== SUGAR / SALT / TEA / COFFEE ====================
  P('Sugar 1kg', 'staples', '1 kg', [49, 52, 46, 50, 44, 48, 42]),
  P('Sugar 5kg', 'staples', '5 kg', [229, 239, 219, 235, 209, 225, 199]),
  P('Tata Salt 1kg', 'staples', '1 kg', [28, 30, 26, 29, 24, 27, 22]),
  P('Tata Rock Salt 1kg', 'staples', '1 kg', [35, 38, 32, 36, 30, 34, 28]),
  P('Tata Tea Gold 500g', 'staples', '500 g', [285, 292, 279, 289, 272, 282, 265], 'up'),
  P('Tata Tea Premium 500g', 'staples', '500 g', [210, 219, 205, 215, 199, 208, 192]),
  P('Red Label Tea 500g', 'staples', '500 g', [255, 262, 249, 259, 242, 252, 235]),
  P('Brooke Bond Taj Mahal 250g', 'staples', '250 g', [209, 215, 205, 212, 199, 207, 195]),
  P('Nescafe Classic Coffee 100g', 'staples', '100 g', [305, 312, 298, 308, 289, 302, 285]),
  P('Bru Instant Coffee 100g', 'staples', '100 g', [245, 252, 239, 249, 232, 242, 225]),
  P('Tata Coffee Grand 100g', 'staples', '100 g', [259, 265, 252, 262, 245, 255, 239]),

  // ==================== SPICES ====================
  P('MDH Haldi Powder 100g', 'spices', '100 g', [52, 55, 49, 53, 46, 51, 44]),
  P('MDH Lal Mirch 100g', 'spices', '100 g', [72, 75, 68, 73, 65, 70, 62]),
  P('MDH Dhania Powder 100g', 'spices', '100 g', [49, 52, 46, 50, 44, 48, 41]),
  P('MDH Garam Masala 100g', 'spices', '100 g', [95, 99, 89, 96, 85, 92, 82]),
  P('MDH Chana Masala 100g', 'spices', '100 g', [65, 68, 62, 67, 59, 64, 56]),
  P('Everest Haldi 100g', 'spices', '100 g', [48, 52, 45, 50, 42, 47, 39]),
  P('Everest Lal Mirch 100g', 'spices', '100 g', [68, 72, 65, 70, 62, 67, 58]),
  P('Everest Garam Masala 100g', 'spices', '100 g', [89, 92, 85, 90, 82, 88, 78]),
  P('Catch Jeera Powder 100g', 'spices', '100 g', [79, 82, 75, 80, 72, 78, 69]),
  P('Black Pepper 50g', 'spices', '50 g', [85, 89, 79, 87, 75, 82, 72]),
  P('Cumin Seeds (Jeera) 100g', 'spices', '100 g', [109, 115, 105, 112, 99, 108, 95]),

  // ==================== SNACKS ====================
  P('Lays Classic Salted 52g', 'snacks', '52 g', [20, 20, 20, 20, 20, 20, 20]),
  P('Lays Magic Masala 115g', 'snacks', '115 g', [40, 40, 40, 40, 40, 40, 40]),
  P('Kurkure Masala Munch 94g', 'snacks', '94 g', [30, 30, 30, 30, 30, 30, 30]),
  P('Haldiram Aloo Bhujia 200g', 'snacks', '200 g', [75, 78, 72, 76, 69, 74, 67]),
  P('Haldiram Moong Dal 200g', 'snacks', '200 g', [69, 72, 65, 70, 62, 68, 59]),
  P('Haldiram Namkeen Mix 200g', 'snacks', '200 g', [72, 75, 69, 74, 65, 71, 62]),
  P('Parle-G Gold 1kg', 'snacks', '1 kg', [105, 109, 99, 107, 95, 102, 89]),
  P('Parle-G 800g', 'snacks', '800 g', [68, 72, 65, 70, 62, 67, 58]),
  P('Britannia Good Day Butter 250g', 'snacks', '250 g', [45, 47, 42, 46, 40, 44, 38]),
  P('Britannia Marie Gold 250g', 'snacks', '250 g', [38, 40, 36, 39, 34, 37, 32]),
  P('Oreo Original 120g', 'snacks', '120 g', [30, 30, 30, 30, 30, 30, 30]),
  P('Hide & Seek 200g', 'snacks', '200 g', [42, 45, 39, 43, 37, 41, 35]),
  P('Bingo Mad Angles 72.5g', 'snacks', '72.5 g', [20, 20, 20, 20, 20, 20, 20]),
  P('Maggi Hot & Sweet Ketchup 1kg', 'snacks', '1 kg', [199, 205, 192, 202, 185, 196, 179]),

  // ==================== BEVERAGES ====================
  P('Coca Cola 750ml', 'beverages', '750 ml', [38, 40, 38, 40, 38, 38, 35]),
  P('Coca Cola 2L', 'beverages', '2 L', [92, 95, 89, 94, 85, 90, 82]),
  P('Pepsi 750ml', 'beverages', '750 ml', [38, 40, 38, 40, 38, 38, 35]),
  P('Thums Up 750ml', 'beverages', '750 ml', [38, 40, 38, 40, 38, 38, 35]),
  P('Sprite 750ml', 'beverages', '750 ml', [38, 40, 38, 40, 38, 38, 35]),
  P('Real Juice Mixed Fruit 1L', 'beverages', '1 L', [105, 109, 99, 107, 95, 102, 89]),
  P('Real Juice Mango 1L', 'beverages', '1 L', [105, 109, 99, 107, 95, 102, 89]),
  P('Paper Boat Aam Panna 200ml', 'beverages', '200 ml', [30, 32, 28, 31, 26, 29, 25]),
  P('Tropicana Orange 1L', 'beverages', '1 L', [109, 115, 105, 112, 99, 108, 95]),
  P('Bisleri Water 1L', 'beverages', '1 L', [22, 22, 20, 22, 20, 20, 20]),
  P('Bisleri Water 5L', 'beverages', '5 L', [62, 65, 58, 63, 55, 60, 52]),

  // ==================== PERSONAL CARE ====================
  P('Dove Soap 100g', 'personal-care', '100 g', [55, 58, 52, 56, 49, 54, 46]),
  P('Dove Soap (3x100g)', 'personal-care', '3 x 100 g', [189, 195, 185, 192, 179, 188, 175]),
  P('Lux Soap 150g', 'personal-care', '150 g', [42, 45, 39, 43, 37, 41, 35]),
  P('Dettol Soap (3x125g)', 'personal-care', '3 x 125 g', [145, 149, 139, 147, 135, 142, 129]),
  P('Head & Shoulders Shampoo 340ml', 'personal-care', '340 ml', [285, 292, 278, 289, 269, 282, 259]),
  P('Dove Shampoo 340ml', 'personal-care', '340 ml', [275, 282, 269, 279, 259, 272, 249]),
  P('Clinic Plus Shampoo 340ml', 'personal-care', '340 ml', [175, 179, 169, 177, 162, 172, 155]),
  P('Colgate MaxFresh 150g', 'personal-care', '150 g', [99, 102, 95, 100, 89, 96, 85]),
  P('Colgate Strong Teeth 200g', 'personal-care', '200 g', [95, 98, 89, 96, 85, 92, 82]),
  P('Pepsodent 200g', 'personal-care', '200 g', [82, 85, 78, 84, 75, 80, 72]),
  P('Lifebuoy Handwash 190ml', 'personal-care', '190 ml', [79, 82, 75, 80, 72, 78, 69]),
  P('Dettol Handwash 200ml', 'personal-care', '200 ml', [89, 92, 85, 90, 82, 88, 79]),
  P('Nivea Body Lotion 400ml', 'personal-care', '400 ml', [289, 299, 279, 292, 269, 285, 259]),
  P('Vaseline Body Lotion 400ml', 'personal-care', '400 ml', [249, 255, 242, 252, 235, 245, 229]),

  // ==================== CLEANING ====================
  P('Surf Excel Easy Wash 1.5kg', 'cleaning', '1.5 kg', [199, 205, 192, 202, 185, 196, 179]),
  P('Surf Excel Matic Top Load 2kg', 'cleaning', '2 kg', [389, 399, 379, 395, 369, 385, 355]),
  P('Tide Plus 1kg', 'cleaning', '1 kg', [99, 102, 95, 100, 89, 96, 85]),
  P('Ariel Matic 1kg', 'cleaning', '1 kg', [215, 222, 209, 219, 199, 212, 195]),
  P('Vim Dishwash Gel 500ml', 'cleaning', '500 ml', [99, 102, 95, 100, 89, 96, 85]),
  P('Vim Dishwash Bar 300g', 'cleaning', '300 g', [32, 35, 29, 33, 27, 31, 25]),
  P('Harpic Disinfectant 1L', 'cleaning', '1 L', [155, 159, 149, 157, 145, 152, 139]),
  P('Lizol Floor Cleaner 975ml', 'cleaning', '975 ml', [159, 165, 155, 162, 149, 158, 145]),
  P('Colin Glass Cleaner 500ml', 'cleaning', '500 ml', [105, 109, 99, 107, 95, 102, 89]),
  P('Domex Toilet Cleaner 1L', 'cleaning', '1 L', [109, 115, 105, 112, 99, 108, 95]),
  P('Pril Dishwash Liquid 500ml', 'cleaning', '500 ml', [109, 112, 105, 110, 99, 108, 95]),
  P('Scotch-Brite Scrub Pad (3pc)', 'cleaning', '3 pc', [45, 48, 42, 46, 39, 44, 37]),

  // ==================== EGGS / BREAD / INSTANT ====================
  P('Eggs (10 pcs)', 'essentials', '10 pcs', [72, 75, 68, 73, 65, 70, 62], 'down'),
  P('Eggs (30 pcs) Tray', 'essentials', '30 pcs', [199, 205, 189, 202, 179, 195, 175], 'down'),
  P('Britannia Bread (White) 400g', 'essentials', '400 g', [40, 42, 38, 41, 36, 39, 34]),
  P('Britannia Bread (Brown) 400g', 'essentials', '400 g', [45, 48, 42, 46, 40, 44, 38]),
  P('Maggi 2-Minute Noodles (12 pack)', 'essentials', '12 pack', [168, 175, 162, 170, 155, 165, 149]),
  P('Maggi 2-Minute Noodles (4 pack)', 'essentials', '4 pack', [56, 58, 52, 57, 49, 54, 46]),
  P('Yippee Noodles (4 pack)', 'essentials', '4 pack', [52, 55, 49, 53, 46, 51, 44]),
  P('Knorr Soupy Noodles 4 pack', 'essentials', '4 pack', [72, 75, 68, 73, 65, 70, 62]),
  P('Top Ramen (4 pack)', 'essentials', '4 pack', [52, 55, 49, 53, 46, 51, 44]),
  P('MTR Ready to Eat Poha 300g', 'essentials', '300 g', [89, 92, 85, 90, 82, 88, 79]),
  P('MTR Rava Idli Mix 500g', 'essentials', '500 g', [105, 109, 99, 107, 95, 102, 89]),
  P('Saffola Oats 1kg', 'essentials', '1 kg', [175, 179, 169, 177, 165, 172, 159]),
  P('Quaker Oats 1kg', 'essentials', '1 kg', [199, 205, 192, 202, 185, 196, 179]),
  P('Kelloggs Corn Flakes 475g', 'essentials', '475 g', [215, 222, 209, 218, 199, 212, 195]),
  P('Kelloggs Chocos 375g', 'essentials', '375 g', [199, 205, 192, 202, 185, 196, 179]),

  // ==================== ADDITIONAL STAPLES ====================
  P('Jaggery (Gur) 500g', 'staples', '500 g', [55, 58, 52, 56, 49, 54, 46]),
  P('Honey (Dabur) 500g', 'staples', '500 g', [245, 252, 239, 249, 232, 242, 229]),
  P('Baking Soda 100g', 'staples', '100 g', [22, 25, 19, 23, 18, 21, 16]),
  P('Vinegar 500ml', 'staples', '500 ml', [39, 42, 36, 40, 34, 38, 32]),
  P('Tomato Ketchup (Kissan) 950g', 'staples', '950 g', [149, 155, 142, 152, 135, 145, 129]),
  P('Soy Sauce (Chings) 210ml', 'staples', '210 ml', [65, 68, 62, 67, 59, 64, 56]),
  P('Peanut Butter (Pintola) 350g', 'staples', '350 g', [235, 242, 229, 238, 222, 232, 219]),

  // ==================== MORE DAIRY PRODUCTS ====================
  P('Amul Lassi 200ml (5 pack)', 'dairy', '5 x 200 ml', [105, 109, 99, 107, 95, 102, 89]),
  P('Epigamia Greek Yogurt 90g', 'dairy', '90 g', [45, 48, 42, 46, 39, 44, 37]),
  P('Nestle Milkmaid 400g', 'dairy', '400 g', [159, 165, 155, 162, 149, 158, 145]),
  P('Amul Ice Cream Vanilla 750ml', 'dairy', '750 ml', [185, 192, 179, 189, 172, 182, 169]),
  P('Amul Spray Powder 500g', 'dairy', '500 g', [265, 272, 259, 269, 252, 262, 245]),

  // ==================== ADDITIONAL BEVERAGES & SNACKS ====================
  P('Frooti Mango Drink 1L', 'beverages', '1 L', [75, 78, 72, 76, 69, 74, 67]),
  P('Maaza 1.2L', 'beverages', '1.2 L', [75, 78, 72, 76, 69, 74, 67]),
  P('Red Bull 250ml', 'beverages', '250 ml', [115, 115, 110, 115, 105, 112, 105]),
  P('Sting Energy 250ml', 'beverages', '250 ml', [20, 20, 20, 20, 20, 20, 20]),
  P('Horlicks 500g', 'beverages', '500 g', [269, 275, 262, 272, 255, 265, 249]),
  P('Bournvita 500g', 'beverages', '500 g', [229, 235, 222, 232, 215, 225, 209]),

  P('Bikano Bhujia 200g', 'snacks', '200 g', [65, 69, 62, 67, 59, 64, 56]),
  P('Act II Popcorn 70g', 'snacks', '70 g', [40, 40, 40, 40, 40, 40, 40]),
  P('Too Yumm Multigrain Chips 54g', 'snacks', '54 g', [20, 20, 20, 20, 20, 20, 20]),
  P('Cadbury Dairy Milk Silk 150g', 'snacks', '150 g', [170, 175, 165, 172, 162, 168, 159]),
  P('KitKat (Pack of 4)', 'snacks', '4 pack', [40, 40, 40, 40, 40, 40, 40]),
  P('5 Star 40g', 'snacks', '40 g', [20, 20, 20, 20, 20, 20, 20]),
];

// ============================================================
// CATEGORIES
// ============================================================
const CATEGORIES = [
  { id: 'atta-rice', name: 'Atta & Rice', icon: '🌾' },
  { id: 'dal-pulses', name: 'Dal & Pulses', icon: '🫘' },
  { id: 'oil-ghee', name: 'Oil & Ghee', icon: '🫗' },
  { id: 'dairy', name: 'Dairy', icon: '🥛' },
  { id: 'staples', name: 'Sugar, Tea & Staples', icon: '☕' },
  { id: 'spices', name: 'Spices & Masala', icon: '🌶️' },
  { id: 'snacks', name: 'Snacks & Biscuits', icon: '🍪' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
  { id: 'cleaning', name: 'Cleaning & Household', icon: '🧹' },
  { id: 'essentials', name: 'Essentials & Instant Food', icon: '🥚' },
];

// ============================================================
// SEARCH
// ============================================================
function searchProducts(query) {
  if (!query || query.trim().length === 0) return PRODUCTS.slice(0, 20);
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);
  const results = PRODUCTS.filter(p => {
    const haystack = (p.name + ' ' + p.category + ' ' + p.unit).toLowerCase();
    return terms.every(t => haystack.includes(t));
  });
  return results;
}

// ============================================================
// GET BY CATEGORY
// ============================================================
function getByCategory(categoryId) {
  if (!categoryId) return PRODUCTS;
  return PRODUCTS.filter(p => p.category === categoryId);
}

// ============================================================
// GET PRODUCT BY ID
// ============================================================
function getProductById(id) {
  const numId = parseInt(id);
  const product = PRODUCTS.find(p => p.id === numId);
  if (!product) return null;

  // Find cheapest & most expensive
  const entries = Object.entries(product.prices);
  entries.sort((a, b) => a[1] - b[1]);
  const cheapest = entries[0];
  const expensive = entries[entries.length - 1];

  return {
    ...product,
    cheapestPlatform: cheapest[0],
    cheapestPrice: cheapest[1],
    expensivePlatform: expensive[0],
    expensivePrice: expensive[1],
    saving: expensive[1] - cheapest[1],
  };
}

// ============================================================
// COMPARE CART — finds optimal split across platforms
// ============================================================
function compareCart(cartItems) {
  // cartItems = [{ productId, quantity }]
  if (!cartItems || cartItems.length === 0) {
    return { error: 'Cart is empty' };
  }

  // Resolve products
  const items = cartItems.map(ci => {
    const product = PRODUCTS.find(p => p.id === parseInt(ci.productId));
    return product ? { ...product, qty: parseInt(ci.quantity) || 1 } : null;
  }).filter(Boolean);

  if (items.length === 0) return { error: 'No valid products in cart' };

  // Platform totals
  const platformTotals = {};
  PLATFORMS.forEach(p => { platformTotals[p] = 0; });

  const itemDetails = items.map(item => {
    const row = { name: item.name, qty: item.qty, unit: item.unit, prices: {} };
    let minPrice = Infinity, minPlatform = '';
    PLATFORMS.forEach(p => {
      const lineTotal = item.prices[p] * item.qty;
      row.prices[p] = lineTotal;
      platformTotals[p] += lineTotal;
      if (item.prices[p] < minPrice) {
        minPrice = item.prices[p];
        minPlatform = p;
      }
    });
    row.cheapest = minPlatform;
    row.cheapestTotal = minPrice * item.qty;
    return row;
  });

  // Find single best platform
  const sorted = Object.entries(platformTotals).sort((a, b) => a[1] - b[1]);
  const bestSinglePlatform = sorted[0][0];
  const bestSingleTotal = sorted[0][1];
  const worstTotal = sorted[sorted.length - 1][1];

  // Optimal split: buy each item from cheapest platform
  const splitPlan = {};
  let splitTotal = 0;
  itemDetails.forEach(item => {
    const platform = item.cheapest;
    if (!splitPlan[platform]) splitPlan[platform] = { items: [], subtotal: 0 };
    splitPlan[platform].items.push({ name: item.name, qty: item.qty, cost: item.cheapestTotal });
    splitPlan[platform].subtotal += item.cheapestTotal;
    splitTotal += item.cheapestTotal;
  });

  // If splitting across too many platforms (>3), consolidate small orders
  const platformCount = Object.keys(splitPlan).length;
  let practicalSplit = splitPlan;
  let practicalTotal = splitTotal;

  if (platformCount > 3) {
    // Keep top 2 platforms by item count, move rest to best single
    const byItemCount = Object.entries(splitPlan).sort((a, b) => b[1].items.length - a[1].items.length);
    const keepPlatforms = new Set(byItemCount.slice(0, 2).map(e => e[0]));
    practicalSplit = {};
    practicalTotal = 0;

    itemDetails.forEach(item => {
      let platform = item.cheapest;
      if (!keepPlatforms.has(platform)) platform = bestSinglePlatform;
      if (!practicalSplit[platform]) practicalSplit[platform] = { items: [], subtotal: 0 };
      const cost = item.prices[platform] || item.cheapestTotal;
      practicalSplit[platform].items.push({ name: item.name, qty: item.qty, cost });
      practicalSplit[platform].subtotal += cost;
      practicalTotal += cost;
    });
  }

  // Build recommendation text
  const splitEntries = Object.entries(practicalSplit);
  let recommendation = '';
  if (splitEntries.length === 1) {
    recommendation = `Buy everything from ${splitEntries[0][0]} for the best price.`;
  } else {
    const parts = splitEntries.map(([plat, data]) => {
      const itemNames = data.items.map(i => i.name).slice(0, 3).join(', ');
      const more = data.items.length > 3 ? ` +${data.items.length - 3} more` : '';
      return `${itemNames}${more} from ${plat} (₹${data.subtotal})`;
    });
    recommendation = 'Buy ' + parts.join(', ') + ` → Total: ₹${practicalTotal}`;
  }

  return {
    itemCount: items.length,
    platformTotals,
    bestSinglePlatform,
    bestSingleTotal,
    worstTotal,
    savingVsWorst: worstTotal - bestSingleTotal,
    optimalSplitTotal: splitTotal,
    practicalSplitTotal: practicalTotal,
    practicalSplit,
    savingWithSplit: bestSingleTotal - practicalTotal,
    recommendation,
    items: itemDetails,
    platforms: PLATFORMS,
  };
}

// ============================================================
// EXPRESS ROUTE HANDLERS
// ============================================================
function handleSearch(req, res) {
  const q = req.query.q || '';
  const results = searchProducts(q);
  res.json({ success: true, data: results, count: results.length });
}

function handleCategories(req, res) {
  const withCounts = CATEGORIES.map(c => ({
    ...c,
    count: PRODUCTS.filter(p => p.category === c.id).length,
  }));
  res.json({ success: true, data: withCounts });
}

function handleCompareCart(req, res) {
  const cartItems = req.body.items || [];
  const result = compareCart(cartItems);
  if (result.error) return res.status(400).json({ success: false, error: result.error });
  res.json({ success: true, data: result });
}

function handleGetProduct(req, res) {
  const id = req.params.id;
  const product = getProductById(id);
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: product });
}

function handleGetCategoryProducts(req, res) {
  const catId = req.params.categoryId || req.query.category;
  const products = getByCategory(catId);
  res.json({ success: true, data: products, count: products.length });
}

// ============================================================
// EXPORTS
// ============================================================
module.exports = {
  PRODUCTS,
  PLATFORMS,
  CATEGORIES,
  searchProducts,
  getByCategory,
  getProductById,
  compareCart,
  handleSearch,
  handleCategories,
  handleCompareCart,
  handleGetProduct,
  handleGetCategoryProducts,
};
