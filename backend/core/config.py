"""
Core configuration loader using pydantic-settings.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    environment: str = "development"
    log_level: str = "info"

    # Database (Neon PostgreSQL with pgvector / SQLite fallback)
    database_url: str = ""

    # Mistral AI (free tier — primary LLM for twin conversations)
    mistral_api_key: str = ""

    # OpenAI (fallback LLM + embeddings)
    openai_api_key: str = ""

    # D-ID (talking-head — legacy, replaced by SadTalker)
    did_api_key: str = ""
    did_api_url: str = "https://api.d-id.com"

    # Encryption (set by Security Engineer)
    encryption_key: str = ""
    vault_storage_path: str = "./data/vault"

    # JWT
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache()
def get_settings() -> Settings:
    return Settings()