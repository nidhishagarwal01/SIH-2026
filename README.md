# 🛡️ Heritage Shield (SIH 2026)
### AI-Powered Multi-Scale Predictive Conservation & Resilient Digital Twin for Built Heritage
> *Smart India Hackathon 2026 · Team Qualified (Team ID: 031)*

---

## 🎯 Executive Overview
India preserves over **3,690+ Centrally Protected Monuments of National Importance** and **45 UNESCO World Heritage Sites**. Current conservation workflows remain primarily **reactive, manual, and episodic**—often discovering internal moisture saturation, tensile shear fissures, and biological degradation only after catastrophic material failure.

**Heritage Shield** solves this challenge with a **6-stage closed-loop architecture**:
$$\text{Observe (GIS/Images)} \rightarrow \text{Digitise (3D Twin)} \rightarrow \text{Assess (YOLO/CV)} \rightarrow \text{Track (Temporal Delta)} \rightarrow \text{Prioritize (Risk Engine)} \rightarrow \text{Act (ASI Work Order)}$$

---

## 🚀 How to Run & Share with Your Team

You can run Heritage Shield using **Docker** (recommended for zero-setup 1-click launch) or **Git / Local CLI**.

---

### 🐳 Method A: 1-Click Launch with Docker (Zero Installation)
If your teammates have **Docker Desktop** installed, they do not need to install Python, OpenCV, or Node.js.

```bash
# 1. Clone the repository
git clone <your-github-repo-url>
cd "SIH 26"

# 2. Start both Backend & Frontend in 1 command
docker compose up --build
```
- 🏛️ **Frontend Web Application**: `http://localhost:5173`
- ⚡ **FastAPI Backend & Swagger**: `http://localhost:8000/docs`

---

### 💻 Method B: Local CLI / Dev Setup

#### 1. One-Click Launcher (Mac/Linux):
```bash
./run_demo.sh
```

#### 2. Manual CLI Step-by-Step:
**Terminal 1 — Backend:**
```bash
cd heritage-shield-backend
python3 -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 — Frontend:**
```bash
cd heritage-shield-ui
npm install
npm run dev
```

---

### 🧪 Automated Verification Test Suite
Run the 11-test backend verification suite:
```bash
cd heritage-shield-backend
./venv/bin/python test_suite.py
```
*(Runs 11/11 automated end-to-end tests for OpenCV, SQLite, Open-Meteo, USGS seismic stream, and ISO 31000 risk engine).*

---

## 🌟 Key Platform Capabilities

| Module | Feature | Technical Stack |
| :---: | :--- | :--- |
| **00** | 🗺️ **National Heritage GIS & Multi-Hazard Map** | Leaflet dark tiles, GeoJSON, BIS IS 1893 Seismic Zone IV/V & Monsoon flood overlays across 24+ UNESCO sites |
| **01** | 🏛️ **3D Living Digital Twin** | Three.js WebGL procedural twin (9 architectural typologies: Mughal, Dravidian, Nagara, Cave, Stupa, Bastion, Stepwell) |
| **02** | 🔍 **AI Visual Damage Assessment** | OpenCV 4.10 real-pixel filters (Laplacian variance, Bilateral Canny edge contours, HSV moisture decomposition) |
| **03** | ⏱️ **Temporal Change Detection** | Multi-epoch slider showing $+38.2\%$ crack extension and $3.45\text{ cm/yr}$ deterioration velocity |
| **04** | 📐 **Explainable Heritage Risk Engine** | $R = 0.30C + 0.25D + 0.15H + 0.15E + 0.15S$ (ISO 31000 standard with live weights) |
| **05** | 🌐 **Autonomous Live Data Fetcher** | Real-time synchronization with Open-Meteo meteorological stream and USGS/NCS earthquake feeds |
| **06** | 📋 **Authority Priority Intervention Queue** | Ranked triage decision table across monitored national monuments |
| **07** | 📱 **Heritage Sentinel Ground Telemetry** | Mobile-responsive Field Officer & Crowdsourced Visitor incident reporting feed |
| **DOC**| 📄 **Official ASI Work-Order PDF & JSON Export** | Form HS-2026 with Government letterhead, print-to-PDF, and machine-readable dossier |

---

## 🗄️ Database Architecture (SQLite / SQLAlchemy)
```text
Site (Taj Mahal, Qutub Minar, Hampi, Golconda, Konark, etc.)
 └── Asset (Main Mausoleum / Vimana / Tower)
      └── Component (Finial, Main Sanctuary, Columns, Base Plinth)
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

*Smart India Hackathon 2026 · Team Qualified (Team ID: 031)*

