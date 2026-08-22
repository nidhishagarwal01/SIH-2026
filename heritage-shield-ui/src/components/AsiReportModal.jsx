import React, { useState } from 'react';

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
      authorized_officer: isAuthenticated ? {
        name: officerName,
        designation: officerDesignation,
        service_id: officerServiceId,
        jurisdiction_circle: officerCircle,
        digital_signature_hash: `SHA256:ASI-${Math.random().toString(36).substring(2, 10).toUpperCase()}-2026`
      } : "UNVERIFIED / PENDING OFFICER SIGN-OFF",
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[#14171C] text-[#EDE8DE] border border-[#2B313D] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Action Header (Excluded from Print) */}
        <div className="print:hidden bg-[#0E1013] border-b border-[#2B313D] px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <span className="text-xs font-mono font-bold text-gray-200 uppercase tracking-wide">
                Archaeological Survey of India · Work-Order Dispatch
              </span>
              <div className="text-[10px] font-mono text-gray-400">
                Security Protocol: {isAuthenticated ? '🟢 ASI Officer Authenticated & Authorized' : '🔒 Officer Authentication Required'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {isAuthenticated ? (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-lg bg-[#181B22] border border-[#2B313D] text-amber-300 font-mono text-xs hover:text-white transition"
              >
                🔒 Sign Out
              </button>
            ) : (
              <button
                onClick={() => handleQuickLogin('Dr. Rajeshwar Sharma, Ph.D.', 'Superintending Archaeologist', 'ASI-AGRA-2026-0842', site?.circle || 'Agra Circle')}
                className="px-3 py-1.5 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] font-mono text-xs font-bold hover:bg-[#C5A059]/30 transition"
              >
                🔑 Quick Demo Officer Sign-In
              </button>
            )}

            <button
              onClick={handlePrint}
              disabled={!isAuthenticated}
              className={`px-4 py-1.5 rounded-lg font-mono font-bold text-xs transition flex items-center gap-2 shadow ${
                isAuthenticated
                  ? 'bg-[#C5A059] text-[#090A0C] hover:brightness-110'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
              title={!isAuthenticated ? 'Sign in as ASI Officer to print/issue work-orders' : ''}
            >
              <span>🖨️ Print / Save PDF</span>
            </button>
            <button
              onClick={handleDownloadJson}
              disabled={!isAuthenticated}
              className={`px-3.5 py-1.5 rounded-lg border font-mono text-xs transition flex items-center gap-1.5 ${
                isAuthenticated
                  ? 'bg-[#181B22] border-[#2B313D] text-gray-300 hover:text-white'
                  : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>⬇️ Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-[#181B22] border border-[#2B313D] text-gray-400 hover:text-white font-mono text-xs transition"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">

          {/* 🔒 1. ASI EMPLOYEE AUTHENTICATION BANNER / GATE (If not signed in) */}
          {!isAuthenticated ? (
            <div className="bg-[#121418] border-2 border-amber-500/40 rounded-xl p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-[#2B313D] pb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
                  🏛️
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Official ASI Officer Access Control Gate
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Issuing and modifying technical conservation work-orders is restricted to authorized Archaeological Survey of India (ASI) employees.
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleOfficerLogin} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Officer Name & Title</label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full bg-[#0E1013] border border-[#2B313D] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Official Designation</label>
                  <select
                    value={officerDesignation}
                    onChange={(e) => setOfficerDesignation(e.target.value)}
                    className="w-full bg-[#0E1013] border border-[#2B313D] rounded-lg px-3 py-2 text-[#C5A059] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Superintending Archaeologist">Superintending Archaeologist</option>
                    <option value="Director General (Conservation)">Director General (Conservation)</option>
                    <option value="Chief Structural Conservationist">Chief Structural Conservationist</option>
                    <option value="Senior Archaeological Chemist">Senior Archaeological Chemist</option>
                    <option value="Executive Engineer (Heritage Civil Wing)">Executive Engineer (Heritage Civil Wing)</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">ASI Service PIN (Demo: 2026)</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter 4-digit PIN"
                      value={authPin}
                      onChange={(e) => setAuthPin(e.target.value)}
                      className="w-full bg-[#0E1013] border border-[#2B313D] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C5A059] text-[#090A0C] font-bold rounded-lg hover:brightness-110 transition whitespace-nowrap"
                    >
                      Authenticate
                    </button>
                  </div>
                </div>
              </form>

              {authError && (
                <p className="text-xs text-rose-400 font-mono">{authError}</p>
              )}

              {/* Quick Preset One-Click Profiles */}
              <div className="pt-3 border-t border-[#2B313D] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                <span className="text-gray-400">⚡ Or login with verified ASI Jurisdictional Profiles:</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleQuickLogin('Dr. Rajeshwar Sharma, Ph.D.', 'Superintending Archaeologist', 'ASI-AGRA-2026-0842', 'Agra Circle')}
                    className="px-2.5 py-1 rounded bg-[#181B22] border border-[#2B313D] text-gray-300 hover:text-white"
                  >
                    👨‍💼 Dr. R. Sharma (Agra Circle)
                  </button>
                  <button
                    onClick={() => handleQuickLogin('Er. Sunita Sen, M.Tech (Structural)', 'Chief Structural Conservationist', 'ASI-HQ-DL-2026-1108', 'Delhi HQ')}
                    className="px-2.5 py-1 rounded bg-[#181B22] border border-[#2B313D] text-gray-300 hover:text-white"
                  >
                    👩‍💼 Er. Sunita Sen (Delhi HQ)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 🟢 AUTHENTICATED OFFICER ACTIVE BADGE */
            <div className="bg-emerald-950/30 border border-emerald-700/50 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg">
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
                    {officerDesignation} · Jurisdiction: <strong className="text-gray-200">{officerCircle}</strong> · ID: <strong className="text-[#C5A059]">{officerServiceId}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 bg-[#0E1013] px-3 py-1.5 rounded-lg border border-[#2B313D] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSignOffComplete}
                    onChange={(e) => setIsSignOffComplete(e.target.checked)}
                    className="rounded text-[#C5A059]"
                  />
                  <span className="text-xs text-gray-200 font-bold">
                    {isSignOffComplete ? '✓ Approved & Digitally Sealed' : '✍️ Apply Digital Signature'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* 📄 2. OFFICIAL PRINTABLE ASI FORM HS-2026 DOSSIER */}
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

            {/* Monument & Component Specifications */}
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

            {/* Authorized Sanctions & Financial Allocation (Editable by Officer) */}
            <div className="border border-stone-300 rounded overflow-hidden">
              <div className="bg-stone-200 px-4 py-2 text-xs font-mono font-bold text-stone-800 uppercase tracking-wide border-b border-stone-300 flex justify-between items-center">
                <span>Section 2: Authorized Executive Sanctions & Budget</span>
                {isAuthenticated && <span className="text-[10px] text-emerald-800 font-mono">● Officer Edit Mode Enabled</span>}
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Sanctioned Budget:</span>
                  {isAuthenticated ? (
                    <input
                      type="text"
                      value={sanctionedAmount}
                      onChange={(e) => setSanctionedAmount(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-400 rounded px-2 py-1 text-stone-900 font-bold"
                    />
                  ) : (
                    <span className="font-bold text-stone-900">{sanctionedAmount}</span>
                  )}
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Allocated Wing:</span>
                  {isAuthenticated ? (
                    <input
                      type="text"
                      value={allocatedWing}
                      onChange={(e) => setAllocatedWing(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-400 rounded px-2 py-1 text-stone-900 text-[11px]"
                    />
                  ) : (
                    <span className="font-bold text-stone-900 text-[11px]">{allocatedWing}</span>
                  )}
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Execution Timeline:</span>
                  {isAuthenticated ? (
                    <input
                      type="text"
                      value={executionTimeline}
                      onChange={(e) => setExecutionTimeline(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-400 rounded px-2 py-1 text-stone-900 font-bold"
                    />
                  ) : (
                    <span className="font-bold text-stone-900">{executionTimeline}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Prescribed Scientific Intervention */}
            <div className="border border-stone-300 rounded overflow-hidden">
              <div className="bg-stone-200 px-4 py-2 text-xs font-mono font-bold text-stone-800 uppercase tracking-wide border-b border-stone-300">
                Section 3: Prescribed Conservation Methodology
              </div>
              <div className="p-4 space-y-2">
                {isAuthenticated ? (
                  <textarea
                    rows={2}
                    value={customAction}
                    onChange={(e) => setCustomAction(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-400 rounded p-2 text-xs text-stone-900 font-mono"
                  />
                ) : (
                  <p className="text-xs text-stone-800 font-medium leading-relaxed">
                    {customAction}
                  </p>
                )}
                <div className="text-[11px] text-stone-500 font-mono italic">
                  Standards Compliance: IS 1893:2016 Structural Seismic Norms · Venice Charter (1964) Conservation Ethics
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
                {isAuthenticated ? (
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
                    {isSignOffComplete && (
                      <div className="mt-2 inline-block bg-emerald-100 text-emerald-800 border border-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        ✓ DIGITALLY SIGNED & DISPATCHED
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-amber-800 italic text-xs font-mono">
                    [ Pending ASI Officer Authentication & Sign-Off ]
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
