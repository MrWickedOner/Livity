"""
Encryption Service — Interface to the AES-256 vault.

This module defines the contract between the AI/RAG pipeline and the
Security Engineer's vault implementation. The Security Engineer will
replace the stub methods with real AES-256 encryption/decryption.

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

from dataclasses import dataclass
from typing import Optional


class DecryptionError(Exception):
    """Raised when decryption fails (tampered data, wrong key, etc.)."""
    pass


@dataclass
class EncryptedFileResult:
    """Metadata returned after encrypting a file."""
    encrypted_path: str
    original_sha256: str
    algorithm: str = "AES-256-GCM"


class EncryptionService:
    """
    Vault encryption/decryption interface.

    STUB: All methods return pass-through data. The Security Engineer
    will replace these with real AES-256-GCM operations using a key
    stored in the ENCRYPTION_KEY environment variable.
    """

    def __init__(self):
        self._key = None  # TODO: load from ENCRYPTION_KEY env var

    async def encrypt(self, plaintext: bytes) -> bytes:
        """
        Encrypt plaintext bytes.

        STUB: returns plaintext unchanged.
        TODO: implement AES-256-GCM encryption (Security Engineer).
        """
        return plaintext

    async def decrypt(self, ciphertext: bytes) -> bytes:
        """
        Decrypt ciphertext bytes.

        STUB: returns ciphertext unchanged.
        TODO: implement AES-256-GCM decryption (Security Engineer).
        """
        return ciphertext

    async def encrypt_file(self, file_path: str) -> EncryptedFileResult:
        """
        Encrypt a file on disk.

        STUB: returns a placeholder result.
        TODO: read file, encrypt, write .encrypted, return metadata.
        """
        return EncryptedFileResult(
            encrypted_path=file_path + ".encrypted",
            original_sha256="stub-sha256-placeholder",
        )

    async def decrypt_file(self, encrypted_path: str, output_path: str) -> None:
        """
        Decrypt a file back to plaintext.

        STUB: no-op.
        TODO: read encrypted, decrypt, write output.
        """
        pass