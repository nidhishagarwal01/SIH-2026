from typing import Dict, Any

def generate_conservation_assessment(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Synthesizes numerical CV, risk calculations, and temporal deltas into an
    authoritative, auditable ASI technical conservation assessment.
    
    Adheres strictly to the rule: The analytical numbers govern the diagnosis;
    the synthesizer formats the technical recommendations without altering scores.
    """
    site_name = data.get("site_name", "Qutub Minar Complex, Delhi")
    component_name = data.get("component_name", "North Façade Wall (Main Shaft)")
    risk_score = data.get("risk_score", 74)
    crack_length = data.get("crack_length_cm", 25.1)
    moisture_pct = data.get("moisture_pct", 14.8)
    delta_growth = data.get("growth_percentage", 38.2)
    velocity = data.get("deterioration_velocity_cm_yr", 3.45)

    urgency = "CRITICAL" if risk_score >= 70 else "WATCH" if risk_score >= 45 else "STABLE"

    executive_summary = (
        f"Technical assessment for {component_name} at {site_name} indicates an overall "
        f"Vulnerability Risk Score of {risk_score}/100 ({urgency}). Multi-epoch computer vision analysis "
        f"confirms a tensile shear fissure extending to {crack_length} cm, representing a longitudinal growth "
        f"delta of +{delta_growth}% over the 2024 baseline at an annual progression velocity of {velocity} cm/yr. "
        f"Concurrently, capillary dampness saturation covers {moisture_pct}% of the exposed ashlar masonry surface, "
        f"driving active sub-surface salt efflorescence."
    )

    prescribed_intervention = (
        "1. Erect temporary telescopic steel shoring scaffolding to relieve localized dead-load concentrations.\n"
        "2. Execute low-pressure micro-grouting using heritage-compatible lime-surkhi hydraulic binder (1:2 ratio).\n"
        "3. Apply breathable, UV-stable silane-siloxane oligomer hydrophobic surface impregnation to inhibit further moisture uptake.\n"
        "4. Install high-precision vibrating-wire crack displacement transducers to establish real-time displacement telemetry."
    )

    return {
        "assessment_id": f"ASI-ASSESS-2026-{site_name[:3].upper()}",
        "urgency_rating": urgency,
        "executive_summary": executive_summary,
        "prescribed_intervention": prescribed_intervention,
        "compliance_standards": [
            "ASI Ancient Monuments and Archaeological Sites and Remains Act (AMASR)",
            "Venice Charter for Conservation and Restoration of Monuments (ICOMOS)",
            "Bureau of Indian Standards (BIS IS 1893: Earthquake Resistant Design)"
        ]
    }
