"""
Livity Backend — Application Entry Point

FastAPI application with CORS middleware, database initialization, and all routes.
Run with: uvicorn main:app --reload
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.vault import router as vault_router
from api.twin import router as twin_router
from core.config import get_settings
from db.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    print(f"[Livity] Starting — environment={settings.environment}")
    try:
        init_db()
        print("[Livity] Database tables initialized.")
    except Exception as e:
        print(f"[Livity] DB init warning: {e}")
    yield
    print("[Livity] Shutting down")


app = FastAPI(
    title="Livity API",
    description="Digital Twin platform — turn memories into an AI twin your family can talk to, forever.",
    version="0.3.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://b127cd223af6d9865cf7b76f0600429a.ctonew.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vault_router, prefix="/api/vault", tags=["Vault"])
app.include_router(twin_router, prefix="/api/twin", tags=["Twin"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "version": "0.3.0"}