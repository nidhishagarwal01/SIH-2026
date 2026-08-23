import React, { useState } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const workflowSteps = [
    {
      step: '01',
      title: 'Multimodal Spatial Ingestion',
      desc: 'Transforms drone imagery and terrestrial LiDAR point clouds into millimeter-accurate OBJ/glTF twins through Gaussian Splatting and dense mesh reconstruction.'
    },
    {
      step: '02',
      title: 'Neural Defect Extraction',
      desc: 'Deploys localized segmentation models detecting 8 distinct structural degradation classes: shear fractures, granite spalling, efflorescence, and moisture dampness.'
    },
    {
      step: '03',
      title: 'Multi-Epoch Chrono Registration',
      desc: 'Point-to-point iterative closest point (ICP) registration aligns multi-year laser scans, pinpointing volumetric erosion and millimeter surface loss.'
    },
    {
      step: '04',
      title: 'Physics-Informed Decay Forecasting',
      desc: 'Combines mechanical stress tensors with capillary moisture absorption and micro-climate telemetry to model 2026-2030 crack trajectory evolution.'
    },
    {
      step: '05',
      title: 'ISO 31000 Vulnerability Index',
      desc: 'Calculates explainable risk scores (0-100) weighing material typology, seismic zone factor, peak monsoon intensity, and tourism footfall load.'
    },
    {
      step: '06',
      title: 'National GIS Hazard Triangulation',
      desc: 'Overlays real-time Doppler rainfall alerts, BIS IS 1893 seismic fault buffers, and riverine flood plains across all monitored heritage assets.'
    },
    {
      step: '07',
      title: 'Budget Optimization & Work-Orders',
      desc: 'Rank-orders conservation interventions by cost-benefit payoff, proving that proactive ₹3 Lakh repointing prevents ₹75 Lakh emergency reconstructions.'
    },
    {
      step: '08',
      title: 'Cryptographic ASI Dossier Dispatch',
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
      a: 'The platform links ISRO Bhuvan WGS84 GIS layers, IMD precipitation radar, and BIS IS 1893 seismic hazard fault lines to dynamically update heritage site vulnerability ratings across all centrally protected monuments.'
    }
  ];

  const flagshipSites = sites.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] font-sans selection:bg-[#8052ff] selection:text-white overflow-x-hidden relative">
      
      {/* 1. Global Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#141414]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <HeritageShieldLogo
            size="md"
            showText={true}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-wider font-semibold font-mono">
            <a href="#digital-twin" className="void-link">Living Twin</a>
            <a href="#architecture" className="void-link">Architecture</a>
            <a href="#modules" className="void-link">8 Modules</a>
            <a href="#gis-map" className="void-link">GIS Radar</a>
            <a href="#faq" className="void-link">Documentation</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#8052ff]">{currentUser.name}</span>
                <button
                  onClick={onLogout}
                  className="ghost-pill-btn text-xs font-mono"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="ghost-pill-btn text-xs font-mono uppercase"
              >
                Officer 2FA
              </button>
            )}

            <button
              onClick={onEnterDashboard}
              className="iris-pill-btn"
            >
              <span>Launch Studio</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section: Asymmetric Two-Column Split */}
      <header className="pt-32 pb-24 px-6 sm:px-10 max-w-[1500px] mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (6 cols): Monolithic Headline & Description */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[11px] font-mono uppercase tracking-wider text-[#8052ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8052ff] animate-void-pulse" />
              <span>Smart India Hackathon 2026 · Built Heritage Digital Twin</span>
            </div>

            <h1 className="display-title font-normal tracking-[-0.045em] text-white">
              Predictive conservation for built heritage.
            </h1>

            <p className="body-copy text-[#bdbdbd] max-w-xl">
              A living digital intelligence system that creates 3D digital twins of national monuments, assesses multi-scale structural risk, and prescribes explainable conservation interventions before irreversible material loss occurs.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onEnterDashboard}
                className="iris-pill-btn px-6 py-4 text-sm"
              >
                <span>Generate ASI Dossier</span>
                <span className="text-sm">→</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('digital-twin');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="ghost-pill-btn text-sm"
              >
                <span>Explore 3D Twin</span>
              </button>
            </div>

            {/* Micro Telemetry Metrics */}
            <div className="pt-8 border-t border-[#1a1a1a] grid grid-cols-3 gap-6 font-mono">
              <div>
                <div className="text-2xl sm:text-3xl font-normal text-white">3,690+</div>
                <div className="text-[11px] text-[#9a9a9a] uppercase mt-1">Centrally Protected</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-normal text-[#8052ff]">8 Class</div>
                <div className="text-[11px] text-[#9a9a9a] uppercase mt-1">Neural Vision AI</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-normal text-[#ffb829]">2030</div>
                <div className="text-[11px] text-[#9a9a9a] uppercase mt-1">Decay Horizon</div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Borderless 3D Digital Twin Mount */}
          <div className="lg:col-span-6 relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
            <div className="w-full h-full relative">
              <MonumentViewer3D
                siteIndex={0}
                siteData={sites[0] || null}
                isEmbedded={true}
              />
            </div>
          </div>

        </div>
      </header>

      {/* 3. Module 01 Showcase: Living 3D Digital Twin */}
      <section id="digital-twin" className="py-24 px-6 sm:px-10 max-w-[1500px] mx-auto space-y-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
              Module 01 · Persistent Spatial Identity
            </div>
            <h2 className="section-title text-white">
              Procedural Living Digital Twin
            </h2>
            <p className="body-copy-sm max-w-2xl mt-2 text-[#bdbdbd]">
              Dynamic 3D representation associating temporal condition observations with exact architectural components across years.
            </p>
          </div>

          <button
            onClick={() => onSelectMonument(0, 'twin')}
            className="iris-pill-btn text-xs"
          >
            <span>Open Studio Workspace</span>
            <span>→</span>
          </button>
        </div>

        {/* Full-width 3D Canvas */}
        <div className="w-full h-[620px] bg-black rounded-3xl overflow-hidden relative">
          <MonumentViewer3D
            siteIndex={0}
            siteData={sites[0] || null}
          />
        </div>
      </section>

      {/* 4. Strategic 8-Stage Closed-Loop Pipeline */}
      <section id="modules" className="py-24 px-6 sm:px-10 max-w-[1500px] mx-auto space-y-12 border-t border-[#141414]">
        <div>
          <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
            System Architecture
          </div>
          <h2 className="section-title text-white">
            The 8-Stage Heritage Intelligence Pipeline
          </h2>
          <p className="body-copy max-w-2xl mt-3 text-[#bdbdbd]">
            From raw drone photogrammetry to explainable ISO 31000 risk scoring and certified government work orders.
          </p>
        </div>

        {/* 8 Grid Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((ws, idx) => (
            <div
              key={ws.step}
              className="p-6 rounded-3xl bg-[#0a0a0a] border border-[#141414] hover:border-[#8052ff]/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#8052ff] font-semibold tracking-wider block">
                  Stage {ws.step}
                </span>
                <h3 className="text-xl font-normal tracking-[-0.03em] text-white">
                  {ws.title}
                </h3>
                <p className="text-[14px] font-light text-[#9a9a9a] leading-relaxed">
                  {ws.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono text-[#8052ff]">
                <span>Active Core</span>
                <span>Module 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. National GIS & Multi-Hazard Spatial Radar */}
      <section id="gis-map" className="py-24 px-6 sm:px-10 max-w-[1500px] mx-auto space-y-12 border-t border-[#141414]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
              Module 00 · Geospatial Hazard Triangulation
            </div>
            <h2 className="section-title text-white">
              National Heritage GIS & Hazard Radar
            </h2>
            <p className="body-copy-sm max-w-2xl mt-2 text-[#bdbdbd]">
              Live integration with BIS IS 1893 seismic fault lines, IMD precipitation corridors, and 12 flagship UNESCO sites.
            </p>
          </div>

          <button
            onClick={() => onSelectMonument(0, 'gis')}
            className="iris-pill-btn text-xs"
          >
            <span>Explore Full Map Radar</span>
            <span>→</span>
          </button>
        </div>

        <div className="w-full h-[580px] bg-black rounded-3xl overflow-hidden">
          <HeritageGisMap
            activeSiteIndex={0}
            onSelectSite={(idx, tab) => onSelectMonument(idx, tab)}
          />
        </div>
      </section>

      {/* 6. Flagship National Monuments Directory */}
      <section id="architecture" className="py-24 px-6 sm:px-10 max-w-[1500px] mx-auto space-y-12 border-t border-[#141414]">
        <div>
          <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
            Monitored Portfolio
          </div>
          <h2 className="section-title text-white">
            Monuments of National Importance
          </h2>
          <p className="body-copy max-w-2xl mt-3 text-[#bdbdbd]">
            Select any protected monument to launch its living 3D twin, defect segmentation lab, and 2030 predictive trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipSites.map((site) => (
            <div
              key={site.id}
              onClick={() => onSelectMonument(site.index, 'twin')}
              className="p-6 rounded-3xl bg-[#0a0a0a] border border-[#141414] hover:border-[#8052ff] transition-all duration-300 cursor-pointer space-y-4 group"
            >
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#111111]">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#8052ff]">
                  {site.state}
                </span>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#9a9a9a] uppercase">{site.id}</div>
                <h3 className="text-xl font-normal tracking-[-0.02em] text-white mt-1 group-hover:text-[#8052ff] transition-colors">
                  {site.name}
                </h3>
                <p className="text-[13px] text-[#bdbdbd] font-light mt-1">
                  Typology: {site.material}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1a1a1a] flex justify-between items-center text-[11px] font-mono">
                <span className="text-[#9a9a9a]">Risk Index: <strong className="text-white">{site.riskScore}/100</strong></span>
                <span className={`px-2.5 py-0.5 rounded-full uppercase font-semibold ${
                  site.status === 'Critical' ? 'text-[#ffb829] bg-[#ffb829]/10' : 'text-[#8052ff] bg-[#8052ff]/10'
                }`}>
                  {site.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section id="faq" className="py-24 px-6 sm:px-10 max-w-[1500px] mx-auto space-y-12 border-t border-[#141414]">
        <div>
          <div className="text-[12px] font-mono uppercase text-[#8052ff] font-semibold tracking-wider mb-2">
            Defense & Technical Rigor
          </div>
          <h2 className="section-title text-white">
            Frequently Addressed Questions
          </h2>
          <p className="body-copy max-w-2xl mt-3 text-[#bdbdbd]">
            Architectural, legal, and mathematical justifications for the Heritage Shield platform.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#141414] transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left text-lg font-normal tracking-[-0.02em] text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#8052ff] text-xl ml-4 font-mono">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <p className="body-copy-sm mt-4 text-[#bdbdbd]">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. National Sovereignty Footer */}
      <footer className="border-t border-[#141414] bg-black py-16 px-6 sm:px-10">
        <div className="max-w-[1500px] mx-auto flex flex-wrap justify-between items-center gap-8 text-xs font-mono text-[#9a9a9a]">
          <div className="flex items-center gap-4">
            <HeritageShieldLogo size="sm" showText={true} />
            <span>Smart India Hackathon 2026 · Team ID: 031</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <span>Framework: ISO 31000:2018</span>
            <span>Standard: ISRO Bhuvan WGS84</span>
            <span>Authority: Archaeological Survey of India (ASI)</span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          onLoginSuccess(user);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}
