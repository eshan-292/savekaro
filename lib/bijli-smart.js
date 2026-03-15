// BijliSmart - AI Electricity Bill Optimizer Backend
// Comprehensive appliance database, state tariffs, and optimization engine

// ============================================================
// APPLIANCE POWER CONSUMPTION DATABASE (Watts)
// ============================================================
const APPLIANCES = {
  ac: {
    '1ton_3star': { watts: 1100, label: '1 Ton 3-Star AC' },
    '1ton_5star': { watts: 800, label: '1 Ton 5-Star AC' },
    '1.5ton_3star': { watts: 1600, label: '1.5 Ton 3-Star AC' },
    '1.5ton_5star': { watts: 1150, label: '1.5 Ton 5-Star AC' },
    '2ton_3star': { watts: 2200, label: '2 Ton 3-Star AC' },
    '2ton_5star': { watts: 1600, label: '2 Ton 5-Star AC' },
  },
  fan: {
    regular: { watts: 75, label: 'Regular Ceiling Fan' },
    bldc: { watts: 28, label: 'BLDC Ceiling Fan' },
  },
  light: {
    led_9w: { watts: 9, label: '9W LED Bulb' },
    led_12w: { watts: 12, label: '12W LED Bulb' },
    cfl: { watts: 23, label: 'CFL Bulb' },
    tubelight: { watts: 36, label: 'Tube Light' },
    tubelight_led: { watts: 18, label: 'LED Tube Light' },
  },
  refrigerator: {
    single_3star: { watts: 55, label: 'Single Door 3-Star (runs ~8h/day effective)', hoursOverride: 8 },
    single_5star: { watts: 40, label: 'Single Door 5-Star', hoursOverride: 8 },
    double_3star: { watts: 80, label: 'Double Door 3-Star', hoursOverride: 10 },
    double_5star: { watts: 60, label: 'Double Door 5-Star', hoursOverride: 10 },
    sidebyside: { watts: 120, label: 'Side-by-Side', hoursOverride: 12 },
  },
  geyser: {
    instant: { watts: 3000, label: 'Instant Geyser' },
    storage_15l: { watts: 2000, label: '15L Storage Geyser' },
    storage_25l: { watts: 2000, label: '25L Storage Geyser' },
  },
  washingMachine: {
    semi_auto: { watts: 350, label: 'Semi-Automatic', cycleMinutes: 45 },
    top_load: { watts: 500, label: 'Top Load Fully-Auto', cycleMinutes: 55 },
    front_load: { watts: 500, label: 'Front Load Fully-Auto', cycleMinutes: 60 },
  },
  tv: {
    led_32: { watts: 35, label: '32" LED TV' },
    led_43: { watts: 60, label: '43" LED TV' },
    led_55: { watts: 80, label: '55" LED TV' },
  },
  microwave: { watts: 1200, label: 'Microwave Oven' },
  iron: { watts: 1000, label: 'Electric Iron' },
  waterPurifier: { watts: 25, label: 'RO Water Purifier' },
  router: { watts: 12, label: 'WiFi Router' },
  computer: { watts: 150, label: 'Desktop Computer' },
  laptop: { watts: 50, label: 'Laptop' },
  exhaust_fan: { watts: 40, label: 'Exhaust Fan' },
  cooler: { watts: 200, label: 'Air Cooler' },
  induction: { watts: 1800, label: 'Induction Cooktop' },
};

