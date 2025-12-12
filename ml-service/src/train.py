import pandas as pd
import json
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "training_data.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "risk_model.pkl"
META_PATH = MODEL_DIR / "model_meta.json"

def train():
    df = pd.read_csv(DATA_PATH)

    X = df.drop(columns=["risk_score"])
    y = df["risk_score"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=12,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    mae = mean_absolute_error(y_test, preds)

    joblib.dump(model, MODEL_PATH)

    meta = {
        "model": "RandomForestRegressor",
        "mae": round(mae, 2),
        "features": list(X.columns)
    }

    with open(META_PATH, "w") as f:
        json.dump(meta, f, indent=2)

    print("✅ Model trained successfully")
    print("📊 MAE:", mae)

if __name__ == "__main__":
    train()
