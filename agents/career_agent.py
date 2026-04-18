# agent/career_agent.py

from models.predict import predict_career
from agents.skill_gap_analyser import analyze_skill_gap
from agents.roadmap_generator import generate_roadmap
from agents.explainability import get_feature_importance
from agents.what_if_engine import what_if_analysis
from agents.report_generator import generate_career_report
from agents.confidence_interpreter import interpret_confidence
from agents.knowledge_adapter import get_career_data
from agents.career_match_score import calculate_match_score
from agents.insight_generator import generate_insights
from agents.career_dna_analyser import analyze_career_dna

def calculate_readiness_score(confidence_score, gap_percentage):
    """
    Combines ML confidence with skill gap to estimate readiness.
    """
    readiness_score = confidence_score * (1 - gap_percentage / 100)
    return round(readiness_score, 4)


class CareerAgent:

    def __init__(self):
        pass

    def run(self, user_profile):

        # Step 1: Predict career
        prediction_result = predict_career(user_profile)

        career = prediction_result["career"]
        confidence = prediction_result["confidence"]
        top_predictions = prediction_result["top_predictions"]

        # 🔥 FIX: pass top_predictions
        confidence_info = interpret_confidence(confidence, top_predictions)

        # 🔥 NEW: get full career data
        career_data = get_career_data(career)

        # -------- Extract user skills --------
        user_skills = user_profile.get("user_skills") or user_profile.get("skills", [])

        # Step 2: Skill gap analysis
        skill_gap = analyze_skill_gap(
            career,
            user_skills
        )

        gap_percentage = skill_gap.get("gap_percentage", 0)

        # Step 3: Readiness Score
        readiness_score = calculate_readiness_score(
            confidence,
            gap_percentage
        )

        # Step 4: Roadmap generation
        roadmap = generate_roadmap(career)

        # Step 5: What-if analysis
        what_if = what_if_analysis(user_profile)

        # 🔥 FIX: pass career_data for KB-aware explainability
        importance = get_feature_importance(user_profile, career_data)

        match_score = calculate_match_score(user_profile, career)

        dna_analysis = analyze_career_dna(user_profile, career)
        
        # -------- RESULT STRUCTURE --------
        result = {

            "status": "success",

            "predicted_career": career,

            "confidence_score": confidence,

            "confidence_interpretation": confidence_info,

            "readiness_score": readiness_score,

            "match_score": match_score,

            "career_dna_analysis": dna_analysis,

            "top_predictions": top_predictions,

            "skill_gap_analysis": skill_gap,

            "career_roadmap": roadmap,

            "explainability": importance,

            "what_if_analysis": what_if
        }

        insights = generate_insights(result)
        result["insights"] = insights


        # Step 7: Generate AI report (already KB integrated)
        report = generate_career_report(result)

        result["career_report"] = report
        
        return result