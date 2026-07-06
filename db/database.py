"""
Database configuration — SQLAlchemy engine with pgvector support.

Connects to Tiger Cloud / Neon PostgreSQL with pgvector extension for storing
and querying memory embeddings. Falls back to SQLite for local dev.
"""

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from core.config import get_settings

settings = get_settings()

# Use DATABASE_URL if set, otherwise fall back to local SQLite for dev
DATABASE_URL = settings.database_url or "sqlite:///./data/livity_dev.db"

# pgvector only works on PostgreSQL; SQLite is for local dev only
if DATABASE_URL.startswith("postgresql"):
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )
else:
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency providing a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Create all tables. Call on startup."""
    from db.models import TwinRecord, VaultItemRecord, MemoryEmbedding, ConversationLog  # noqa
    Base.metadata.create_all(bind=engine)