# agent/explainability.py


# Human readable mapping
FEATURE_EXPLANATIONS = {

    "Linguistic": "Strong communication and language ability",

    "Logical_Mathematical": "Strong analytical and logical reasoning",

    "Interpersonal": "Good collaboration and teamwork skills",

    "Intrapersonal": "High self-awareness and reflective thinking",

    "Naturalist": "Interest in nature and environmental systems",

    "Spatial_Visualization": "Strong visual imagination and spatial reasoning",

    "Bodily": "Good physical coordination and motor skills",

    "Musical": "Strong sense of rhythm and musical ability"
}


def get_feature_importance(user_profile, top_n=5):

    # Extract only trait scores (remove skills list if present)
    traits = {
        k: v for k, v in user_profile.items()
        if isinstance(v, (int, float))
    }

    # Sort traits by value
    sorted_traits = sorted(
        traits.items(),
        key=lambda x: x[1],
        reverse=True
    )

    # Select top traits
    top_traits = sorted_traits[:top_n]

    result = []

    explanation_text = []

    for feature, score in top_traits:

        explanation = FEATURE_EXPLANATIONS.get(
            feature,
            feature.replace("_", " ")
        )

        result.append({
            "feature": feature,
            "importance": score,
            "explanation": explanation
        })

        explanation_text.append(feature.replace("_", " "))

    return {

        "top_features": result,

        "summary": "Your career recommendation is influenced by: " +
                   ", ".join(explanation_text)
    }