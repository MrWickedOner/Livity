"""
Vault API — Upload and retrieve encrypted content.
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
    STUB: Accepts a file upload, encrypts it, and stores it in the vault.

    TODO: Wire to actual vault storage (Security Engineer).
          - Call encryption.encrypt(file_bytes)
          - Store encrypted blob in configured storage backend
          - Record metadata in database
    """
    # Read the uploaded file bytes
    contents = await file.read()

    # Stub response — replace with real encryption + storage logic
    return UploadResponse(
        item_id="stub-uuid-placeholder",
        filename=file.filename,
        content_type=file.content_type,
        size_bytes=len(contents),
        message="Upload received. Encryption and storage: TODO.",
    )


@router.get(
    "/items",
    response_model=List[VaultItem],
    summary="List vault items for the current user",
)
async def list_vault_items():
    """
    STUB: Returns a placeholder list of vault items.

    TODO: Query database for user's vault items.
    """
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
    """
    STUB: Returns placeholder metadata for a vault item.

    TODO: Fetch from database; decrypt metadata only.
    """
    return VaultItem(
        item_id=item_id,
        filename="sample_upload.txt",
        content_type="text/plain",
        size_bytes=2048,
        created_at="2026-07-06T18:00:00Z",
    )