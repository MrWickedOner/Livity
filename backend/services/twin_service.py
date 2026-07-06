"""
Twin Service — Business logic for Digital Twin creation and management.

Coordinates the full pipeline: vault content → decryption → transcription → embeddings → twin creation.
Uses VaultManager (from Security Engineer) for content decryption.
"""

import uuid
from typing import List, Optional

from sqlalchemy.orm import Session as DBSession

from db.database import SessionLocal
from db.models import TwinRecord, VaultItemRecord, MemoryEmbedding
from models.schemas import ConversationResponse, SourceReference, TwinSummary
from processing.embedder import Embedder
from processing.transcriber import Transcriber, TranscriptionModel
from services.rag_service import RAGService
from vault.vault_manager import VaultManager


class TwinService:
    """
    Handles the twin lifecycle: creation, updating, and status tracking.

    Pipeline for creating a twin:
      1. Create twin record in DB
      2. Fetch vault items associated with the twin
      3. Decrypt content via VaultManager.retrieve_content()
      4. For audio files: transcribe with Whisper → text
      5. For text files: use directly
      6. Chunk text and generate embeddings via sentence-transformers
      7. Store embeddings in database (pgvector when available)
      8. Mark twin as 'active'
    """

    def __init__(
        self,
        embedder: Optional[Embedder] = None,
        transcriber: Optional[Transcriber] = None,
        rag_service: Optional[RAGService] = None,
        vault_manager: Optional[VaultManager] = None,
    ):
        self.embedder = embedder or Embedder()
        self.transcriber = transcriber or Transcriber(model_size=TranscriptionModel.TINY)
        self.rag_service = rag_service or RAGService(embedder=self.embedder)
        self.vault_manager = vault_manager or VaultManager()

    async def create_twin(
        self,
        name: str,
        vault_item_ids: List[str],
        include_portrait: bool = False,
        vault_key=None,
        vault_id: str = "",
    ) -> dict:
        """
        Kick off the twin creation pipeline.

        Args:
            name: Name of the person being twinned
            vault_item_ids: List of vault item IDs containing memories
            include_portrait: Whether to also generate a Talking Portrait
            vault_key: EncryptionKey for vault decryption (from VaultManager)
            vault_id: The vault ID for content retrieval
        """
        db = SessionLocal()
        try:
            twin_id = str(uuid.uuid4())
            twin = TwinRecord(
                id=twin_id,
                name=name,
                user_id="default-user",
                status="processing",
                item_count=len(vault_item_ids),
            )
            db.add(twin)
            db.commit()

            all_embeddings = []
            for vault_item_id in vault_item_ids:
                vault_item = db.query(VaultItemRecord).filter(
                    VaultItemRecord.id == vault_item_id
                ).first()

                if vault_item is None:
                    continue

                # Decrypt content via VaultManager
                text_content = ""
                if vault_key and vault_id:
                    try:
                        decrypted = self.vault_manager.retrieve_content(
                            storage_key=vault_item.encrypted_path,
                            content_id=vault_item.id,
                            vault_id=vault_id,
                            vault_key=vault_key,
                        )
                        text_content = decrypted.decode("utf-8", errors="replace")
                    except Exception as e:
                        print(f"[TwinService] Decryption failed for {vault_item_id}: {e}")
                        text_content = f"[Memory content from {vault_item.filename}]"
                else:
                    text_content = f"[Memory content from {vault_item.filename}]"

                # If audio, transcribe first
                if vault_item.content_type.startswith("audio/"):
                    try:
                        if vault_item.encrypted_path and vault_item.encrypted_path != "stub":
                            text_content = await self.transcriber.transcribe(
                                vault_item.encrypted_path
                            )
                    except Exception as e:
                        print(f"[TwinService] Transcription failed for {vault_item_id}: {e}")
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
        db = SessionLocal()
        try:
            db.query(MemoryEmbedding).filter(MemoryEmbedding.twin_id == twin_id).delete()
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

    async def converse(self, twin_id: str, query: str) -> ConversationResponse:
        return await self.rag_service.answer_query(twin_id, query)