"""
SQLAlchemy ORM models for Digital Twin data.
Supports pgvector for memory embeddings.
"""

import uuid
from datetime import datetime

from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, Float, Index

from db.database import Base


class TwinRecord(Base):
    __tablename__ = "twins"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    user_id = Column(String, nullable=False, index=True)
    status = Column(String(20), default="processing")
    has_portrait = Column(Boolean, default=False)
    portrait_url = Column(Text, nullable=True)
    item_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class VaultItemRecord(Base):
    __tablename__ = "vault_items"

    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False, index=True)
    twin_id = Column(String, nullable=True, index=True)
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    size_bytes = Column(Integer, nullable=False)
    encrypted_path = Column(Text, nullable=False)
    sha256_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class MemoryEmbedding(Base):
    __tablename__ = "memory_embeddings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    twin_id = Column(String, nullable=False, index=True)
    vault_item_id = Column(String, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    chunk_text = Column(Text, nullable=False)
    embedding_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        Index("ix_memory_embeddings_twin_vault", "twin_id", "vault_item_id"),
    )


class ConversationLog(Base):
    __tablename__ = "conversation_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    twin_id = Column(String, nullable=False, index=True)
    user_query = Column(Text, nullable=False)
    twin_response = Column(Text, nullable=False)
    sources_used = Column(Text, nullable=True)
    latency_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)