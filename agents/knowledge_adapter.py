# agents/knowledge_adapter.py

from agents.career_knowledge_base import CAREERS


# =========================
# 🔹 Helper Functions
# =========================

def normalize_name(name):
    return name.lower().strip()


def flatten_skills(skills_dict):
    return (
        skills_dict.get("core", []) +
        skills_dict.get("important", []) +
        skills_dict.get("good_to_have", [])
    )


def find_career(predicted_name):
    predicted_name = predicted_name.lower().strip()

    for career in CAREERS:
        name = career.get("career", "").lower()

        # 🔥 STRONG MATCH (IMPORTANT)
        if predicted_name in name or name in predicted_name:
            return career

    return None


# =========================
# 🔹 Mappings
# =========================

CAREER_SKILLS = {}
CAREER_ROADMAP = {}
CAREER_FULL_DATA = {}

for career in CAREERS:
    name = career.get("career")

    if not name:
        continue

    # ✅ Flatten skills
    if "skills" in career:
        CAREER_SKILLS[name] = flatten_skills(career["skills"])

    # ✅ Roadmap
    if "roadmap" in career:
        CAREER_ROADMAP[name] = career["roadmap"]

    # ✅ Full career data (IMPORTANT)
    CAREER_FULL_DATA[name] = career


# =========================
# 🔹 Getter Functions
# =========================

def get_skills(predicted_name):
    career = find_career(predicted_name)

    if not career:
        print("❌ No career match found for:", predicted_name)
        return []

    skills = flatten_skills(career.get("skills", {}))

    print("✅ Skills found for", predicted_name, ":", skills)

    return skills

def get_roadmap(predicted_name):
    career = find_career(predicted_name)
    if not career:
        print("❌ No career match found for:", predicted_name)
        return {}
    return career.get("roadmap", {})


def get_career_data(predicted_name):
    career = find_career(predicted_name)

    print("PREDICTED:", predicted_name)
    print("MATCHED CAREER:", career)

    return career