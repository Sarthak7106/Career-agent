# agents/report_generator.py

from agents.knowledge_adapter import get_career_data


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

    # 🔥 NEW: Fetch full KB data
    career_data = get_career_data(career) or {}

    report = {

        "recommended_career": career,

        "confidence_score": confidence,

        "readiness_score": readiness_score,

        "readiness_level": readiness_level,

        # ✅ Skills
        "strengths": matched if matched else ["No strong skill match detected"],
        "skill_gaps": missing if missing else ["No major skill gaps detected"],

        # ✅ Roadmap
        "career_roadmap": roadmap,

        # ✅ AI Explanation
        "ai_explanation": explanation_summary,

        # 🔥 NEW: KB ENRICHMENT
        "traits_required": career_data.get("traits", []),
        "interests": career_data.get("interests", []),
        "day_in_life": career_data.get("day_in_life", []),

        "market_data": career_data.get("market_data", {}),
        "reality_check": career_data.get("reality_check", {}),

        "resources": career_data.get("resources", []),
        "related_careers": career_data.get("related_careers", []),

        "not_for_you_if": career_data.get("not_for_you_if", []),

        # ✅ Insight
        "what_if_insight":
            "Improving key abilities may significantly change career outcomes. "
            "Refer to the What-If analysis section for alternative scenarios."
    }

    return report