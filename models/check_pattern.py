import pandas as pd

df = pd.read_csv(r"C:\Users\rajsa\OneDrive\Desktop\Agentic-BTP\database\datasets\cleaned_dataset.csv")

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

# average trait values per career
career_traits = df.groupby("Job profession")[traits].mean()

print(career_traits)