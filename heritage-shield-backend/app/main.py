from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
import os

from app.database import engine, Base, get_db
from app.models import Site, Asset, Component, ConditionHistory, RiskScore, DamageDetection, ExpertValidation
from app.seed import seed_initial_heritage_data
from app.services.vision import process_heritage_image, get_simulated_detection_result
from app.services.risk import calculate_heritage_risk, predict_temporal_decay_trajectory

from app.services.llm_report import generate_conservation_assessment
from app.services.weather import fetch_live_environmental_telemetry
from app.services.live_ingest import fetch_and_examine_live_monument_data


# Auto-create all relational database tables on launch
Base.metadata.create_all(bind=engine)

# Seed database with initial pilot records
db_init = next(get_db())
try:
    seed_initial_heritage_data(db_init)
finally:
    db_init.close()

app = FastAPI(
    title="Heritage Shield API",
    description="Backend Service for 3D Digital Twin, Computer Vision Condition Assessment, and Explainable Risk Scoring",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# PYDANTIC SCHEMAS
# -------------------------------------------------------------

class RiskFactorInput(BaseModel):
    condition: float
    deterioration: float
    hazard: float
    environment: float
    significance: float
    weights: Optional[Dict[str, float]] = None

class ExpertValidationInput(BaseModel):
    component_id: int
    detection_id: Optional[int] = None
    expert_name: str
    decision: str # "APPROVED" | "CORRECTED" | "REJECTED"
    comments: Optional[str] = None

class ReportSynthesizeInput(BaseModel):
    site_name: str
    component_name: str
    risk_score: int
    crack_length_cm: float
    moisture_pct: float
    growth_percentage: float
    deterioration_velocity_cm_yr: float

class LiveIngestRequest(BaseModel):
    site_name: str = "Qutub Minar Complex"
    latitude: float = 28.5244
    longitude: float = 77.1855
    search_query: Optional[str] = None


# -------------------------------------------------------------
# SITES & ASSET ENDPOINTS (Section 3 of Blueprint)
# -------------------------------------------------------------

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Heritage Shield API",
        "version": "1.0.0",
        "interactive_docs": "/docs",
        "redoc": "/redoc",
        "health_check": "/api/health"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Heritage Shield FastAPI Backend",
        "engine": "OpenCV + YOLOv8 + SQLite",
        "version": "1.0.0"
    }

@app.get("/api/environment")
def get_live_environment(lat: float = 28.5244, lon: float = 77.1855):
    """Fetches real-time weather and computes Environmental Stress Factor (E)."""
    return fetch_live_environmental_telemetry(lat, lon)

@app.get("/api/sites")
def get_all_sites(db: Session = Depends(get_db)):
    """Fetches all monitored ASI heritage sites with their geographical and risk profiles."""
    sites = db.query(Site).all()
    results = []
    for s in sites:
        assets_count = len(s.assets)
        results.append({
            "id": s.id,
            "asi_code": s.asi_code,
            "name": s.name,
            "state": s.state,
            "latitude": s.latitude,
            "longitude": s.longitude,
            "seismic_zone": s.seismic_zone,
            "monsoon_risk": s.monsoon_risk,
            "significance_tier": s.significance_tier,
            "total_assets": assets_count
        })
    return results

@app.get("/api/sites/{site_id}")
def get_site_details(site_id: int, db: Session = Depends(get_db)):
    """Fetches full hierarchical details for a specific site, its assets, and 3D components."""
    site = db.query(Site).filter(Site.id == site_id).first()
    if not site:
        raise HTTPException(status_code=404, detail="Heritage site not found")
    
    assets_data = []
    for a in site.assets:
        comps = []
        for c in a.components:
            comps.append({
                "id": c.id,
                "code": c.code,
                "name": c.name,
                "elevation_meters": c.elevation_meters,
                "current_health_score": c.current_health_score,
                "status": c.status,
                "mesh_cluster_id": c.mesh_cluster_id
            })
        assets_data.append({
            "id": a.id,
            "name": a.name,
            "asset_type": a.asset_type,
            "construction_period": a.construction_period,
            "material_typology": a.material_typology,
            "components": comps
        })

    return {
        "id": site.id,
        "asi_code": site.asi_code,
        "name": site.name,
        "state": site.state,
        "coordinates": [site.latitude, site.longitude],
        "seismic_zone": site.seismic_zone,
        "monsoon_risk": site.monsoon_risk,
        "significance_tier": site.significance_tier,
        "assets": assets_data
    }

