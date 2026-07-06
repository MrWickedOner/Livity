"""
Livity Backend — Application Entry Point
FastAPI application with CORS middleware, static file serving for portraits,
and all route mounts.
Run with: uvicorn main:app --reload  (or python run.py)
"""

import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api.vault import router as vault_router
from api.twin import router as twin_router
from core.config import get_settings

# Portrait output directory
PORTRAITS_DIR = Path(__file__).resolve().parent / "data" / "portraits"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle."""
    settings = get_settings()
    print(f"[Livity] Starting — environment={settings.environment}")

    # Ensure portrait output directory exists
    PORTRAITS_DIR.mkdir(parents=True, exist_ok=True)

    yield
    print("[Livity] Shutting down")


app = FastAPI(
    title="Livity API",
    description="Digital Twin platform — turn memories into an AI twin your family can talk to, forever.",
    version="0.2.0",
    lifespan=lifespan,
)

# ── CORS ─────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://b127cd223af6d9865cf7b76f0600429a.ctonew.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Static file serving for generated portrait videos ────────────────
app.mount("/api/portraits", StaticFiles(directory=str(PORTRAITS_DIR)), name="portraits")

# ── Route Mounting ───────────────────────────────────────────────────
app.include_router(vault_router, prefix="/api/vault", tags=["Vault"])
app.include_router(twin_router, prefix="/api/twin", tags=["Twin"])


@app.get("/health")
async def health_check():
    """Simple health check for the API."""
    return {
        "status": "ok",
        "version": "0.2.0",
        "talking_head": "sadtalker + edge-tts",
    }