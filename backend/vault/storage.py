"""
Vault Content Storage — encrypt-then-store pattern.

Content flow:
1. Upload → encrypt with AES-256-GCM → store ciphertext (never raw)
2. Read → retrieve ciphertext → decrypt → return plaintext

Storage backends:
- Local filesystem (development)
- S3-compatible (production, configured via VAULT_STORAGE_BACKEND=aws_s3)
"""

import hashlib
import os
from pathlib import Path

from .encryption import EncryptionKey, EncryptionResult, encrypt, decrypt


class StorageBackend:
    """Local filesystem storage backend for development."""

    def __init__(self, base_path: str | None = None):
        self.base_path = Path(
            base_path or os.environ.get("VAULT_STORAGE_PATH", "./data/vault")
        )
        self.base_path.mkdir(parents=True, exist_ok=True)

    def _resolve(self, key: str) -> Path:
        safe_key = key.replace("/", "_").replace("..", "_")
        return self.base_path / safe_key

    def store(self, key: str, data: bytes) -> None:
        self._resolve(key).write_bytes(data)

    def retrieve(self, key: str) -> bytes:
        return self._resolve(key).read_bytes()

    def delete(self, key: str) -> None:
        path = self._resolve(key)
        if path.exists():
            path.unlink()

    def exists(self, key: str) -> bool:
        return self._resolve(key).exists()


def compute_hash(data: bytes) -> bytes:
    """SHA-256 hash for integrity verification."""
    return hashlib.sha256(data).digest()


class VaultStorage:
    """High-level vault storage with encrypt-then-store pattern."""

    def __init__(self, backend: StorageBackend | None = None):
        self.backend = backend or StorageBackend()

    def store_content(
        self,
        plaintext: bytes,
        content_id: str,
        vault_key: EncryptionKey,
        vault_id: str,
    ) -> tuple[EncryptionResult, str]:
        """Encrypt plaintext and store ciphertext.

        Returns (EncryptionResult, storage_key).
        """
        aad = f"livity:vault:{vault_id}:content:{content_id}".encode("utf-8")
        result = encrypt(plaintext, vault_key, aad=aad)
        storage_key = f"{vault_id}/{content_id}.enc"
        self.backend.store(storage_key, result.nonce + result.ciphertext + result.tag)
        return result, storage_key

    def retrieve_content(
        self,
        storage_key: str,
        vault_key: EncryptionKey,
        vault_id: str,
        expected_content_id: str,
    ) -> bytes:
        """Retrieve and decrypt content. Raises InvalidTag on tamper."""
        encrypted = self.backend.retrieve(storage_key)
        nonce = encrypted[:12]
        tag = encrypted[-16:]
        ciphertext = encrypted[12:-16]

        result = EncryptionResult(
            ciphertext=ciphertext, nonce=nonce, tag=tag, key_id=vault_key.id
        )
        aad = f"livity:vault:{vault_id}:content:{expected_content_id}".encode("utf-8")
        return decrypt(result, vault_key, aad=aad)

    def delete_content(self, storage_key: str) -> None:
        self.backend.delete(storage_key)