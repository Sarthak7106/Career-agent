# agents/roadmap_generator.py

from agents.knowledge_adapter import get_roadmap


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

    roadmap = get_roadmap(career)

    # fallback if not found
    if not roadmap:
        roadmap = DEFAULT_ROADMAP

    return {
        "career": career,
        "roadmap": roadmap
    }