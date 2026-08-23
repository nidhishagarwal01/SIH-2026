import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  // State for Interactive Hero Banner Display Mode
  const [heroMode, setHeroMode] = useState('split');
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  
  // State for Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // State for Interactive Sandbox Showcase
  const [showcaseTab, setShowcaseTab] = useState('twin');
  const [selectedTwinSiteIdx, setSelectedTwinSiteIdx] = useState(0);
  const [selectedVisionSiteIdx, setSelectedVisionSiteIdx] = useState(0);
  
  // State for Environmental Stress Simulator
  const [simMonsoon, setSimMonsoon] = useState(35);
  const [simSeismic, setSimSeismic] = useState(1.25);
  
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState(null);

  // State for Cinematic Split-Reveal Intro on Page Load / Refresh
  const [showIntro, setShowIntro] = useState(true);

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
    <div className="min-h-screen bg-[#F7F5F0] text-[#181B1F] font-sans selection:bg-[#C85A32] selection:text-white overflow-x-hidden relative museum-bg">
      
      {/* 🎬 Split-Reveal of Monument Images & Rising Heritage Shield Intro */}
      <AnimatePresence>
        {showIntro && <CinematicIntroReveal onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* 🌟 1. TOP MINIMALIST SOVEREIGN SANDSTONE NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-[9999] bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E1D8] px-6 py-4 shadow-sm"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          
          {/* Left: Brand Logo & Emblem */}
          <div className="flex items-center gap-4">
            <HeritageShieldLogo
              size="md"
              showText={true}
              textClassName="text-lg tracking-wider font-serif font-bold text-[#181B1F]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Center: Minimalist Nav Links with Terracotta Highlight */}
          <div className="hidden lg:flex items-center gap-9 text-xs font-mono tracking-widest uppercase">
            <a 
              href="#hero-banner" 
              className="text-[#C85A32] font-bold border-b-2 border-[#C85A32] pb-1 transition"
            >
              Overview
            </a>
            <a 
              href="#decision-modules" 
              className="text-[#4B5563] hover:text-[#C85A32] transition font-semibold"
            >
              Architecture
            </a>
            <a 
              href="#sandbox-showcase" 
              className="text-[#4B5563] hover:text-[#C85A32] transition font-semibold"
            >
              Living Twins
            </a>
            <a 
              href="#climate-simulator" 
              className="text-[#4B5563] hover:text-[#C85A32] transition font-semibold"
            >
              2030 Predictor
            </a>
            <a 
              href="#monument-registry" 
              className="text-[#4B5563] hover:text-[#C85A32] transition font-semibold"
            >
              Heritage Sites
            </a>
            <a 
              href="#faq" 
              className="text-[#4B5563] hover:text-[#C85A32] transition font-semibold"
            >
              Archive FAQ
            </a>
          </div>

          {/* Right: Actions & Login */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowIntro(true)}
              className="px-3.5 py-1.5 rounded-xl frosted-btn text-[11px] font-mono font-bold text-[#C85A32] hover:text-white hover:bg-[#C85A32] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Replay Cinematic Split Reveal"
            >
              <span>🎬</span>
              <span className="hidden sm:inline">Replay Intro</span>
            </button>

            <ThemeToggle />

            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-white border border-[#E6E1D8] px-3.5 py-1.5 rounded-xl shadow-sm">
                <span className="text-xs font-mono font-bold text-[#181B1F] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C85A32]" />
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
      {/* 🚀 2. CINEMATIC SOVEREIGN SANDSTONE HERO BANNER                             */}
      {/* ========================================================================= */}
      <section id="hero-banner" className="relative pt-6 pb-16 px-4 sm:px-6 max-w-[1600px] mx-auto">
        
        <div className="relative rounded-3xl overflow-hidden border border-[#E6E1D8] bg-white shadow-xl min-h-[620px] flex items-center p-6 sm:p-10 lg:p-14">
          
          {/* Subtle Architectural Ambient Vignette */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-25">
            <img
              src="/monuments/khajuraho.jpg"
              alt="Indian Built Heritage Masterpiece"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-110 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/70 z-10" />
          </div>

          {/* Two-Column Grid: Left Floating Showcase Card + Right Majestic Headline */}
          <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* 📱 LEFT COLUMN: Floating Showcase Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start" style={{ perspective: 1000 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
                className="w-full max-w-sm rounded-[2.25rem] border border-[#E6E1D8] bg-white shadow-2xl p-4 sm:p-5 space-y-4 relative group cursor-pointer"
                style={{
                  boxShadow: '0 25px 60px -15px rgba(28, 25, 23, 0.12), 0 0 0 1px rgba(230, 225, 216, 0.8) inset',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Showcase Top Bar */}
                <div className="flex justify-between items-center text-xs font-mono px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
                    <span className="text-[10px] text-[#4B5563] font-bold uppercase tracking-wider">
                      Artefact Twin #{selectedTwinSiteIdx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx - 1 + sites.length) % sites.length)}
                      className="w-7 h-7 rounded-full bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white border border-[#E6E1D8] text-[#181B1F] flex items-center justify-center transition cursor-pointer text-xs"
                      title="Previous Monument"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx + 1) % sites.length)}
                      className="w-7 h-7 rounded-full bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white border border-[#E6E1D8] text-[#181B1F] flex items-center justify-center transition cursor-pointer text-xs"
                      title="Next Monument"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* Monument Showcase Image Display */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E6E1D8] bg-[#FAF8F5] shadow-inner">
                  <img
                    src={sites[selectedTwinSiteIdx]?.imageUrl || '/monuments/qutub_minar.jpg'}
                    alt={sites[selectedTwinSiteIdx]?.name}
                    className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181B1F]/80 via-transparent to-black/20" />
                  
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
                    <span className="text-[10px] font-mono text-[#F5E6CC] font-semibold block">
                      📍 {sites[selectedTwinSiteIdx]?.location}, {sites[selectedTwinSiteIdx]?.state}
                    </span>
                    <h4 className="text-lg font-serif font-bold text-white leading-tight">
                      {sites[selectedTwinSiteIdx]?.name}
                    </h4>
                  </div>
                </div>

                {/* Card Bottom Meta & Interactive CTA */}
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-[#4B5563] font-sans leading-relaxed line-clamp-2">
                    {sites[selectedTwinSiteIdx]?.builtEra} · {sites[selectedTwinSiteIdx]?.material}
                  </p>

                  <button
                    onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                    className="w-full py-3 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Explore 3D Living Twin</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* 🏛️ RIGHT COLUMN: Majestic Editorial Headline & Cultural Pitch */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* National Authority Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E6E1D8] shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
                <span className="text-[11px] font-mono text-[#C85A32] uppercase tracking-widest font-bold">
                  National Built Heritage Command Center · SIH 2026
                </span>
              </motion.div>

              {/* Main Display Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#181B1F] tracking-tight leading-[1.12]"
              >
                Custodian of Heritage & <span className="gold-cream-text">Living Digital Twins</span>
              </motion.h1>

              {/* Authoritative Cultural Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-[#4B5563] font-sans leading-relaxed max-w-xl"
              >
                Heritage Shield bridges ancient architectural majesty with AI computer vision, IoT meteorological feeds, and Paris-Erdogan fracture mechanics — empowering conservation authorities to safeguard 3,690+ protected monuments with auditable foresight.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={onEnterDashboard}
                  className="px-7 py-3.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Launch National Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#monument-registry"
                  className="px-6 py-3.5 rounded-xl frosted-btn font-mono text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer"
                >
                  <span>View Heritage Registry</span>
                </a>
              </motion.div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 3. "THE DECISION LAYER, MODULE BY MODULE" (8 DETAILED MODULES)          */}
      {/* ========================================================================= */}
      <section id="decision-modules" className="py-20 px-6 max-w-[1600px] mx-auto space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E6E1D8] text-[#C85A32] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span>⚙️ Autonomous Conservation Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181B1F] tracking-tight">
            The decision layer, <span className="gold-cream-text">module by module</span>
          </h2>

          <p className="text-sm sm:text-base text-[#4B5563] font-sans leading-relaxed">
            Eight synchronized AI & engineering subsystems executing autonomous diagnostics, structural physics calculations, and authoritative decision dispatch.
          </p>
        </motion.div>

        {/* 8-Module Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((mod, idx) => {
            const isSelected = activeWorkflowIndex === idx;
            return (
              <motion.div
                key={mod.step}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -7, scale: 1.02 }}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group ${
                  isSelected
                    ? 'bg-white border-[#C85A32] shadow-xl shadow-[#C85A32]/10 ring-1 ring-[#C85A32]'
                    : 'bg-white border-[#E6E1D8] shadow-sm hover:border-[#C85A32]/50 hover:shadow-lg'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] ${
                      isSelected ? 'bg-[#C85A32] text-white' : 'bg-[#FAF8F5] text-[#C85A32] border border-[#E6E1D8]'
                    }`}>
                      Step {mod.step}
                    </span>
                    <span className="text-[#64748B] font-semibold">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#181B1F] group-hover:text-[#C85A32] transition leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#4B5563] font-sans leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 💻 4. INTERACTIVE LIVE CONSOLE SANDBOX SHOWCASE                           */}
      {/* ========================================================================= */}
      <section id="sandbox-showcase" className="py-20 px-6 bg-[#FAF8F5] border-y border-[#E6E1D8] relative">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-between items-end gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-[#C85A32] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                <span>💻 Autonomous Sandbox</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B1F]">
                Experience the 4 Core Intelligence Consoles
              </h2>
            </div>

            {/* Showcase Tabs */}
            <div className="bg-white p-1.5 rounded-2xl border border-[#E6E1D8] flex items-center gap-1.5 font-mono text-xs overflow-x-auto shadow-sm">
              <button
                onClick={() => setShowcaseTab('twin')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                  showcaseTab === 'twin'
                    ? 'terracotta-btn shadow-md'
                    : 'text-[#64748B] hover:text-[#181B1F] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>🏛️</span>
                <span>3D Living Twin</span>
              </button>
              <button
                onClick={() => setShowcaseTab('vision')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                  showcaseTab === 'vision'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#181B1F] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>🔍</span>
                <span>AI Defect Vision</span>
              </button>
              <button
                onClick={() => setShowcaseTab('temporal')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                  showcaseTab === 'temporal'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#181B1F] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>📈</span>
                <span>2030 Decay Predictor</span>
              </button>
              <button
                onClick={() => setShowcaseTab('gis')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                  showcaseTab === 'gis'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#181B1F] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>🗺️</span>
                <span>GIS Radar</span>
              </button>
            </div>
          </motion.div>

          {/* Sandbox Showcase Display Container */}
          <div className="bg-white border border-[#E6E1D8] rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8 relative">
            
            {showcaseTab === 'twin' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-[#181B1F]">
                    3D Living Digital Twin
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed font-sans">
                    A realistic 3D model of the heritage site. You can rotate 360°, zoom in, and click directly on individual domes, balconies, pillars, or base walls to inspect their condition history.
                  </p>
                  
                  {/* Select 3D Twin Custom Dropdown */}
                  <div className="pt-2 space-y-1.5">
                    <label className="text-xs font-mono text-[#C85A32] block font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span>🏛️</span>
                      <span>Select Heritage Site:</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTwinSiteIdx}
                        onChange={(e) => setSelectedTwinSiteIdx(Number(e.target.value))}
                        className="w-full appearance-none bg-[#FAF8F5] border border-[#E6E1D8] hover:border-[#C85A32] text-[#181B1F] text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C85A32] focus:border-[#C85A32] cursor-pointer shadow-sm transition duration-200"
                      >
                        {sites.map((s, idx) => (
                          <option key={s.id || idx} value={idx} className="bg-white text-[#181B1F] py-2">
                            {s.name} ({s.state})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#C85A32]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                      className="px-6 py-2.5 rounded-xl terracotta-btn font-mono text-xs font-bold transition cursor-pointer shadow-md"
                    >
                      Open 3D Studio →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[530px] min-h-[530px] relative rounded-xl overflow-hidden border border-[#E6E1D8] shadow-lg bg-[#FAF8F5]">
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
                { id: "DEF-DL01", type: "Vertical Tensile Fissure", conf: "96.4%", sev: "High", top: "25%", left: "30%", width: "40%", height: "50%", metrics: "Width: 3.2mm · Depth: 18mm · Sandstone joint" },
                { id: "DEF-KA01", type: "Granite Exfoliation & Spalling", conf: "92.1%", sev: "Moderate", top: "35%", left: "22%", width: "55%", height: "45%", metrics: "Area: 140cm² · Monolithic granite wheel" },
                { id: "DEF-TS01", type: "Capillary Moisture Seepage", conf: "95.8%", sev: "High", top: "30%", left: "18%", width: "64%", height: "52%", metrics: "RH: 84% · Salt efflorescence on bastion" },
                { id: "DEF-OD01", type: "Saline Marine Chlorite Erosion", conf: "97.2%", sev: "Critical", top: "20%", left: "25%", width: "50%", height: "58%", metrics: "Pitting: 6.4mm · Coastal salt crust" },
                { id: "DEF-MH01", type: "Basalt Cliff Delamination", conf: "93.6%", sev: "Moderate", top: "22%", left: "20%", width: "60%", height: "55%", metrics: "Fissure: 42cm · Rock seepage trace" },
                { id: "DEF-UP01", type: "Marble Surface Micro-Fracture", conf: "98.1%", sev: "Watch", top: "18%", left: "22%", width: "56%", height: "62%", metrics: "Crack Width: 0.8mm · Discoloration 12%" },
                { id: "DEF-MH02", type: "Volcanic Basalt Shear Fracture", conf: "94.5%", sev: "High", top: "28%", left: "24%", width: "52%", height: "48%", metrics: "Trench Stress: 14.2 MPa · Joint fault" },
                { id: "DEF-MP01", type: "Sandstone Frieze Bracket Spalling", conf: "91.8%", sev: "Moderate", top: "26%", left: "28%", width: "46%", height: "50%", metrics: "Profile Loss: 18% · Shikhara rainwater scour" },
                { id: "DEF-MP02", type: "Torana Arch Joint Separation", conf: "89.7%", sev: "Watch", top: "15%", left: "26%", width: "48%", height: "65%", metrics: "Lintel Gap: 1.4mm · Lichen coverage 8%" },
                { id: "DEF-TN01", type: "Granite Vimana Tier Dislocation", conf: "95.2%", sev: "High", top: "18%", left: "32%", width: "38%", height: "62%", metrics: "Shift: 2.1mm · Upper tier seismic vibration" },
                { id: "DEF-GJ01", type: "Subterranean Salt Ingress & Dampness", conf: "96.9%", sev: "High", top: "30%", left: "15%", width: "70%", height: "55%", metrics: "RH: 92% · Pillar base mineral leaching" },
                { id: "DEF-GJ02", type: "Harappan Dressed-Stone Weathering", conf: "90.4%", sev: "Moderate", top: "32%", left: "20%", width: "60%", height: "48%", metrics: "Mortar Wash: 35mm · Reservoir erosion" }
              ];
              const curDefect = defectMap[selectedVisionSiteIdx] || defectMap[0];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-[#181B1F]">
                      AI Defect Vision Scanner
                    </h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed font-sans">
                      Smart computer vision scans inspection photos to detect cracks, peeling stone, and water dampness. It measures the exact length and width of cracks to catch damage early.
                    </p>
                    
                    {/* Select Heritage Site Dropdown */}
                    <div className="pt-2 space-y-1.5">
                      <label className="text-xs font-mono text-sky-600 block font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span>🏛️</span>
                        <span>Select Heritage Site:</span>
                      </label>
                      <div className="relative">
                        <select
                          value={selectedVisionSiteIdx}
                          onChange={(e) => setSelectedVisionSiteIdx(Number(e.target.value))}
                          className="w-full appearance-none bg-[#FAF8F5] border border-[#E6E1D8] hover:border-sky-500 text-[#181B1F] text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 cursor-pointer shadow-sm transition duration-200"
                        >
                          {sites.map((s, idx) => (
                            <option key={s.id || idx} value={idx} className="bg-white text-[#181B1F] py-2">
                              {s.name} ({s.state})
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-sky-600">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onSelectMonument ? onSelectMonument(selectedVisionSiteIdx, 'vision') : onEnterDashboard()}
                        className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-mono text-xs font-bold hover:bg-sky-500 transition cursor-pointer shadow-md"
                      >
                        Open AI Diagnostics Lab →
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 h-[530px] min-h-[530px] relative rounded-xl overflow-hidden border border-[#E6E1D8] shadow-lg bg-[#FAF8F5] flex flex-col justify-between">
                    {/* Header Strip */}
                    <div className="bg-[#FAF8F5] border-b border-[#E6E1D8] px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#181B1F]">
                          {curVisionSite.name} · AI Vision Scanner
                        </h3>
                      </div>
                    </div>

                    {/* Image Viewport with Dynamic AI Bounding Box */}
                    <div className="relative flex-1 w-full overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={curVisionSite.imageUrl || '/monuments/qutub_minar.jpg'}
                        alt={curVisionSite.name}
                        className="w-full h-full object-cover filter brightness-95"
                      />
                      
                      {/* Dynamic AI Detection Box */}
                      <div
                        className="absolute border-2 border-rose-500 bg-rose-500/15 rounded-lg pointer-events-none transition-all duration-500 animate-pulse"
                        style={{
                          top: curDefect.top,
                          left: curDefect.left,
                          width: curDefect.width,
                          height: curDefect.height
                        }}
                      >
                        <span className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap shadow-lg">
                          {curDefect.id} · {curDefect.type} · {curDefect.conf} AI Confidence
                        </span>
                        
                        {/* Target Crosshair Corners */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
                      </div>
                    </div>

                    {/* Footer Strip with Telemetry */}
                    <div className="bg-[#FAF8F5] border-t border-[#E6E1D8] px-4 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#4B5563] z-10 shrink-0">
                      <span className="text-[#181B1F] font-semibold">{curDefect.metrics}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {showcaseTab === 'temporal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-[#181B1F]">
                    2030 Structural Decay Predictor
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed font-sans">
                    Forecasting how damage will worsen over the next 4 to 6 years if left untreated. It proves that fixing minor cracks early for ₹3 Lakhs avoids ₹70+ Lakhs in emergency rebuilds later.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-mono text-xs font-bold hover:bg-amber-500 transition cursor-pointer shadow-md"
                    >
                      Run 2030 Predictive Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#FAF8F5] p-6 rounded-xl border border-[#E6E1D8] space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center shadow-inner">
                  <div className="flex justify-between items-center text-[#64748B] border-b border-[#E6E1D8] pb-3 text-sm font-bold">
                    <span>Forecast Year</span>
                    <span>Predicted Health Score</span>
                  </div>
                  <div className="flex justify-between items-center text-[#181B1F] py-2.5 border-b border-[#E6E1D8]/60">
                    <span>2020 Baseline Survey</span>
                    <span className="text-emerald-600 font-bold">91 / 100 (Safe)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#181B1F] py-2.5 border-b border-[#E6E1D8]/60">
                    <span>2024 Interim Survey</span>
                    <span className="text-emerald-700 font-bold">82 / 100 (Stable)</span>
                  </div>
                  <div className="flex justify-between items-center text-[#181B1F] py-2.5 border-b border-[#E6E1D8]/60">
                    <span>2026 Today (Current Scan)</span>
                    <span className="text-amber-600 font-bold">62 / 100 (Needs Attention)</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-600 font-bold py-2.5 border-b border-[#E6E1D8]/60">
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
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-[#181B1F]">
                    National GIS Radar & Hazard Map
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed font-sans">
                    View all 12 Centrally Protected Heritage Sites across India on an interactive map. Overlay live monsoon rainfall alerts and earthquake hazard zones to protect endangered sites in advance.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition cursor-pointer shadow-md"
                    >
                      Open National GIS Map →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-xl overflow-hidden border border-[#E6E1D8] shadow-lg bg-[#FAF8F5]">
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

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧪 6. INTERACTIVE ENVIRONMENTAL STRESS & SCENARIO SIMULATOR               */}
      {/* ========================================================================= */}
      <section id="climate-simulator" className="py-20 px-6 max-w-[1600px] mx-auto space-y-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-[#C85A32] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span>🧪 Real-Time Physics Test</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B1F]">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-sm text-[#4B5563] font-sans">
            Adjust environmental parameters to see how climatic anomalies affect heritage site degradation in real-time.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-[#E6E1D8] p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl"
        >
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
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

            <div className="space-y-2">
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

          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E6E1D8] p-7 rounded-2xl text-center space-y-3 shadow-inner">
            <span className="text-[10px] font-mono uppercase text-[#C85A32] tracking-widest font-bold">Simulated Health Score</span>
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
              className="w-full mt-4 py-3 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-md"
            >
              Run 2030 Longitudinal Simulation →
            </button>
          </div>

        </motion.div>

      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 7. CENTRALLY PROTECTED MONUMENTS REGISTRY GALLERY                      */}
      {/* ========================================================================= */}
      <section id="monument-registry" className="py-20 px-6 max-w-[1600px] mx-auto space-y-12">
        
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            <span className="text-xs font-mono text-[#C85A32] uppercase tracking-widest font-bold">
              National Heritage Registry
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#181B1F] mt-1">
              Protected UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-5 py-2.5 rounded-xl frosted-btn text-xs font-mono tracking-wider uppercase transition flex items-center gap-2 cursor-pointer font-bold shadow-sm"
          >
            <span>View All 12 Heritage Sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {flagshipSites.map((s, idx) => (
            <motion.div
              key={s.id || idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
              className="bg-white border border-[#E6E1D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C85A32]/50 transition-all duration-500 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
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
                  <span className="text-[10px] font-mono text-[#C85A32] uppercase font-semibold">{s.state} · {s.period}</span>
                  <h3 className="text-lg font-serif font-bold text-[#181B1F] group-hover:text-[#C85A32] transition mt-0.5">
                    {s.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-[#E6E1D8]">
                  <span className="text-[#64748B]">Hazard: <strong className="text-[#181B1F]">{s.seismicZone}</strong></span>
                  <span className="text-[#C85A32] font-bold flex items-center gap-1">
                    <span>Explore Twin</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* ❓ 8. FAQ ACCORDION                                                       */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#C85A32] uppercase tracking-widest font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#181B1F]">
            Heritage Shield Technical Architecture
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E6E1D8] shadow-sm rounded-2xl overflow-hidden transition hover:border-[#C85A32]/40"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-[#181B1F] hover:text-[#C85A32] cursor-pointer transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#C85A32] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#4B5563] font-sans leading-relaxed border-t border-[#E6E1D8] pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 🛡️ 9. INSTITUTIONAL FOOTER                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#E6E1D8] bg-[#FAF8F5] py-12 px-6">
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
