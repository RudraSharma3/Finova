# ml/train_model.py

import os
import sqlite3
import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# ✅ Absolute path to your project root and correct DB file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(BASE_DIR, 'database.db')
ml_dir = os.path.join(BASE_DIR, 'backend', 'ml')  # Adjust to match your folder structure

def train_and_save_model():
    # Load data from SQLite
    conn = sqlite3.connect(db_path)
    query = '''
        SELECT income, age, goal, sip_amount
        FROM records
        WHERE income IS NOT NULL AND age IS NOT NULL AND goal IS NOT NULL AND sip_amount IS NOT NULL
    '''
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    print("Tables in DB:", cursor.fetchall())

    df = pd.read_sql_query(query, conn)
    conn.close()

    if df.empty or len(df) < 10:
        raise ValueError("Not enough data to train the model. Need at least 10 samples.")

    # Encode 'goal' using LabelEncoder
    le = LabelEncoder()
    df['goal_encoded'] = le.fit_transform(df['goal'])

    # Prepare features and target
    X = df[['income', 'age', 'goal_encoded']]
    y = df['sip_amount']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save the model and label encoder to correct location
    os.makedirs(ml_dir, exist_ok=True)
    model_path = os.path.join(ml_dir, 'personal_sip_model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump({
            'model': model,
            'goal_encoder': le
        }, f)

    print(f"✅ Model trained and saved at: {model_path}")

if __name__ == '__main__':
    train_and_save_model()
