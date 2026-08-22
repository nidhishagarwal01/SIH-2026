import React, { useState } from 'react';

export default function ScenarioSimulator({
  activeSite,
  activeComponent,
  baselineRisk,
  onApplyScenarioTo3D
}) {
  const [activeScenario, setActiveScenario] = useState('monsoon'); // 'monsoon' | 'seismic' | 'urban'
  const [monsoonIntensity, setMonsoonIntensity] = useState(45); // +45% excess rainfall
  const [seismicMagnitude, setSeismicMagnitude] = useState(5.8); // 5.8 Richter
  const [urbanVibration, setUrbanVibration] = useState(30); // 30 Hz

  // Calculate dynamic scenario impacts
  let scenarioTitle = "";
  let stressDelta = 0;
  let simulatedRiskScore = baselineRisk;
  let simulatedHealthScore = 62;
  let physicalConsequences = [];
  let emergencyProtocol = "";

  if (activeScenario === 'monsoon') {
    scenarioTitle = "Severe Monsoon Cloudburst & Prolonged Moisture Saturation";
    stressDelta = Math.round(monsoonIntensity * 0.35);
    simulatedRiskScore = Math.min(98, baselineRisk + stressDelta);
    simulatedHealthScore = Math.max(25, 62 - Math.round(stressDelta * 0.8));
    physicalConsequences = [
      `Capillary dampness saturation increases from 14.8% to ${(14.8 + monsoonIntensity * 0.45).toFixed(1)}% of façade`,
      `Rapid pore-water pressure accelerates sub-surface salt crystallization (Efflorescence)`,
      `Deterioration velocity surges from 3.45 cm/yr to ${(3.45 * (1 + monsoonIntensity / 100)).toFixed(2)} cm/yr`,
      `Plinth drainage overflow increases biological lichen colonization rate by +60%`
    ];
    emergencyProtocol = "Deploy temporary breathable waterproof cladding, activate perimeter subsurface dewatering sumps, and expedite silane-siloxane hydrophobic sealing within 7 days.";
  } else if (activeScenario === 'seismic') {
    scenarioTitle = `Moderate-to-Severe Seismic Tremor (${seismicMagnitude} Magnitude Richter)`;
    stressDelta = Math.round((seismicMagnitude - 4.0) * 12);
    simulatedRiskScore = Math.min(99, baselineRisk + stressDelta);
    simulatedHealthScore = Math.max(18, 62 - Math.round(stressDelta * 1.1));
    physicalConsequences = [
      `Tensile shear stress along ashlar courses widens existing crack from 2.4 mm to ${(2.4 + (seismicMagnitude - 4) * 0.8).toFixed(1)} mm`,
      `Secondary micro-fissure branching initiated on upper balcony corbels`,
      `Estimated masonry load redistribution risk: Elevated to Zone-IV peak tolerance`,
      `Component stability margin reduced by -${(stressDelta * 1.2).toFixed(0)}%`
    ];
    emergencyProtocol = "Immediate deployment of telescopic steel shoring scaffolding, acoustic emission sensor array installation, and structural laser displacement monitoring.";
  } else {
    scenarioTitle = "Intensive Urban Construction & Heavy Traffic Ground Vibration";
    stressDelta = Math.round(urbanVibration * 0.3);
    simulatedRiskScore = Math.min(92, baselineRisk + stressDelta);
    simulatedHealthScore = Math.max(35, 62 - Math.round(stressDelta * 0.6));
    physicalConsequences = [
      `Continuous low-frequency resonant vibrations (${urbanVibration} Hz) trigger mortar bond fatigue`,
      `Cumulative micro-settlement observed at base plinth substructure`,
      `Surface spalling delamination area expands by +${(urbanVibration * 0.8).toFixed(0)}%`,
      `Long-term structural fatigue threshold exceeded in unreinforced masonry joints`
    ];
    emergencyProtocol = "Enforce heavy vehicle vibration exclusion buffer zone (100m perimeter) and inject low-viscosity hydraulic lime grout into fatigued joint planes.";
  }

  return (
    <div className="bg-[#121418] border border-[#1E2228] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="bg-[#0E1013] border-b border-[#1E2228] px-6 py-4 flex flex-wrap justify-between items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase font-bold">Predictive Simulation Engine</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40 font-bold">
              What-If Hazard Modeling
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
            Extreme Climate & Disaster Scenario Simulator
          </h3>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#0E1013] p-1 rounded-lg border border-[#1E2228]">
          <button
            onClick={() => setActiveScenario('monsoon')}
            className={`text-xs px-3 py-1.5 rounded-lg font-mono transition flex items-center gap-1.5 ${
              activeScenario === 'monsoon'
                ? 'bg-sky-600 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🌧️ Monsoon Surge</span>
          </button>
          <button
            onClick={() => setActiveScenario('seismic')}
            className={`text-xs px-3 py-1.5 rounded-lg font-mono transition flex items-center gap-1.5 ${
              activeScenario === 'seismic'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🌋 Seismic Tremor</span>
          </button>
          <button
            onClick={() => setActiveScenario('urban')}
            className={`text-xs px-3 py-1.5 rounded-lg font-mono transition flex items-center gap-1.5 ${
              activeScenario === 'urban'
                ? 'bg-amber-600 text-[#090A0C] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🏗️ Urban Vibration</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stressor Controls & Parameters */}
        <div className="lg:col-span-6 space-y-5">
          
          <div className="bg-[#0E1013] p-4 rounded-xl border border-[#1E2228]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-gray-300 uppercase font-semibold">
                {activeScenario === 'monsoon' ? 'Excess Precipitation Surge (%):' : activeScenario === 'seismic' ? 'Earthquake Magnitude (Richter Scale):' : 'Continuous Ground Vibration (Hz):'}
              </span>
              <span className="text-sm font-mono font-bold text-[#C5A059]">
                {activeScenario === 'monsoon' ? `+${monsoonIntensity}% Excess` : activeScenario === 'seismic' ? `${seismicMagnitude} M` : `${urbanVibration} Hz`}
              </span>
            </div>

            {activeScenario === 'monsoon' && (
              <input
                type="range"
                min="10"
                max="100"
                value={monsoonIntensity}
                onChange={(e) => setMonsoonIntensity(Number(e.target.value))}
                className="w-full accent-sky-400 h-2 bg-[#181B22] rounded-lg cursor-pointer"
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
                className="w-full accent-rose-500 h-2 bg-[#181B22] rounded-lg cursor-pointer"
              />
            )}

            {activeScenario === 'urban' && (
              <input
                type="range"
                min="10"
                max="60"
                value={urbanVibration}
                onChange={(e) => setUrbanVibration(Number(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-[#181B22] rounded-lg cursor-pointer"
              />
            )}

            <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
              <span>Low Stress</span>
              <span>Moderate Stress</span>
              <span>Extreme Worst-Case</span>
            </div>
          </div>

          {/* Physical Consequences Checklist */}
          <div className="bg-[#0E1013] p-4 rounded-xl border border-[#1E2228] space-y-3">
            <div className="text-xs font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
              <span>⚠️ Simulated Structural & Physical Impact:</span>
            </div>

            <ul className="space-y-2 text-xs text-gray-300 font-sans">
              {physicalConsequences.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#121418] p-2.5 rounded border border-[#1E2228]">
                  <span className="text-rose-400 font-bold">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Comparative Impact Telemetry & Emergency Plan */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          
          {/* Baseline vs Simulated Score Comparison Card */}
          <div className="bg-[#0E1013] p-5 rounded-xl border border-[#1E2228] space-y-4">
            <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Stress-Tested Risk & Health Trajectory:
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Risk Score Comparison */}
              <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228] text-center">
                <div className="text-[10px] font-mono text-gray-400 uppercase">Vulnerability Risk</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-lg font-mono text-gray-400 line-through">{baselineRisk}</span>
                  <span className="text-2xl font-serif font-bold text-rose-500">{simulatedRiskScore}</span>
                  <span className="text-[10px] font-mono text-rose-400 font-bold">+{stressDelta} pts</span>
                </div>
                <div className="text-[10px] font-mono text-rose-400 mt-1 uppercase font-bold">
                  {simulatedRiskScore >= 70 ? '● EMERGENCY CRITICAL' : '▲ ELEVATED WATCH'}
                </div>
              </div>

              {/* Health Score Comparison */}
              <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228] text-center">
                <div className="text-[10px] font-mono text-gray-400 uppercase">Structural Health Index</div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-lg font-mono text-gray-400 line-through">62</span>
                  <span className="text-2xl font-serif font-bold text-amber-400">{simulatedHealthScore}</span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">/ 100</span>
                </div>
                <div className="text-[10px] font-mono text-amber-400 mt-1 uppercase font-bold">
                  Deterioration Accelerated
                </div>
              </div>
            </div>

            {/* Time Horizon Shift */}
            <div className="bg-[#121418] p-3 rounded border border-[#1E2228] text-xs flex justify-between items-center font-mono">
              <span className="text-gray-400">Intervention Horizon:</span>
              <span className="text-rose-400 font-bold">
                Shifted from 30 Days ➔ <strong className="underline">7-Day Emergency Window</strong>
              </span>
            </div>
          </div>

          {/* Mandated Contingency Remediation */}
          <div className="bg-[#0E1013] p-4 rounded-xl border border-l-4 border-l-rose-500 border-[#1E2228] space-y-1.5">
            <div className="text-xs font-mono text-[#C5A059] uppercase font-bold">
              Automated Contingency Protocol:
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-sans">
              {emergencyProtocol}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
