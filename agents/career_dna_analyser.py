from agents.knowledge_adapter import get_career_data


def analyze_career_dna(user_profile, career_name):

    career_data = get_career_data(career_name)

    if not career_data:
        return {}

    career_dna = career_data.get("career_dna", {})

    if not career_dna:
        return {}

    # Map user traits → DNA
    user_dna = {
        "analytical": user_profile.get("Logical_Mathematical", 0),
        "creativity": user_profile.get("Linguistic", 0),
        "social": user_profile.get("Interpersonal", 0),
        "risk": user_profile.get("Bodily", 0),
        "structure": user_profile.get("Intrapersonal", 0)
    }

    strong_match = []
    weak_match = []

    for key in career_dna:

        user_val = user_dna.get(key, 0)
        career_val = career_dna.get(key, 0)

        if user_val >= career_val:
            strong_match.append(key)
        else:
            weak_match.append(key)

    # Insight generation
    insight = ""

    if weak_match:
        insight = f"You may need to improve {', '.join(weak_match[:2])} to better align with this career."
    else:
        insight = "Your personality strongly aligns with this career."

    return {
        "strong_match": strong_match,
        "weak_match": weak_match,
        "insight": insight
    }