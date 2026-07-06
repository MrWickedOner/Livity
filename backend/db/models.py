"""
SQLAlchemy ORM models for Livity — Digital Twin & Vault data.

Models:
- User: account that owns vaults
- Vault: top-level container for encrypted legacy content
- EncryptedContent: reference to an encrypted blob in storage
- Invitation: family member invitation to access a vault
- AccessPermission: granted read/write access for family members
- TwinRecord: Digital Twin metadata
- VaultItemRecord: vault item metadata (backward compat)
- MemoryEmbedding: vector embeddings for RAG retrieval
- ConversationLog: user-twin conversation audit log
"""

import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text, LargeBinary, UniqueConstraint
)
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship

from db.database import Base


def _uuid():
    return str(uuid.uuid4())


# ── Authentication & Users ─────────────────────────────────────────


class User(Base):
    """User accounts that own vaults and twins."""
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    display_name = Column(String(100), nullable=False, default="")
    auth_provider = Column(String(50), nullable=False, default="clerk")
    auth_provider_id = Column(String(255), unique=True, nullable=True)
    tier = Column(String(20), nullable=False, default="vault")  # vault | twin | legacy
    subscription_status = Column(String(20), nullable=False, default="trialing")
    stripe_customer_id = Column(String(255), unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    # Relationships
    vaults = relationship("Vault", back_populates="owner", cascade="all, delete-orphan")


# ── Vaults ─────────────────────────────────────────────────────────


class Vault(Base):
    """Top-level container for a user's encrypted legacy content."""
    __tablename__ = "vaults"

    id = Column(String, primary_key=True, default=_uuid)
    owner_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    display_name = Column(String(255), nullable=False, default="My Legacy Vault")
    description = Column(Text, nullable=False, default="")
    cover_photo_key = Column(String(255), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    master_key_envelope = Column(LargeBinary, nullable=True)
    master_key_nonce = Column(LargeBinary, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    # Relationships
    owner = relationship("User", back_populates="vaults")
    contents = relationship("EncryptedContent", back_populates="vault", cascade="all, delete-orphan")
    invitations = relationship("Invitation", back_populates="vault", cascade="all, delete-orphan")
    permissions = relationship("AccessPermission", back_populates="vault", cascade="all, delete-orphan")


# ── Encrypted Content ──────────────────────────────────────────────


class EncryptedContent(Base):
    """Reference to an encrypted blob in the storage backend."""
    __tablename__ = "encrypted_content"

    id = Column(String, primary_key=True, default=_uuid)
    vault_id = Column(String, ForeignKey("vaults.id"), nullable=False, index=True)
    uploader_id = Column(String, ForeignKey("users.id"), nullable=False)
    content_type = Column(String(20), nullable=False)  # photo|document|audio|letter|story|portrait
    display_name = Column(String(255), nullable=False, default="")
    mime_type = Column(String(100), nullable=False, default="application/octet-stream")
    file_size_bytes = Column(Integer, nullable=False, default=0)
    storage_key = Column(String(500), nullable=False)
    encryption_algorithm = Column(String(50), nullable=False, default="AES-256-GCM")
    encryption_key_id = Column(String(100), nullable=False)
    encryption_nonce = Column(LargeBinary, nullable=False)
    encryption_tag = Column(LargeBinary, nullable=False)
    aad_vault_id = Column(String, nullable=False)
    sha256_hash = Column(LargeBinary, nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    transcript_key = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    # Relationships
    vault = relationship("Vault", back_populates="contents")


# ── Invitations ────────────────────────────────────────────────────


class Invitation(Base):
    """Family member invitation to access a vault."""
    __tablename__ = "invitations"

    id = Column(String, primary_key=True, default=_uuid)
    vault_id = Column(String, ForeignKey("vaults.id"), nullable=False)
    inviter_id = Column(String, ForeignKey("users.id"), nullable=False)
    invitee_email = Column(String(255), nullable=False, index=True)
    invitee_name = Column(String(100), nullable=False, default="")
    invite_code = Column(String(255), unique=True, nullable=False)
    access_level = Column(String(20), nullable=False, default="read")  # read | write_memory
    message = Column(Text, nullable=False, default="")
    expires_at = Column(DateTime, nullable=False)
    accepted_at = Column(DateTime, nullable=True)
    revoked_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    vault = relationship("Vault", back_populates="invitations")


# ── Access Permissions ─────────────────────────────────────────────


class AccessPermission(Base):
    """Granted access for family members after invitation acceptance."""
    __tablename__ = "access_permissions"

    id = Column(String, primary_key=True, default=_uuid)
    vault_id = Column(String, ForeignKey("vaults.id"), nullable=False)
    grantee_id = Column(String, ForeignKey("users.id"), nullable=False)
    granted_by = Column(String, ForeignKey("users.id"), nullable=False)
    level = Column(String(20), nullable=False, default="read")  # read|write_memory|admin
    can_add_photos = Column(Boolean, nullable=False, default=False)
    can_add_stories = Column(Boolean, nullable=False, default=False)
    can_add_audio = Column(Boolean, nullable=False, default=False)
    can_add_letters = Column(Boolean, nullable=False, default=False)
    granted_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)
    revoked_at = Column(DateTime, nullable=True)
    revoked_by = Column(String, ForeignKey("users.id"), nullable=True)

    # Relationships
    vault = relationship("Vault", back_populates="permissions")


# ── Digital Twins ──────────────────────────────────────────────────


class TwinRecord(Base):
    """Stores Digital Twin metadata."""
    __tablename__ = "twins"

    id = Column(String, primary_key=True, default=_uuid)
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
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    size_bytes = Column(Integer, nullable=False)
    encrypted_path = Column(Text, nullable=False)
    sha256_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class MemoryEmbedding(Base):
    """Stores vector embeddings for RAG retrieval."""
    __tablename__ = "memory_embeddings"

    id = Column(String, primary_key=True)
    twin_id = Column(String, nullable=False, index=True)
    vault_item_id = Column(String, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    chunk_text = Column(Text, nullable=False)
    embedding = Column(ARRAY(Float), nullable=False)  # pgvector vector column
    created_at = Column(DateTime, default=datetime.utcnow)


class ConversationLog(Base):
    """Logs user-twin conversations for audit and improvement."""
    __tablename__ = "conversation_logs"

    id = Column(String, primary_key=True)
    twin_id = Column(String, nullable=False, index=True)
    user_query = Column(Text, nullable=False)
    twin_response = Column(Text, nullable=False)
    sources_used = Column(Text, nullable=True)  # JSON list of source IDs
    latency_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)