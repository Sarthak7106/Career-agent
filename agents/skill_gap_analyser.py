# agents/skill_gap_analyser.py

from agents.knowledge_adapter import get_skills

SKILL_SYNONYMS = {
    "communication": ["writing", "speaking", "presentation", "storytelling"],
    "literacy": ["writing", "reading"],
    "numeracy": ["math", "calculation"],
    "teaching": ["mentoring", "explaining", "training"],
    "programming": ["coding", "python", "java"],
    "algorithm": ["algorithms", "problem solving"],
    "creative": ["storytelling", "arts", "music"],
    "management": ["coordination", "leadership"],
    "assessment": ["evaluation", "testing"]
}
def is_skill_match(required, user_skills):

    required = required.lower()

    for us in user_skills:

        us = us.lower()

        # ✅ Direct match
        if required in us or us in required:
            return True

        # ✅ Synonym match
        for key, synonyms in SKILL_SYNONYMS.items():

            if key in required:
                if any(s in us for s in synonyms):
                    return True

            if key in us:
                if any(s in required for s in synonyms):
                    return True

    return False

def analyze_skill_gap(career, user_skills=None, skills=None):

    # -------- Handle field mismatch -------- #
    if user_skills is None:
        user_skills = skills if skills else []

    # -------- Normalize user skills -------- #
    user_skills = {s.strip().lower() for s in user_skills}

    # 🔥 FIX: Use adapter instead of direct mapping
    required_skills = get_skills(career)

    matched_skills = []
    missing_skills = []

    # -------- Smart Matching -------- #
    for skill in required_skills:
        skill_lower = skill.lower()

        # partial match support
        if is_skill_match(skill, user_skills):
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    # -------- Gap Calculation -------- #
    if not required_skills:
        gap_percentage = 100
    else:
        gap_percentage = (len(missing_skills) / len(required_skills)) * 100

    gap_percentage = round(gap_percentage, 2)

    # -------- Readiness Logic -------- #
    if gap_percentage <= 25:
        readiness_level = "HIGH"
        reason = "Your current skills strongly align with this career."

    elif gap_percentage <= 60:
        readiness_level = "MEDIUM"
        reason = "Some important skills are missing but can be developed."

    else:
        readiness_level = "LOW"
        reason = "High skill gap detected. Significant learning required."

    # -------- Return -------- #
    return {
        "career": career,
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "gap_percentage": gap_percentage,
        "readiness_level": readiness_level,
        "reason": reason
    }