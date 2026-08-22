from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os

# SQLite database file stored in backend directory
DATABASE_URL = "sqlite:///./heritage_shield.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """FastAPI Dependency for database session management."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
