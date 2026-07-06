"""
Database configuration — SQLAlchemy async engine with pgvector support.

Connects to Neon PostgreSQL with pgvector extension for storing
and querying memory embeddings.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from core.config import get_settings

settings = get_settings()

# Synchronous engine for now (async support can be added later with asyncpg)
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """
    Dependency that provides a database session.

    Yields a session and ensures it's closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()