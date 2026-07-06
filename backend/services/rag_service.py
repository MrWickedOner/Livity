"""
RAG Service — Zero-hallucination context retrieval and LLM integration.

Core principle: the twin NEVER invents memories. Every response must be
grounded in content the user actually uploaded.
"""

from typing import List

from models.schemas import ConversationResponse, SourceReference


class RAGService:
    """
    Retrieval-Augmented Generation for the Conversational Twin.

    STUB: All methods return placeholder responses.
    TODO:
      - Embed user query using sentence-transformers
      - Search pgvector for top-K relevant memory chunks
      - Build prompt with retrieved context
      - Call LLM (OpenAI / Anthropic) with zero-hallucination instruction
      - Return response with source citations
    """

    async def answer_query(
        self,
        twin_id: str,
        query: str,
        top_k: int = 5,
    ) -> ConversationResponse:
        """
        Answer a user query using only retrieved memory context.

        Steps (to implement):
          1. Encode query → embedding vector
          2. pgvector cosine similarity search → top_k chunks
          3. Build system prompt with retrieved context
          4. Call LLM with: "Only answer based on the context below. If the
             answer isn't in the context, say 'I don't recall that.'"
          5. Return response + source references
        """
        # Placeholder — replace with real RAG pipeline
        return ConversationResponse(
            twin_id=twin_id,
            message=(
                f"I have memories stored in my vector database. "
                f"You asked: '{query}'. This is a stub — "
                f"the real RAG pipeline will retrieve relevant memories "
                f"and respond only from them."
            ),
            sources=[
                SourceReference(
                    vault_item_id="stub-vault-item",
                    snippet="This is a placeholder memory snippet.",
                    relevance_score=0.95,
                )
            ],
        )

    async def retrieve_memories(
        self,
        twin_id: str,
        query: str,
        top_k: int = 5,
    ) -> List[SourceReference]:
        """
        Retrieve top-K relevant memory chunks without calling an LLM.

        Useful for previewing what the twin "remembers" about a topic.
        """
        return [
            SourceReference(
                vault_item_id="stub-vault-item",
                snippet=f"Placeholder memory chunk relevant to: '{query}'",
                relevance_score=0.85,
            )
        ]