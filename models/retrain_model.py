import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler


# ==============================
# 1. LOAD DATASET
# ==============================

df = pd.read_csv("../database/datasets/cleaned_dataset.csv")

print("Dataset Loaded")
print("Shape:", df.shape)


# ==============================
# 2. TARGET COLUMN
# ==============================

y = df["Job profession"]


# ==============================
# 3. FEATURE SELECTION
# ==============================

X = df.drop("Job profession", axis=1)

# remove useless columns
X = X.drop(columns=["Course", "s/p", "Student", "Sr.No."], errors="ignore")


# ==============================
# 4. CONVERT CATEGORICAL → NUMERIC
# ==============================

X = pd.get_dummies(X, drop_first=True)


# ==============================
# 5. REMOVE NaN TARGETS
# ==============================

data = pd.concat([X, y], axis=1)
data = data.dropna(subset=["Job profession"])

y = data["Job profession"]
X = data.drop("Job profession", axis=1)


# ==============================
# 6. HANDLE MISSING VALUES
# ==============================

X = X.fillna(X.median())

print("Total remaining NaN:", X.isna().sum().sum())


# ==============================
# 7. TRAIN TEST SPLIT
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==============================
# 8. SCALING
# ==============================

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


# ==============================
# 9. TRAIN MODEL
# ==============================

model = RandomForestClassifier(
    n_estimators=500,
    max_depth=25,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1
)

print("\nTraining RandomForest...")

model.fit(X_train, y_train)


# ==============================
# 10. EVALUATE
# ==============================

pred = model.predict(X_test)

accuracy = accuracy_score(y_test, pred)

print("\nModel Accuracy:", accuracy)

train_acc = model.score(X_train, y_train)
test_acc = model.score(X_test, y_test)

print("Train Accuracy:", train_acc)
print("Test Accuracy:", test_acc)


# ==============================
# 11. SAVE MODEL + SCALER
# ==============================

joblib.dump(model, "../models/career_rf_model.pkl")
joblib.dump(scaler, "../models/scaler.pkl")

print("\nModel and scaler saved successfully!")