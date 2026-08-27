from sqlalchemy.orm import Session
from app.models import Site, Asset, Component, ConditionHistory, RiskScore, DamageDetection

def seed_initial_heritage_data(db: Session):
    """Pre-seeds the SQLite database with pilot ASI sites and historical condition telemetry."""
    if db.query(Site).first():
        return # Already seeded

    # 1. Site: Qutub Minar Complex
    qutub = Site(
        asi_code="ASI-DL-001",
        name="Qutub Minar Complex, Delhi",
        state="Delhi NCR",

        latitude=28.5244,
        longitude=77.1855,
        seismic_zone="Zone IV (High Risk)",
        monsoon_risk="Moderate",
        significance_tier="UNESCO World Heritage Site / ASI Grade-I"
    )
    db.add(qutub)
    db.commit()
    db.refresh(qutub)

    # Asset: Qutub Minar Main Tower
    qutub_tower = Asset(
        site_id=qutub.id,
        name="Qutub Minar Main Minaret",
        asset_type="Unreinforced Masonry Minaret (72.5m)",
        construction_period="1199–1220 CE (Mamluk / Khalji Dynasties)",
        material_typology="Fluted Red Sandstone & Marble Shaft"
    )
    db.add(qutub_tower)
    db.commit()
    db.refresh(qutub_tower)

    # Components of Qutub Minar
    c01 = Component(
        asset_id=qutub_tower.id,
        code="C-01",
        name="North Façade Wall (Main Shaft)",
        elevation_meters=12.0,
        current_health_score=62,
        status="Deteriorating",
        mesh_cluster_id="mesh_shaft_north"
    )
    c02 = Component(
        asset_id=qutub_tower.id,
        code="C-02",
        name="Upper Storey Balcony Gallery",
        elevation_meters=48.0,
        current_health_score=71,
        status="Watch",
        mesh_cluster_id="mesh_balcony_upper"
    )
    c03 = Component(
        asset_id=qutub_tower.id,
        code="C-03",
        name="Base Plinth & Substructure",
        elevation_meters=0.0,
        current_health_score=80,
        status="Stable",
        mesh_cluster_id="mesh_plinth_base"
    )
    c04 = Component(
        asset_id=qutub_tower.id,
        code="C-04",
        name="Finial & Apex Cupola",
        elevation_meters=72.5,
        current_health_score=88,
        status="Stable",
        mesh_cluster_id="mesh_finial_apex"
    )
    db.add_all([c01, c02, c03, c04])
    db.commit()
    db.refresh(c01)

    # C-01 Multi-Year Condition History (2020 - 2026)
    history_records = [
        ConditionHistory(component_id=c01.id, epoch_year="2020", health_index=91, crack_length_cm=12.4, moisture_percentage=6.2, observation_type="historical", notes="NMMA Baseline"),
        ConditionHistory(component_id=c01.id, epoch_year="2022", health_index=84, crack_length_cm=15.1, moisture_percentage=9.8, observation_type="historical", notes="Micro-fissures in mortar joint"),
        ConditionHistory(component_id=c01.id, epoch_year="2024", health_index=76, crack_length_cm=18.2, moisture_percentage=11.5, observation_type="historical", notes="Tensile shear extension post-monsoon"),
        ConditionHistory(component_id=c01.id, epoch_year="2026", health_index=62, crack_length_cm=25.1, moisture_percentage=14.8, observation_type="current", notes="Current inspection: High moisture saturation")
    ]
    db.add_all(history_records)

    # C-01 Initial Risk Score
    risk_c01 = RiskScore(
        component_id=c01.id,
        condition_score=78.0,
        deterioration_score=72.0,
        hazard_score=61.0,
        env_score=65.0,
        significance_score=90.0,
        computed_risk=74,
        priority_level="High Urgency",
        prescribed_action="Structural scaffolding inspection & moisture-barrier sealing within 30 days"
    )
    db.add(risk_c01)

    # C-01 Initial CV Defect Detection
    defect1 = DamageDetection(
        component_id=c01.id,
        defect_type="crack",
        confidence=0.94,
        bbox_x=0.28,
        bbox_y=0.22,
        bbox_w=0.44,
        bbox_h=0.38,
        physical_metric_value=25.1,
        physical_metric_unit="cm"
    )
    defect2 = DamageDetection(
        component_id=c01.id,
        defect_type="moisture",
        confidence=0.88,
        bbox_x=0.15,
        bbox_y=0.48,
        bbox_w=0.32,
        bbox_h=0.40,
        physical_metric_value=14.8,
        physical_metric_unit="%"
    )
    db.add_all([defect1, defect2])

    # 2. Site: Hampi Monument Cluster
    hampi = Site(
        asi_code="ASI-KA-042",
        name="Hampi Monument Cluster, Karnataka",
        state="Karnataka",
        latitude=15.3350,
        longitude=76.4600,
        seismic_zone="Zone II (Low Risk)",
        monsoon_risk="Low",
        significance_tier="UNESCO World Heritage Site / ASI Grade-I"
    )
    db.add(hampi)

    # 3. Site: Golconda Fort
    golconda = Site(
        asi_code="ASI-TS-018",
        name="Golconda Fort, Hyderabad",
        state="Telangana",
        latitude=17.3833,
        longitude=78.4011,
        seismic_zone="Zone II",
        monsoon_risk="High (Drainage Overflow)",
        significance_tier="National Monument / ASI Grade-I"
    )
    db.add(golconda)

    db.commit()
    print("[OK] Heritage Shield SQLite database successfully seeded with 3 ASI pilot sites!")
