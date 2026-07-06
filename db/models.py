"""
SQLAlchemy ORM models for Digital Twin data.
Supports pgvector for memory embeddings.
"""

import uuid
from datetime import datetime

from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, Float, Index
from sqlalchemy import create_engine as _sa_create_engine

from db.database import Base


class TwinRecord(Base):
    """Stores Digital Twin metadata."""

    __tablename__ = "twins"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    user_id = Column(String, nullable=False, index=True)
    status = Column(String(20), default="processing")  # processing | active | failed
    has_portrait = Column(Boolean, default=False)
    portrait_url = Column(Text, nullable=True)
    item_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class VaultItemRecord(Base):
    """Stores vault item metadata (encrypted content reference)."""

    __tablename__ = "vault_items"

    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False, index=True)
    twin_id = Column(String, nullable=True, index=True)  # which twin this belongs to
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    size_bytes = Column(Integer, nullable=False)
    encrypted_path = Column(Text, nullable=False)
    sha256_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class MemoryEmbedding(Base):
    """Stores vector embeddings for RAG retrieval."""

    __tablename__ = "memory_embeddings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    twin_id = Column(String, nullable=False, index=True)
    vault_item_id = Column(String, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    chunk_text = Column(Text, nullable=False)
    # For pgvector: the actual VECTOR column is created via raw SQL
    # For SQLite dev: stored as serialized JSON float array
    embedding_text = Column(Text, nullable=True)  # JSON-serialized vector for SQLite fallback
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        Index("ix_memory_embeddings_twin_vault", "twin_id", "vault_item_id"),
    )


class ConversationLog(Base):
    """Logs user-twin conversations for audit and improvement."""

    __tablename__ = "conversation_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    twin_id = Column(String, nullable=False, index=True)
    user_query = Column(Text, nullable=False)
    twin_response = Column(Text, nullable=False)
    sources_used = Column(Text, nullable=True)  # JSON list of source vault_item_ids
    latency_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)