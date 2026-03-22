import joblib
import pandas as pd
from pathlib import Path

# -------- Load model paths safely -------- #

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "career_rf_model.pkl"
SCALER_PATH = BASE_DIR / "models" / "scaler.pkl"

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Features used during training
MODEL_FEATURES = scaler.feature_names_in_

print("MODEL FEATURES:", MODEL_FEATURES)


def normalize_feature_name(name):
    """
    Normalize feature names so user input matches training features.
    Example:
    Logical - Mathematical -> logical_mathematical
    Spatial-Visualization -> spatial_visualization
    """
    return name.lower().replace(" ", "").replace("-", "_")


def predict_career(user_profile):

    try:

        data = {}

        # Normalize user input keys
        normalized_profile = {
            normalize_feature_name(k): v
            for k, v in user_profile.items()
        }

        # Fill required model features
        for feature in MODEL_FEATURES:

            normalized_feature = normalize_feature_name(feature)

            value = normalized_profile.get(normalized_feature, 0)

            data[feature] = float(value)

        # Convert to DataFrame
        df = pd.DataFrame([data])

        print("\nINPUT DATA SENT TO MODEL:")
        print(df)

        # Scale input
        scaled = scaler.transform(df)

        # Get probability distribution
        probabilities = model.predict_proba(scaled)[0]

        classes = model.classes_

        # -------- Top-3 Predictions -------- #
        top_indices = probabilities.argsort()[::-1][:3]

        top_predictions = []

        for i in top_indices:

            top_predictions.append({
                "career": str(classes[i]),
                "confidence": round(float(probabilities[i]), 3)
            })

        primary_prediction = top_predictions[0]["career"]
        primary_confidence = top_predictions[0]["confidence"]

        print("\nTOP 3 PREDICTIONS:")
        print(top_predictions)

        return {
            "career": primary_prediction,
            "confidence": primary_confidence,
            "top_predictions": top_predictions
        }

    except Exception as e:
        raise Exception(f"Prediction error: {str(e)}")