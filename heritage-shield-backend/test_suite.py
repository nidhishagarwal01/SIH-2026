import io
import numpy as np
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app
from app.database import SessionLocal, engine
from app.models import Site, Asset, Component, RiskScore, ExpertValidation, ConditionHistory
from app.services.vision import analyze_inspection_image
from app.services.risk import compute_risk_score
from app.services.weather import fetch_live_environmental_telemetry
from app.services.llm_report import generate_conservation_assessment

def run_comprehensive_tests():
    print("==========================================================")
    print("🧪 RUNNING FULL SYSTEM TEST SUITE: HERITAGE SHIELD BACKEND")
    print("==========================================================")
    
    passed = 0
    failed = 0
    errors = []

    client = TestClient(app)

    # -------------------------------------------------------------
    # TEST 1: Database Tables & Connection
    # -------------------------------------------------------------
    try:
        db = SessionLocal()
        site_count = db.query(Site).count()
        asset_count = db.query(Asset).count()
        comp_count = db.query(Component).count()
        db.close()
        assert site_count >= 3, f"Expected at least 3 sites, found {site_count}"
        assert comp_count >= 4, f"Expected at least 4 components, found {comp_count}"
        print(f"✔ [PASS] Test 1: SQLite Relational Database ({site_count} sites, {comp_count} nodes)")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 1: Database verification failed - {e}")
        errors.append(("Test 1: Database", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 2: GET /api/health
    # -------------------------------------------------------------
    try:
        res = client.get("/api/health")
        assert res.status_code == 200, f"Expected 200, got {res.status_code}"
        data = res.json()
        assert data["status"] == "healthy"
        print("✔ [PASS] Test 2: GET /api/health Endpoint")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 2: Health check failed - {e}")
        errors.append(("Test 2: Health Check", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 3: GET /api/sites & GET /api/sites/{id}
    # -------------------------------------------------------------
    try:
        res = client.get("/api/sites")
        assert res.status_code == 200
        sites_list = res.json()
        assert len(sites_list) >= 3
        first_id = sites_list[0]["id"]
        
        # Test specific site detail
        res_detail = client.get(f"/api/sites/{first_id}")
        assert res_detail.status_code == 200
        detail_data = res_detail.json()
        assert "assets" in detail_data
        assert len(detail_data["assets"]) > 0

        # Test invalid site ID
        res_404 = client.get("/api/sites/99999")
        assert res_404.status_code == 404
        print("✔ [PASS] Test 3: GET /api/sites & /api/sites/{id} (including 404 validation)")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 3: Sites API failed - {e}")
        errors.append(("Test 3: Sites API", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 4: GET /api/components/{id}/history
    # -------------------------------------------------------------
    try:
        res = client.get("/api/components/1/history")
        assert res.status_code == 200
        hist = res.json()
        assert len(hist) >= 4
        assert hist[0]["year"] == "2020"
        print(f"✔ [PASS] Test 4: GET /api/components/1/history ({len(hist)} epochs loaded)")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 4: Component history failed - {e}")
        errors.append(("Test 4: Component History", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 5: GET /api/environment (Live Weather Feed)
    # -------------------------------------------------------------
    try:
        res = client.get("/api/environment?lat=28.5244&lon=77.1855")
        assert res.status_code == 200
        env_data = res.json()
        assert "computed_env_stress_factor_e" in env_data
        assert 0 <= env_data["computed_env_stress_factor_e"] <= 100
        print(f"✔ [PASS] Test 5: Live Weather Telemetry (Factor E = {env_data['computed_env_stress_factor_e']})")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 5: Weather API failed - {e}")
        errors.append(("Test 5: Weather API", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 6: OpenCV Computer Vision on Synthetic Pixel Buffer
    # -------------------------------------------------------------
    try:
        # Create a test 640x480 RGB image with a dark horizontal line (simulated crack)
        img_array = np.full((480, 640, 3), 180, dtype=np.uint8)
        # Draw a simulated crack line
        img_array[200:210, 100:500] = [30, 20, 10]
        
        pil_img = Image.fromarray(img_array)
        buf = io.BytesIO()
        pil_img.save(buf, format="JPEG")
        raw_bytes = buf.getvalue()

        # Run vision analysis
        cv_result = analyze_inspection_image(raw_bytes, "Test Wall")
        assert cv_result["status"] == "success"
        assert "detections" in cv_result
        print(f"✔ [PASS] Test 6: OpenCV Real-Pixel Segmentation ({cv_result['image_quality']}, {cv_result['total_defects_flagged']} defects)")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 6: OpenCV pixel analysis failed - {e}")
        errors.append(("Test 6: OpenCV Vision", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 7: POST /api/process/images & /api/assess-damage
    # -------------------------------------------------------------
    try:
        files = {"file": ("inspection_test.jpg", raw_bytes, "image/jpeg")}
        res = client.post("/api/process/images", files=files, data={"component_name": "North Façade Wall"})
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "success"
        print("✔ [PASS] Test 7: POST /api/process/images (Multipart Upload & CV)")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 7: Image upload API failed - {e}")
        errors.append(("Test 7: Image Upload API", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 8: POST /api/compute-risk (Weighted Multi-Criteria)
    # -------------------------------------------------------------
    try:
        res = client.post("/api/compute-risk", json={
            "condition": 78,
            "deterioration": 72,
            "hazard": 61,
            "environment": 65,
            "significance": 90
        })
        assert res.status_code == 200
        risk_data = res.json()
        assert 73.0 <= risk_data["risk_score"] <= 75.0, f"Expected ~74, got {risk_data['risk_score']}"
        assert risk_data["status"] == "High Urgency"
        print(f"✔ [PASS] Test 8: Explainable Risk Engine (Score: {risk_data['risk_score']}/100 · {risk_data['status']})")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 8: Risk computation failed - {e}")
        errors.append(("Test 8: Risk Engine", str(e)))
        failed += 1


    # -------------------------------------------------------------
    # TEST 9: POST /api/expert/validate (Audit Ledger)
    # -------------------------------------------------------------
    try:
        res = client.post("/api/expert/validate", json={
            "component_id": 1,
            "expert_name": "Superintending Architect",
            "decision": "APPROVED",
            "comments": "Tensile crack validated via test suite."
        })
        assert res.status_code == 200
        val_data = res.json()
        assert val_data["status"] == "success"
        assert "validation_id" in val_data
        print(f"✔ [PASS] Test 9: Expert Validation Feedback Loop (ID: #{val_data['validation_id']})")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 9: Expert validation failed - {e}")
        errors.append(("Test 9: Expert Validation", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 10: POST /api/reports/synthesize (LLM Assessment Synthesis)
    # -------------------------------------------------------------
    try:
        res = client.post("/api/reports/synthesize", json={
            "site_name": "Qutub Minar Complex, Delhi",
            "component_name": "North Façade Wall (Main Shaft)",
            "risk_score": 74,
            "crack_length_cm": 25.1,
            "moisture_pct": 14.8,
            "growth_percentage": 38.2,
            "deterioration_velocity_cm_yr": 3.45
        })
        assert res.status_code == 200
        synth_data = res.json()
        assert "assessment_id" in synth_data
        assert "prescribed_intervention" in synth_data
        print(f"✔ [PASS] Test 10: AI Conservation Assessment Synthesizer ({synth_data['assessment_id']})")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 10: Report synthesis failed - {e}")
        errors.append(("Test 10: Report Synthesis", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 11: POST /api/live-ingest/examine (Autonomous Live Ingest)
    # -------------------------------------------------------------
    try:
        res = client.post("/api/live-ingest/examine", json={
            "site_name": "Qutub Minar Complex",
            "latitude": 28.5244,
            "longitude": 77.1855
        })
        assert res.status_code == 200
        ingest_data = res.json()
        assert ingest_data["status"] == "success"
        assert "data_sources" in ingest_data
        assert "risk_assessment" in ingest_data
        print(f"✔ [PASS] Test 11: Autonomous Live Ingest & Examine Pipeline ({ingest_data['data_sources']['weather_source'].split('(')[0].strip()})")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 11: Live Ingestion failed - {e}")
        errors.append(("Test 11: Live Ingestion", str(e)))
        failed += 1

    # -------------------------------------------------------------
    # TEST 12: POST & GET /api/reports (Field Incident Database)
    # -------------------------------------------------------------
    try:
        test_report_id = f"TEST-REP-{int(datetime.utcnow().timestamp())}"
        post_res = client.post("/api/reports", json={
            "id": test_report_id,
            "role": "officer",
            "monumentName": "Qutub Minar Complex",
            "component": "North Façade Wall",
            "defectType": "Structural Tensile Crack",
            "severity": "Critical",
            "gps": "28.5244° N, 77.1855° E",
            "status": "Pending Verification",
            "notes": "Automated test validation report"
        })
        assert post_res.status_code == 200, f"Expected 200, got {post_res.status_code}"
        
        get_res = client.get("/api/reports")
        assert get_res.status_code == 200
        reports_list = get_res.json()
        assert len(reports_list) >= 1
        assert any(r["id"] == test_report_id for r in reports_list)
        
        # Clean up test report
        client.delete(f"/api/reports/{test_report_id}")
        
        print(f"✔ [PASS] Test 12: Field Sentinel Database Storage & CRUD (Persisted in SQLite)")
        passed += 1
    except Exception as e:
        print(f"✖ [FAIL] Test 12: Reports Database failed - {e}")
        errors.append(("Test 12: Reports Database", str(e)))
        failed += 1

    print("\n==========================================================")
    print(f"📊 SUMMARY: {passed}/12 TESTS PASSED · {failed} FAILURES")
    print("==========================================================")
    if failed == 0:
        print("🎉 ALL BACKEND SERVICES & ENGINES OPERATIONAL WITH ZERO ERRORS!")
    else:
        print("⚠️ ERRORS FOUND:")
        for name, err in errors:
            print(f"  - {name}: {err}")

if __name__ == "__main__":
    from datetime import datetime
    run_comprehensive_tests()

