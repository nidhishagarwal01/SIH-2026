import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeritageShieldLogo from './HeritageShieldLogo';
import ThemeToggle from './ThemeToggle';
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
  Award
} from 'lucide-react';

export default function LandingPageView({ onEnterDashboard, onSelectMonument, sites = [] }) {
  // State for Interactive Hero Console
  const [heroTab, setHeroTab] = useState('twin'); // 'twin' | 'vision' | 'temporal' | 'gis'
  const [activeStep, setActiveStep] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [simRainfall, setSimRainfall] = useState(60);
  const [simSeismic, setSimSeismic] = useState(30);
  const [activeFaq, setActiveFaq] = useState(null);

  // Computed simulation values
  const simulatedHealth = Math.max(20, Math.round(100 - (simRainfall * 0.35 + simSeismic * 0.45)));
  const simulatedUrgency = simulatedHealth < 45 ? 'CRITICAL' : simulatedHealth < 70 ? 'WATCH' : 'STABLE';

  const coreLoopSteps = [
    { 
      step: '01', 
      kicker: '01 · Heritage Digital Twin',
      title: 'A living model of the site, mapped down to the component.', 
      desc: 'Each hotspot is a structural or architectural component with its own condition history, spatial location and inspection trail — not just a photo of a monument.',
      input: 'Photogrammetry LiDAR + Spatial BIM Models',
      output: 'Component-Indexed Interactive 3D Mesh',
      action: 'Select and isolate stone blocks, arches, or spires'
    },
    { 
      step: '02', 
      kicker: '02 · AI Visual Condition Assessment',
      title: 'Upload a photo. AI flags what needs a closer look.', 
      desc: 'Computer vision identifies cracks, surface loss, discoloration, vegetation intrusion and dampness — every flag is a suggestion for review, never an automatic verdict.',
      input: 'High-Res Drone & Inspection Imagery',
      output: 'OpenCV Defect Aperture & Bounding Vectors',
      action: 'Flags 0.42mm micro-fractures with 94.8% confidence'
    },
    { 
      step: '03', 
      kicker: '03 · Temporal Change Detection',
      title: 'The same wall, two inspection cycles apart.', 
      desc: 'Compare 2024 against 2026. The system aligns repeated observations to the same component so change is measured, not guessed.',
      input: 'Historical 2024 Baseline vs 2026 Cycle',
      output: 'Component Delta Heatmap & Vector Expansion',
      action: 'Calculates +38% crack elongation rate'
    },
    { 
      step: '04', 
      kicker: '04 · Heritage Health Index',
      title: 'A transparent score, not a black box.', 
      desc: 'Every score comes with the factors that produced it, weighted by contribution — so authorities know why a number changed, not just that it did.',
      input: 'Structural + Moisture + Material Weights',
      output: 'Formula-Driven Health Index (0–100)',
      action: 'Score = 61/100 (Decay trajectory quantified)'
    },
    { 
      step: '05', 
      kicker: '05 · Risk & Disaster Layer',
      title: 'Not just "is it damaged" — could a hazard accelerate it?', 
      desc: 'Flood exposure, rainfall extremes, seismic vulnerability and other hazard layers sit alongside condition data, connecting conservation to disaster management.',
      input: 'ISRO Bhuvan + IMD Radar + BIS IS 1893:2016',
      output: 'Multi-Hazard Risk Vulnerability Matrix',
      action: 'Cross-references Zone V seismic fault line proximity'
    },
    { 
      step: '06', 
      kicker: '06 · Deterioration Prediction',
      title: 'Where is this component headed?', 
      desc: 'Historical condition combined with environmental and hazard variables produces a trajectory — shown with confidence, not false precision.',
      input: 'Non-linear decay regression models (2024–2030)',
      output: 'Predictive 48-Month Degradation Trajectory',
      action: 'Forecasts critical breach window by 2027–2030'

    },
    { 
      step: '07', 
      kicker: '07 · Intervention Priority Engine',
      title: 'Which component should receive attention first?', 
      desc: 'Ranked by condition × deterioration rate × hazard exposure × heritage significance — across every monitored asset, not one at a time.',
      input: 'Multi-Criteria Decision Analysis (ISO 31000)',
      output: 'Ranked National Intervention Queue',
      action: 'Ranks North Façade as Priority #1 nationwide'
    },
    { 
      step: '08', 
      kicker: '08 · Conservation Recommendation',
      title: 'Evidence in, a recommendation out — the decision stays human.', 
      desc: 'Problem detected → Probable factors → Recommended action → Final call with official ASI work-order generation.',
      input: 'Synthesized Diagnostics & Heritage Norms',
      output: 'Formal ASI Work-Order & Grout Formula',
      action: 'Conservation architect one-click sign-off'
    },
  ];

  const faqs = [
    {
      q: 'How does Heritage Shield achieve sub-millimeter defect accuracy?',
      a: 'Using high-resolution photogrammetric alignment and OpenCV edge-gradient kernels, the platform computes crack aperture width by calibrating pixel density against known architectural dimensional baselines.'
    },
    {
      q: 'Does the platform automate conservation decisions without human review?',
      a: 'No. In strict compliance with ASI and UNESCO Venice Charter conservation ethics, Heritage Shield synthesizes data into actionable recommendations while leaving final intervention approval exclusively to certified conservation architects.'
    },
    {
      q: 'How are GIS and disaster hazards integrated?',
      a: 'The system queries ISRO Bhuvan geospatial servers, BIS IS 1893 seismic zone data, and IMD precipitation telemetry to compute localized hazard multipliers that dynamically adjust monument risk scores.'
    },
    {
      q: 'Can Heritage Shield operate in offline or low-connectivity environments?',
      a: 'Yes. Heritage Shield supports edge-cached models with local IndexedDB storage, enabling field officers to capture and log inspection photos on-site, which synchronize with the central command center once connectivity is restored.'
    }
  ];

  const flagshipSites = sites.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#07080A] text-[#EDE8DE] font-sans selection:bg-[#C5A059] selection:text-[#07080A] overflow-x-hidden relative">
      
      {/* Background Ambient Dot Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(197, 160, 89, 0.12) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* 🌟 1. TOP GLASSMORPHIC NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-[#0A0C10]/85 backdrop-blur-xl border-b border-[#1A1E26] px-6 py-3.5 shadow-2xl"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Clickable Home Brand */}
          <HeritageShieldLogo
            size="md"
            showText={true}
            textClassName="text-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />


          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-gray-300">
            <a href="#interactive-demo" className="hover:text-[#C5A059] transition">Live Console</a>
            <a href="#workflow" className="hover:text-[#C5A059] transition">8-Step Decision Architecture</a>
            <a href="#bento" className="hover:text-[#C5A059] transition">Intelligence Modules</a>
            <a href="#simulator" className="hover:text-[#C5A059] transition">Decay Simulator</a>
            <a href="#monuments" className="hover:text-[#C5A059] transition">Monuments</a>
            <a href="#faq" className="hover:text-[#C5A059] transition">FAQ</a>
          </div>

          {/* Primary Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnterDashboard}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#07080A] font-mono text-xs font-bold tracking-wide shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition flex items-center gap-2 group cursor-pointer"
            >
              <span>Authority Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>


        </div>
      </motion.nav>

      {/* 🚀 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#C5A059]/18 via-[#38BDF8]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-sky-600/10 blur-[110px] pointer-events-none rounded-full" />

        <div className="max-w-[1400px] mx-auto text-center space-y-8 relative z-10">
          
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161A22] border border-[#2B313D] shadow-inner text-xs font-mono text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              <span>Smart Built Heritage Intelligence & Predictive Twin System</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.08]">
              From fragmented heritage evidence to a{' '}
              <span className="italic font-normal bg-gradient-to-r from-[#F3EFE6] via-[#C5A059] to-[#38BDF8] bg-clip-text text-transparent">
                living, predictive
              </span>{' '}
              conservation decision system.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-sans leading-relaxed">
              Heritage Shield turns scattered inspection photos, records, GIS data and hazard maps into a continuously updated digital twin — one that tracks deterioration over time and tells authorities which component needs attention first.
            </p>
          </motion.div>

          {/* Hero CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={onEnterDashboard}
              className="px-8 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B46E] text-[#07080A] font-mono text-sm font-bold tracking-wide shadow-2xl shadow-amber-950/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Explore the Digital Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onEnterDashboard}
              className="px-6 py-3.5 rounded-xl bg-[#11141A] hover:bg-[#181C24] border border-[#232A36] text-gray-200 font-mono text-sm font-medium transition flex items-center gap-2 cursor-pointer"
            >
              <span>Jump to Authority Dashboard</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </motion.div>

          {/* 📊 Stat Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4 text-left"
          >
            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1 hover:border-[#C5A059]/40 transition">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C5A059]">3,696</div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Protected Assets</span>
              <p className="text-[11px] text-gray-400 font-sans">Centrally Protected Monuments (CPMs)</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1 hover:border-[#C5A059]/40 transition">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">61 / 100</div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Avg. Health Index</span>
              <p className="text-[11px] text-gray-400 font-sans">Transparent Factor-Driven Score</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1 hover:border-sky-500/40 transition">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-400">Sub-mm</div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block font-bold">AI Computer Vision</span>
              <p className="text-[11px] text-gray-400 font-sans">Crack Aperture & Growth Velocity</p>
            </div>

            <div className="bg-[#0E1117]/80 backdrop-blur-md border border-[#1A1F29] p-5 rounded-2xl shadow-xl space-y-1 hover:border-emerald-500/40 transition">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">2026</div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">Active Inspection</span>
              <p className="text-[11px] text-gray-400 font-sans">Closed-Loop Predictive Trajectory</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 🎛️ 3. INTERACTIVE LIVE HERO CONSOLE (LOVABLE-STYLE SHOWCASE) */}
      <section id="interactive-demo" className="py-12 px-6 max-w-[1400px] mx-auto relative z-10">
        <div className="bg-[#0C0E12] border border-[#1E232E] rounded-3xl overflow-hidden shadow-2xl p-2 md:p-6 space-y-6">
          
          {/* Header & Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1F29] pb-4 px-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Interactive Live Console Preview
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Explore the System in Action
              </h2>
            </div>

            {/* Console Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-[#14171E] p-1.5 rounded-2xl border border-[#232A38]">
              <button
                onClick={() => setHeroTab('twin')}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition flex items-center gap-1.5 ${
                  heroTab === 'twin'
                    ? 'bg-[#C5A059] text-[#07080A] font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🏛️</span>
                <span>3D Living Twin</span>
              </button>

              <button
                onClick={() => setHeroTab('vision')}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition flex items-center gap-1.5 ${
                  heroTab === 'vision'
                    ? 'bg-[#C5A059] text-[#07080A] font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🔍</span>
                <span>AI Defect Vision</span>
              </button>

              <button
                onClick={() => setHeroTab('temporal')}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition flex items-center gap-1.5 ${
                  heroTab === 'temporal'
                    ? 'bg-[#C5A059] text-[#07080A] font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>⏳</span>
                <span>Temporal Slider</span>
              </button>

              <button
                onClick={() => setHeroTab('gis')}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition flex items-center gap-1.5 ${
                  heroTab === 'gis'
                    ? 'bg-[#C5A059] text-[#07080A] font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>🗺️</span>
                <span>GIS Radar</span>
              </button>
            </div>
          </div>

          {/* Interactive Tab Body */}
          <div className="relative min-h-[420px] rounded-2xl overflow-hidden bg-[#07080A] border border-[#161920]">
            
            {/* Tab 1: 3D Twin Preview */}
            {heroTab === 'twin' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 items-center">
                <div className="lg:col-span-2 relative h-[360px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#12151C] to-[#090A0E] border border-[#1E232E] flex items-center justify-center">
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">
                      ● 60 FPS SYNCHRONIZED
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1F29] text-gray-300">
                      Konark Sun Temple · Vimana Tower
                    </span>
                  </div>

                  {/* 3D Visual Rendering Representation */}
                  <div className="text-center space-y-3 relative z-10">
                    <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-[#C5A059]/30 via-sky-500/20 to-purple-500/20 border border-[#C5A059]/40 flex items-center justify-center shadow-2xl animate-pulse">
                      <span className="text-5xl">🏛️</span>
                    </div>
                    <div className="font-serif font-bold text-lg text-white">Interactive 3D Architectural Mesh</div>
                    <p className="text-xs text-gray-400 font-mono max-w-sm mx-auto">
                      Click any component node in the Command Studio to inspect stress vectors, historic mortar composition, and defect severity.
                    </p>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <button 
                      onClick={onEnterDashboard}
                      className="px-3 py-1.5 rounded-lg bg-[#C5A059] text-[#07080A] text-xs font-mono font-bold hover:bg-[#D8B46E] transition"
                    >
                      Open Full 3D Twin Studio →
                    </button>
                  </div>
                </div>

                <div className="space-y-4 bg-[#0E1117] p-5 rounded-2xl border border-[#1A1F29]">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">
                    Spatial Component Telemetry
                  </span>
                  <div className="space-y-2.5 font-mono text-xs text-gray-300">
                    <div className="flex justify-between pb-1.5 border-b border-[#1A1F29]">
                      <span className="text-gray-400">Target Node:</span>
                      <strong className="text-white">North Vimana Spire</strong>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-[#1A1F29]">
                      <span className="text-gray-400">Material Typology:</span>
                      <strong className="text-[#C5A059]">Khondalite Sandstone</strong>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-[#1A1F29]">
                      <span className="text-gray-400">Health Index:</span>
                      <strong className="text-amber-400">54 / 100 (Watch List)</strong>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-[#1A1F29]">
                      <span className="text-gray-400">OpenCV Defect Count:</span>
                      <strong className="text-rose-400">3 Structural Cracks</strong>
                    </div>
                  </div>
                  <button
                    onClick={onEnterDashboard}
                    className="w-full py-2 rounded-xl bg-[#181C24] hover:bg-[#C5A059] hover:text-[#07080A] text-gray-200 text-xs font-mono font-bold transition border border-[#2B313D]"
                  >
                    Inspect in Studio →
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: AI Vision Defect Lab */}
            {heroTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 items-center">
                <div className="lg:col-span-2 relative h-[360px] rounded-2xl overflow-hidden bg-[#0A0C10] border border-[#1E232E] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Bounding Box Visual Simulation */}
                  <div className="relative border-2 border-rose-500/80 bg-rose-950/20 p-6 rounded-xl text-center space-y-2 shadow-2xl backdrop-blur-sm">
                    <div className="absolute -top-3 left-3 bg-rose-600 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                      DEFECT_ID: CRK-2026-N04 · 94.8% CONFIDENCE
                    </div>
                    <span className="text-3xl">🔍</span>
                    <h4 className="text-sm font-serif font-bold text-white">Sub-Millimeter Longitudinal Crack</h4>
                    <div className="font-mono text-xs text-rose-300 space-x-3">
                      <span>Length: <strong>1.42 m</strong></span>
                      <span>Aperture: <strong>0.42 mm</strong></span>
                      <span>Velocity: <strong>+0.12 mm/yr</strong></span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span>Model: YOLOv8-Heritage + OpenCV Sobel Gradient Kernel</span>
                    <button 
                      onClick={onEnterDashboard}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-500 transition"
                    >
                      Open AI Defect Lab →
                    </button>
                  </div>
                </div>

                <div className="space-y-4 bg-[#0E1117] p-5 rounded-2xl border border-[#1A1F29]">
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block font-bold">
                    AI Visual Assessment Rules
                  </span>
                  <div className="space-y-3 text-xs font-sans text-gray-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Sub-mm Resolution:</strong> Pixel-calibrated edge kernels detect fractures down to 0.1mm width.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Human-in-the-Loop:</strong> AI flags suspect anomalies; certified ASI officers sign off.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Thermal Moisture Layer:</strong> Infers surface dampness from RGB spectral absorption.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Temporal Before / After Slider */}
            {heroTab === 'temporal' && (
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#C5A059] font-bold">👈 2024 Baseline Cycle</span>
                  <span className="text-gray-400">Drag slider below to compare temporal change</span>
                  <span className="text-rose-400 font-bold">2026 Inspection Cycle 👉</span>
                </div>

                <div className="relative h-[280px] rounded-2xl overflow-hidden bg-[#0E1117] border border-[#1E232E] flex items-center justify-center select-none">
                  {/* Left Side (2024 Baseline) */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-emerald-950/20 border-r-2 border-[#C5A059] overflow-hidden flex items-center justify-center transition-all"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div className="text-center space-y-1.5 p-4">
                      <span className="text-3xl">🏛️</span>
                      <div className="text-emerald-400 font-mono text-xs font-bold">2024 Baseline State</div>
                      <p className="text-[11px] text-gray-400 font-mono">Health: 78/100 · Stable Mortar · Micro-fissures &lt;0.1mm</p>
                    </div>
                  </div>

                  {/* Right Side (2026 Inspection) */}
                  <div className="text-center space-y-1.5 p-4">
                    <span className="text-3xl">⚠️</span>
                    <div className="text-rose-400 font-mono text-xs font-bold">2026 Current Inspection</div>
                    <p className="text-[11px] text-gray-400 font-mono">Health: 54/100 · +38% Crack Length · Moisture Ingress +22%</p>
                  </div>
                </div>

                {/* Slider Control */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-mono text-gray-400">Split View:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="w-full h-2 bg-[#1A1F29] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                  />
                  <span className="text-xs font-mono text-[#C5A059] font-bold w-12 text-right">{sliderPosition}%</span>
                </div>
              </div>
            )}

            {/* Tab 4: National GIS Radar */}
            {heroTab === 'gis' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 items-center">
                <div className="lg:col-span-2 relative h-[360px] rounded-2xl overflow-hidden bg-[#0A0C10] border border-[#1E232E] flex items-center justify-center">
                  <div className="text-center space-y-2 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mx-auto text-2xl animate-spin">
                      🧭
                    </div>
                    <h4 className="text-base font-serif font-bold text-white">Geospatial Hazard & Telemetry Mesh</h4>
                    <p className="text-xs text-gray-400 font-mono max-w-sm mx-auto">
                      Real-time integration of BIS IS 1893 seismic fault corridors and IMD precipitation telemetry.
                    </p>
                    <button
                      onClick={onEnterDashboard}
                      className="mt-2 px-4 py-2 rounded-xl bg-[#C5A059] text-[#07080A] text-xs font-mono font-bold hover:bg-[#D8B46E] transition"
                    >
                      Launch Fullscreen GIS Command Radar →
                    </button>
                  </div>
                </div>

                <div className="space-y-3 bg-[#0E1117] p-5 rounded-2xl border border-[#1A1F29] text-xs font-mono">
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-wider block font-bold">
                    Live Sentinel Feeds
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#14171E] border border-[#222730] flex justify-between">
                    <span className="text-gray-400">BIS Seismic Fault:</span>
                    <strong className="text-rose-400">Zone IV / V Active</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14171E] border border-[#222730] flex justify-between">
                    <span className="text-gray-400">IMD Rainfall Index:</span>
                    <strong className="text-sky-400">+18% Anomaly</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#14171E] border border-[#222730] flex justify-between">
                    <span className="text-gray-400">Air Quality (AQI):</span>
                    <strong className="text-amber-400">184 Moderate</strong>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 🔄 4. CORE 8-STEP DECISION ARCHITECTURE */}
      <section id="workflow" className="py-20 px-6 border-y border-[#161920] bg-[#090B0E]/70 relative">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              Predictive Conservation Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The 8-Step Decision Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              "The 3D model is the spatial interface; the real product is the decision workflow."
            </p>
          </div>

          {/* 8-Step Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreLoopSteps.map((item, index) => (
              <motion.div
                key={item.step}
                onClick={() => setActiveStep(index)}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl space-y-3 transition shadow-lg relative group overflow-hidden cursor-pointer border ${
                  activeStep === index
                    ? 'bg-[#14171F] border-[#C5A059] ring-1 ring-[#C5A059]/50'
                    : 'bg-[#0E1117] border-[#1C212C] hover:border-[#C5A059]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    activeStep === index
                      ? 'bg-[#C5A059] text-[#07080A] border-[#C5A059]'
                      : 'text-[#C5A059] bg-[#C5A059]/10 border-[#C5A059]/20'
                  }`}>
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">{item.kicker.split('·')[0].trim()}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C5A059] transition">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-2 text-[10px] font-mono text-gray-500 border-t border-[#1C212C]">
                  Action: <strong className="text-gray-300">{item.action}</strong>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 🏛️ 5. INTELLIGENCE MODULES BENTO GRID */}
      <section id="bento" className="py-24 px-6 max-w-[1400px] mx-auto space-y-16">
        
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-[#1A1F29] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              01 · Heritage Digital Twin
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              A living model of the site, mapped down to the component.
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl font-sans">
              Each hotspot is a structural or architectural component with its own condition history, spatial location and inspection trail — not just a photo of a monument.
            </p>
          </div>
          <button
            onClick={onEnterDashboard}
            className="text-xs font-mono text-[#C5A059] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Authority Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: 02 AI Assessment */}
          <div className="md:col-span-2 bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-2xl group hover:border-sky-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/25">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block font-bold">02 · AI Visual Condition Assessment</span>
                <h3 className="text-xl font-serif font-bold text-white">Upload a photo. AI flags what needs a closer look.</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Computer vision identifies cracks, surface loss, discoloration, vegetation intrusion and dampness — every flag is a suggestion for review, never an automatic verdict.
            </p>
            <div className="bg-[#08090C] p-4 rounded-2xl border border-[#1A1F29] text-xs font-mono text-gray-400">
              <span className="text-amber-400 font-bold">Validation principle:</span> AI flags; a conservation professional validates. Confidence scores are shown so reviewers can prioritize what to check first.
            </div>
          </div>

          {/* Bento Card 2: 03 Temporal Change */}
          <div className="bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-[#C5A059]/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/25">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">03 · Temporal Change Detection</span>
                <h3 className="text-lg font-serif font-bold text-white">The same wall, two inspection cycles apart.</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Drag to compare 2024 against 2026. The system aligns repeated observations to the same component so change is measured, not guessed.
            </p>
            <div className="space-y-1.5 font-mono text-xs text-gray-400">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Crack length +38% since 2024</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> New branching fracture detected</div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Classified: Deteriorating trend</div>
            </div>
          </div>

          {/* Bento Card 3: 04 Health Index */}
          <div className="bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">04 · Heritage Health Index</span>
                <h3 className="text-lg font-serif font-bold text-white">A transparent score, not a black box.</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Every score comes with the factors that produced it, weighted by contribution — so authorities know why a number changed, not just that it did.
            </p>
            <div className="bg-[#08090C] p-3.5 rounded-xl border border-[#1A1F29] font-mono text-xs text-emerald-400">
              Structural condition + Moisture exposure + Material condition
            </div>
          </div>

          {/* Bento Card 4: 07 Priority Engine */}
          <div className="md:col-span-2 bg-[#0E1117] border border-[#1C212C] rounded-3xl p-8 space-y-6 shadow-2xl group hover:border-amber-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">07 · Intervention Priority Engine</span>
                <h3 className="text-xl font-serif font-bold text-white">Which component should receive attention first?</h3>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              Ranked by <strong className="text-white">Condition × Deterioration Rate × Hazard Exposure × Heritage Significance</strong> — across every monitored asset, not one at a time.
            </p>
            <div className="p-4 bg-[#08090C] rounded-2xl border border-[#1A1F29] font-mono text-xs text-[#C5A059]">
              Priority Score = 0.30·Condition + 0.25·Velocity + 0.15·Hazard + 0.15·Weather + 0.15·Significance
            </div>
          </div>

        </div>

      </section>

      {/* 🧪 6. INTERACTIVE ENVIRONMENTAL DECAY SIMULATOR */}
      <section id="simulator" className="py-20 px-6 bg-[#090B0E] border-t border-[#1A1F29]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              06 · Predictive Stress Engine
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Simulate Environmental Impact on Health Score
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              Test how extreme monsoon rainfall anomalies and seismic accelerations affect building structural health in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#0E1117] p-8 rounded-3xl border border-[#1C212C] shadow-2xl">
            
            {/* Sliders */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300 flex items-center gap-1.5"><Droplets className="w-4 h-4 text-sky-400" /> Monsoon Rainfall Intensity</span>
                  <span className="text-sky-400 font-bold">+{simRainfall}% Anomaly</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simRainfall}
                  onChange={(e) => setSimRainfall(Number(e.target.value))}
                  className="w-full h-2 bg-[#14171E] rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300 flex items-center gap-1.5"><Activity className="w-4 h-4 text-rose-400" /> Seismic Ground Acceleration</span>
                  <span className="text-rose-400 font-bold">{simSeismic}% PGA Peak</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simSeismic}
                  onChange={(e) => setSimSeismic(Number(e.target.value))}
                  className="w-full h-2 bg-[#14171E] rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#08090C] border border-[#1A1F29] text-xs font-mono text-gray-400">
                ⚡ Real-time calculation using ISO 31000 standard coupled decay equations.
              </div>
            </div>

            {/* Simulated Result Card */}
            <div className="bg-[#14171E] p-6 rounded-2xl border border-[#232A38] text-center space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
                  Simulated Health Score
                </span>
                <div className={`text-5xl font-serif font-bold mt-2 ${
                  simulatedHealth > 65 ? 'text-emerald-400' : simulatedHealth > 45 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {simulatedHealth} <span className="text-lg text-gray-500">/ 100</span>
                </div>
                <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  simulatedUrgency === 'STABLE' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  simulatedUrgency === 'WATCH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  STATUS: {simulatedUrgency}
                </span>
              </div>

              <button
                onClick={onEnterDashboard}
                className="w-full py-2.5 rounded-xl bg-[#C5A059] text-[#07080A] text-xs font-mono font-bold hover:bg-[#D8B46E] transition cursor-pointer"
              >
                Run 2030 Longitudinal Simulation →
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* 🧭 7. 08 CONSERVATION RECOMMENDATION FLOW */}
      <section className="py-20 px-6 bg-[#07080A] border-t border-[#1A1F29]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              08 · Conservation Recommendation Flow
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Evidence in, a recommendation out — the decision stays human.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2 hover:border-[#C5A059]/40 transition">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Problem Detected</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Branching crack on the north façade, expanding across two inspection cycles.
              </p>
            </div>

            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2 hover:border-[#C5A059]/40 transition">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Probable Factors</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Rising moisture ingress compounded by above-average monsoon rainfall this season.
              </p>
            </div>

            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2 hover:border-[#C5A059]/40 transition">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Recommended Action</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Structural inspection within 30 days; assess for moisture barrier repair before next monsoon.
              </p>
            </div>

            <div className="bg-[#0E1117] border border-[#1C212C] p-6 rounded-2xl space-y-2 hover:border-[#C5A059]/40 transition">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">Final Call</span>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Routed to the assigned conservation architect for review and sign-off — Heritage Shield does not act on its own.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 🗺️ 8. MONUMENTS SHOWCASE */}
      <section id="monuments" className="py-20 px-6 bg-[#090B0E] border-t border-[#1A1F29]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
                Centrally Protected Heritage Network
              </span>
              <h2 className="text-3xl font-serif font-bold text-white">
                Living Heritage Digital Twins
              </h2>
            </div>
            <button
              onClick={onEnterDashboard}
              className="px-4 py-2 rounded-xl bg-[#14171E] hover:bg-[#C5A059] text-gray-200 hover:text-[#07080A] text-xs font-mono font-bold transition border border-[#252C3A] cursor-pointer"
            >
              View Full National Radar & Directory →
            </button>
          </div>

          {/* Monuments Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagshipSites.map((site) => (
              <div
                key={site.id}
                onClick={onEnterDashboard}
                className="group cursor-pointer bg-[#0E1117] hover:bg-[#12161F] border border-[#1A1F29] hover:border-[#C5A059]/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#181C24] overflow-hidden">
                    <img
                      src={site.imageUrl}
                      alt={site.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] via-transparent to-black/60" />
                    <div className="absolute top-3 right-3 flex items-center text-[10px] font-mono">
                      <span
                        className="px-2 py-0.5 rounded backdrop-blur-md font-bold uppercase text-[9px]"
                        style={{ backgroundColor: `${site.color}25`, color: site.color, border: `1px solid ${site.color}50` }}
                      >
                        {site.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-mono text-gray-300 block mb-0.5">📍 {site.location}, {site.state}</span>
                      <h4 className="text-lg font-serif font-bold text-white group-hover:text-[#C5A059] transition drop-shadow">
                        {site.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 font-mono text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Typology:</span>
                      <span className="text-gray-200">{site.material.split('&')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vulnerability:</span>
                      <strong style={{ color: site.color }}>{site.riskScore} / 100</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button className="w-full py-2.5 rounded-xl bg-[#161A22] group-hover:bg-[#C5A059] text-gray-200 group-hover:text-[#07080A] text-xs font-mono font-bold transition flex items-center justify-center gap-1.5">
                    <span>Inspect 3D Twin & AI Vision</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ❓ 9. INTERACTIVE FAQ ACCORDION */}
      <section id="faq" className="py-20 px-6 bg-[#07080A] border-t border-[#1A1F29]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
              Technical Specifications & Inquiries
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="bg-[#0E1117] border border-[#1C212C] rounded-2xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-5 text-left font-serif font-bold text-white hover:text-[#C5A059] transition flex justify-between items-center gap-4"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 shrink-0 ${
                    activeFaq === i ? 'rotate-180' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs text-gray-300 font-sans leading-relaxed border-t border-[#161A22] pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 10. FINAL CALL TO ACTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#090B0E] to-[#0E1117] border-t border-[#1A1F29] text-center">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Ready to explore the predictive conservation platform?
          </h2>
          <p className="text-sm text-gray-400 font-sans max-w-xl mx-auto">
            Experience the national geospatial radar, inspect sub-mm defects in real-time, and test predictive decay simulations.
          </p>
          <div className="pt-2">
            <button
              onClick={onEnterDashboard}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#07080A] font-mono text-base font-bold tracking-wide shadow-2xl shadow-amber-950/60 hover:shadow-amber-500/30 transition transform hover:-translate-y-1 cursor-pointer"
            >
              Enter Authority Dashboard 🚀
            </button>
          </div>
        </div>
      </section>

      {/* 🏛️ 11. FOOTER */}
      <footer className="border-t border-[#161920] bg-[#07080A] py-8 px-6 text-center font-mono text-xs text-gray-500 space-y-3 flex flex-col items-center justify-center">
        <HeritageShieldLogo size="sm" showText={true} />
        <div className="text-[11px] text-gray-600">
          Archaeological Survey of India (ASI) & Ministry of Culture
        </div>
      </footer>


    </div>
  );
}
