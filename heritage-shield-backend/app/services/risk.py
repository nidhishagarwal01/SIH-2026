from typing import Dict, Any, Optional

def compute_risk_score(
    c: float,
    d: float,
    h: float,
    e: float,
    s: float,
    weights: Optional[Dict[str, float]] = None
) -> Dict[str, Any]:
    """
    Computes explainable heritage risk score:
    R = w1*C + w2*D + w3*H + w4*E + w5*S
    """
    if weights is None:
        w1, w2, w3, w4, w5 = 0.30, 0.25, 0.15, 0.15, 0.15
    else:
        w1 = weights.get("w1", 0.30)
        w2 = weights.get("w2", 0.25)
        w3 = weights.get("w3", 0.15)
        w4 = weights.get("w4", 0.15)
        w5 = weights.get("w5", 0.15)

    score = (w1 * c) + (w2 * d) + (w3 * h) + (w4 * e) + (w5 * s)
    
    if score >= 70:
        status = "High Urgency"
        action = "Structural scaffolding inspection & moisture-barrier sealing within 30 days"
    elif score >= 45:
        status = "Watch"
        action = "Re-inspect in next scheduled quarterly cycle (60 days)"
    else:
        status = "Stable"
        action = "Routine annual photographic documentation"
        
    return {
        "risk_score": round(score, 1),
        "status": status,
        "recommended_action": action,
        "weights_applied": {"w1": w1, "w2": w2, "w3": w3, "w4": w4, "w5": w5},
        "factors": {
            "condition_severity": c,
            "deterioration_rate": d,
            "hazard_exposure": h,
            "environmental_stress": e,
            "heritage_significance": s
        }
    }

calculate_heritage_risk = compute_risk_score
