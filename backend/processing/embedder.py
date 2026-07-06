"""
Embedder — Converts text chunks to vector embeddings for semantic retrieval.

Uses sentence-transformers (all-MiniLM-L6-v2) for local embedding generation.
Supports pgvector-compatible 384-dimensional vectors by default.
"""

import json
from typing import List, Optional


class Embedder:
    """
    Generates vector embeddings from text for pgvector storage.

    Lazy-loads the sentence-transformers model on first use.
    """

    MODEL_DIMENSION = 384
    MODEL_NAME = "all-MiniLM-L6-v2"

    def __init__(self, model_name: str = MODEL_NAME):
        self.model_name = model_name
        self._model = None

    def _load_model(self):
        if self._model is None:
            from sentence_transformers import SentenceTransformer
            print(f"[Embedder] Loading model '{self.model_name}'...")
            self._model = SentenceTransformer(self.model_name)
            print(f"[Embedder] Model loaded. Dimension: {self.MODEL_DIMENSION}")

    async def embed(self, text: str) -> List[float]:
        self._load_model()
        embedding = self._model.encode(text, normalize_embeddings=True)
        return embedding.tolist()

    async def embed_batch(self, texts: List[str]) -> List[List[float]]:
        self._load_model()
        embeddings = self._model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
        return [emb.tolist() for emb in embeddings]

    async def chunk_and_embed(
        self,
        text: str,
        chunk_size: int = 512,
        chunk_overlap: int = 64,
    ) -> List[dict]:
        chunks = []
        start = 0
        index = 0
        while start < len(text):
            end = min(start + chunk_size, len(text))
            chunk_text = text[start:end].strip()
            if chunk_text:
                chunks.append({"text": chunk_text, "chunk_index": index})
                index += 1
            start += chunk_size - chunk_overlap

        texts = [c["text"] for c in chunks]
        embeddings = await self.embed_batch(texts)
        for i, emb in enumerate(embeddings):
            chunks[i]["embedding"] = emb
        return chunks

    def serialize_embedding(self, embedding: List[float]) -> str:
        return json.dumps(embedding)

    @staticmethod
    def deserialize_embedding(embedding_str: str) -> List[float]:
        return json.loads(embedding_str)