# agents/explainability.py

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

TRAIT_MAP = {
    "Interpersonal": ["empathetic", "persuasive", "social"],
    "Intrapersonal": ["self-aware", "reflective", "disciplined"],
    "Linguistic": ["communication", "expressive"],
    "Logical_Mathematical": ["analytical", "strategic"],
    "Spatial_Visualization": ["visual"],
    "Bodily": ["physical"],
    "Musical": ["music", "rhythm"]
}


def get_feature_importance(user_profile, career_data=None, top_n=5):

    # Extract only numeric traits
    traits = {
        k: v for k, v in user_profile.items()
        if isinstance(v, (int, float))
    }

    # Sort traits
    sorted_traits = sorted(
        traits.items(),
        key=lambda x: x[1],
        reverse=True
    )

    top_traits = sorted_traits[:top_n]

    result = []
    explanation_text = []

    # Normalize career traits
    career_traits = []
    if career_data:
        career_traits = [t.lower() for t in career_data.get("traits", [])]

    for feature, score in top_traits:

        explanation = FEATURE_EXPLANATIONS.get(
            feature,
            feature.replace("_", " ")
        )

        # 🔥 FIXED LOGIC USING TRAIT_MAP
        alignment_note = ""

        mapped_traits = TRAIT_MAP.get(feature, [])

        if career_traits and mapped_traits:
            if any(
                mt in ct
                for mt in mapped_traits
                for ct in career_traits
            ):
                alignment_note = " (Highly relevant for this career)"

        result.append({
            "feature": feature,
            "importance": score,
            "explanation": explanation + alignment_note
        })

        explanation_text.append(feature.replace("_", " "))

    return {
        "top_features": result,
        "summary": "Your career recommendation is influenced by: " +
                   ", ".join(explanation_text)
    }