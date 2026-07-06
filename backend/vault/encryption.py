"""
Low-level AES-256-GCM encryption primitives.

Uses the `cryptography` library (rust-backed, audited) — never PyCrypto or raw OpenSSL.

Design:
- AES-256-GCM with 12-byte nonces (recommended for GCM)
- Each encryption generates a fresh random nonce
- Associated Authenticated Data (AAD) binds ciphertext to a vault_id
- Output: nonce (12) + ciphertext + tag (16) — stored separately in DB
"""

import os
from dataclasses import dataclass

from cryptography.hazmat.primitives.ciphers.aead import AESGCM


@dataclass(frozen=True)
class EncryptionResult:
    """Container for an AES-256-GCM encryption output."""
    ciphertext: bytes
    nonce: bytes          # 12 bytes, random per encryption
    tag: bytes            # 16 bytes GCM authentication tag
    key_id: str           # identifier of the key used (for rotation)


@dataclass(frozen=True)
class EncryptionKey:
    """A named encryption key."""
    id: str
    material: bytes       # 32 bytes for AES-256


def generate_key(key_id: str | None = None) -> EncryptionKey:
    """Generate a new random AES-256 key (32 bytes)."""
    return EncryptionKey(
        id=key_id or os.urandom(8).hex(),
        material=AESGCM.generate_key(bit_length=256),
    )


def encrypt(
    plaintext: bytes,
    key: EncryptionKey,
    aad: bytes | None = None,
) -> EncryptionResult:
    """Encrypt plaintext with AES-256-GCM."""
    if len(key.material) != 32:
        raise ValueError(f"AES-256 requires a 32-byte key, got {len(key.material)} bytes")

    aesgcm = AESGCM(key.material)
    nonce = os.urandom(12)

    # AESGCM.encrypt returns ciphertext || tag (nonce passed separately)
    encrypted = aesgcm.encrypt(nonce, plaintext, aad or b"")
    ct = encrypted[:-16]
    tag = encrypted[-16:]

    return EncryptionResult(ciphertext=ct, nonce=nonce, tag=tag, key_id=key.id)


def decrypt(
    result: EncryptionResult,
    key: EncryptionKey,
    aad: bytes | None = None,
) -> bytes:
    """
    Decrypt ciphertext with AES-256-GCM.

    Raises InvalidTag if data was tampered or wrong key/AAD was used.
    """
    if len(key.material) != 32:
        raise ValueError(f"AES-256 requires a 32-byte key, got {len(key.material)} bytes")

    aesgcm = AESGCM(key.material)
    # Reconstruct ciphertext || tag
    encrypted = result.ciphertext + result.tag
    return aesgcm.decrypt(result.nonce, encrypted, aad or b"")