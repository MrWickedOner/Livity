"""
Livity Backend — Development Server Runner

Usage: python run.py
"""

import uvicorn

from core.config import get_settings

if __name__ == "__main__":
    settings = get_settings()
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True,
        log_level=settings.log_level,
    )