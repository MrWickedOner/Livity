"""
Vault API — Upload and retrieve encrypted content.
"""

from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from models.schemas import UploadResponse, VaultItem

router = APIRouter()


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload content to the vault",
)
async def upload_to_vault(file: UploadFile = File(...)):
    contents = await file.read()
    return UploadResponse(
        item_id="stub-uuid-placeholder",
        filename=file.filename,
        content_type=file.content_type,
        size_bytes=len(contents),
        message="Upload received. Encryption handled by VaultManager (Security Engineer).",
    )


@router.get("/items", response_model=List[VaultItem])
async def list_vault_items():
    return [
        VaultItem(
            item_id="stub-001",
            filename="childhood_story.txt",
            content_type="text/plain",
            size_bytes=1024,
            created_at="2026-07-06T18:00:00Z",
        )
    ]


@router.get("/items/{item_id}", response_model=VaultItem)
async def get_vault_item(item_id: str):
    return VaultItem(
        item_id=item_id,
        filename="sample_upload.txt",
        content_type="text/plain",
        size_bytes=2048,
        created_at="2026-07-06T18:00:00Z",
    )