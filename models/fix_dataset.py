import pandas as pd

df = pd.read_csv("../database/datasets/Dataset Project 404.csv")

# ----------------------------
# 1. Clean career names
# ----------------------------

df["Job profession"] = df["Job profession"].str.strip()
df["Job profession"] = df["Job profession"].str.replace("\n","", regex=False)

# ----------------------------
# 2. Convert P1-P8 values
# ----------------------------

mapping = {
    "BEST": 2,
    "AVG": 1,
    "POOR": 0
}

for col in ["P1","P2","P3","P4","P5","P6","P7","P8"]:
    df[col] = df[col].map(mapping)

# ----------------------------
# 3. Normalize trait scale (0-10)
# ----------------------------

traits = [
"Linguistic",
"Musical",
"Bodily",
"Logical - Mathematical",
"Spatial-Visualization",
"Interpersonal",
"Intrapersonal",
"Naturalist"
]

for t in traits:
    df[t] = (df[t] - df[t].min()) / (df[t].max() - df[t].min()) * 10

# ----------------------------
# Save clean dataset
# ----------------------------

df.to_csv("../database/datasets/cleaned_dataset.csv", index=False)

print("Dataset cleaned and saved.")
print("New shape:", df.shape)