// ============================================================
// STATE-WISE ELECTRICITY TARIFF SLABS (₹/kWh) — 2024-25
// ============================================================
const STATE_TARIFFS = {
  delhi: {
    name: 'Delhi (BSES/Tata Power)',
    slabs: [
      { upto: 200, rate: 3.0, fixed: 20 },
      { upto: 400, rate: 4.5, fixed: 40 },
      { upto: 800, rate: 6.5, fixed: 80 },
      { upto: 1200, rate: 7.0, fixed: 100 },
      { upto: Infinity, rate: 8.0, fixed: 150 },
    ],
    subsidyNote: 'Delhi govt gives free electricity up to 200 units.',
    avgSolarIrradiance: 5.2,
  },
  maharashtra: {
    name: 'Maharashtra (MSEDCL)',
    slabs: [
      { upto: 100, rate: 3.91, fixed: 70 },
      { upto: 300, rate: 7.86, fixed: 115 },
      { upto: 500, rate: 10.09, fixed: 145 },
      { upto: Infinity, rate: 12.14, fixed: 175 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 5.5,
  },
  karnataka: {
    name: 'Karnataka (BESCOM)',
    slabs: [
      { upto: 50, rate: 4.10, fixed: 35 },
      { upto: 100, rate: 5.45, fixed: 50 },
      { upto: 200, rate: 6.90, fixed: 65 },
      { upto: 500, rate: 8.15, fixed: 80 },
      { upto: Infinity, rate: 9.15, fixed: 100 },
    ],
    subsidyNote: 'Karnataka gives free up to 40 units under Gruha Jyoti.',
    avgSolarIrradiance: 5.6,
  },
  tamilnadu: {
    name: 'Tamil Nadu (TANGEDCO)',
    slabs: [
      { upto: 100, rate: 0, fixed: 0 },
      { upto: 200, rate: 2.25, fixed: 20 },
      { upto: 500, rate: 4.60, fixed: 30 },
      { upto: Infinity, rate: 6.60, fixed: 50 },
    ],
    subsidyNote: 'TN gives free electricity up to 100 units.',
    avgSolarIrradiance: 5.4,
  },
  up: {
    name: 'Uttar Pradesh (UPPCL)',
    slabs: [
      { upto: 150, rate: 3.50, fixed: 40 },
      { upto: 300, rate: 4.50, fixed: 60 },
      { upto: 500, rate: 5.50, fixed: 80 },
      { upto: Infinity, rate: 7.00, fixed: 100 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 5.0,
  },
  gujarat: {
    name: 'Gujarat (UGVCL/PGVCL)',
    slabs: [
      { upto: 50, rate: 3.05, fixed: 15 },
      { upto: 100, rate: 3.50, fixed: 25 },
      { upto: 250, rate: 4.65, fixed: 35 },
      { upto: 500, rate: 5.70, fixed: 50 },
      { upto: Infinity, rate: 6.50, fixed: 60 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 5.8,
  },
  rajasthan: {
    name: 'Rajasthan (JVVNL)',
    slabs: [
      { upto: 50, rate: 4.75, fixed: 65 },
      { upto: 150, rate: 6.50, fixed: 100 },
      { upto: 300, rate: 7.00, fixed: 130 },
      { upto: 500, rate: 7.75, fixed: 160 },
      { upto: Infinity, rate: 8.50, fixed: 200 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 6.0,
  },
  mp: {
    name: 'Madhya Pradesh (MPPKVVCL)',
    slabs: [
      { upto: 100, rate: 3.70, fixed: 50 },
      { upto: 200, rate: 5.35, fixed: 80 },
      { upto: 500, rate: 6.60, fixed: 120 },
      { upto: Infinity, rate: 7.20, fixed: 150 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 5.3,
  },
  telangana: {
    name: 'Telangana (TSSPDCL)',
    slabs: [
      { upto: 50, rate: 1.95, fixed: 15 },
      { upto: 100, rate: 3.10, fixed: 25 },
      { upto: 200, rate: 4.80, fixed: 40 },
      { upto: 300, rate: 6.40, fixed: 55 },
      { upto: 500, rate: 7.80, fixed: 70 },
      { upto: Infinity, rate: 9.50, fixed: 80 },
    ],
    subsidyNote: 'Telangana provides free up to 200 units for eligible households.',
    avgSolarIrradiance: 5.5,
  },
  kerala: {
    name: 'Kerala (KSEB)',
    slabs: [
      { upto: 50, rate: 3.15, fixed: 25 },
      { upto: 100, rate: 3.70, fixed: 40 },
      { upto: 200, rate: 4.80, fixed: 50 },
      { upto: 300, rate: 6.40, fixed: 65 },
      { upto: 500, rate: 7.60, fixed: 85 },
      { upto: Infinity, rate: 8.50, fixed: 100 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 4.6,
  },
  westbengal: {
    name: 'West Bengal (WBSEDCL)',
    slabs: [
      { upto: 102, rate: 5.18, fixed: 35 },
      { upto: 180, rate: 6.21, fixed: 55 },
      { upto: 300, rate: 6.94, fixed: 75 },
      { upto: 600, rate: 7.84, fixed: 100 },
      { upto: Infinity, rate: 8.64, fixed: 120 },
    ],
    subsidyNote: '',
    avgSolarIrradiance: 4.8,
  },
};

// ============================================================
// HELPER: Calculate bill from tariff slabs
// ============================================================
function calculateBillFromUnits(units, state) {
  const tariff = STATE_TARIFFS[state];
  if (!tariff) return { amount: units * 6, breakdown: [] };

  let remaining = units;
  let total = 0;
  let prevUpto = 0;
  const breakdown = [];

  for (const slab of tariff.slabs) {
    const slabWidth = slab.upto === Infinity ? remaining : slab.upto - prevUpto;
    const unitsInSlab = Math.min(remaining, slabWidth);
    if (unitsInSlab <= 0) break;

    const cost = unitsInSlab * slab.rate;
    total += cost;
    breakdown.push({
      range: `${prevUpto + 1}-${slab.upto === Infinity ? prevUpto + unitsInSlab : slab.upto}`,
      units: unitsInSlab,
      rate: slab.rate,
      cost: Math.round(cost),
    });
    remaining -= unitsInSlab;
    prevUpto = slab.upto === Infinity ? prevUpto + unitsInSlab : slab.upto;
    if (remaining <= 0) break;
  }

  // Add fixed charges for the applicable slab
  let fixedCharge = 0;
  let lastPrev = 0;
  for (const slab of tariff.slabs) {
    if (units <= slab.upto || slab.upto === Infinity) {
      fixedCharge = slab.fixed;
      break;
    }
    lastPrev = slab.upto;
  }
  total += fixedCharge;

  return { amount: Math.round(total), fixedCharge, breakdown };
}

// ============================================================
// HELPER: Effective rate per unit for a given state and usage
// ============================================================
function effectiveRate(units, state) {
  const bill = calculateBillFromUnits(units, state);
  return units > 0 ? bill.amount / units : 5;
}

// ============================================================
// MAIN ANALYSIS FUNCTION
// ============================================================
function analyze(data) {
  const {
    state = 'delhi',
    monthlyBill = 0,
    unitsConsumed = 0,
    acCount = 0,
    acType = '1.5ton_3star',
    acHours = 8,
    fanCount = 3,
    fanType = 'regular',
    fanHours = 12,
    lightCount = 8,
    lightType = 'led_9w',
    lightHours = 6,
    geyserType = 'storage_15l',
    geyserMinutes = 30,
    hasGeyser = false,
    fridgeType = 'double_3star',
    hasFridge = true,
    wmType = 'top_load',
    wmLoadsPerWeek = 3,
    hasWM = false,
    houseSize = '2bhk',
    familySize = 4,
    tvType = 'led_43',
    tvHours = 4,
    hasTV = true,
  } = data;

  const units = parseInt(unitsConsumed) || 300;
  const bill = parseInt(monthlyBill) || 0;
  const rate = effectiveRate(units, state);
  const tariff = STATE_TARIFFS[state] || STATE_TARIFFS.delhi;

  // ----- Appliance-wise consumption (kWh/month) -----
  const applianceBreakdown = [];
  let totalEstimatedUnits = 0;

  // ACs
  const acCountN = parseInt(acCount) || 0;
  if (acCountN > 0) {
    const acSpec = APPLIANCES.ac[acType] || APPLIANCES.ac['1.5ton_3star'];
    const acUnits = (acSpec.watts * parseFloat(acHours) * 30 * acCountN) / 1000;
    applianceBreakdown.push({ name: 'Air Conditioner(s)', units: Math.round(acUnits), cost: Math.round(acUnits * rate), icon: 'ac' });
    totalEstimatedUnits += acUnits;
  }

  // Fans
  const fanCountN = parseInt(fanCount) || 0;
  if (fanCountN > 0) {
    const fanSpec = APPLIANCES.fan[fanType] || APPLIANCES.fan.regular;
    const fanUnits = (fanSpec.watts * parseFloat(fanHours) * 30 * fanCountN) / 1000;
    applianceBreakdown.push({ name: 'Fans', units: Math.round(fanUnits), cost: Math.round(fanUnits * rate), icon: 'fan' });
    totalEstimatedUnits += fanUnits;
  }

  // Lights
  const lightCountN = parseInt(lightCount) || 0;
  if (lightCountN > 0) {
    const lightSpec = APPLIANCES.light[lightType] || APPLIANCES.light.led_9w;
    const lightUnits = (lightSpec.watts * parseFloat(lightHours) * 30 * lightCountN) / 1000;
    applianceBreakdown.push({ name: 'Lights', units: Math.round(lightUnits), cost: Math.round(lightUnits * rate), icon: 'light' });
    totalEstimatedUnits += lightUnits;
  }

  // Refrigerator
  if (hasFridge === true || hasFridge === 'true') {
    const fridgeSpec = APPLIANCES.refrigerator[fridgeType] || APPLIANCES.refrigerator.double_3star;
    const fridgeHours = fridgeSpec.hoursOverride || 8;
    const fridgeUnits = (fridgeSpec.watts * fridgeHours * 30) / 1000;
    applianceBreakdown.push({ name: 'Refrigerator', units: Math.round(fridgeUnits), cost: Math.round(fridgeUnits * rate), icon: 'fridge' });
    totalEstimatedUnits += fridgeUnits;
  }

  // Geyser
  if (hasGeyser === true || hasGeyser === 'true') {
    const geyserSpec = APPLIANCES.geyser[geyserType] || APPLIANCES.geyser.storage_15l;
    const geyserHoursPerDay = (parseInt(geyserMinutes) || 30) / 60;
    const geyserUnits = (geyserSpec.watts * geyserHoursPerDay * 30) / 1000;
    applianceBreakdown.push({ name: 'Geyser', units: Math.round(geyserUnits), cost: Math.round(geyserUnits * rate), icon: 'geyser' });
    totalEstimatedUnits += geyserUnits;
  }

  // Washing Machine
  if (hasWM === true || hasWM === 'true') {
    const wmSpec = APPLIANCES.washingMachine[wmType] || APPLIANCES.washingMachine.top_load;
    const loadsPerMonth = (parseInt(wmLoadsPerWeek) || 3) * 4.3;
    const wmUnits = (wmSpec.watts * (wmSpec.cycleMinutes / 60) * loadsPerMonth) / 1000;
    applianceBreakdown.push({ name: 'Washing Machine', units: Math.round(wmUnits), cost: Math.round(wmUnits * rate), icon: 'wm' });
    totalEstimatedUnits += wmUnits;
  }

  // TV
  if (hasTV === true || hasTV === 'true') {
    const tvSpec = APPLIANCES.tv[tvType] || APPLIANCES.tv.led_43;
    const tvUnits = (tvSpec.watts * parseFloat(tvHours || 4) * 30) / 1000;
    applianceBreakdown.push({ name: 'Television', units: Math.round(tvUnits), cost: Math.round(tvUnits * rate), icon: 'tv' });
    totalEstimatedUnits += tvUnits;
  }

  // Miscellaneous (router, water purifier, phone charging etc.)
  const miscUnits = 15 + (parseInt(familySize) || 4) * 3;
  applianceBreakdown.push({ name: 'Other (Router, Chargers, etc.)', units: miscUnits, cost: Math.round(miscUnits * rate), icon: 'misc' });
  totalEstimatedUnits += miscUnits;

  // If total estimated < actual, add "Unaccounted" category
  if (totalEstimatedUnits < units * 0.85) {
    const unaccounted = units - totalEstimatedUnits;
    applianceBreakdown.push({ name: 'Other Appliances / Unaccounted', units: Math.round(unaccounted), cost: Math.round(unaccounted * rate), icon: 'other' });
  }

  // ----- OPTIMIZATION TIPS -----
  const tips = [];

  // AC tips
  if (acCountN > 0) {
    const acSpec = APPLIANCES.ac[acType] || APPLIANCES.ac['1.5ton_3star'];
    // Temperature tip
    const tempSaving = acSpec.watts * 0.18 * parseFloat(acHours) * 30 * acCountN / 1000 * rate;
    tips.push({
      tip: 'Set AC to 24°C instead of 18-20°C — every degree saves ~6% electricity',
      savingPerMonth: Math.round(tempSaving),
      category: 'ac',
      impact: 'high',
    });

    // Star rating upgrade
    if (acType.includes('3star')) {
      const currentUnits = acSpec.watts * parseFloat(acHours) * 30 * acCountN / 1000;
      const fiveStarKey = acType.replace('3star', '5star');
      const fiveStarSpec = APPLIANCES.ac[fiveStarKey];
      if (fiveStarSpec) {
        const newUnits = fiveStarSpec.watts * parseFloat(acHours) * 30 * acCountN / 1000;
        const upgrade = (currentUnits - newUnits) * rate;
        tips.push({
          tip: `Upgrade to 5-star AC — saves ~${Math.round(currentUnits - newUnits)} units/month`,
          savingPerMonth: Math.round(upgrade),
          category: 'ac',
          impact: 'medium',
        });
      }
    }

    // Timer tip
    const timerSave = acSpec.watts * 2 * 30 * acCountN / 1000 * rate;
    tips.push({
      tip: 'Use AC timer/sleep mode — avoid running AC all night, use for 6h instead of 8h',
      savingPerMonth: Math.round(timerSave),
      category: 'ac',
      impact: 'medium',
    });
  }

  // Fan tips
  if (fanCountN > 0 && fanType === 'regular') {
    const currentFanUnits = APPLIANCES.fan.regular.watts * parseFloat(fanHours) * 30 * fanCountN / 1000;
    const bldcFanUnits = APPLIANCES.fan.bldc.watts * parseFloat(fanHours) * 30 * fanCountN / 1000;
    const fanSaving = (currentFanUnits - bldcFanUnits) * rate;
    tips.push({
      tip: `Switch to BLDC fans — uses 28W vs 75W per fan, saves ~${Math.round(currentFanUnits - bldcFanUnits)} units/month`,
      savingPerMonth: Math.round(fanSaving),
      category: 'fan',
      impact: 'medium',
    });
  }

  // Light tips
  if (lightCountN > 0 && (lightType === 'cfl' || lightType === 'tubelight')) {
    const currentLightSpec = APPLIANCES.light[lightType];
    const ledSpec = APPLIANCES.light.led_9w;
    const currentLightUnits = currentLightSpec.watts * parseFloat(lightHours) * 30 * lightCountN / 1000;
    const ledUnits = ledSpec.watts * parseFloat(lightHours) * 30 * lightCountN / 1000;
    const lightSaving = (currentLightUnits - ledUnits) * rate;
    tips.push({
      tip: `Switch to LED bulbs — uses ${ledSpec.watts}W vs ${currentLightSpec.watts}W each`,
      savingPerMonth: Math.round(lightSaving),
      category: 'light',
      impact: 'medium',
    });
  }

  // Turn off lights tip
  if (lightCountN > 0) {
    const halfLightsOff = APPLIANCES.light[lightType || 'led_9w'].watts * 2 * 30 * Math.ceil(lightCountN / 2) / 1000 * rate;
    tips.push({
      tip: 'Turn off lights in unused rooms — reduce usage by 2h/day on half your lights',
      savingPerMonth: Math.round(halfLightsOff),
      category: 'light',
      impact: 'low',
    });
  }

  // Geyser tips
  if (hasGeyser === true || hasGeyser === 'true') {
    const geyserSpec = APPLIANCES.geyser[geyserType] || APPLIANCES.geyser.storage_15l;
    const mins = parseInt(geyserMinutes) || 30;
    if (mins > 15) {
      const currentGeyserUnits = geyserSpec.watts * (mins / 60) * 30 / 1000;
      const optimalGeyserUnits = geyserSpec.watts * (15 / 60) * 30 / 1000;
      const geyserSaving = (currentGeyserUnits - optimalGeyserUnits) * rate;
      tips.push({
        tip: `Use geyser for 15 minutes instead of ${mins} minutes — water stays hot for 30+ mins after heating`,
        savingPerMonth: Math.round(geyserSaving),
        category: 'geyser',
        impact: 'high',
      });
    }

    if (geyserType !== 'instant') {
      tips.push({
        tip: 'Consider switching to an instant geyser — no standby losses, heats only what you need',
        savingPerMonth: Math.round(geyserSpec.watts * 0.15 * (mins / 60) * 30 / 1000 * rate),
        category: 'geyser',
        impact: 'low',
      });
    }
  }

  // Washing machine tip
  if (hasWM === true || hasWM === 'true') {
    const loadsPerWeek = parseInt(wmLoadsPerWeek) || 3;
    if (loadsPerWeek > 2) {
      const wmSpec = APPLIANCES.washingMachine[wmType] || APPLIANCES.washingMachine.top_load;
      const savedLoads = Math.floor(loadsPerWeek * 0.3);
      const savedUnits = wmSpec.watts * (wmSpec.cycleMinutes / 60) * savedLoads * 4.3 / 1000;
      tips.push({
        tip: `Run washing machine only on full load — reduce ${savedLoads} loads/week by combining`,
        savingPerMonth: Math.round(savedUnits * rate),
        category: 'wm',
        impact: 'low',
      });
    }
  }

  // Fridge tips
  if (hasFridge === true || hasFridge === 'true') {
    tips.push({
      tip: 'Keep fridge away from heat sources, maintain 3-4°C — don\'t set to coldest, ensure door seal is tight',
      savingPerMonth: Math.round(units * 0.02 * rate),
      category: 'fridge',
      impact: 'low',
    });

    if (fridgeType && fridgeType.includes('3star')) {
      const curr = APPLIANCES.refrigerator[fridgeType];
      const fiveKey = fridgeType.replace('3star', '5star');
      const fiveStar = APPLIANCES.refrigerator[fiveKey];
      if (curr && fiveStar) {
        const saving = ((curr.watts * (curr.hoursOverride || 8)) - (fiveStar.watts * (fiveStar.hoursOverride || 8))) * 30 / 1000 * rate;
        tips.push({
          tip: 'Upgrade to a 5-star rated refrigerator on next purchase',
          savingPerMonth: Math.round(saving),
          category: 'fridge',
          impact: 'medium',
        });
      }
    }
  }

  // General tips
  tips.push({
    tip: 'Use power strips with switches — standby power of TV, set-top box, chargers wastes 5-10% electricity',
    savingPerMonth: Math.round(units * 0.03 * rate),
    category: 'general',
    impact: 'low',
  });

  tips.push({
    tip: 'Use natural light during daytime — open curtains instead of switching on lights',
    savingPerMonth: Math.round(lightCountN * 0.5 * (APPLIANCES.light[lightType]?.watts || 9) * 30 / 1000 * rate),
    category: 'general',
    impact: 'low',
  });

  // Sort by saving descending, take top tips
  tips.sort((a, b) => b.savingPerMonth - a.savingPerMonth);
  const topTips = tips.slice(0, 7);

  // ----- Total possible savings -----
  const totalPossibleSaving = topTips.reduce((s, t) => s + t.savingPerMonth, 0);
  // Cap at 40% of bill
  const realisticSaving = Math.min(totalPossibleSaving, Math.round(bill * 0.4 || units * rate * 0.4));
  const optimizedBill = Math.max(bill - realisticSaving, Math.round(bill * 0.5));
  const optimizedUnits = Math.round(units - (realisticSaving / rate));

  // ----- SOLAR ROI -----
  const solar = calculateSolarROI(units, state, rate);

  // ----- TARIFF INFO -----
  const tariffBreakdown = calculateBillFromUnits(units, state);

  return {
    state: tariff.name,
    stateKey: state,
    subsidyNote: tariff.subsidyNote,
    currentBill: bill || tariffBreakdown.amount,
    currentUnits: units,
    effectiveRate: Math.round(rate * 100) / 100,
    tariffBreakdown: tariffBreakdown.breakdown,
    fixedCharge: tariffBreakdown.fixedCharge,
    applianceBreakdown,
    tips: topTips,
    totalPossibleSaving: realisticSaving,
    optimizedBill,
    optimizedUnits,
    yearlySaving: realisticSaving * 12,
    solar,
  };
}

// ============================================================
// SOLAR PANEL ROI CALCULATOR
// ============================================================
function calculateSolarROI(units, state, rate) {
  const tariff = STATE_TARIFFS[state] || STATE_TARIFFS.delhi;
  const irradiance = tariff.avgSolarIrradiance || 5.0;

  // Determine recommended system size
  // 1 kW produces ~irradiance * 30 * 0.8 units/month (with losses)
  const unitsPerKwPerMonth = irradiance * 30 * 0.75;
  let recommendedKw = Math.ceil((units * 0.8) / unitsPerKwPerMonth);
  recommendedKw = Math.max(1, Math.min(recommendedKw, 10));

  const actualGeneration = Math.round(recommendedKw * unitsPerKwPerMonth);
  const offsetUnits = Math.min(actualGeneration, units);

  // Cost: ~₹55,000-65,000 per kW after subsidy (PM Surya Ghar)
  // Subsidy: ₹30,000 for 1kW, ₹60,000 for 2kW, ₹78,000 for 3kW+
  let subsidy = 0;
  if (recommendedKw <= 1) subsidy = 30000;
  else if (recommendedKw <= 2) subsidy = 60000;
  else subsidy = 78000;

  const costPerKw = 62000;
  const grossCost = recommendedKw * costPerKw;
  const netCost = grossCost - subsidy;

  const monthlySaving = Math.round(offsetUnits * rate);
  const yearlySaving = monthlySaving * 12;
  const paybackYears = yearlySaving > 0 ? Math.round((netCost / yearlySaving) * 10) / 10 : 0;
  const lifetimeYears = 25;
  const lifetimeSaving = yearlySaving * (lifetimeYears - paybackYears);

  return {
    recommendedKw,
    grossCost,
    subsidy,
    netCost,
    monthlyGeneration: actualGeneration,
    monthlySaving,
    yearlySaving,
    paybackYears,
    lifetimeYears,
    lifetimeSaving,
    note: `A ${recommendedKw}kW system costs ~₹${(grossCost / 100000).toFixed(1)}L (₹${(netCost / 100000).toFixed(1)}L after PM Surya Ghar subsidy). Pays for itself in ${paybackYears} years, then saves ₹${monthlySaving.toLocaleString('en-IN')}/month for ${lifetimeYears - Math.ceil(paybackYears)} years.`,
  };
}

// ============================================================
// EXPORTS
// ============================================================
function handleAnalyze(req, res) {
  try {
    const data = req.body || {};
    const result = analyze(data);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('BijliSmart error:', err);
    res.status(500).json({ success: false, error: 'Analysis failed. Please try again.' });
  }
}

function getStateTariffs(req, res) {
  const list = Object.entries(STATE_TARIFFS).map(([key, val]) => ({
    key,
    name: val.name,
    slabCount: val.slabs.length,
    subsidyNote: val.subsidyNote,
  }));
  res.json({ success: true, data: list });
}

module.exports = {
  analyze,
  handleAnalyze,
  getStateTariffs,
  STATE_TARIFFS,
  APPLIANCES,
};
