from enum import Enum
from typing import Optional, Any, Annotated, List
from sqlmodel import SQLModel, Field, Relationship
from pydantic import BaseModel, BeforeValidator
from datetime import datetime , date

# --- 1. ENUMS & VALIDATORS ---
class Category(str, Enum):
    FOOD = "Food & Dining"
    SHOPPING = "Shopping"
    TRANSPORT = "Transport & Fuel"
    BILLS = "Bills & Utilities"
    ENTERTAINMENT = "Entertainment"
    INVESTMENT = "Investment"
    TRANSFER = "Personal Transfer"
    OTHER = "Other"

def validate_category(v: Any) -> str:
    if isinstance(v, Category):
        return v.value
    return str(v)

# --- 2. DATABASE TABLES (SQLModel) ---

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str 
    
    # Financial Profile (Fixed Obligations)
    monthly_income: float = Field(default=0.0)
    rent: float = Field(default=0.0)
    emis: float = Field(default=0.0)
    insurance: float = Field(default=0.0)
    target_savings_rate: float = Field(default=0.30) # Default 30%
    current_bank_balance: float = Field(default=0.0) # To calculate Lazy Cash loss
    
    # Relationships
    transactions: List["Transaction"] = Relationship(back_populates="user")
    goals: List["Goal"] = Relationship(back_populates="user")

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    amount: float
    merchant: str
    bank_name: str
    category: str
    is_personal_transfer: bool
    timestamp: datetime = Field(default_factory=datetime.now)
    is_recurring: bool = Field(default=False) # For subscription detection
    
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="transactions")

class Goal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    goal_name: str 
    target_amount: float
    years: int
    required_sip: float
    timestamp: datetime = Field(default_factory=datetime.now)
    
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="goals")

# --- 3. API MODELS (Pydantic) ---

class TransactionAI(BaseModel):
    amount: float
    merchant: str
    bank_name: str
    category: Annotated[str, BeforeValidator(validate_category)]
    is_personal_transfer: bool

class SMSInput(BaseModel):
    text: str

class PlanInput(BaseModel):
    income: float
    goal_amount: float
    years: int
    goal_name: str

class ProfileUpdate(BaseModel):
    monthly_income: float
    rent: float
    emis: float
    insurance: float

class DailySnapshot(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    snapshot_date: date = Field(default_factory=date.today) # Renamed to snapshot_date
    expected_limit: float
    actual_spent: float = 0.0