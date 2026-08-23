import React, { useState, useEffect } from 'react';

export default function LongitudinalAnalytics({
  activeComponent = 'North Façade Wall (Main Shaft)',
  materialTypology = 'sandstone',
  seismicZone = 'Zone IV'
}) {
  const [selectedMetric, setSelectedMetric] = useState('health'); // 'health' | 'crack' | 'moisture'
  const [hoveredIndex, setHoveredIndex] = useState(3); // Default to 2026
  const [monsoonAnomaly, setMonsoonAnomaly] = useState(25);
  const [seismicMultiplier, setSeismicMultiplier] = useState(1.25);

  const fallbackDataset = [
    { year: '2020', label: '2020 Baseline', health: 91, crackLength: 12.4, moisture: 6.2, type: 'historical', note: 'NMMA Baseline Archival Photogrammetry' },
    { year: '2022', label: '2022 Cycle', health: 84, crackLength: 15.1, moisture: 9.8, type: 'historical', note: 'First micro-fissures observed on upper mortar courses' },
    { year: '2024', label: '2024 Cycle', health: 76, crackLength: 18.2, moisture: 11.5, type: 'historical', note: 'Tensile shear stress accelerating post-monsoon' },
    { year: '2026', label: '2026 Live Survey', health: 62, crackLength: 25.1, moisture: 14.8, type: 'current', note: 'Current LiDAR & OpenCV Inspection: Branching fissure expansion' },
    { year: '2027', label: '2027 Forecast', healthNoIntervention: 48, healthWithIntervention: 85, crackNoIntervention: 34.0, crackWithIntervention: 25.1, moistureNoIntervention: 24.5, moistureWithIntervention: 5.2, type: 'forecast', note: 'Year 2027: Rapid spalling if moisture unsealed' },
    { year: '2028', label: '2028 Forecast', healthNoIntervention: 32, healthWithIntervention: 89, crackNoIntervention: 44.8, crackWithIntervention: 25.1, moistureNoIntervention: 35.2, moistureWithIntervention: 4.5, type: 'forecast', note: 'Year 2028: Critical point — Structural delamination risk' },
    { year: '2029', label: '2029 Forecast', healthNoIntervention: 21, healthWithIntervention: 92, crackNoIntervention: 57.2, crackWithIntervention: 25.1, moistureNoIntervention: 44.0, moistureWithIntervention: 3.8, type: 'forecast', note: 'Year 2029: High failure probability under seismic loading' },
    { year: '2030', label: '2030 Horizon', healthNoIntervention: 14, healthWithIntervention: 95, crackNoIntervention: 72.5, crackWithIntervention: 25.1, moistureNoIntervention: 52.0, moistureWithIntervention: 3.2, type: 'forecast', note: 'Year 2030 Horizon: Irreversible ashlar block separation' }
  ];

  const [timeSeriesData, setTimeSeriesData] = useState(fallbackDataset);

  const computeDynamicCurve = () => {
    const envFactor = 1.0 + (monsoonAnomaly / 100) * 0.45;
    const computed = fallbackDataset.map((pt) => {
      if (pt.type === 'forecast') {
        const yr = parseInt(pt.year, 10);
        const dt = yr - 2026;
        const unmitCrack = Number((25.1 + (1.8 + dt * 1.1) * envFactor * seismicMultiplier * dt).toFixed(1));
        const unmitHealth = Math.max(12, Math.round(62 - (12 + dt * 4.2) * envFactor));
        const unmitMoisture = Number(Math.min(58, 14.8 + (3.8 + dt * 1.2) * envFactor).toFixed(1));
        return {
          ...pt,
          crackNoIntervention: unmitCrack,
          healthNoIntervention: unmitHealth,
          moistureNoIntervention: unmitMoisture
        };
      }
      return pt;
    });
    setTimeSeriesData(computed);
  };

  useEffect(() => {
    computeDynamicCurve();
  }, [monsoonAnomaly, seismicMultiplier, activeComponent]);

  const activePoint = timeSeriesData[hoveredIndex] || timeSeriesData[3];

  // SVG Coordinates mapping
  const getX = (index) => 40 + index * 82;
  const getYHealth = (score) => 210 - (score / 100) * 170;
  const getYCrack = (cm) => 210 - (Math.min(cm, 80) / 80) * 170;
  const getYMoisture = (pct) => 210 - (Math.min(pct, 60) / 60) * 170;

  // Build SVG Paths
  let histPoints = [];
  let unmitPoints = [];
  let mitPoints = [];

  timeSeriesData.forEach((pt, i) => {
    const x = getX(i);
    let y = 0;
    let yUnmit = 0;
    let yMit = 0;

    if (selectedMetric === 'health') {
      y = getYHealth(pt.health || pt.healthNoIntervention);
      yUnmit = getYHealth(pt.healthNoIntervention || pt.health);
      yMit = getYHealth(pt.healthWithIntervention || pt.health);
    } else if (selectedMetric === 'crack') {
      y = getYCrack(pt.crackLength || pt.crackNoIntervention);
      yUnmit = getYCrack(pt.crackNoIntervention || pt.crackLength);
      yMit = getYCrack(pt.crackWithIntervention || pt.crackLength);
    } else {
      y = getYMoisture(pt.moisture || pt.moistureNoIntervention);
      yUnmit = getYMoisture(pt.moistureNoIntervention || pt.moisture);
      yMit = getYMoisture(pt.moistureWithIntervention || pt.moisture);
    }

    if (i <= 3) {
      histPoints.push(`${x},${y}`);
    }
    if (i >= 3) {
      unmitPoints.push(`${x},${yUnmit}`);
      mitPoints.push(`${x},${yMit}`);
    }
  });

  const histPath = `M ${histPoints.join(' L ')}`;
  const unmitPath = `M ${unmitPoints.join(' L ')}`;
  const mitPath = `M ${mitPoints.join(' L ')}`;

  return (
    <div className="w-full bg-black text-white space-y-8">
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
            Module 03 · Temporal ICP Alignment & 2030 Decay Physics
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.04em] text-white">
            Longitudinal Decay Trajectory & Intervention Horizon
          </h2>
          <p className="body-copy-sm max-w-2xl mt-2 text-[#bdbdbd]">
            Paris-Erdogan mechanics integrated with multi-epoch laser scans to contrast unmitigated failure vs proactive conservation.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex bg-black p-1 rounded-full border border-[#222222] gap-1">
          <button
            onClick={() => setSelectedMetric('health')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              selectedMetric === 'health' ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Health Index
          </button>
          <button
            onClick={() => setSelectedMetric('crack')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              selectedMetric === 'crack' ? 'bg-[#ffb829] text-black font-bold shadow-[0_0_16px_rgba(255,184,41,0.45)]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Crack Growth (cm)
          </button>
          <button
            onClick={() => setSelectedMetric('moisture')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              selectedMetric === 'moisture' ? 'bg-[#38bdf8] text-black font-bold shadow-[0_0_16px_rgba(56,189,248,0.45)]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Moisture Dampness (%)
          </button>
        </div>
      </div>

      {/* 2. Interactive SVG Curve on Pure Void */}
      <div className="relative w-full aspect-[21/9] min-h-[300px] bg-black select-none">
        <svg viewBox="0 0 660 250" className="w-full h-full overflow-visible">
          {/* Subtle Grid Guidelines */}
          {[50, 100, 150, 200].map(y => (
            <line key={y} x1="30" y1={y} x2="630" y2={y} stroke="#141414" strokeWidth="1" />
          ))}

          {/* Historical Solid Line */}
          <path d={histPath} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Unmitigated Trajectory (Saffron Warning) */}
          <path d={unmitPath} fill="none" stroke="#ffb829" strokeWidth="2" strokeDasharray="5, 4" />

          {/* Mitigated Trajectory (Electric Iris Safe) */}
          <path d={mitPath} fill="none" stroke="#8052ff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data Points */}
          {timeSeriesData.map((pt, i) => {
            const x = getX(i);
            const isHovered = hoveredIndex === i;
            let y = 0;
            if (selectedMetric === 'health') {
              y = getYHealth(pt.health || pt.healthNoIntervention);
            } else if (selectedMetric === 'crack') {
              y = getYCrack(pt.crackLength || pt.crackNoIntervention);
            } else {
              y = getYMoisture(pt.moisture || pt.moistureNoIntervention);
            }

            return (
              <g
                key={pt.year}
                onMouseEnter={() => setHoveredIndex(i)}
                className="cursor-pointer"
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={i <= 3 ? '#ffffff' : '#ffb829'}
                  stroke="#000000"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
                <text
                  x={x}
                  y="240"
                  textAnchor="middle"
                  fill={isHovered ? '#ffffff' : '#9a9a9a'}
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {pt.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* 3. Floating Active Epoch Telemetry on Void */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-[#1a1a1a]">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase text-[#9a9a9a]">Active Epoch</span>
          <div className="text-xl font-normal text-white">{activePoint.label}</div>
          <span className="text-[11px] font-mono text-[#8052ff] uppercase">{activePoint.type}</span>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase text-[#9a9a9a]">Health Score</span>
          <div className="text-2xl font-mono text-white">
            {activePoint.health || activePoint.healthNoIntervention}
            <span className="text-xs text-[#9a9a9a]"> / 100</span>
          </div>
          {activePoint.type === 'forecast' && (
            <span className="text-[11px] font-mono text-[#8052ff]">Mitigated: {activePoint.healthWithIntervention}/100</span>
          )}
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase text-[#9a9a9a]">Crack Aperture</span>
          <div className="text-2xl font-mono text-[#ffb829]">
            {activePoint.crackLength || activePoint.crackNoIntervention} cm
          </div>
          {activePoint.type === 'forecast' && (
            <span className="text-[11px] font-mono text-[#8052ff]">Mitigated: {activePoint.crackWithIntervention} cm</span>
          )}
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase text-[#9a9a9a]">Observation Note</span>
          <p className="text-xs font-light text-[#bdbdbd] leading-relaxed">
            {activePoint.note}
          </p>
        </div>
      </div>
    </div>
  );
}
