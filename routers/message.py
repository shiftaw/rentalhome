from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from pymongo import DESCENDING,ASCENDING

from bson import ObjectId

from database import messages_collection
from fastapi import APIRouter, Depends, HTTPException
from utils.auth import decode_jwt_token  # JWT Helper
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


# Message Model
class MessageCreate(BaseModel):
    receiver_id: str
    content: str
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)


# Middleware: Get Current User from JWT
def get_current_user(token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=401, detail="Invalid token or expired session")
    payload = decode_jwt_token(token)
    print(payload)
    return payload


# 1️⃣ Send a Message
@router.post("/send")
def send_message(message: MessageCreate, user: dict = Depends(get_current_user)):
    print('user',user)
    new_message = {
        "_id":ObjectId(),
        "sender_id": user["user_id"],
        "receiver_id": message.receiver_id,
        "content": message.content,
        "timestamp": datetime.utcnow(),
        "status": "sent",
    }

    result = messages_collection.insert_one(new_message)
    return {"message": "Message sent", "message_id": str(result.inserted_id)}


# Get all messages where the user is either sender or receiver
@router.get("/conversations/{user_id}")
def get_conversations(user_id: str):
    messages = messages_collection.find({
        "$or": [
            {"sender_id": user_id},
            {"receiver_id": user_id}
        ]
    }).sort("timestamp", DESCENDING)
    seen = set()
    conversations = []

    for msg in messages:
        sender = msg["sender_id"]
        receiver = msg["receiver_id"]
        other_user = receiver if sender == user_id else sender

        if other_user not in seen:
            conversations.append({
                "user_id": other_user,
                "last_message": msg["content"],
                "timestamp": msg["timestamp"]
            })
            seen.add(other_user)

    return conversations

@router.get("/chat/{user1_id}/{user2_id}")
def get_chat_history(user1_id: str, user2_id: str):
    messages = messages_collection.messages.find({
        "$or": [
            {"sender_id": user1_id, "receiver_id": user2_id},
            {"sender_id": user2_id, "receiver_id": user1_id}
        ]
    }).sort("timestamp", ASCENDING)

    chat = []
    for msg in messages:
        chat.append({
            "sender_id": msg["sender_id"],
            "receiver_id": msg["receiver_id"],
            "content": msg["content"],
            "timestamp": msg["timestamp"]
        })

    return chat

# 3️⃣ Delete a Message
@router.delete("/messages/{message_id}")
def delete_message(message_id: str, user: dict = Depends(get_current_user)):
    result = messages_collection.delete_one(
        {"_id": ObjectId(message_id), "sender_id": user["user_id"]}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")

    return {"message": "Message deleted"}
