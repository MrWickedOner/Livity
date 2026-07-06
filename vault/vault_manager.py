"""
Vault Manager — high-level orchestration of vault lifecycle.

Coordinates encryption, key management, storage, and returns data
that the API layer persists via SQLAlchemy.

This is the primary interface that other services should call.
"""

import uuid
from dataclasses import dataclass
from datetime import datetime, timezone

from .encryption import EncryptionKey
from .key_management import generate_vault_master_key, wrap_vault_key, unwrap_vault_key
from .storage import VaultStorage, compute_hash


@dataclass
class StoredContentInfo:
    """Info about stored encrypted content, matching the DB schema."""
    content_id: str
    storage_key: str
    content_type: str
    mime_type: str
    file_size_bytes: int
    encryption_key_id: str
    encryption_nonce: bytes
    encryption_tag: bytes
    sha256_hash: bytes
    aad_vault_id: str
    created_at: datetime


class VaultManager:
    """Orchestrates vault operations. Does NOT interact with the DB directly."""

    def __init__(self, storage: VaultStorage | None = None):
        self.storage = storage or VaultStorage()

    def create_vault(
        self,
        user_key_material: bytes,
    ) -> tuple[str, EncryptionKey, bytes, bytes]:
        """Create a new vault: generate VMK, wrap with user key.

        Returns (vault_id, vault_key, wrapped_key, wrap_nonce).
        """
        vault_id = str(uuid.uuid4())
        vault_key = generate_vault_master_key()
        wrapped_key, wrap_nonce = wrap_vault_key(vault_key, user_key_material)
        return vault_id, vault_key, wrapped_key, wrap_nonce

    def unwrap_vault(
        self,
        user_key_material: bytes,
        wrapped_key: bytes,
        wrap_nonce: bytes,
    ) -> EncryptionKey:
        """Unwrap the vault master key for use."""
        return unwrap_vault_key(wrapped_key, wrap_nonce, user_key_material)

    def store_content(
        self,
        plaintext: bytes,
        content_type: str,
        mime_type: str,
        vault_id: str,
        vault_key: EncryptionKey,
    ) -> StoredContentInfo:
        """Encrypt and store content in a vault."""
        content_id = str(uuid.uuid4())
        file_size = len(plaintext)
        sha256 = compute_hash(plaintext)

        result, storage_key = self.storage.store_content(
            plaintext=plaintext,
            content_id=content_id,
            vault_key=vault_key,
            vault_id=vault_id,
        )

        return StoredContentInfo(
            content_id=content_id,
            storage_key=storage_key,
            content_type=content_type,
            mime_type=mime_type,
            file_size_bytes=file_size,
            encryption_key_id=result.key_id,
            encryption_nonce=result.nonce,
            encryption_tag=result.tag,
            sha256_hash=sha256,
            aad_vault_id=vault_id,
            created_at=datetime.now(timezone.utc),
        )

    def retrieve_content(
        self,
        storage_key: str,
        content_id: str,
        vault_id: str,
        vault_key: EncryptionKey,
    ) -> bytes:
        """Decrypt and return content from a vault."""
        return self.storage.retrieve_content(
            storage_key=storage_key,
            vault_key=vault_key,
            vault_id=vault_id,
            expected_content_id=content_id,
        )

    def verify_content_integrity(
        self, plaintext: bytes, expected_hash: bytes
    ) -> bool:
        """Verify decrypted content matches the stored hash."""
        return compute_hash(plaintext) == expected_hash