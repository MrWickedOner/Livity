"""
Encryption Service — Interface to the AES-256 vault.

This module provides the real AES-256-GCM encryption/decryption that the
AI/RAG pipeline and API layer call. It wraps the low-level vault module.

API Contract:
  - encrypt(plaintext: bytes) -> bytes
      Returns encrypted ciphertext with embedded IV and auth tag.
  - decrypt(ciphertext: bytes) -> bytes
      Returns original plaintext. Raises DecryptionError on tamper.
  - encrypt_file(file_path: str) -> EncryptedFileResult
      Encrypts a file on disk, returns metadata for storage.
  - decrypt_file(encrypted_path: str, output_path: str) -> None
      Decrypts a file back to plaintext.
"""

import hashlib
import os
from dataclasses import dataclass

from core.config import get_settings
from vault.encryption import EncryptionKey, encrypt, decrypt
from vault.key_management import DecryptionError


@dataclass
class EncryptedFileResult:
    """Metadata returned after encrypting a file."""
    encrypted_path: str
    original_sha256: str
    algorithm: str = "AES-256-GCM"


class EncryptionService:
    """
    Vault encryption/decryption interface backed by real AES-256-GCM.

    The encryption key is loaded from the ENCRYPTION_KEY env var
    (configured in core.config.Settings).
    """

    def __init__(self):
        settings = get_settings()
        key_hex = settings.encryption_key
        if not key_hex:
            # In development, generate an ephemeral key
            from vault.encryption import generate_key
            key = generate_key("dev-ephemeral")
            self._key = key
        else:
            key_bytes = bytes.fromhex(key_hex)
            self._key = EncryptionKey(id="env-key", material=key_bytes)

    async def encrypt(self, plaintext: bytes) -> bytes:
        """
        Encrypt plaintext bytes with AES-256-GCM.

        Returns: nonce (12) + ciphertext + tag (16) — a self-contained payload.
        The caller can store this entire blob; decrypt() will parse it.
        """
        result = encrypt(plaintext, self._key)
        return result.nonce + result.ciphertext + result.tag

    async def decrypt(self, ciphertext: bytes) -> bytes:
        """
        Decrypt ciphertext bytes produced by encrypt().

        Raises DecryptionError if data is tampered or wrong key.
        """
        try:
            nonce = ciphertext[:12]
            tag = ciphertext[-16:]
            ct = ciphertext[12:-16]

            from vault.encryption import EncryptionResult
            result = EncryptionResult(
                ciphertext=ct, nonce=nonce, tag=tag, key_id=self._key.id
            )
            return decrypt(result, self._key)
        except Exception as e:
            raise DecryptionError(f"Decryption failed: {e}") from e

    async def encrypt_file(self, file_path: str) -> EncryptedFileResult:
        """Encrypt a file on disk. Writes <file_path>.encrypted."""
        with open(file_path, "rb") as f:
            plaintext = f.read()

        # Compute SHA-256 of original for integrity verification
        sha256 = hashlib.sha256(plaintext).hexdigest()

        encrypted = await self.encrypt(plaintext)
        encrypted_path = file_path + ".encrypted"
        with open(encrypted_path, "wb") as f:
            f.write(encrypted)

        return EncryptedFileResult(
            encrypted_path=encrypted_path,
            original_sha256=sha256,
            algorithm="AES-256-GCM",
        )

    async def decrypt_file(self, encrypted_path: str, output_path: str) -> None:
        """Decrypt a file back to plaintext."""
        with open(encrypted_path, "rb") as f:
            encrypted = f.read()

        plaintext = await self.decrypt(encrypted)
        with open(output_path, "wb") as f:
            f.write(plaintext)