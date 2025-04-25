from bson import ObjectId
from pydantic import BaseModel

from database import rent_collection
from database_access.dB_api import Db_api
from fastapi import APIRouter,UploadFile, File, Form,Depends
from utils.logger import logger
from datetime import datetime
import boto3
from uuid import uuid4
import os
from typing import List

router = APIRouter()
db_api = Db_api(rent_collection)


s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_DEFAULT_REGION")
)
def upload_to_s3(file, bucket_name: str, folder: str = "rents"):
    file_extension = file.filename.split(".")[-1]
    key = f"{folder}/{uuid4()}.{file_extension}"
    s3.upload_fileobj(file.file, bucket_name, key)
    url = f"https://{bucket_name}.s3.amazonaws.com/{key}"
    return url

class Rent(BaseModel):

    title: str
    description: str
    area: int
    deposit: int
    month_rent: int
    prepaid_rent: int
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
    
def parse_rent_form(
    title: str = Form(...),
    description: str = Form(...),
    area: int = Form(...),
    deposit: int = Form(...),
    month_rent: int = Form(...),
    prepaid_rent: int = Form(...),
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
    telephone_number: str = Form(""),
    available_from: str = Form("")

) -> Rent:

    return Rent(
        title=title,
        description=description,
        rooms=rooms,
        area=area,
        month_rent=month_rent,
        prepaid_rent=prepaid_rent,
        deposit=deposit,
        rent_period=rent_period,
        status=False,
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
        telephone_number=telephone_number
    )

@router.get("/test")
def test():
    return "Rent test"


@router.post("/create")
async def create_new_rent(rent_data: Rent = Depends(parse_rent_form),images: List[UploadFile] = File(...)):
    current_rent = rent_data.dict()
    current_rent["_id"] = ObjectId()

    # Upload to S3
    image_url = [ upload_to_s3(image, bucket_name="danielshenkutie") for image in images]
    current_rent["image_url"] = image_url

    # Save in DB
    result = db_api.insert_one(current_rent)
    return {"success": "ok", "error": "", "rent_id": str(current_rent["_id"]), "image_url": image_url}



@router.get("/all")
def get_all():
    all_rents = db_api.get_all()
    #logger.debug(all_rents)
    return all_rents


@router.get("/detail/{id}")
def get_detail(id:str):
    obj_id = ObjectId(id)
    print(id)
    item = db_api.find_one({"_id":obj_id})
    logger.debug(item)
    return item

