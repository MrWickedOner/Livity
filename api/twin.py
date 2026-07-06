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
    description=(
        "Process uploaded vault items into a Conversational Twin. "
        "Generates vector embeddings for RAG retrieval. "
        "Optionally creates a Talking Portrait."
    ),
)
async def create_twin(req: TwinCreateRequest):
    """
    Create a Digital Twin from uploaded memories.

    Pipeline:
      1. Transcribe audio files via Whisper (local)
      2. Chunk text and generate embeddings via sentence-transformers
      3. Store embeddings in pgvector
      4. If include_portrait, trigger talking-head generation
    """
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
    """Get metadata and status of a Digital Twin."""
    twin = await twin_service.get_twin(twin_id)
    if twin is None:
        raise HTTPException(status_code=404, detail=f"Twin '{twin_id}' not found")
    return twin


@router.post(
    "/{twin_id}/converse",
    response_model=ConversationResponse,
    summary="Talk to a Digital Twin",
    description=(
        "Send a message to the twin and get a response grounded in "
        "their actual memories. The twin will NOT invent facts — only "
        "respond with context retrieved from uploaded content."
    ),
)
async def converse_with_twin(twin_id: str, req: ConversationRequest):
    """
    Talk to a Digital Twin. Zero-hallucination RAG pipeline.

    1. Embed user query via sentence-transformers
    2. Search pgvector for relevant memory chunks
    3. Build prompt with retrieved context
    4. Call Mistral AI with zero-hallucination instruction
    5. Return response with source citations
    """
    try:
        return await twin_service.converse(twin_id, req.query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversation failed: {str(e)}")


@router.get(
    "/{twin_id}/portrait",
    response_model=PortraitResponse,
    summary="Get the Talking Portrait for a twin",
    description="Returns the animated talking-head video URL for the twin.",
)
async def get_twin_portrait(twin_id: str):
    """STUB: Returns placeholder portrait URL."""
    twin = await twin_service.get_twin(twin_id)
    if twin is None:
        raise HTTPException(status_code=404, detail=f"Twin '{twin_id}' not found")
    return PortraitResponse(
        twin_id=twin_id,
        portrait_url="https://placeholder.livity.ai/portraits/stub.mp4",
        status="generated" if twin.has_portrait else "pending",
        message="Portrait URL stub — replace with real D-ID/HeyGen output.",
    )


@router.post(
    "/{twin_id}/portrait",
    response_model=PortraitResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a Talking Portrait for a twin",
)
async def generate_twin_portrait(twin_id: str, req: PortraitRequest):
    """STUB: Triggers portrait generation."""
    twin = await twin_service.get_twin(twin_id)
    if twin is None:
        raise HTTPException(status_code=404, detail=f"Twin '{twin_id}' not found")
    return PortraitResponse(
        twin_id=twin_id,
        portrait_url="https://placeholder.livity.ai/portraits/stub.mp4",
        status="generating",
        message="Portrait generation triggered. TODO: wire D-ID/HeyGen API.",
    )