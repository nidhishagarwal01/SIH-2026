import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform,
  useMotionValue
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
  Sun
} from 'lucide-react';

import HeritageShieldLogo from './HeritageShieldLogo';
import MonumentViewer3D from './MonumentViewer3D';
import HeritageGisMap from './HeritageGisMap';
import AuthModal from './AuthModal';
import CinematicIntroReveal from './CinematicIntroReveal';
import EpigraphicWatermarkDivider from './EpigraphicWatermarkDivider';

export default function LandingPageView({ 
  onEnterDashboard, 
  onSelectMonument, 
  onOpenStudio, 
  sites = [],
  currentUser,
  onLoginSuccess,
  onLogout,
  isDarkTheme: isDarkThemeProp,
  onToggleTheme
}) {
  // Navigation & Interactive States
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [localDarkTheme, setLocalDarkTheme] = useState(false);

  const isDarkTheme = isDarkThemeProp !== undefined ? isDarkThemeProp : localDarkTheme;

  const toggleTheme = () => {
    if (typeof onToggleTheme === 'function') {
      onToggleTheme();
    } else {
      setLocalDarkTheme(prev => {
        const next = !prev;
        if (next) {
          document.body.classList.add('dark-theme');
        } else {
          document.body.classList.remove('dark-theme');
        }
        return next;
      });
    }
  };

  // 🎛️ 4. Interactive Hero Twin Scan Mode
  const [heroScanMode, setHeroScanMode] = useState('photo'); // 'photo' | 'lidar' | 'fea'
  const [activePin, setActivePin] = useState(null);

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className={`min-h-screen ${isDarkTheme ? 'dark-theme bg-[#120A06] text-[#FAF5ED]' : 'bg-[#F0E7DA] text-[#24160E]'} font-sans selection:bg-[#BA532B] selection:text-white overflow-x-hidden relative museum-bg transition-colors duration-500`}
    >
      {/* 🚀 TOP SPRING-SMOOTHED SCROLL PROGRESS BAR (Active only after intro) */}
      {!showIntro && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#BA532B] via-[#C29244] to-[#24160E] z-[999] origin-left shadow-sm pointer-events-none"
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
        className={`sticky top-0 z-[9999] ${isDarkTheme ? 'bg-[#180E09]/92 border-[#3D2416]' : 'bg-[#FAF5ED]/95 border-[#DACDB8]/80'} backdrop-blur-2xl border-b px-6 sm:px-10 py-3.5 shadow-[0_4px_20px_-4px_rgba(36,22,14,0.05)] transition-colors duration-500`}
      >
        <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-6">
          
          {/* Left: Brand Logo & Emblem */}
          <div className="flex items-center gap-4">
            <HeritageShieldLogo
              size="md"
              showText={true}
              textClassName="text-xl tracking-wider font-serif font-bold text-[#24160E]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Center: Beautified Capsule Nav Links */}
          <div className={`hidden lg:flex items-center gap-1.5 ${isDarkTheme ? 'bg-[#140B07]/80 border-[#3D2416]' : 'bg-[#F0E7DA]/60 border-[#DACDB8]/80'} border px-2.5 py-1.5 rounded-2xl shadow-inner font-mono text-[13px] tracking-wider uppercase font-semibold transition-all duration-300`}>
            <button 
              onClick={() => scrollToSection('pipeline-section')}
              className={`${isDarkTheme ? 'text-[#D8C7B8] hover:text-[#BA532B] hover:bg-[#1E120B]' : 'text-[#4D3425] hover:text-[#BA532B] hover:bg-white'} px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer`}
            >
              Architecture
            </button>
            <button 
              onClick={() => scrollToSection('consoles-section')}
              className="text-[#4D3425] hover:text-[#BA532B] hover:bg-white px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Living Twins
            </button>
            <button 
              onClick={() => scrollToSection('simulator-section')}
              className="text-[#4D3425] hover:text-[#BA532B] hover:bg-white px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              2030 Predictor
            </button>
            <button 
              onClick={() => scrollToSection('registry-section')}
              className="text-[#4D3425] hover:text-[#BA532B] hover:bg-white px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Heritage Sites
            </button>
            <button 
              onClick={() => scrollToSection('faq-section')}
              className="text-[#4D3425] hover:text-[#BA532B] hover:bg-white px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
            >
              Archive FAQ
            </button>
          </div>

          {/* Right: Actions & Login */}
          <div className="flex items-center gap-3">
            {/* ☀️ Theme Toggle Button (Sun Icon Only) */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 18 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              title="Toggle Heritage Theme"
              className="p-2.5 rounded-xl bg-white border border-[#DACDB8] hover:border-[#BA532B] text-[#BA532B] shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-center"
              aria-label="Theme Toggle"
            >
              <Sun className={`w-4 h-4 transition-transform duration-500 ${isDarkTheme ? 'rotate-180 text-[#C29244]' : 'text-[#BA532B]'}`} />
            </motion.button>

            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-white border border-[#DACDB8] px-4 py-2 rounded-xl shadow-sm">
                <span className="text-xs font-mono font-bold text-[#24160E] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#BA532B]" />
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
                className="px-5 py-2.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-md"
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
      {/* 🚀 2. GRAND SUBMERGED HERO EXHIBITION (FULL-PAGE ANIMATED BACKDROP)        */}
      {/* ========================================================================= */}
      <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center px-6 sm:px-12 lg:px-20 py-20 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* 🏛️ Full-Page Animated Heritage Monument Cinematic Backdrop */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <motion.img
            src="/monuments/hampi.jpg"
            alt="Heritage Monument Backdrop"
            animate={{ 
              scale: [1.02, 1.09, 1.02],
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 22, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`w-full h-full object-cover object-center ${isDarkTheme ? 'brightness-[0.72] contrast-[1.24] sepia-[0.24] saturate-[1.2]' : 'brightness-[0.92] contrast-[1.18] sepia-[0.16] saturate-[1.25]'} transition-all duration-700`}
          />

          {/* Sunlit Sandstone & Balanced Nocturnal Lighting Gradients */}
          <div className={`absolute inset-0 bg-gradient-to-t ${isDarkTheme ? 'from-[#120A06] via-[#120A06]/45 to-[#120A06]/25' : 'from-[#F0E7DA] via-[#F0E7DA]/35 to-[#F0E7DA]/15'} transition-all duration-500`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${isDarkTheme ? 'from-[#120A06]/70 via-transparent to-[#120A06]/70' : 'from-[#F0E7DA]/55 via-transparent to-[#F0E7DA]/55'} transition-all duration-500`} />
          <div className={`absolute inset-0 ${isDarkTheme ? 'bg-[#BA532B]/10 mix-blend-overlay' : 'bg-[#BA532B]/6 mix-blend-multiply'}`} />

          {/* Floating Subtle Ambient Sandstone Motes */}
          <div className="absolute inset-0">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#BA532B]"
                style={{
                  width: (i % 3) + 2,
                  height: (i % 3) + 2,
                  top: `${(i * 19 + 7) % 100}%`,
                  left: `${(i * 29 + 11) % 100}%`,
                  opacity: 0.2 + (i % 3) * 0.15,
                  boxShadow: '0 0 8px rgba(186, 83, 43, 0.5)'
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, i % 2 === 0 ? 20 : -20, 0],
                  opacity: [0.15, 0.45, 0.15],
                }}
                transition={{
                  duration: 8 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Centered Grand Editorial Column */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 py-10">
          
          {/* Editorial Serif Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-[#24160E] leading-[1.05] tracking-tight max-w-4xl"
          >
            HERITAGE <span className="text-[#BA532B]">SHIELD</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: smoothEase }}
            className="text-base sm:text-xl text-[#4D3425] font-sans leading-relaxed max-w-3xl font-medium"
          >
            Heritage Shield bridges ancient architectural majesty with AI computer vision, IoT meteorological feeds, and Paris-Erdogan fracture mechanics — empowering conservation authorities to safeguard 3,690+ protected monuments with auditable foresight.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: smoothEase }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={onEnterDashboard}
              className="px-9 py-4 rounded-2xl terracotta-btn font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2.5 cursor-pointer shadow-xl hover:scale-105"
            >
              <span>Launch National Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* 🏺 1. Ancient Inscription Divider: Hero to Pipeline */}
      <EpigraphicWatermarkDivider speed={50} />

      {/* ========================================================================= */}
      {/* ⚙️ 3. SUBMERGED 8-MODULE DECISION PIPELINE                                */}
      {/* ========================================================================= */}
      <motion.section 
        id="pipeline-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-[#DACDB8]"
      >
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 text-left">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#24160E] tracking-tight">
            The decision layer, <span className="gold-cream-text">module by module</span>
          </h2>

          <p className="text-sm sm:text-base text-[#4D3425] font-sans leading-relaxed">
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
                    ? 'bg-white border-[#BA532B] shadow-xl shadow-[#BA532B]/10 ring-1 ring-[#BA532B]'
                    : 'bg-white/80 border-[#DACDB8] shadow-sm hover:border-[#BA532B]/50 hover:shadow-lg'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] ${
                      isSelected ? 'bg-[#BA532B] text-white' : 'bg-[#FAF5ED] text-[#BA532B] border border-[#DACDB8]'
                    }`}>
                      Step {mod.step}
                    </span>
                    <span className="text-[#7A5B49] font-semibold">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#24160E] group-hover:text-[#BA532B] transition leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#4D3425] font-sans leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.section>

      {/* 🏺 2. Ancient Inscription Divider: Pipeline to Consoles */}
      <EpigraphicWatermarkDivider speed={42} reverse={true} />

      {/* ========================================================================= */}
      {/* 💻 4. SUBMERGED 4-CONSOLE INTELLIGENCE SANDBOX                             */}
      {/* ========================================================================= */}
      <motion.section 
        id="consoles-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-8 border-t border-[#DACDB8]"
      >
        
        {/* Section Header with Console Tabs */}
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#24160E]">
              Experience the 4 Core Intelligence Consoles
            </h2>
          </div>

          {/* Clean Submerged Tabs */}
          <div className="bg-white p-1.5 rounded-2xl border border-[#DACDB8] flex items-center gap-1.5 font-mono text-xs overflow-x-auto shadow-sm">
            <button
              onClick={() => setShowcaseTab('twin')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'twin'
                  ? 'terracotta-btn shadow-md'
                  : 'text-[#4D3425] hover:text-[#24160E] hover:bg-[#FAF5ED]'
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
                  : 'text-[#4D3425] hover:text-[#24160E] hover:bg-[#FAF5ED]'
              }`}
            >
              <span>🔍</span>
              <span>AI Defect Vision</span>
            </button>
            <button
              onClick={() => setShowcaseTab('temporal')}
              className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                showcaseTab === 'temporal'
                  ? 'bg-[#C29244] text-white shadow-md'
                  : 'text-[#4D3425] hover:text-[#24160E] hover:bg-[#FAF5ED]'
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
                  : 'text-[#4D3425] hover:text-[#24160E] hover:bg-[#FAF5ED]'
              }`}
            >
              <span>🗺️</span>
              <span>GIS Radar</span>
            </button>
          </div>
        </div>

        {/* Viewport Display Area */}
        <div className="bg-white border border-[#DACDB8] rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8 relative">
          
          {showcaseTab === 'twin' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-[#24160E]">
                  3D Living Digital Twin
                </h3>
                <p className="text-sm text-[#4D3425] leading-relaxed font-sans">
                  A realistic 3D model of the heritage site. You can rotate 360°, zoom in, and click directly on individual domes, balconies, pillars, or base walls to inspect their condition history.
                </p>
                
                {/* Select 3D Twin Custom Dropdown */}
                <div className="pt-2 space-y-1.5">
                  <label className="text-xs font-mono text-[#BA532B] block font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span>🏛️</span>
                    <span>Select Heritage Site:</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTwinSiteIdx}
                      onChange={(e) => setSelectedTwinSiteIdx(Number(e.target.value))}
                      className="w-full appearance-none bg-[#FAF5ED] border border-[#DACDB8] hover:border-[#BA532B] text-[#24160E] text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#BA532B] cursor-pointer shadow-sm"
                    >
                      {sites.map((s, idx) => (
                        <option key={s.id || idx} value={idx} className="bg-white text-[#24160E] py-2">
                          {s.name} ({s.state})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#BA532B]">
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

              <div className="lg:col-span-7 h-[500px] min-h-[500px] relative rounded-2xl overflow-hidden border border-[#DACDB8] shadow-lg bg-[#FAF5ED]">
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
                  <h3 className="text-2xl font-serif font-bold text-[#24160E]">
                    AI Defect Vision Scanner
                  </h3>
                  <p className="text-sm text-[#4D3425] leading-relaxed font-sans">
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
                        className="w-full appearance-none bg-[#FAF5ED] border border-[#DACDB8] hover:border-sky-600 text-[#24160E] text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none cursor-pointer shadow-sm"
                      >
                        {sites.map((s, idx) => (
                          <option key={s.id || idx} value={idx} className="bg-white text-[#24160E] py-2">
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

                <div className="lg:col-span-7 h-[500px] min-h-[500px] relative rounded-2xl overflow-hidden border border-[#DACDB8] shadow-lg bg-[#FAF5ED] flex flex-col justify-between">
                  <div className="bg-[#FAF5ED] border-b border-[#DACDB8] px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
                    <h3 className="text-sm font-serif font-bold text-[#24160E]">
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

                  <div className="bg-[#FAF5ED] border-t border-[#DACDB8] px-4 py-2.5 font-mono text-[11px] text-[#4D3425]">
                    <span>Telemetry: <strong className="text-[#24160E]">{curDefect.metrics}</strong></span>
                  </div>
                </div>
              </div>
            );
          })()}

          {showcaseTab === 'temporal' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 text-left">
                <h3 className="text-2xl font-serif font-bold text-[#24160E]">
                  2030 Structural Decay Predictor
                </h3>
                <p className="text-sm text-[#4D3425] leading-relaxed font-sans">
                  Forecasting how damage will worsen over the next 4 to 6 years if left untreated. It proves that fixing minor cracks early for ₹3 Lakhs avoids ₹70+ Lakhs in emergency rebuilds later.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onEnterDashboard}
                    className="px-6 py-3 rounded-xl bg-[#C29244] text-white font-mono text-xs font-bold hover:bg-[#B89246] transition cursor-pointer shadow-md"
                  >
                    Run 2030 Predictive Lab →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FAF5ED] p-6 rounded-2xl border border-[#DACDB8] space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center shadow-inner">
                <div className="flex justify-between items-center text-[#7A5B49] border-b border-[#DACDB8] pb-3 text-sm font-bold">
                  <span>Forecast Year</span>
                  <span>Predicted Health Score</span>
                </div>
                <div className="flex justify-between items-center text-[#24160E] py-2.5 border-b border-[#DACDB8]/60">
                  <span>2020 Baseline Survey</span>
                  <span className="text-emerald-600 font-bold">91 / 100 (Safe)</span>
                </div>
                <div className="flex justify-between items-center text-[#24160E] py-2.5 border-b border-[#DACDB8]/60">
                  <span>2024 Interim Survey</span>
                  <span className="text-emerald-700 font-bold">82 / 100 (Stable)</span>
                </div>
                <div className="flex justify-between items-center text-[#24160E] py-2.5 border-b border-[#DACDB8]/60">
                  <span>2026 Today (Current Scan)</span>
                  <span className="text-amber-600 font-bold">62 / 100 (Needs Attention)</span>
                </div>
                <div className="flex justify-between items-center text-rose-600 font-bold py-2.5 border-b border-[#DACDB8]/60">
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
                <h3 className="text-2xl font-serif font-bold text-[#24160E]">
                  National GIS Radar & Hazard Map
                </h3>
                <p className="text-sm text-[#4D3425] leading-relaxed font-sans">
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

              <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-2xl overflow-hidden border border-[#DACDB8] shadow-lg bg-[#FAF5ED]">
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

      {/* 🏺 3. Ancient Inscription Divider: Consoles to Simulator */}
      <EpigraphicWatermarkDivider speed={48} />

      {/* ========================================================================= */}
      {/* 🧪 5. SUBMERGED ENVIRONMENTAL STRESS SIMULATOR                            */}
      {/* ========================================================================= */}
      <motion.section 
        id="simulator-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-[#DACDB8]"
      >
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#24160E]">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-sm text-[#4D3425] font-sans">
            Adjust environmental parameters to see how climatic anomalies affect heritage site degradation in real-time.
          </p>
        </div>

        <div className="bg-white border border-[#DACDB8] p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono text-[#24160E]">
                <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                <strong className="text-sky-700 font-bold">+{simMonsoon}% Excess Precipitation</strong>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simMonsoon}
                onChange={(e) => setSimMonsoon(Number(e.target.value))}
                className="w-full accent-[#BA532B] h-2 bg-[#DACDB8] rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-xs font-mono text-[#24160E]">
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
                className="w-full accent-[#BA532B] h-2 bg-[#DACDB8] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF5ED] border border-[#DACDB8] p-8 rounded-2xl text-center space-y-3 shadow-inner">
            <span className="text-[10px] font-mono uppercase text-[#BA532B] tracking-widest font-bold">Simulated Health Score</span>
            <div className="text-5xl font-serif font-bold">
              <span style={{ color: simulatedHealth < 45 ? '#DC2626' : simulatedHealth < 70 ? '#D97706' : '#16A34A' }}>
                {simulatedHealth}
              </span>
              <span className="text-xs text-[#7A5B49] font-mono font-normal"> / 100</span>
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

      {/* 🏺 4. Ancient Inscription Divider: Simulator to Registry */}
      <EpigraphicWatermarkDivider speed={52} reverse={true} />

      {/* ========================================================================= */}
      {/* 🏛️ 6. SUBMERGED CENTRALLY PROTECTED MONUMENTS REGISTRY (STONE PLINTHS)     */}
      {/* ========================================================================= */}
      <motion.section 
        id="registry-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1600px] mx-auto space-y-12 border-t border-[#DACDB8]"
      >
        
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5ED] border border-[#DACDB8] text-[#BA532B] text-xs font-mono font-bold uppercase tracking-wider">
              <span>🏛️ National Heritage Registry</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#24160E] tracking-tight">
              Centrally Protected <span className="gold-cream-text">Living Twins</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4D3425] font-sans max-w-2xl">
              Explore 12 flagship UNESCO World Heritage monuments monitored through high-resolution 3D digital twins and multi-spectral structural telemetry.
            </p>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-6 py-3.5 rounded-xl terracotta-btn text-xs font-mono tracking-wider uppercase transition flex items-center gap-2 cursor-pointer font-bold shadow-md hover:scale-105"
          >
            <span>Launch National Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 🎛️ 5. Editorial 3D Architectural Stone Plinth Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {flagshipSites.map((s, idx) => (
            <motion.div
              key={s.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: smoothEase }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => onSelectMonument ? onSelectMonument(idx) : onEnterDashboard()}
              className="bg-[#FAF5ED] border border-[#DACDB8] hover:border-[#BA532B] rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col justify-between space-y-4"
            >
              {/* Image Frame with Floating Period Tag & Status Pill */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#140B07] border border-[#DACDB8]">
                <img
                  src={s.imageUrl || '/monuments/qutub_minar.jpg'}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-[0.9] contrast-[1.12]"
                />
                
                {/* Floating Period Tag on Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#24160E]/80 text-[#FAF5ED] backdrop-blur-md border border-[#DACDB8]/40 shadow-sm">
                    {s.period || 'UNESCO World Heritage'}
                  </span>
                </div>

                {/* Status Indicator on Top Right */}
                <div className="absolute top-3 right-3">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow"
                    style={{
                      backgroundColor: `${s.color}25`,
                      color: s.color,
                      borderColor: `${s.color}60`
                    }}
                  >
                    ● {s.status}
                  </span>
                </div>

                {/* Subtle Gradient Shadow at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#24160E]/70 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-amber-200 font-semibold">
                  📍 {s.location}, {s.state}
                </div>
              </div>

              {/* Plinth Content Body */}
              <div className="space-y-3.5 text-left px-1">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#24160E] group-hover:text-[#BA532B] transition leading-snug">
                    {s.name}
                  </h3>
                  <p className="text-xs text-[#4D3425] font-sans mt-1 line-clamp-2 leading-relaxed">
                    {s.builtEra} · Constructed with {s.material}
                  </p>
                </div>

                {/* Structural Telemetry Meta Bar */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#DACDB8] text-[11px] font-mono">
                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-[#DACDB8]/60">
                    <span className="text-[#7A5B49] block text-[9px] uppercase">Seismic Zone</span>
                    <strong className="text-[#24160E]">{s.seismicZone}</strong>
                  </div>
                  <div className="bg-white px-2.5 py-1.5 rounded-lg border border-[#DACDB8]/60">
                    <span className="text-[#7A5B49] block text-[9px] uppercase">Twin Telemetry</span>
                    <strong className="text-emerald-700">Live Active</strong>
                  </div>
                </div>

                {/* Explore Action Strip */}
                <div className="pt-2 flex justify-between items-center text-xs font-mono text-[#BA532B] font-bold">
                  <span>Explore Living Twin</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#DACDB8] group-hover:bg-[#BA532B] group-hover:text-white transition-all flex items-center justify-center shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.section>

      {/* 🏺 5. Ancient Inscription Divider: Registry to FAQ */}
      <EpigraphicWatermarkDivider speed={44} />

      {/* ========================================================================= */}
      {/* ❓ 7. SUBMERGED TECHNICAL FAQ ACCORDION                                    */}
      {/* ========================================================================= */}
      <motion.section 
        id="faq-section" 
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="py-24 px-6 max-w-4xl mx-auto space-y-8 border-t border-[#DACDB8]"
      >
        
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#BA532B] uppercase tracking-widest font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#24160E]">
            Heritage Shield Technical Architecture
          </h2>
        </div>

        <div className="space-y-3.5 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#DACDB8] shadow-sm rounded-2xl overflow-hidden transition hover:border-[#BA532B]/40"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-[#24160E] hover:text-[#BA532B] cursor-pointer transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#BA532B] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#4D3425] font-sans leading-relaxed border-t border-[#DACDB8] pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </motion.section>

      {/* 🏺 6. Ancient Inscription Divider: FAQ to Footer */}
      <EpigraphicWatermarkDivider speed={50} reverse={true} />

      {/* ========================================================================= */}
      {/* 🛡️ 8. INSTITUTIONAL FOOTER                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-[#DACDB8] bg-[#FAF5ED] py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-[#7A5B49]">
          
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
