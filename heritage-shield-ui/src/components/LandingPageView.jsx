import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring 
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
  Workflow
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
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#7b39fc] selection:text-white overflow-x-hidden relative">
      
      {/* 🚀 TOP PURPLE/GOLD PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7b39fc] via-[#a855f7] to-[#ec4899] z-[100001] origin-left shadow-sm pointer-events-none"
        style={{ scaleX }}
      />

      {/* ========================================================================= */}
      {/* 🎬 1. HIGH-IMPACT HERO SECTION OPTIMIZED FOR HERITAGE SHIELD (SIH 2026)   */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-screen bg-[#000000] overflow-hidden flex flex-col justify-between">
        
        {/* 📹 BACKGROUND VIDEO (120% scaled, horizontally centered, anchored bottom) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-1/2 -translate-x-1/2 min-w-[120%] min-h-[120%] w-[120%] h-[120%] object-cover object-bottom opacity-80"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260215_121759_424f8e9c-d8bd-4974-9567-52709dfb6842.mp4"
          />
          {/* Subtle dark vignette overlay for optimum contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/90" />
        </div>

        {/* 🔮 BLURRED BACKGROUND PILL (801px × 384px, top 215px, blur 77.5px) */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-[215px] w-[801px] max-w-[95vw] h-[384px] rounded-full bg-[#000000] pointer-events-none z-[1]"
          style={{ filter: 'blur(77.5px)' }}
        />

        {/* 🌟 HERO UI & CONTENT (z-index: 2) */}
        <div className="relative z-[2] w-full flex flex-col items-center">
          
          {/* 🧭 NAVBAR: Max width 1440px, padding 120px/16px, height 102px */}
          <header className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-[120px] py-[16px] min-h-[102px] flex items-center justify-between">
            
            {/* Left side: Heritage Shield Brand + Nav links with 80px gap */}
            <div className="flex items-center gap-6 lg:gap-[80px]">
              
              {/* Brand Logo & Name */}
              <div 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-3 cursor-pointer shrink-0 group"
              >
                <HeritageShieldLogo size="sm" showText={false} />
                <div className="flex flex-col text-left">
                  <span className="font-inter font-bold text-[16px] text-white tracking-wider flex items-center gap-1.5">
                    HERITAGE SHIELD
                  </span>
                  <span className="font-mono text-[9px] text-[#a855f7] tracking-widest uppercase">
                    LIVING DIGITAL TWIN · SIH 2026
                  </span>
                </div>
              </div>

              {/* Nav links with 10px gap between items */}
              <nav className="hidden md:flex items-center gap-[10px]">
                <a 
                  href="#hero" 
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="font-manrope font-medium text-[14px] leading-[22px] text-white px-[10px] py-[4px] hover:text-[#a855f7] transition"
                >
                  Overview
                </a>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowServicesMenu(!showServicesMenu)}
                    className="font-manrope font-medium text-[14px] leading-[22px] text-white px-[10px] py-[4px] hover:text-[#a855f7] transition flex items-center gap-[3px] cursor-pointer"
                  >
                    <span>Architecture</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Architecture Dropdown */}
                  {showServicesMenu && (
                    <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#121216]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl z-50">
                      <a href="#pipeline" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-manrope font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl">8-Module Autonomous Pipeline</a>
                      <a href="#consoles" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-manrope font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl">4-Console Intelligence Sandbox</a>
                      <a href="#simulator" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-manrope font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl">2030 Climate Stress Simulator</a>
                      <a href="#registry" onClick={() => setShowServicesMenu(false)} className="block px-3 py-2 text-xs font-manrope font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl">UNESCO Heritage Registry</a>
                    </div>
                  )}
                </div>

                <a 
                  href="#consoles" 
                  className="font-manrope font-medium text-[14px] leading-[22px] text-white px-[10px] py-[4px] hover:text-[#a855f7] transition"
                >
                  Living Twins
                </a>

                <a 
                  href="#registry" 
                  className="font-manrope font-medium text-[14px] leading-[22px] text-white px-[10px] py-[4px] hover:text-[#a855f7] transition"
                >
                  Heritage Sites
                </a>
                
                <a 
                  href="#faq" 
                  className="font-manrope font-medium text-[14px] leading-[22px] text-white px-[10px] py-[4px] hover:text-[#a855f7] transition"
                >
                  Archive FAQ
                </a>
              </nav>

            </div>

            {/* Right side: Authority Sign In & Studio CTA */}
            <div className="flex items-center gap-[12px]">
              {currentUser ? (
                <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-[16px] py-[8px] rounded-[8px]">
                  <span className="font-manrope font-semibold text-[14px] leading-[22px] text-white flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#a855f7]" />
                    <span>{currentUser.name}</span>
                  </span>
                  <button onClick={onLogout} title="Sign Out" className="text-gray-400 hover:text-rose-400 ml-1">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-white px-[16px] py-[8px] rounded-[8px] font-manrope font-semibold text-[14px] leading-[22px] text-[#171717] border border-[#d4d4d4] hover:bg-[#f5f5f5] transition cursor-pointer shadow-sm"
                >
                  Authority 2FA
                </button>
              )}

              <button
                onClick={onEnterDashboard}
                className="bg-[#7b39fc] px-[16px] py-[8px] rounded-[8px] font-manrope font-semibold text-[14px] leading-[22px] text-[#fafafa] shadow-[0px_4px_16px_rgba(23,23,23,0.04)] hover:bg-[#6d28d9] transition cursor-pointer"
              >
                Launch Studio
              </button>
            </div>

          </header>

          {/* 🎯 HERO CONTENT: Flex column, centered, max-width 871px, top margin 162px */}
          <div className="flex flex-col items-center text-center max-w-[871px] mx-auto px-6 mt-[60px] md:mt-[162px] gap-[24px]">
            
            {/* National Authority Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#7b39fc] animate-ping" />
              <span className="text-[11px] font-mono text-[#a855f7] font-bold uppercase tracking-widest">
                National Built Heritage Command Center · SIH 2026
              </span>
            </motion.div>

            {/* Heading block: flex column, 10px gap, center-aligned text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="flex flex-col items-center gap-[10px]"
            >
              {/* Line 1: "Safeguard ancient stone." — font Inter, medium weight, 76px, white */}
              <h1 className="font-inter font-medium text-[36px] sm:text-[54px] lg:text-[76px] text-white tracking-[-2px] leading-[1.15]">
                Safeguard ancient stone.
              </h1>

              {/* Line 2: "Engineer digital futures." — font Instrument Serif, italic, 76px, white */}
              <h2 className="font-instrument italic text-[40px] sm:text-[60px] lg:text-[76px] text-white tracking-[-2px] leading-[1.15]">
                Engineer digital futures.
              </h2>

              {/* Subtitle: font Manrope, regular weight, 18px, 26px line-height */}
              <p className="font-manrope font-normal text-[16px] sm:text-[18px] leading-[26px] text-[#f6f7f9] opacity-90 max-w-[613px] mx-auto pt-2">
                The autonomous AI conservation platform uniting LiDAR digital twins, computer vision defect diagnostics, and Paris-Erdogan crack fracture physics across India's 3,690+ protected monuments.
              </p>
            </motion.div>

            {/* CTA Buttons: flex row, 22px gap, vertically centered */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
              className="flex flex-row flex-wrap items-center justify-center gap-[22px] pt-1"
            >
              <button
                onClick={onEnterDashboard}
                className="bg-[#7b39fc] px-[24px] py-[14px] rounded-[10px] font-cabin font-medium text-[16px] leading-[1.7] text-white hover:bg-[#6d28d9] transition cursor-pointer shadow-lg hover:scale-105"
              >
                Launch National Studio
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('consoles');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onEnterDashboard();
                }}
                className="bg-[#2b2344] px-[24px] py-[14px] rounded-[10px] font-cabin font-medium text-[16px] leading-[1.7] text-[#f6f7f9] hover:bg-[#3b315c] transition cursor-pointer shadow-md hover:scale-105"
              >
                Explore 3D Living Twins
              </button>
            </motion.div>

          </div>

          {/* 🖼️ DASHBOARD CONTAINER: 1163px wide, 24px border-radius, backdrop-blur 10px, background rgba(255,255,255,0.05), inner padding 22.5px */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: smoothEase }}
            className="w-full max-w-[1163px] mx-auto px-4 mt-[80px] pb-[40px]"
          >
            <div className="w-full rounded-[24px] backdrop-blur-[10px] bg-white/[0.05] border-[1.5px] border-white/10 p-[22.5px] shadow-2xl relative overflow-hidden group">
              
              {/* Interactive Monument Selector & Telemetry Strip */}
              <div className="flex flex-wrap justify-between items-center gap-3 font-mono text-xs pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7b39fc] animate-pulse" />
                  <span className="font-bold text-white uppercase tracking-wider">
                    Live Digital Twin #{selectedTwinSiteIdx + 1}: {curHeroSite.name} ({curHeroSite.state})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx - 1 + sites.length) % sites.length)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#7b39fc] text-white flex items-center justify-center transition cursor-pointer text-xs font-bold"
                    title="Previous Monument"
                  >‹</button>
                  <button
                    onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx + 1) % sites.length)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#7b39fc] text-white flex items-center justify-center transition cursor-pointer text-xs font-bold"
                    title="Next Monument"
                  >›</button>
                </div>
              </div>

              {/* 3D Living Twin Viewport */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-[8px] overflow-hidden bg-[#0A0C10] border border-white/10 mt-3">
                <MonumentViewer3D
                  siteIndex={selectedTwinSiteIdx}
                  siteData={curHeroSite}
                  activeComponent={0}
                  isEmbedded={true}
                />
                
                {/* Floating Telemetry Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono z-10 pointer-events-none">
                  <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                      style={{ backgroundColor: `${curHeroSite.color}30`, color: curHeroSite.color }}
                    >
                      ● {curHeroSite.status}
                    </span>
                    <span className="text-gray-300">{curHeroSite.builtEra} · {curHeroSite.material}</span>
                  </div>

                  <button
                    onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                    className="pointer-events-auto bg-[#7b39fc] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-xl font-bold font-manrope text-xs transition flex items-center gap-2 shadow-lg"
                  >
                    <span>Launch 3D Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* ⚙️ 2. AUTONOMOUS PIPELINE SECTION                                         */}
      {/* ========================================================================= */}
      <section id="pipeline" className="py-24 px-6 max-w-[1440px] mx-auto space-y-12 border-t border-white/10">
        
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b39fc]/15 border border-[#7b39fc]/30 text-[#a855f7] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span>⚙️ Autonomous Conservation Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-inter font-bold text-white tracking-tight">
            The decision layer, <span className="text-[#a855f7]">module by module</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 font-manrope leading-relaxed">
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
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#7b39fc] shadow-xl shadow-[#7b39fc]/20 ring-1 ring-[#7b39fc]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-[#7b39fc] text-white' : 'bg-white/10 text-[#a855f7]'
                    }`}>
                      Step {mod.step}
                    </span>
                    <span className="text-gray-400">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-inter font-bold text-white leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-manrope leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 💻 3. 4-CONSOLE INTELLIGENCE SANDBOX                                       */}
      {/* ========================================================================= */}
      <section id="consoles" className="py-24 px-6 max-w-[1440px] mx-auto space-y-8 border-t border-white/10">
        
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b39fc]/15 border border-[#7b39fc]/30 text-[#a855f7] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>💻 Autonomous Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-inter font-bold text-white">
              Experience the 4 Core Intelligence Consoles
            </h2>
          </div>

          <div className="bg-white/[0.05] p-1.5 rounded-2xl border border-white/10 flex items-center gap-1.5 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => setShowcaseTab('twin')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'twin'
                  ? 'bg-[#7b39fc] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🏛️ 3D Living Twin</span>
            </button>
            <button
              onClick={() => setShowcaseTab('vision')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'vision'
                  ? 'bg-[#7b39fc] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🔍 AI Defect Vision</span>
            </button>
            <button
              onClick={() => setShowcaseTab('temporal')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'temporal'
                  ? 'bg-[#7b39fc] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>📈 2030 Decay Predictor</span>
            </button>
            <button
              onClick={() => setShowcaseTab('gis')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'gis'
                  ? 'bg-[#7b39fc] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>🗺️ GIS Radar</span>
            </button>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 relative">
          {showcaseTab === 'twin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-inter font-bold text-white">3D Living Digital Twin</h3>
                <p className="text-sm text-gray-300 font-manrope leading-relaxed">
                  Rotate 360° and zoom into individual domes, pillars, and plinths to inspect structural deformation history in real-time.
                </p>
                <button
                  onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                  className="px-6 py-3 rounded-xl bg-[#7b39fc] hover:bg-[#6d28d9] text-white font-manrope text-xs font-bold transition shadow-md cursor-pointer"
                >
                  Open 3D Studio →
                </button>
              </div>
              <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0C10]">
                <MonumentViewer3D
                  siteIndex={selectedTwinSiteIdx}
                  siteData={sites[selectedTwinSiteIdx] || sites[0]}
                  activeComponent={0}
                  isEmbedded={true}
                />
              </div>
            </div>
          )}

          {showcaseTab === 'vision' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-inter font-bold text-white">AI Defect Vision Scanner</h3>
                <p className="text-sm text-gray-300 font-manrope leading-relaxed">
                  Localized segmentation models detect shear fractures, granite spalling, and moisture dampness with 96.4% confidence.
                </p>
                <button
                  onClick={() => onSelectMonument ? onSelectMonument(selectedVisionSiteIdx, 'vision') : onEnterDashboard()}
                  className="px-6 py-3 rounded-xl bg-[#7b39fc] hover:bg-[#6d28d9] text-white font-manrope text-xs font-bold transition shadow-md cursor-pointer"
                >
                  Open AI Diagnostics Lab →
                </button>
              </div>
              <div className="lg:col-span-7 h-[480px] relative rounded-2xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img
                  src={sites[selectedVisionSiteIdx]?.imageUrl || '/monuments/qutub_minar.jpg'}
                  alt="Vision"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute top-[28%] left-[28%] w-[44%] h-[44%] border-2 border-rose-500 bg-rose-500/20 rounded-lg pointer-events-none animate-pulse">
                  <span className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap shadow-lg">
                    DEF-DL01 · Tensile Crack · 96.4% AI Confidence
                  </span>
                </div>
              </div>
            </div>
          )}

          {showcaseTab === 'temporal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-inter font-bold text-white">2030 Decay Predictor</h3>
                <p className="text-sm text-gray-300 font-manrope leading-relaxed">
                  Paris-Erdogan fracture laws prove that proactive ₹3 Lakh repointing prevents ₹75 Lakh emergency reconstructions.
                </p>
                <button onClick={onEnterDashboard} className="px-6 py-3 rounded-xl bg-[#7b39fc] hover:bg-[#6d28d9] text-white font-manrope text-xs font-bold transition shadow-md cursor-pointer">
                  Run 2030 Predictive Lab →
                </button>
              </div>
              <div className="lg:col-span-7 bg-[#121216] p-6 rounded-2xl border border-white/10 space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center">
                <div className="flex justify-between items-center text-gray-400 border-b border-white/10 pb-3 font-bold">
                  <span>Forecast Year</span>
                  <span>Predicted Health Score</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span>2020 Baseline Survey</span>
                  <span className="text-emerald-400 font-bold">91 / 100 (Safe)</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span>2024 Interim Survey</span>
                  <span className="text-emerald-500 font-bold">82 / 100 (Stable)</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
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
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl font-inter font-bold text-white">National GIS Radar & Hazard Map</h3>
                <p className="text-sm text-gray-300 font-manrope leading-relaxed">
                  ISRO Bhuvan WGS84 and IMD Doppler rainfall alerts triangulate physical and climatic hazards across India.
                </p>
                <button onClick={onEnterDashboard} className="px-6 py-3 rounded-xl bg-[#7b39fc] hover:bg-[#6d28d9] text-white font-manrope text-xs font-bold transition shadow-md cursor-pointer">
                  Open National GIS Map →
                </button>
              </div>
              <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#0A0C10]">
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
      {/* 🧪 4. ENVIRONMENTAL STRESS SIMULATOR                                      */}
      {/* ========================================================================= */}
      <section id="simulator" className="py-24 px-6 max-w-[1440px] mx-auto space-y-12 border-t border-white/10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7b39fc]/15 border border-[#7b39fc]/30 text-[#a855f7] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span>🧪 Real-Time Physics Test</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-inter font-bold text-white">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-sm text-gray-400 font-manrope">
            Adjust environmental parameters to see how climatic anomalies affect degradation in real-time.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-white">
                <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                <strong className="text-[#a855f7]">+{simMonsoon}% Excess Precipitation</strong>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simMonsoon}
                onChange={(e) => setSimMonsoon(Number(e.target.value))}
                className="w-full accent-[#7b39fc] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-white">
                <span>🌋 Seismic Ground Motion Velocity:</span>
                <strong className="text-rose-400">{simSeismic.toFixed(2)}x (Peak Zone Factor)</strong>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.75"
                step="0.05"
                value={simSeismic}
                onChange={(e) => setSimSeismic(Number(e.target.value))}
                className="w-full accent-[#7b39fc] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#121216] border border-white/10 p-8 rounded-2xl text-center space-y-3">
            <span className="text-[10px] font-mono uppercase text-[#a855f7] tracking-widest font-bold block">
              Simulated Health Score
            </span>
            <div className="text-5xl font-inter font-bold">
              <span style={{ color: simulatedHealth < 45 ? '#f87171' : simulatedHealth < 70 ? '#fbbf24' : '#4ade80' }}>
                {simulatedHealth}
              </span>
              <span className="text-xs text-gray-500 font-mono font-normal"> / 100</span>
            </div>
            <div
              className="text-xs font-mono px-3.5 py-1.5 rounded-full font-bold uppercase inline-block border"
              style={{
                backgroundColor: simulatedHealth < 45 ? 'rgba(239, 68, 68, 0.15)' : simulatedHealth < 70 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                color: simulatedHealth < 45 ? '#fca5a5' : simulatedHealth < 70 ? '#fde047' : '#86efac',
                borderColor: simulatedHealth < 45 ? '#ef4444' : simulatedHealth < 70 ? '#f59e0b' : '#22c55e'
              }}
            >
              STATUS: {simulatedUrgency}
            </div>
            <button
              onClick={() => {
                if (onSelectMonument) onSelectMonument(0, 'risk');
                else onEnterDashboard();
              }}
              className="w-full mt-4 py-3.5 rounded-xl bg-[#7b39fc] hover:bg-[#6d28d9] text-white font-manrope text-xs font-bold tracking-wider uppercase cursor-pointer shadow-md"
            >
              Run 2030 Longitudinal Simulation →
            </button>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 5. UNESCO PROTECTED HERITAGE REGISTRY                                  */}
      {/* ========================================================================= */}
      <section id="registry" className="py-24 px-6 max-w-[1440px] mx-auto space-y-12 border-t border-white/10">
        
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <span className="text-xs font-mono text-[#a855f7] uppercase tracking-widest font-bold block">
              National Heritage Registry
            </span>
            <h2 className="text-3xl sm:text-4xl font-inter font-bold text-white mt-1">
              Protected UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-manrope font-bold uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-sm"
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
              className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#7b39fc]/50 transition-all duration-500 group cursor-pointer flex flex-col justify-between"
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
                  <span className="text-[10px] font-mono text-[#a855f7] uppercase font-semibold">{s.state} · {s.period}</span>
                  <h3 className="text-lg font-inter font-bold text-white group-hover:text-[#a855f7] transition mt-0.5">
                    {s.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-white/10">
                  <span className="text-gray-400">Hazard: <strong className="text-white">{s.seismicZone}</strong></span>
                  <span className="text-[#a855f7] font-bold flex items-center gap-1">
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
      {/* ❓ 6. FAQ SECTION & INSTITUTIONAL FOOTER                                   */}
      {/* ========================================================================= */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto space-y-8 border-t border-white/10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#a855f7] uppercase tracking-widest font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-inter font-bold text-white">
            Architecture & Platform Specifications
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-inter font-bold text-base text-white hover:text-[#a855f7] cursor-pointer transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-400 font-manrope leading-relaxed border-t border-white/5 pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 🛡️ FOOTER */}
      <footer className="border-t border-white/10 bg-[#000000] py-12 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="xs" showText={true} />
            <span className="text-gray-600">|</span>
            <span>Smart India Hackathon 2026 · Team Qualified (Team ID: 031)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
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
