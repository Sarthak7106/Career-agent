# agent/what_if_engine.py

from models.predict import predict_career
from agents.skill_gap_analyser import analyze_skill_gap


def improve_trait(profile, trait, amount=3):
    """
    Safely improve a trait without modifying original profile
    """
    new_profile = profile.copy()

    current_value = new_profile.get(trait, 0)
    new_profile[trait] = min(current_value + amount, 10)

    return new_profile


def what_if_analysis(user_profile):

    # Original prediction
    original_prediction = predict_career(user_profile)

    comparison_table = []

    # 🔥 ORIGINAL BASELINE WITH SKILL GAP
    original_gap = analyze_skill_gap(
        original_prediction["career"],
        user_profile.get("skills", [])
    )

    comparison_table.append({
        "scenario": "Original Profile",
        "prediction": original_prediction["career"],
        "confidence": original_prediction["confidence"],
        "readiness": original_gap["readiness_level"],
        "gap_percentage": original_gap["gap_percentage"],
        "top_predictions": original_prediction["top_predictions"]
    })

    # Define improvement scenarios
    scenarios = {
        "Improve Logical Ability": "Logical_Mathematical",
        "Improve Interpersonal Skills": "Interpersonal",
        "Improve Linguistic Ability": "Linguistic"
    }

    # Run scenarios
    for scenario_name, trait in scenarios.items():

        modified_profile = improve_trait(user_profile, trait)

        prediction = predict_career(modified_profile)

        # 🔥 NEW: skill gap impact
        gap = analyze_skill_gap(
            prediction["career"],
            modified_profile.get("skills", [])
        )

        comparison_table.append({
            "scenario": scenario_name,
            "prediction": prediction["career"],
            "confidence": prediction["confidence"],
            "readiness": gap["readiness_level"],
            "gap_percentage": gap["gap_percentage"],
            "top_predictions": prediction["top_predictions"]
        })

    return {
        "original_profile": user_profile,
        "comparison_table": comparison_table
    }