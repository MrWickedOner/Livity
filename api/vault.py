"""
Vault API — Upload and retrieve encrypted content.

Wires to: EncryptionService (Security Engineer), TwinService.
"""

from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from models.schemas import UploadResponse, VaultItem
from services.encryption_service import EncryptionService

router = APIRouter()


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload content to the vault",
    description=(
        "Upload photos, audio recordings, letters, or stories. "
        "Content is encrypted at rest using AES-256. "
        "Returns a vault item ID for later reference."
    ),
)
async def upload_to_vault(
    file: UploadFile = File(...),
    encryption: EncryptionService = Depends(),
):
    """
    Accepts a file upload, encrypts it, and stores it in the vault.

    Real implementation will:
      1. Read file bytes
      2. Call encryption.encrypt(file_bytes) → ciphertext
      3. Store encrypted blob in configured backend
      4. Record metadata in database
    """
    contents = await file.read()
    # TODO: wire to real encryption + database storage
    return UploadResponse(
        item_id="stub-uuid-placeholder",
        filename=file.filename,
        content_type=file.content_type,
        size_bytes=len(contents),
        message="Upload received. Encryption and storage: TODO (Security Engineer).",
    )


@router.get(
    "/items",
    response_model=List[VaultItem],
    summary="List vault items for the current user",
)
async def list_vault_items():
    """STUB: Returns placeholder vault items. TODO: wire to database."""
    return [
        VaultItem(
            item_id="stub-001",
            filename="childhood_story.txt",
            content_type="text/plain",
            size_bytes=1024,
            created_at="2026-07-06T18:00:00Z",
        )
    ]


@router.get(
    "/items/{item_id}",
    response_model=VaultItem,
    summary="Get vault item metadata",
)
async def get_vault_item(item_id: str):
    """STUB: Returns placeholder metadata for a vault item."""
    return VaultItem(
        item_id=item_id,
        filename="sample_upload.txt",
        content_type="text/plain",
        size_bytes=2048,
        created_at="2026-07-06T18:00:00Z",
    )