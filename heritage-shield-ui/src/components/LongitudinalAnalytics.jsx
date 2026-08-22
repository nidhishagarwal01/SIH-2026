import React, { useState } from 'react';

export default function LongitudinalAnalytics({
  activeComponent = 'North Façade Wall (Main Shaft)'
}) {
  const [selectedMetric, setSelectedMetric] = useState('health'); // 'health' | 'crack' | 'moisture'
  const [interventionYear, setInterventionYear] = useState('2026'); // '2026' | 'none'
  const [hoveredYear, setHoveredYear] = useState('2026');

  // Multi-Year Longitudinal Historical & Forecast Dataset (2020 - 2028)
  const timeSeriesData = [
    { year: '2020', label: '2020 Baseline', health: 91, crackLength: 12.4, moisture: 6.2, type: 'historical', note: 'Initial NMMA Baseline Documentation' },
    { year: '2022', label: '2022 Cycle', health: 84, crackLength: 15.1, moisture: 9.8, type: 'historical', note: 'First micro-fissures observed on upper mortar courses' },
    { year: '2024', label: '2024 Cycle', health: 76, crackLength: 18.2, moisture: 11.5, type: 'historical', note: 'Tensile shear stress accelerating post-monsoon' },
    { year: '2026', label: '2026 Current', health: 62, crackLength: 25.1, moisture: 14.8, type: 'current', note: 'Current Inspection: Branching fissure & capillary dampness surge' },
    // Forecast Scenarios
    {
      year: '2027',
      label: '2027 Forecast',
      healthNoIntervention: 48,
      healthWithIntervention: 85,
      crackNoIntervention: 34.0,
      crackWithIntervention: 25.1,
      moistureNoIntervention: 24.5,
      moistureWithIntervention: 5.2,
      type: 'forecast',
      note: 'Forecast Horizon: Rapid spalling if moisture unsealed'
    },
    {
      year: '2028',
      label: '2028 Horizon',
      healthNoIntervention: 28,
      healthWithIntervention: 92,
      crackNoIntervention: 44.8,
      crackWithIntervention: 25.1,
      moistureNoIntervention: 38.5,
      moistureWithIntervention: 3.8,
      type: 'forecast',
      note: 'Critical Point: Structural delamination without intervention'
    }
  ];

  return (
    <div className="bg-[#121418] border border-[#1E2228] rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#0E1013] border-b border-[#1E2228] px-6 py-4 flex flex-wrap justify-between items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase font-bold">Predictive Analytics</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 font-bold">
              Time-Series & Decay Forecasting
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
            Longitudinal Condition History & 2028 Predictive Decay Curves
          </h3>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex items-center gap-1.5 bg-[#0E1013] p-1 rounded-lg border border-[#1E2228]">
          <button
            onClick={() => setSelectedMetric('health')}
            title="Display historical and projected overall health score (0-100)"
            className={`text-xs px-3.5 py-1.5 rounded-lg font-mono transition flex items-center gap-1.5 ${
              selectedMetric === 'health'
                ? 'bg-[#C5A059] text-[#090A0C] font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📊</span>
            <span>Overall Health Score (0–100)</span>
          </button>
          <button
            onClick={() => setSelectedMetric('crack')}
            title="Display structural crack expansion history and velocity (cm)"
            className={`text-xs px-3.5 py-1.5 rounded-lg font-mono transition flex items-center gap-1.5 ${
              selectedMetric === 'crack'
                ? 'bg-rose-600 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🔴</span>
            <span>Crack Growth (cm)</span>
          </button>
          <button
            onClick={() => setSelectedMetric('moisture')}
            title="Display surface and sub-surface moisture saturation history (%)"
            className={`text-xs px-3.5 py-1.5 rounded-lg font-mono transition flex items-center gap-1.5 ${
              selectedMetric === 'moisture'
                ? 'bg-sky-600 text-white font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>💧</span>
            <span>Moisture Ingress (%)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visual SVG Curve + Predictive Telemetry */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Time-Series Canvas */}
        <div className="lg:col-span-8 bg-[#090A0C] border border-[#1E2228] rounded-xl p-5 relative flex flex-col justify-between min-h-[380px] overflow-hidden select-none">
          
          {/* Top Canvas Legend */}
          <div className="flex flex-wrap justify-between items-center gap-2 z-10">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-3 h-0.5 bg-gray-400"></span> 2020–2026 Observations
              </span>
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-3 h-0.5 bg-rose-500 border-b border-dashed"></span> Path A: No Action
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-3 h-0.5 bg-emerald-500"></span> Path B: 2026 Preventive Sealing
              </span>
            </div>

            <div className="text-[11px] font-mono text-gray-400">
              Target: <strong className="text-gray-200">{activeComponent}</strong>
            </div>
          </div>

          {/* SVG Multi-Curve Chart */}
          <div className="relative w-full h-[240px] my-3">
            <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
              
              {/* Horizontal Grid Lines */}
              <line x1="40" y1="40" x2="580" y2="40" stroke="#1A1D23" strokeWidth="1" />
              <line x1="40" y1="90" x2="580" y2="90" stroke="#1A1D23" strokeWidth="1" />
              <line x1="40" y1="140" x2="580" y2="140" stroke="#1A1D23" strokeWidth="1" />
              <line x1="40" y1="190" x2="580" y2="190" stroke="#1A1D23" strokeWidth="1" />

              {/* Threshold Danger Zone Background (Below 45 Health) */}
              {selectedMetric === 'health' && (
                <rect x="40" y="150" width="540" height="70" fill="rgba(224,90,71,0.06)" />
              )}

              {/* Vertical Year Dividers */}
              <line x1="360" y1="20" x2="360" y2="210" stroke="#C5A059" strokeWidth="1" strokeDasharray="3,3" />
              <text x="365" y="32" fill="#C5A059" fontSize="10" fontFamily="monospace" fontWeight="bold">2026 (NOW)</text>

              {/* --- HEALTH METRIC RENDERING --- */}
              {selectedMetric === 'health' && (
                <>
                  {/* Historical Solid Line */}
                  <polyline
                    points="60,50 160,65 260,82 360,115"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="3"
                  />

                  {/* Path A (No Intervention) */}
                  <polyline
                    points="360,115 460,145 560,185"
                    fill="none"
                    stroke="#E05A47"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                  />

                  {/* Path B (Preventive Action) */}
                  <polyline
                    points="360,115 460,62 560,48"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                  />

                  {/* Historical Node Dots */}
                  <circle cx="60" cy="50" r="4" fill="#C5A059" />
                  <circle cx="160" cy="65" r="4" fill="#C5A059" />
                  <circle cx="260" cy="82" r="4" fill="#C5A059" />
                  <circle cx="360" cy="115" r="6" fill="#C5A059" stroke="#fff" strokeWidth="2" />

                  {/* Forecast Node Dots */}
                  <circle cx="460" cy="145" r="4" fill="#E05A47" />
                  <circle cx="560" cy="185" r="5" fill="#E05A47" />
                  <circle cx="460" cy="62" r="4" fill="#10B981" />
                  <circle cx="560" cy="48" r="5" fill="#10B981" />
                </>
              )}

              {/* --- CRACK LENGTH METRIC RENDERING --- */}
              {selectedMetric === 'crack' && (
                <>
                  <polyline
                    points="60,170 160,155 260,138 360,105"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="3"
                  />
                  <polyline
                    points="360,105 460,65 560,30"
                    fill="none"
                    stroke="#E05A47"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                  />
                  <polyline
                    points="360,105 460,105 560,105"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                  />
                  <circle cx="360" cy="105" r="6" fill="#C5A059" stroke="#fff" strokeWidth="2" />
                  <circle cx="560" cy="30" r="5" fill="#E05A47" />
                  <circle cx="560" cy="105" r="5" fill="#10B981" />
                </>
              )}

              {/* --- MOISTURE METRIC RENDERING --- */}
              {selectedMetric === 'moisture' && (
                <>
                  <polyline
                    points="60,180 160,165 260,155 360,135"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="3"
                  />
                  <polyline
                    points="360,135 460,95 560,40"
                    fill="none"
                    stroke="#E05A47"
                    strokeWidth="3"
                    strokeDasharray="4,4"
                  />
                  <polyline
                    points="360,135 460,185 560,192"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                  />
                  <circle cx="360" cy="135" r="6" fill="#C5A059" stroke="#fff" strokeWidth="2" />
                  <circle cx="560" cy="40" r="5" fill="#E05A47" />
                  <circle cx="560" cy="192" r="5" fill="#10B981" />
                </>
              )}

              {/* X-Axis Labels */}
              <text x="50" y="230" fill="#6E6A60" fontSize="11" fontFamily="monospace">2020</text>
              <text x="150" y="230" fill="#6E6A60" fontSize="11" fontFamily="monospace">2022</text>
              <text x="250" y="230" fill="#6E6A60" fontSize="11" fontFamily="monospace">2024</text>
              <text x="350" y="230" fill="#C5A059" fontSize="11" fontFamily="monospace" fontWeight="bold">2026</text>
              <text x="450" y="230" fill="#A7A296" fontSize="11" fontFamily="monospace">2027 (F)</text>
              <text x="545" y="230" fill="#A7A296" fontSize="11" fontFamily="monospace">2028 (F)</text>
            </svg>
          </div>

          {/* Bottom Time Horizon Controls */}
          <div className="flex flex-wrap justify-between items-center gap-2 border-t border-[#1E2228] pt-3 text-xs font-mono text-gray-400">
            <span>Historical Ground Truth: <strong>4 Inspection Epochs (2020–2026)</strong></span>
            <span className="text-emerald-400">
              ARIMA Time-Series Confidence: <strong>91.4% (R² = 0.88)</strong>
            </span>
          </div>
        </div>

        {/* Right Column: Cost-Benefit & Preventive ROI Engine */}
        <div className="lg:col-span-4 bg-[#121418] border border-[#1E2228] rounded-xl p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
                Economic & Structural Impact Analysis:
              </span>
              <h4 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
                The Cost of Delayed Conservation
              </h4>
            </div>

            {/* Path A vs Path B Comparison Cards */}
            <div className="space-y-2.5">
              
              {/* Path A (Delayed) */}
              <div className="bg-[#0E1013] border border-rose-900/40 p-3 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono font-bold text-rose-400">🔴 Path A: Delay to 2028</span>
                  <span className="text-xs font-mono font-bold text-rose-400">₹48.5 Lakhs</span>
                </div>
                <div className="text-[11px] text-gray-400 leading-relaxed">
                  Full scaffolding, stone re-dressing, structural steel bracing, and partial masonry dismantling.
                </div>
              </div>

              {/* Path B (Preventive 2026) */}
              <div className="bg-[#0E1013] border border-emerald-900/40 p-3 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">🟢 Path B: Intervene in 2026</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">₹3.2 Lakhs</span>
                </div>
                <div className="text-[11px] text-gray-400 leading-relaxed">
                  Lime-surkhi micro-grouting, breathable silane moisture-barrier sealing, and drainage clearing.
                </div>
              </div>

            </div>

            {/* ROI Metric Badge */}
            <div className="bg-[#0E1013] p-3.5 rounded-lg border border-[#1E2228] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-gray-400 uppercase">Preventive Budget Savings:</div>
                <div className="text-xl font-serif font-bold text-emerald-400 mt-0.5">₹45.3 Lakhs</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-gray-400 uppercase">Cost Reduction:</div>
                <div className="text-xl font-mono font-bold text-[#C5A059] mt-0.5">93.4%</div>
              </div>
            </div>

          </div>

          {/* Winning Pitch Quote */}
          <div className="bg-[#0E1013] p-3 rounded border-l-4 border-l-emerald-500 border-[#1E2228] text-[11px] text-gray-300 leading-relaxed italic">
            "Preventive conservation protects public funds by mitigating micro-fissures before they evolve into catastrophic structural collapse."
          </div>

        </div>
      </div>
    </div>
  );
}
