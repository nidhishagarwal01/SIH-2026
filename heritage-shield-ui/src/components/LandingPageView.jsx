import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform 
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
  UserCheck
} from 'lucide-react';

import HeritageShieldLogo from './HeritageShieldLogo';
import MonumentViewer3D from './MonumentViewer3D';
import HeritageGisMap from './HeritageGisMap';
import AuthModal from './AuthModal';
import CinematicIntroReveal from './CinematicIntroReveal';

export default function LandingPageView({ 
  onEnterDashboard, 
  onSelectMonument, 
  onOpenStudio, 
  sites = [],
  currentUser,
  onLoginSuccess,
  onLogout
}) {
  // Navigation & Interactive States
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // State for Sandbox Showcase
  const [showcaseTab, setShowcaseTab] = useState('twin');
  const [selectedTwinSiteIdx, setSelectedTwinSiteIdx] = useState(0);
  const [selectedVisionSiteIdx, setSelectedVisionSiteIdx] = useState(0);
  
  // State for Environmental Stress Simulator
  const [simMonsoon, setSimMonsoon] = useState(35);
  const [simSeismic, setSimSeismic] = useState(1.25);
  
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState(null);

  // ---------------------------------------------------------------------------
  // 🌟 FLUID SMOOTH SCROLL HOOKS (Framer Motion)
  // ---------------------------------------------------------------------------
  const { scrollYProgress, scrollY } = useScroll();

  // Top hardware-accelerated spring progress bar in Royal Amber & Gold
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

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
  const smoothEase = [0.16, 1, 0.3, 1];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0E1B2E] font-sans selection:bg-[#E06D44] selection:text-white overflow-x-hidden relative museum-bg">
      
      {/* 🚀 TOP SPRING-SMOOTHED SCROLL PROGRESS BAR (Active only after intro) */}
      {!showIntro && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#E06D44] via-[#C5A059] to-[#0E1B2E] z-[999] origin-left shadow-sm pointer-events-none"
          style={{ scaleX }}
        />
      )}

      {/* 🎬 Split-Reveal Aperture Intro Screen */}
      <AnimatePresence>
        {showIntro && <CinematicIntroReveal onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* 🌟 1. TOP MINIMALIST ARCHIVAL IVORY & DEEP INDIGO NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-[9999] bg-[#FAF7F2]/90 backdrop-blur-2xl border-b border-[#EDE6DA] px-6 py-4 shadow-sm"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          
          {/* Left: Brand Logo & Emblem */}
          <div className="flex items-center gap-4">
            <HeritageShieldLogo
              size="md"
              showText={true}
              textClassName="text-lg tracking-wider font-serif font-bold text-[#0E1B2E]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Center: Minimalist Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a 
              href="#hero-section" 
              className="text-[#E06D44] font-bold transition"
            >
              Overview
            </a>
            <a 
              href="#pipeline-section" 
              className="text-[#334155] hover:text-[#E06D44] transition font-semibold"
            >
              Architecture
            </a>
            <a 
              href="#consoles-section" 
              className="text-[#334155] hover:text-[#E06D44] transition font-semibold"
            >
              Living Twins
            </a>
            <a 
              href="#simulator-section" 
              className="text-[#334155] hover:text-[#E06D44] transition font-semibold"
            >
              2030 Predictor
            </a>
            <a 
              href="#registry-section" 
              className="text-[#334155] hover:text-[#E06D44] transition font-semibold"
            >
              Heritage Sites
            </a>
            <a 
              href="#faq-section" 
              className="text-[#334155] hover:text-[#E06D44] transition font-semibold"
            >
              Archive FAQ
            </a>
          </div>

          {/* Right: Actions & Login */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-white border border-[#EDE6DA] px-3.5 py-1.5 rounded-xl shadow-sm">
                <span className="text-xs font-mono font-bold text-[#0E1B2E] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#E06D44]" />
                  <span>{currentUser.role === 'officer' ? '🏛️ ' : '👥 '}{currentUser.name}</span>
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-[10px] font-mono text-gray-400 hover:text-rose-600 p-1 rounded transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authority Login</span>
                </div>
              </motion.button>
            )}
          </div>

        </div>
      </motion.nav>

      {/* ========================================================================= */}
      {/* 🚀 2. GRAND SUBMERGED HERO EXHIBITION (Option 3 Royal Ivory & Indigo)     */}
      {/* ========================================================================= */}
      <section id="hero-section" className="relative min-h-[90vh] flex items-center px-6 sm:px-12 lg:px-20 py-16 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Subtle Ambient Background Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-15 pointer-events-none select-none overflow-hidden">
          <img
            src="/monuments/khajuraho.jpg"
            alt="Heritage Background"
            className="w-full h-full object-cover filter brightness-110 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#FDFBF7]/80 to-[#FDFBF7]" />
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Master Display */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#0E1B2E] tracking-tight leading-[1.1]">
              Custodian of Heritage & <span className="gold-cream-text">Living Digital Twins</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#334155] font-sans leading-relaxed max-w-2xl">
              Heritage Shield bridges ancient architectural majesty with AI computer vision, IoT meteorological feeds, and Paris-Erdogan fracture mechanics — empowering conservation authorities to safeguard 3,690+ protected monuments with auditable foresight.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onEnterDashboard}
                className="px-8 py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2.5 cursor-pointer shadow-lg hover:scale-105"
              >
                <span>Launch National Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right: Floating 3D Artefact Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md bg-white border border-[#EDE6DA] rounded-3xl p-5 shadow-2xl space-y-4 relative group">
              
              {/* Top Control Strip */}
              <div className="flex justify-between items-center text-xs font-mono px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E06D44] animate-pulse" />
                  <span className="text-[11px] text-[#0E1B2E] font-bold uppercase tracking-wider">
                    {sites[selectedTwinSiteIdx]?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx - 1 + sites.length) % sites.length)}
                    className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#EDE6DA] text-xs hover:bg-[#E06D44] hover:text-white transition cursor-pointer flex items-center justify-center font-bold"
                    title="Previous"
                  >‹</button>
                  <button
                    onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx + 1) % sites.length)}
                    className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#EDE6DA] text-xs hover:bg-[#E06D44] hover:text-white transition cursor-pointer flex items-center justify-center font-bold"
                    title="Next"
                  >›</button>
                </div>
              </div>

              {/* Monument Showcase Image Display */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#EDE6DA] bg-[#FAF7F2]">
                <img
                  src={sites[selectedTwinSiteIdx]?.imageUrl || '/monuments/qutub_minar.jpg'}
                  alt={sites[selectedTwinSiteIdx]?.name}
                  className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/85 via-transparent to-black/20" />
                
                {/* Status Tag Overlay */}
                <div className="absolute top-3 right-3">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow"
                    style={{
                      backgroundColor: `${sites[selectedTwinSiteIdx]?.color}25`,
                      color: sites[selectedTwinSiteIdx]?.color,
                      borderColor: `${sites[selectedTwinSiteIdx]?.color}60`
                    }}
                  >
                    ● {sites[selectedTwinSiteIdx]?.status}
                  </span>
                </div>

                {/* Bottom Image Overlay Details */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <span className="text-[10px] font-mono text-[#C5A059] font-semibold block">
                    📍 {sites[selectedTwinSiteIdx]?.location}, {sites[selectedTwinSiteIdx]?.state}
                  </span>
                  <h4 className="text-lg font-serif font-bold text-white leading-tight">
                    {sites[selectedTwinSiteIdx]?.name}
                  </h4>
                </div>
              </div>

              {/* Card Meta & Interactive CTA */}
              <div className="space-y-3 pt-1">
                <p className="text-xs text-[#334155] font-sans leading-relaxed line-clamp-2">
                  {sites[selectedTwinSiteIdx]?.builtEra} · {sites[selectedTwinSiteIdx]?.material}
                </p>

                <button
                  onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                  className="w-full py-3.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Explore 3D Living Twin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⚙️ 3. SUBMERGED 8-MODULE DECISION PIPELINE                                */}
      {/* ========================================================================= */}
      <motion.section 
        id="pipeline-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-[#EDE6DA]"
      >
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EDE6DA] text-[#E06D44] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span>⚙️ Autonomous Conservation Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0E1B2E] tracking-tight">
            The decision layer, <span className="gold-cream-text">module by module</span>
          </h2>

          <p className="text-sm sm:text-base text-[#334155] font-sans leading-relaxed">
            Eight synchronized AI & engineering subsystems executing autonomous diagnostics, structural physics calculations, and authoritative decision dispatch.
          </p>
        </div>

        {/* 8-Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((mod, idx) => {
            const isSelected = activeWorkflowIndex === idx;
            return (
              <motion.div
                key={mod.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: smoothEase }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group ${
                  isSelected
                    ? 'bg-white border-[#E06D44] shadow-xl shadow-[#E06D44]/10 ring-1 ring-[#E06D44]'
                    : 'bg-white/80 border-[#EDE6DA] shadow-sm hover:border-[#E06D44]/50 hover:shadow-lg'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] ${
                      isSelected ? 'bg-[#E06D44] text-white' : 'bg-[#FAF7F2] text-[#E06D44] border border-[#EDE6DA]'
                    }`}>
                      Step {mod.step}
                    </span>
                    <span className="text-[#64748B] font-semibold">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#0E1B2E] group-hover:text-[#E06D44] transition leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#334155] font-sans leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.section>

      {/* ========================================================================= */}
      {/* 💻 4. SUBMERGED 4-CONSOLE INTELLIGENCE SANDBOX                             */}
      {/* ========================================================================= */}
      <motion.section 
        id="consoles-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-8 border-t border-[#EDE6DA]"
      >
        
        {/* Section Header with Console Tabs */}
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EDE6DA] text-[#E06D44] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>💻 Autonomous Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E1B2E]">
              Experience the 4 Core Intelligence Consoles
            </h2>
          </div>

          {/* Clean Submerged Tabs */}
          <div className="bg-white p-1.5 rounded-2xl border border-[#EDE6DA] flex items-center gap-1.5 font-mono text-xs overflow-x-auto shadow-sm">
            <button
              onClick={() => setShowcaseTab('twin')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'twin'
                  ? 'terracotta-btn shadow-md'
                  : 'text-[#334155] hover:text-[#0E1B2E] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>🏛️</span>
              <span>3D Living Twin</span>
            </button>
            <button
              onClick={() => setShowcaseTab('vision')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'vision'
                  ? 'bg-sky-700 text-white shadow-md'
                  : 'text-[#334155] hover:text-[#0E1B2E] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>🔍</span>
              <span>AI Defect Vision</span>
            </button>
            <button
              onClick={() => setShowcaseTab('temporal')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'temporal'
                  ? 'bg-[#C5A059] text-white shadow-md'
                  : 'text-[#334155] hover:text-[#0E1B2E] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>📈</span>
              <span>2030 Decay Predictor</span>
            </button>
            <button
              onClick={() => setShowcaseTab('gis')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'gis'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-[#334155] hover:text-[#0E1B2E] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>🗺️</span>
              <span>GIS Radar</span>
            </button>
          </div>
        </div>

        {/* Viewport Display Area */}
        <div className="bg-white border border-[#EDE6DA] rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8 relative">
          
          {showcaseTab === 'twin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-[#0E1B2E]">
                  3D Living Digital Twin
                </h3>
                <p className="text-sm text-[#334155] leading-relaxed font-sans">
                  A realistic 3D model of the heritage site. You can rotate 360°, zoom in, and click directly on individual domes, balconies, pillars, or base walls to inspect their condition history.
                </p>
                
                {/* Select 3D Twin Custom Dropdown */}
                <div className="pt-2 space-y-1.5">
                  <label className="text-xs font-mono text-[#E06D44] block font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏛️</span>
                    <span>Select Heritage Site:</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTwinSiteIdx}
                      onChange={(e) => setSelectedTwinSiteIdx(Number(e.target.value))}
                      className="w-full appearance-none bg-[#FAF7F2] border border-[#EDE6DA] hover:border-[#E06D44] text-[#0E1B2E] text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#E06D44] cursor-pointer shadow-sm"
                    >
                      {sites.map((s, idx) => (
                        <option key={s.id || idx} value={idx} className="bg-white text-[#0E1B2E] py-2">
                          {s.name} ({s.state})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#E06D44]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                    className="px-6 py-3 rounded-xl terracotta-btn font-mono text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Open 3D Studio →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 h-[500px] min-h-[500px] relative rounded-2xl overflow-hidden border border-[#EDE6DA] shadow-lg bg-[#FAF7F2]">
                <MonumentViewer3D
                  siteIndex={selectedTwinSiteIdx}
                  siteData={sites[selectedTwinSiteIdx] || sites[0]}
                  activeComponent={0}
                  isEmbedded={true}
                />
              </div>
            </div>
          )}

          {showcaseTab === 'vision' && (() => {
            const curVisionSite = sites[selectedVisionSiteIdx] || sites[0];
            const defectMap = [
              { id: "DEF-DL01", type: "Vertical Tensile Fissure", conf: "96.4%", metrics: "Width: 3.2mm · Depth: 18mm · Sandstone joint" },
              { id: "DEF-KA01", type: "Granite Exfoliation & Spalling", conf: "92.1%", metrics: "Area: 140cm² · Monolithic granite wheel" },
              { id: "DEF-TS01", type: "Capillary Moisture Seepage", conf: "95.8%", metrics: "RH: 84% · Salt efflorescence on bastion" },
              { id: "DEF-OD01", type: "Saline Marine Chlorite Erosion", conf: "97.2%", metrics: "Pitting: 6.4mm · Coastal salt crust" }
            ];
            const curDefect = defectMap[selectedVisionSiteIdx % defectMap.length] || defectMap[0];

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4 text-left">
                  <h3 className="text-2xl font-serif font-bold text-[#0E1B2E]">
                    AI Defect Vision Scanner
                  </h3>
                  <p className="text-sm text-[#334155] leading-relaxed font-sans">
                    Smart computer vision scans inspection photos to detect cracks, peeling stone, and water dampness. It measures the exact length and width of cracks to catch damage early.
                  </p>
                  
                  <div className="pt-2 space-y-1.5">
                    <label className="text-xs font-mono text-sky-700 block font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span>🏛️</span>
                      <span>Select Heritage Site:</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedVisionSiteIdx}
                        onChange={(e) => setSelectedVisionSiteIdx(Number(e.target.value))}
                        className="w-full appearance-none bg-[#FAF7F2] border border-[#EDE6DA] hover:border-sky-600 text-[#0E1B2E] text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer shadow-sm"
                      >
                        {sites.map((s, idx) => (
                          <option key={s.id || idx} value={idx} className="bg-white text-[#0E1B2E] py-2">
                            {s.name} ({s.state})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-sky-700">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectMonument ? onSelectMonument(selectedVisionSiteIdx, 'vision') : onEnterDashboard()}
                      className="px-6 py-3 rounded-xl bg-sky-700 text-white font-mono text-xs font-bold hover:bg-sky-600 transition cursor-pointer shadow-md"
                    >
                      Open AI Diagnostics Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[500px] min-h-[500px] relative rounded-2xl overflow-hidden border border-[#EDE6DA] shadow-lg bg-[#FAF7F2] flex flex-col justify-between">
                  <div className="bg-[#FAF7F2] border-b border-[#EDE6DA] px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
                    <h3 className="text-sm font-serif font-bold text-[#0E1B2E]">
                      {curVisionSite.name} · AI Vision Scanner
                    </h3>
                  </div>

                  <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={curVisionSite.imageUrl || '/monuments/qutub_minar.jpg'}
                      alt={curVisionSite.name}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute top-[28%] left-[28%] w-[44%] h-[44%] border-2 border-rose-500 bg-rose-500/20 rounded-lg pointer-events-none animate-pulse">
                      <span className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap shadow-lg">
                        {curDefect.id} · {curDefect.type} · {curDefect.conf} AI Confidence
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] border-t border-[#EDE6DA] px-4 py-2.5 font-mono text-[11px] text-[#334155]">
                    <span>Telemetry: <strong className="text-[#0E1B2E]">{curDefect.metrics}</strong></span>
                  </div>
                </div>
              </div>
            );
          })()}

          {showcaseTab === 'temporal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-[#0E1B2E]">
                  2030 Structural Decay Predictor
                </h3>
                <p className="text-sm text-[#334155] leading-relaxed font-sans">
                  Forecasting how damage will worsen over the next 4 to 6 years if left untreated. It proves that fixing minor cracks early for ₹3 Lakhs avoids ₹70+ Lakhs in emergency rebuilds later.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onEnterDashboard}
                    className="px-6 py-3 rounded-xl bg-[#C5A059] text-white font-mono text-xs font-bold hover:bg-[#B89246] transition cursor-pointer shadow-md"
                  >
                    Run 2030 Predictive Lab →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF7F2] p-6 rounded-2xl border border-[#EDE6DA] space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center shadow-inner">
                <div className="flex justify-between items-center text-[#64748B] border-b border-[#EDE6DA] pb-3 text-sm font-bold">
                  <span>Forecast Year</span>
                  <span>Predicted Health Score</span>
                </div>
                <div className="flex justify-between items-center text-[#0E1B2E] py-2.5 border-b border-[#EDE6DA]/60">
                  <span>2020 Baseline Survey</span>
                  <span className="text-emerald-600 font-bold">91 / 100 (Safe)</span>
                </div>
                <div className="flex justify-between items-center text-[#0E1B2E] py-2.5 border-b border-[#EDE6DA]/60">
                  <span>2024 Interim Survey</span>
                  <span className="text-emerald-700 font-bold">82 / 100 (Stable)</span>
                </div>
                <div className="flex justify-between items-center text-[#0E1B2E] py-2.5 border-b border-[#EDE6DA]/60">
                  <span>2026 Today (Current Scan)</span>
                  <span className="text-amber-600 font-bold">62 / 100 (Needs Attention)</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 font-bold py-2.5 border-b border-[#EDE6DA]/60">
                  <span>2028 Projected (Untreated)</span>
                  <span>32 / 100 (Critical)</span>
                </div>
                <div className="flex justify-between items-center text-rose-700 font-bold py-2.5">
                  <span>2030 Projected (Failure Risk)</span>
                  <span>14 / 100 (Immediate Action Required)</span>
                </div>
              </div>
            </div>
          )}

          {showcaseTab === 'gis' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-[#0E1B2E]">
                  National GIS Radar & Hazard Map
                </h3>
                <p className="text-sm text-[#334155] leading-relaxed font-sans">
                  View all 12 Centrally Protected Heritage Sites across India on an interactive map. Overlay live monsoon rainfall alerts and earthquake hazard zones to protect endangered sites in advance.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onEnterDashboard}
                    className="px-6 py-3 rounded-xl bg-emerald-700 text-white font-mono text-xs font-bold hover:bg-emerald-600 transition cursor-pointer shadow-md"
                  >
                    Open National GIS Map →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-2xl overflow-hidden border border-[#EDE6DA] shadow-lg bg-[#FAF7F2]">
                <HeritageGisMap
                  activeSiteIndex={0}
                  onSelectSite={(idx) => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
                  filterSites={sites}
                  hideQuickJump={true}
                />
              </div>
            </div>
          )}

        </div>

      </motion.section>

      {/* ========================================================================= */}
      {/* 🧪 5. SUBMERGED ENVIRONMENTAL STRESS SIMULATOR                            */}
      {/* ========================================================================= */}
      <motion.section 
        id="simulator-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-[#EDE6DA]"
      >
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EDE6DA] text-[#E06D44] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span>🧪 Real-Time Physics Test</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E1B2E]">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-sm text-[#334155] font-sans">
            Adjust environmental parameters to see how climatic anomalies affect heritage site degradation in real-time.
          </p>
        </div>

        <div className="bg-white border border-[#EDE6DA] p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono text-[#0E1B2E]">
                <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                <strong className="text-sky-700 font-bold">+{simMonsoon}% Excess Precipitation</strong>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simMonsoon}
                onChange={(e) => setSimMonsoon(Number(e.target.value))}
                className="w-full accent-[#E06D44] h-2 bg-[#EDE6DA] rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono text-[#0E1B2E]">
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
                className="w-full accent-[#E06D44] h-2 bg-[#EDE6DA] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#EDE6DA] p-8 rounded-2xl text-center space-y-3 shadow-inner">
            <span className="text-[10px] font-mono uppercase text-[#E06D44] tracking-widest font-bold">Simulated Health Score</span>
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
              onClick={() => {
                if (onSelectMonument) {
                  onSelectMonument(0, 'risk');
                } else {
                  onEnterDashboard();
                }
              }}
              className="w-full mt-4 py-3.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-md"
            >
              Run 2030 Longitudinal Simulation →
            </button>
          </div>

        </div>

      </motion.section>

      {/* ========================================================================= */}
      {/* 🏛️ 6. SUBMERGED CENTRALLY PROTECTED MONUMENTS REGISTRY                    */}
      {/* ========================================================================= */}
      <motion.section 
        id="registry-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-[#EDE6DA]"
      >
        
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="text-left">
            <span className="text-xs font-mono text-[#E06D44] uppercase tracking-widest font-bold block">
              National Heritage Registry
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E1B2E] mt-1">
              Protected UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-6 py-3 rounded-xl frosted-btn text-xs font-mono tracking-wider uppercase transition flex items-center gap-2 cursor-pointer font-bold shadow-sm"
          >
            <span>View All 12 Heritage Sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {flagshipSites.map((s, idx) => (
            <motion.div
              key={s.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: smoothEase }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
              className="bg-white border border-[#EDE6DA] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E06D44]/50 transition-all duration-500 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                <img
                  src={s.imageUrl || '/monuments/qutub_minar.jpg'}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-100"
                />
                <div className="absolute top-3 right-3">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow"
                    style={{
                      backgroundColor: `${s.color}20`,
                      color: s.color,
                      borderColor: `${s.color}50`
                    }}
                  >
                    ● {s.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 text-left">
                <div>
                  <span className="text-[10px] font-mono text-[#E06D44] uppercase font-semibold">{s.state} · {s.period}</span>
                  <h3 className="text-lg font-serif font-bold text-[#0E1B2E] group-hover:text-[#E06D44] transition mt-0.5">
                    {s.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-[#EDE6DA]">
                  <span className="text-[#64748B]">Hazard: <strong className="text-[#0E1B2E]">{s.seismicZone}</strong></span>
                  <span className="text-[#E06D44] font-bold flex items-center gap-1">
                    <span>Explore Twin</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.section>

      {/* ========================================================================= */}
      {/* ❓ 7. SUBMERGED TECHNICAL FAQ ACCORDION                                    */}
      {/* ========================================================================= */}
      <motion.section 
        id="faq-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 max-w-4xl mx-auto space-y-8 border-t border-[#EDE6DA]"
      >
        
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#E06D44] uppercase tracking-widest font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#0E1B2E]">
            Heritage Shield Technical Architecture
          </h2>
        </div>

        <div className="space-y-3.5 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#EDE6DA] shadow-sm rounded-2xl overflow-hidden transition hover:border-[#E06D44]/40"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-[#0E1B2E] hover:text-[#E06D44] cursor-pointer transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E06D44] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#334155] font-sans leading-relaxed border-t border-[#EDE6DA] pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </motion.section>

      {/* ========================================================================= */}
      {/* 🛡️ 8. INSTITUTIONAL FOOTER                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#EDE6DA] bg-[#FAF7F2] py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-[#64748B]">
          
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-400">|</span>
            <span>Smart India Hackathon 2026 · Team Qualified (Team ID: 031)</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Standard: ISRO Bhuvan WGS84</span>
            <span>Framework: ISO 31000:2018</span>
            <span>Authority: Archaeological Survey of India (ASI)</span>
          </div>

        </div>
      </footer>

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
