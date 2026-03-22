from agents.career_knowledge_base import CAREER_ROADMAP


DEFAULT_ROADMAP = {

    "beginner": [
        "learn fundamental concepts of the field",
        "take introductory online courses"
    ],

    "intermediate": [
        "build practical projects",
        "gain internship or field experience"
    ],

    "advanced": [
        "develop specialization",
        "build professional portfolio"
    ]
}


def generate_roadmap(career):

    roadmap = CAREER_ROADMAP.get(career, DEFAULT_ROADMAP)

    return {

        "career": career,
        "roadmap": roadmap
    }