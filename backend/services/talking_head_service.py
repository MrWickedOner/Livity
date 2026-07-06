"""
Talking Head Service — Generates animated portraits using SadTalker (self-hosted, open source).

Pipeline: photo + audio → SadTalker inference → video output
Text-to-speech handled by edge-tts (free, Microsoft Edge TTS engine).

SadTalker repo: https://github.com/OpenTalker/SadTalker
edge-tts: https://github.com/rany2/edge-tts
"""

from enum import Enum
from typing import Optional


class TalkingHeadProvider(str, Enum):
    """Supported talking-head generation providers."""
    SADTALKER = "sadtalker"
    DID = "d-id"  # legacy fallback


class TalkingHeadService:
    """
    Generates animated talking-head videos from photos and audio.

    Uses self-hosted SadTalker (open source) for video generation
    and edge-tts (free, local) for text-to-speech.

    STUB: Returns placeholder URLs.
    TODO: Implement actual SadTalker inference pipeline.
    """

    def __init__(self, provider: TalkingHeadProvider = TalkingHeadProvider.SADTALKER):
        self.provider = provider

    async def generate_portrait(
        self,
        photo_path: str,
        audio_path: Optional[str] = None,
        text: Optional[str] = None,
    ) -> str:
        """
        Generate a talking-head video from a photo and audio/text.

        If text is provided and audio_path is not, generates speech
        using edge-tts first, then runs SadTalker.

        STUB: returns a placeholder URL.
        TODO:
          - Call edge-tts: edge-tts --text "$text" --write-media output.wav
          - Call SadTalker: python inference.py --driven_audio speech.wav
            --source_image portrait.jpg --result_dir output/
          - Upload result to api.video for hosting
        """
        return "https://placeholder.livity.ai/portraits/talking-head.mp4"

    async def text_to_speech(self, text: str, voice: str = "en-US-JennyNeural") -> str:
        """
        Generate speech audio from text using edge-tts.

        Args:
            text: Text to convert to speech
            voice: Microsoft Edge TTS voice name

        Returns:
            Path to the generated audio file.

        STUB: returns placeholder path.
        TODO:
          - import edge_tts
          - communicate = edge_tts.Communicate(text, voice)
          - await communicate.save("output.wav")
        """
        return "/tmp/placeholder-speech.wav"