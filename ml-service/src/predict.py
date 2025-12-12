import joblib
import json
from fastapi import FastAPI
from pathlib import Path
from .schema import RiskPredictionInput
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "risk_model.pkl"
META_PATH = BASE_DIR / "models" / "model_meta.json"

model = joblib.load(MODEL_PATH)

with open(META_PATH) as f:
    meta = json.load(f)

app = FastAPI(title="Women Safety Risk Prediction ML API")

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model": meta["model"],
        "features": meta["features"],
    }

@app.post("/predict")
def predict_risk(data: RiskPredictionInput):
    X = [[
        data.lat,
        data.lng,
        data.hour,
        data.day_of_week,
        data.crime_frequency,
        data.harassment_ratio,
        data.night_flag
    ]]

    score = model.predict(X)[0]
    score = max(0, min(100, round(float(score), 2)))

    if score >= 70:
        level = "HIGH"
    elif score >= 40:
        level = "MEDIUM"
    else:
        level = "LOW"

    return {
        "risk_score": score,
        "risk_level": level,
        "explanation": "Prediction based on historical crime + time patterns"
    }
