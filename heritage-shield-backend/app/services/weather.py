import urllib.request
import json
from typing import Dict, Any

def fetch_live_environmental_telemetry(lat: float = 28.5244, lon: float = 77.1855) -> Dict[str, Any]:
    """
    Fetches real-time environmental and weather telemetry for monument coordinates
    using the open Open-Meteo API (No API key required, free public service).
    
    Computes dynamic Environmental Stress Index (E) from:
    - Relative Humidity (%)
    - Surface Precipitation (mm)
    - Temperature (°C)
    """
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m"

    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'HeritageShield/1.0'})
        with urllib.request.urlopen(req, timeout=3.0) as response:
            data = json.loads(response.read().decode())
            current = data.get("current", {})
            temp = current.get("temperature_2m", 32.5)
            humidity = current.get("relative_humidity_2m", 68.0)
            precip = current.get("precipitation", 0.0)
            wind = current.get("wind_speed_10m", 12.0)

            # Calculate dynamic Environmental Factor E (0-100)
            # High humidity (>70%) and active rain increases moisture penetration factor
            e_score = min(100, max(10, int((humidity * 0.6) + (precip * 10) + (temp * 0.4))))

            return {
                "source": "Open-Meteo Public Heritage Feed",
                "coordinates": [lat, lon],
                "temperature_c": temp,
                "relative_humidity_pct": humidity,
                "precipitation_mm": precip,
                "wind_speed_kmh": wind,
                "computed_env_stress_factor_e": e_score,
                "status": "LIVE_FEED_SYNCED"
            }
    except Exception as exc:
        # Fallback to standard seasonal baseline if offline or network unavailable
        return {
            "source": "Seasonal Baseline Model (Offline Cache)",
            "coordinates": [lat, lon],
            "temperature_c": 33.2,
            "relative_humidity_pct": 65.0,
            "precipitation_mm": 1.2,
            "wind_speed_kmh": 14.5,
            "computed_env_stress_factor_e": 65,
            "status": "CACHED_BASELINE"
        }
