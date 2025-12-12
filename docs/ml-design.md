# Machine Learning Design – Women Safety Risk Zone Prediction

## Objective

To proactively predict unsafe urban zones for women using:
- Historical crime data
- Time-based risk patterns
- Crowd-sourced safety reports

---

## 📊 Model Type

- Supervised Regression
- Algorithm: Random Forest Regressor
- Output: Risk score (0–100)

---

## 🧠 Input Features

| Feature | Description |
|------|-------------|
| lat, lng | Geo-coordinates |
| hour | Hour of day (0–23) |
| day_of_week | Weekday (0–6) |
| crime_frequency | Past crime count |
| harassment_ratio | Severity weighting |
| night_flag | Day / night indicator |

---

## 🎯 Target Variable

- `risk_score` (0–100)

Converted into:
- 0–39 → LOW
- 40–69 → MEDIUM
- 70–100 → HIGH

---

## 🔁 Training Pipeline

1. Load CSV data
2. Train-test split (80/20)
3. Train Random Forest
4. Evaluate using MAE
5. Save model (.pkl)
6. Save metadata (features, MAE)

---

## 🧪 Model Evaluation

- Metric: Mean Absolute Error (MAE)
- Observed MAE: ~4.6 (acceptable for urban risk prediction)

---

## 🔍 Explainability

- Feature importance via Random Forest
- Transparent thresholds
- Deterministic outputs (no black-box LLMs)

---

## ⚖ Ethics & Bias Control

- No individual identity data
- Aggregated zone-level predictions
- Avoid demographic features
- Clear disclaimer in UI

---

## 🔄 Future Enhancements

- XGBoost
- SHAP visual explanations
- Real-time streaming data
- Auto retraining with cron jobs
