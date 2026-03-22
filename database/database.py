import sqlite3
import os

# Create full absolute path to DB file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "career_ai.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    return conn
