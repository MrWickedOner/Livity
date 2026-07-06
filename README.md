# Livity Backend — AI & RAG Pipeline

Turn memories into an AI twin your family can talk to, forever.

## Project Structure

```
livity-backend/
├── api/                    # FastAPI route handlers
│   ├── __init__.py
│   ├── vault.py            # POST /api/vault/upload, GET /api/vault/items
│   └── twin.py             # POST /api/twin/create, GET /api/twin/:id/converse, /portrait
├── core/                   # App configuration & settings
│   ├── __init__.py
│   └── config.py           # pydantic-settings loader
├── db/                     # Database layer (SQLAlchemy + pgvector)
│   ├── __init__.py
│   ├── database.py         # Engine & session factory
│   └── models.py           # ORM models: Twin, VaultItem, MemoryEmbedding, ConversationLog
├── models/                 # Pydantic schemas
│   ├── __init__.py
│   └── schemas.py          # Request/response models
├── processing/             # AI processing pipeline
│   ├── __init__.py
│   ├── transcriber.py      # Whisper audio → text
│   └── embedder.py         # sentence-transformers text → vectors
├── services/               # Business logic & integrations
│   ├── __init__.py
│   ├── encryption_service.py    # AES-256 vault interface
│   ├── twin_service.py          # Twin creation lifecycle
│   ├── rag_service.py           # RAG context retrieval + LLM
│   └── talking_head_service.py  # D-ID / HeyGen portrait generation
├── .env.example            # Environment variable template
├── main.py                 # FastAPI app entry point
├── requirements.txt        # Python dependencies
└── run.py                  # Dev server launcher
```

## Quick Start

```bash
# 1. Clone and enter the directory
git clone <repo-url> && cd livity-backend

# 2. Create virtual environment
python -m venv .venv && source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy environment config
cp .env.example .env
# Edit .env with your API keys (OpenAI, D-ID, Database URL, etc.)

# 5. Run dev server
python run.py
# → http://localhost:8000
# → Swagger docs: http://localhost:8000/docs
```

## Endpoints

| Method | Path                           | Description                           |
|--------|--------------------------------|---------------------------------------|
| GET    | /health                        | Health check                          |
| POST   | /api/vault/upload              | Upload content to encrypted vault     |
| GET    | /api/vault/items               | List vault items                      |
| GET    | /api/vault/items/{item_id}     | Get vault item metadata               |
| POST   | /api/twin/create               | Create a Digital Twin                 |
| GET    | /api/twin/{twin_id}            | Get twin metadata                     |
| POST   | /api/twin/{twin_id}/converse   | Talk to the Digital Twin              |
| GET    | /api/twin/{twin_id}/portrait   | Get Talking Portrait URL              |
| POST   | /api/twin/{twin_id}/portrait   | Generate Talking Portrait             |

## Development Principles

- **Zero Hallucination**: The twin NEVER invents memories. Responses are grounded only in uploaded content.
- **Privacy First**: All content is encrypted at rest (AES-256). No raw data sent to third parties without ephemeral handling.
- **Modular Pipeline**: Upload → Process → Embed → Store → Query. Each stage is independently testable.

## API Contracts

Coordinate with teammates:
- **Security Engineer**: Implements the real AES-256 encryption in `services/encryption_service.py`
- **Frontend Engineer**: Consumes these endpoints from the dashboard UI