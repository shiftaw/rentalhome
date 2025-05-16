from pymongo.errors import DuplicateKeyError
from bson import ObjectId
from pydantic import BaseModel
from database import rent_collection, places, users_collection
from database_access.dB_api import Db_api
from fastapi import APIRouter, UploadFile, File, Form, Depends
from utils.logger import logger
from utils.amazon_upload_image import upload_to_s3
from typing import List
from datetime import datetime
from utils.auth import decode_jwt_token

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
db_api_rent = Db_api(rent_collection)
db_api_places = Db_api(places)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class User(BaseModel):
    name: str
    email: str
    _id: ObjectId


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    # Decode and verify token here
    print("token", token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_jwt_token(token)
        print(payload)
        user_id: str = payload.get("user_id")
        print("user_id", user_id)
        if user_id is None:
            raise credentials_exception
    except:
        raise credentials_exception
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Optionally sanitize user object before returning
    user["_id"] = str(user["_id"])  # Convert ObjectId to string for JSON
    del user["password"]
    del user["is_owner"]

    # Optional: Fetch full user from DB here
    return user


class Rent(BaseModel):
    title: str
    description: str
    area: int
    deposit: int
    month_rent: int
    rooms: int
    rent_period: str
    balcony: bool
    charging_station: bool
    digital_display: bool
    dishwasher: bool
    elevator: bool
    for_student_only: bool
    furnished: bool
    message_via_app: bool
    parking: bool
    pets_allowed: bool
    refrigerator: bool
    senior_friendly: bool
    sharable: bool
    telephone_contact: bool
    tumbler_dryer: bool
    washing_machine: bool
    type: str
    available_from: str
    status: bool
    address: str


def parse_rent_form(
    title: str = Form(...),
    description: str = Form(...),
    area: int = Form(...),
    deposit: int = Form(...),
    month_rent: int = Form(...),
    rooms: int = Form(...),
    rent_period: str = Form(...),
    balcony: bool = Form(...),
    charging_station: bool = Form(...),
    digital_display: bool = Form(...),
    dishwasher: bool = Form(...),
    elevator: bool = Form(...),
    for_student_only: bool = Form(...),
    furnished: bool = Form(...),
    message_via_app: bool = Form(...),
    parking: bool = Form(...),
    pets_allowed: bool = Form(...),
    refrigerator: bool = Form(...),
    senior_friendly: bool = Form(...),
    sharable: bool = Form(...),
    telephone_contact: bool = Form(...),
    tumbler_dryer: bool = Form(...),
    washing_machine: bool = Form(...),
    available_from: str = Form(""),
    type: str = Form("Villa"),
    address: str = Form(""),
) -> Rent:
    return Rent(
        title=title,
        description=description,
        rooms=rooms,
        area=area,
        month_rent=month_rent,
        deposit=deposit,
        rent_period=rent_period,
        available_from=available_from,
        sharable=sharable,
        pets_allowed=pets_allowed,
        senior_friendly=senior_friendly,
        for_student_only=for_student_only,
        elevator=elevator,
        parking=parking,
        balcony=balcony,
        charging_station=charging_station,
        dishwasher=dishwasher,
        washing_machine=washing_machine,
        tumbler_dryer=tumbler_dryer,
        refrigerator=refrigerator,
        furnished=furnished,
        digital_display=digital_display,
        message_via_app=message_via_app,
        telephone_contact=telephone_contact,
        type=type,
        status=False,
        address=address,
    )


def add_or_increment_place(city, country):
    result = places.update_one(
        {"city": city, "country": country},
        {"$inc": {"counter": 1}, "$setOnInsert": {"city": city, "country": country}},
        upsert=True,
    )

    if result.upserted_id:
        print(f"Inserted new place: {city}, {country}")
    else:
        print(f"Incremented counter for: {city}, {country}")


@router.get("/test")
def test():
    return "Rent test"


@router.post("/create")
async def create_new_rent(
    rent_data: Rent = Depends(parse_rent_form),
    images: List[UploadFile] = File(...),
    user: dict = Depends(get_current_user),
):
    print("user", user)
    print("Test")
    current_rent = rent_data.dict()
    current_rent["_id"] = ObjectId()

    # Upload to S3
    image_url = [upload_to_s3(image, bucket_name="danielshenkutie") for image in images]
    print("Test")
    print("user me", user)

    print("image_url", image_url)
    current_rent["image_url"] = image_url
    current_rent["created_at"] = datetime.utcnow().isoformat()
    current_rent["host"] = user
    address = rent_data.address.split(",")
    city, country = address[-2:]
    add_or_increment_place(city, country)

    # Save in DB
    result = db_api_rent.insert_one(current_rent)
    return {
        "success": "ok",
        "error": "",
        "rent_id": str(current_rent["_id"]),
        "image_url": image_url,
    }


@router.get("/")
def get_all():
    all_rents = db_api_rent.get_all()
    print(all_rents)
    # logger.debug(all_rents)
    return all_rents

@router.get("/{city}/")
def get_all(city:str):
    all_rents = db_api_rent.get_all({
    "address": { "$regex": city, "$options": "i" }
})
    print(all_rents)
    # logger.debug(all_rents)
    return all_rents



@router.get("/detail/{id}")
def get_detail(id: str):
    obj_id = ObjectId(id)
    print(id)
    item = db_api_rent.find_one({"_id": obj_id})
    logger.debug(item)
    return item
