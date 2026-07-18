from fastapi import APIRouter, HTTPException
from app.db.mongo import quests_collection
from app.models.schemas import QuestOut

router = APIRouter(prefix="/quests", tags=["quests"])


@router.get("/document/{document_id}", response_model=list[QuestOut])
async def list_quests(document_id: str):
    cursor = quests_collection().find({"document_id": document_id}).sort("order", 1)
    quests = await cursor.to_list(length=100)
    return [
        QuestOut(
            id=q["_id"],
            document_id=q["document_id"],
            user_id=q["user_id"],
            title=q["title"],
            summary=q["summary"],
            order=q["order"],
            status=q["status"],
        )
        for q in quests
    ]


@router.patch("/{quest_id}/complete", response_model=QuestOut)
async def complete_quest(quest_id: str):
    quest = await quests_collection().find_one({"_id": quest_id})
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")

    await quests_collection().update_one({"_id": quest_id}, {"$set": {"status": "done"}})

    # Unlock the next quest in order, if one exists
    next_quest = await quests_collection().find_one({
        "document_id": quest["document_id"],
        "order": quest["order"] + 1,
    })
    if next_quest:
        await quests_collection().update_one(
            {"_id": next_quest["_id"]}, {"$set": {"status": "active"}}
        )

    updated = await quests_collection().find_one({"_id": quest_id})
    return QuestOut(
        id=updated["_id"],
        document_id=updated["document_id"],
        user_id=updated["user_id"],
        title=updated["title"],
        summary=updated["summary"],
        order=updated["order"],
        status=updated["status"],
    )
