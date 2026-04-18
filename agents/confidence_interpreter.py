# agents/confidence_interpreter.py

def interpret_confidence(score, top_predictions=None):
    
    # Safety check
    if score is None:
        return {
            "confidence_level": "UNKNOWN",
            "message": "Unable to determine confidence due to missing data."
        }

    # Base confidence levels
    if score >= 0.30:
        level = "HIGH"
        message = "Your profile strongly aligns with this career."

    elif score >= 0.15:
        level = "MODERATE"
        message = "Your profile moderately aligns with this career."

    else:
        level = "LOW"
        message = "Your profile matches multiple careers. Consider exploring the top recommendations."

    # 🔥 Extra intelligence (NEW)
    if top_predictions and len(top_predictions) > 1:
        diff = top_predictions[0]["confidence"] - top_predictions[1]["confidence"]

        if diff < 0.02:
            message += " Multiple careers have very similar scores, indicating overlapping suitability."

    return {
        "confidence_level": level,
        "message": message,
        "score": round(score, 3)
    }