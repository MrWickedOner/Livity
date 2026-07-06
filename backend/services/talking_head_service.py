"""
Talking Head Service — Generates animated portraits using D-ID or HeyGen API.

Takes a photo + audio/text and produces a video of the person speaking.
"""

from enum import Enum
from typing import Optional


class TalkingHeadProvider(str, Enum):
    """Supported talking-head generation providers."""
    DID = "d-id"
    HEYGEN = "heygen"


class TalkingHeadService:
    """
    Generates animated talking-head videos from photos and audio.

    STUB: Returns placeholder URLs.
    TODO:
      - Implement D-ID API integration (POST /talks)
      - Implement HeyGen API integration (POST /v2/video/generate)
      - Handle polling for video completion
      - Return final video URL for storage/playback
    """

    def __init__(self, provider: TalkingHeadProvider = TalkingHeadProvider.DID):
        self.provider = provider

    async def generate_portrait(
        self,
        photo_url: str,
        audio_url: Optional[str] = None,
        text: Optional[str] = None,
        voice_id: Optional[str] = None,
    ) -> str:
        """
        Generate a talking-head video.

        Either audio_url (voice recording) or text + voice_id must be provided.

        STUB: returns a placeholder URL.
        TODO:
          - Call D-ID: POST https://api.d-id.com/talks
            body: {source_url: photo_url, script: {type: 'audio', audio_url: ...}}
          - Or call HeyGen: POST https://api.heygen.com/v2/video/generate
            body: {caption: text, voice_id: ..., image_url: photo_url}
          - Poll until video is ready, return URL
        """
        return "https://placeholder.livity.ai/portraits/talking-head.mp4"

    async def get_portrait_status(self, job_id: str) -> str:
        """
        Check the status of a portrait generation job.

        Returns: 'pending', 'processing', 'done', or 'failed'.
        """
        return "done"