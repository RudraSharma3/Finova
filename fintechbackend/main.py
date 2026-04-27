from fastapi import FastAPI, HTTPException, Depends, status
from sqlmodel import Session, select, func
from database import engine, create_db_and_tables, get_session
from parser import extract_transaction_info
from models import Transaction, SMSInput, User, Goal, PlanInput, ProfileUpdate
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from datetime import datetime, date, timedelta
import calendar
from pydantic import BaseModel

from auth import hash_password, verify_password, create_access_token, SECRET_KEY, ALGORITHM
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

app = FastAPI(title="Finova - The Adaptive Wealth Engine")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# ALLOW ALL ORIGINS FOR LOCAL DEVELOPMENT TO PREVENT FETCH ERRORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdvisorQuery(BaseModel):
    purchase_amount: float
    item_name: str

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

async def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate identity",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = session.exec(select(User).where(User.username == username)).first()
    if user is None:
        raise credentials_exception
    return user

def get_current_pulse_data(session: Session, user: User):
    today = date.today()
    start_of_month = datetime(today.year, today.month, 1)
    spent = session.exec(select(func.sum(Transaction.amount)).where(Transaction.user_id == user.id, Transaction.timestamp >= start_of_month)).one() or 0
    
    days_left = calendar.monthrange(today.year, today.month)[1] - today.day + 1
    fixed_costs = user.rent + user.emis + user.insurance
    investments = user.monthly_income * user.target_savings_rate
    
    safe_pool = user.monthly_income - fixed_costs - investments - spent
    daily_limit = safe_pool / days_left if days_left > 0 else 0
    return round(max(0, daily_limit), 2), spent

def calculate_goal_drift(amount: float, income: float, is_credit: bool = False, years_left: int = 10):
    annual_rate = 0.12
    monthly_rate = annual_rate / 12
    months = years_left * 12
    future_value = amount * ((1 + monthly_rate) ** months)
    daily_savings = (income * 0.3) / 30
    days_impact = future_value / daily_savings if daily_savings > 0 else 0
    
    if is_credit:
        return {"future_impact": round(future_value, 2), "days_saved": round(days_impact, 1)}
    return {"future_impact": round(future_value, 2), "days_delayed": round(days_impact, 1)}

# Create a small model for the signup request
class AuthInput(BaseModel):
    username: str
    password: str

@app.post("/auth/signup")
async def signup(user_data: AuthInput, session: Session = Depends(get_session)):
    # 1. Check if user exists
    existing = session.exec(select(User).where(User.username == user_data.username)).first()
    if existing: 
        raise HTTPException(status_code=400, detail="Username taken")
    
    # 2. Create the new user using the AuthInput model
    new_user = User(
        username=user_data.username,
        hashed_password=hash_password(user_data.password),
        monthly_income=0.0,
        rent=0.0,
        current_bank_balance=0.0
    )
    
    try:
        session.add(new_user)
        session.commit()
        return {"status": "Identity Created"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Database Error: {str(e)}")

@app.post("/auth/login")
async def login(user_data: dict, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == user_data['username'])).first()
    if not user or not verify_password(user_data['password'], user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/user/setup")
async def setup_profile(data: ProfileUpdate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    user.monthly_income, user.rent = data.monthly_income, data.rent
    user.emis, user.insurance = data.emis, data.insurance
    user.current_bank_balance = data.monthly_income * 0.7  
    session.add(user); session.commit(); session.refresh(user)
    return {"status": "DNA Initialized", "user_id": user.id}

@app.get("/dashboard/summary")
def get_master_summary(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    daily_limit, total_spent = get_current_pulse_data(session, user)
    lazy_daily_leak = round((user.current_bank_balance * 0.09) / 365, 2)
    base_score = 70
    discipline_bonus = 15 if daily_limit > 500 else -10
    health_score = max(10, min(100, base_score + discipline_bonus))

    return {
        "overall_health_score": health_score,
        "daily_safe_budget": daily_limit,
        "username": user.username,
        "wealth_leaks": {
            "daily_lazy_cash_loss": lazy_daily_leak,
            "monthly_impact": round(lazy_daily_leak * 30, 2)
        },
        "streak_data": {"current_streak": 5, "status": "Disciplined"},
        "nudges": [
            f"You have ₹{daily_limit} left to spend today safely.",
            f"Investing your idle cash could save ₹{round(lazy_daily_leak * 30, 2)} this month."
        ]
    }

# Remaining /parse and /ask-finova routes as per your original main.py...

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000) # CHANGED TO 127.0.0.1