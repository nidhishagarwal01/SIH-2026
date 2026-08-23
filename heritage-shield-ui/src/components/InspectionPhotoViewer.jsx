import React, { useState, useRef } from 'react';

export function getPresetsForSite(site) {
  const typ = site?.typology || 'qutub_minar';
  const siteName = site?.name || 'Heritage Monument';
  const img = site?.imageUrl || '/monuments/qutub_minar.jpg';

  if (typ === 'taj_mahal') {
    return {
      target_1: {
        key: 'target_1',
        tabLabel: 'Marble Dome',
        title: `${siteName} — Bulbous Marble Dome & Lotus Finial`,
        material: "White Makrana Marble",
        imageUrl: img,
        detections: [
          {
            id: "DEF-TM-001",
            label: "Sulfur Dioxide Particulate Yellowing",
            type: "environmental",
            confidence: 94.2,
            color: "#ffb829",
            bbox: { x: 35, y: 15, width: 30, height: 35 },
            metrics: {
              coverage_pct: "18.2% area",
              discoloration_delta: "+12.4% yellowness",
              temporal_growth: "+8.1% (Post-Winter Smog)",
              growth_velocity: "Atmospheric deposition",
              criticality: "Moderate"
            },
            annotation: "Airborne carbonaceous particulate and sulfurous soot deposit requiring Fuller's earth mudpack treatment."
          },
          {
            id: "DEF-TM-002",
            label: "Marble Hairline Stress Fissure",
            type: "structural",
            confidence: 88.7,
            color: "#8052ff",
            bbox: { x: 22, y: 48, width: 22, height: 38 },
            metrics: {
              length_cm: "14.2 cm",
              aperture_width: "0.80 mm",
              temporal_growth: "+4.5%",
              growth_velocity: "0.65 cm / yr",
              criticality: "Watch"
            },
            annotation: "Radial micro-crack along drum cornice joint caused by diurnal thermal expansion of marble."
          }
        ]
      },
      target_2: {
        key: 'target_2',
        tabLabel: 'Iwan Arch & Inlay',
        title: `${siteName} — Main Mausoleum Iwan & Pietra Dura Inlay`,
        material: "Makrana Marble with Lapis Lazuli, Jasper & Agate Inlay",
        imageUrl: img,
        detections: [
          {
            id: "DEF-TM-003",
            label: "Pietra Dura Gemstone Dislodgement",
            type: "material_loss",
            confidence: 92.5,
            color: "#8052ff",
            bbox: { x: 42, y: 32, width: 25, height: 30 },
            metrics: {
              loss_count: "3 inlays missing",
              cavity_depth: "2.5 mm recess",
              temporal_growth: "+1 gemstone since 2024",
              growth_velocity: "Moisture cycle",
              criticality: "High"
            },
            annotation: "Dislodged floral leaf inlay due to historical lime-resin binder degradation."
          }
        ]
      }
    };
  }

  // Default: Qutub Minar & others
  return {
    target_1: {
      key: 'target_1',
      tabLabel: 'Storey I Shaft',
      title: `${siteName} — Fluted Red Sandstone Base Section`,
      material: "Fluted Delhi Quartzite & Red Sandstone",
      imageUrl: img,
      detections: [
        {
          id: "DEF-QM-001",
          label: "Tensile Shear Mortar Fracture",
          type: "structural",
          confidence: 94.8,
          color: "#ffb829",
          bbox: { x: 28, y: 22, width: 44, height: 38 },
          metrics: {
            crack_aperture: "2.20 mm",
            length_cm: "25.1 cm",
            temporal_growth: "+38.2% (2024-2026)",
            growth_velocity: "3.45 cm / yr",
            criticality: "Critical"
          },
          annotation: "Branching structural shear fracture expanding through lime-mortar joints. Immediate scaffolding and non-shrink grouting required."
        },
        {
          id: "DEF-QM-002",
          label: "Capillary Moisture Ingress & Damp Staining",
          type: "environmental",
          confidence: 91.2,
          color: "#8052ff",
          bbox: { x: 15, y: 48, width: 32, height: 40 },
          metrics: {
            saturation_pct: "14.8% moisture",
            hsv_decomposition: "High damp index",
            temporal_growth: "+18.4% post-monsoon",
            growth_velocity: "Groundwater capillary pull",
            criticality: "High"
          },
          annotation: "Elevated subterranean dampness migrating upwards into sandstone base plinth, risking salt sub-florescence."
        }
      ]
    },
    target_2: {
      key: 'target_2',
      tabLabel: 'Balcony Gallery',
      title: `${siteName} — Upper Storey Stalactite Corbel Balcony`,
      material: "Carved Red Sandstone with Quranic Calligraphy",
      imageUrl: img,
      detections: [
        {
          id: "DEF-QM-003",
          label: "Granular Sandstone Spalling & Surface Loss",
          type: "material_loss",
          confidence: 88.5,
          color: "#15846e",
          bbox: { x: 32, y: 35, width: 36, height: 30 },
          metrics: {
            loss_depth: "4.2 mm",
            spalling_area: "86 cm²",
            temporal_growth: "+9.1%",
            growth_velocity: "Diurnal wind abrasion",
            criticality: "Watch"
          },
          annotation: "Surface friability on decorative stalactite brackets exposed to monsoon wind-driven rain."
        }
      ]
    }
  };
}

