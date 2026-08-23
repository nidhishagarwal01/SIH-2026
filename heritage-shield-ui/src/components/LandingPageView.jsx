import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeritageShieldLogo from './HeritageShieldLogo';
import ThemeToggle from './ThemeToggle';
import MonumentViewer3D from './MonumentViewer3D';
import HeritageGisMap from './HeritageGisMap';
import AuthModal from './AuthModal';
import CinematicIntroReveal from './CinematicIntroReveal';

import {
  Shield,
  Layers,
  Eye,
  Clock,
  Compass,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Globe,
  Radio,
  AlertTriangle,
  FileText,
  Activity,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Sliders,
  Cpu,
  Search,
  Maximize2,
  Play,
  Pause,
  RefreshCw,
  Zap,
  Thermometer,
  Droplets,
  HelpCircle,
  Award,
  Box,
  Scan,
  Workflow,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react';

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
  const [heroMode, setHeroMode] = useState('split'); // 'split' | 'wireframe' | 'stone'
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  
  // State for Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // State for Interactive Sandbox Showcase
  const [showcaseTab, setShowcaseTab] = useState('twin'); // 'twin' | 'vision' | 'temporal' | 'gis'
  const [sliderPosition, setSliderPosition] = useState(50);
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

  // Computed simulation values
  const simulatedHealth = Math.max(18, Math.round(100 - (simMonsoon * 0.45 + (simSeismic - 0.8) * 40)));
  const simulatedUrgency = simulatedHealth < 45 ? 'CRITICAL' : simulatedHealth < 70 ? 'WATCH' : 'STABLE';

  // 8 Process Steps for "The decision layer, module by module"
  const workflowSteps = [
    { 
      step: '01', 
      kicker: '01 · 3D Digital Twin',
      title: 'Interactive 3D Model of the Site', 
      desc: 'Instead of just looking at flat photos, explore a live 3D model of the heritage site. You can rotate, zoom in, and click directly on individual domes, walls, pillars, or foundations to check their condition.'
    },
    { 
      step: '02', 
      kicker: '02 · AI Defect Scanner',
      title: 'Smart Image Damage Detection', 
      desc: 'Upload an inspection photo and AI instantly scans for cracks, moisture patches, peeling stone, and erosion. It highlights subtle hairline defects that might otherwise be missed.'
    },
    { 
      step: '03', 
      kicker: '03 · Change Over Time',
      title: 'Tracking Damage Growth', 
      desc: 'Compare photos from previous years against today. The system clearly measures whether a crack has expanded or if dampness has spread after heavy monsoon rains.'
    },
    { 
      step: '04', 
      kicker: '04 · Health Score (0–100)',
      title: 'Simple, Transparent Health Rating', 
      desc: 'Every structural part gets a clear score from 0 to 100 with simple color codes: Green is safe, Yellow needs monitoring, and Red requires urgent repair.'
    },
    { 
      step: '05', 
      kicker: '05 · Disaster Risk Layer',
      title: 'Weather & Earthquake Exposure', 
      desc: 'We combine heritage site health with real-time weather, flood zones, and earthquake fault lines so authorities can protect vulnerable sites before disasters hit.'
    },
    { 
      step: '06', 
      kicker: '06 · Future Decay Prediction',
      title: 'Forecasting Decay Till 2030', 
      desc: 'See how cracks will grow over the next 4 to 6 years if left untreated. Fixing a minor crack today for ₹3 Lakhs prevents ₹70+ Lakhs in catastrophic rebuild costs later.'
    },
    { 
      step: '07', 
      kicker: '07 · Clear Repair Plan',
      title: 'Prioritised Repair Recommendations', 
      desc: 'Instead of guessing what to fix next, authorities get an ordered list of urgent repairs with clear timeframes and cost estimates.'
    },
    { 
      step: '08', 
      kicker: '08 · Official ASI Reports',
      title: 'One-Click Compliance Reporting', 
      desc: 'Generate complete, audit-ready PDF conservation reports for the Archaeological Survey of India (ASI) and Ministry of Culture at the push of a button.'
    }
  ];


  const processFlowItems = [
    { label: 'Observe', desc: 'Field Imagery & Drone Scans' },
    { label: 'Digitise', desc: '3D Point Cloud & BIM Mesh' },
    { label: 'Assess', desc: 'OpenCV Multi-Defect Extraction' },
    { label: 'Track', desc: 'Multi-Epoch Change Delta' },
    { label: 'Predict', desc: '2030 Non-Linear Physics Decay' },
    { label: 'Prioritise', desc: 'ISO 31000 Explainable Ranking' },
    { label: 'Act', desc: 'Official ASI Work-Order' }
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
    <div className="min-h-screen bg-[#07080B] text-[#EDE8DE] font-sans selection:bg-[#E06D44] selection:text-[#07080B] overflow-x-hidden relative museum-bg">
      
      {/* 🎬 Split-Reveal of Monument Images & Rising Heritage Shield Intro */}
      <AnimatePresence>
        {showIntro && <CinematicIntroReveal onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Background Ambient Spotlight & Warm Dust Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 museum-spotlight opacity-70" />
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(224, 109, 68, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 🌟 1. TOP MINIMALIST MUSEUM NAVIGATION BAR (Matching Reference Aesthetic) */}
      <motion.nav 
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-[9999] bg-[#07080B]/85 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-4 shadow-2xl"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          
          {/* Left: Brand Logo & Emblem */}
          <div className="flex items-center gap-4">
            <HeritageShieldLogo
              size="md"
              showText={true}
              textClassName="text-lg tracking-wider font-serif font-bold text-[#FDFBF7]"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Center: Minimalist Museum Nav Links with Terracotta/Coral Active Highlight */}
          <div className="hidden lg:flex items-center gap-9 text-xs font-mono tracking-widest uppercase">
            <a 
              href="#hero-banner" 
              className="text-[#E06D44] font-bold border-b-2 border-[#E06D44] pb-1 transition"
            >
              Overview
            </a>
            <a 
              href="#decision-modules" 
              className="text-gray-300 hover:text-[#E06D44] transition"
            >
              Architecture
            </a>
            <a 
              href="#sandbox-showcase" 
              className="text-gray-300 hover:text-[#E06D44] transition"
            >
              Living Twins
            </a>
            <a 
              href="#climate-simulator" 
              className="text-gray-300 hover:text-[#E06D44] transition"
            >
              2030 Predictor
            </a>
            <a 
              href="#monument-registry" 
              className="text-gray-300 hover:text-[#E06D44] transition"
            >
              Heritage Sites
            </a>
            <a 
              href="#faq" 
              className="text-gray-300 hover:text-[#E06D44] transition"
            >
              Archive FAQ
            </a>
          </div>

          {/* Right: Actions & Login */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowIntro(true)}
              className="px-3 py-1.5 rounded-xl frosted-btn text-[11px] font-mono font-bold text-[#E5C07B] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
              title="Replay Cinematic Split Reveal"
            >
              <span>🎬</span>
              <span className="hidden sm:inline">Replay Intro</span>
            </button>

            <ThemeToggle />

            {currentUser ? (
              <div className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 px-3.5 py-1.5 rounded-xl shadow backdrop-blur-md">
                <span className="text-xs font-mono font-bold text-[#FDFBF7] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#E06D44]" />
                  <span>{currentUser.role === 'officer' ? '🏛️ ' : '👥 '}{currentUser.name}</span>
                </span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-[10px] font-mono text-gray-400 hover:text-rose-400 p-1 rounded transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-2 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer"
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
      {/* 🚀 2. CINEMATIC MUSEUM HERO BANNER (MATCHING REFERENCE COMPOSITION)        */}
      {/* ========================================================================= */}
      <section id="hero-banner" className="relative pt-6 pb-16 px-4 sm:px-6 max-w-[1600px] mx-auto">
        
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0A0C12] shadow-2xl min-h-[620px] flex items-center p-6 sm:p-10 lg:p-14">
          
          {/* Deep Cinematic Architectural Background Image with Vignette */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img
              src="/monuments/khajuraho.jpg"
              alt="Indian Built Heritage Masterpiece"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 saturate-[0.85]"
            />
            {/* Center Warm Terracotta Spotlight Refraction */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/95 via-[#07080B]/75 to-[#07080B]/90 z-10" />
            <div className="absolute inset-0 museum-spotlight z-10 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/60 z-10" />
          </div>

          {/* Two-Column Grid: Left Floating Showcase Card (Matching Ref) + Right Majestic Headline */}
          <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* 📱 LEFT COLUMN: Floating Showcase Card (Directly Styled from Reference Artifact Card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start" style={{ perspective: 1000 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
                className="w-full max-w-sm rounded-[2.25rem] border border-white/15 bg-[#0C0E16]/80 backdrop-blur-2xl shadow-2xl p-4 sm:p-5 space-y-4 relative group cursor-pointer"
                style={{
                  boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Showcase Top Bar */}
                <div className="flex justify-between items-center text-xs font-mono px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E06D44] animate-pulse" />
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                      Artefact Twin #{selectedTwinSiteIdx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx - 1 + sites.length) % sites.length)}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#E06D44] border border-white/15 text-white flex items-center justify-center transition cursor-pointer text-xs"
                      title="Previous Monument"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setSelectedTwinSiteIdx((selectedTwinSiteIdx + 1) % sites.length)}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#E06D44] border border-white/15 text-white flex items-center justify-center transition cursor-pointer text-xs"
                      title="Next Monument"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* Monument Showcase Image Display */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner">
                  <img
                    src={sites[selectedTwinSiteIdx]?.imageUrl || '/monuments/qutub_minar.jpg'}
                    alt={sites[selectedTwinSiteIdx]?.name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E16] via-transparent to-black/30" />
                  
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
                    <span className="text-[10px] font-mono text-[#E5C07B] font-semibold block">
                      📍 {sites[selectedTwinSiteIdx]?.location}, {sites[selectedTwinSiteIdx]?.state}
                    </span>
                    <h4 className="text-lg font-serif font-bold text-white leading-tight">
                      {sites[selectedTwinSiteIdx]?.name}
                    </h4>
                  </div>
                </div>

                {/* Card Bottom Meta & Interactive CTA */}
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-2">
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

            {/* 🏛️ RIGHT COLUMN: Majestic Editorial Headline & Cultural Pitch (Matching Ref) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* National Authority Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-[#E06D44] animate-pulse" />
                <span className="text-[11px] font-mono text-[#F5E6CC] uppercase tracking-widest font-bold">
                  National Built Heritage Command Center · SIH 2026
                </span>
              </motion.div>

              {/* Main Display Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]"
              >
                Custodian of Heritage & <span className="gold-cream-text">Living Digital Twins</span>
              </motion.h1>

              {/* Authoritative Cultural Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-xl"
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
                  className="px-7 py-3.5 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 cursor-pointer shadow-xl"
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
        
        {/* Section Header with Push-Down Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[#E06D44] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span>⚙️ Autonomous Conservation Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FDFBF7] tracking-tight">
            The decision layer, <span className="gold-cream-text">module by module</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
            Eight synchronized AI & engineering subsystems executing autonomous diagnostics, structural physics calculations, and authoritative decision dispatch.
          </p>
        </motion.div>

        {/* 8-Module Interactive Grid with Staggered Scroll Motion & Hover Lift */}
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
                    ? 'bg-[#121522]/95 border-[#E06D44] shadow-2xl shadow-[#E06D44]/20 ring-1 ring-[#E06D44]/50'
                    : 'frosted-glass-card hover:border-[#E06D44]/50 hover:shadow-2xl'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px] ${
                      isSelected ? 'bg-[#E06D44] text-[#07080B]' : 'bg-white/10 text-[#E06D44]'
                    }`}>
                      Step {mod.step}
                    </span>
                    <span className="text-gray-400 font-semibold">{mod.kicker.split('·')[1]}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#FDFBF7] group-hover:text-white leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
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
      <section id="sandbox-showcase" className="py-20 px-6 bg-[#090B10]/80 border-y border-white/[0.08] relative">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-between items-end gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[#E06D44] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                <span>💻 Autonomous Sandbox</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FDFBF7]">
                Experience the 4 Core Intelligence Consoles
              </h2>
            </div>

            {/* Showcase Tabs */}
            <div className="bg-[#0C0E16]/90 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1.5 font-mono text-xs overflow-x-auto shadow-xl backdrop-blur-md">
              <button
                onClick={() => setShowcaseTab('twin')}
                className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer font-bold ${
                  showcaseTab === 'twin'
                    ? 'terracotta-btn shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
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
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
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
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
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
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🗺️</span>
                <span>GIS Radar</span>
              </button>
            </div>
          </motion.div>

          {/* Sandbox Showcase Display Container */}
          <div className="bg-[#0A0C14]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
            
            {showcaseTab === 'twin' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">
                    3D Living Digital Twin
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    A realistic 3D model of the heritage site. You can rotate 360°, zoom in, and click directly on individual domes, balconies, pillars, or base walls to inspect their condition history.
                  </p>
                  
                  {/* Select 3D Twin Custom Dropdown */}
                  <div className="pt-2 space-y-1.5">
                    <label className="text-xs font-mono text-[#C5A059] block font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span>🏛️</span>
                      <span>Select Heritage Site:</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTwinSiteIdx}
                        onChange={(e) => setSelectedTwinSiteIdx(Number(e.target.value))}
                        className="w-full appearance-none bg-gradient-to-r from-[#12151B] to-[#181C24] border border-[#2B313D] hover:border-[#C5A059] text-gray-100 text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] cursor-pointer shadow-lg transition duration-200"
                      >
                        {sites.map((s, idx) => (
                          <option key={s.id || idx} value={idx} className="bg-[#0B0D11] text-gray-200 py-2">
                            {s.name} ({s.state})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#C5A059]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectMonument ? onSelectMonument(selectedTwinSiteIdx) : onEnterDashboard()}
                      className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-black font-mono text-xs font-bold hover:bg-[#D8B46E] transition cursor-pointer shadow-lg"
                    >
                      Open 3D Studio →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[530px] min-h-[530px] relative rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-[#060709]">
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
                    <h3 className="text-2xl font-serif font-bold text-white">
                      AI Defect Vision Scanner
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans">
                      Smart computer vision scans inspection photos to detect cracks, peeling stone, and water dampness. It measures the exact length and width of cracks to catch damage early.
                    </p>
                    
                    {/* Select Heritage Site Dropdown */}
                    <div className="pt-2 space-y-1.5">
                      <label className="text-xs font-mono text-cyan-400 block font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span>🏛️</span>
                        <span>Select Heritage Site:</span>
                      </label>
                      <div className="relative">
                        <select
                          value={selectedVisionSiteIdx}
                          onChange={(e) => setSelectedVisionSiteIdx(Number(e.target.value))}
                          className="w-full appearance-none bg-gradient-to-r from-[#12151B] to-[#181C24] border border-[#2B313D] hover:border-cyan-400 text-gray-100 text-sm font-serif font-bold py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 cursor-pointer shadow-lg transition duration-200"
                        >
                          {sites.map((s, idx) => (
                            <option key={s.id || idx} value={idx} className="bg-[#0B0D11] text-gray-200 py-2">
                              {s.name} ({s.state})
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-cyan-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onSelectMonument ? onSelectMonument(selectedVisionSiteIdx, 'vision') : onEnterDashboard()}
                        className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-mono text-xs font-bold hover:bg-cyan-500 transition cursor-pointer shadow-lg"
                      >
                        Open AI Diagnostics Lab →
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 h-[530px] min-h-[530px] relative rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-[#060709] flex flex-col justify-between">
                    {/* Header Strip */}
                    <div className="bg-[#0E1013] border-b border-[#1E2228] px-4 py-2.5 flex items-center justify-between z-10 shrink-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-serif font-bold text-[#F3EFE6]">
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
                        <span className="absolute -top-6 left-0 bg-rose-500 text-black text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded font-bold whitespace-nowrap shadow-lg">
                          {curDefect.id} · {curDefect.type} · {curDefect.conf} AI Confidence
                        </span>
                        
                        {/* Target Crosshair Corners */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                      </div>
                    </div>

                    {/* Footer Strip with Telemetry */}
                    <div className="bg-[#0E1013] border-t border-[#1E2228] px-4 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-gray-400 z-10 shrink-0">
                      <span className="text-gray-300 font-semibold">{curDefect.metrics}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {showcaseTab === 'temporal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">
                    2030 Structural Decay Predictor
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    Forecasting how damage will worsen over the next 4 to 6 years if left untreated. It proves that fixing minor cracks early for ₹3 Lakhs avoids ₹70+ Lakhs in emergency rebuilds later.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold hover:bg-purple-500 transition cursor-pointer"
                    >
                      Run 2030 Predictive Lab →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#090A0C] p-6 rounded-xl border border-[#2B313D] space-y-3 font-mono text-xs h-[480px] flex flex-col justify-center">
                  <div className="flex justify-between items-center text-gray-400 border-b border-[#1E2228] pb-3 text-sm">
                    <span>Forecast Year</span>
                    <span>Predicted Health Score</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 py-2 border-b border-[#14171E]">
                    <span>2020 Baseline Survey</span>
                    <span className="text-emerald-400 font-bold">91 / 100 (Safe)</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 py-2 border-b border-[#14171E]">
                    <span>2024 Interim Survey</span>
                    <span className="text-emerald-300 font-bold">82 / 100 (Stable)</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 py-2 border-b border-[#14171E]">
                    <span>2026 Today (Current Scan)</span>
                    <span className="text-amber-400 font-bold">62 / 100 (Needs Attention)</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-400 font-bold py-2 border-b border-[#14171E]">
                    <span>2028 Projected (Untreated)</span>
                    <span>32 / 100 (Critical)</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-500 font-bold py-2">
                    <span>2030 Projected (Failure Risk)</span>
                    <span>14 / 100 (Immediate Action Required)</span>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === 'gis' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">
                    National GIS Radar & Hazard Map
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    View all 12 Centrally Protected Heritage Sites across India on an interactive map. Overlay live monsoon rainfall alerts and earthquake hazard zones to protect endangered sites in advance.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onEnterDashboard}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-emerald-500 transition cursor-pointer"
                    >
                      Open National GIS Map →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 h-[480px] min-h-[480px] relative rounded-xl overflow-hidden border border-[#2B313D] shadow-2xl bg-[#060709]">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[#E06D44] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span>🧪 Real-Time Physics Test</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FDFBF7]">
            Extreme Climate & Seismic Stress Simulator
          </h2>
          <p className="text-sm text-gray-300 font-sans">
            Adjust environmental parameters to see how climatic anomalies affect heritage site degradation in real-time.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0C0E16]/80 border border-white/10 p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center backdrop-blur-xl shadow-2xl"
        >
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-300">
                <span>🌧️ Monsoon Cloudburst Anomaly:</span>
                <strong className="text-sky-400 font-bold">+{simMonsoon}% Excess Precipitation</strong>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={simMonsoon}
                onChange={(e) => setSimMonsoon(Number(e.target.value))}
                className="w-full accent-[#E06D44] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-gray-300">
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
                className="w-full accent-[#E06D44] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#121522]/90 border border-white/10 p-7 rounded-2xl text-center space-y-3 shadow-xl">
            <span className="text-[10px] font-mono uppercase text-[#E06D44] tracking-widest font-bold">Simulated Health Score</span>
            <div className="text-5xl font-serif font-bold">
              <span style={{ color: simulatedHealth < 45 ? '#F43F5E' : simulatedHealth < 70 ? '#F59E0B' : '#10B981' }}>
                {simulatedHealth}
              </span>
              <span className="text-xs text-gray-400 font-mono font-normal"> / 100</span>
            </div>
            <div
              className="text-xs font-mono px-3.5 py-1.5 rounded-full font-bold uppercase inline-block border"
              style={{
                backgroundColor: simulatedHealth < 45 ? '#F43F5E20' : simulatedHealth < 70 ? '#F59E0B20' : '#10B98120',
                color: simulatedHealth < 45 ? '#F43F5E' : simulatedHealth < 70 ? '#F59E0B' : '#10B981',
                borderColor: simulatedHealth < 45 ? '#F43F5E50' : simulatedHealth < 70 ? '#F59E0B50' : '#10B98150'
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
              className="w-full mt-4 py-3 rounded-xl terracotta-btn font-mono text-xs font-bold tracking-wider uppercase cursor-pointer shadow-lg"
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
            <span className="text-xs font-mono text-[#E06D44] uppercase tracking-widest font-bold">
              National Heritage Registry
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FDFBF7] mt-1">
              Protected UNESCO Heritage Sites
            </h2>
          </div>

          <button
            onClick={onEnterDashboard}
            className="px-5 py-2.5 rounded-xl frosted-btn text-xs font-mono tracking-wider uppercase transition flex items-center gap-2 cursor-pointer font-bold"
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
              className="frosted-glass-card rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                  src={s.imageUrl || '/monuments/qutub_minar.jpg'}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                />
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
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-[#E5C07B] uppercase font-semibold">{s.state} · {s.period}</span>
                  <h3 className="text-lg font-serif font-bold text-[#FDFBF7] group-hover:text-[#E06D44] transition mt-0.5">
                    {s.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center text-xs font-mono pt-3 border-t border-white/10">
                  <span className="text-gray-400">Hazard: <strong className="text-amber-400">{s.seismicZone}</strong></span>
                  <span className="text-[#E06D44] font-bold flex items-center gap-1">
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
          <span className="text-xs font-mono text-[#E06D44] uppercase tracking-widest font-bold">
            Frequently Answered Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#FDFBF7]">
            Heritage Shield Technical Architecture
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="frosted-glass-card rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-[#FDFBF7] hover:text-[#E06D44] cursor-pointer transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E06D44] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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
      {/* 🛡️ 9. INSTITUTIONAL FOOTER                                                */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/10 bg-[#050609] py-12 px-6">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-gray-400">
          
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-600">|</span>
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
