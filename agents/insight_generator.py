def generate_insights(result):

    insights = []

    try:
        skill_gap = result.get("skill_gap_analysis", {})
        missing = skill_gap.get("missing_skills", [])
        matched = skill_gap.get("matched_skills", [])

        if matched:
            insights.append(
                f"You already have strengths in {', '.join(matched[:2])}."
            )

        if missing:
            insights.append(
                f"To improve your fit, focus on developing skills like {', '.join(missing[:2])}."
            )

        explain = result.get("explainability", {})
        top_features = explain.get("top_features", [])

        if top_features:
            top_trait = top_features[0]["feature"]
            insights.append(
                f"Your strong {top_trait.replace('_',' ')} ability supports this career path."
            )

        confidence = result.get("confidence_score", 0)

        if confidence < 0.1:
            insights.append(
                "Your profile matches multiple careers, so consider exploring alternatives."
            )
        elif confidence > 0.3:
            insights.append(
                "You show strong alignment with this career."
            )

    except Exception as e:
        print("INSIGHT ERROR:", str(e))

    return insights