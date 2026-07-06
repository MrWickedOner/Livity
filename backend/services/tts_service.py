"""
Text-to-Speech Service — Converts text to natural speech using edge-tts.

edge-tts is a free, open-source Python library that uses Microsoft Edge's
online TTS engine. No API keys needed.
"""

from typing import Optional


class TextToSpeechService:
    """
    Converts text to speech using edge-tts (Microsoft Edge TTS engine).

    Requires: pip install edge-tts
    No API keys needed — uses Microsoft's free online TTS service.

    STUB: Returns placeholder paths.
    TODO: implement actual edge-tts integration.
    """

    AVAILABLE_VOICES = [
        "en-US-JennyNeural",    # Female, US English
        "en-US-GuyNeural",      # Male, US English
        "en-GB-SoniaNeural",    # Female, UK English
        "en-GB-RyanNeural",     # Male, UK English
        "en-AU-NatashaNeural",  # Female, Australian English
    ]

    def __init__(self, default_voice: str = "en-US-JennyNeural"):
        self.default_voice = default_voice

    async def synthesize(
        self,
        text: str,
        voice: Optional[str] = None,
        output_path: str = "/tmp/livity_speech.wav",
    ) -> str:
        """
        Synthesize speech from text.

        Args:
            text: Text to convert to speech
            voice: Edge TTS voice name (default: en-US-JennyNeural)
            output_path: Where to save the audio file

        Returns:
            Path to the generated audio file.

        STUB: Creates a placeholder file.
        TODO:
          import edge_tts
          communicate = edge_tts.Communicate(text, voice or self.default_voice)
          await communicate.save(output_path)
        """
        # Create placeholder file
        with open(output_path, "wb") as f:
            f.write(b"PLACEHOLDER TTS AUDIO")
        return output_path

    async def list_voices(self) -> list:
        """List available TTS voices. STUB: returns hardcoded list."""
        return self.AVAILABLE_VOICES