# backend/ml/utils.py

import pickle
import numpy as np
import os

# Get the absolute path to the current directory (backend/ml)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Join it with the filename to get the exact path to the .pkl file
model_path = os.path.join(BASE_DIR, 'personal_sip_model.pkl')

model = None
goal_encoder = None

try:
    with open(model_path, 'rb') as f:
        data = pickle.load(f)
        model = data['model']
        goal_encoder = data['goal_encoder']
    print("✅ Finova AI Model loaded successfully.")
except FileNotFoundError:
    print(f"❌ Model file not found at: {model_path}. Please run train_model.py first.")
except Exception as e:
    print(f"❌ Error loading model: {e}")

def predict_sip_model(income, age, goal):
    """
    Predicts suggested SIP based on income, age, and goal type.
    """
    if model is None or goal_encoder is None:
        raise Exception("AI Model or encoder not loaded. Ensure personal_sip_model.pkl exists.")

    try:
        # 1. Encode goal (e.g., 'Retirement' -> 2)
        goal_encoded = goal_encoder.transform([goal])[0]

        # 2. Create feature array for the model
        X = np.array([[income, age, goal_encoded]])

        # 3. Predict and return rounded value
        sip_pred = model.predict(X)[0]
        return round(float(sip_pred), 2)
    
    except ValueError:
        # Fallback if a goal type is provided that wasn't in the training set
        print(f"⚠️ Warning: Unknown goal '{goal}'. Using default calculation.")
        return round(income * 0.15, 2)