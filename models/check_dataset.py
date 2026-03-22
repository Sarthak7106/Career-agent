import pandas as pd

# dataset load karo
df = pd.read_csv(r"C:\Users\rajsa\OneDrive\Desktop\Agentic-BTP\database\datasets\cleaned_dataset.csv")

print("\nCAREERS IN DATASET:\n")
print(df["Job profession"].unique())

print("\nFIRST 5 ROWS:\n")
print(df.head())

print("\nTRAIT VALUE RANGE:\n")
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
    print(t, "→ min:", df[t].min(), "max:", df[t].max())