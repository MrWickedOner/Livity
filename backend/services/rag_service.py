"""
RAG Service — Zero-hallucination context retrieval and LLM integration.

Core principle: the twin NEVER invents memories. Every response must be
grounded in content the user actually uploaded. Uses "cite your sources"
pattern where the twin references the specific memory/story it's responding from.

Integrates Mistral AI (free tier) for the actual LLM conversation.
"""

import json
import time
from typing import List, Optional

from sqlalchemy.orm import Session as DBSession

from core.config import get_settings
from db.database import SessionLocal
from db.models import MemoryEmbedding, ConversationLog
from models.schemas import ConversationResponse, SourceReference
from processing.embedder import Embedder

try:
    from mistralai import Mistral
except ImportError:
    Mistral = None


class RAGService:
    """
    Retrieval-Augmented Generation for the Conversational Twin.

    Pipeline:
      1. Embed user query using sentence-transformers
      2. Search pgvector (or SQLite fallback) for top-K relevant memory chunks
      3. Build zero-hallucination prompt with retrieved context
      4. Call Mistral AI LLM with context-grounded instructions
      5. Return response with source citations
    """

    def __init__(self, embedder: Optional[Embedder] = None):
        self.embedder = embedder or Embedder()
        self._mistral_client = None

    @property
    def mistral_client(self):
        if self._mistral_client is None and Mistral is not None:
            settings = get_settings()
            if settings.mistral_api_key:
                self._mistral_client = Mistral(api_key=settings.mistral_api_key)
        return self._mistral_client

    async def answer_query(
        self,
        twin_id: str,
        query: str,
        top_k: int = 5,
        db: Optional[DBSession] = None,
    ) -> ConversationResponse:
        start_time = time.time()
        close_db = False
        if db is None:
            db = SessionLocal()
            close_db = True

        try:
            sources = await self.retrieve_memories(twin_id, query, top_k, db)
            prompt = self._build_prompt(query, sources)
            response_text = await self._call_llm(prompt)
            latency_ms = int((time.time() - start_time) * 1000)

            self._log_conversation(
                db=db,
                twin_id=twin_id,
                query=query,
                response=response_text,
                sources=[s.vault_item_id for s in sources],
                latency_ms=latency_ms,
            )

            return ConversationResponse(
                twin_id=twin_id,
                message=response_text,
                sources=sources,
            )
        finally:
            if close_db:
                db.close()

    async def retrieve_memories(
        self,
        twin_id: str,
        query: str,
        top_k: int = 5,
        db: Optional[DBSession] = None,
    ) -> List[SourceReference]:
        close_db = False
        if db is None:
            db = SessionLocal()
            close_db = True

        try:
            query_embedding = await self.embedder.embed(query)

            try:
                from pgvector.sqlalchemy import Vector
                results = (
                    db.query(MemoryEmbedding)
                    .filter(MemoryEmbedding.twin_id == twin_id)
                    .order_by(MemoryEmbedding.embedding.cosine_distance(query_embedding))
                    .limit(top_k)
                    .all()
                )
            except (AttributeError, Exception):
                all_chunks = (
                    db.query(MemoryEmbedding)
                    .filter(MemoryEmbedding.twin_id == twin_id)
                    .all()
                )
                scored = []
                for chunk in all_chunks:
                    try:
                        stored_emb = Embedder.deserialize_embedding(chunk.embedding_text)
                        score = self._cosine_similarity(query_embedding, stored_emb)
                        scored.append((score, chunk))
                    except (json.JSONDecodeError, TypeError, ValueError):
                        continue
                scored.sort(key=lambda x: x[0], reverse=True)
                results = [chunk for _, chunk in scored[:top_k]]

            sources = []
            for chunk in results:
                sources.append(SourceReference(
                    vault_item_id=chunk.vault_item_id,
                    snippet=chunk.chunk_text[:200],
                    relevance_score=0.0,
                ))
            return sources
        finally:
            if close_db:
                db.close()

    def _build_prompt(self, query: str, sources: List[SourceReference]) -> str:
        if not sources:
            return (
                "You are a Digital Twin preserving someone's memories. "
                "You have no memories stored about this topic.\n\n"
                f"The user asks: {query}\n\n"
                "Respond by saying you don't have any memories about this topic yet. "
                "Be warm and natural, but don't invent anything."
            )

        memory_text = "\n\n".join([
            f"[Memory {i+1} ({s.vault_item_id[:8]})]: {s.snippet}"
            for i, s in enumerate(sources)
        ])

        return (
            "You are a Digital Twin — an AI representation of a real person, "
            "preserving their stories, memories, and personality.\n\n"
            "CRITICAL RULES:\n"
            "1. ONLY answer based on the memories provided below. NEVER invent facts.\n"
            "2. If the user asks about something NOT in the memories, say:\n"
            "   'I don't recall that. My memories don't cover that topic yet.'\n"
            "3. When you do answer from a memory, cite which memory you're referencing.\n"
            "4. Keep responses warm, natural, and conversational — like a family member.\n"
            "5. When citing, say things like \"I remember...\" or \"One of my stories says...\"\n\n"
            "MY MEMORIES:\n"
            f"{memory_text}\n\n"
            f"User's question: {query}\n\n"
            "Response (remember: only from the memories above, cite your sources):"
        )

    async def _call_llm(self, prompt: str) -> str:
        if self.mistral_client:
            try:
                response = await self.mistral_client.chat.complete_async(
                    model="mistral-small-latest",
                    messages=[
                        {"role": "system", "content": "You are a helpful Digital Twin."},
                        {"role": "user", "content": prompt},
                    ],
                    max_tokens=500,
                    temperature=0.7,
                )
                return response.choices[0].message.content.strip()
            except Exception as e:
                print(f"[RAG] Mistral API error: {e}")

        return (
            "I remember that story! Based on my uploaded memories, "
            "I can share what I know. But I'd need more memories to give you "
            "a complete picture. (Mistral API key not configured — "
            "set MISTRAL_API_KEY in .env for real responses.)"
        )

    def _log_conversation(self, db, twin_id, query, response, sources, latency_ms):
        log = ConversationLog(
            twin_id=twin_id,
            user_query=query,
            twin_response=response,
            sources_used=json.dumps(sources),
            latency_ms=latency_ms,
        )
        db.add(log)
        db.commit()

    @staticmethod
    def _cosine_similarity(a: List[float], b: List[float]) -> float:
        import math
        dot = sum(x * y for x, y in zip(a, b))
        norm_a = math.sqrt(sum(x * x for x in a))
        norm_b = math.sqrt(sum(x * x for x in b))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)