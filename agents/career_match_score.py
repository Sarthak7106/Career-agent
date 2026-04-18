from agents.knowledge_adapter import get_career_data

TRAIT_MAP = {
    "Interpersonal": ["empathetic", "persuasive", "social"],
    "Intrapersonal": ["self-aware", "reflective", "disciplined"],
    "Linguistic": ["communication", "expressive"],
    "Logical_Mathematical": ["analytical", "strategic"],
    "Spatial_Visualization": ["visual"],
    "Bodily": ["physical"],
    "Musical": ["music", "rhythm"]
}
def calculate_match_score(user_profile, career_name):

    career_data = get_career_data(career_name)

    if not career_data:
        return 0

    # -------- SKILLS MATCH --------
    user_skills = [s.lower() for s in user_profile.get("skills", [])]

    career_skills = []
    skills_data = career_data.get("skills", {})

    for category in skills_data.values():
        career_skills.extend(category)

    career_skills = [s.lower() for s in career_skills]

    matched = sum(
        1 for cs in career_skills
        if any(us in cs or cs in us for us in user_skills)
    )

    skill_score = (matched / len(career_skills)) * 100 if career_skills else 0

    # -------- TRAITS MATCH --------
    career_traits = [t.lower() for t in career_data.get("traits", [])]

    trait_score = 0

    if career_traits:
        total = 0
        count = 0

        for feature, mapped_traits in TRAIT_MAP.items():

            for ct in career_traits:
                ct = ct.lower()

                if any(mt in ct for mt in mapped_traits):
                    total += user_profile.get(feature, 0)
                    count += 1
                    break

        if count > 0:
            trait_score = (total / (count * 10)) * 100

    # -------- INTEREST MATCH --------
    user_interests = [i.lower() for i in user_profile.get("interests", [])]
    career_interests = [i.lower() for i in career_data.get("interests", [])]

    interest_match = sum(
        1 for ci in career_interests
        if any(ui in ci or ci in ui for ui in user_interests)
    )

    interest_score = (
        (interest_match / len(career_interests)) * 100
        if career_interests else 0
    )

    # -------- FINAL SCORE --------
    final_score = (
        0.5 * skill_score +
        0.3 * trait_score +
        0.2 * interest_score
    )

    return round(final_score, 2)