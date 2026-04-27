from sqlmodel import SQLModel, create_engine, Session
import os

# --- CONFIGURATION ---
# Absolute path ensures the DB is created in the correct backend folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sqlite_file_name = os.path.join(BASE_DIR, "finova_core.db")
sqlite_url = f"sqlite:///{sqlite_file_name}"

# echo=False for production, True for debugging SQL commands
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

# --- DATABASE UTILITIES ---

def create_db_and_tables():
    """Initializes the database and creates tables by importing models locally."""
    # We import models here to register them with SQLModel before creation
    import models 
    SQLModel.metadata.create_all(engine)

def get_session():
    """Provides a database session for FastAPI routes."""
    with Session(engine) as session:
        yield session

if __name__ == "__main__":
    create_db_and_tables()
    print("✅ Unified Database Initialized: finova_core.db")