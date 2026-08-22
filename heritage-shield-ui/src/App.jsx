import React, { useState, useEffect } from 'react';
import MonumentViewer3D from './components/MonumentViewer3D';
import InspectionPhotoViewer from './components/InspectionPhotoViewer';
import HeritageGisMap from './components/HeritageGisMap';
import AsiReportModal from './components/AsiReportModal';
import ScenarioSimulator from './components/ScenarioSimulator';
import FieldReportModal from './components/FieldReportModal';
import PhotogrammetryPipeline from './components/PhotogrammetryPipeline';
import LongitudinalAnalytics from './components/LongitudinalAnalytics';
import LiveIngestModal from './components/LiveIngestModal';

import { UNESCO_SITES } from './data/unescoSites';

export default function App() {
  // Navigation Tabs: 'twin' | 'vision' | 'gis' | 'risk' | 'queue'
  const [activeTab, setActiveTab] = useState('twin');
  const [activeSite, setActiveSite] = useState(0);
  const [activeComponent, setActiveComponent] = useState(2);
  const [sliderPos, setSliderPos] = useState(50);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFieldReportOpen, setIsFieldReportOpen] = useState(false);
  const [isLiveIngestOpen, setIsLiveIngestOpen] = useState(false);
  const [showPhotogrammetryDrawer, setShowPhotogrammetryDrawer] = useState(false);

  // Live Weather / Environment state
  const [liveWeather, setLiveWeather] = useState({
    temp: "33.2°C",
    humidity: "65%",
    precip: "1.2mm",
    status: "LIVE_SYNC"
  });

  // Master National UNESCO World Heritage Sites Database
  const sites = UNESCO_SITES;


  // Architectural Components for each distinct heritage monument
  const siteComponents = {
    0: [ // Qutub Minar Complex (Delhi)
      {
        name: "Finial & Apex Cupola",
        code: "C-04",
        elevation: "+72.5m",
        status: "Stable",
        score: 88,
        color: "#4E878C",
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
        color: "#D4AF37",
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
        color: "#E05A47",
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
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 28, deterioration: 20, hazard: 55, environment: 40, significance: 90 },
        action: "Routine annual drainage clearance & sub-base mortar repointing"
      }
    ],
    1: [ // Hampi Monument Cluster (Karnataka)
      {
        name: "Stepped Vimana Shikhara Tower",
        code: "HC-01",
        elevation: "+8.5m",
        status: "Stable",
        score: 90,
        color: "#4E878C",
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
        color: "#D4AF37",
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
        color: "#D4AF37",
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
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 22, deterioration: 18, hazard: 25, environment: 35, significance: 95 },
        action: "Routine sub-base drainage desilting"
      }
    ],
    2: [ // Golconda Fort Complex (Hyderabad)
      {
        name: "Bala Hissar Durbar Hall & Dome",
        code: "GC-01",
        elevation: "+120m",
        status: "Critical",
        score: 58,
        color: "#E05A47",
        inspected: "Apr 2026",
        defaultRisk: { condition: 82, deterioration: 76, hazard: 40, environment: 70, significance: 85 },
        action: "Immediate structural shoring & lime-surkhi vault consolidation"
      },
      {
        name: "Balahissar Fortified Arched Gate",
        code: "GC-03",
        elevation: "+45m",
        status: "Watch",
        score: 72,
        color: "#D4AF37",
        inspected: "May 2026",
        defaultRisk: { condition: 48, deterioration: 42, hazard: 35, environment: 55, significance: 85 },
        action: "Timber door preservation and arch keystone mortar repointing"
      },
      {
        name: "East Bastion Outer Rampart Wall",
        code: "GC-02",
        elevation: "+24m",
        status: "Critical",
        score: 64,
        color: "#E05A47",
        inspected: "Apr 2026",
        defaultRisk: { condition: 74, deterioration: 70, hazard: 45, environment: 75, significance: 85 },
        action: "Heavy monsoon drainage bypass & masonry buttress reinforcement"
      },
      {
        name: "Substructure Escarpment & Foundation",
        code: "GC-04",
        elevation: "Ground (0.0m)",
        status: "Stable",
        score: 79,
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 30, deterioration: 24, hazard: 35, environment: 50, significance: 85 },
        action: "Perimeter soil stabilization and vegetation root extraction"
      }
    ],
    3: [ // Konark Sun Temple (Odisha)
      {
        name: "Amalaka & Kalasa Crown",
        code: "KT-01",
        elevation: "+30m",
        status: "Critical",
        score: 55,
        color: "#E05A47",
        inspected: "Mar 2026",
        defaultRisk: { condition: 85, deterioration: 78, hazard: 65, environment: 80, significance: 95 },
        action: "Sandstone consolidation & saline salt extraction poultice"
      },
      {
        name: "Jagamohana Assembly Hall",
        code: "KT-02",
        elevation: "+15m",
        status: "Watch",
        score: 68,
        color: "#D4AF37",
        inspected: "Apr 2026",
        defaultRisk: { condition: 55, deterioration: 50, hazard: 60, environment: 75, significance: 95 },
        action: "Interior structural sand packing stability monitoring"
      },
      {
        name: "Iconic 12-Spoke Sun Wheels",
        code: "KT-03",
        elevation: "+2.0m",
        status: "Watch",
        score: 72,
        color: "#D4AF37",
        inspected: "May 2026",
        defaultRisk: { condition: 45, deterioration: 40, hazard: 40, environment: 70, significance: 95 },
        action: "Carved relief detail biocide cleaning"
      },
      {
        name: "Carved Sun Chariot Plinth",
        code: "KT-04",
        elevation: "Ground (0.0m)",
        status: "Stable",
        score: 80,
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 25, deterioration: 20, hazard: 40, environment: 65, significance: 95 },
        action: "Perimeter cyclone drain clearance"
      }
    ],
    4: [ // Ajanta Cave Shrines (Maharashtra)
      {
        name: "Rock-Cut Stupa Sanctuary",
        code: "AJ-01",
        elevation: "+10m",
        status: "Stable",
        score: 84,
        color: "#4E878C",
        inspected: "May 2026",
        defaultRisk: { condition: 24, deterioration: 20, hazard: 30, environment: 40, significance: 95 },
        action: "Micro-climate humidity logging in sanctum"
      },
      {
        name: "Horseshoe Chaitya Sun-Window",
        code: "AJ-02",
        elevation: "+6.0m",
        status: "Watch",
        score: 70,
        color: "#D4AF37",
        inspected: "Apr 2026",
        defaultRisk: { condition: 52, deterioration: 46, hazard: 35, environment: 60, significance: 95 },
        action: "Basalt rock crack displacement sensor check"
      },
      {
        name: "Pillared Entrance Verandah",
        code: "AJ-03",
        elevation: "+2.0m",
        status: "Watch",
        score: 66,
        color: "#D4AF37",
        inspected: "May 2026",
        defaultRisk: { condition: 60, deterioration: 54, hazard: 35, environment: 65, significance: 95 },
        action: "Seepage diversion groove cleaning"
      },
      {
        name: "Basalt Rock Escarpment",
        code: "AJ-04",
        elevation: "Ground (0.0m)",
        status: "Stable",
        score: 82,
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 28, deterioration: 22, hazard: 30, environment: 45, significance: 95 },
        action: "Rockfall netting and drainage maintenance"
      }
    ],
    5: [ // Taj Mahal Complex (Agra, Uttar Pradesh)
      {
        name: "Bulbous Onion Dome & Finial",
        code: "TM-01",
        elevation: "+73m",
        status: "Stable",
        score: 92,
        color: "#4E878C",
        inspected: "Jul 2026",
        defaultRisk: { condition: 14, deterioration: 10, hazard: 35, environment: 30, significance: 100 },
        action: "Fuller's earth (Multani Mitti) marble mudpack treatment"
      },
      {
        name: "Main Mausoleum & Iwan Archways",
        code: "TM-02",
        elevation: "+25m",
        status: "Watch",
        score: 80,
        color: "#D4AF37",
        inspected: "May 2026",
        defaultRisk: { condition: 35, deterioration: 28, hazard: 40, environment: 50, significance: 100 },
        action: "Pietra dura inlay gemstone stabilization and marble joint repointing"
      },
      {
        name: "4 Freestanding Corner Minarets",
        code: "TM-03",
        elevation: "+40m",
        status: "Stable",
        score: 86,
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 20, deterioration: 16, hazard: 45, environment: 35, significance: 100 },
        action: "Tiltmeter laser verticality check"
      },
      {
        name: "Riverfront Terrace Plinth",
        code: "TM-04",
        elevation: "Ground (0.0m)",
        status: "Stable",
        score: 82,
        color: "#4E878C",
        inspected: "Jun 2026",
        defaultRisk: { condition: 26, deterioration: 22, hazard: 50, environment: 45, significance: 100 },
        action: "Yamuna river well-foundation moisture logging"
      }
    ]
  };

  const getComponentsForSite = (idx) => {
    if (siteComponents[idx]) return siteComponents[idx];
    const target = sites[idx] || sites[0];
    const typ = target.typology || 'mughal_dome';
    if (typ === 'stupa') {
      return [
        { name: "Harmika & Tri-Chhatra Finial", code: "ST-01", elevation: "+18m", status: "Stable", score: 88, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 16, deterioration: 12, hazard: 30, environment: 35, significance: 95 }, action: "Gilded finial corrosion check" },
        { name: "Anda Hemispherical Mound", code: "ST-02", elevation: "+8m", status: "Stable", score: 84, color: "#4E878C", inspected: "May 2026", defaultRisk: { condition: 22, deterioration: 18, hazard: 30, environment: 40, significance: 95 }, action: "Masonry surface lime-wash" },
        { name: "Carved Torana Gateway", code: "ST-03", elevation: "+4m", status: "Watch", score: 72, color: "#D4AF37", inspected: "Apr 2026", defaultRisk: { condition: 48, deterioration: 42, hazard: 35, environment: 55, significance: 95 }, action: "Architrave structural beam deflection check" },
        { name: "Medhi Circular Terrace Plinth", code: "ST-04", elevation: "Ground", status: "Stable", score: 85, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 20, deterioration: 15, hazard: 25, environment: 30, significance: 95 }, action: "Circumambulatory pathway drainage clearing" }
      ];
    }
    if (typ === 'stepwell') {
      return [
        { name: "Subterranean Groundwater Ingress", code: "SW-01", elevation: "-28m", status: "Watch", score: 68, color: "#D4AF37", inspected: "Jun 2026", defaultRisk: { condition: 55, deterioration: 48, hazard: 40, environment: 75, significance: 95 }, action: "Groundwater nitrate salt testing" },
        { name: "Deep Circular Well Shaft", code: "SW-02", elevation: "-18m", status: "Stable", score: 82, color: "#4E878C", inspected: "May 2026", defaultRisk: { condition: 26, deterioration: 20, hazard: 35, environment: 60, significance: 95 }, action: "Sub-surface stone block consolidation" },
        { name: "Multi-Storeyed Pillared Gallery", code: "SW-03", elevation: "-8m", status: "Watch", score: 74, color: "#D4AF37", inspected: "Apr 2026", defaultRisk: { condition: 45, deterioration: 38, hazard: 35, environment: 55, significance: 95 }, action: "Carved pillar bracket biocide cleaning" },
        { name: "Pavilion Torana Terraces", code: "SW-04", elevation: "Ground", status: "Stable", score: 86, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 18, deterioration: 14, hazard: 30, environment: 40, significance: 95 }, action: "Entrance pavilion waterproofing" }
      ];
    }
    return [
      { name: "Superstructure Crown & Finial", code: "ND-01", elevation: "+35m", status: "Stable", score: 88, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 18, deterioration: 14, hazard: 35, environment: 35, significance: 90 }, action: "Apex laser scan & lightning arrester inspection" },
      { name: "Main Sanctuary Façade & Portals", code: "ND-02", elevation: "+15m", status: "Watch", score: 72, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 52, deterioration: 45, hazard: 45, environment: 55, significance: 90 }, action: "Masonry joint repointing & moisture barrier" },
      { name: "Intermediate Columns & Archways", code: "ND-03", elevation: "+4m", status: "Watch", score: 75, color: "#D4AF37", inspected: "Apr 2026", defaultRisk: { condition: 45, deterioration: 38, hazard: 40, environment: 50, significance: 90 }, action: "Non-destructive ultrasonic pulse velocity test" },
      { name: "Foundation Plinth & Escarpment", code: "ND-04", elevation: "Ground", status: "Stable", score: 84, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 22, deterioration: 18, hazard: 35, environment: 40, significance: 90 }, action: "Routine perimeter drainage desilting" }
    ];
  };

  const components = getComponentsForSite(activeSite);

  // Explainable Risk State
  const [riskFactors, setRiskFactors] = useState(components[2]?.defaultRisk || components[0].defaultRisk);

  const handleSelectSite = async (idx) => {
    setActiveSite(idx);
    setActiveComponent(2);
    const newComps = getComponentsForSite(idx);
    if (newComps[2]?.defaultRisk) {
      setRiskFactors(newComps[2].defaultRisk);
    }
    const targetSite = sites[idx] || sites[0];
    if (targetSite && targetSite.coords && Array.isArray(targetSite.coords)) {
      try {
        const [lat, lon] = targetSite.coords;
        const res = await fetch(`http://localhost:8000/api/weather/live?lat=${lat}&lon=${lon}`);
        if (res.ok) {
          const wData = await res.json();
          setLiveWeather({
            temp: `${wData.temperature_c}°C`,
            humidity: `${wData.relative_humidity_pct}%`,
            precip: `${wData.precipitation_mm}mm`,
            status: "LIVE_SYNC"
          });
        }
      } catch (e) {
        console.log("Using cached meteorological telemetry for", targetSite.name);
      }
    }
  };




  // Field Sentinel Incidents Feed State
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

  // Priority Queue Table Data
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

  const curSite = sites[activeSite];
  const curComp = components[activeComponent];

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#E8E6E3] font-sans antialiased selection:bg-[#C5A059] selection:text-[#090A0C] flex flex-col">
      
      {/* 🏛️ 1. TOP ENTERPRISE HEADER / GOVERNMENT OF INDIA COMMAND BAR */}
      <header className="sticky top-0 z-50 bg-[#0E1013]/95 backdrop-blur-md border-b border-[#1E2228] px-6 py-2.5 shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4">
          
          {/* Brand & Authority */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#C5A059] via-[#8C6D38] to-[#4E878C] p-[1px] shadow-lg shadow-amber-950/30">
              <div className="w-full h-full bg-[#0E1013] rounded-lg flex items-center justify-center">
                <span className="font-serif font-black text-[#C5A059] text-base tracking-tighter">HS</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-serif font-bold tracking-wide text-[#F3EFE6]">HERITAGE SHIELD</h1>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/25 font-bold tracking-wider">
                  ASI · NMMA · SIH '26 (Team 031)
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans tracking-tight">
                National Built Heritage Command Center · Predictive Digital Twin & AI Conservation
              </p>
            </div>
          </div>

          {/* Quick National Asset Selector */}
          <div className="flex items-center gap-1.5 bg-[#14171C] p-1 rounded-lg border border-[#222730] overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-gray-400 px-2 font-semibold whitespace-nowrap">Asset:</span>
            {sites.slice(0, 5).map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSite(idx)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeSite === idx
                    ? 'bg-[#222730] text-[#C5A059] font-bold border border-[#C5A059]/40 shadow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span>{s.name.split(' ')[0]}</span>
                <span className="text-[9px] text-gray-500 font-mono">({s.id.split('-')[1]})</span>
              </button>
            ))}
            <select
              value={activeSite}
              onChange={(e) => handleSelectSite(Number(e.target.value))}
              className="bg-[#0E1013] text-[#C5A059] border border-[#2B313D] rounded px-2 py-1 text-xs font-mono outline-none cursor-pointer hover:border-[#C5A059]"
            >
              {sites.map((s, idx) => (
                <option key={idx} value={idx}>
                  🏛️ {s.name} ({s.state})
                </option>
              ))}
            </select>
          </div>


          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsLiveIngestOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-700/50 hover:bg-cyan-900/40 text-cyan-300 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>🌐 Live Ingest & Examine</span>
            </button>

            <button
              onClick={() => setIsFieldReportOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#14171C] border border-[#282E38] hover:border-emerald-500/50 text-emerald-400 text-xs font-mono font-medium transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Field Sentinel</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:brightness-110 text-[#090A0C] text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-950/30"
            >
              <span>📄 ASI Work-Order</span>
            </button>
          </div>

        </div>
      </header>

      {/* 📡 2. MISSION-CRITICAL LIVE TELEMETRY RIBBON (HUD) */}
      <section className="bg-[#111317] border-b border-[#1E2228] px-6 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
          
          <div className="flex items-center gap-6 text-gray-300 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 uppercase text-[10px]">Active Node:</span>
              <strong className="text-[#F3EFE6] font-semibold">{curSite.name}</strong>
              <span className="text-[10px] text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.2 rounded border border-[#C5A059]/20 font-bold">
                {curSite.id}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 uppercase text-[10px]">Hazard Exposure:</span>
              <span className="text-amber-400 font-bold">{curSite.seismicZone}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 uppercase text-[10px]">Live Weather (Open-Meteo):</span>
              <span className="text-sky-400">{liveWeather.temp} · {liveWeather.humidity} RH</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 uppercase text-[10px]">Active Priority:</span>
              <span className="text-rose-400 font-bold">C-01 Critical ({computedRisk}/100)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span>Preventive ROI: <strong className="text-emerald-400 font-bold">93.4% Savings</strong></span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">WGS84: {curSite.coords}</span>
          </div>
        </div>
      </section>

      {/* 🎛️ 3. WORKSPACE CONSOLE NAVIGATION BAR */}
      <div className="bg-[#0D0E11] border-b border-[#1A1D23] px-6">
        <div className="max-w-[1600px] mx-auto flex items-center gap-1 overflow-x-auto py-1.5">
          
          <button
            onClick={() => setActiveTab('twin')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'twin'
                ? 'bg-[#181B22] text-[#F3EFE6] border border-[#2B313D] shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#121418]'
            }`}
          >
            <span className="text-sm">🏛️</span>
            <span>3D Living Twin Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'vision'
                ? 'bg-[#181B22] text-[#F3EFE6] border border-[#2B313D] shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#121418]'
            }`}
          >
            <span className="text-sm">🔍</span>
            <span>AI Defect Diagnostics Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('gis')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gis'
                ? 'bg-[#181B22] text-[#F3EFE6] border border-[#2B313D] shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#121418]'
            }`}
          >
            <span className="text-sm">🗺️</span>
            <span>National GIS Hazard Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('risk')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'risk'
                ? 'bg-[#181B22] text-[#F3EFE6] border border-[#2B313D] shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#121418]'
            }`}
          >
            <span className="text-sm">📊</span>
            <span>Risk & 2028 Predictive Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'queue'
                ? 'bg-[#181B22] text-[#F3EFE6] border border-[#2B313D] shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#121418]'
            }`}
          >
            <span className="text-sm">📋</span>
            <span>Authority Queue & Sentinel Feed</span>
          </button>
        </div>
      </div>

      {/* 🚀 4. MAIN INTERACTIVE CONSOLE WORKSPACE */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* CONSOLE 1: 3D LIVING DIGITAL TWIN STUDIO                                 */}
        {/* ========================================================================= */}
        {activeTab === 'twin' && (
          <div className="space-y-6">
            
            {/* Top Studio Control Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">
                  WebGL 3D Procedural Engine · Multi-Mode Inspection
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  {curSite.name} — Living 3D Digital Twin
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPhotogrammetryDrawer(!showPhotogrammetryDrawer)}
                  className="px-3 py-1.5 rounded-lg bg-[#181B22] border border-[#2B313D] text-cyan-300 text-xs font-mono font-semibold hover:bg-[#222730] transition flex items-center gap-1.5"
                >
                  <span>🏗️ {showPhotogrammetryDrawer ? 'Hide' : 'Show'} Scan-to-Twin Pipeline</span>
                </button>
              </div>
            </div>

            {/* Photogrammetry Drawer (if toggled) */}
            {showPhotogrammetryDrawer && (
              <div className="animate-in fade-in duration-300">
                <PhotogrammetryPipeline />
              </div>
            )}

            {/* Main 3D Viewport Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 3D Canvas */}
              <div className="lg:col-span-8">
                <MonumentViewer3D
                  siteIndex={activeSite}
                  siteData={curSite}
                  activeComponent={activeComponent}
                  onSelectComponent={handleSelectComponent}
                  components={components}
                />

              </div>


              {/* Architectural Hierarchy & Telemetry Sidebar */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                
                {/* Node Selector List */}
                <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-[#1E2228] pb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold">
                      Architectural Nodes
                    </span>
                    <span className="text-[10px] font-mono text-[#C5A059]">4 Persistent IDs</span>
                  </div>

                  <div className="space-y-2">
                    {components.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectComponent(idx)}
                        className={`w-full p-3 rounded-lg border text-left flex justify-between items-center transition ${
                          activeComponent === idx
                            ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#F3EFE6] shadow'
                            : 'border-[#1E2228] bg-[#0E1013] text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#C5A059] bg-black/50 px-1.5 py-0.5 rounded border border-[#C5A059]/30">
                              {c.code}
                            </span>
                            <span className="font-medium text-xs text-gray-200">{c.name}</span>
                          </div>
                          <div className="text-[10px] font-mono text-gray-500 mt-1">
                            Elevation: {c.elevation} · Inspected: {c.inspected}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-bold" style={{ color: c.color }}>
                            {c.score}/100
                          </span>
                          <div
                            className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase mt-0.5"
                            style={{ backgroundColor: `${c.color}22`, color: c.color }}
                          >
                            {c.status}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Node Details Card */}
                <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-gray-400">Node Telemetry Profile</span>
                      <h3 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
                        {curComp.name} ({curComp.code})
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-serif font-bold" style={{ color: curComp.color }}>
                        {curComp.score}
                      </div>
                      <span className="text-[9px] font-mono uppercase text-gray-400">Health Index</span>
                    </div>
                  </div>

                  <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228] text-xs space-y-1.5">
                    <div className="text-[10px] font-mono text-[#C5A059] uppercase font-bold">
                      Prescribed Conservation Protocol:
                    </div>
                    <p className="text-gray-300 leading-relaxed font-sans text-xs">
                      {curComp.action}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-[#0E1013] p-2.5 rounded border border-[#1E2228]">
                      <span className="text-[9px] text-gray-500 uppercase block">Vulnerability Risk</span>
                      <span className="text-rose-400 font-bold text-sm">{computedRisk}/100</span>
                    </div>
                    <div className="bg-[#0E1013] p-2.5 rounded border border-[#1E2228]">
                      <span className="text-[9px] text-gray-500 uppercase block">Spatial Coordinates</span>
                      <span className="text-gray-300 font-bold text-xs">{curComp.elevation}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 2: AI DEFECT DIAGNOSTICS LAB                                     */}
        {/* ========================================================================= */}
        {activeTab === 'vision' && (
          <div className="space-y-6">
            
            {/* Top Lab Control Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">
                  YOLOv8 + OpenCV Segmentation Engine · Normalized Pixel Telemetry
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  AI Visual Condition Diagnostics — {curComp.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-[#0E1013] px-3 py-1 rounded border border-[#1E2228]">
                  API Engine: <strong>/api/process/images</strong>
                </span>
              </div>
            </div>

            {/* Bounding Box Defect Canvas */}
            <InspectionPhotoViewer activeComponent={curComp.name} />

            {/* Longitudinal Delta Comparison Strip */}
            <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#C5A059] font-bold">
                    Longitudinal Delta Analysis
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
                    Temporal Comparison (2024 Baseline vs. 2026 Inspection)
                  </h3>
                </div>
                <span className="text-xs font-mono text-rose-400 font-bold bg-[#0E1013] px-3 py-1 rounded border border-[#1E2228]">
                  Measured Delta: +38.2% Crack Growth
                </span>
              </div>

              <div className="bg-[#0E1013] p-4 rounded-xl border border-[#1E2228]">
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>◄ 2024 Baseline (18.2 cm, 1.1 mm)</span>
                  <span className="text-[#C5A059] font-semibold">Slide to scrub temporal evolution</span>
                  <span>2026 Inspection (25.1 cm, branching) ►</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#C5A059] h-2 bg-[#1E2228] rounded-lg cursor-ew-resize"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-center font-mono">
                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase">Crack Extension</div>
                    <div className="text-lg font-bold text-rose-400 mt-0.5">+6.9 cm</div>
                    <div className="text-[10px] text-gray-500">18.2cm → 25.1cm</div>
                  </div>
                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase">Progression Rate</div>
                    <div className="text-lg font-bold text-amber-400 mt-0.5">3.45 cm/yr</div>
                    <div className="text-[10px] text-gray-500">Above baseline limit</div>
                  </div>
                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase">Primary Driver</div>
                    <div className="text-lg font-bold text-sky-400 mt-0.5">Capillary Moisture</div>
                    <div className="text-[10px] text-gray-500">14.8% saturation</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 3: NATIONAL GEOSPATIAL GIS HAZARD RADAR                           */}
        {/* ========================================================================= */}
        {activeTab === 'gis' && (
          <div className="space-y-6">
            
            {/* Top GIS Control Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#4E878C] uppercase tracking-widest font-bold">
                  National Geospatial Policy (DST) · Seismic & Monsoon Multi-Hazard Overlay
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  National Heritage GIS & Multi-Hazard Spatial Radar
                </h2>
              </div>

              <div className="text-xs font-mono text-gray-400 bg-[#0E1013] px-3 py-1.5 rounded-lg border border-[#1E2228]">
                Protected Sites Active: <strong className="text-[#C5A059]">3,690+ National Grid</strong>
              </div>
            </div>

            <HeritageGisMap
              activeSiteIndex={activeSite}
              onSelectSite={(idx) => {
                handleSelectSite(idx);
                setActiveTab('twin');
              }}
            />

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 4: RISK ENGINE & 2028 PREDICTIVE SIMULATOR                        */}
        {/* ========================================================================= */}
        {activeTab === 'risk' && (
          <div className="space-y-6">
            
            {/* Top Risk Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">
                  Explainable Multi-Criteria Formula · ISO 31000 Risk Framework
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  Auditable Heritage Risk & Predictive Decay Lab
                </h2>
              </div>

              <div className="text-xs font-mono bg-[#0E1013] px-3.5 py-1.5 rounded-lg border border-[#1E2228] text-gray-300">
                Formula: <strong className="text-[#C5A059]">R = 0.30C + 0.25D + 0.15H + 0.15E + 0.15S</strong>
              </div>
            </div>

            {/* Explainable Formula Sliders Grid */}
            <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders Column */}
              <div className="lg:col-span-7 space-y-3.5">
                
                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>C</strong> — Condition Severity (Weight: 30%)</span>
                    <span className="font-mono text-[#C5A059] font-bold">{riskFactors.condition}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.condition}
                    onChange={(e) => setRiskFactors({ ...riskFactors, condition: Number(e.target.value) })}
                    className="w-full accent-[#C5A059] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>D</strong> — Deterioration Velocity (Weight: 25%)</span>
                    <span className="font-mono text-[#C5A059] font-bold">{riskFactors.deterioration}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.deterioration}
                    onChange={(e) => setRiskFactors({ ...riskFactors, deterioration: Number(e.target.value) })}
                    className="w-full accent-[#C5A059] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>H</strong> — Natural Hazard & Seismic Exposure (Weight: 15%)</span>
                    <span className="font-mono text-[#C5A059] font-bold">{riskFactors.hazard}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.hazard}
                    onChange={(e) => setRiskFactors({ ...riskFactors, hazard: Number(e.target.value) })}
                    className="w-full accent-[#C5A059] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>E</strong> — Environmental Stress & Weather (Weight: 15%)</span>
                    <span className="font-mono text-[#C5A059] font-bold">{riskFactors.environment}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.environment}
                    onChange={(e) => setRiskFactors({ ...riskFactors, environment: Number(e.target.value) })}
                    className="w-full accent-[#C5A059] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>S</strong> — Archaeological & National Significance (Weight: 15%)</span>
                    <span className="font-mono text-[#C5A059] font-bold">{riskFactors.significance}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.significance}
                    onChange={(e) => setRiskFactors({ ...riskFactors, significance: Number(e.target.value) })}
                    className="w-full accent-[#C5A059] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Score Card */}
              <div className="lg:col-span-5 bg-[#0E1013] border border-[#1E2228] rounded-2xl p-6 text-center flex flex-col justify-center items-center shadow-lg">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                  Computed Vulnerability Risk
                </span>
                <div className="text-6xl font-serif font-bold text-rose-500 my-3">
                  {computedRisk} <span className="text-xs font-sans text-gray-400 font-normal">/ 100</span>
                </div>
                <span className={`text-xs px-3.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider ${
                  computedRisk >= 70
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : computedRisk >= 45
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {computedRisk >= 70 ? '● CRITICAL · EMERGENCY INTERVENTION' : computedRisk >= 45 ? '▲ WATCH · RE-INSPECT' : '✔ STABLE'}
                </span>

                <button
                  onClick={() => setIsReportOpen(true)}
                  className="w-full mt-5 py-2.5 rounded-lg bg-[#C5A059] text-[#090A0C] font-mono font-bold text-xs hover:bg-[#d8ac67] transition flex items-center justify-center gap-2 shadow"
                >
                  <span>📄 Generate Official ASI Dossier</span>
                </button>
              </div>
            </div>

            {/* Extreme Climate & Disaster Scenario Simulator */}
            <ScenarioSimulator
              activeSite={curSite}
              activeComponent={curComp}
              baselineRisk={computedRisk}
            />

            {/* Longitudinal Analytics & 2028 Forecast */}
            <LongitudinalAnalytics activeComponent={curComp.name} />

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 5: AUTHORITY PRIORITY QUEUE & FIELD SENTINEL DISPATCH             */}
        {/* ========================================================================= */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            
            {/* Top Queue Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">
                  Decision Support & National Intervention Triage
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  Authority Priority Queue & Participatory Sentinel Feed
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFieldReportOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold hover:bg-emerald-500/30 transition flex items-center gap-2"
                >
                  <span>➕ Submit New Field Observation</span>
                </button>
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#181B22] border border-[#2B313D] text-[#C5A059] text-xs font-mono font-semibold hover:text-white transition"
                >
                  📄 Export Batch Dossiers
                </button>
              </div>
            </div>

            {/* Ranked Priority Intervention Queue Table */}
            <div className="bg-[#121418] border border-[#1E2228] rounded-xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-[#1E2228] flex justify-between items-center">
                <h3 className="text-sm font-serif font-bold text-[#F3EFE6]">
                  Ranked Priority Intervention Queue (National Overview)
                </h3>
                <span className="text-xs font-mono text-gray-400">
                  Sorted by Explanatory Vulnerability Score ($R \ge 70$ First)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="uppercase font-mono text-gray-400 border-b border-[#1E2228] bg-[#0E1013]">
                    <tr>
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Component</th>
                      <th className="py-3 px-4">Monument Asset</th>
                      <th className="py-3 px-4">Risk Score</th>
                      <th className="py-3 px-4">Urgency Status</th>
                      <th className="py-3 px-4">Mandated Action</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2228]">
                    {priorityQueue.map((item, idx) => (
                      <tr key={idx} className={idx === 0 ? "bg-rose-950/15" : "hover:bg-[#181B22]/50"}>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">#{item.rank}</td>
                        <td className="py-3.5 px-4 font-medium text-gray-200">{item.component}</td>
                        <td className="py-3.5 px-4 text-gray-400 font-mono">{item.site}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-gray-200">{item.score}/100</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[11px] px-2.5 py-0.5 rounded font-mono font-semibold ${
                            item.status === 'High Urgency'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : item.status === 'Watch'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-300">{item.action}</td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setIsReportOpen(true)}
                            className="text-[11px] font-mono px-2 py-1 rounded bg-[#0E1013] border border-[#1E2228] text-[#C5A059] hover:bg-[#C5A059]/20 transition"
                          >
                            Dossier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Field Sentinel Incident Feed */}
            <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#1E2228] pb-3">
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#F3EFE6]">
                    Heritage Sentinel · Ground Telemetry Feed
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Live mobile observation feed from ASI circle inspectors and citizen visitors
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldReports.map((report, idx) => (
                  <div key={idx} className="bg-[#0E1013] border border-[#1E2228] rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                            report.role === 'officer'
                              ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {report.role === 'officer' ? '👷 ASI Officer' : '🧑‍🤝‍🧑 Citizen Sentinel'}
                          </span>
                          <span className="text-xs font-mono text-gray-500">{report.id}</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">{report.timestamp}</span>
                      </div>

                      <h4 className="text-sm font-serif font-bold text-gray-100 mt-2">
                        {report.monumentName} · <span className="text-[#C5A059] font-mono font-normal text-xs">{report.component}</span>
                      </h4>

                      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed bg-[#121418] p-2.5 rounded border border-[#1E2228]">
                        "{report.notes}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1E2228] flex flex-wrap justify-between items-center gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                        <span>📍 {report.gps}</span>
                        <span>•</span>
                        <span className={report.severity === 'High' ? 'text-rose-400 font-bold' : 'text-amber-400'}>
                          Severity: {report.severity}
                        </span>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/50 text-emerald-400 border border-emerald-900">
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 🏛️ ASI WORK ORDER MODAL */}
      <AsiReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        site={curSite}
        component={curComp}
        riskFactors={riskFactors}
        computedRisk={computedRisk}
      />

      {/* 📱 FIELD REPORT MODAL */}
      <FieldReportModal
        isOpen={isFieldReportOpen}
        onClose={() => setIsFieldReportOpen(false)}
        onSubmitReport={handleAddReport}
        monuments={sites}
      />

      {/* 🌐 AUTONOMOUS LIVE INGESTION & EXAMINATION MODAL */}
      <LiveIngestModal
        isOpen={isLiveIngestOpen}
        onClose={() => setIsLiveIngestOpen(false)}
        currentSite={curSite}
      />


      {/* 🏛️ FOOTER */}
      <footer className="border-t border-[#1E2228] bg-[#0E1013] py-6 px-6 text-center text-xs text-gray-500 font-mono mt-auto space-y-1">
        <div>HERITAGE SHIELD · Smart India Hackathon '26 · Team ID: 031 (Qualified)</div>
        <div className="text-[11px] text-gray-600">
          Domain: Simulation and Digital Twin · Ministry of Culture & Archaeological Survey of India (ASI)
        </div>
      </footer>

    </div>
  );
}
