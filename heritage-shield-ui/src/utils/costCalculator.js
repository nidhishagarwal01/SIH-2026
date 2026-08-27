// 🏛️ Dynamic ConservationCostAI Metrology Engine (CPWD DSR + ASI Tender Norms)
// Supports all 12 National UNESCO Heritage Sites with exact architectural metrics

export const MONUMENT_COST_SPECS = {
  "ASI-DL-001": { // Qutub Minar
    id: "qutub_minar",
    name: "Qutub Minar Complex",
    material: "Carved Red Sandstone & Marble",
    reactiveBaseCr: 14.20,
    preventiveBaseCr: 0.94,
    proactiveLakhs: 4.85,
    emergencyLakhs: 74.80,
    scaffoldingLakhs: 1.45,
    materialsLakhs: 2.10,
    laborLakhs: 1.30,
    carbonKg: 890,
    timelineWeeks: 6
  },
  "ASI-KA-001": { // Hampi
    id: "hampi",
    name: "Group of Monuments at Hampi",
    material: "Monolithic Vijayanagara Granite",
    reactiveBaseCr: 9.60,
    preventiveBaseCr: 0.62,
    proactiveLakhs: 3.80,
    emergencyLakhs: 52.40,
    scaffoldingLakhs: 1.20,
    materialsLakhs: 1.60,
    laborLakhs: 1.00,
    carbonKg: 680,
    timelineWeeks: 4
  },
  "ASI-TS-018": { // Golconda Fort
    id: "golconda",
    name: "Golconda Fort Complex",
    material: "Massive Granitic Ashlar & Lime Mortar",
    reactiveBaseCr: 18.50,
    preventiveBaseCr: 1.15,
    proactiveLakhs: 5.60,
    emergencyLakhs: 86.00,
    scaffoldingLakhs: 1.80,
    materialsLakhs: 2.30,
    laborLakhs: 1.50,
    carbonKg: 1040,
    timelineWeeks: 8
  },
  "ASI-OD-001": { // Konark
    id: "konark",
    name: "Sun Temple, Konark",
    material: "Khondalite & Chlorite Stone",
    reactiveBaseCr: 21.40,
    preventiveBaseCr: 1.38,
    proactiveLakhs: 6.80,
    emergencyLakhs: 98.20,
    scaffoldingLakhs: 2.20,
    materialsLakhs: 2.90,
    laborLakhs: 1.70,
    carbonKg: 1260,
    timelineWeeks: 10
  },
  "ASI-UP-001": { // Taj Mahal
    id: "taj_mahal",
    name: "Taj Mahal Complex",
    material: "Makrana White Marble & Inlay Pietra Dura",
    reactiveBaseCr: 28.80,
    preventiveBaseCr: 1.75,
    proactiveLakhs: 8.40,
    emergencyLakhs: 114.60,
    scaffoldingLakhs: 2.80,
    materialsLakhs: 3.50,
    laborLakhs: 2.10,
    carbonKg: 1550,
    timelineWeeks: 12
  },
  "ASI-MP-001": { // Khajuraho
    id: "khajuraho",
    name: "Khajuraho Group of Monuments",
    material: "Fine-Grained Bundelkhand Sandstone",
    reactiveBaseCr: 16.80,
    preventiveBaseCr: 1.08,
    proactiveLakhs: 5.20,
    emergencyLakhs: 79.00,
    scaffoldingLakhs: 1.60,
    materialsLakhs: 2.20,
    laborLakhs: 1.40,
    carbonKg: 940,
    timelineWeeks: 7
  },
  "ASI-MH-001": { // Ajanta Caves
    id: "ajanta",
    name: "Ajanta Caves",
    material: "Columnar Basalt & Mud-Plaster Tempera",
    reactiveBaseCr: 19.20,
    preventiveBaseCr: 1.22,
    proactiveLakhs: 6.10,
    emergencyLakhs: 91.00,
    scaffoldingLakhs: 1.90,
    materialsLakhs: 2.50,
    laborLakhs: 1.70,
    carbonKg: 1120,
    timelineWeeks: 9
  },
  "ASI-MH-002": { // Ellora Caves
    id: "ellora",
    name: "Ellora Caves & Kailash Temple",
    material: "Deccan Trap Volcanic Basalt",
    reactiveBaseCr: 23.60,
    preventiveBaseCr: 1.48,
    proactiveLakhs: 7.20,
    emergencyLakhs: 108.00,
    scaffoldingLakhs: 2.30,
    materialsLakhs: 3.00,
    laborLakhs: 1.90,
    carbonKg: 1340,
    timelineWeeks: 11
  },
  "ASI-GJ-001": { // Rani ki Vav
    id: "rani_ki_vav",
    name: "Rani ki Vav (The Queen's Stepwell)",
    material: "Dhrangadhra Sandstone & Silt Stratigraphy",
    reactiveBaseCr: 15.10,
    preventiveBaseCr: 0.98,
    proactiveLakhs: 4.50,
    emergencyLakhs: 67.50,
    scaffoldingLakhs: 1.40,
    materialsLakhs: 1.90,
    laborLakhs: 1.20,
    carbonKg: 820,
    timelineWeeks: 6
  },
  "ASI-TN-001": { // Great Living Chola Temples
    id: "brihadisvara",
    name: "Great Living Chola Temples (Thanjavur)",
    material: "Interlocking Chola Monolithic Granite",
    reactiveBaseCr: 22.00,
    preventiveBaseCr: 1.40,
    proactiveLakhs: 6.40,
    emergencyLakhs: 96.00,
    scaffoldingLakhs: 2.10,
    materialsLakhs: 2.60,
    laborLakhs: 1.70,
    carbonKg: 1210,
    timelineWeeks: 10
  },
  "ASI-MP-002": { // Sanchi Stupa
    id: "sanchi",
    name: "Buddhist Monuments at Sanchi",
    material: "Vindhyan Sandstone & Ashokan Masonry",
    reactiveBaseCr: 11.40,
    preventiveBaseCr: 0.74,
    proactiveLakhs: 3.20,
    emergencyLakhs: 48.00,
    scaffoldingLakhs: 1.00,
    materialsLakhs: 1.30,
    laborLakhs: 0.90,
    carbonKg: 580,
    timelineWeeks: 5
  },
  "ASI-GJ-002": { // Dholavira
    id: "dholavira",
    name: "Dholavira: A Harappan City",
    material: "Harappan Sun-Dried Mud Brick & Sandstone",
    reactiveBaseCr: 7.80,
    preventiveBaseCr: 0.52,
    proactiveLakhs: 2.10,
    emergencyLakhs: 31.50,
    scaffoldingLakhs: 0.60,
    materialsLakhs: 0.90,
    laborLakhs: 0.60,
    carbonKg: 390,
    timelineWeeks: 4
  }
};