@app.get("/api/components/{component_id}/history")
def get_component_condition_history(component_id: int, db: Session = Depends(get_db)):
    """Fetches multi-year longitudinal condition time series (2020–2028)."""
    history = db.query(ConditionHistory).filter(ConditionHistory.component_id == component_id).all()
    if not history:
        # Return fallback historical sequence for Qutub Minar shaft
        return [
            {"year": "2020", "health_index": 91, "crack_length_cm": 12.4, "moisture_percentage": 6.2, "type": "historical"},
            {"year": "2022", "health_index": 84, "crack_length_cm": 15.1, "moisture_percentage": 9.8, "type": "historical"},
            {"year": "2024", "health_index": 76, "crack_length_cm": 18.2, "moisture_percentage": 11.5, "type": "historical"},
            {"year": "2026", "health_index": 62, "crack_length_cm": 25.1, "moisture_percentage": 14.8, "type": "current"}
        ]

    return [
        {
            "id": h.id,
            "year": h.epoch_year,
            "health_index": h.health_index,
            "crack_length_cm": h.crack_length_cm,
            "moisture_percentage": h.moisture_percentage,
            "type": h.observation_type,
            "notes": h.notes
        }
        for h in history
    ]

# -------------------------------------------------------------
# COMPUTER VISION ENDPOINTS (Section 4 & 9 of Blueprint)
# -------------------------------------------------------------

@app.post("/api/process/images")
@app.post("/api/assess-damage")
async def assess_damage_from_image(
    file: UploadFile = File(...),
    component_name: Optional[str] = Form("North Façade Wall (Main Shaft)")
):
    """
    Ingests an inspection photo, applies OpenCV image segmentation filters,
    and returns bounding boxes, defect labels, and physical measurements.
    """
    image_bytes = await file.read()
    result = process_heritage_image(image_bytes, component_name)
    return result

@app.get("/api/assess-damage-demo")
def assess_damage_demo(component_name: Optional[str] = "North Façade Wall (Main Shaft)"):
    """Returns simulated defect telemetry for live demonstration without photo upload."""
    return get_simulated_detection_result(component_name)

# -------------------------------------------------------------
# RISK & PRIORITY ENGINE (Section 6 & 7 of Blueprint)
# -------------------------------------------------------------

@app.post("/api/compute-risk")
def compute_risk_endpoint(factors: RiskFactorInput):
    """
    Computes explainable heritage risk score:
    R = w1*C + w2*D + w3*H + w4*E + w5*S
    """
    result = calculate_heritage_risk(
        c=factors.condition,
        d=factors.deterioration,
        h=factors.hazard,
        e=factors.environment,
        s=factors.significance,
        weights=factors.weights
    )
    return result

class PredictDecayInput(BaseModel):
    component_name: Optional[str] = "North Façade Wall (Main Shaft)"
    material_typology: Optional[str] = "sandstone"
    seismic_zone: Optional[str] = "Zone IV"
    monsoon_anomaly_pct: Optional[float] = 20.0
    initial_crack_cm: Optional[float] = 12.4
    initial_moisture_pct: Optional[float] = 6.2
    initial_health: Optional[int] = 91
    end_year: Optional[int] = 2030

@app.post("/api/predict-decay")
def predict_decay_post(payload: PredictDecayInput):
    """
    Computes physics-informed multi-year temporal crack progression and decay trajectory (2020 to 2030).
    """
    return predict_temporal_decay_trajectory(
        component_name=payload.component_name or "North Façade Wall (Main Shaft)",
        material_typology=payload.material_typology or "sandstone",
        seismic_zone=payload.seismic_zone or "Zone IV",
        monsoon_anomaly_pct=payload.monsoon_anomaly_pct if payload.monsoon_anomaly_pct is not None else 20.0,
        initial_crack_cm=payload.initial_crack_cm if payload.initial_crack_cm is not None else 12.4,
        initial_moisture_pct=payload.initial_moisture_pct if payload.initial_moisture_pct is not None else 6.2,
        initial_health=payload.initial_health if payload.initial_health is not None else 91,
        end_year=payload.end_year or 2030
    )

