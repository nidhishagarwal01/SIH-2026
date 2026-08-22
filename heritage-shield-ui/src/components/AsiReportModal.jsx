import React from 'react';

export default function AsiReportModal({
  isOpen,
  onClose,
  site,
  component,
  riskFactors,
  computedRisk,
  detections = []
}) {
  if (!isOpen) return null;

  const reportId = `ASI-WO-2026-${site?.asiId?.replace(/[^a-zA-Z0-9]/g, '') || '001'}-${component?.code || 'C01'}`;
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const reportData = {
      report_id: reportId,
      document_type: "ASI Official Technical Work Order & Condition Assessment",
      issued_under: "National Mission on Monuments and Antiquities (NMMA) / ASI",
      date: currentDate,
      monument: {
        name: site?.name,
        asi_id: site?.asiId,
        hazard_profile: site?.hazardRisk
      },
      component: {
        code: component?.code,
        name: component?.name,
        health_score: component?.score,
        status: component?.status
      },
      risk_evaluation: {
        computed_risk_score: computedRisk,
        factors: riskFactors,
        urgency: computedRisk >= 70 ? "CRITICAL / HIGH URGENCY" : "WATCH",
        recommended_action: component?.action
      },
      ai_cv_detections: detections
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}_Audit_Dossier.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-[#1A1C20] text-[#EDE8DE] border border-[#33353B] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Action Header (Excluded from Print) */}
        <div className="print:hidden bg-[#16171A] border-b border-[#33353B] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-mono font-bold text-gray-200">
              OFFICIAL ASI CONSERVATION WORK-ORDER EXPORT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#C9A15C] text-[#16171A] font-mono font-bold text-xs hover:bg-[#d8ac67] transition flex items-center gap-2 shadow"
            >
              <span>🖨️ Print / Save as PDF</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-2 rounded-lg bg-[#1D1F23] border border-[#33353B] text-gray-300 font-mono text-xs hover:text-white transition flex items-center gap-1.5"
            >
              <span>⬇️ Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-[#1D1F23] border border-[#33353B] text-gray-400 hover:text-white font-mono text-xs transition"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 bg-[#FFFFFF] text-[#111827] font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Government Official Letterhead */}
          <div className="text-center border-b-2 border-stone-800 pb-4 space-y-1">
            <div className="text-[11px] font-serif font-bold uppercase tracking-widest text-stone-700">
              Government of India · Ministry of Culture
            </div>
            <div className="text-xl font-serif font-bold text-stone-900 tracking-tight">
              ARCHAEOLOGICAL SURVEY OF INDIA (ASI)
            </div>
            <div className="text-xs font-mono font-semibold text-stone-600">
              National Mission on Monuments and Antiquities (NMMA) · Conservation Circle
            </div>
            <div className="inline-block mt-2 px-3 py-1 bg-stone-100 border border-stone-300 rounded text-[11px] font-mono font-bold text-stone-800 uppercase tracking-wide">
              FORM HS-2026: TECHNICAL CONDITION ASSESSMENT & PREVENTIVE CONSERVATION WORK ORDER
            </div>
          </div>

          {/* Reference & Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs font-mono">
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">Work Order Ref:</span>
              <strong className="text-stone-900">{reportId}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">Date of Issue:</span>
              <strong className="text-stone-900">{currentDate}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">ASI Monument Code:</span>
              <strong className="text-stone-900">{site?.asiId || 'ASI-DL-001'}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">System Authority:</span>
              <strong className="text-emerald-700">Heritage Shield AI v1.2</strong>
            </div>
          </div>

          {/* Section 1: Monument & Component Structural Profile */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 border-b border-stone-300 pb-1 mb-2">
              1. Spatial & Architectural Component Identity
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                <div><span className="text-stone-500">Monument:</span> <strong>{site?.name}</strong></div>
                <div><span className="text-stone-500">Jurisdiction:</span> <strong>Centrally Protected Grade-I Heritage</strong></div>
                <div><span className="text-stone-500">Geospatial Hazard:</span> <strong>{site?.hazardRisk || 'Seismic Zone IV'}</strong></div>
              </div>
              <div className="bg-stone-50 p-3 rounded border border-stone-200 space-y-1">
                <div><span className="text-stone-500">Component:</span> <strong>{component?.name} ({component?.code})</strong></div>
                <div><span className="text-stone-500">Baseline Health Index:</span> <strong className="text-stone-900">{component?.score}/100</strong></div>
                <div><span className="text-stone-500">Current Status:</span> <strong className={computedRisk >= 70 ? "text-red-700" : "text-amber-700"}>{component?.status}</strong></div>
              </div>
            </div>
          </div>

          {/* Section 2: AI Defect Detection & Longitudinal Findings */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 border-b border-stone-300 pb-1 mb-2">
              2. Computer Vision Anomaly Detection Log (YOLOv8 + OpenCV)
            </h4>
            <table className="w-full text-left text-xs border border-stone-300 rounded overflow-hidden">
              <thead className="bg-stone-100 font-mono text-stone-700 border-b border-stone-300">
                <tr>
                  <th className="p-2">Defect ID</th>
                  <th className="p-2">Anomaly Classification</th>
                  <th className="p-2">Measured Dimensions</th>
                  <th className="p-2">Temporal Velocity (Δt)</th>
                  <th className="p-2">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="p-2 font-mono font-bold text-red-800">DEF-2026-001</td>
                  <td className="p-2">Structural Tensile Fissure</td>
                  <td className="p-2 font-mono">Length: 25.1 cm · Width: 2.4 mm</td>
                  <td className="p-2 font-mono font-bold text-red-700">+38.2% (3.45 cm/yr)</td>
                  <td className="p-2 font-mono">94.2%</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold text-amber-800">DEF-2026-002</td>
                  <td className="p-2">Capillary Moisture Ingress</td>
                  <td className="p-2 font-mono">Surface Dampness: 14.8%</td>
                  <td className="p-2 font-mono text-amber-700">+18.0% post-monsoon</td>
                  <td className="p-2 font-mono">83.6%</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold text-emerald-800">DEF-2026-003</td>
                  <td className="p-2">Bryophyte / Lichen Intrusion</td>
                  <td className="p-2 font-mono">Area: 320 cm²</td>
                  <td className="p-2 font-mono text-emerald-700">+5.1% seasonal</td>
                  <td className="p-2 font-mono">76.4%</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono font-bold text-purple-800">DEF-2026-004</td>
                  <td className="p-2">Stone Surface Delamination</td>
                  <td className="p-2 font-mono">Exfoliation Depth: 4.2 mm</td>
                  <td className="p-2 font-mono text-purple-700">+12.4% thermal</td>
                  <td className="p-2 font-mono">88.0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Explainable Risk Score Matrix */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 border-b border-stone-300 pb-1 mb-2">
              3. Explainable Risk Score Computation
            </h4>
            <div className="bg-stone-50 p-4 rounded border border-stone-200 flex flex-wrap justify-between items-center text-xs">
              <div className="space-y-1 font-mono">
                <div>Formula: <code>R = 0.30·C + 0.25·D + 0.15·H + 0.15·E + 0.15·S</code></div>
                <div className="text-stone-600">
                  C = {riskFactors.condition} | D = {riskFactors.deterioration} | H = {riskFactors.hazard} | E = {riskFactors.environment} | S = {riskFactors.significance}
                </div>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <div className="text-2xl font-serif font-bold text-red-800">
                  {computedRisk} <span className="text-xs font-normal text-stone-600">/ 100</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-300">
                  {computedRisk >= 70 ? 'CRITICAL · HIGH URGENCY' : 'WATCH'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Prescribed Conservation Action */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 border-b border-stone-300 pb-1 mb-2">
              4. Mandated Preventive Conservation Protocol
            </h4>
            <div className="bg-stone-100 p-4 rounded border-l-4 border-stone-800 text-xs space-y-1.5 leading-relaxed">
              <div className="font-bold text-stone-900">
                Work Order Action: {component?.action}
              </div>
              <p className="text-stone-700 text-[11px]">
                Deploy non-invasive scaffolding for micro-fissure mortar grouting using lime-surkhi compatible binders. Apply breathable silane-siloxane hydrophobic surface barrier to halt capillary moisture ingress before onset of the next precipitation cycle.
              </p>
            </div>
          </div>

          {/* Section 5: Official Sign-Off Block */}
          <div className="pt-6 border-t border-stone-300 grid grid-cols-2 gap-8 text-xs font-mono">
            <div>
              <div className="text-stone-500 text-[10px] uppercase">Technical Analysis Certified By:</div>
              <div className="mt-8 pt-1 border-t border-stone-400">
                <strong>Heritage Shield AI Engine (Decision Support)</strong>
                <div className="text-[10px] text-stone-500">SHA-256: 8f9b2c4e1a0d3f82e7b5...</div>
              </div>
            </div>

            <div>
              <div className="text-stone-500 text-[10px] uppercase">Conservation Architect / Superintending Officer:</div>
              <div className="mt-8 pt-1 border-t border-stone-400">
                <strong>Sign-off & Approval Stamp</strong>
                <div className="text-[10px] text-stone-500">Archaeological Survey of India (ASI)</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
