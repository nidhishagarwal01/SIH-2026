import React, { useState, useRef } from 'react';

export default function FieldReportModal({
  isOpen,
  onClose,
  onSubmitReport,
  monuments = []
}) {
  if (!isOpen) return null;

  const [reporterRole, setReporterRole] = useState('officer'); // 'officer' | 'citizen'
  const [selectedMonument, setSelectedMonument] = useState(0);
  const [componentName, setComponentName] = useState('North Façade Wall');
  const [defectType, setDefectType] = useState('structural');
  const [severity, setSeverity] = useState('High');
  const [notes, setNotes] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [gpsLocation, setGpsLocation] = useState('28.5244° N, 77.1855° E (Accuracy: ±2.4m)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPreviewImage(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (GPS Locked)`);
        },
        () => {
          setGpsLocation('28.5244° N, 77.1855° E (Simulated Field Fix)');
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newReport = {
        id: `REP-${Date.now().toString().slice(-4)}`,
        role: reporterRole,
        monumentName: monuments[selectedMonument]?.name || "Qutub Minar Complex",
        component: componentName,
        defectType: defectType,
        severity: severity,
        gps: gpsLocation,
        timestamp: "Just now",
        status: "Pending Architect Sign-Off",
        notes: notes || "Visual anomaly observed on external stone joint.",
        image: previewImage
      };

      onSubmitReport(newReport);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 overflow-y-auto">
      <div className="bg-[#0C0E16] text-[#EDE8DE] border border-white/15 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#07080B] border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-lg">
              🛡️
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#EBE2D3] tracking-wide">
                HERITAGE SENTINEL · DAMAGE INCIDENT REPORT
              </h3>
              <span className="text-[10px] font-mono text-gray-400">
                Participatory Monitoring & Field Officer Mobile Telemetry
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xs font-mono px-3 py-1.5 rounded-xl frosted-btn cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          {/* Reporter Role Selector */}
          <div>
            <label className="text-[10px] font-mono uppercase text-[#BA532B] block mb-1.5 font-bold tracking-wider">
              Reporting Entity:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReporterRole('officer')}
                className={`py-2.5 px-3 rounded-xl border font-mono text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                  reporterRole === 'officer'
                    ? 'terracotta-btn font-bold shadow-md'
                    : 'border-white/10 bg-[#121522]/70 text-gray-400 hover:text-white'
                }`}
              >
                <span>👷 ASI Circle Field Officer</span>
              </button>
              <button
                type="button"
                onClick={() => setReporterRole('citizen')}
                className={`py-2.5 px-3 rounded-xl border font-mono text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                  reporterRole === 'citizen'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold shadow-md'
                    : 'border-white/10 bg-[#121522]/70 text-gray-400 hover:text-white'
                }`}
              >
                <span>🧑‍🤝‍🧑 Citizen / Visitor Sentinel</span>
              </button>
            </div>
          </div>

          {/* Monument & Component Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
                Protected Monument:
              </label>
              <select
                value={selectedMonument}
                onChange={(e) => setSelectedMonument(Number(e.target.value))}
                className="w-full bg-[#121522] border border-white/15 rounded-xl px-3 py-2 text-xs text-gray-200 focus:border-[#BA532B] outline-none cursor-pointer"
              >
                {monuments.map((m, idx) => (
                  <option key={idx} value={idx} className="bg-[#0C0E16] text-gray-200">
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
                Architectural Element / Location:
              </label>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                placeholder="e.g. North Façade Wall, Balcony Corbel"
                className="w-full bg-[#121522] border border-white/15 rounded-xl px-3 py-2 text-xs text-gray-200 focus:border-[#BA532B] outline-none font-mono"
                required
              />
            </div>
          </div>

          {/* Defect Category & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
                Anomaly Classification:
              </label>
              <select
                value={defectType}
                onChange={(e) => setDefectType(e.target.value)}
                className="w-full bg-[#16171A] border border-[#33353B] rounded-lg px-3 py-2 text-xs text-gray-200 focus:border-[#C9A15C] outline-none font-mono"
              >
                <option value="structural">🔴 Structural Tensile Crack / Fissure</option>
                <option value="environmental">🟡 Capillary Moisture / Dampness Ingress</option>
                <option value="biological">🟢 Vegetation / Lichen Colonization</option>
                <option value="material_loss">🟣 Stone Delamination / Spalling</option>
                <option value="vandalism">⚠️ Graffiti / Surface Defacement</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
                Visual Urgency Severity:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Moderate', 'High'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    className={`py-2 rounded border font-mono text-[11px] transition ${
                      severity === lvl
                        ? lvl === 'High'
                          ? 'border-rose-500 bg-rose-500/20 text-rose-300 font-bold'
                          : lvl === 'Moderate'
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                          : 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-[#33353B] bg-[#16171A] text-gray-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Upload & Geotag Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
                Inspection Photograph:
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-[#33353B] hover:border-[#C9A15C] rounded-lg p-3 text-center cursor-pointer bg-[#16171A] transition flex flex-col items-center justify-center min-h-[90px]"
              >
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="h-16 object-cover rounded" />
                ) : (
                  <>
                    <span className="text-xl">📸</span>
                    <span className="text-[11px] text-gray-400 mt-1">Click to Upload / Snap Photo</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
                GPS Geolocation Fix:
              </label>
              <div className="bg-[#16171A] border border-[#33353B] rounded-lg p-3 space-y-2">
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{gpsLocation}</span>
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="w-full py-1 text-[10px] font-mono rounded bg-[#1D1F23] border border-[#33353B] text-gray-300 hover:text-white transition"
                >
                  📍 Refresh GPS Coordinates
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-mono uppercase text-gray-400 block mb-1 font-semibold">
              Field Notes / Anomaly Description:
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe observed fracture orientation, damp staining, or structural displacement..."
              className="w-full bg-[#16171A] border border-[#33353B] rounded-lg px-3 py-2 text-xs text-gray-200 focus:border-[#C9A15C] outline-none font-sans"
            ></textarea>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-[#33353B] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#16171A] border border-[#33353B] text-gray-400 hover:text-white font-mono text-xs transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#C9A15C] text-[#16171A] font-mono font-bold text-xs hover:bg-[#d8ac67] transition flex items-center gap-2 shadow"
            >
              {isSubmitting ? "Routing to AI Triage..." : "🚀 Submit Incident Report"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
