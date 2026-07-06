"""
Talking Portrait request schema — includes text for edge-tts generation.
"""

from pydantic import BaseModel, Field
from typing import Optional


class PortraitGenerateRequest(BaseModel):
    """Request to generate a Talking Portrait with SadTalker + edge-tts."""
    photo_path: str = Field(
        ..., description="Absolute path to the source photo on disk"
    )
    text: str = Field(
        ..., min_length=1, max_length=500,
        description="Text for the portrait to speak"
    )
    twin_name: str = Field(
        default="Loved One",
        description="Name of the person (used for voice selection)"
    )
    voice: str = Field(
        default="en-US-JennyNeural",
        description="edge-tts voice name (e.g., en-US-JennyNeural, en-GB-SoniaNeural)"
    )