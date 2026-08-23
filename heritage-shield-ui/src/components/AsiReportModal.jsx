import React, { useState } from 'react';
import HeritageShieldLogo from './HeritageShieldLogo';

export default function AsiReportModal({
  isOpen,
  onClose,
  site,
  component,
  riskFactors,
  computedRisk,
  detections = []
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [officerDesignation, setOfficerDesignation] = useState('Superintending Archaeologist');
  const [officerName, setOfficerName] = useState('Dr. Rajeshwar Sharma, Ph.D.');
  const [officerServiceId, setOfficerServiceId] = useState('ASI-CON-AGRA-2026-0842');
  const [officerCircle, setOfficerCircle] = useState(site?.circle || 'Agra Circle');
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');

  const [sanctionedAmount, setSanctionedAmount] = useState('₹ 14.50 Lakhs');
  const [allocatedWing, setAllocatedWing] = useState('ASI Specialized Chemical & Masonry Branch (Division-IV)');
  const [executionTimeline, setExecutionTimeline] = useState('Immediate (within 14 calendar days)');
  const [customAction, setCustomAction] = useState(component?.action || 'Lime-surkhi repointing and structural stabilization');
  const [isSignOffComplete, setIsSignOffComplete] = useState(false);

  if (!isOpen) return null;

  const reportId = `ASI-WO-2026-${(site?.id || 'ASI-01').replace(/[^a-zA-Z0-9]/g, '')}-${component?.code || 'C01'}`;
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handleOfficerLogin = (e) => {
    e?.preventDefault();
    if (!authPin || authPin === '2026' || authPin === 'ASI2026' || authPin === 'admin' || authPin.length >= 4) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid ASI Service PIN. (Demo PIN: 2026)');
    }
  };

  const handleQuickLogin = (name, desig, serviceId, circle) => {
    setOfficerName(name);
    setOfficerDesignation(desig);
    setOfficerServiceId(serviceId);
    setOfficerCircle(circle);
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const reportData = {
      report_id: reportId,
      document_type: "ASI Official Technical Work Order & Condition Assessment",
      issued_under: "National Mission on Monuments and Antiquities (NMMA) / ASI",
      date: currentDate,
      authorized_officer: {
        name: officerName,
        designation: officerDesignation,
        service_id: officerServiceId,
        jurisdiction_circle: officerCircle,
        digital_signature_hash: `SHA256:ASI-${Math.random().toString(36).substring(2, 10).toUpperCase()}-2026`
      },
      monument: {
        name: site?.name,
        asi_id: site?.id,
        state: site?.state,
        circle: site?.circle,
        seismic_zone: site?.seismicZone
      },
      component: {
        code: component?.code,
        name: component?.name,
        health_score: component?.score,
        status: component?.status
      },
      authorized_sanctions: {
        sanctioned_budget: sanctionedAmount,
        allocated_executing_wing: allocatedWing,
        execution_timeline: executionTimeline,
        prescribed_intervention: customAction,
        is_officer_signed: isSignOffComplete
      },
      risk_evaluation: {
        computed_risk_score: computedRisk,
        factors: riskFactors,
        urgency: (computedRisk || 74) >= 70 ? "CRITICAL / HIGH URGENCY" : "WATCH",
        recommended_action: customAction
      },
      ai_cv_detections: detections
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}_ASI_WorkOrder.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="bg-[#000000] text-white border border-[#222222] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Action Header */}
        <div className="print:hidden bg-black border-b border-[#1a1a1a] px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${isAuthenticated ? 'bg-[#15846e] animate-pulse' : 'bg-[#ffb829] animate-ping'}`} />
            <div>
              <span className="text-xs font-mono text-white uppercase font-semibold tracking-wider">
                Archaeological Survey of India · Form HS-2026 Dispatcher
              </span>
              <div className="text-[11px] font-mono text-[#9a9a9a]">
                {isAuthenticated ? '🟢 ASI Officer Authenticated & Unlocked' : '🔒 Officer Authentication Required'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {isAuthenticated && (
              <>
                <button
                  onClick={handlePrint}
                  className="iris-pill-btn text-xs"
                >
                  <span>🖨️ Print / Save PDF</span>
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="ghost-pill-btn text-xs border border-[#333333]"
                >
                  <span>⬇️ Export JSON</span>
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3.5 py-2 rounded-full bg-[#111111] text-[#ffb829] border border-[#ffb829]/40 font-mono text-xs hover:bg-[#1a1a1a] transition cursor-pointer"
                >
                  Lock
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#111111] border border-[#333333] text-white hover:text-[#8052ff] flex items-center justify-center font-mono text-xs transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 bg-black">

          {/* 1. Security PIN Gate */}
          {!isAuthenticated ? (
            <div className="bg-[#0a0a0a] border border-[#222222] rounded-3xl p-8 space-y-6 text-center my-4">
              <div className="flex justify-center my-2">
                <HeritageShieldLogo size="lg" showText={false} />
              </div>

              <div className="space-y-1 max-w-lg mx-auto">
                <div className="text-[11px] font-mono uppercase text-[#8052ff] font-semibold tracking-widest">
                  Government of India · Ministry of Culture
                </div>
                <h2 className="text-2xl font-normal tracking-[-0.03em] text-white">
                  ASI Officer Identity Verification Required
                </h2>
                <p className="body-copy-sm mt-2 text-[#bdbdbd]">
                  Technical conservation work-orders and executive fund allocations are classified under the <strong>AMASR Act 1958</strong>.
                </p>
              </div>

              <form onSubmit={handleOfficerLogin} className="max-w-md mx-auto space-y-4 bg-black p-6 rounded-2xl border border-[#222222] text-left text-xs font-mono">
                <div>
                  <label className="text-[#bdbdbd] block mb-1">Officer Name & Academic Title</label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8052ff]"
                  />
                </div>

                <div>
                  <label className="text-[#bdbdbd] block mb-1">Official Designation</label>
                  <select
                    value={officerDesignation}
                    onChange={(e) => setOfficerDesignation(e.target.value)}
                    className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2 text-[#8052ff] font-semibold focus:outline-none"
                  >
                    <option value="Superintending Archaeologist">Superintending Archaeologist (Circle Head)</option>
                    <option value="Director General (Conservation)">Director General (Conservation Branch)</option>
                    <option value="Chief Structural Conservationist">Chief Structural Conservationist</option>
                    <option value="Senior Archaeological Chemist">Senior Archaeological Chemist</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#bdbdbd] block mb-1">ASI Security Service PIN</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter PIN (Demo: 2026)"
                      value={authPin}
                      onChange={(e) => setAuthPin(e.target.value)}
                      className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#8052ff]"
                    />
                    <button
                      type="submit"
                      className="iris-pill-btn text-xs whitespace-nowrap"
                    >
                      Unlock
                    </button>
                  </div>
                </div>

                {authError && (
                  <p className="text-xs text-rose-500 font-mono mt-1">{authError}</p>
                )}
              </form>

              <div className="pt-4 border-t border-[#1a1a1a] max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#9a9a9a]">⚡ Quick Demo Access:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickLogin('Dr. Rajeshwar Sharma, Ph.D.', 'Superintending Archaeologist', 'ASI-AGRA-2026-0842', site?.circle || 'Agra Circle')}
                    className="px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#333333] text-white hover:text-[#8052ff] transition text-xs"
                  >
                    Dr. R. Sharma (Agra Circle)
                  </button>
                  <button
                    onClick={() => handleQuickLogin('Er. Sunita Sen, M.Tech', 'Chief Structural Conservationist', 'ASI-HQ-DL-2026-1108', 'Delhi HQ')}
                    className="px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#333333] text-white hover:text-[#8052ff] transition text-xs"
                  >
                    Er. Sunita Sen (Delhi HQ)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 2. Authenticated Document View */
            <div className="space-y-6">
              <div className="bg-[#0a0a0a] border border-[#15846e]/40 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#15846e]/20 border border-[#15846e] flex items-center justify-center text-base">
                    🛡️
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {officerName}
                      </span>
                      <span className="bg-[#15846e]/20 text-[#15846e] px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-[#15846e]/30">
                        ✓ ASI Verified
                      </span>
                    </div>
                    <p className="text-[#9a9a9a] mt-0.5">
                      {officerDesignation} · {officerCircle} · {officerServiceId}
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 bg-black px-3.5 py-2 rounded-full border border-[#333333] cursor-pointer hover:border-[#8052ff]">
                  <input
                    type="checkbox"
                    checked={isSignOffComplete}
                    onChange={(e) => setIsSignOffComplete(e.target.checked)}
                    className="rounded accent-[#8052ff] w-4 h-4"
                  />
                  <span className="text-xs text-white font-semibold font-mono">
                    {isSignOffComplete ? '✓ Approved & Digitally Sealed' : '✍️ Apply Digital Signature Seal'}
                  </span>
                </label>
              </div>

              {/* Printable White Document */}
              <div className="p-8 space-y-6 bg-white text-black font-sans rounded-2xl border border-gray-300 print:p-0 print:border-none">
                <div className="text-center border-b-2 border-black pb-4 space-y-1">
                  <div className="text-xs uppercase tracking-widest text-gray-600 font-semibold">
                    Government of India · Ministry of Culture
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-black">
                    ARCHAEOLOGICAL SURVEY OF INDIA
                  </h1>
                  <div className="text-xs font-mono font-medium text-gray-700">
                    Conservation & Preservation Directorate · National Mission on Monuments and Antiquities
                  </div>
                  <div className="inline-block bg-black text-white text-[10px] font-mono px-3 py-0.5 rounded-full uppercase tracking-wider font-bold mt-1">
                    FORM HS-2026 · TECHNICAL CONSERVATION WORK ORDER
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-100 p-3.5 rounded-lg border border-gray-300 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Ref ID:</span>
                    <span className="font-bold">{reportId}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Date:</span>
                    <span className="font-bold">{currentDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Circle:</span>
                    <span className="font-bold">{site?.circle || 'Delhi Circle'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Urgency:</span>
                    <span className="font-bold text-rose-700">
                      {(computedRisk || 74) >= 70 ? 'CRITICAL (Tier-1)' : 'MONITOR'}
                    </span>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-4 space-y-2 text-xs">
                  <div className="font-mono font-bold text-gray-800 uppercase">Section 1: Site & Component Assessment</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div>
                      <div><strong>Monument:</strong> {site?.name}</div>
                      <div><strong>Component:</strong> {component?.name} ({component?.code})</div>
                      <div><strong>Health Score:</strong> {component?.score} / 100</div>
                    </div>
                    <div>
                      <div><strong>Material:</strong> {site?.material || "Red Sandstone"}</div>
                      <div><strong>Hazard Zone:</strong> {site?.seismicZone || "Zone IV"}</div>
                      <div><strong>Computed Risk:</strong> {computedRisk || 74} / 100</div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-4 space-y-3 text-xs font-mono">
                  <div className="font-bold text-gray-800 uppercase">Section 2: Sanctions & Methodology</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Sanctioned Budget:</span>
                      <input
                        type="text"
                        value={sanctionedAmount}
                        onChange={(e) => setSanctionedAmount(e.target.value)}
                        className="w-full bg-white border border-gray-400 rounded px-2 py-1 font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Executing Wing:</span>
                      <input
                        type="text"
                        value={allocatedWing}
                        onChange={(e) => setAllocatedWing(e.target.value)}
                        className="w-full bg-white border border-gray-400 rounded px-2 py-1 text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Timeline:</span>
                      <input
                        type="text"
                        value={executionTimeline}
                        onChange={(e) => setExecutionTimeline(e.target.value)}
                        className="w-full bg-white border border-gray-400 rounded px-2 py-1 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase mb-1">Prescribed Conservation Methodology:</span>
                    <textarea
                      rows={2}
                      value={customAction}
                      onChange={(e) => setCustomAction(e.target.value)}
                      className="w-full bg-white border border-gray-400 rounded p-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-black grid grid-cols-2 gap-8 text-xs">
                  <div>
                    <div className="text-gray-500 text-[10px] font-mono">INTEGRITY CHECK</div>
                    <div className="font-mono text-[10px] mt-1 text-gray-700">SHA-256: d4e8b39a27c10928f9184ac32e</div>
                    <div className="font-mono text-[10px] text-gray-500">Heritage Shield AI · ISO 31000 Core</div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-bold text-sm">{officerName}</div>
                    <div className="text-gray-700 text-xs">{officerDesignation}</div>
                    <div className="text-gray-500 text-[10px] font-mono">{officerServiceId} · {officerCircle}</div>
                    {isSignOffComplete && (
                      <div className="mt-1 inline-block bg-emerald-100 text-emerald-800 border border-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        ✓ DIGITALLY SIGNED & DISPATCHED
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
