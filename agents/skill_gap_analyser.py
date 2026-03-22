from agents.career_knowledge_base import CAREER_SKILLS


def analyze_skill_gap(career, user_skills=None, skills=None):

    # -------- Handle field mismatch -------- #
    if user_skills is None:
        user_skills = skills if skills else []

    # -------- Normalize user skills -------- #
    user_skills = {s.strip().lower() for s in user_skills}

    required_skills = CAREER_SKILLS.get(career, [])

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        if skill.lower() in user_skills:
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