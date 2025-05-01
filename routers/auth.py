from pydantic import BaseModel

from database import users_collection
from fastapi import APIRouter, HTTPException
from utils.auth import create_jwt_token, hash_password, verify_password

router = APIRouter()


class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    is_owner: bool = False


@router.post("/register")
def register_user(user: UserRegister):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = hash_password(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "is_owner": user.is_owner,
    }
    users_collection.insert_one(new_user)
    return {"message": "User registered successfully"}


class UserLogin(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(user_data: UserLogin):
    print(user_data.email, user_data.password)
    user = users_collection.find_one({"email": user_data.email})

    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt_token({"user_id": str(user["_id"])})
    del user["password"]
    user["_id"] = str(user["_id"])
    return {"access_token": token, "user": user}


@router.get("/test")
def test():
    return "test auth"
