"""
Core configuration loader using pydantic-settings.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment / .env file."""

    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    environment: str = "development"
    log_level: str = "info"

    # Database (PostgreSQL with pgvector / SQLite fallback)
    database_url: str = ""

    # OpenAI
    openai_api_key: str = ""

    # Anthropic
    anthropic_api_key: str = ""

    # Mistral AI (free tier — primary LLM)
    mistral_api_key: str = ""

    # D-ID (talking-head)
    did_api_key: str = ""
    did_api_url: str = "https://api.d-id.com"

    # HeyGen (talking-head fallback)
    heygen_api_key: str = ""
    heygen_api_url: str = "https://api.heygen.com"

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
    """Return cached settings singleton."""
    return Settings()