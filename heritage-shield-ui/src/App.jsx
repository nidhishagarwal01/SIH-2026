import React, { useState, useEffect } from 'react';
import LandingPageView from './components/LandingPageView';
import MonumentPortalView from './components/MonumentPortalView';
import MonumentViewer3D from './components/MonumentViewer3D';
import InspectionPhotoViewer from './components/InspectionPhotoViewer';
import HeritageGisMap from './components/HeritageGisMap';
import AsiReportModal from './components/AsiReportModal';
import ScenarioSimulator from './components/ScenarioSimulator';
import FieldReportModal from './components/FieldReportModal';
import PhotogrammetryPipeline from './components/PhotogrammetryPipeline';
import LongitudinalAnalytics from './components/LongitudinalAnalytics';
import LiveIngestModal from './components/LiveIngestModal';
import AssetSwitcherModal from './components/AssetSwitcherModal';
import HeritageShieldLogo from './components/HeritageShieldLogo';
import ErrorBoundary from './components/ErrorBoundary';
import { Sun } from 'lucide-react';

import { UNESCO_SITES } from './data/unescoSites';
import { getMonumentCostData } from './utils/costCalculator';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import BackButton from './components/ui/BackButton';

export default function App() {
  // Global Theme State (Persisted in LocalStorage)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    try {
      return localStorage.getItem('heritage_shield_theme') === 'dark';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('heritage_shield_theme', isDarkTheme ? 'dark' : 'light');
    } catch (e) {}
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const { currentView, currentSite, currentTab, navigateTo, goBack } = useNavigation();

  // Navigation Flow: 'landing' | 'portal' | 'studio'
  const viewMode = currentView || 'landing';
  const [activeSite, setActiveSite] = useState(currentSite !== undefined ? currentSite : 0);
  const [activeTab, setActiveTab] = useState(currentTab || 'twin');

  useEffect(() => {
    if (currentSite !== undefined) setActiveSite(currentSite);
  }, [currentSite]);

  useEffect(() => {
    if (currentTab) setActiveTab(currentTab);
  }, [currentTab]);

  const [activeComponent, setActiveComponent] = useState(2);
  const [sliderPos, setSliderPos] = useState(50);

  // Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFieldReportOpen, setIsFieldReportOpen] = useState(false);
  const [isLiveIngestOpen, setIsLiveIngestOpen] = useState(false);
  const [isAssetSwitcherOpen, setIsAssetSwitcherOpen] = useState(false);
  const [showPhotogrammetryDrawer, setShowPhotogrammetryDrawer] = useState(false);

  // Live Weather telemetry
  const [liveWeather, setLiveWeather] = useState({
    temp: "33.2°C",
    humidity: "65%",
    precip: "1.2mm",
    status: "LIVE_SYNC"
  });

  const sites = UNESCO_SITES;

  // Architectural Components for each heritage monument
  const siteComponents = {
    0: [ // Qutub Minar Complex
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
    1: [ // Hampi Monument Cluster
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
    2: [ // Golconda Fort Complex
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
    3: [ // Konark Sun Temple
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
    4: [ // Ajanta Caves (Cave 19 Chaitya)
      { name: "Chaitya Horseshoe Sun-Window Arch", code: "AC-01", elevation: "+14m", status: "Critical", score: 60, color: "#E05A47", inspected: "Apr 2026", defaultRisk: { condition: 76, deterioration: 70, hazard: 50, environment: 75, significance: 95 }, action: "Basalt rock fissure grouting & seepage deflection" },
      { name: "Monolithic Votive Stupa & Buddha", code: "AC-02", elevation: "+6.0m", status: "Watch", score: 75, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 45, deterioration: 38, hazard: 40, environment: 60, significance: 95 }, action: "Micro-climate relative humidity stabilization" },
      { name: "Fluted Pillar Colonnades & Murals", code: "AC-03", elevation: "+3.5m", status: "Watch", score: 70, color: "#D4AF37", inspected: "Apr 2026", defaultRisk: { condition: 52, deterioration: 48, hazard: 35, environment: 70, significance: 95 }, action: "Tempera mural pigment consolidation & biocide" },
      { name: "Basalt Cliff Escarpment & Apron", code: "AC-04", elevation: "Ground (0.0m)", status: "Stable", score: 82, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 25, deterioration: 22, hazard: 45, environment: 55, significance: 95 }, action: "Monsoon rockfall mesh anchoring & drainage" }
    ],
    5: [ // Taj Mahal Mausoleum
      { name: "Grand Bulbous Onion Dome & Kalasha", code: "TM-01", elevation: "+73m", status: "Watch", score: 74, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 48, deterioration: 42, hazard: 55, environment: 68, significance: 98 }, action: "Fuller's earth clay pack (Multani Mitti) pollutant cleansing" },
      { name: "North & South Pishtaq Iwan Façades", code: "TM-02", elevation: "+32m", status: "Critical", score: 61, color: "#E05A47", inspected: "Apr 2026", defaultRisk: { condition: 80, deterioration: 74, hazard: 50, environment: 75, significance: 98 }, action: "Makrana marble micro-crack repointing & pietra dura stabilization" },
      { name: "Four Freestanding Corner Minarets", code: "TM-03", elevation: "+42m", status: "Watch", score: 72, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 50, deterioration: 45, hazard: 55, environment: 60, significance: 98 }, action: "High-precision vertical inclination & tilt telemetry monitoring" },
      { name: "Yamuna Riverfront Sandstone Plinth", code: "TM-04", elevation: "Ground (0.0m)", status: "Stable", score: 83, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 26, deterioration: 20, hazard: 60, environment: 50, significance: 98 }, action: "Sub-surface sal wood well foundation hydrology monitoring" }
    ],
    6: [ // Ellora Kailasa Temple (Cave 16)
      { name: "Monolithic Rock Shikhara Spire", code: "EL-01", elevation: "+32m", status: "Critical", score: 58, color: "#E05A47", inspected: "Mar 2026", defaultRisk: { condition: 82, deterioration: 78, hazard: 45, environment: 72, significance: 96 }, action: "Monolithic volcanic basalt seam stitching & crack sealing" },
      { name: "Nandi Mandapa & Two Victory Pillars", code: "EL-02", elevation: "+16m", status: "Watch", score: 73, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 48, deterioration: 40, hazard: 40, environment: 65, significance: 96 }, action: "Surface lichen removal & laser non-destructive cleaning" },
      { name: "Life-Size Elephant Frieze Plinth", code: "EL-03", elevation: "+4.0m", status: "Watch", score: 69, color: "#D4AF37", inspected: "Apr 2026", defaultRisk: { condition: 55, deterioration: 50, hazard: 35, environment: 68, significance: 96 }, action: "Exfoliated basalt consolidation with ethyl silicate" },
      { name: "Excavated U-Shaped Quarry Pit Basin", code: "EL-04", elevation: "Ground (0.0m)", status: "Stable", score: 84, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 22, deterioration: 18, hazard: 45, environment: 55, significance: 96 }, action: "Runoff catchpit desilting & drainage channel repair" }
    ],
    7: [ // Khajuraho Kandariya Mahadeva
      { name: "Towering 84-Urushringa Shikhara", code: "KM-01", elevation: "+31m", status: "Critical", score: 62, color: "#E05A47", inspected: "Apr 2026", defaultRisk: { condition: 76, deterioration: 70, hazard: 35, environment: 65, significance: 92 }, action: "Interlocking dry-masonry joint lime repointing & stabilization" },
      { name: "Gudhamandapa & Sculptural Terraces", code: "KM-02", elevation: "+14m", status: "Watch", score: 71, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 50, deterioration: 45, hazard: 30, environment: 60, significance: 92 }, action: "Biocide application for micro-flora mitigation" },
      { name: "Ardhamandapa Entrance Porch", code: "KM-03", elevation: "+6.5m", status: "Stable", score: 80, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 30, deterioration: 25, hazard: 30, environment: 50, significance: 92 }, action: "Torana archway non-invasive ultrasonic inspection" },
      { name: "High Jagati Masonry Platform", code: "KM-04", elevation: "Ground (0.0m)", status: "Stable", score: 86, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 20, deterioration: 16, hazard: 35, environment: 45, significance: 92 }, action: "Perimeter flagstone regrading for positive storm runoff" }
    ],
    8: [ // Great Stupa at Sanchi
      { name: "Harmika & Triple Chhatra Finial", code: "SS-01", elevation: "+17m", status: "Stable", score: 87, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 20, deterioration: 15, hazard: 30, environment: 40, significance: 94 }, action: "Balustrade stone dowel integrity verification" },
      { name: "Hemispherical Anda Dome Core", code: "SS-02", elevation: "+10m", status: "Watch", score: 76, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 42, deterioration: 36, hazard: 35, environment: 55, significance: 94 }, action: "Breathable moisture barrier sealing on sandstone cladding" },
      { name: "Four Ornate Torana Gateways", code: "SS-03", elevation: "+8.5m", status: "Watch", score: 72, color: "#D4AF37", inspected: "Apr 2026", defaultRisk: { condition: 50, deterioration: 44, hazard: 30, environment: 60, significance: 94 }, action: "Architrave bracket structural cantilever strain gauge check" },
      { name: "Circular Medhi Processional Terrace", code: "SS-04", elevation: "Ground (0.0m)", status: "Stable", score: 89, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 16, deterioration: 12, hazard: 30, environment: 35, significance: 94 }, action: "Routine visitor path weed control & stone resetting" }
    ],
    9: [ // Brihadisvara Temple (Chola Dynasty)
      { name: "80-Tonne Monolithic Kumbam Apex", code: "BT-01", elevation: "+66m", status: "Watch", score: 77, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 42, deterioration: 38, hazard: 40, environment: 58, significance: 96 }, action: "Granite capstone acoustic pulse velocity inspection" },
      { name: "13-Tier Pyramidal Vimana Spire", code: "BT-02", elevation: "+35m", status: "Critical", score: 63, color: "#E05A47", inspected: "Apr 2026", defaultRisk: { condition: 74, deterioration: 68, hazard: 45, environment: 65, significance: 96 }, action: "Interlocking granite block mortar repointing & micro-grouting" },
      { name: "Monolithic Nandi Mandapa Pavilion", code: "BT-03", elevation: "+4.5m", status: "Stable", score: 85, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 22, deterioration: 18, hazard: 35, environment: 50, significance: 96 }, action: "Granite monolithic carving micro-dusting & conservation" },
      { name: "Prakara Cloistered Enclosure Wall", code: "BT-04", elevation: "Ground (0.0m)", status: "Stable", score: 88, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 18, deterioration: 14, hazard: 35, environment: 40, significance: 96 }, action: "Moat and storm water discharge channel clearance" }
    ],
    10: [ // Rani Ki Vav Stepwell
      { name: "Deep Cylindrical Well Reservoir Shaft", code: "RV-01", elevation: "-28m", status: "Critical", score: 57, color: "#E05A47", inspected: "Mar 2026", defaultRisk: { condition: 84, deterioration: 78, hazard: 55, environment: 82, significance: 95 }, action: "Groundwater capillary hydrostatic pressure relief & pumping" },
      { name: "7-Storey Subterranean Stepped Terraces", code: "RV-02", elevation: "-14m", status: "Critical", score: 62, color: "#E05A47", inspected: "Apr 2026", defaultRisk: { condition: 76, deterioration: 70, hazard: 50, environment: 78, significance: 95 }, action: "Sandstone pavilion bracket anchoring & tilt sensor array" },
      { name: "Sculptural Colonnades & 500+ Niches", code: "RV-03", elevation: "-6.0m", status: "Watch", score: 70, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 54, deterioration: 48, hazard: 40, environment: 70, significance: 95 }, action: "High-relief avatar sculpture consolidation & salt poultice" },
      { name: "Ground Entrance Plinth & Pavilion", code: "RV-04", elevation: "Ground (0.0m)", status: "Stable", score: 83, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 25, deterioration: 20, hazard: 45, environment: 50, significance: 95 }, action: "Perimeter security barrier and stormwater interceptor drains" }
    ],
    11: [ // Dholavira Harappan Citadel
      { name: "Acropolis Royal Castle & Signboard Chamber", code: "DH-01", elevation: "+15m", status: "Watch", score: 73, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 50, deterioration: 44, hazard: 65, environment: 70, significance: 96 }, action: "Mud-brick & limestone dressed masonry erosion stabilization" },
      { name: "Monumental Northern Ceremonial Gateway", code: "DH-02", elevation: "+8.0m", status: "Critical", score: 64, color: "#E05A47", inspected: "Apr 2026", defaultRisk: { condition: 72, deterioration: 68, hazard: 60, environment: 72, significance: 96 }, action: "Harappan ten-character signboard chamber environmental shelter" },
      { name: "Monolithic Stepped Water Reservoirs", code: "DH-03", elevation: "-6.0m", status: "Watch", score: 75, color: "#D4AF37", inspected: "May 2026", defaultRisk: { condition: 46, deterioration: 40, hazard: 55, environment: 65, significance: 96 }, action: "Hydraulic lime stone bund preservation against flash rain" },
      { name: "Massive Dressed-Stone Outer Ramparts", code: "DH-04", elevation: "Ground (0.0m)", status: "Stable", score: 85, color: "#4E878C", inspected: "Jun 2026", defaultRisk: { condition: 24, deterioration: 18, hazard: 65, environment: 50, significance: 96 }, action: "Kutch salt-desert windbreak fence maintenance & monitoring" }
    ]
  };

  const getComponentsForSite = (idx) => {
    const validIdx = typeof idx === 'number' && idx >= 0 && idx < 12 ? idx : 0;
    return siteComponents[validIdx] || siteComponents[0];
  };

  const components = getComponentsForSite(activeSite);

  // Current User Session State (Official ASI or Citizen Sentinel)
  const [currentUser, setCurrentUser] = useState(null);

  // Explainable Risk State
  const [riskFactors, setRiskFactors] = useState(
    components[0]?.defaultRisk || { condition: 50, deterioration: 50, hazard: 50, environment: 50, significance: 90 }
  );

  const handleSelectSite = async (idx) => {
    setActiveSite(idx);
    setActiveComponent(0);
    const newComps = getComponentsForSite(idx);
    if (newComps && newComps[0]?.defaultRisk) {
      setRiskFactors(newComps[0].defaultRisk);
    }
    const targetSite = sites[idx] || sites[0];
    if (targetSite && targetSite.coords && Array.isArray(targetSite.coords)) {
      try {
        const [lat, lon] = targetSite.coords;
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/weather/live?lat=${lat}&lon=${lon}`);
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
        // Fallback gracefully
      }
    }
  };

  // Always scroll to top whenever viewMode, activeTab, or activeSite changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, [viewMode, activeTab, activeSite]);

  const handleLaunchMonumentStudio = (idx = 0, targetTab = 'twin') => {
    handleSelectSite(idx);
    navigateTo('studio', { site: idx, tab: targetTab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Field Sentinel Incidents Feed State with Database & LocalStorage Persistence
  const [fieldReports, setFieldReports] = useState(() => {
    try {
      const saved = localStorage.getItem('heritage_shield_field_reports');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [
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
    ];
  });

  // Fetch reports from backend SQLite database on mount
  useEffect(() => {
    const fetchReportsFromDb = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/reports`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFieldReports(data);
            try {
              localStorage.setItem('heritage_shield_field_reports', JSON.stringify(data));
            } catch (err) {}
          }
        }
      } catch (err) {
        console.log('Using local cached reports', err);
      }
    };
    fetchReportsFromDb();
  }, []);

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

  const handleAddReport = async (newReport) => {
    // 1. Immediately update UI & LocalStorage
    const updated = [newReport, ...fieldReports];
    setFieldReports(updated);
    try {
      localStorage.setItem('heritage_shield_field_reports', JSON.stringify(updated));
    } catch (err) {}

    // 2. Persist directly to backend SQLite database
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      });
    } catch (err) {
      console.warn('Backend SQLite sync offline, persisted in local edge storage:', err);
    }
  };

  // Compute live auditable risk
  const computedRisk = Math.round(
    0.30 * (riskFactors?.condition || 50) +
    0.25 * (riskFactors?.deterioration || 50) +
    0.15 * (riskFactors?.hazard || 50) +
    0.15 * (riskFactors?.environment || 50) +
    0.15 * (riskFactors?.significance || 90)
  );

  const curSite = (sites && sites[activeSite]) || (sites && sites[0]) || { name: "Qutub Minar Complex", state: "Delhi", color: "#E05A47", coords: [28.5244, 77.1855] };
  const curComp = (components && components[activeComponent]) || (components && components[0]) || {
    name: "North Façade Wall (Main Shaft)",
    code: "C-01",
    score: 62,
    color: "#E05A47",
    action: "Structural scaffolding inspection & moisture-barrier sealing within 30 days",
    elevation: "+12.0m",
    inspected: "Apr 2026",
    status: "Critical"
  };

  // ---------------------------------------------------------------------------
  // 🏛️ VIEW 1: IMMERSIVE NATIONAL LANDING PAGE
  // ---------------------------------------------------------------------------
  if (viewMode === 'landing') {
    return (
      <LandingPageView
        onEnterDashboard={() => {
          navigateTo('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectMonument={handleLaunchMonumentStudio}
        onOpenStudio={() => {
          navigateTo('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        sites={sites}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // 🗺️ VIEW 2: MONUMENT SELECTION PORTAL & GIS RADAR (MAP PAGE)
  // ---------------------------------------------------------------------------
  if (viewMode === 'portal') {
    return (
      <MonumentPortalView
        sites={sites}
        onSelectMonument={handleLaunchMonumentStudio}
        onBackToLanding={() => {
          goBack();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        liveWeather={liveWeather}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // 🏛️ VIEW 3: DEDICATED MONUMENT STUDIO & COMMAND CENTER
  // ---------------------------------------------------------------------------
  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark-theme bg-[#120A06] text-[#FAF5ED]' : 'bg-[#F0E7DA] text-[#24160E]'} font-sans antialiased selection:bg-[#BA532B] selection:text-white flex flex-col museum-bg transition-colors duration-500`}>
      
      {/* 🏛️ 1. TOP ENTERPRISE HEADER / STUDIO NAVIGATION BAR */}
      <header className="sticky top-0 z-[9999] bg-[#FAF5ED]/90 backdrop-blur-2xl border-b border-[#DACDB8] px-6 py-3.5 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4">
          
          {/* Brand & Universal Return Navigation Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Universal Back Button */}
            <BackButton label="Back" />

            {/* Clickable Home Brand */}
            <HeritageShieldLogo
              size="sm"
              showText={true}
              textClassName="text-sm tracking-wider font-serif font-bold text-[#24160E]"
              onClick={() => navigateTo('landing')}
            />

            <button
              onClick={() => navigateTo('portal')}
              className="px-3.5 py-1.5 rounded-xl frosted-btn text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Return to National Map & Directory"
            >
              <span>🗺️</span>
              <span>Map Portal</span>
            </button>
          </div>

          {/* Active Heritage Site Switcher Pill */}
          <button
            onClick={() => setIsAssetSwitcherOpen(true)}
            className="flex items-center gap-3 bg-white hover:bg-[#FAF5ED] border border-[#DACDB8] hover:border-[#BA532B]/60 px-4 py-2 rounded-2xl transition shadow-sm group cursor-pointer"
            title="Switch Heritage Site"
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow"
              style={{ backgroundColor: curSite.color }}
            />
            <div className="text-left">
              <div className="text-[9px] font-mono uppercase text-[#7A5B49] font-semibold flex items-center gap-1.5">
                <span>Active Heritage Site:</span>
              </div>
              <div className="text-xs font-serif font-bold text-[#24160E] group-hover:text-[#BA532B] flex items-center gap-1.5">
                <span>{curSite.name}</span>
                <span className="text-[10px] text-[#7A5B49] font-mono">({curSite.state})</span>
                <span className="text-[10px] text-[#BA532B] font-mono font-bold">▼ Switch</span>
              </div>
            </div>
          </button>

          {/* Action CTAs & Sun Theme Toggle */}
          <div className="flex items-center gap-2.5">
            {/* ☀️ Sun Theme Toggle Button (Icon Only) */}
            <button
              onClick={toggleTheme}
              title="Toggle Heritage Theme"
              className="p-2.5 rounded-xl bg-white border border-[#DACDB8] hover:border-[#BA532B] text-[#BA532B] shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Theme Toggle"
            >
              <Sun className={`w-4 h-4 transition-transform duration-500 ${isDarkTheme ? 'rotate-180 text-[#C29244]' : 'text-[#BA532B]'}`} />
            </button>

            <button
              onClick={() => setIsLiveIngestOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-800 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
              <span>🌐 Live Ingest</span>
            </button>

            <button
              onClick={() => setIsFieldReportOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Field Sentinel</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 rounded-xl terracotta-btn text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>📄 ASI Dossier</span>
            </button>
          </div>

        </div>
      </header>

      {/* 🎛️ 2. STUDIO CONSOLE TABS (PERMANENTLY STICKY OVERLAY) */}
      <div className="sticky top-[60px] z-[9998] bg-[#FAF5ED]/95 dark:bg-[#160D08]/95 backdrop-blur-2xl border-b border-[#DACDB8] dark:border-[#3D2416] px-6 shadow-sm transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 overflow-x-auto py-2.5">
          
          <button
            onClick={() => {
              setActiveTab('twin');
              window.scrollTo(0, 0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'twin'
                ? 'bg-[#FAF5ED] text-[#BA532B] border border-[#BA532B] shadow-sm'
                : 'text-[#7A5B49] hover:text-[#24160E] hover:bg-[#FAF5ED] border border-transparent'
            }`}
          >
            <span className="text-sm">🏛️</span>
            <span>3D Living Twin Studio</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vision');
              window.scrollTo(0, 0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'vision'
                ? 'bg-[#FAF5ED] text-[#BA532B] border border-[#BA532B] shadow-sm'
                : 'text-[#7A5B49] hover:text-[#24160E] hover:bg-[#FAF5ED] border border-transparent'
            }`}
          >
            <span className="text-sm">🔍</span>
            <span>AI Defect Diagnostics Lab</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('risk');
              window.scrollTo(0, 0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'risk'
                ? 'bg-[#FAF5ED] text-[#BA532B] border border-[#BA532B] shadow-sm'
                : 'text-[#7A5B49] hover:text-[#24160E] hover:bg-[#FAF5ED] border border-transparent'
            }`}
          >
            <span className="text-sm">📊</span>
            <span>Risk & 2030 Predictive Lab</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('queue');
              window.scrollTo(0, 0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'queue'
                ? 'bg-[#FAF5ED] text-[#BA532B] border border-[#BA532B] shadow-sm'
                : 'text-[#7A5B49] hover:text-[#24160E] hover:bg-[#FAF5ED] border border-transparent'
            }`}
          >
            <span className="text-sm">📋</span>
            <span>Authority Queue & Sentinel Feed</span>
          </button>

        </div>
      </div>

      {/* 🚀 4. MAIN WORKSPACE CONSOLE CONTENT */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* CONSOLE 1: 3D LIVING DIGITAL TWIN STUDIO                                 */}
        {/* ========================================================================= */}
        {activeTab === 'twin' && (
          <div className="space-y-6">
            
            {/* Top Studio Control Bar */}
            <div className="bg-white border border-[#E6E1D8] p-5 rounded-2xl space-y-3 shadow-sm">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#181B1F] tracking-wide">
                    {curSite.name} — Living 3D Digital Twin
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowPhotogrammetryDrawer(!showPhotogrammetryDrawer)}
                    className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E6E1D8] text-sky-700 text-xs font-mono font-semibold hover:bg-sky-50 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>🏗️ {showPhotogrammetryDrawer ? 'Hide' : 'Show'} Scan-to-Twin Pipeline</span>
                  </button>
                </div>
              </div>

              {/* Clean Organized Telemetry Strip */}
              <div className="pt-3 border-t border-[#E6E1D8] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#4B5563]">
                <div className="flex items-center gap-5 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#7A5B49] uppercase text-[10px] font-bold">🌋 Hazard:</span>
                    <strong className="text-amber-800 font-semibold">{curSite.seismicZone}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#7A5B49] uppercase text-[10px] font-bold">🌦️ Weather:</span>
                    <strong className="text-sky-800 font-semibold">{liveWeather.temp} · {liveWeather.humidity} RH</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#7A5B49] uppercase text-[10px] font-bold">📍 WGS84:</span>
                    <span className="text-[#181B1F] font-medium">
                      {Array.isArray(curSite.coords) ? `${curSite.coords[0]}° N, ${curSite.coords[1]}° E` : curSite.coords}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Photogrammetry Drawer */}
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
                <div className="bg-white dark:bg-[#1E120B] border border-[#DACDB8] dark:border-[#3D2416] rounded-2xl p-5 space-y-3 shadow-md">
                  <div className="flex justify-between items-center border-b border-[#DACDB8] dark:border-[#3D2416] pb-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#BA532B] font-bold">
                      Architectural Nodes
                    </span>
                    <span className="text-[10px] font-mono text-[#7A5B49] dark:text-gray-400">
                      {components.length} Monitored Segments
                    </span>
                  </div>

                  <div className="space-y-2">
                    {components.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectComponent(idx)}
                        className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition cursor-pointer ${
                          activeComponent === idx
                            ? 'border-[#BA532B] bg-[#BA532B]/10 text-[#24160E] dark:text-[#FAF5ED] shadow-sm font-semibold'
                            : 'border-[#DACDB8] dark:border-[#3D2416] bg-[#FAF5ED]/50 dark:bg-[#160D08] text-[#7A5B49] dark:text-gray-400 hover:border-[#BA532B] hover:text-[#24160E] dark:hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#BA532B] bg-white dark:bg-black/60 px-2 py-0.5 rounded border border-[#DACDB8] dark:border-[#3D2416]">
                              {c.code}
                            </span>
                            <span className="font-medium text-xs text-[#24160E] dark:text-gray-200">{c.name}</span>
                          </div>
                          <div className="text-[10px] font-mono text-[#7A5B49] dark:text-gray-400 mt-1">
                            Elevation: {c.elevation} · Inspected: {c.inspected}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-bold" style={{ color: c.color }}>
                            {c.score}/100
                          </span>
                          <div
                            className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase mt-1 inline-block border"
                            style={{ 
                              backgroundColor: `${c.color}20`, 
                              color: c.color,
                              borderColor: `${c.color}50`
                            }}
                          >
                            {c.status}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Node Details Card */}
                <div className="bg-white dark:bg-[#1E120B] border border-[#DACDB8] dark:border-[#3D2416] rounded-2xl p-5 space-y-4 shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#BA532B] font-bold tracking-wider">Node Telemetry Profile</span>
                      <h3 className="text-base font-serif font-bold text-[#24160E] dark:text-[#FAF5ED] mt-0.5">
                        {curComp.name} ({curComp.code})
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-serif font-bold" style={{ color: curComp.color }}>
                        {curComp.score}
                      </div>
                      <span className="text-[9px] font-mono text-[#7A5B49] dark:text-gray-400">Health Index</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF5ED] dark:bg-[#160D08] p-3 rounded-xl border border-[#DACDB8] dark:border-[#3D2416] space-y-1">
                    <span className="text-[10px] font-mono text-[#BA532B] font-bold uppercase tracking-wider block">
                      Mandated Conservation Action
                    </span>
                    <p className="text-xs text-[#4D3425] dark:text-gray-200 font-sans leading-relaxed">
                      {curComp.action}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-[#FAF5ED] dark:bg-[#160D08] p-2.5 rounded border border-[#DACDB8] dark:border-[#3D2416]">
                      <span className="text-[9px] text-[#7A5B49] uppercase block font-bold">Vulnerability Risk</span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold text-sm">{computedRisk}/100</span>
                    </div>
                    <div className="bg-[#FAF5ED] dark:bg-[#160D08] p-2.5 rounded border border-[#DACDB8] dark:border-[#3D2416]">
                      <span className="text-[9px] text-[#7A5B49] uppercase block font-bold">Spatial Coordinates</span>
                      <span className="text-[#24160E] dark:text-gray-300 font-bold text-xs">{curComp.elevation}</span>
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
            
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  AI Visual Condition Diagnostics — {curComp.name} ({curSite.name})
                </h2>
              </div>
            </div>

            {/* Bounding Box Defect Canvas */}
            <InspectionPhotoViewer siteData={curSite} activeComponent={curComp.name} />

            {/* Longitudinal Delta Comparison Strip */}
            <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#C29244] font-bold tracking-wider">
                    Longitudinal Delta Analysis · Computer Vision Forensic Scrubbing
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#F3EFE6] mt-0.5">
                    Temporal Crack Progression (2024 Baseline vs. 2026 Inspection)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#C29244] font-bold bg-[#14171C] px-3 py-1 rounded border border-[#2B313D]">
                    Epoch: {sliderPos === 0 ? 'Jan 2024 (Baseline)' : sliderPos === 100 ? 'Apr 2026 (Live Survey)' : `Cycle ${(2024 + (sliderPos / 100) * 2).toFixed(1)}`}
                  </span>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded border ${
                    sliderPos >= 70 ? 'bg-rose-950/60 text-rose-300 border-rose-800/40' : 'bg-amber-950/60 text-amber-300 border-amber-800/40'
                  }`}>
                    Measured Growth: +{((sliderPos / 100) * 38.2).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="bg-[#0E1013] p-5 rounded-xl border border-[#1E2228] space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                    <span className={sliderPos === 0 ? 'text-[#C29244] font-bold' : ''}>◄ 2024 Baseline (18.2 cm · 1.1 mm)</span>
                    <span className="text-[#C29244] font-semibold">● Slide to scrub temporal evolution ({sliderPos}%) ●</span>
                    <span className={sliderPos === 100 ? 'text-rose-400 font-bold' : ''}>2026 Inspection (25.1 cm · 2.2 mm) ►</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="w-full accent-[#C29244] h-2.5 bg-[#1E2228] rounded-lg cursor-ew-resize transition-all"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
                    <span>2024 Baseline Laser Mesh</span>
                    <span>2025 Interim Monsoonal Cycle</span>
                    <span>2026 High-Resolution Photogrammetry</span>
                  </div>
                </div>

                <div className="bg-[#14171C] p-3 rounded-lg border border-[#222730] flex items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-gray-400">Forensic Crack Path:</span>
                  <div className="flex-1 bg-[#090A0C] h-4 rounded-full overflow-hidden border border-[#2B313D] relative flex items-center p-0.5">
                    <div
                      className="h-full rounded-full transition-all duration-100 bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 shadow"
                      style={{ width: `${Math.max(12, sliderPos)}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white drop-shadow">
                      {(18.2 + (sliderPos / 100) * 6.9).toFixed(1)} cm length · {(1.1 + (sliderPos / 100) * 1.1).toFixed(2)} mm aperture
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Crack Length</div>
                    <div className="text-lg font-bold text-rose-400 mt-0.5">
                      {(18.2 + (sliderPos / 100) * 6.9).toFixed(1)} cm
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Delta: +{((sliderPos / 100) * 6.9).toFixed(1)} cm
                    </div>
                  </div>

                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Aperture Width</div>
                    <div className="text-lg font-bold text-amber-400 mt-0.5">
                      {(1.1 + (sliderPos / 100) * 1.1).toFixed(2)} mm
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Initial: 1.10 mm
                    </div>
                  </div>

                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Velocity Rate</div>
                    <div className="text-lg font-bold text-sky-400 mt-0.5">
                      {(2.1 + (sliderPos / 100) * 1.35).toFixed(2)} cm/yr
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {sliderPos >= 50 ? 'Accelerating' : 'Baseline pace'}
                    </div>
                  </div>

                  <div className="bg-[#121418] p-3 rounded-lg border border-[#1E2228]">
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Capillary Saturation</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">
                      {(8.4 + (sliderPos / 100) * 6.4).toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-gray-400">
                      Pore moisture
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 3: NATIONAL GEOSPATIAL GIS COMMAND RADAR                         */}
        {/* ========================================================================= */}
        {activeTab === 'gis' && (
          <div className="space-y-6">
            
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#4E878C] uppercase tracking-widest font-bold">
                  National Geospatial Policy (DST) · Seismic & Monsoon Multi-Hazard Overlay
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  National Heritage GIS & Multi-Hazard Spatial Radar
                </h2>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-gray-400 bg-[#0E1013] px-3 py-1.5 rounded-lg border border-[#1E2228]">
                  Focused Site: <strong className="text-[#C29244]">{curSite.name}</strong>
                </span>
                <span className="text-gray-400 bg-[#0E1013] px-3 py-1.5 rounded-lg border border-[#1E2228]">
                  Grid Standard: <strong className="text-sky-400">ISRO Bhuvan WGS84</strong>
                </span>
              </div>
            </div>

            {/* Interactive Leaflet Map with Bhuvan Satellite Mode */}
            <HeritageGisMap
              activeSiteIndex={activeSite}
              onSelectSite={(idx, targetTab = 'twin') => {
                handleSelectSite(idx);
                setActiveTab(targetTab);
              }}
            />


          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 4: RISK ENGINE & 2028 PREDICTIVE SIMULATOR                        */}
        {/* ========================================================================= */}
        {activeTab === 'risk' && (
          <div className="space-y-6">
            
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C29244] uppercase tracking-widest font-bold">
                  Explainable Multi-Criteria Formula · ISO 31000 Risk Framework
                </span>
                <h2 className="text-lg font-serif font-bold text-[#F3EFE6] mt-0.5">
                  Auditable Heritage Risk & Predictive Decay Lab — {curSite.name}
                </h2>
              </div>

              <div className="text-xs font-mono bg-[#0E1013] px-3.5 py-1.5 rounded-lg border border-[#1E2228] text-gray-300">
                Formula: <strong className="text-[#C29244]">R = 0.30C + 0.25D + 0.15H + 0.15E + 0.15S</strong>
              </div>
            </div>

            {/* Explainable Formula Sliders Grid */}
            <div className="bg-[#121418] border border-[#1E2228] rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-3.5">
                
                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>C</strong> — Condition Severity (Weight: 30%)</span>
                    <span className="font-mono text-[#C29244] font-bold">{riskFactors.condition}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.condition}
                    onChange={(e) => setRiskFactors({ ...riskFactors, condition: Number(e.target.value) })}
                    className="w-full accent-[#C29244] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>D</strong> — Deterioration Velocity (Weight: 25%)</span>
                    <span className="font-mono text-[#C29244] font-bold">{riskFactors.deterioration}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.deterioration}
                    onChange={(e) => setRiskFactors({ ...riskFactors, deterioration: Number(e.target.value) })}
                    className="w-full accent-[#C29244] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>H</strong> — Natural Hazard & Seismic Exposure (Weight: 15%)</span>
                    <span className="font-mono text-[#C29244] font-bold">{riskFactors.hazard}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.hazard}
                    onChange={(e) => setRiskFactors({ ...riskFactors, hazard: Number(e.target.value) })}
                    className="w-full accent-[#C29244] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>E</strong> — Environmental Stress & Weather (Weight: 15%)</span>
                    <span className="font-mono text-[#C29244] font-bold">{riskFactors.environment}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.environment}
                    onChange={(e) => setRiskFactors({ ...riskFactors, environment: Number(e.target.value) })}
                    className="w-full accent-[#C29244] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>

                <div className="bg-[#0E1013] p-3 rounded-lg border border-[#1E2228]">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span><strong>S</strong> — Archaeological & National Significance (Weight: 15%)</span>
                    <span className="font-mono text-[#C29244] font-bold">{riskFactors.significance}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskFactors.significance}
                    onChange={(e) => setRiskFactors({ ...riskFactors, significance: Number(e.target.value) })}
                    className="w-full accent-[#C29244] h-1.5 bg-[#1E2228] rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Score Card */}
              <div className="lg:col-span-5 bg-[#0A0C12] border border-[#232A38] rounded-2xl p-6 text-center flex flex-col justify-center items-center shadow-xl heritage-card-glow">
                <span className="text-[10px] font-mono uppercase text-[#C29244] tracking-wider font-bold">
                  Computed Vulnerability Risk (ISO 31000)
                </span>
                <div className="text-6xl font-serif font-bold text-rose-500 my-3">
                  {computedRisk} <span className="text-xs font-sans text-gray-400 font-normal">/ 100</span>
                </div>
                <span className={`text-xs px-4 py-1.5 rounded-full font-mono font-bold uppercase tracking-wider ${
                  computedRisk >= 70
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : computedRisk >= 45
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {computedRisk >= 70 ? '● CRITICAL · EMERGENCY INTERVENTION' : computedRisk >= 45 ? '▲ WATCH · RE-INSPECT' : '✔ STABLE'}
                </span>

                <button
                  onClick={() => setIsReportOpen(true)}
                  className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-[#C29244] to-[#D4AF37] text-[#0A0C10] font-mono font-bold text-xs hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-[#E5C07B]/40"
                >
                  <span>📄 Generate Official ASI Dossier</span>
                </button>
              </div>
            </div>

            {/* 💰 Preventive Conservation ROI Analysis */}
            {(() => {
              const monumentCost = getMonumentCostData(curSite.id || curSite.name, computedRisk);
              return (
                <div className="bg-white dark:bg-[#1E120B] border border-[#DACDB8] dark:border-[#3D2416] rounded-2xl p-6 space-y-5 shadow-md">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#BA532B] uppercase tracking-widest font-bold">
                        Cost-Benefit Intelligence · Preventive vs Reactive
                      </span>
                      <h3 className="text-lg font-serif font-bold text-[#24160E] dark:text-[#FAF5ED] mt-0.5">
                        Preventive Conservation ROI Analysis — {curSite.name} ({monumentCost.material})
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#BA532B]/10 text-[#BA532B] border border-[#BA532B]/30 font-bold">
                        AI Cost Model: {monumentCost.costMultiplier}x ROI
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Reactive Cost */}
                    <div className="bg-[#FAF5ED] dark:bg-[#160D08] border border-rose-600/30 rounded-2xl p-5 text-center shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-rose-700 dark:text-rose-400 tracking-wider font-bold">Reactive Restoration Cost</span>
                      <div className="text-3xl font-bold text-rose-600 dark:text-rose-400 font-mono mt-2">₹{monumentCost.reactiveCostCr} Cr</div>
                      <p className="text-[10px] text-[#7A5B49] dark:text-gray-400 mt-2 font-mono leading-relaxed">Emergency rebuilding, heavy structural shoring, irreversible stone loss</p>
                    </div>

                    {/* Preventive Cost */}
                    <div className="bg-[#FAF5ED] dark:bg-[#160D08] border border-emerald-600/30 rounded-2xl p-5 text-center shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 tracking-wider font-bold">Preventive Monitoring Cost</span>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-2">₹{monumentCost.preventiveCostCr} Cr</div>
                      <p className="text-[10px] text-[#7A5B49] dark:text-gray-400 mt-2 font-mono leading-relaxed">IoT sensors, routine drone photogrammetry, early micro-grouting</p>
                    </div>

                    {/* Net Savings */}
                    <div className="bg-[#FAF5ED] dark:bg-[#160D08] border border-[#BA532B]/40 rounded-2xl p-5 text-center shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-[#BA532B] tracking-wider font-bold">Net National Savings</span>
                      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-300 font-mono mt-2">₹{monumentCost.savingsCr} Cr</div>
                      <div className="mt-2">
                        <div className="w-full bg-[#DACDB8] dark:bg-[#2A180E] rounded-full h-2.5 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-2.5 rounded-full transition-all duration-700 shadow" style={{ width: `${monumentCost.efficiencyPct}%` }} />
                        </div>
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold mt-1.5 inline-block">{monumentCost.efficiencyPct}% Cost Efficiency</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Extreme Climate & Disaster Scenario Simulator */}
            <ScenarioSimulator
              activeSite={curSite}
              activeComponent={curComp}
              baselineRisk={computedRisk}
            />

            {/* Longitudinal Analytics & 2030 Forecast */}
            <LongitudinalAnalytics
              siteData={curSite}
              activeComponent={curComp.name}
              materialTypology={curSite.material || 'sandstone'}
              seismicZone={curSite.seismicZone || 'Zone IV'}
              computedRisk={computedRisk}
            />


          </div>
        )}

        {/* ========================================================================= */}
        {/* CONSOLE 5: AUTHORITY PRIORITY QUEUE & FIELD SENTINEL DISPATCH             */}
        {/* ========================================================================= */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            
            <div className="flex flex-wrap justify-between items-center gap-4 bg-[#121418] border border-[#1E2228] p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-mono text-[#C29244] uppercase tracking-widest font-bold">
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
                  className="px-3.5 py-1.5 rounded-lg bg-[#181B22] border border-[#2B313D] text-[#C29244] text-xs font-mono font-semibold hover:text-white transition"
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
                  Sorted by Explanatory Vulnerability Score (Highest Risk First)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="uppercase font-mono text-gray-400 border-b border-[#1E2228] bg-[#0E1013]">
                    <tr>
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Component</th>
                      <th className="py-3 px-4">Heritage Site</th>
                      <th className="py-3 px-4">Risk Score</th>
                      <th className="py-3 px-4">Urgency Status</th>
                      <th className="py-3 px-4">Mandated Action</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2228]">
                    {priorityQueue.map((item, idx) => (
                      <tr key={idx} className={idx === 0 ? "bg-rose-950/15" : "hover:bg-[#181B22]/50"}>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#C29244]">#{item.rank}</td>
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
                            className="text-[11px] font-mono px-2 py-1 rounded bg-[#0E1013] border border-[#1E2228] text-[#C29244] hover:bg-[#C29244]/20 transition"
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
                              ? 'bg-[#C29244]/20 text-[#C29244] border border-[#C29244]/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {report.role === 'officer' ? '👷 ASI Officer' : '🧑‍🤝‍🧑 Citizen Sentinel'}
                          </span>
                          <span className="text-xs font-mono text-gray-500">{report.id}</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">{report.timestamp}</span>
                      </div>

                      <h4 className="text-sm font-serif font-bold text-gray-100 mt-2">
                        {report.monumentName} · <span className="text-[#C29244] font-mono font-normal text-xs">{report.component}</span>
                      </h4>

                      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed bg-[#121418] p-2.5 rounded border border-[#1E2228]">
                        \"{report.notes}\"
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
      {isReportOpen && (
        <AsiReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          site={curSite}
          component={curComp}
          riskFactors={riskFactors}
          computedRisk={computedRisk}
        />
      )}

      {/* 📱 FIELD REPORT MODAL */}
      {isFieldReportOpen && (
        <FieldReportModal
          isOpen={isFieldReportOpen}
          onClose={() => setIsFieldReportOpen(false)}
          onSubmitReport={handleAddReport}
          monuments={sites}
        />
      )}

      {/* 🌐 AUTONOMOUS LIVE INGESTION & EXAMINATION MODAL */}
      {isLiveIngestOpen && (
        <LiveIngestModal
          isOpen={isLiveIngestOpen}
          onClose={() => setIsLiveIngestOpen(false)}
          currentSite={curSite}
        />
      )}

      {/* 🏛️ NATIONAL ASSET MATRIX SWITCHER MODAL */}
      {isAssetSwitcherOpen && (
        <AssetSwitcherModal
          isOpen={isAssetSwitcherOpen}
          onClose={() => setIsAssetSwitcherOpen(false)}
          activeSiteIndex={activeSite}
          onSelectSite={handleSelectSite}
        />
      )}

      {/* 🏛️ NATIONAL HERITAGE SOVEREIGNTY FOOTER */}
      <footer className="border-t border-[#1E2228] bg-[#07080A] py-8 px-6 mt-auto">
        <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-gray-400">
          
          <div className="flex items-center gap-3">
            <HeritageShieldLogo size="sm" showText={true} />
            <span className="text-gray-600">|</span>
            <span>Smart India Hackathon 2026 · Team Qualified (Team ID: 031)</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <span>Standard: ISRO Bhuvan WGS84</span>
            <span>Framework: ISO 31000:2018</span>
            <span>Authority: Archaeological Survey of India (ASI)</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
