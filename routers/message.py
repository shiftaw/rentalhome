from datetime import datetime

from bson import ObjectId
from pydantic import BaseModel

from database import messages_collection
from fastapi import APIRouter, Depends, HTTPException
from utils.auth import decode_jwt_token  # JWT Helper

router = APIRouter()


# Message Model
class MessageCreate(BaseModel):
    receiver_id: str
    content: str


# Middleware: Get Current User from JWT
def get_current_user(token: str = Depends(decode_jwt_token)):
    if not token:
        raise HTTPException(status_code=401, detail="Invalid token or expired session")
    return token


# 1️⃣ Send a Message
@router.post("/messages")
def send_message(message: MessageCreate, user: dict = Depends(get_current_user)):
    new_message = {
        "sender_id": user["user_id"],
        "receiver_id": message.receiver_id,
        "content": message.content,
        "timestamp": datetime.utcnow(),
        "status": "sent",
    }

    result = messages_collection.insert_one(new_message)
    return {"message": "Message sent", "message_id": str(result.inserted_id)}


# 2️⃣ Get Messages for Current User
@router.get("/messages")
def get_messages(user: dict = Depends(get_current_user)):
    print("user", user)

    user_messages = list(
        messages_collection.find(
            {
                "$or": [
                    {"sender_id": user["user_id"]},
                    {"receiver_id": user["user_id"]},
                ]
            }
        )
    )

    for msg in user_messages:
        msg["_id"] = str(msg["_id"])
        msg["sender_id"] = str(msg["sender_id"])
        msg["receiver_id"] = str(msg["receiver_id"])

    return user_messages


# 3️⃣ Delete a Message
@router.delete("/messages/{message_id}")
def delete_message(message_id: str, user: dict = Depends(get_current_user)):
    result = messages_collection.delete_one(
        {"_id": ObjectId(message_id), "sender_id": user["user_id"]}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")

    return {"message": "Message deleted"}
