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
  const [gpsLocation, setGpsLocation] = useState('28.5244° N, 77.1855° E');
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
          setGpsLocation(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (GPS Lock)`);
        },
        () => {
          setGpsLocation('28.5244° N, 77.1855° E (Field Fix)');
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
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="bg-black text-white border border-[#222222] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black border-b border-[#1a1a1a] px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15846e] animate-pulse" />
            <div>
              <h3 className="text-base font-normal tracking-[-0.02em] text-white">
                Heritage Sentinel Ground Incident Report
              </h3>
              <span className="text-[11px] font-mono text-[#9a9a9a]">
                Module 07 · Participatory Monitoring Telemetry
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#111111] border border-[#333333] text-[#9a9a9a] hover:text-white flex items-center justify-center font-mono text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-mono">
          
          {/* Role Toggle */}
          <div className="flex bg-[#111111] p-1 rounded-full border border-[#222222] gap-1">
            <button
              type="button"
              onClick={() => setReporterRole('officer')}
              className={`flex-1 py-2 rounded-full uppercase text-[11px] font-semibold transition ${
                reporterRole === 'officer' ? 'bg-[#8052ff] text-white' : 'text-[#9a9a9a]'
              }`}
            >
              👷 ASI Field Officer
            </button>
            <button
              type="button"
              onClick={() => setReporterRole('citizen')}
              className={`flex-1 py-2 rounded-full uppercase text-[11px] font-semibold transition ${
                reporterRole === 'citizen' ? 'bg-[#15846e] text-white' : 'text-[#9a9a9a]'
              }`}
            >
              🧑‍🤝‍🧑 Citizen Sentinel
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-[#bdbdbd]">Heritage Site</label>
            <select
              value={selectedMonument}
              onChange={(e) => setSelectedMonument(Number(e.target.value))}
              className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#8052ff]"
            >
              {monuments.map((m, idx) => (
                <option key={m.id || idx} value={idx}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[#bdbdbd]">Component / Node</label>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[#bdbdbd]">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2 text-[#ffb829] font-bold focus:outline-none"
              >
                <option value="High">High (Immediate Action)</option>
                <option value="Moderate">Moderate (Watchlist)</option>
                <option value="Low">Low (Routine)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[#bdbdbd]">GPS Coordinates</label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="text-[#8052ff] hover:text-white transition"
              >
                🎯 Auto-Detect GPS
              </button>
            </div>
            <input
              type="text"
              value={gpsLocation}
              onChange={(e) => setGpsLocation(e.target.value)}
              className="w-full bg-[#111111] border border-[#262626] rounded-xl px-3 py-2 text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#bdbdbd]">Inspection Observations / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail crack propagation, water seepage, or displacement..."
              className="w-full bg-[#111111] border border-[#262626] rounded-xl p-3 text-white focus:outline-none focus:border-[#8052ff]"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#333333] hover:border-[#8052ff] text-[#bdbdbd] transition flex items-center justify-center gap-2"
            >
              <span>📷 {previewImage ? 'Change Inspection Photo' : 'Attach Photo Capture'}</span>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full bg-[#111111] border border-[#333333] text-[#9a9a9a] hover:text-white transition uppercase font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 iris-pill-btn"
            >
              {isSubmitting ? 'Transmitting...' : 'Dispatch Telemetry'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