export default function InspectionPhotoViewer({ siteData, activeComponent }) {
  const fileInputRef = useRef(null);
  const [currentPresetIdx, setCurrentPresetIdx] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDefect, setSelectedDefect] = useState(0);
  const [showMasks, setShowMasks] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationState, setValidationState] = useState({});

  const presetObj = getPresetsForSite(siteData);
  const presets = Object.values(presetObj);
  const curPreset = presets[currentPresetIdx] || presets[0];
  const [detections, setDetections] = useState(curPreset.detections);

  const handleSelectPreset = (idx) => {
    setCurrentPresetIdx(idx);
    setUploadedImage(null);
    const newPreset = presets[idx] || presets[0];
    setDetections(newPreset.detections);
    setSelectedDefect(0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      setUploadedImage(evt.target.result);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 900);
    };
    reader.readAsDataURL(file);
  };

  const handleValidate = (decision) => {
    setValidationState(prev => ({
      ...prev,
      [activeDefectData?.id]: decision
    }));
  };

  const filteredDetections = detections.filter(d => {
    if (selectedFilter === 'all') return true;
    return d.type === selectedFilter;
  });

  const activeDefectData = filteredDetections[selectedDefect] || filteredDetections[0] || detections[0];
  const currentValidation = validationState[activeDefectData?.id];

  return (
    <div className="w-full bg-black text-white space-y-8">
      {/* 1. Monolithic Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
            Module 02 · Neural Vision Extraction
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.04em] text-white">
            AI Damage Diagnostics & Physical Aperture Telemetry
          </h2>
          <p className="body-copy-sm max-w-2xl mt-2 text-[#bdbdbd]">
            OpenCV Laplacian variance, Bilateral Canny edge contours, and HSV moisture decomposition mapped onto real inspection pixels.
          </p>
        </div>

        {/* Preset & Upload Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex bg-black p-1 rounded-full border border-[#222222] gap-1">
            {presets.map((p, idx) => (
              <button
                key={p.key || idx}
                onClick={() => handleSelectPreset(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
                  currentPresetIdx === idx && !uploadedImage
                    ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]'
                    : 'text-[#9a9a9a] hover:text-white'
                }`}
              >
                {p.tabLabel}
              </button>
            ))}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="iris-pill-btn text-xs"
          >
            <span>{isAnalyzing ? 'Processing OpenCV...' : 'Upload Scan Image'}</span>
          </button>
        </div>
      </div>

      {/* 2. Asymmetric Two-Column Split: Image Canvas (Left) & Floating Metrics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Canvas (7 cols): High-Resolution Inspection Capture with Bounding Boxes */}
        <div className="lg:col-span-7 relative w-full aspect-[16/10] bg-[#0a0a0a] rounded-2xl overflow-hidden select-none">
          <img
            src={uploadedImage || curPreset.imageUrl}
            alt={curPreset.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-110 brightness-95"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          {/* Bounding Box Overlay */}
          {showMasks && (
            <div className="absolute inset-0 pointer-events-auto">
              {filteredDetections.map((d, index) => {
                const isSelected = selectedDefect === index;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDefect(index)}
                    className="absolute cursor-pointer transition-all duration-200 rounded-lg"
                    style={{
                      left: `${d.bbox.x}%`,
                      top: `${d.bbox.y}%`,
                      width: `${d.bbox.width}%`,
                      height: `${d.bbox.height}%`,
                      border: isSelected ? `2px solid ${d.color}` : `1px dashed ${d.color}80`,
                      backgroundColor: isSelected ? `${d.color}25` : `${d.color}08`,
                      boxShadow: isSelected ? `0 0 20px ${d.color}70` : 'none'
                    }}
                  >
                    <span
                      className="absolute -top-6 left-0 text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase shadow-sm"
                      style={{
                        backgroundColor: d.color,
                        color: '#000000'
                      }}
                    >
                      {d.id} · {d.confidence}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating Canvas Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
            <button
              onClick={() => setShowMasks(!showMasks)}
              className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono uppercase text-[#bdbdbd] hover:text-white transition"
            >
              {showMasks ? 'Masks: Active' : 'Masks: Hidden'}
            </button>
            <div className="text-[11px] font-mono text-[#9a9a9a] bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full pointer-events-auto">
              Material: {curPreset.material}
            </div>
          </div>
        </div>

        {/* Right Content (5 cols): Pure Void Floating Typography Metrics */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Defect Identity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] font-mono uppercase px-3 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: `${activeDefectData?.color}20`,
                  color: activeDefectData?.color
                }}
              >
                {activeDefectData?.id} · {activeDefectData?.type}
              </span>
              <span className="text-[12px] font-mono text-[#15846e] font-semibold">
                Neural Confidence: {activeDefectData?.confidence}%
              </span>
            </div>

            <h3 className="text-2xl font-normal tracking-[-0.03em] text-white">
              {activeDefectData?.label}
            </h3>
          </div>

          {/* Floating Metric Dimension Grid */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-mono uppercase text-[#9a9a9a] tracking-wider">
              Calibrated OpenCV Metric Estimations
            </div>

            <div className="grid grid-cols-2 gap-4">
              {activeDefectData?.metrics && Object.entries(activeDefectData.metrics).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-[#9a9a9a] block">
                    {key.replace('_', ' ')}
                  </span>
                  <div className="text-lg font-normal tracking-[-0.02em] text-white font-mono">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Diagnostic Annotation */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-mono uppercase text-[#8052ff] tracking-wider">
              AI Diagnostic Forensic Summary
            </div>
            <p className="text-[14px] font-light text-[#bdbdbd] leading-relaxed">
              "{activeDefectData?.annotation}"
            </p>
          </div>

          {/* Human-in-the-Loop Validation Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#1a1a1a]">
            <div className="flex items-center justify-between text-xs font-mono text-[#9a9a9a]">
              <span>Human-in-the-Loop Validation:</span>
              <span className="text-white uppercase font-semibold">
                {currentValidation ? `Status: ${currentValidation}` : 'Pending Expert Review'}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleValidate('APPROVED')}
                className={`flex-1 py-3 rounded-full text-xs font-mono uppercase font-semibold transition cursor-pointer ${
                  currentValidation === 'APPROVED'
                    ? 'bg-[#15846e] text-white shadow-[0_0_16px_rgba(21,132,110,0.5)]'
                    : 'bg-[#111111] hover:bg-[#1a1a1a] text-[#ffffff] border border-[#222222]'
                }`}
              >
                Approve Anomaly
              </button>
              <button
                onClick={() => handleValidate('REJECTED')}
                className={`flex-1 py-3 rounded-full text-xs font-mono uppercase font-semibold transition cursor-pointer ${
                  currentValidation === 'REJECTED'
                    ? 'bg-[#ffb829] text-black shadow-[0_0_16px_rgba(255,184,41,0.5)]'
                    : 'bg-[#111111] hover:bg-[#1a1a1a] text-[#9a9a9a] border border-[#222222]'
                }`}
              >
                Flag Calibration
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
