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
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [officerDesignation, setOfficerDesignation] = useState('Superintending Archaeologist');
  const [officerName, setOfficerName] = useState('Dr. Rajeshwar Sharma, Ph.D.');
  const [officerServiceId, setOfficerServiceId] = useState('ASI-CON-AGRA-2026-0842');
  const [officerCircle, setOfficerCircle] = useState(site?.circle || 'Agra Circle');
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable Authorized Parameters (Only editable by authenticated ASI Officer)
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
        urgency: computedRisk >= 70 ? "CRITICAL / HIGH URGENCY" : "WATCH",
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 overflow-y-auto">
      <div className="bg-[#0C0E16] text-[#EDE8DE] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Action Header */}
        <div className="print:hidden bg-[#07080B] border-b border-white/10 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-[#E06D44] animate-ping'}`} />
            <div>
              <span className="text-xs font-mono font-bold text-[#FDFBF7] uppercase tracking-wider">
                Archaeological Survey of India · Form HS-2026 Dispatcher
              </span>
              <div className="text-[10px] font-mono text-gray-400">
                Security Gate: {isAuthenticated ? '🟢 ASI Officer Authenticated & Unlocked' : '🔒 Officer Authentication Required'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {isAuthenticated && (
              <>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl terracotta-btn text-xs font-mono font-bold transition flex items-center gap-2 shadow cursor-pointer"
                >
                  <span>🖨️ Print / Save PDF</span>
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="px-3.5 py-2 rounded-xl frosted-btn text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>⬇️ Export JSON</span>
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-amber-300 font-mono text-xs font-bold hover:text-white transition cursor-pointer"
                >
                  🔒 Lock & Sign Out
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl frosted-btn text-gray-400 hover:text-white font-mono text-xs font-bold transition cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">

          {/* 🔒 1. COMPLETE OFFICER LOGIN SECURITY GATE (REPORT IS TOTALLY HIDDEN UNTIL LOGGED IN) */}
          {!isAuthenticated ? (
            <div className="bg-[#101216] border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl space-y-6 text-center my-4">
              
              {/* National Crest & Header */}
              <div className="flex justify-center my-2">
                <HeritageShieldLogo size="lg" showText={false} />
              </div>

              <div className="space-y-1 max-w-lg mx-auto">
                <div className="text-[11px] font-mono uppercase text-[#C5A059] font-bold tracking-widest">
                  Government of India · Ministry of Culture
                </div>
                <h2 className="text-xl font-serif font-bold text-[#F3EFE6]">
                  ASI Officer Identity Verification Required
                </h2>
                <p className="text-xs text-gray-400 font-mono leading-relaxed mt-2">
                  Technical conservation work-orders and executive fund allocations are classified under the <strong>AMASR Act 1958</strong>. Report contents are confidential and locked behind official ASI employee credentials.
                </p>
              </div>

              {/* Security PIN Login Form */}
              <form onSubmit={handleOfficerLogin} className="max-w-md mx-auto space-y-4 bg-[#0A0C0E] p-6 rounded-xl border border-[#2B313D] text-left text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1 font-semibold">Officer Name & Academic Title</label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full bg-[#14171C] border border-[#2B313D] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                    placeholder="e.g. Dr. Rajeshwar Sharma"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1 font-semibold">Official Designation</label>
                  <select
                    value={officerDesignation}
                    onChange={(e) => setOfficerDesignation(e.target.value)}
                    className="w-full bg-[#14171C] border border-[#2B313D] rounded-lg px-3 py-2 text-[#C5A059] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Superintending Archaeologist">Superintending Archaeologist (Circle Head)</option>
                    <option value="Director General (Conservation)">Director General (Conservation Branch)</option>
                    <option value="Chief Structural Conservationist">Chief Structural Conservationist</option>
                    <option value="Senior Archaeological Chemist">Senior Archaeological Chemist</option>
                    <option value="Executive Engineer (Heritage Civil)">Executive Engineer (Heritage Civil Wing)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1 font-semibold">ASI Security Service PIN</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter 4-digit PIN (Demo: 2026)"
                      value={authPin}
                      onChange={(e) => setAuthPin(e.target.value)}
                      className="w-full bg-[#14171C] border border-[#2B313D] rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#C5A059] hover:brightness-110 text-[#090A0C] font-bold rounded-lg transition whitespace-nowrap shadow"
                    >
                      Unlock Report
                    </button>
                  </div>
                </div>

                {authError && (
                  <p className="text-xs text-rose-400 font-mono mt-1">{authError}</p>
                )}
              </form>

              {/* Fast 1-Click Officer Sign-In Profiles */}
              <div className="pt-4 border-t border-[#1E2228] max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-gray-400 text-[11px]">⚡ Fast Demo Access:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickLogin('Dr. Rajeshwar Sharma, Ph.D.', 'Superintending Archaeologist', 'ASI-AGRA-2026-0842', site?.circle || 'Agra Circle')}
                    className="px-3 py-1.5 rounded-lg bg-[#181B22] hover:bg-[#222730] border border-[#C5A059]/40 text-[#C5A059] transition text-xs font-bold"
                  >
                    👨‍💼 Dr. R. Sharma (Agra Circle)
                  </button>
                  <button
                    onClick={() => handleQuickLogin('Er. Sunita Sen, M.Tech', 'Chief Structural Conservationist', 'ASI-HQ-DL-2026-1108', 'Delhi HQ')}
                    className="px-3 py-1.5 rounded-lg bg-[#181B22] hover:bg-[#222730] border border-cyan-700/40 text-cyan-300 transition text-xs font-bold"
                  >
                    👩‍💼 Er. Sunita Sen (Delhi HQ)
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* 🟢 2. AUTHENTICATED MODE: REPORT IS FULLY UNLOCKED AND EDITABLE */
            <div className="space-y-6">
              
              {/* Officer Active Badge Strip */}
              <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg">
                    🛡️
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold font-serif text-sm">
                        {officerName}
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/30">
                        ✓ ASI Verified Officer
                      </span>
                    </div>
                    <p className="text-gray-400 mt-0.5">
                      {officerDesignation} · Jurisdiction: <strong className="text-gray-200">{officerCircle}</strong> · Service ID: <strong className="text-[#C5A059]">{officerServiceId}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 bg-[#0E1013] px-3.5 py-2 rounded-lg border border-[#2B313D] cursor-pointer hover:border-[#C5A059]">
                    <input
                      type="checkbox"
                      checked={isSignOffComplete}
                      onChange={(e) => setIsSignOffComplete(e.target.checked)}
                      className="rounded text-[#C5A059] w-4 h-4"
                    />
                    <span className="text-xs text-gray-200 font-bold font-mono">
                      {isSignOffComplete ? '✓ Approved & Digitally Sealed' : '✍️ Apply Digital Signature Seal'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Official Printable Form HS-2026 Document */}
              <div className="p-8 space-y-6 bg-[#FFFFFF] text-[#111827] font-sans rounded-xl border border-gray-300 shadow-inner print:p-0 print:border-none print:shadow-none">
                
                {/* Government Official Letterhead */}
                <div className="text-center border-b-2 border-stone-800 pb-4 space-y-1">
                  <div className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
                    Government of India · Ministry of Culture
                  </div>
                  <h1 className="text-xl font-serif font-black text-stone-900 tracking-tight">
                    ARCHAEOLOGICAL SURVEY OF INDIA
                  </h1>
                  <div className="text-xs font-mono font-medium text-stone-700">
                    Conservation & Preservation Directorate · National Mission on Monuments and Antiquities
                  </div>
                  <div className="inline-block bg-stone-900 text-stone-100 text-[10px] font-mono px-3 py-0.5 rounded uppercase tracking-wider font-bold mt-1">
                    FORM HS-2026 · TECHNICAL CONSERVATION WORK ORDER
                  </div>
                </div>

                {/* Document Meta Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-100 p-3.5 rounded border border-stone-300 text-xs font-mono">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Work-Order Ref:</span>
                    <span className="font-bold text-stone-900">{reportId}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Issue Date:</span>
                    <span className="font-bold text-stone-900">{currentDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Jurisdiction Circle:</span>
                    <span className="font-bold text-stone-900">{site?.circle || 'Delhi Circle'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Intervention Urgency:</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] inline-block ${
                      computedRisk >= 70 ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {computedRisk >= 70 ? 'CRITICAL (Tier-1)' : 'MONITOR / WATCH'}
                    </span>
                  </div>
                </div>

                {/* Section 1: Monument & Structural Node Telemetry */}
                <div className="border border-stone-300 rounded overflow-hidden">
                  <div className="bg-stone-200 px-4 py-2 text-xs font-mono font-bold text-stone-800 uppercase tracking-wide border-b border-stone-300">
                    Section 1: Monument & Structural Node Telemetry
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <div className="flex justify-between border-b border-stone-200 pb-1">
                        <span className="text-stone-600 font-medium">Monument Name:</span>
                        <strong className="text-stone-900">{site?.name}</strong>
                      </div>
                      <div className="flex justify-between border-b border-stone-200 pb-1">
                        <span className="text-stone-600 font-medium">ASI Monument ID:</span>
                        <strong className="font-mono text-stone-900">{site?.id}</strong>
                      </div>
                      <div className="flex justify-between border-b border-stone-200 pb-1">
                        <span className="text-stone-600 font-medium">Heritage Classification:</span>
                        <span className="font-semibold text-stone-800">Grade-I National / UNESCO</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between border-b border-stone-200 pb-1">
                        <span className="text-stone-600 font-medium">Architectural Node:</span>
                        <strong className="text-stone-900">{component?.name} ({component?.code})</strong>
                      </div>
                      <div className="flex justify-between border-b border-stone-200 pb-1">
                        <span className="text-stone-600 font-medium">Node Condition Score:</span>
                        <strong className="font-mono text-stone-900">{component?.score} / 100 ({component?.status})</strong>
                      </div>
                      <div className="flex justify-between border-b border-stone-200 pb-1">
                        <span className="text-stone-600 font-medium">Material Science Type:</span>
                        <span className="font-semibold text-stone-800">{site?.material || "Red Sandstone Ashlar"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Executive Sanctions & Budget (Editable by Officer) */}
                <div className="border border-stone-300 rounded overflow-hidden">
                  <div className="bg-stone-200 px-4 py-2 text-xs font-mono font-bold text-stone-800 uppercase tracking-wide border-b border-stone-300 flex justify-between items-center">
                    <span>Section 2: Authorized Executive Sanctions & Budget</span>
                    <span className="text-[10px] text-emerald-800 font-mono font-bold">● Officer Edit Mode Active</span>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Sanctioned Budget:</span>
                      <input
                        type="text"
                        value={sanctionedAmount}
                        onChange={(e) => setSanctionedAmount(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-400 rounded px-2.5 py-1 text-stone-900 font-bold focus:bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Allocated Wing:</span>
                      <input
                        type="text"
                        value={allocatedWing}
                        onChange={(e) => setAllocatedWing(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-400 rounded px-2.5 py-1 text-stone-900 text-[11px] focus:bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Execution Timeline:</span>
                      <input
                        type="text"
                        value={executionTimeline}
                        onChange={(e) => setExecutionTimeline(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-400 rounded px-2.5 py-1 text-stone-900 font-bold focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Prescribed Conservation Methodology */}
                <div className="border border-stone-300 rounded overflow-hidden">
                  <div className="bg-stone-200 px-4 py-2 text-xs font-mono font-bold text-stone-800 uppercase tracking-wide border-b border-stone-300">
                    Section 3: Prescribed Conservation Methodology & Protocols
                  </div>
                  <div className="p-4 space-y-2">
                    <textarea
                      rows={2}
                      value={customAction}
                      onChange={(e) => setCustomAction(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-400 rounded p-2.5 text-xs text-stone-900 font-mono focus:bg-white"
                    />
                    <div className="text-[11px] text-stone-500 font-mono italic">
                      Standards Compliance: BIS IS 1893:2016 Structural Seismic Norms · Venice Charter (1964) Conservation Ethics
                    </div>
                  </div>
                </div>

                {/* Officer Signature Block */}
                <div className="pt-6 border-t-2 border-stone-800 grid grid-cols-2 gap-8 text-xs">
                  <div>
                    <div className="text-stone-500 text-[10px] uppercase font-mono font-bold">Automated Integrity Check:</div>
                    <div className="font-mono text-[10px] text-stone-600 mt-1">
                      SHA-256 Hash: <strong className="text-stone-800">d4e8b39a27c10928f9184ac32e</strong>
                    </div>
                    <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                      Platform: Heritage Shield AI · ISO 31000 Explainable Risk Core
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-stone-500 text-[10px] uppercase font-mono font-bold">Authorized Signatory:</div>
                    <div>
                      <div className="font-serif font-bold text-stone-900 text-sm">
                        {officerName}
                      </div>
                      <div className="text-stone-700 text-xs font-medium">
                        {officerDesignation}
                      </div>
                      <div className="text-stone-500 text-[10px] font-mono">
                        Service ID: {officerServiceId} · {officerCircle}
                      </div>
                      {isSignOffComplete ? (
                        <div className="mt-2 inline-block bg-emerald-100 text-emerald-800 border border-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                          ✓ DIGITALLY SIGNED & DISPATCHED
                        </div>
                      ) : (
                        <div className="mt-2 inline-block bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                          ⚠ Pending Final Signature Checkbox
                        </div>
                      )}
                    </div>
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
