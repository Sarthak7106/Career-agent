# agents/confidence_interpreter.py

def interpret_confidence(score):

    if score >= 0.30:
        level = "HIGH"
        message = "Your profile strongly aligns with this career."

    elif score >= 0.15:
        level = "MODERATE"
        message = "Your profile moderately aligns with this career."

    else:
        level = "LOW"
        message = "Your profile matches multiple careers. Consider exploring the top recommendations."

    return {
        "confidence_level": level,
        "message": message
    }