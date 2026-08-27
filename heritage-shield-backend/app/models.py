from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Site(Base):
    """Protected National Heritage Site (e.g. Qutub Minar Complex)."""
    __tablename__ = "sites"

    id = Column(Integer, primary_key=True, index=True)
    asi_code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    state = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    seismic_zone = Column(String(50), default="Zone IV")
    monsoon_risk = Column(String(50), default="Moderate")
    significance_tier = Column(String(50), default="National Importance (ASI Grade-I)")
    created_at = Column(DateTime, default=datetime.utcnow)

    assets = relationship("Asset", back_populates="site", cascade="all, delete-orphan")
    inspections = relationship("Inspection", back_populates="site", cascade="all, delete-orphan")

class Asset(Base):
    """Specific Built Asset within a Site (e.g. Minaret Tower, Alai Darwaza)."""
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(Integer, ForeignKey("sites.id"), nullable=False)
    name = Column(String(200), nullable=False)
    asset_type = Column(String(100), default="Minaret / Tower")
    construction_period = Column(String(100), default="1199–1220 CE")
    material_typology = Column(String(100), default="Red Sandstone & Delhi Quartzite")
    created_at = Column(DateTime, default=datetime.utcnow)

    site = relationship("Site", back_populates="assets")
    components = relationship("Component", back_populates="asset", cascade="all, delete-orphan")

class Component(Base):
    """Persistent 3D Architectural Node (e.g. C-01 North Façade Wall)."""
    __tablename__ = "components"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    code = Column(String(50), index=True, nullable=False) # e.g. C-01, C-02
    name = Column(String(200), nullable=False)
    elevation_meters = Column(Float, default=12.0)
    current_health_score = Column(Integer, default=62) # 0 to 100
    status = Column(String(50), default="Deteriorating") # Stable, Watch, Deteriorating, Critical
    mesh_cluster_id = Column(String(50), default="mesh_shaft_north")
    created_at = Column(DateTime, default=datetime.utcnow)

    asset = relationship("Asset", back_populates="components")
    images = relationship("ImageRecord", back_populates="component")
    damage_detections = relationship("DamageDetection", back_populates="component")
    risk_scores = relationship("RiskScore", back_populates="component")
    condition_history = relationship("ConditionHistory", back_populates="component")
    validations = relationship("ExpertValidation", back_populates="component")

class ImageRecord(Base):
    """Photogrammetric and inspection photography metadata."""
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    file_path = Column(String(500), nullable=False)
    capture_date = Column(DateTime, default=datetime.utcnow)
    camera_sensor = Column(String(100), default="Sony Full-Frame (42MP)")
    is_baseline = Column(Boolean, default=False)
    exif_focal_length = Column(Float, default=35.0)

    component = relationship("Component", back_populates="images")
    damage_detections = relationship("DamageDetection", back_populates="image")

class Inspection(Base):
    """Official ASI or Field Sentinel Inspection Record."""
    __tablename__ = "inspections"

    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(Integer, ForeignKey("sites.id"), nullable=False)
    inspector_name = Column(String(100), default="Conservation Circle Architect")
    inspector_role = Column(String(50), default="officer") # officer | citizen
    inspection_date = Column(DateTime, default=datetime.utcnow)
    gps_coordinates = Column(String(100), default="28.5244 N, 77.1855 E")
    summary_notes = Column(Text, nullable=True)

    site = relationship("Site", back_populates="inspections")
    observations = relationship("Observation", back_populates="inspection")

class Observation(Base):
    """Field observation logged during an inspection."""
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    inspection_id = Column(Integer, ForeignKey("inspections.id"), nullable=False)
    defect_category = Column(String(100), nullable=False) # structural, moisture, biological, spalling
    severity = Column(String(50), default="High")
    notes = Column(Text, nullable=True)

    inspection = relationship("Inspection", back_populates="observations")

class DamageDetection(Base):
    """Computer Vision detected bounding box and physical metrics."""
    __tablename__ = "damage_detections"

    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("images.id"), nullable=True)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    defect_type = Column(String(100), nullable=False) # crack, moisture, vegetation, spalling
    confidence = Column(Float, default=0.92)
    bbox_x = Column(Float, nullable=False) # Normalized 0 to 1
    bbox_y = Column(Float, nullable=False)
    bbox_w = Column(Float, nullable=False)
    bbox_h = Column(Float, nullable=False)
    physical_metric_value = Column(Float, default=25.1)
    physical_metric_unit = Column(String(20), default="cm")
    detected_at = Column(DateTime, default=datetime.utcnow)

    component = relationship("Component", back_populates="damage_detections")
    image = relationship("ImageRecord", back_populates="damage_detections")
    validations = relationship("ExpertValidation", back_populates="detection")

class RiskScore(Base):
    """Explainable Multi-Criteria Risk Score calculation log."""
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    condition_score = Column(Float, default=78.0) # C (0-100)
    deterioration_score = Column(Float, default=72.0) # D (0-100)
    hazard_score = Column(Float, default=61.0) # H (0-100)
    env_score = Column(Float, default=65.0) # E (0-100)
    significance_score = Column(Float, default=90.0) # S (0-100)
    computed_risk = Column(Integer, default=74) # R = 0.3C + 0.25D + 0.15H + 0.15E + 0.15S
    priority_level = Column(String(50), default="High Urgency")
    prescribed_action = Column(Text, default="Structural scaffolding inspection & moisture-barrier sealing within 30 days")
    calculated_at = Column(DateTime, default=datetime.utcnow)

    component = relationship("Component", back_populates="risk_scores")

class ExpertValidation(Base):
    """Human-in-the-Loop Architect Decisions (Approve, Correct, Reject)."""
    __tablename__ = "expert_validations"

    id = Column(Integer, primary_key=True, index=True)
    detection_id = Column(Integer, ForeignKey("damage_detections.id"), nullable=True)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    expert_name = Column(String(100), default="Superintending Conservation Architect")
    decision = Column(String(50), nullable=False) # APPROVED, CORRECTED, REJECTED
    comments = Column(Text, nullable=True)
    validated_at = Column(DateTime, default=datetime.utcnow)

    component = relationship("Component", back_populates="validations")
    detection = relationship("DamageDetection", back_populates="validations")

class ConditionHistory(Base):
    """Multi-Year Time-Series Observations (2020–2028)."""
    __tablename__ = "condition_history"

    id = Column(Integer, primary_key=True, index=True)
    component_id = Column(Integer, ForeignKey("components.id"), nullable=False)
    epoch_year = Column(String(20), nullable=False) # e.g. 2020, 2022, 2024, 2026
    health_index = Column(Integer, nullable=False) # 0-100
    crack_length_cm = Column(Float, nullable=True)
    moisture_percentage = Column(Float, nullable=True)
    observation_type = Column(String(50), default="historical") # historical | current | forecast
    notes = Column(Text, nullable=True)

    component = relationship("Component", back_populates="condition_history")

class FieldIncidentReport(Base):
    """User and Citizen Submitted Field Sentinel Incident Reports."""
    __tablename__ = "field_incident_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. REP-9102
    role = Column(String(50), default="officer") # officer | citizen
    monument_name = Column(String(200), nullable=False)
    component_name = Column(String(200), nullable=False)
    defect_type = Column(String(100), nullable=False)
    severity = Column(String(50), default="High")
    gps_coordinates = Column(String(100), default="28.5244 N, 77.1855 E")
    status = Column(String(100), default="Pending Verification")
    notes = Column(Text, nullable=True)
    image_data = Column(Text, nullable=True) # Base64 or image URI
    created_at = Column(DateTime, default=datetime.utcnow)
