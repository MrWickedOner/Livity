"""
Twin Service — Business logic for Digital Twin creation and management.

Coordinates the full pipeline: vault content → transcription → embeddings → twin creation.
"""

import json
import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Session as DBSession

from db.database import SessionLocal, init_db
from db.models import TwinRecord, VaultItemRecord, MemoryEmbedding
from models.schemas import ConversationResponse, SourceReference, TwinSummary
from processing.embedder import Embedder
from processing.transcriber import Transcriber, TranscriptionModel
from services.rag_service import RAGService


class TwinService:
    """
    Handles the twin lifecycle: creation, updating, and status tracking.

    Pipeline for creating a twin:
      1. Fetch vault items associated with the twin
      2. For audio files: transcribe with Whisper → text
      3. For text files: use directly
      4. Chunk text and generate embeddings via sentence-transformers
      5. Store embeddings in database (pgvector when available)
      6. Mark twin as 'active'
    """

    def __init__(
        self,
        embedder: Optional[Embedder] = None,
        transcriber: Optional[Transcriber] = None,
        rag_service: Optional[RAGService] = None,
    ):
        self.embedder = embedder or Embedder()
        self.transcriber = transcriber or Transcriber(model_size=TranscriptionModel.TINY)
        self.rag_service = rag_service or RAGService(embedder=self.embedder)

    async def create_twin(
        self,
        name: str,
        vault_item_ids: List[str],
        include_portrait: bool = False,
    ) -> dict:
        """
        Kick off the twin creation pipeline.

        1. Create twin record in DB
        2. Fetch vault items
        3. Process each item: transcribe audio, chunk text, generate embeddings
        4. Store embeddings in vector database
        5. Mark twin as active
        """
        db = SessionLocal()
        try:
            # 1. Create twin record
            twin_id = str(uuid.uuid4())
            twin = TwinRecord(
                id=twin_id,
                name=name,
                user_id="default-user",  # TODO: wire to auth
                status="processing",
                item_count=len(vault_item_ids),
            )
            db.add(twin)
            db.commit()

            # 2. Process each vault item
            all_embeddings = []
            for vault_item_id in vault_item_ids:
                vault_item = db.query(VaultItemRecord).filter(
                    VaultItemRecord.id == vault_item_id
                ).first()

                if vault_item is None:
                    continue  # Skip missing items

                # Get content (stub — real implementation would decrypt via EncryptionService)
                # For now, simulate with placeholder text
                text_content = f"Memory content from {vault_item.filename}: This is a placeholder memory about {name}'s life and experiences."

                # If audio, transcribe first
                if vault_item.content_type.startswith("audio/"):
                    try:
                        if vault_item.encrypted_path and vault_item.encrypted_path != "stub":
                            text_content = await self.transcriber.transcribe(
                                vault_item.encrypted_path
                            )
                    except Exception as e:
                        print(f"[TwinService] Transcription failed for {vault_item_id}: {e}")
                        # Use fallback text
                        text_content = f"[Transcribed audio from {vault_item.filename}]"

                # Chunk and embed
                chunks = await self.embedder.chunk_and_embed(text_content)
                for chunk in chunks:
                    embedding_record = MemoryEmbedding(
                        twin_id=twin_id,
                        vault_item_id=vault_item_id,
                        chunk_index=chunk["chunk_index"],
                        chunk_text=chunk["text"],
                        embedding_text=self.embedder.serialize_embedding(chunk["embedding"]),
                    )
                    db.add(embedding_record)
                    all_embeddings.append(embedding_record)

            # 3. Mark twin as active
            twin.status = "active"
            twin.item_count = len(all_embeddings)
            db.commit()

            return {
                "twin_id": twin_id,
                "name": name,
                "status": "active",
                "chunks_created": len(all_embeddings),
            }

        except Exception as e:
            db.rollback()
            raise e
        finally:
            db.close()

    async def get_twin(self, twin_id: str) -> Optional[TwinSummary]:
        """Retrieve twin metadata from database."""
        db = SessionLocal()
        try:
            twin = db.query(TwinRecord).filter(TwinRecord.id == twin_id).first()
            if twin is None:
                return None
            return TwinSummary(
                twin_id=twin.id,
                name=twin.name,
                status=twin.status,
                item_count=twin.item_count or 0,
                has_portrait=twin.has_portrait or False,
                created_at=twin.created_at.isoformat() if twin.created_at else "",
            )
        finally:
            db.close()

    async def delete_twin(self, twin_id: str) -> bool:
        """Delete a twin and all associated data."""
        db = SessionLocal()
        try:
            # Delete embeddings
            db.query(MemoryEmbedding).filter(
                MemoryEmbedding.twin_id == twin_id
            ).delete()

            # Delete twin record
            twin = db.query(TwinRecord).filter(TwinRecord.id == twin_id).first()
            if twin:
                db.delete(twin)

            db.commit()
            return True
        except Exception:
            db.rollback()
            return False
        finally:
            db.close()

    async def converse(
        self,
        twin_id: str,
        query: str,
    ) -> ConversationResponse:
        """Talk to a Digital Twin."""
        return await self.rag_service.answer_query(twin_id, query)