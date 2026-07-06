"""
Twin API — Create, converse with, and manage Digital Twins.

Wired to real services: TwinService, RAGService.
"""

from fastapi import APIRouter, HTTPException, status

from models.schemas import (
    ConversationRequest,
    ConversationResponse,
    PortraitRequest,
    PortraitResponse,
    TwinCreateRequest,
    TwinCreateResponse,
    TwinSummary,
)
from services.twin_service import TwinService

router = APIRouter()
twin_service = TwinService()


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
    summary="Get twin metadata and status",
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


@router.get(
    "/{twin_id}/portrait",
    response_model=PortraitResponse,
    summary="Get the Talking Portrait for a twin",
)
async def get_twin_portrait(twin_id: str):
    twin = await twin_service.get_twin(twin_id)
    if twin is None:
        raise HTTPException(status_code=404, detail=f"Twin '{twin_id}' not found")
    return PortraitResponse(
        twin_id=twin_id,
        portrait_url=twin.portrait_url or "https://placeholder.livity.ai/portraits/stub.mp4",
        status="generated" if twin.has_portrait else "pending",
        message="Portrait URL stub — replace with real SadTalker/edge-tts output.",
    )


@router.post(
    "/{twin_id}/portrait",
    response_model=PortraitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a Talking Portrait for a twin",
)
async def generate_twin_portrait(twin_id: str, req: PortraitRequest):
    twin = await twin_service.get_twin(twin_id)
    if twin is None:
        raise HTTPException(status_code=404, detail=f"Twin '{twin_id}' not found")
    return PortraitResponse(
        twin_id=twin_id,
        portrait_url="https://placeholder.livity.ai/portraits/stub.mp4",
        status="generating",
        message="Portrait generation triggered. TODO: wire SadTalker + edge-tts.",
    )