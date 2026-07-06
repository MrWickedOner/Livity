"""
Pydantic schemas for request/response validation.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


# ── Vault ─────────────────────────────────────────────────────────

class UploadResponse(BaseModel):
    """Response after uploading content to the vault."""

    item_id: str = Field(..., description="Unique identifier for the vault item")
    filename: str = Field(..., description="Original filename")
    content_type: str = Field(..., description="MIME type of the uploaded file")
    size_bytes: int = Field(..., description="File size in bytes")
    message: str = Field(..., description="Human-readable status message")


class VaultItem(BaseModel):
    """Metadata for a single vault item."""

    item_id: str = Field(..., description="Unique identifier")
    filename: str = Field(..., description="Original filename")
    content_type: str = Field(..., description="MIME type")
    size_bytes: int = Field(..., description="File size")
    created_at: str = Field(..., description="ISO 8601 creation timestamp")


# ── Twin ───────────────────────────────────────────────────────────

class TwinCreateRequest(BaseModel):
    """Request to create a new Digital Twin."""

    name: str = Field(..., min_length=1, max_length=100, description="Name of the person being twinned")
    vault_item_ids: List[str] = Field(
        ..., min_length=1, description="Vault item IDs containing memories to process"
    )
    include_portrait: bool = Field(
        False, description="Whether to also generate a Talking Portrait"
    )


class TwinCreateResponse(BaseModel):
    """Response after initiating twin creation."""

    twin_id: str = Field(..., description="Unique twin identifier")
    name: str = Field(..., description="Twin name")
    status: str = Field(..., description="Processing status (e.g., 'processing', 'active', 'failed')")
    message: str = Field(..., description="Human-readable status message")


class TwinSummary(BaseModel):
    """Summary metadata for a twin."""

    twin_id: str = Field(..., description="Unique twin identifier")
    name: str = Field(..., description="Twin name")
    status: str = Field(..., description="Current status")
    item_count: int = Field(..., description="Number of vault items processed")
    has_portrait: bool = Field(..., description="Whether a Talking Portrait exists")
    created_at: str = Field(..., description="ISO 8601 creation timestamp")


class ConversationRequest(BaseModel):
    """A user query directed at a Digital Twin."""

    query: str = Field(..., min_length=1, max_length=2000, description="The user's message or question")


class SourceReference(BaseModel):
    """Reference to a specific memory source used in a response."""

    vault_item_id: str = Field(..., description="Source vault item ID")
    snippet: str = Field(..., description="Excerpt of the source content")
    relevance_score: float = Field(
        ..., ge=0.0, le=1.0, description="Semantic similarity score from 0 to 1"
    )


class ConversationResponse(BaseModel):
    """The twin's reply, grounded in retrieved memories."""

    twin_id: str = Field(..., description="Twin identifier")
    message: str = Field(..., description="The twin's response text")
    sources: List[SourceReference] = Field(
        default_factory=list, description="Memory sources used to generate the response"
    )


class PortraitRequest(BaseModel):
    """Request to generate a Talking Portrait."""

    photo_item_id: str = Field(
        ..., description="Vault item ID of the photo to animate"
    )
    audio_item_id: Optional[str] = Field(
        None, description="Optional vault item ID of an audio recording for voice cloning"
    )


class PortraitResponse(BaseModel):
    """Response containing the Talking Portrait status or URL."""

    twin_id: str = Field(..., description="Twin identifier")
    portrait_url: str = Field(..., description="URL to the animated portrait video")
    status: str = Field(..., description="Status: 'generated', 'generating', or 'failed'")
    message: str = Field(..., description="Human-readable status message")