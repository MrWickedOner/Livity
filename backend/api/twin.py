"""
Twin API — Create, converse with, and manage Digital Twins.
Also handles Talking Portrait generation via SadTalker + edge-tts.
"""

import os
from pathlib import Path
from typing import List, Optional

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from models.schemas import (
    ConversationRequest,
    ConversationResponse,
    PortraitResponse,
    TwinCreateRequest,
    TwinCreateResponse,
    TwinSummary,
)
from models.portrait_schemas import PortraitGenerateRequest
from services.talking_head_service import get_talking_head_service
from services.twin_service import TwinService

router = APIRouter()
twin_service = TwinService()

# ── Portrait paths ───────────────────────────────────────────────────
PORTRAITS_DIR = Path(__file__).resolve().parent.parent / "data" / "portraits"


@router.get(
    "",
    response_model=List[TwinSummary],
    summary="List all Digital Twins",
    description="Returns a list of all Digital Twins owned by the authenticated user.",
)
async def list_twins():
    """STUB: Returns an empty list. Will query database when available."""
    return []


@router.post(
    "/create",
    response_model=TwinCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a Digital Twin",
)
async def create_twin(req: TwinCreateRequest):
    try:
        result = await twin_service.create_twin(
            name=req.name,
            vault_item_ids=req.vault_item_ids,
            include_portrait=req.include_portrait,
        )
        return TwinCreateResponse(
            twin_id=result["twin_id"],
            name=result["name"],
            status=result["status"],
            message=(
                f"Digital Twin '{result['name']}' created successfully. "
                f"Processed {result['chunks_created']} memory chunks."
                + (" Portrait generation pending." if req.include_portrait else "")
            ),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Twin creation failed: {str(e)}")


@router.get(
    "/{twin_id}",
    response_model=TwinSummary,
    summary="Get a Digital Twin's metadata",
    description="Returns summary data for a specific Digital Twin.",
)
async def get_twin(twin_id: str):
    twin = await twin_service.get_twin(twin_id)
    if twin is None:
        raise HTTPException(status_code=404, detail=f"Twin '{twin_id}' not found")
    return twin


@router.post(
    "/{twin_id}/converse",
    response_model=ConversationResponse,
    summary="Talk to a Digital Twin",
    description="Zero-hallucination RAG conversation — twin only speaks from uploaded memories.",
)
async def converse_with_twin(twin_id: str, req: ConversationRequest):
    try:
        return await twin_service.converse(twin_id, req.query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversation failed: {str(e)}")


@router.post(
    "/{twin_id}/portrait",
    response_model=PortraitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a Talking Portrait",
    description=(
        "Generate an animated talking-head portrait using SadTalker + edge-tts. "
        "Provide a photo path and the text you want the portrait to speak. "
        "The service generates audio via edge-tts, then feeds both into SadTalker."
    ),
)
async def generate_twin_portrait(twin_id: str, req: PortraitGenerateRequest):
    """
    Generate a Talking Portrait using SadTalker + edge-tts.
    - req.photo_path: path to the source photo on disk
    - req.text: the text for the portrait to speak
    - req.voice: edge-tts voice name (default: en-US-JennyNeural)
    """
    if not req.photo_path or not os.path.exists(req.photo_path):
        raise HTTPException(
            status_code=400,
            detail=f"Photo path '{req.photo_path}' does not exist. Upload a photo first.",
        )

    service = get_talking_head_service()

    try:
        video_path = await service.generate_portrait(
            photo_path=req.photo_path,
            text=req.text,
            voice=req.voice,
            output_filename=f"portrait_{twin_id}",
        )

        video_url = f"/api/portraits/{os.path.basename(video_path)}"

        return PortraitResponse(
            twin_id=twin_id,
            portrait_url=video_url,
            status="generated",
            message=f"Talking portrait generated for twin '{twin_id}' using SadTalker + edge-tts.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Portrait generation failed: {str(e)}",
        )


@router.get(
    "/{twin_id}/portrait",
    response_model=PortraitResponse,
    summary="Get the Talking Portrait for a twin",
    description="Returns the animated talking-head video URL for the twin.",
)
async def get_twin_portrait(twin_id: str):
    """Check if a portrait exists and return its URL."""
    service = get_talking_head_service()
    video_path = await service.get_portrait_url(twin_id)

    if video_path:
        video_url = f"/api/portraits/{os.path.basename(video_path)}"
        return PortraitResponse(
            twin_id=twin_id,
            portrait_url=video_url,
            status="generated",
            message="Portrait video ready.",
        )

    return PortraitResponse(
        twin_id=twin_id,
        portrait_url="",
        status="pending",
        message="No portrait has been generated yet. POST to /api/twin/{twin_id}/portrait to generate one.",
    )


# ── Serve generated portrait videos ─────────────────────────────────


@router.get(
    "/portraits/{filename}",
    summary="Serve a generated portrait video",
    description="Returns the MP4 video file for a generated talking portrait.",
)
async def serve_portrait(filename: str):
    """Serve a generated portrait MP4 file."""
    file_path = PORTRAITS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Portrait not found")
    return FileResponse(
        str(file_path),
        media_type="video/mp4",
        filename=filename,
    )
