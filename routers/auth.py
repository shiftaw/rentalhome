from fastapi import APIRouter, HTTPException, Depends
from database import users_collection
from utils.auth import hash_password, verify_password, create_jwt_token
from pydantic import BaseModel

router = APIRouter()


class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    is_owner: bool = False


@router.post("/register")
def register_user(user: UserRegister):
    print(user)
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
    return {"access_token": token}


@router.get("/test")
def test():
    return "test auth"
