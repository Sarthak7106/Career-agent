# agent/what_if_engine.py

from models.predict import predict_career


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

    # Add original baseline
    comparison_table.append({

        "scenario": "Original Profile",

        "prediction": original_prediction["career"],

        "confidence": original_prediction["confidence"],

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

        comparison_table.append({

            "scenario": scenario_name,

            "prediction": prediction["career"],

            "confidence": prediction["confidence"],

            "top_predictions": prediction["top_predictions"]

        })

    return {

        "original_profile": user_profile,

        "comparison_table": comparison_table
    }