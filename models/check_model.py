import joblib
import pandas as pd

# Load model and scaler
model = joblib.load("C:\\Users\\rajsa\\OneDrive\\Desktop\\Agentic-BTP\\models\\career_rf_model.pkl")
scaler = joblib.load(r"C:\\Users\\rajsa\\OneDrive\\Desktop\\Agentic-BTP\\models\\scaler.pkl")

# Feature names used during training
MODEL_FEATURES = scaler.feature_names_in_

print("\nTOTAL FEATURES:", len(MODEL_FEATURES))
print("\nMODEL FEATURES:\n")

for f in MODEL_FEATURES:
    print(f)

# Feature importances
importances = model.feature_importances_

pairs = list(zip(MODEL_FEATURES, importances))

# sort descending
pairs = sorted(pairs, key=lambda x: x[1], reverse=True)

print("\nTOP 10 IMPORTANT FEATURES:\n")

for feature, importance in pairs[:10]:
    print(feature, round(importance,4))