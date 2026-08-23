import React, { useState } from 'react';

export default function ScenarioSimulator({
  activeSite,
  activeComponent,
  baselineRisk
}) {
  const [activeScenario, setActiveScenario] = useState('monsoon'); // 'monsoon' | 'seismic' | 'urban'
  const [monsoonIntensity, setMonsoonIntensity] = useState(45); // +45% excess rainfall
  const [seismicMagnitude, setSeismicMagnitude] = useState(5.8); // 5.8 Richter
  const [urbanVibration, setUrbanVibration] = useState(30); // 30 Hz

  let stressDelta = 0;
  let simulatedRiskScore = baselineRisk || 74;
  let simulatedHealthScore = 62;
  let physicalConsequences = [];
  let emergencyProtocol = "";

  if (activeScenario === 'monsoon') {
    stressDelta = Math.round(monsoonIntensity * 0.35);
    simulatedRiskScore = Math.min(98, (baselineRisk || 74) + stressDelta);
    simulatedHealthScore = Math.max(25, 62 - Math.round(stressDelta * 0.8));
    physicalConsequences = [
      `Capillary dampness saturation increases to ${(14.8 + monsoonIntensity * 0.45).toFixed(1)}% of façade`,
      `Rapid pore-water pressure accelerates sub-surface salt crystallization`,
      `Deterioration velocity surges to ${(3.45 * (1 + monsoonIntensity / 100)).toFixed(2)} cm/yr`,
      `Plinth drainage overflow increases biological lichen colonization rate by +60%`
    ];
    emergencyProtocol = "Deploy breathable hydrophobic sealants, activate perimeter subsurface dewatering sumps, and expedite micro-mortar grouting within 7 days.";
  } else if (activeScenario === 'seismic') {
    stressDelta = Math.round((seismicMagnitude - 4.0) * 12);
    simulatedRiskScore = Math.min(99, (baselineRisk || 74) + stressDelta);
    simulatedHealthScore = Math.max(18, 62 - Math.round(stressDelta * 1.1));
    physicalConsequences = [
      `Tensile shear stress widens existing crack from 2.4 mm to ${(2.4 + (seismicMagnitude - 4) * 0.8).toFixed(1)} mm`,
      `Secondary micro-fissure branching initiated on upper balcony corbels`,
      `Masonry load redistribution risk elevated to Zone-IV peak tolerance`,
      `Component stability margin reduced by -${(stressDelta * 1.2).toFixed(0)}%`
    ];
    emergencyProtocol = "Immediate telescopic steel shoring scaffolding, acoustic emission sensor array installation, and structural laser displacement monitoring.";
  } else {
    stressDelta = Math.round(urbanVibration * 0.3);
    simulatedRiskScore = Math.min(92, (baselineRisk || 74) + stressDelta);
    simulatedHealthScore = Math.max(35, 62 - Math.round(stressDelta * 0.6));
    physicalConsequences = [
      `Continuous low-frequency resonant vibrations (${urbanVibration} Hz) trigger mortar bond fatigue`,
      `Cumulative micro-settlement observed at base plinth substructure`,
      `Surface spalling delamination area expands by +${(urbanVibration * 0.8).toFixed(0)}%`,
      `Fatigue threshold exceeded in unreinforced masonry joints`
    ];
    emergencyProtocol = "Enforce heavy vehicle exclusion buffer zone (100m perimeter) and inject low-viscosity hydraulic lime grout into fatigued joint planes.";
  }

  return (
    <div className="w-full bg-black text-white space-y-8">
      {/* 1. Header with Scenario Pills */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
            Module 04 · What-If Climate & Hazard Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.04em] text-white">
            Environmental Stress & Disaster Stress-Testing
          </h2>
          <p className="body-copy-sm max-w-2xl mt-2 text-[#bdbdbd]">
            Simulates dynamic micro-climate anomalies, seismic shockwaves, and urban vibrations to compute real-time structural risk deltas.
          </p>
        </div>

        {/* Scenario Selectors */}
        <div className="flex bg-black p-1 rounded-full border border-[#222222] gap-1">
          <button
            onClick={() => setActiveScenario('monsoon')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeScenario === 'monsoon' ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            🌧️ Monsoon Surge
          </button>
          <button
            onClick={() => setActiveScenario('seismic')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeScenario === 'seismic' ? 'bg-[#ffb829] text-black font-bold shadow-[0_0_16px_rgba(255,184,41,0.45)]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            🌋 Seismic Tremor
          </button>
          <button
            onClick={() => setActiveScenario('urban')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeScenario === 'urban' ? 'bg-[#15846e] text-white font-semibold shadow-[0_0_16px_rgba(21,132,110,0.45)]' : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            🏗️ Urban Vibration
          </button>
        </div>
      </div>

      {/* 2. Interactive Anomaly Slider Track & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side (6 cols): Sliders & Physical Consequence Bullets */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#9a9a9a] uppercase tracking-wider">
                {activeScenario === 'monsoon' ? 'Monsoon Cloudburst Intensity' : activeScenario === 'seismic' ? 'Seismic Richter Scale' : 'Urban Frequency Load'}
              </span>
              <span className="text-sm font-bold text-[#ffb829]">
                {activeScenario === 'monsoon' ? `+${monsoonIntensity}% Precipitation` : activeScenario === 'seismic' ? `${seismicMagnitude} Magnitude` : `${urbanVibration} Hz Load`}
              </span>
            </div>

            {activeScenario === 'monsoon' && (
              <input
                type="range"
                min="10"
                max="100"
                value={monsoonIntensity}
                onChange={(e) => setMonsoonIntensity(Number(e.target.value))}
                className="w-full void-slider"
              />
            )}

            {activeScenario === 'seismic' && (
              <input
                type="range"
                min="4.0"
                max="7.5"
                step="0.1"
                value={seismicMagnitude}
                onChange={(e) => setSeismicMagnitude(Number(e.target.value))}
                className="w-full void-slider"
              />
            )}

            {activeScenario === 'urban' && (
              <input
                type="range"
                min="5"
                max="60"
                value={urbanVibration}
                onChange={(e) => setUrbanVibration(Number(e.target.value))}
                className="w-full void-slider"
              />
            )}
          </div>

          {/* Physical Impacts List */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-mono uppercase text-[#8052ff] tracking-wider font-semibold">
              Forecasted Physical Structural Consequences
            </div>
            <div className="space-y-2">
              {physicalConsequences.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-[#bdbdbd] font-light leading-relaxed">
                  <span className="text-[#ffb829] font-mono mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side (5 cols): Simulated Risk Score & Protocol */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase text-[#9a9a9a] tracking-wider">
              Simulated Vulnerability Risk
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-normal tracking-[-0.04em] text-[#ffb829] font-mono">
                {simulatedRiskScore}
              </span>
              <span className="text-lg font-mono text-[#9a9a9a]">/ 100 Risk</span>
            </div>
            <p className="text-xs font-mono text-[#ffb829]">
              Δ +{stressDelta} points above baseline ({baselineRisk || 74}/100)
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-mono uppercase text-[#8052ff] tracking-wider font-semibold">
              Prescribed Emergency Action Protocol
            </div>
            <p className="text-sm font-light text-[#bdbdbd] leading-relaxed">
              "{emergencyProtocol}"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
