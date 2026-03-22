# agent/report_generator.py

def generate_career_report(result):

    career = result.get("predicted_career", "Unknown")

    confidence = result.get("confidence_score", 0)

    readiness_score = result.get("readiness_score", 0)

    skill_gap = result.get("skill_gap_analysis", {})

    roadmap = result.get("career_roadmap", {}).get("roadmap", {})

    explainability = result.get("explainability", {})

    matched = skill_gap.get("matched_skills", [])

    missing = skill_gap.get("missing_skills", [])

    readiness_level = skill_gap.get("readiness_level", "Unknown")

    explanation_summary = explainability.get("summary", "")

    report = {

        "recommended_career": career,

        "confidence_score": confidence,

        "readiness_score": readiness_score,

        "readiness_level": readiness_level,

        "strengths": matched if matched else ["No strong skill match detected"],

        "skill_gaps": missing if missing else ["No major skill gaps detected"],

        "career_roadmap": roadmap,

        "ai_explanation": explanation_summary,

        "what_if_insight":
            "Improving key abilities may significantly change career outcomes. "
            "Refer to the What-If analysis section for alternative scenarios."

    }

    return report