import uuid
from datetime import datetime, timezone
from fastapi import APIRouter
from app.db.mongo import chat_messages_collection
from app.models.schemas import ChatRequest, ChatResponse
from app.services.rag_service import answer_question

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest):
    # Log the user's message
    await chat_messages_collection().insert_one({
        "_id": uuid.uuid4().hex,
        "quest_id": req.quest_id,
        "role": "user",
        "text": req.message,
        "created_at": datetime.now(timezone.utc),
    })

    result = answer_question(req.message, document_id=req.document_id)

    # Log the avatar's reply
    await chat_messages_collection().insert_one({
        "_id": uuid.uuid4().hex,
        "quest_id": req.quest_id,
        "role": "avatar",
        "text": result["reply"],
        "created_at": datetime.now(timezone.utc),
    })

    return ChatResponse(reply=result["reply"], source_chunks=result["source_chunks"])
