import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform 
} from 'framer-motion';
import { 
  ChevronDown, 
  ArrowRight, 
  Lock, 
  LogOut, 
  UserCheck,
  Shield,
  Layers,
  Activity,
  MapPin,
  CheckCircle2,
  Zap,
  TrendingDown,
  Sparkles,
  Sliders,
  ExternalLink,
  Compass,
  Cpu,
  Eye,
  Award,
  Box,
  Scan,
  Workflow,
  Orbit,
  Radio
} from 'lucide-react';

import HeritageShieldLogo from './HeritageShieldLogo';
import MonumentViewer3D from './MonumentViewer3D';
import HeritageGisMap from './HeritageGisMap';
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
  // Navigation & Interactive States
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);

  // State for Sandbox Showcase
  const [showcaseTab, setShowcaseTab] = useState('twin');
  const [selectedTwinSiteIdx, setSelectedTwinSiteIdx] = useState(0);
  const [selectedVisionSiteIdx, setSelectedVisionSiteIdx] = useState(0);
  
  // State for Environmental Stress Simulator
  const [simMonsoon, setSimMonsoon] = useState(35);
  const [simSeismic, setSimSeismic] = useState(1.25);
  
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState(null);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
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
      a: 'Rather than static formulas, Heritage Shield executes a physics-informed FastAPI prediction endpoint applying the Paris-Erdogan fracture mechanics law coupled with capillary moisture diffusion.'
    },
    {
      q: 'How is national geospatial telemetry integrated?',
      a: 'The platform links ISRO Bhuvan WGS84 GIS layers, IMD precipitation radar, and BIS IS 1893 seismic hazard fault lines to dynamically update vulnerability ratings.'
    }
  ];

  const flagshipSites = sites.slice(0, 6);
  const curHeroSite = sites[selectedTwinSiteIdx] || sites[0];
  const smoothEase = [0.16, 1, 0.3, 1];

  return (
    <div className="min-h-screen bg-[#06070B] text-[#F3F4F6] font-sans selection:bg-[#A855F7] selection:text-white overflow-x-hidden relative dreamcore-bg">
      
      {/* 🚀 TOP LUMINOUS DREAMCORE PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A855F7] via-[#F472B6] to-[#38BDF8] z-[100001] origin-left shadow-[0_0_12px_rgba(168,85,247,0.8)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* 🌌 ETHEREAL BACKGROUND NEBULA & RADIANT FLARES */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Center Amethyst Nebula */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gradient-to-b from-[#A855F7]/25 via-[#38BDF8]/15 to-transparent blur-[120px] opacity-75" />
        
        {/* Right Coral Flare */}
        <div className="absolute top-[35%] -right-[15%] w-[700px] h-[700px] rounded-full bg-[#F472B6]/12 blur-[140px] opacity-60" />
        
        {/* Left Cyan Starlight */}
        <div className="absolute top-[65%] -left-[15%] w-[800px] h-[800px] rounded-full bg-[#38BDF8]/10 blur-[150px] opacity-50" />
      </div>

      {/* ========================================================================= */}
      {/* 🎬 1. DREAMCORE ETHEREAL HERO SECTION                                     */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-4 pb-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        
        {/* 🧭 TOP FLOATING FROSTED GLASS CAPSULE NAVBAR */}
        <motion.header 
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="w-full max-w-[1440px] mx-auto px-6 py-3.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-between gap-4 sticky top-4 z-50"
        >
          {/* Left: Brand Logo & Emblem */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer shrink-0 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#A855F7] to-[#38BDF8] opacity-70 blur group-hover:opacity-100 transition duration-300" />
              <HeritageShieldLogo size="sm" showText={false} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-inter font-bold text-[15px] text-white tracking-wider">
                HERITAGE SHIELD
              </span>
              <span className="font-mono text-[8.5px] text-[#C084FC] tracking-widest uppercase font-semibold">
                LIVING DIGITAL TWIN · SIH 2026
              </span>
            </div>
          </div>

          {/* Center: Ethereal Nav Pills */}
          <nav className="hidden lg:flex items-center gap-2 font-mono text-xs">
            <a 
              href="#overview" 
              className="px-3.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition font-medium"
            >
              Overview
            </a>
            
            <div className="relative">
              <button 
                onClick={() => setShowServicesMenu(!showServicesMenu)}
                className="px-3.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <span>Architecture</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C084FC]" />
              </button>

              {showServicesMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#0D0E15]/95 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl z-50">
                  <a href="#pipeline" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 rounded-xl">8-Module Autonomous Pipeline</a>
                  <a href="#consoles" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 rounded-xl">4-Console Intelligence Sandbox</a>
                  <a href="#simulator" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 rounded-xl">2030 Climate Stress Simulator</a>
                  <a href="#registry" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 rounded-xl">UNESCO Heritage Registry</a>
                </div>
              )}
            </div>

            <a 
              href="#consoles" 
              className="px-3.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition font-medium"
            >
              Living Twins
            </a>
            
            <a 
              href="#registry" 
              className="px-3.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition font-medium"
            >
              Heritage Sites
            </a>
            
            <a 
              href="#faq" 
              className="px-3.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition font-medium"
            >
              Archive FAQ
            </a>
          </nav>

          {/* Right: Authority Authentication & Action CTA */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C084FC]" />
                  <span>{currentUser.name}</span>
                </span>
                <button onClick={onLogout} title="Sign Out" className="text-gray-400 hover:text-rose-400 p-0.5">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-1.5 rounded-full dreamcore-btn-secondary text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#C084FC]" />
                <span>Authority 2FA</span>
              </button>
            )}

            <button
              onClick={onEnterDashboard}
              className="px-5 py-2 rounded-full dreamcore-btn font-mono text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.header>

        {/* 🌟 HERO EDITORIAL NARRATIVE & 3D LIVING TWIN EXHIBITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-16 sm:pt-20">
          
          {/* Left Column: Ethereal Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Floating Dreamcore Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
              <span className="text-[11px] font-mono text-[#C084FC] uppercase tracking-widest font-bold">
                ✨ Autonomous Digital Twin Command Center · SIH 2026
              </span>
            </div>

            {/* Display Headline with Chromatic Iridescence */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
              Preserve Timeless Splendor. <span className="dreamcore-gradient-text block mt-1">Awaken Living Digital Twins.</span>
            </h1>

            {/* Authoritative Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-2xl">
              Heritage Shield bridges ancient architectural majesty with AI computer vision, IoT meteorological feeds, and Paris-Erdogan fracture mechanics — empowering conservation authorities to safeguard 3,690+ protected monuments with auditable foresight.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onEnterDashboard}
                className="px-8 py-4 rounded-2xl dreamcore-btn font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2.5 cursor-pointer shadow-xl hover:scale-105"
              >
                <span>Launch National Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#consoles"
                className="px-7 py-4 rounded-2xl dreamcore-btn-secondary font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore 3D Living Twins</span>
              </a>
            </div>

            {/* Live National Telemetry Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white"><strong>12</strong> UNESCO Living Twins Active</span>
              </span>
              <span>•</span>
              <span>ISRO Bhuvan WGS84 Radar</span>
              <span>•</span>
              <span>ISO 31000:2018 Engine</span>
            </div>
          </motion.div>

          {/* Right Column: Floating 3D Living Twin Dream Plinth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md dreamcore-card rounded-3xl p-5 space-y-4 relative group shadow-2xl">
              
              {/* Top Control Strip */}
              <div className="flex justify-between items-center text-xs font-mono px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Twin #{selectedTwinSiteIdx + 1}: {curHeroSite.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx - 1 + sites.length) % sites.length)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#A855F7] text-white transition cursor-pointer flex items-center justify-center font-bold text-xs"
                    title="Previous Monument"
                  >‹</button>
                  <button
                    onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx + 1) % sites.length)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#A855F7] text-white transition cursor-pointer flex items-center justify-center font-bold text-xs"
                    title="Next Monument"
                  >›</button>
                </div>
              </div>

              {/* 3D Living Twin Viewport inside Hero Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0C10] shadow-inner">
                <MonumentViewer3D
                  siteIndex={selectedTwinSiteIdx}
                  siteData={curHeroSite}
                  activeComponent={0}
                  isEmbedded={true}
                />
                
                {/* Status Overlay */}
                <div className="absolute top-3 right-3 pointer-events-none">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow"
                    style={{
                      backgroundColor: `${curHeroSite.color}25`,
                      color: curHeroSite.color,
                      borderColor: `${curHeroSite.color}60`
                    }}
                  >
                    ● {curHeroSite.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                  <span className="text-[10px] font-mono text-[#38BDF8] font-bold block">
                    📍 {curHeroSite.location}, {curHeroSite.state}
                  </span>
                </div>
              </div>

              {/* Card Meta & Interactive CTA */}
              <div className="space-y-3 pt-1 text-left">
                <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-2">
                  {curHeroSite.builtEra} · {curHeroSite.material}
                </p>

                <button
                  onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                  className="w-full py-3.5 rounded-xl dreamcore-btn font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Launch 3D Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* ⚙️ 2. AUTONOMOUS 8-MODULE CONSERVATION PIPELINE                           */}
      {/* ========================================================================= */}
      <section id="pipeline" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-white/10 relative z-10">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[#C084FC] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span>⚙️ Autonomous Conservation Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            The decision layer, <span className="dreamcore-gradient-text">module by module</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
            Eight synchronized AI & engineering subsystems executing autonomous diagnostics, structural physics calculations, and authoritative decision dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((mod, idx) => {
            const isSelected = activeWorkflowIndex === idx;
            return (
              <div
                key={mod.step}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 dreamcore-card text-left ${
                  isSelected
                    ? 'border-[#C084FC] shadow-2xl shadow-[#A855F7]/30 ring-1 ring-[#C084FC] bg-white/[0.08]'
                    : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] ${
                      isSelected ? 'bg-gradient-to-r from-[#A855F7] to-[#38BDF8] text-white' : 'bg-white/10 text-[#C084FC] border border-white/10'
                    }`}>
                      Step {mod.step}
                    </span>
                    <span className="text-gray-400 font-semibold">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C084FC] transition leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 💻 3. 4-CONSOLE LIVE INTELLIGENCE SANDBOX                                 */}
      {/* ========================================================================= */}
      <section id="consoles" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-8 border-t border-white/10 relative z-10">
        
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[#C084FC] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>💻 Autonomous Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Experience the 4 Core Intelligence Consoles
            </h2>
          </div>

          <div className="dreamcore-card p-1.5 rounded-2xl flex items-center gap-1.5 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => setShowcaseTab('twin')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'twin'
                  ? 'dreamcore-btn shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🏛️ 3D Living Twin</span>
            </button>
            <button
              onClick={() => setShowcaseTab('vision')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'vision'
                  ? 'dreamcore-btn shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🔍 AI Defect Vision</span>
            </button>
            <button
              onClick={() => setShowcaseTab('temporal')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'temporal'
                  ? 'dreamcore-btn shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>📈 2030 Decay Predictor</span>
            </button>
            <button
              onClick={() => setShowcaseTab('gis')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'gis'
                  ? 'dreamcore-btn shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🗺️ GIS Radar</span>
            </button>
          </div>
        </div>

        {/* Viewport Display Area */}
        <div className="dreamcore-card rounded-3xl overflow-hidden p-6 sm:p-8 relative">
          {showcaseTab === 'twin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-white">3D Living Digital Twin</h3>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  A millimeter-accurate digital replica of the heritage site. You can rotate 360°, zoom in, and inspect individual domes, balconies, and foundation plinths.
                </p>
                
                <div className="pt-2 space-y-1.5">
                  <label className="text-xs font-mono text-[#C084FC] block font-bold uppercase tracking-wider">
                    Select Heritage Site:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTwinSiteIdx}
                      onChange={(e) => setSelectedTwinSiteIdx(Number(e.target.value))}
                      className="w-full appearance-none bg-black/60 border border-white/20 text-white text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-[#C084FC] cursor-pointer shadow-sm"
                    >
                      {sites.map((s, idx) => (
                        <option key={s.id || idx} value={idx} className="bg-[#0A0C10] text-white py-2">
                          {s.name} ({s.state})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#C084FC]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                    className="px-6 py-3 rounded-xl dreamcore-btn font-mono text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Open 3D Studio →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 h-[500px] min-h-[500px] relative rounded-2xl overflow-hidden border border-white/15 bg-[#0A0C10] shadow-2xl">
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
                  <h3 className="text-2xl font-serif font-bold text-white">AI Defect Vision Scanner</h3>
                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    Smart computer vision scans inspection photos to detect cracks, peeling stone, and water dampness with 96.4% confidence.
                  </p>
                  
                  <div className="pt-2 space-y-1.5">
                    <label className="text-xs font-mono text-[#38BDF8] block font-bold uppercase tracking-wider">
                      Select Heritage Site:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedVisionSiteIdx}
                        onChange={(e) => setSelectedVisionSiteIdx(Number(e.target.value))}
                        className="w-full appearance-none bg-black/60 border border-white/20 text-white text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer"
                      >
                        {sites.map((s, idx) => (
                          <option key={s.id || idx} value={idx} className="bg-[#0A0C10] text-white py-2">
                            {s.name} ({s.state})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#38BDF8]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectMonument ? onSelectMonument(selectedVisionSiteIdx, 'vision') : onEnterDashboard()}
                      className="px-6 py-3 rounded-xl dreamcore-btn font-mono text-xs font-bold transition cursor-pointer shadow-md"
                    >
                      Open AI Diagnostics Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[500px] min-h-[500px] relative rounded-2xl overflow-hidden border border-white/15 bg-black flex flex-col justify-between shadow-2xl">
                  <div className="bg-black/60 border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
                    <h3 className="text-sm font-serif font-bold text-white">
                      {curVisionSite.name} · Neural Defect Segmentation
                    </h3>
                  </div>

                  <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
                    <img
                      src={curVisionSite.imageUrl || '/monuments/qutub_minar.jpg'}
                      alt={curVisionSite.name}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute top-[28%] left-[28%] w-[44%] h-[44%] border-2 border-rose-500 bg-rose-500/20 rounded-lg pointer-events-none animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                      <span className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap shadow-lg">
                        {curDefect.id} · {curDefect.type} · {curDefect.conf} AI Confidence
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/60 border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-gray-300">
                    <span>Telemetry: <strong className="text-white">{curDefect.metrics}</strong></span>
                  </div>
                </div>
              </div>
            );
          })()}

          {showcaseTab === 'temporal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-white">2030 Structural Decay Predictor</h3>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  Paris-Erdogan fracture laws prove that proactive ₹3 Lakh repointing prevents ₹75 Lakh emergency reconstructions.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onEnterDashboard}
                    className="px-6 py-3 rounded-xl dreamcore-btn font-mono text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Run 2030 Predictive Lab →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-black/50 p-6 rounded-2xl border border-white/10 space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center shadow-2xl">
                <div className="flex justify-between items-center text-gray-400 border-b border-white/10 pb-3 text-sm font-bold">
                  <span>Forecast Year</span>
                  <span>Predicted Health Score</span>
                </div>
                <div className="flex justify-between items-center text-white py-2.5 border-b border-white/5">
                  <span>2020 Baseline Survey</span>
                  <span className="text-emerald-400 font-bold">91 / 100 (Safe)</span>
                </div>
                <div className="flex justify-between items-center text-white py-2.5 border-b border-white/5">
                  <span>2024 Interim Survey</span>
                  <span className="text-emerald-500 font-bold">82 / 100 (Stable)</span>
                </div>
                <div className="flex justify-between items-center text-white py-2.5 border-b border-white/5">
                  <span>2026 Today (Current Scan)</span>
                  <span className="text-amber-400 font-bold">62 / 100 (Needs Attention)</span>
                </div>
                <div className="flex justify-between items-center text-rose-400 font-bold py-2.5 border-b border-white/5">
                  <span>2028 Projected (Untreated)</span>
                  <span>32 / 100 (Critical)</span>
                </div>
                <div className="flex justify-between items-center text-rose-500 font-bold py-2.5">
                  <span>2030 Projected (Failure Risk)</span>
                  <span>14 / 100 (Immediate Action Required)</span>
                </div>
              </div>
            </div>
          )}

          {showcaseTab === 'gis' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-white">National GIS Radar & Hazard Map</h3>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  ISRO Bhuvan WGS84 and IMD Doppler rainfall alerts triangulate physical and climatic hazards across India.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onEnterDashboard}
                    className="px-6 py-3 rounded-xl dreamcore-btn font-mono text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Open National GIS Map →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-2xl overflow-hidden border border-white/15 bg-[#0A0C10] shadow-2xl">
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

      </section>

      {/* ========================================================================= */}
      {/* 🧪 4. CLIMATE & SEISMIC STRESS PHYSICS LAB                                */}
      {/* ========================================================================= */}
      <section id="simulator" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-white/10 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 text-[#C084FC] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span>🧪 Real-Time Physics Test</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-sm text-gray-300 font-sans">
            Adjust environmental parameters to see how climatic anomalies affect heritage degradation in real-time.
          </p>
        </div>

        <div className="dreamcore-card p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono text-white">
                <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                <strong className="text-[#38BDF8] font-bold">+{simMonsoon}% Excess Precipitation</strong>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simMonsoon}
                onChange={(e) => setSimMonsoon(Number(e.target.value))}
                className="w-full accent-[#A855F7] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono text-white">
                <span>🌋 Seismic Ground Motion Velocity:</span>
                <strong className="text-rose-400 font-bold">{simSeismic.toFixed(2)}x (Peak Zone Factor)</strong>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.75"
                step="0.05"
                value={simSeismic}
                onChange={(e) => setSimSeismic(Number(e.target.value))}
                className="w-full accent-[#A855F7] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/60 border border-white/15 p-8 rounded-2xl text-center space-y-4 shadow-2xl">
            <span className="text-[10px] font-mono uppercase text-[#C084FC] tracking-widest font-bold block">
              Simulated Health Score
            </span>
            <div className="text-5xl font-serif font-bold">
              <span style={{ color: simulatedHealth < 45 ? '#F87171' : simulatedHealth < 70 ? '#FBBF24' : '#4ADE80' }}>
                {simulatedHealth}
              </span>
              <span className="text-xs text-gray-400 font-mono font-normal"> / 100</span>
            </div>
            <div
              className="text-xs font-mono px-3.5 py-1.5 rounded-full font-bold uppercase inline-block border"
              style={{
                backgroundColor: simulatedHealth < 45 ? 'rgba(248,113,113,0.15)' : simulatedHealth < 70 ? 'rgba(251,191,36,0.15)' : 'rgba(74,222,128,0.15)',
                color: simulatedHealth < 45 ? '#FCA5A5' : simulatedHealth < 70 ? '#FDE047' : '#86EFAC',
                borderColor: simulatedHealth < 45 ? '#EF4444' : simulatedHealth < 70 ? '#F59E0B' : '#22C55E'
              }}
            >
              STATUS: {simulatedUrgency}
            </div>
            <button
              onClick={() => {
                if (onSelectMonument) onSelectMonument(0, 'risk');
                else onEnterDashboard();
              }}
              className="w-full mt-4 py-3.5 rounded-xl dreamcore-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-lg"
            >
              Run 2030 Longitudinal Simulation →
            </button>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 5. UNESCO PROTECTED HERITAGE REGISTRY                                  */}
      {/* ========================================================================= */}
      <section id="registry" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-white/10 relative z-10">
        
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="text-left">
            <span className="text-xs font-mono text-[#C084FC] uppercase tracking-widest font-bold block">
              National Heritage Registry
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Protected UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-6 py-3 rounded-xl dreamcore-btn-secondary text-xs font-mono tracking-wider uppercase transition flex items-center gap-2 cursor-pointer font-bold shadow-sm"
          >
            <span>View All 12 Heritage Sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {flagshipSites.map((s, idx) => (
            <div
              key={s.id || idx}
              onClick={() => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
              className="dreamcore-card rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between shadow-xl text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
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

              <div className="p-6 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-[#C084FC] uppercase font-semibold">{s.state} · {s.period}</span>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#C084FC] transition mt-0.5">
                    {s.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-white/10">
                  <span className="text-gray-400">Hazard: <strong className="text-white">{s.seismicZone}</strong></span>
                  <span className="text-[#C084FC] font-bold flex items-center gap-1">
                    <span>Explore Twin</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* ❓ 6. TECHNICAL FAQ ACCORDION                                              */}
      {/* ========================================================================= */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto space-y-8 border-t border-white/10 relative z-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#C084FC] uppercase tracking-widest font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-white">
            Architecture & Platform Specifications
          </h2>
        </div>

        <div className="space-y-3.5 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="dreamcore-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-white hover:text-[#C084FC] cursor-pointer transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#C084FC] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-300 font-sans leading-relaxed border-t border-white/10 pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🛡️ 7. INSTITUTIONAL FOOTER                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-[#06070B] py-12 px-6 relative z-10">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-600">|</span>
            <span>Smart India Hackathon 2026 · Team Qualified (Team ID: 031)</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>ISRO Bhuvan WGS84</span>
            <span>ISO 31000:2018</span>
            <span>Archaeological Survey of India (ASI)</span>
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
