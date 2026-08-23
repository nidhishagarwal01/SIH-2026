import React, { useState, useEffect } from 'react';
import LandingPageView from './components/LandingPageView';
import MonumentPortalView from './components/MonumentPortalView';
import MonumentViewer3D from './components/MonumentViewer3D';
import InspectionPhotoViewer from './components/InspectionPhotoViewer';
import HeritageGisMap from './components/HeritageGisMap';
import AsiReportModal from './components/AsiReportModal';
import ScenarioSimulator from './components/ScenarioSimulator';
import FieldReportModal from './components/FieldReportModal';
import PhotogrammetryPipeline from './components/PhotogrammetryPipeline';
import LongitudinalAnalytics from './components/LongitudinalAnalytics';
import LiveIngestModal from './components/LiveIngestModal';
import AssetSwitcherModal from './components/AssetSwitcherModal';
import HeritageShieldLogo from './components/HeritageShieldLogo';

import { UNESCO_SITES } from './data/unescoSites';

export default function App() {
  // Navigation Flow: 'landing' | 'portal' | 'studio'
  const [viewMode, setViewMode] = useState('landing');

  // Studio Sub-Tabs: 'twin' | 'vision' | 'gis' | 'risk' | 'queue'
  const [activeTab, setActiveTab] = useState('twin');
  const [activeSite, setActiveSite] = useState(0);
  const [activeComponent, setActiveComponent] = useState(2);
  const [sliderPos, setSliderPos] = useState(50);

  // Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFieldReportOpen, setIsFieldReportOpen] = useState(false);
  const [isLiveIngestOpen, setIsLiveIngestOpen] = useState(false);
  const [isAssetSwitcherOpen, setIsAssetSwitcherOpen] = useState(false);
  const [showPhotogrammetryDrawer, setShowPhotogrammetryDrawer] = useState(false);

  // Live Weather telemetry
  const [liveWeather, setLiveWeather] = useState({
    temp: "33.2°C",
    humidity: "65%",
    precip: "1.2mm",
    status: "LIVE_SYNC"
  });

  const sites = UNESCO_SITES;

  // Architectural Components for each heritage monument
  const siteComponents = {
    0: [ // Qutub Minar Complex
      {
        name: "Finial & Apex Cupola",
        code: "C-04",
        elevation: "+72.5m",
        status: "Stable",
        score: 88,
        color: "#15846e",
        inspected: "Jun 2026",
        defaultRisk: { condition: 18, deterioration: 14, hazard: 45, environment: 35, significance: 90 },
        action: "Routine annual photographic documentation & lightning arrester inspection"
      },
      {
        name: "Upper Storey Balcony Gallery",
        code: "C-02",
        elevation: "+48.0m",
        status: "Watch",
        score: 71,
        color: "#8052ff",
        inspected: "May 2026",
        defaultRisk: { condition: 52, deterioration: 45, hazard: 58, environment: 50, significance: 90 },
        action: "Re-inspect in next scheduled quarterly cycle (60 days)"
      },
      {
        name: "North Façade Wall (Main Shaft)",
        code: "C-01",
        elevation: "+12.0m",
        status: "Critical",
        score: 62,
        color: "#ffb829",
        inspected: "Apr 2026",
        defaultRisk: { condition: 78, deterioration: 72, hazard: 61, environment: 65, significance: 90 },
        action: "Structural scaffolding inspection & moisture-barrier sealing within 30 days"
      },
      {
        name: "Base Plinth & Substructure",
        code: "C-03",
        elevation: "Ground (0.0m)",
        status: "Stable",
        score: 80,
        color: "#15846e",
        inspected: "Jun 2026",
        defaultRisk: { condition: 28, deterioration: 20, hazard: 55, environment: 40, significance: 90 },
        action: "Routine annual drainage clearance & sub-base mortar repointing"
      }
    ],
    1: [ // Hampi Monument Cluster
      {
        name: "Stepped Vimana Shikhara Tower",
        code: "HC-01",
        elevation: "+8.5m",
        status: "Stable",
        score: 90,
        color: "#15846e",
        inspected: "May 2026",
        defaultRisk: { condition: 15, deterioration: 12, hazard: 25, environment: 30, significance: 95 },
        action: "Surface micro-dusting and non-invasive laser alignment check"
      },
      {
        name: "Mandapa Sanctum & Carved Pillars",
        code: "HC-03",
        elevation: "+3.2m",
        status: "Watch",
        score: 78,
        color: "#8052ff",
        inspected: "Apr 2026",
        defaultRisk: { condition: 38, deterioration: 32, hazard: 30, environment: 45, significance: 95 },
        action: "Vegetation clearance along column abacus capital joints"
      },
      {
        name: "Monolithic Stone Wheels & Axles",
        code: "HC-02",
        elevation: "+1.2m",
        status: "Watch",
        score: 74,
        color: "#8052ff",
        inspected: "May 2026",
        defaultRisk: { condition: 45, deterioration: 40, hazard: 25, environment: 40, significance: 95 },
        action: "Protective micro-barrier fence installation to prevent visitor abrasion"
      },
      {
        name: "Adhisthana Stepped Base Plinth",
        code: "HC-04",
        elevation: "Ground (0.0m)",
        status: "Stable",
        score: 86,
        color: "#15846e",
        inspected: "Jun 2026",
        defaultRisk: { condition: 22, deterioration: 18, hazard: 25, environment: 35, significance: 95 },
        action: "Routine sub-base drainage desilting"
      }
    ]
  };

  const getComponentsForSite = (idx) => {
    return siteComponents[idx] || siteComponents[0];
  };

  const components = getComponentsForSite(activeSite);
  const [currentUser, setCurrentUser] = useState(null);

  const [riskFactors, setRiskFactors] = useState(
    components[0]?.defaultRisk || { condition: 50, deterioration: 50, hazard: 50, environment: 50, significance: 90 }
  );

  const handleSelectSite = (idx) => {
    setActiveSite(idx);
    setActiveComponent(0);
    const newComps = getComponentsForSite(idx);
    if (newComps && newComps[0]?.defaultRisk) {
      setRiskFactors(newComps[0].defaultRisk);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode, activeTab, activeSite]);

  const handleLaunchMonumentStudio = (idx, targetTab = 'twin') => {
    handleSelectSite(idx);
    setActiveTab(targetTab);
    setViewMode('studio');
    window.scrollTo(0, 0);
  };

  const [fieldReports, setFieldReports] = useState([
    {
      id: "REP-9102",
      role: "officer",
      monumentName: "Qutub Minar Complex",
      component: "North Façade Wall (Section B)",
      defectType: "Structural Tensile Crack",
      severity: "High",
      gps: "28.5244° N, 77.1855° E",
      timestamp: "14 mins ago",
      status: "Verified by Architect",
      notes: "Branching fissure expanding along mortar joint after overnight precipitation."
    },
    {
      id: "REP-8419",
      role: "citizen",
      monumentName: "Golconda Fort",
      component: "East Bastion Outer Plinth",
      defectType: "Capillary Moisture Ingress",
      severity: "Moderate",
      gps: "17.3833° N, 78.4011° E",
      timestamp: "2 hours ago",
      status: "Pending Verification",
      notes: "Visible salt efflorescence and damp staining on lower stone course."
    }
  ]);

  const priorityQueue = [
    { rank: 1, component: "North Façade Wall", site: "Qutub Minar Complex", score: 74, status: "High Urgency", action: "Structural scaffolding inspection & moisture-barrier sealing (30 days)" },
    { rank: 2, component: "East Bastion Wall", site: "Golconda Fort", score: 71, status: "High Urgency", action: "Moisture barrier repair before monsoon (15 days)" },
    { rank: 3, component: "Upper Storey Balcony", site: "Qutub Minar Complex", score: 55, status: "Watch", action: "Re-inspect in next quarterly cycle (60 days)" },
    { rank: 4, component: "Stone Chariot Base", site: "Hampi Cluster", score: 41, status: "Watch", action: "Vegetation clearance and surface cleaning" },
    { rank: 5, component: "Finial & Apex Cupola", site: "Qutub Minar Complex", score: 33, status: "Stable", action: "Routine annual photographic documentation" }
  ];

  const handleSelectComponent = (index) => {
    setActiveComponent(index);
    if (components[index]?.defaultRisk) {
      setRiskFactors(components[index].defaultRisk);
    }
  };

  const handleAddReport = (newReport) => {
    setFieldReports([newReport, ...fieldReports]);
  };

  // Compute live auditable risk
  const computedRisk = Math.round(
    0.30 * riskFactors.condition +
    0.25 * riskFactors.deterioration +
    0.15 * riskFactors.hazard +
    0.15 * riskFactors.environment +
    0.15 * riskFactors.significance
  );

  const curSite = sites[activeSite] || sites[0];
  const curComp = components[activeComponent] || components[0];

  // VIEW 1: PRODUCT LANDING PAGE
  if (viewMode === 'landing') {
    return (
      <LandingPageView
        onEnterDashboard={() => {
          setViewMode('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectMonument={handleLaunchMonumentStudio}
        onOpenStudio={() => {
          setViewMode('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        sites={sites}
      />
    );
  }

  // VIEW 2: MONUMENT SELECTION PORTAL & GIS RADAR
  if (viewMode === 'portal') {
    return (
      <MonumentPortalView
        sites={sites}
        onSelectMonument={handleLaunchMonumentStudio}
        onBackToLanding={() => {
          setViewMode('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        liveWeather={liveWeather}
      />
    );
  }

  // VIEW 3: DEDICATED MONUMENT STUDIO & COMMAND CENTER
  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans flex flex-col selection:bg-[#8052ff] selection:text-white">
      
      {/* 1. Top Enterprise Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#141414] px-6 sm:px-10 py-4">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4">
          
          {/* Brand & Return to Portal */}
          <div className="flex items-center gap-4">
            <HeritageShieldLogo
              size="md"
              showText={true}
              onClick={() => setViewMode('landing')}
            />

            <button
              onClick={() => setViewMode('portal')}
              className="ghost-pill-btn text-xs font-mono"
            >
              ← Map Directory
            </button>
          </div>

          {/* Active Monument Switcher Pill */}
          <button
            onClick={() => setIsAssetSwitcherOpen(true)}
            className="flex items-center gap-3 bg-[#111111] hover:bg-[#181818] border border-[#222222] hover:border-[#8052ff] px-4 py-2 rounded-full transition cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#8052ff] animate-pulse" />
            <div className="text-left text-xs font-mono">
              <span className="text-[#9a9a9a] uppercase text-[10px] mr-1">Active Site:</span>
              <span className="text-white font-semibold">{curSite.name}</span>
              <span className="text-[#8052ff] ml-2 text-[10px]">▼ Switch</span>
            </div>
          </button>

          {/* Header Action Pills */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveIngestOpen(true)}
              className="ghost-pill-btn text-xs font-mono border border-[#333333]"
            >
              <span>🌐 Live Ingest</span>
            </button>

            <button
              onClick={() => setIsFieldReportOpen(true)}
              className="ghost-pill-btn text-xs font-mono border border-[#333333]"
            >
              <span>Field Sentinel</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="iris-pill-btn text-xs"
            >
              <span>📄 ASI Dossier</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Studio Console Tabs */}
      <div className="bg-black border-b border-[#141414] px-6 sm:px-10">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 overflow-x-auto py-2.5">
          
          <button
            onClick={() => { setActiveTab('twin'); window.scrollTo(0, 0); }}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeTab === 'twin'
                ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            🏛️ 3D Living Twin Studio
          </button>

          <button
            onClick={() => { setActiveTab('vision'); window.scrollTo(0, 0); }}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeTab === 'vision'
                ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            🔍 AI Defect Diagnostics Lab
          </button>

          <button
            onClick={() => { setActiveTab('risk'); window.scrollTo(0, 0); }}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeTab === 'risk'
                ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            📊 Risk & 2030 Predictive Lab
          </button>

          <button
            onClick={() => { setActiveTab('queue'); window.scrollTo(0, 0); }}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase transition cursor-pointer ${
              activeTab === 'queue'
                ? 'bg-[#8052ff] text-white font-semibold shadow-[0_0_16px_rgba(128,82,255,0.45)]'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            📋 Authority Queue & Sentinel Feed
          </button>

        </div>
      </div>

      {/* 3. Main Workspace Console Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 sm:p-10 space-y-10">
        
        {/* ========================================================================= */}
        {/* CONSOLE 1: 3D LIVING DIGITAL TWIN STUDIO                                 */}
        {/* ========================================================================= */}
        {activeTab === 'twin' && (
          <div className="space-y-8">
            
            {/* Top Control Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider">
                  Module 01 · 3D Spatial Identity
                </div>
                <h2 className="text-3xl font-normal tracking-[-0.04em] text-white mt-1">
                  {curSite.name} — Living 3D Twin
                </h2>
              </div>

              <button
                onClick={() => setShowPhotogrammetryDrawer(!showPhotogrammetryDrawer)}
                className="ghost-pill-btn text-xs font-mono border border-[#333333]"
              >
                <span>🏗️ {showPhotogrammetryDrawer ? 'Hide' : 'Show'} Scan-to-Twin Pipeline</span>
              </button>
            </div>

            {/* Photogrammetry Drawer */}
            {showPhotogrammetryDrawer && (
              <div className="animate-in fade-in duration-300">
                <PhotogrammetryPipeline />
              </div>
            )}

            {/* 3D Viewport Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* 3D Canvas */}
              <div className="lg:col-span-8 h-[620px] bg-black rounded-3xl overflow-hidden relative">
                <MonumentViewer3D
                  siteIndex={activeSite}
                  siteData={curSite}
                  activeComponent={activeComponent}
                  onSelectComponent={handleSelectComponent}
                  components={components}
                />
              </div>

              {/* Architectural Nodes Hierarchy */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="uppercase text-[#8052ff] font-semibold tracking-wider">
                      Architectural Nodes
                    </span>
                    <span className="text-[#9a9a9a]">{components.length} Monitored Segments</span>
                  </div>

                  <div className="space-y-2">
                    {components.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectComponent(idx)}
                        className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition cursor-pointer ${
                          activeComponent === idx
                            ? 'border-[#8052ff] bg-[#111111] shadow-[0_0_16px_rgba(128,82,255,0.25)]'
                            : 'border-[#1a1a1a] bg-black text-[#9a9a9a] hover:border-[#333333]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-[#8052ff] bg-[#1a1a1a] px-2 py-0.5 rounded-full">
                              {c.code}
                            </span>
                            <span className="font-normal text-sm text-white">{c.name}</span>
                          </div>
                          <div className="text-[11px] font-mono text-[#9a9a9a] mt-1">
                            Elevation: {c.elevation} · Inspected: {c.inspected}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-mono font-bold text-white">
                            {c.score}/100
                          </span>
                          <div className={`text-[10px] font-mono uppercase font-semibold mt-0.5 ${
                            c.status === 'Critical' ? 'text-[#ffb829]' : 'text-[#8052ff]'
                          }`}>
                            {c.status}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Node Profile */}
                <div className="space-y-3 pt-4 border-t border-[#1a1a1a]">
                  <div className="text-[11px] font-mono uppercase text-[#8052ff] tracking-wider">
                    Node Telemetry & Mandated Action
                  </div>
                  <h3 className="text-xl font-normal text-white">
                    {curComp.name} ({curComp.code})
                  </h3>
                  <p className="text-xs font-light text-[#bdbdbd] leading-relaxed">
                    {curComp.action}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 2: AI DEFECT DIAGNOSTICS LAB                                     */}
        {/* ========================================================================= */}
        {activeTab === 'vision' && (
          <div className="space-y-8">
            <InspectionPhotoViewer siteData={curSite} activeComponent={curComp.name} />

            {/* Longitudinal Delta Scrubbing */}
            <div className="pt-8 border-t border-[#1a1a1a] space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#8052ff] tracking-wider font-semibold">
                    Temporal Crack Progression (2024 Baseline vs. 2026 Inspection)
                  </span>
                  <h3 className="text-2xl font-normal text-white mt-1">
                    Computer Vision Forensic Scrubbing
                  </h3>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-[#ffb829]">
                    Measured Delta: +{((sliderPos / 100) * 38.2).toFixed(1)}% Expansion
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full void-slider"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#9a9a9a]">
                  <span>2024 Baseline (18.2 cm · 1.1 mm)</span>
                  <span>Scrub Position ({sliderPos}%)</span>
                  <span>2026 Live Survey (25.1 cm · 2.2 mm)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono">
                <div>
                  <span className="text-[10px] text-[#9a9a9a] uppercase">Crack Length</span>
                  <div className="text-2xl text-[#ffb829] font-normal mt-0.5">
                    {(18.2 + (sliderPos / 100) * 6.9).toFixed(1)} cm
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-[#9a9a9a] uppercase">Aperture Width</span>
                  <div className="text-2xl text-[#8052ff] font-normal mt-0.5">
                    {(1.1 + (sliderPos / 100) * 1.1).toFixed(2)} mm
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-[#9a9a9a] uppercase">Deterioration Pace</span>
                  <div className="text-2xl text-white font-normal mt-0.5">
                    {(2.1 + (sliderPos / 100) * 1.35).toFixed(2)} cm/yr
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-[#9a9a9a] uppercase">Damp Saturation</span>
                  <div className="text-2xl text-[#15846e] font-normal mt-0.5">
                    {(8.4 + (sliderPos / 100) * 6.4).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 3: RISK ENGINE & 2030 PREDICTIVE LAB                             */}
        {/* ========================================================================= */}
        {activeTab === 'risk' && (
          <div className="space-y-12">
            
            {/* Risk Formula Sliders */}
            <div className="space-y-6">
              <div>
                <div className="text-[11px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
                  Module 05 · Explainable Risk Engine
                </div>
                <h2 className="text-3xl font-normal tracking-[-0.04em] text-white">
                  ISO 31000 Explainable Multi-Criteria Risk Formula
                </h2>
                <p className="text-xs font-mono text-[#9a9a9a] mt-1">
                  R = 0.30·C + 0.25·D + 0.15·H + 0.15·E + 0.15·S
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  {[
                    { key: 'condition', label: 'C — Structural Condition Severity', weight: '30%' },
                    { key: 'deterioration', label: 'D — Deterioration Velocity', weight: '25%' },
                    { key: 'hazard', label: 'H — Natural Hazard & Seismic Exposure', weight: '15%' },
                    { key: 'environment', label: 'E — Environmental Stress & Weather', weight: '15%' },
                    { key: 'significance', label: 'S — National Archaeological Significance', weight: '15%' }
                  ].map((factor) => (
                    <div key={factor.key} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#bdbdbd]">{factor.label} ({factor.weight})</span>
                        <span className="text-white font-bold">{riskFactors[factor.key]}/100</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={riskFactors[factor.key]}
                        onChange={(e) => setRiskFactors({ ...riskFactors, [factor.key]: Number(e.target.value) })}
                        className="w-full void-slider"
                      />
                    </div>
                  ))}
                </div>

                {/* Score Display */}
                <div className="lg:col-span-5 text-center space-y-4 p-8 bg-[#0a0a0a] rounded-3xl border border-[#1a1a1a]">
                  <span className="text-[11px] font-mono uppercase text-[#8052ff] tracking-wider block">
                    Computed Vulnerability Index
                  </span>
                  <div className="text-7xl font-normal tracking-[-0.04em] text-[#ffb829] font-mono">
                    {computedRisk} <span className="text-sm font-mono text-[#9a9a9a]">/ 100</span>
                  </div>
                  <div className={`text-xs font-mono uppercase font-semibold ${
                    computedRisk >= 70 ? 'text-[#ffb829]' : 'text-[#8052ff]'
                  }`}>
                    {computedRisk >= 70 ? '● High Urgency · Action Required' : '● Routine Monitoring'}
                  </div>

                  <button
                    onClick={() => setIsReportOpen(true)}
                    className="iris-pill-btn w-full text-xs"
                  >
                    <span>Generate Official ASI Work Order</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cost-Benefit Preventive Conservation ROI */}
            <div className="space-y-6 pt-8 border-t border-[#1a1a1a]">
              <div>
                <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-wider font-semibold">
                  Module 06 · Decision Economics
                </span>
                <h3 className="text-2xl font-normal text-white mt-1">
                  Preventive vs. Reactive Cost-Benefit Analysis
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
                <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] space-y-2">
                  <span className="text-[11px] text-[#9a9a9a] uppercase">Reactive Reconstruction</span>
                  <div className="text-3xl text-[#ffb829] font-normal">₹14.20 Cr</div>
                  <p className="text-xs text-[#bdbdbd] font-sans font-light">Catastrophic structural failure & emergency rebuilding</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] space-y-2">
                  <span className="text-[11px] text-[#9a9a9a] uppercase">Preventive Monitoring</span>
                  <div className="text-3xl text-[#15846e] font-normal">₹0.94 Cr</div>
                  <p className="text-xs text-[#bdbdbd] font-sans font-light">Drone photogrammetry, lime repointing & IoT sensors</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-[#8052ff]/40 space-y-2">
                  <span className="text-[11px] text-[#8052ff] uppercase">Net National Savings</span>
                  <div className="text-3xl text-white font-normal">₹13.26 Cr</div>
                  <span className="text-xs text-[#8052ff] font-bold block">93.4% Cost Efficiency</span>
                </div>
              </div>
            </div>

            {/* Scenario Simulator */}
            <ScenarioSimulator
              activeSite={curSite}
              activeComponent={curComp}
              baselineRisk={computedRisk}
            />

            {/* Longitudinal Analytics */}
            <LongitudinalAnalytics
              activeComponent={curComp.name}
              materialTypology={curSite.material || 'sandstone'}
              seismicZone={curSite.seismicZone || 'Zone IV'}
            />

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 4: AUTHORITY PRIORITY QUEUE & SENTINEL FEED                       */}
        {/* ========================================================================= */}
        {activeTab === 'queue' && (
          <div className="space-y-12">
            
            {/* Priority Queue Table */}
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-wider font-semibold">
                    Module 07 · National Triage Queue
                  </span>
                  <h3 className="text-2xl font-normal text-white mt-1">
                    Ranked Priority Intervention Queue
                  </h3>
                </div>

                <button
                  onClick={() => setIsReportOpen(true)}
                  className="iris-pill-btn text-xs"
                >
                  <span>Export Batch Dossiers</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-[#9a9a9a] uppercase border-b border-[#1a1a1a]">
                    <tr>
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Component</th>
                      <th className="py-3 px-4">Monument</th>
                      <th className="py-3 px-4">Risk Score</th>
                      <th className="py-3 px-4">Urgency</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Dossier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#141414]">
                    {priorityQueue.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#0a0a0a] transition">
                        <td className="py-4 px-4 text-[#8052ff] font-bold">#{item.rank}</td>
                        <td className="py-4 px-4 font-normal text-white">{item.component}</td>
                        <td className="py-4 px-4 text-[#bdbdbd]">{item.site}</td>
                        <td className="py-4 px-4 font-bold text-white">{item.score}/100</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full uppercase font-semibold ${
                            item.status === 'High Urgency' ? 'text-[#ffb829] bg-[#ffb829]/10' : 'text-[#8052ff] bg-[#8052ff]/10'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-[#bdbdbd] font-sans text-xs">{item.action}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => setIsReportOpen(true)}
                            className="text-[#8052ff] hover:text-white transition"
                          >
                            Dossier →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Field Sentinel Telemetry Feed */}
            <div className="space-y-4 pt-8 border-t border-[#1a1a1a]">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[11px] font-mono text-[#8052ff] uppercase tracking-wider font-semibold">
                    Ground Incident Feed
                  </span>
                  <h3 className="text-2xl font-normal text-white mt-1">
                    Heritage Sentinel Observation Stream
                  </h3>
                </div>

                <button
                  onClick={() => setIsFieldReportOpen(true)}
                  className="ghost-pill-btn text-xs font-mono border border-[#333333]"
                >
                  <span>➕ Submit Observation</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {fieldReports.map((report, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[#0a0a0a] border border-[#141414] space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`px-2.5 py-0.5 rounded-full uppercase font-semibold ${
                        report.role === 'officer' ? 'text-[#8052ff] bg-[#8052ff]/10' : 'text-[#15846e] bg-[#15846e]/10'
                      }`}>
                        {report.role === 'officer' ? '👷 ASI Officer' : '🧑‍🤝‍🧑 Citizen Sentinel'}
                      </span>
                      <span className="text-[#9a9a9a]">{report.timestamp}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-normal text-white">
                        {report.monumentName} · <span className="text-[#8052ff]">{report.component}</span>
                      </h4>
                      <p className="text-xs font-light text-[#bdbdbd] font-sans mt-2 leading-relaxed">
                        "{report.notes}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1a1a1a] flex justify-between items-center text-[11px]">
                      <span className="text-[#9a9a9a]">📍 {report.gps}</span>
                      <span className="text-[#15846e]">{report.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* MODALS */}
      <AsiReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        site={curSite}
        component={curComp}
        riskFactors={riskFactors}
        computedRisk={computedRisk}
      />

      <FieldReportModal
        isOpen={isFieldReportOpen}
        onClose={() => setIsFieldReportOpen(false)}
        onSubmitReport={handleAddReport}
        monuments={sites}
      />

      <LiveIngestModal
        isOpen={isLiveIngestOpen}
        onClose={() => setIsLiveIngestOpen(false)}
        currentSite={curSite}
      />

      <AssetSwitcherModal
        isOpen={isAssetSwitcherOpen}
        onClose={() => setIsAssetSwitcherOpen(false)}
        activeSiteIndex={activeSite}
        onSelectSite={handleSelectSite}
      />

      {/* Footer */}
      <footer className="border-t border-[#141414] bg-black py-8 px-6 sm:px-10 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-[#9a9a9a]">
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="xs" showText={true} />
            <span>Smart India Hackathon 2026 · Team ID: 031</span>
          </div>
          <div>
            <span>Standard: ISRO Bhuvan WGS84 · Framework: ISO 31000:2018</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
