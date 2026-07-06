"""
Audio Transcriber — Converts voice recordings to text using Whisper.

Supports: mp3, wav, m4a, ogg, flac.
"""

from enum import Enum
from pathlib import Path
from typing import Optional


class TranscriptionModel(str, Enum):
    """Whisper model sizes — larger = more accurate but slower."""
    TINY = "tiny"
    BASE = "base"
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


class Transcriber:
    """
    Converts audio recordings to text using OpenAI Whisper.

    STUB: Returns placeholder transcriptions.
    TODO:
      - Load whisper model (configurable size)
      - Transcribe audio file
      - Return segments with timestamps
      - Handle long audio with chunking
    """

    def __init__(self, model_size: TranscriptionModel = TranscriptionModel.BASE):
        self.model_size = model_size
        self._model = None

    async def transcribe(self, audio_path: str) -> str:
        """
        Transcribe an audio file to text.

        STUB: returns placeholder text.
        TODO: implement real whisper transcription.
        """
        return "This is a placeholder transcription of the uploaded audio recording."

    async def transcribe_with_timestamps(self, audio_path: str) -> list:
        """
        Transcribe and return segments with start/end timestamps.

        Useful for aligning with video when generating talking portraits.
        """
        return [
            {"start": 0.0, "end": 2.5, "text": "Placeholder segment one."},
            {"start": 2.5, "end": 5.0, "text": "Placeholder segment two."},
        ]