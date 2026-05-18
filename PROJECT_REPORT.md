# Agentic Career Decision Support System: Project Report

## Executive Summary
The Agentic Career Decision Support System is a full-stack, AI-powered platform designed to provide personalized, gamified, and data-driven career guidance. The system integrates machine learning (Random Forest) for career prediction with an intelligent agent framework that performs deep profiling, skill gap analysis, explainability, and dynamic roadmapping. It bridges the gap between raw data predictions and actionable human-centric career advice.

---

## 1. System Architecture

The project follows a modern, decoupled architecture integrating a React frontend, a FastAPI backend, an SQLite database, and an autonomous Python-based AI agent layer.

### 1.1 Tech Stack
- **Frontend:** React.js, Vite, TailwindCSS (for responsive UI/UX), Recharts (for dynamic data visualization), Lucide React (for iconography).
- **Backend:** FastAPI (Python), Uvicorn.
- **Database:** SQLite (lightweight persistent storage).
- **Machine Learning Layer:** Scikit-Learn (Random Forest Classifier), Joblib (model serialization), Pandas.
- **Agent Intelligence Framework:** Custom multi-modular Python agent system.

---

## 2. Implemented Features

### 2.1 Intelligent Career Recommendation Engine
- **Predictive Modeling:** A trained Random Forest model (`career_rf_model.pkl`) takes psychometric input and multi-intelligence scores to predict the most suitable career path.
- **Top-3 Predictions & Confidence Scoring:** The system goes beyond a single prediction by ranking the top 3 potential careers along with their statistical confidence levels.
- **Confidence Interpreter:** A dedicated module translates raw probability scores into meaningful narrative text to explain model certainty.

### 2.2 Agentic Analysis Modules
The core intelligence of the system is orchestrated by the `CareerAgent`, combining several specialized sub-agents:
- **Career DNA Analyser:** Maps psychological traits (Linguistic, Logical, Spatial, etc.) against the inherent requirements of the recommended career.
- **Skill Gap Analyser:** Compares user-provided current skills with the industry-standard skills required for the target role, resulting in a quantified "Gap Percentage."
- **Readiness Score Engine:** Calculates a holistic score combining ML confidence and skill gap metrics to provide a realistic assessment of the user's immediate readiness.
- **Explainability Engine (XAI):** Unpacks the "Black Box" of the ML model. It extracts feature importance to visually explain *why* a particular career was recommended based on the user's specific inputs.
- **What-If Engine:** Allows users to simulate how improving a specific trait or skill could alter their career trajectories or increase their expected success rate.
- **Dynamic Roadmap Generator:** Automatically builds a customized, actionable step-by-step career progression roadmap based on the predicted role.
- **Insight & Report Generator:** Synthesizes the quantitative data into a cohesive, human-readable qualitative AI report.

### 2.3 Interactive Frontend Interface
The React UI is designed as a premium SaaS dashboard, divided into functional modules:
- **Profile Builder (`ProfileBuilder.jsx`):** An interactive, gamified assessment interface where users input their skills and take psychometric quizzes to build their "DNA" profile.
- **Results Dashboard (`ResultsDashboard.jsx`):** A centralized hub where all prediction metrics are visualized.
- **Explainability Tab (`Explainability.jsx`):** Displays feature impact and radar charts explaining the recommendation logic in a user-friendly manner via Recharts.
- **Skill Gap Tab (`SkillGap.jsx`):** Visually flags missing competencies to pinpoint exactly what the user needs to learn.
- **Roadmap Tab (`Roadmap.jsx`):** A timeline or milestone-based view tracking the user's progression path.
- **What-If Sandbox (`WhatIf.jsx`):** An interactive playground allowing users to tweak inputs to see theoretical outcomes.
- **History Tracking (`HistoryTab.jsx`):** Stores past predictions allowing users to look back at their trajectory.
- **AI Counselor (`Counselor.jsx`):** A module designed for conversational AI interactions relating to career queries.

### 2.4 Robust Knowledge Base
- **`career_knowledge_base.py`:** Contains a massive, hardcoded/structured domain-specific knowledge dictionary that maps careers to required skills, daily tasks, growth trajectories, and core competencies, anchoring the AI's dynamic logic to real-world data.

## 3. Workflow Summary

1. **User Input:** The user completes the psychometric assessment via the gamified React UI.
2. **Data Normalization:** The FastAPI backend processes the data and standardizes features via the `predict.py` scaler.
3. **ML Prediction:** The Random Forest model outputs the probabilities for different career paths.
4. **Agent Orchestration:** The `CareerAgent` triggers the DNA, Skill Gap, Explainability, and Roadmap sub-agents, augmenting the raw prediction with real-world context using the Knowledge Base.
5. **Presentation:** The frontend renders these complex insights into visually appealing charts, timelines, and readable reports.

---
*Report generated for Final Presentation and Documentation purposes.*
