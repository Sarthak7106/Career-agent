from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sys
import os

# Allow backend to access parent folders
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from database.database import get_connection
from agents.career_agent import CareerAgent   # matches your folder name "agents"

app = FastAPI(
    title="Agentic Career AI Backend",
    version="1.0.0"
)

# initialize agent once (important)
agent = CareerAgent()


# --------------------------------
# Request model (recommended)
# --------------------------------

class UserProfile(BaseModel):

    skills: list[str] = []

    # All ML features optional (default = 0)
    Linguistic: float = 0
    Musical: float = 0
    Bodily: float = 0
    Logical_Mathematical: float = 0
    Spatial_Visualization: float = 0
    Interpersonal: float = 0
    Intrapersonal: float = 0
    Naturalist: float = 0

    P1_BEST: float = 0
    P1_POOR: float = 0
    P2_BEST: float = 0
    P2_POOR: float = 0
    P3_BEST: float = 0
    P3_POOR: float = 0
    P4_BEST: float = 0
    P4_POOR: float = 0
    P5_BEST: float = 0
    P5_POOR: float = 0
    P6_BEST: float = 0
    P6_POOR: float = 0
    P7_BEST: float = 0
    P7_POOR: float = 0
    P8_BEST: float = 0
    P8_POOR: float = 0


# -------------------------------
# Basic routes
# -------------------------------

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Career AI Backend Running"
    }


@app.get("/check-db")
def check_db():

    try:
        conn = get_connection()
        conn.close()

        return {
            "status": "success",
            "message": "Database Connected Successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )


# --------------------------------
# Career Recommendation Route
# --------------------------------

@app.post("/career/recommend")
def recommend_career(user_profile: UserProfile):

    try:

        profile_dict = user_profile.dict()

        result = agent.run(profile_dict)

        return {

            "status": "success",

            "prediction": result.get("predicted_career"),

            "confidence_score": result.get("confidence_score"),

            "skill_gap": result.get("skill_gap_analysis"),

            "roadmap": result.get("career_roadmap"),

            "explainability": result.get("explainability"),

            "what_if_analysis": result.get("what_if_analysis")
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Agent error: {str(e)}"
        )