export function getMonumentCostData(siteIdOrName, computedRisk = 65) {
  // Find matching spec
  let spec = null;
  if (siteIdOrName) {
    const raw = String(siteIdOrName).toLowerCase();
    spec = Object.values(MONUMENT_COST_SPECS).find(s => 
      s.id === raw || s.name.toLowerCase().includes(raw) || raw.includes(s.id) || (s.id === 'brihadisvara' && (raw.includes('chola') || raw.includes('brihadisvara') || raw.includes('thanjavur')))
    );
    if (!spec && MONUMENT_COST_SPECS[siteIdOrName]) {
      spec = MONUMENT_COST_SPECS[siteIdOrName];
    }
  }
  
  if (!spec) {
    spec = MONUMENT_COST_SPECS["ASI-DL-001"]; // default Qutub Minar
  }

  // Risk scaling factor: higher vulnerability increases reactive reconstruction multiplier
  const riskMultiplier = Math.max(0.65, Math.min(1.45, computedRisk / 65.0));

  const reactiveCostCr = Number((spec.reactiveBaseCr * riskMultiplier).toFixed(2));
  const preventiveCostCr = Number((spec.preventiveBaseCr * (1.0 + (riskMultiplier - 1.0) * 0.3)).toFixed(2));
  const savingsCr = Number((reactiveCostCr - preventiveCostCr).toFixed(2));
  const efficiencyPct = Number(((savingsCr / reactiveCostCr) * 100).toFixed(1));

  const proactiveLakhs = Number((spec.proactiveLakhs * riskMultiplier).toFixed(2));
  const emergencyLakhs = Number((spec.emergencyLakhs * riskMultiplier).toFixed(2));
  const netSavingsLakhs = Number((emergencyLakhs - proactiveLakhs).toFixed(2));
  const costMultiplier = Number((emergencyLakhs / proactiveLakhs).toFixed(1));

  return {
    monumentName: spec.name,
    material: spec.material,
    reactiveCostCr,
    preventiveCostCr,
    savingsCr,
    efficiencyPct,
    proactiveLakhs,
    emergencyLakhs,
    netSavingsLakhs,
    costMultiplier,
    carbonKg: spec.carbonKg,
    timelineWeeks: spec.timelineWeeks,
    budgetBreakdown: {
      scaffoldingLakhs: Number((spec.scaffoldingLakhs * riskMultiplier).toFixed(2)),
      materialsLakhs: Number((spec.materialsLakhs * riskMultiplier).toFixed(2)),
      laborLakhs: Number((spec.laborLakhs * riskMultiplier).toFixed(2))
    }
  };
}
