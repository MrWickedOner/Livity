"""
Audio Transcriber — Converts voice recordings to text using OpenAI Whisper.

Supports: mp3, wav, m4a, ogg, flac.
Uses the local open-source Whisper model (tiny/base for speed, large for accuracy).
"""

import os
import tempfile
from enum import Enum
from pathlib import Path
from typing import List, Optional


class TranscriptionModel(str, Enum):
    """Whisper model sizes — larger = more accurate but slower."""
    TINY = "tiny"
    BASE = "base"
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


class Transcriber:
    """
    Converts audio recordings to text using OpenAI Whisper (local, open-source).

    Lazy-loads the model on first use to save memory when not needed.
    """

    # Model size -> approximate memory usage
    _MODEL_MEMORY = {
        "tiny": 1,      # ~1GB
        "base": 1.5,    # ~1.5GB
        "small": 2.5,   # ~2.5GB
        "medium": 5,    # ~5GB
        "large": 10,    # ~10GB
    }

    def __init__(self, model_size: TranscriptionModel = TranscriptionModel.TINY):
        self.model_size = model_size
        self._model = None

    def _load_model(self):
        """Lazy-load the Whisper model."""
        if self._model is None:
            import whisper
            print(f"[Transcriber] Loading Whisper model '{self.model_size.value}'...")
            self._model = whisper.load_model(self.model_size.value)
            print("[Transcriber] Model loaded.")

    async def transcribe(self, audio_path: str) -> str:
        """
        Transcribe an audio file to text.

        Args:
            audio_path: Path to the audio file.

        Returns:
            The full transcription text.
        """
        self._load_model()
        result = self._model.transcribe(audio_path, language=None)
        return result["text"].strip()

    async def transcribe_with_timestamps(self, audio_path: str) -> List[dict]:
        """
        Transcribe and return segments with start/end timestamps.

        Useful for aligning with video when generating talking portraits.

        Returns:
            List of dicts: {start: float, end: float, text: str}
        """
        self._load_model()
        result = self._model.transcribe(audio_path, language=None)
        segments = []
        for seg in result["segments"]:
            segments.append({
                "start": seg["start"],
                "end": seg["end"],
                "text": seg["text"].strip(),
            })
        return segments

    @property
    def estimated_memory_gb(self) -> float:
        """Estimated memory usage of the loaded model in GB."""
        return self._MODEL_MEMORY.get(self.model_size.value, 1.0)