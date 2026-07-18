import chromadb
from app.config import settings

_client = None
_collection = None

COLLECTION_NAME = "document_chunks"


def get_chroma_collection():
    """
    Single persistent Chroma collection shared across all documents.
    Each chunk is tagged with document_id in its metadata so we can
    filter retrieval to a specific document/quest.
    """
    global _client, _collection
    if _collection is None:
        _client = chromadb.PersistentClient(path=settings.chroma_persist_dir)
        _collection = _client.get_or_create_collection(name=COLLECTION_NAME)
    return _collection


def add_chunks(chunk_ids: list[str], texts: list[str], embeddings: list[list[float]],
               metadatas: list[dict]):
    collection = get_chroma_collection()
    collection.add(
        ids=chunk_ids,
        documents=texts,
        embeddings=embeddings,
        metadatas=metadatas,
    )


def query_chunks(query_embedding: list[float], document_id: str, n_results: int = 5):
    collection = get_chroma_collection()
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where={"document_id": document_id},
    )
    # Flatten Chroma's nested result format into a simple list of chunks
    chunks = []
    if results["ids"] and results["ids"][0]:
        for i, chunk_id in enumerate(results["ids"][0]):
            chunks.append({
                "id": chunk_id,
                "text": results["documents"][0][i],
                "metadata": results["metadatas"][0][i],
            })
    return chunks


def get_chunks_by_ids(chunk_ids: list[str]):
    collection = get_chroma_collection()
    results = collection.get(ids=chunk_ids)
    chunks = []
    for i, chunk_id in enumerate(results["ids"]):
        chunks.append({"id": chunk_id, "text": results["documents"][i]})
    return chunks
