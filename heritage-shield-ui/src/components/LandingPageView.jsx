import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform,
  useMotionValueEvent 
} from 'framer-motion';
import { 
  Shield, 
  Layers, 
  Activity, 
  MapPin, 
  ChevronDown, 
  ArrowRight, 
  ExternalLink,
  Sliders,
  Calendar,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Zap,
  TrendingDown,
  Sparkles,
  RefreshCw,
  Compass,
  Cpu,
  Eye,
  Award,
  Box,
  Scan,
  Workflow,
  Lock,
  LogOut,
  UserCheck,
  ChevronLeft
} from 'lucide-react';

import CinematicIntroReveal from './CinematicIntroReveal';
import HeritageShieldLogo from './HeritageShieldLogo';
import MonumentViewer3D from './MonumentViewer3D';
import HeritageGisMap from './HeritageGisMap';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';

export default function LandingPageView({ 
  onEnterDashboard, 
  onSelectMonument, 
  onOpenStudio, 
  sites = [],
  currentUser,
  onLoginSuccess,
  onLogout
}) {
  // State for Navigation & Modal
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(0);

  // State for Sandbox Showcase
  const [showcaseTab, setShowcaseTab] = useState('twin');
  const [selectedTwinSiteIdx, setSelectedTwinSiteIdx] = useState(0);
  const [selectedVisionSiteIdx, setSelectedVisionSiteIdx] = useState(0);
  
  // State for Environmental Stress Simulator
  const [simMonsoon, setSimMonsoon] = useState(35);
  const [simSeismic, setSimSeismic] = useState(1.25);
  
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState(null);

  // State for Cinematic Split-Reveal Intro
  const [showIntro, setShowIntro] = useState(true);

  // ---------------------------------------------------------------------------
  // 🌟 BERTANI-STYLE HORIZONTAL SCROLL PIPELINE (Framer Motion useScroll)
  // ---------------------------------------------------------------------------
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  // Smooth horizontal spring transform across 6 panels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Translate 0 -> 100% vertical scroll into 0% -> -83.333% horizontal translation (6 panels)
  const horizontalX = useTransform(smoothProgress, [0, 1], ["0%", "-83.333%"]);

  // Track active panel index in real-time
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const panelIdx = Math.min(5, Math.floor(latest * 6));
    setActivePanel(panelIdx);
  });

  const panelNames = [
    '01 · IMPERIAL HERITAGE PLINTH',
    '02 · AUTONOMOUS PIPELINE',
    '03 · 4-CONSOLE SANDBOX',
    '04 · CLIMATE & SEISMIC LAB',
    '05 · UNESCO HERITAGE REGISTRY',
    '06 · STATUTORY ARCHIVE & FAQ'
  ];

  // Helper to smoothly scroll to any horizontal panel
  const scrollToPanel = (index) => {
    if (!targetRef.current) return;
    const totalScroll = targetRef.current.scrollHeight - window.innerHeight;
    const targetY = (index / 5) * totalScroll;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Environmental stress formula
  const baselineHealth = 84;
  const monsoonImpact = Math.round((simMonsoon / 80) * 26);
  const seismicImpact = Math.round(((simSeismic - 0.85) / 0.9) * 28);
  const simulatedHealth = Math.max(12, baselineHealth - monsoonImpact - seismicImpact);

  let simulatedUrgency = 'Low';
  if (simulatedHealth < 45) {
    simulatedUrgency = 'CRITICAL (Priority 1 Dispatch)';
  } else if (simulatedHealth < 70) {
    simulatedUrgency = 'WATCHLIST (Routine Mitigation)';
  } else {
    simulatedUrgency = 'STABLE (Standard Monitoring)';
  }

  const workflowSteps = [
    {
      step: '01',
      title: 'Multimodal Spatial Ingestion',
      kicker: 'Module 01 · Photogrammetry & LiDAR',
      desc: 'Transforms drone imagery and terrestrial LiDAR point clouds into millimeter-accurate OBJ/glTF twins through Gaussian Splatting and dense mesh reconstruction.'
    },
    {
      step: '02',
      title: 'Neural Defect Extraction',
      kicker: 'Module 02 · Computer Vision AI',
      desc: 'Deploys localized segmentation models detecting 8 distinct structural degradation classes: shear fractures, granite spalling, efflorescence, and moisture dampness.'
    },
    {
      step: '03',
      title: 'Multi-Epoch Chrono Registration',
      kicker: 'Module 03 · Temporal ICP Alignment',
      desc: 'Point-to-point iterative closest point (ICP) registration aligns multi-year laser scans, pinpointing volumetric erosion and millimeter surface loss.'
    },
    {
      step: '04',
      title: 'Physics-Informed Decay Forecasting',
      kicker: 'Module 04 · Paris-Erdogan Mechanics',
      desc: 'Combines mechanical stress tensors with capillary moisture absorption and micro-climate telemetry to model 2026-2030 crack trajectory evolution.'
    },
    {
      step: '05',
      title: 'ISO 31000 Vulnerability Index',
      kicker: 'Module 05 · Composite Risk Engine',
      desc: 'Calculates explainable risk scores (0-100) weighing material typology, seismic zone factor, peak monsoon intensity, and tourism footfall load.'
    },
    {
      step: '06',
      title: 'National GIS Hazard Triangulation',
      kicker: 'Module 06 · ISRO Bhuvan & IMD Radar',
      desc: 'Overlays real-time Doppler rainfall alerts, BIS IS 1893 seismic fault buffers, and riverine flood plains across all 12 UNESCO heritage assets.'
    },
    {
      step: '07',
      title: 'Budget Optimization & Work-Orders',
      kicker: 'Module 07 · Dynamic Scheduling',
      desc: 'Rank-orders conservation interventions by cost-benefit payoff, proving that proactive ₹3 Lakh repointing prevents ₹75 Lakh emergency reconstructions.'
    },
    {
      step: '08',
      title: 'Cryptographic ASI Dossier Dispatch',
      kicker: 'Module 08 · AMASR Act Compliance',
      desc: 'Generates tamper-evident executive dossiers with 2FA authorization gates, chemical conservation specs, and certified PDF export.'
    }
  ];

  const faqs = [
    {
      q: 'How does Heritage Shield adhere to UNESCO & ASI standards?',
      a: 'The platform integrates ISO 31000 risk management frameworks with UNESCO ICOMOS conservation charters, calculating auditable risk indices across physical, environmental, and socio-cultural factors.'
    },
    {
      q: 'Can inspections be performed in the field without internet?',
      a: 'Yes. Heritage Shield utilizes local IndexedDB offline storage with service-worker telemetry syncing, allowing conservation officers to log defect surveys in remote areas.'
    },
    {
      q: 'How does the 2030 temporal crack progression API work?',
      a: 'Rather than static formulas, Heritage Shield executes a physics-informed FastAPI prediction endpoint applying the Paris-Erdogan fracture mechanics law coupled with capillary moisture diffusion and localized seismic/monsoon hazard coefficients.'
    },
    {
      q: 'Does the AI replace human conservation architects?',
      a: 'Never. In accordance with the UNESCO Venice Charter and ASI conservation ethics, Heritage Shield acts purely as an assistive diagnostics and decision-support layer — providing auditable telemetry while reserving all intervention approvals for certified experts.'
    },
    {
      q: 'How is national geospatial telemetry integrated?',
      a: 'The platform links ISRO Bhuvan WGS84 GIS layers, IMD precipitation radar, and BIS IS 1893 seismic hazard fault lines to dynamically update heritage site vulnerability ratings across all 12 Centrally Protected Heritage Sites.'
    }
  ];

  const flagshipSites = sites.slice(0, 6);

  return (
    <div 
      ref={targetRef} 
      className="relative h-[600vh] bg-[#F7F5F0] text-[#181B1F] font-sans selection:bg-[#C85A32] selection:text-white museum-bg"
    >
      {/* 🎬 Split-Reveal of Monument Images & Rising Heritage Shield Intro */}
      <AnimatePresence>
        {showIntro && <CinematicIntroReveal onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* 🌟 STICKY VIEWPORT CONTAINER (Full Screen Horizontal Frame) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* ========================================================================= */}
        {/* 🏛️ 1. TOP MINIMALIST NAV BAR WITH ACTIVE PANEL JUMP TABS                  */}
        {/* ========================================================================= */}
        <header className="z-50 bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E1D8] px-6 py-3.5 shadow-sm shrink-0">
          <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-6">
            
            {/* Left: Brand Logo & Emblem */}
            <div className="flex items-center gap-4">
              <HeritageShieldLogo
                size="sm"
                showText={true}
                textClassName="text-base tracking-wider font-serif font-bold text-[#181B1F]"
                onClick={() => scrollToPanel(0)}
              />
            </div>

            {/* Center: Bertani-Style Horizontal Navigation Pills */}
            <div className="hidden lg:flex items-center gap-2 bg-white/80 border border-[#E6E1D8] p-1 rounded-2xl shadow-sm text-xs font-mono">
              {[
                { label: 'Overview', idx: 0 },
                { label: 'Pipeline', idx: 1 },
                { label: '4 Consoles', idx: 2 },
                { label: 'Physics Lab', idx: 3 },
                { label: 'UNESCO Registry', idx: 4 },
                { label: 'Archive FAQ', idx: 5 }
              ].map((tab) => {
                const isActive = activePanel === tab.idx;
                return (
                  <button
                    key={tab.idx}
                    onClick={() => scrollToPanel(tab.idx)}
                    className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-bold ${
                      isActive 
                        ? 'bg-[#C85A32] text-white shadow-sm' 
                        : 'text-[#64748B] hover:text-[#181B1F] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Controls & Login */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowIntro(true)}
                className="px-3 py-1.5 rounded-xl frosted-btn text-[11px] font-mono font-bold text-[#C85A32] hover:text-white hover:bg-[#C85A32] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Replay Intro"
              >
                <span>🎬</span>
                <span className="hidden sm:inline">Intro</span>
              </button>

              <ThemeToggle />

              {currentUser ? (
                <div className="flex items-center gap-2 bg-white border border-[#E6E1D8] px-3 py-1.5 rounded-xl shadow-sm">
                  <span className="text-xs font-mono font-bold text-[#181B1F] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>{currentUser.name}</span>
                  </span>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="text-[10px] text-gray-400 hover:text-rose-600 p-0.5 rounded transition cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>Authority Login</span>
                </button>
              )}
            </div>

          </div>
        </header>

        {/* ========================================================================= */}
        {/* 🚀 2. HORIZONTAL EXPOSURE TRACK (6 FULL-SCREEN PANELS GLIDING HORIZONTALLY) */}
        {/* ========================================================================= */}
        <div className="flex-1 w-full overflow-hidden flex items-center relative">
          <motion.div
            style={{ x: horizontalX }}
            className="flex h-full w-[600vw] items-center"
          >
            
            {/* --------------------------------------------------------------------- */}
            {/* 🏛️ PANEL 1: IMPERIAL OPENING PLINTH (HERO EXHIBITION)                 */}
            {/* --------------------------------------------------------------------- */}
            <div className="w-screen h-full flex-shrink-0 px-6 sm:px-12 py-4 flex items-center justify-center">
              <div className="max-w-[1500px] w-full bg-white border border-[#E6E1D8] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
                
                {/* Background Ambient Monument Overlay */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                  <img
                    src="/monuments/khajuraho.jpg"
                    alt="Heritage Relief"
                    className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60" />
                </div>

                {/* Left: 3D Twin Showcase Card */}
                <div className="lg:col-span-5 relative z-10 flex justify-center">
                  <div className="w-full max-w-sm rounded-[2rem] border border-[#E6E1D8] bg-white shadow-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
                        <span className="text-[10px] text-[#4B5563] font-bold uppercase">Artefact #{selectedTwinSiteIdx + 1}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx - 1 + sites.length) % sites.length)}
                          className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E6E1D8] text-xs hover:bg-[#C85A32] hover:text-white transition cursor-pointer flex items-center justify-center"
                        >‹</button>
                        <button
                          onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx + 1) % sites.length)}
                          className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E6E1D8] text-xs hover:bg-[#C85A32] hover:text-white transition cursor-pointer flex items-center justify-center"
                        >›</button>
                      </div>
                    </div>

                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E6E1D8] bg-[#FAF8F5]">
                      <img
                        src={sites[selectedTwinSiteIdx]?.imageUrl || '/monuments/qutub_minar.jpg'}
                        alt={sites[selectedTwinSiteIdx]?.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <span className="text-[9px] font-mono text-[#F5E6CC] block">📍 {sites[selectedTwinSiteIdx]?.state}</span>
                        <h4 className="text-base font-serif font-bold leading-tight">{sites[selectedTwinSiteIdx]?.name}</h4>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                      className="w-full py-2.5 rounded-xl terracotta-btn font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Launch 3D Twin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Editorial Headline & Pitch */}
                <div className="lg:col-span-7 space-y-4 relative z-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E6E1D8]">
                    <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping" />
                    <span className="text-[10px] font-mono text-[#C85A32] font-bold uppercase tracking-widest">
                      National Built Heritage Command Center · SIH 2026
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181B1F] tracking-tight leading-tight">
                    Custodian of Heritage & <span className="gold-cream-text">Living Digital Twins</span>
                  </h1>

                  <p className="text-sm sm:text-base text-[#4B5563] font-sans leading-relaxed max-w-xl">
                    Heritage Shield bridges ancient architectural majesty with AI computer vision, IoT meteorological feeds, and Paris-Erdogan fracture mechanics — empowering conservation authorities to safeguard 3,690+ protected monuments with auditable foresight.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-3 rounded-xl terracotta-btn font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Launch National Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollToPanel(1)}
                      className="px-5 py-3 rounded-xl frosted-btn font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Explore Decision Pipeline ➔</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* ⚙️ PANEL 2: 8-MODULE AUTONOMOUS PIPELINE                             */}
            {/* --------------------------------------------------------------------- */}
            <div className="w-screen h-full flex-shrink-0 px-6 sm:px-12 py-4 flex items-center justify-center">
              <div className="max-w-[1500px] w-full bg-white border border-[#E6E1D8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                
                <div className="flex flex-wrap justify-between items-end gap-3">
                  <div>
                    <span className="text-xs font-mono text-[#C85A32] uppercase font-bold tracking-wider block">
                      ⚙️ Autonomous Conservation Pipeline
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B1F]">
                      The decision layer, <span className="gold-cream-text">module by module</span>
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-[#64748B]">
                    8 Synchronized AI & Engineering Subsystems
                  </span>
                </div>

                {/* 8-Module Horizontal Slider Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {workflowSteps.map((mod, idx) => {
                    const isSelected = activeWorkflowIndex === idx;
                    return (
                      <div
                        key={mod.step}
                        onClick={() => setActiveWorkflowIndex(idx)}
                        className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#C85A32] shadow-md ring-1 ring-[#C85A32]'
                            : 'bg-white border-[#E6E1D8] hover:border-[#C85A32]/40'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isSelected ? 'bg-[#C85A32] text-white' : 'bg-[#FAF8F5] text-[#C85A32] border border-[#E6E1D8]'
                          }`}>
                            Step {mod.step}
                          </span>
                          <span className="text-[#64748B] text-[10px] font-semibold">{mod.kicker.split('·')[1]}</span>
                        </div>

                        <h4 className="text-sm font-serif font-bold text-[#181B1F] leading-tight">
                          {mod.title}
                        </h4>

                        <p className="text-[11px] text-[#4B5563] font-sans leading-relaxed line-clamp-3">
                          {mod.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* 💻 PANEL 3: 4-CONSOLE INTELLIGENCE SANDBOX                            */}
            {/* --------------------------------------------------------------------- */}
            <div className="w-screen h-full flex-shrink-0 px-6 sm:px-12 py-4 flex items-center justify-center">
              <div className="max-w-[1500px] w-full bg-white border border-[#E6E1D8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                
                {/* Header & Tabs */}
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <span className="text-xs font-mono text-[#C85A32] uppercase font-bold tracking-wider block">
                      💻 Autonomous Sandbox
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B1F]">
                      Experience the 4 Core Intelligence Consoles
                    </h2>
                  </div>

                  <div className="bg-[#FAF8F5] p-1 rounded-2xl border border-[#E6E1D8] flex items-center gap-1 font-mono text-xs">
                    <button
                      onClick={() => setShowcaseTab('twin')}
                      className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-bold ${
                        showcaseTab === 'twin' ? 'terracotta-btn shadow-sm' : 'text-[#64748B] hover:text-[#181B1F]'
                      }`}
                    >🏛️ 3D Twin</button>
                    <button
                      onClick={() => setShowcaseTab('vision')}
                      className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-bold ${
                        showcaseTab === 'vision' ? 'bg-sky-600 text-white shadow-sm' : 'text-[#64748B] hover:text-[#181B1F]'
                      }`}
                    >🔍 Defect Vision</button>
                    <button
                      onClick={() => setShowcaseTab('temporal')}
                      className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-bold ${
                        showcaseTab === 'temporal' ? 'bg-amber-600 text-white shadow-sm' : 'text-[#64748B] hover:text-[#181B1F]'
                      }`}
                    >📈 2030 Decay</button>
                    <button
                      onClick={() => setShowcaseTab('gis')}
                      className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer font-bold ${
                        showcaseTab === 'gis' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[#64748B] hover:text-[#181B1F]'
                      }`}
                    >🗺️ GIS Radar</button>
                  </div>
                </div>

                {/* Content Viewport */}
                <div className="h-[430px] rounded-2xl border border-[#E6E1D8] bg-[#FAF8F5] overflow-hidden relative p-4">
                  {showcaseTab === 'twin' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
                      <div className="lg:col-span-4 space-y-3">
                        <h3 className="text-xl font-serif font-bold text-[#181B1F]">3D Living Digital Twin</h3>
                        <p className="text-xs text-[#4B5563] leading-relaxed">
                          Rotate 360° and zoom into individual domes, pillars, and plinths to inspect structural deformation history in real-time.
                        </p>
                        <button
                          onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                          className="px-5 py-2 rounded-xl terracotta-btn text-xs font-mono font-bold uppercase shadow-sm"
                        >Open 3D Studio →</button>
                      </div>
                      <div className="lg:col-span-8 h-full rounded-xl overflow-hidden border border-[#E6E1D8] bg-white shadow-inner">
                        <MonumentViewer3D siteIndex={selectedTwinSiteIdx} siteData={sites[selectedTwinSiteIdx] || sites[0]} activeComponent={0} isEmbedded={true} />
                      </div>
                    </div>
                  )}

                  {showcaseTab === 'vision' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
                      <div className="lg:col-span-4 space-y-3">
                        <h3 className="text-xl font-serif font-bold text-[#181B1F]">AI Defect Vision Scanner</h3>
                        <p className="text-xs text-[#4B5563] leading-relaxed">
                          Localized segmentation algorithms identify shear fractures, granite spalling, and capillary dampness with 96.4% confidence.
                        </p>
                        <button
                          onClick={() => onSelectMonument ? onSelectMonument(selectedVisionSiteIdx, 'vision') : onEnterDashboard()}
                          className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-mono font-bold uppercase shadow-sm"
                        >Open AI Vision Lab →</button>
                      </div>
                      <div className="lg:col-span-8 h-full rounded-xl overflow-hidden border border-[#E6E1D8] bg-black relative flex items-center justify-center">
                        <img src={sites[selectedVisionSiteIdx]?.imageUrl || '/monuments/qutub_minar.jpg'} alt="Vision" className="w-full h-full object-cover filter brightness-95" />
                        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] border-2 border-rose-500 bg-rose-500/20 rounded-lg animate-pulse">
                          <span className="absolute -top-5 left-0 bg-rose-500 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap">
                            DEF-DL01 · Tensile Crack · 96.4% AI Conf
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {showcaseTab === 'temporal' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
                      <div className="lg:col-span-4 space-y-3">
                        <h3 className="text-xl font-serif font-bold text-[#181B1F]">2030 Decay Predictor</h3>
                        <p className="text-xs text-[#4B5563] leading-relaxed">
                          Paris-Erdogan fracture laws prove that proactive ₹3 Lakh repointing prevents ₹75 Lakh emergency reconstructions.
                        </p>
                        <button onClick={onEnterDashboard} className="px-5 py-2 rounded-xl bg-amber-600 text-white text-xs font-mono font-bold uppercase shadow-sm">
                          Run 2030 Predictive Lab →
                        </button>
                      </div>
                      <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-[#E6E1D8] space-y-2 font-mono text-xs h-full flex flex-col justify-center shadow-inner">
                        <div className="flex justify-between font-bold border-b border-[#E6E1D8] pb-2 text-[#64748B]">
                          <span>Forecast Year</span>
                          <span>Predicted Health Score</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#E6E1D8]/60">
                          <span>2020 Baseline Survey</span>
                          <span className="text-emerald-600 font-bold">91 / 100 (Safe)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#E6E1D8]/60">
                          <span>2024 Interim Survey</span>
                          <span className="text-emerald-700 font-bold">82 / 100 (Stable)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#E6E1D8]/60">
                          <span>2026 Today (Current Scan)</span>
                          <span className="text-amber-600 font-bold">62 / 100 (Needs Attention)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#E6E1D8]/60 text-rose-600 font-bold">
                          <span>2028 Projected (Untreated)</span>
                          <span>32 / 100 (Critical)</span>
                        </div>
                        <div className="flex justify-between py-1.5 text-rose-700 font-bold">
                          <span>2030 Projected (Failure Risk)</span>
                          <span>14 / 100 (Immediate Action Required)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {showcaseTab === 'gis' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
                      <div className="lg:col-span-4 space-y-3">
                        <h3 className="text-xl font-serif font-bold text-[#181B1F]">National GIS Radar</h3>
                        <p className="text-xs text-[#4B5563] leading-relaxed">
                          ISRO Bhuvan WGS84 and IMD Doppler rainfall alerts triangulate physical and climatic hazards across India.
                        </p>
                        <button onClick={onEnterDashboard} className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-mono font-bold uppercase shadow-sm">
                          Open National GIS Map →
                        </button>
                      </div>
                      <div className="lg:col-span-8 h-full rounded-xl overflow-hidden border border-[#E6E1D8] bg-white shadow-inner">
                        <HeritageGisMap activeSiteIndex={0} onSelectSite={(idx) => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()} filterSites={sites} hideQuickJump={true} />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* 🧪 PANEL 4: CLIMATE & SEISMIC STRESS SIMULATOR                        */}
            {/* --------------------------------------------------------------------- */}
            <div className="w-screen h-full flex-shrink-0 px-6 sm:px-12 py-4 flex items-center justify-center">
              <div className="max-w-[1500px] w-full bg-white border border-[#E6E1D8] rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#C85A32] uppercase font-bold tracking-wider block">
                      🧪 Real-Time Physics Test
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B1F] mt-1">
                      Extreme Climate & Seismic Stress Simulator
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4B5563] font-sans mt-1">
                      Adjust environmental parameters to see how climatic anomalies affect heritage degradation in real-time.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-[#181B1F]">
                        <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                        <strong className="text-sky-600 font-bold">+{simMonsoon}% Excess Precipitation</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        value={simMonsoon}
                        onChange={(e) => setSimMonsoon(Number(e.target.value))}
                        className="w-full accent-[#C85A32] h-2 bg-[#E6E1D8] rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-[#181B1F]">
                        <span>🌋 Seismic Ground Motion Velocity:</span>
                        <strong className="text-rose-600 font-bold">{simSeismic.toFixed(2)}x (Peak Zone Factor)</strong>
                      </div>
                      <input
                        type="range"
                        min="0.85"
                        max="1.75"
                        step="0.05"
                        value={simSeismic}
                        onChange={(e) => setSimSeismic(Number(e.target.value))}
                        className="w-full accent-[#C85A32] h-2 bg-[#E6E1D8] rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E6E1D8] p-8 rounded-2xl text-center space-y-4 shadow-inner">
                  <span className="text-[10px] font-mono uppercase text-[#C85A32] tracking-widest font-bold block">
                    Simulated Health Score
                  </span>
                  <div className="text-5xl font-serif font-bold">
                    <span style={{ color: simulatedHealth < 45 ? '#DC2626' : simulatedHealth < 70 ? '#D97706' : '#16A34A' }}>
                      {simulatedHealth}
                    </span>
                    <span className="text-xs text-[#64748B] font-mono font-normal"> / 100</span>
                  </div>
                  <div
                    className="text-xs font-mono px-3.5 py-1.5 rounded-full font-bold uppercase inline-block border"
                    style={{
                      backgroundColor: simulatedHealth < 45 ? '#FEE2E2' : simulatedHealth < 70 ? '#FEF3C7' : '#DCFCE7',
                      color: simulatedHealth < 45 ? '#991B1B' : simulatedHealth < 70 ? '#92400E' : '#166534',
                      borderColor: simulatedHealth < 45 ? '#FCA5A5' : simulatedHealth < 70 ? '#FCD34D' : '#86EFAC'
                    }}
                  >
                    STATUS: {simulatedUrgency}
                  </div>
                  <button
                    onClick={() => onSelectMonument ? onSelectMonument(0, 'risk') : onEnterDashboard()}
                    className="w-full py-3 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-md"
                  >
                    Run 2030 Longitudinal Simulation →
                  </button>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* 🏛️ PANEL 5: UNESCO CENTRALLY PROTECTED REGISTRY                      */}
            {/* --------------------------------------------------------------------- */}
            <div className="w-screen h-full flex-shrink-0 px-6 sm:px-12 py-4 flex items-center justify-center">
              <div className="max-w-[1500px] w-full bg-white border border-[#E6E1D8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                
                <div className="flex flex-wrap justify-between items-end gap-3">
                  <div>
                    <span className="text-xs font-mono text-[#C85A32] uppercase font-bold tracking-wider block">
                      National Heritage Registry
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B1F]">
                      Protected UNESCO Heritage Sites
                    </h2>
                  </div>
                  <button
                    onClick={onEnterDashboard}
                    className="px-4 py-2 rounded-xl frosted-btn text-xs font-mono uppercase tracking-wider font-bold shadow-sm flex items-center gap-1.5"
                  >
                    <span>View All 12 Sites</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Monument Horizontal Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {flagshipSites.map((s, idx) => (
                    <div
                      key={s.id || idx}
                      onClick={() => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
                      className="bg-white border border-[#E6E1D8] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#C85A32]/50 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#FAF8F5]">
                        <img
                          src={s.imageUrl || '/monuments/qutub_minar.jpg'}
                          alt={s.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2">
                          <span 
                            className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase backdrop-blur-md border shadow"
                            style={{ backgroundColor: `${s.color}20`, color: s.color, borderColor: `${s.color}50` }}
                          >
                            ● {s.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-mono text-[#C85A32] uppercase font-semibold block">{s.state} · {s.period}</span>
                        <h4 className="text-base font-serif font-bold text-[#181B1F] group-hover:text-[#C85A32] transition leading-snug">
                          {s.name}
                        </h4>
                        <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-[#E6E1D8]">
                          <span className="text-[#64748B]">Hazard: <strong className="text-[#181B1F]">{s.seismicZone}</strong></span>
                          <span className="text-[#C85A32] font-bold flex items-center gap-1 text-[11px]">
                            <span>Explore 3D Twin</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* ❓ PANEL 6: TECHNICAL FAQ & AMASR STATUTORY ARCHIVE                   */}
            {/* --------------------------------------------------------------------- */}
            <div className="w-screen h-full flex-shrink-0 px-6 sm:px-12 py-4 flex items-center justify-center">
              <div className="max-w-[1400px] w-full bg-white border border-[#E6E1D8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                
                <div className="text-center space-y-1">
                  <span className="text-xs font-mono text-[#C85A32] uppercase font-bold tracking-wider">
                    Frequently Answered Questions
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181B1F]">
                    Heritage Shield Technical Architecture
                  </h2>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-2.5 max-w-3xl mx-auto w-full">
                  {faqs.slice(0, 4).map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="bg-[#FAF8F5] border border-[#E6E1D8] rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full p-3.5 text-left flex justify-between items-center gap-3 font-serif font-bold text-xs sm:text-sm text-[#181B1F] hover:text-[#C85A32] cursor-pointer transition"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-[#C85A32] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-3.5 pb-3.5 text-xs text-[#4B5563] font-sans leading-relaxed border-t border-[#E6E1D8] pt-2.5">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Institutional Footer Strip */}
                <div className="border-t border-[#E6E1D8] pt-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <HeritageShieldLogo size="xs" showText={true} />
                    <span>| Smart India Hackathon 2026 (Team ID: 031)</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span>ISRO Bhuvan WGS84</span>
                    <span>ISO 31000:2018</span>
                    <span>Archaeological Survey of India (ASI)</span>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 🧭 3. BERTANI-INSPIRED BOTTOM HORIZONTAL CONTROLS & TELEMETRY STRIP        */}
        {/* ========================================================================= */}
        <footer className="z-50 bg-[#FAF8F5]/90 backdrop-blur-2xl border-t border-[#E6E1D8] px-6 py-3 shrink-0 shadow-sm">
          <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4 font-mono text-xs">
            
            {/* Left: Active Panel Name & Counter */}
            <div className="flex items-center gap-3 text-[#181B1F] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
              <span className="text-[#C85A32]">{panelNames[activePanel]}</span>
            </div>

            {/* Center: Interactive Slide Dots / Scrub Indicators */}
            <div className="hidden sm:flex items-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToPanel(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activePanel === idx 
                      ? 'w-8 bg-[#C85A32]' 
                      : 'w-2 bg-[#E6E1D8] hover:bg-[#C85A32]/50'
                  }`}
                  title={`Jump to Panel ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right: Previous / Next Panel Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToPanel(Math.max(0, activePanel - 1))}
                disabled={activePanel === 0}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E6E1D8] text-[#181B1F] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition font-bold flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={() => scrollToPanel(Math.min(5, activePanel + 1))}
                disabled={activePanel === 5}
                className="px-3 py-1.5 rounded-xl terracotta-btn disabled:opacity-40 disabled:cursor-not-allowed transition font-bold flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </footer>

      </div>

      {/* 🔐 Official & Public Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(user) => {
          if (typeof onLoginSuccess === 'function') {
            onLoginSuccess(user);
          }
          onEnterDashboard();
        }}
      />

    </div>
  );
}
