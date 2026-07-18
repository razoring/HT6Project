# Study Room Backend

## Setup

```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt --break-system-packages   # or omit the flag in a venv

cp .env.example .env
# edit .env: set GEMINI_API_KEY, and MONGO_URI if not running Mongo locally
```

Make sure MongoDB is running locally (or point `MONGO_URI` at Atlas):

```bash
# macOS: brew services start mongodb-community
# or run via Docker:
docker run -d -p 27017:27017 --name mongo mongo:7
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

API docs (auto-generated) at `http://localhost:8000/docs` — useful for testing
endpoints from the browser without a frontend during the hackathon.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/documents/upload` | Upload a PDF/txt, kicks off processing in background |
| GET | `/documents/{id}` | Check processing status |
| GET | `/quests/document/{document_id}` | List quests for a document |
| PATCH | `/quests/{quest_id}/complete` | Mark a quest done, unlocks the next one |
| POST | `/chat` | Ask the avatar a question (RAG over the document) |

## Pipeline (what happens after upload)

1. File saved to `./uploads/`
2. `ingestion_service` extracts text, splits into ~1500-char overlapping chunks
3. `embedding_service` embeds each chunk (Gemini `text-embedding-004`) and stores
   in a local persistent Chroma collection (`./chroma_data/`)
4. `topic_segmentation` sends the chunks to Gemini, gets back a structured topic
   list, which becomes `quests` documents in Mongo (first quest auto-unlocked)
5. Frontend polls `GET /documents/{id}` until `status == "ready"`, then fetches
   `GET /quests/document/{id}`

## Notes for your teammate (focus tracking)

Not included here — that runs client-side (mediapipe/face-api.js) per the
architecture doc. If you want focus events logged to Mongo for analytics,
add a `focus_events` collection write (schema already sketched in
`db/mongo.py` as `focus_events_collection()`) — just needs a small
`POST /focus/event` route added to `routers/`.
