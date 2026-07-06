"""
SadTalker Service — Self-hosted talking-head video generation.

Pipeline: photo + audio → SadTalker → animated video
Output hosted via api.video for streaming.

SadTalker: https://github.com/OpenTalker/SadTalker
api.video: https://api.video
"""

from typing import Optional


class SadTalkerService:
    """
    Generates animated talking-head videos from a photo and audio.

    Uses self-hosted SadTalker (open source, PyTorch-based).

    STUB: Returns placeholder URLs.
    TODO:
      - Clone and set up SadTalker repo
      - Run inference: python inference.py --driven_audio <audio>
        --source_image <photo> --result_dir output/
      - Upload result video to api.video
      - Return streaming URL
    """

    def __init__(self, model_path: str = "./models/sadtalker"):
        self.model_path = model_path

    async def generate(
        self,
        photo_path: str,
        audio_path: str,
        output_dir: str = "/tmp/sadtalker_output",
    ) -> str:
        """
        Generate a talking-head video from a photo + audio.

        Args:
            photo_path: Path to the source portrait image
            audio_path: Path to the speech audio file
            output_dir: Directory for output files

        Returns:
            URL of the hosted video.

        STUB: returns placeholder URL.
        TODO:
          import subprocess
          result = subprocess.run([
              "python", "inference.py",
              "--driven_audio", audio_path,
              "--source_image", photo_path,
              "--result_dir", output_dir,
          ], cwd=self.model_path)
          # Upload output to api.video
          # Return URL
        """
        return "https://placeholder.livity.ai/portraits/sadtalker-output.mp4"

    async def upload_to_apivideo(self, video_path: str) -> str:
        """
        Upload a generated video to api.video for hosting.

        STUB: returns placeholder URL.
        TODO: implement api.video upload.
        """
        return "https://stream.api.video/livity/placeholder.mp4"