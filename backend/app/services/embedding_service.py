import google.generativeai as genai
from app.config import settings
from app.models.schemas import Chunk
from app.vector_store.chroma_client import add_chunks

genai.configure(api_key=settings.gemini_api_key)

EMBEDDING_MODEL = "models/gemini-embedding-001"

def embed_text(text: str) -> list[float]:
    result = genai.embed_content(model=EMBEDDING_MODEL, content=text)
    return result["embedding"]


def embed_texts_batch(texts: list[str]) -> list[list[float]]:
    # google-generativeai doesn't batch embed natively as of this writing;
    # loop for now, parallelize later if it's a bottleneck at demo scale.
    return [embed_text(t) for t in texts]


def embed_and_store_chunks(chunks: list[Chunk]) -> None:
    if not chunks:
        return

    texts = [c.text for c in chunks]
    embeddings = embed_texts_batch(texts)

    add_chunks(
        chunk_ids=[c.chunk_id for c in chunks],
        texts=texts,
        embeddings=embeddings,
        metadatas=[{"document_id": c.document_id, "order": c.order} for c in chunks],
    )
