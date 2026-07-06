#!/usr/bin/env python3
"""
Test the SadTalker + edge-tts pipeline.
Usage: python test_talking_head.py [photo_path] [text]
"""

import asyncio
import sys
import os

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.talking_head_service import TalkingHeadService


async def test():
    service = TalkingHeadService()

    photo_path = sys.argv[1] if len(sys.argv) > 1 else None
    text = sys.argv[2] if len(sys.argv) > 2 else "Hello, I'm your Digital Twin. I love you and I'm here for you always."

    if not photo_path:
        print("Usage: python test_talking_head.py <photo_path> [text]")
        print("No photo provided — running in dry-run mode (edge-tts only)")
        print(f"Text: {text}")
        # Just test edge-tts
        audio_path = "/tmp/test_voice.wav"
        await service._generate_audio(text, audio_path, "en-US-JennyNeural")
        print(f"✅ Audio generated: {audio_path} ({os.path.getsize(audio_path)} bytes)")
        return

    print(f"Photo: {photo_path}")
    print(f"Text: {text[:50]}...")
    print("Generating portrait...")

    video_path = await service.generate_portrait(
        photo_path=photo_path,
        text=text,
        voice="en-US-JennyNeural",
        output_filename="test_portrait",
    )

    print(f"✅ Portrait generated: {video_path}")
    if os.path.exists(video_path):
        print(f"   Size: {os.path.getsize(video_path)} bytes")


if __name__ == "__main__":
    asyncio.run(test())