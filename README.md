# 🏛️ HERITAGE SHIELD (SIH 2026 — Team 031 / Qualified)
> **AI-Assisted, Expert-Validated Predictive Conservation & Living Digital Twin Platform for Built Heritage**  
> *Domain: Simulation and Digital Twin (Category: Software) · Ministry of Culture & Archaeological Survey of India (ASI)*

---

## 🎯 Executive Overview
India preserves over **3,690+ Centrally Protected Monuments of National Importance**. Current conservation workflows remain primarily **reactive, manual, and episodic**—often discovering internal moisture saturation, tensile shear fissures, and biological degradation only after catastrophic material failure.

**Heritage Shield** solves this challenge with a **6-stage closed-loop architecture**:
$$\text{Observe (GIS/Images)} \rightarrow \text{Digitise (3D Twin)} \rightarrow \text{Assess (YOLO/CV)} \rightarrow \text{Track (Temporal Delta)} \rightarrow \text{Prioritize (Risk Engine)} \rightarrow \text{Act (ASI Work Order)}$$

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

### Step 1: Start Python FastAPI Backend
```bash
cd "heritage-shield-backend"
./venv/bin/python -m uvicorn app.main:app --reload --port 8000
```
- **REST API Live**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Database**: SQLite with 13 tables (`heritage_shield.db`) auto-seeded on launch.

### Step 2: Start React Frontend
```bash
cd "heritage-shield-ui"
npm run dev
```
- **Web UI Live**: `http://localhost:5173`

---

## 🌟 Delivered Modules & Capabilities

| Module | Feature | Technical Stack |
| :---: | :--- | :--- |
| **00** | 🗺️ **National Heritage GIS & Multi-Hazard Map** | Leaflet dark tiles, GeoJSON, BIS IS 1893 Seismic Zone IV/V & Monsoon hazard layers |
| **01** | 🏛️ **3D Living Digital Twin** | Three.js WebGL procedural twin (Stone, LiDAR wireframe, and Thermal Heatmap inspection modes) |
| **01B**| 🏗️ **Automated Photogrammetry Scan-to-Twin** | COLMAP Structure-from-Motion simulator (SIFT features, sparse cloud, Poisson mesh decimation) |
| **02** | 🔍 **AI Visual Damage Assessment** | YOLOv8 + OpenCV (Laplacian blur, Bilateral + Canny edge cracks, HSV dampness, ExG biological growth) |
| **03** | ⏱️ **Temporal Change Detection** | Multi-epoch slider showing $+38.2\%$ crack extension and $3.45\text{ cm/yr}$ deterioration velocity |
| **03B**| 📈 **Longitudinal Analytics & 2028 Forecast** | 2020–2028 Time-series ARIMA modeling with $93.4\%$ cost savings ROI calculation |
| **04** | 📐 **Explainable Heritage Risk Engine** | $R = 0.30C + 0.25D + 0.15H + 0.15E + 0.15S$ (Normalized $0–100$ with live weight tuning) |
| **04B**| 🌪️ **Extreme Climate & Disaster Simulator** | What-If Stress Testing (+100% Monsoon surge, 7.5M Seismic event, 60Hz Urban vibration) |
| **05** | 📋 **Authority Priority Intervention Queue** | Ranked triage decision table across monitored national monuments |
| **06** | 📱 **Heritage Sentinel Ground Telemetry** | Mobile-responsive Field Officer & Crowdsourced Visitor incident reporting feed |
| **DOC**| 📄 **Official ASI Work-Order PDF & JSON Export** | Form HS-2026 with Government letterhead, print-to-PDF, and machine-readable dossier |

---

## 🗄️ Database Architecture (SQLite / SQLAlchemy)
```text
Site (Qutub Minar, Hampi, Golconda)
 └── Asset (Minaret Main Tower)
      └── Component (C-01 North Façade, C-02 Balcony, C-03 Plinth, C-04 Finial)
           ├── Images (Photogrammetric raw captures)
           ├── Observations (Field inspection notes)
           ├── Damage Detections (Normalized bounding boxes & metric estimations)
           ├── Risk Scores (Explainable formula calculations)
           ├── Condition History (2020–2028 multi-epoch time series)
           └── Expert Validations (Human-in-the-Loop approval audit ledger)
```

---

## 📑 Hackathon Defense & Presentation Kit
Complete slide-by-slide scripts and answers to the **7 Deadly Judge Trap Questions** are available in:
- [`presentation_and_defense_guide.md`](file:///Users/nidhishagarwal/.gemini/antigravity/brain/1dc9c51f-c2da-4612-8164-b110bc248221/presentation_and_defense_guide.md)
- [`walkthrough.md`](file:///Users/nidhishagarwal/.gemini/antigravity/brain/1dc9c51f-c2da-4612-8164-b110bc248221/walkthrough.md)

---
*Smart India Hackathon 2026 · Team Qualified (Team ID: 031) · Somaiya Vidyavihar University*
