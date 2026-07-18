from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime, timezone


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


# ---------- Documents ----------

class DocumentOut(BaseModel):
    id: str
    user_id: str
    filename: str
    status: Literal["processing", "ready", "failed"]
    created_at: datetime


class DocumentUploadResponse(BaseModel):
    document_id: str
    status: str


# ---------- Quests ----------

class QuestOut(BaseModel):
    id: str
    document_id: str
    user_id: str
    title: str
    summary: str
    order: int
    status: Literal["locked", "active", "done"]


class QuestCompleteRequest(BaseModel):
    quest_id: str


# ---------- Chat / RAG ----------

class ChatRequest(BaseModel):
    quest_id: str
    document_id: str
    user_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    source_chunks: list[str] = Field(default_factory=list)


class ChatMessageOut(BaseModel):
    id: str
    quest_id: str
    role: Literal["user", "avatar"]
    text: str
    created_at: datetime


# ---------- Internal (used by services, not exposed directly) ----------

class Chunk(BaseModel):
    chunk_id: str
    document_id: str
    text: str
    order: int