@app.get("/api/predict-decay")
def predict_decay_get(
    component_name: Optional[str] = "North Façade Wall (Main Shaft)",
    material_typology: Optional[str] = "sandstone",
    seismic_zone: Optional[str] = "Zone IV",
    monsoon_anomaly_pct: Optional[float] = 20.0,
    initial_crack_cm: Optional[float] = 12.4,
    initial_moisture_pct: Optional[float] = 6.2,
    initial_health: Optional[int] = 91,
    end_year: Optional[int] = 2030
):
    """
    GET endpoint for temporal crack progression and 2030 decay trajectories.
    """
    return predict_temporal_decay_trajectory(
        component_name=component_name,
        material_typology=material_typology,
        seismic_zone=seismic_zone,
        monsoon_anomaly_pct=monsoon_anomaly_pct,
        initial_crack_cm=initial_crack_cm,
        initial_moisture_pct=initial_moisture_pct,
        initial_health=initial_health,
        end_year=end_year
    )


# -------------------------------------------------------------
# EXPERT VALIDATION ENDPOINT (Section 8 & 15 of Blueprint)
# -------------------------------------------------------------

@app.post("/api/expert/validate")
def expert_validation_endpoint(
    validation: ExpertValidationInput,
    db: Session = Depends(get_db)
):
    """
    Persists Human-in-the-Loop conservation architect approvals,
    corrections, or rejections into the database for auditable traceability.
    """
    new_val = ExpertValidation(
        component_id=validation.component_id,
        detection_id=validation.detection_id,
        expert_name=validation.expert_name,
        decision=validation.decision,
        comments=validation.comments
    )
    db.add(new_val)
    db.commit()
    db.refresh(new_val)

    return {
        "status": "success",
        "validation_id": new_val.id,
        "decision": new_val.decision,
        "message": f"Expert validation '{new_val.decision}' logged to permanent audit ledger."
    }

# -------------------------------------------------------------
# REPORT & LLM ASSESSMENT (Section 14 & 19 of Blueprint)
# -------------------------------------------------------------

@app.post("/api/reports/synthesize")
def synthesize_report_endpoint(data: ReportSynthesizeInput):
    """Synthesizes structured ASI conservation assessment text from analytical data."""
    assessment = generate_conservation_assessment(data.dict())
    return assessment

# -------------------------------------------------------------
# AUTONOMOUS LIVE INGESTION & EXAMINATION (Section 1 & 2 Blueprint)
# -------------------------------------------------------------

@app.post("/api/live-ingest/examine")
def live_ingest_and_examine(request: LiveIngestRequest):
    """
    Autonomous pipeline that fetches live public heritage imagery,
    real-time meteorological telemetry, live seismic events,
    and runs real OpenCV pixel analysis and risk scoring.
    """
    result = fetch_and_examine_live_monument_data(
        site_name=request.site_name,
        lat=request.latitude,
        lon=request.longitude,
        custom_search_query=request.search_query
    )
    return result

# -------------------------------------------------------------
# NATIONAL UNESCO WORLD HERITAGE REGISTRY (All Indian Sites)
# -------------------------------------------------------------

@app.get("/api/unesco-sites")
def list_all_unesco_sites():
    """Returns the master national database of UNESCO World Heritage Sites in India."""
    from app.data.unesco_sites import UNESCO_WORLD_HERITAGE_SITES_INDIA
    return {
        "count": len(UNESCO_WORLD_HERITAGE_SITES_INDIA),
        "authority": "Archaeological Survey of India (ASI) & UNESCO World Heritage Centre",
        "sites": UNESCO_WORLD_HERITAGE_SITES_INDIA
    }


