"""
Database configuration — SQLAlchemy engine with pgvector support.

Connects to Neon PostgreSQL with pgvector extension for storing
and querying memory embeddings. Falls back to SQLite for local dev.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from core.config import get_settings

settings = get_settings()
DATABASE_URL = settings.database_url or "sqlite:///./data/livity_dev.db"

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
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from db.models import TwinRecord, VaultItemRecord, MemoryEmbedding, ConversationLog
    Base.metadata.create_all(bind=engine)