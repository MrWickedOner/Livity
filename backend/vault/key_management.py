"""
Key Management — envelope encryption pattern.

Key hierarchy:
1. User Master Key (UMK) — derived from user passphrase via PBKDF2.
   In the zero-knowledge model, Livity never stores the passphrase.
   The UMK wraps the Vault Master Key.

2. Vault Master Key (VMK) — unique per vault.
   Encrypted with the UMK and stored as master_key_envelope + master_key_nonce.

3. Content Encryption — VMK used directly with unique nonces per item.

Key rotation:
- Re-wrap VMK envelope when user changes passphrase (no content re-encryption).
- Full key rotation supported via key_id tracking in encrypted_content table.
"""

import os

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

from .encryption import EncryptionKey, EncryptionResult, encrypt, decrypt, generate_key


class DecryptionError(Exception):
    """Raised when decryption fails (tampered data, wrong key, etc.)."""
    pass


def derive_user_key_from_password(
    password: str, salt: bytes | None = None
) -> tuple[bytes, bytes]:
    """Derive a 32-byte User Master Key from a passphrase using PBKDF2-SHA256."""
    if salt is None:
        salt = os.urandom(16)

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=600_000,  # OWASP 2023 recommendation
    )
    key = kdf.derive(password.encode("utf-8"))
    return key, salt


def generate_vault_master_key() -> EncryptionKey:
    """Generate a new random Vault Master Key."""
    return generate_key(key_id=f"vmk-{os.urandom(8).hex()}")


def wrap_vault_key(
    vault_key: EncryptionKey,
    wrapping_key_material: bytes,
) -> tuple[bytes, bytes]:
    """Encrypt (wrap) a Vault Master Key with a User Master Key.

    Returns (wrapped_key_bytes, nonce).
    """
    plaintext = vault_key.id.encode("utf-8") + b"||" + vault_key.material
    wrapping_key = EncryptionKey(id="wrapping", material=wrapping_key_material)
    result = encrypt(plaintext, wrapping_key, aad=b"livity:vault-master-key-wrap")
    return result.ciphertext + result.tag, result.nonce


def unwrap_vault_key(
    wrapped_key: bytes,
    nonce: bytes,
    wrapping_key_material: bytes,
) -> EncryptionKey:
    """Decrypt (unwrap) a Vault Master Key using a User Master Key."""
    tag = wrapped_key[-16:]
    ciphertext = wrapped_key[:-16]

    result = EncryptionResult(
        ciphertext=ciphertext, nonce=nonce, tag=tag, key_id="wrapping"
    )
    wrapping_key = EncryptionKey(id="wrapping", material=wrapping_key_material)
    plaintext = decrypt(result, wrapping_key, aad=b"livity:vault-master-key-wrap")

    separator = b"||"
    sep_idx = plaintext.index(separator)
    key_id = plaintext[:sep_idx].decode("utf-8")
    material = plaintext[sep_idx + len(separator) :]

    return EncryptionKey(id=key_id, material=material)