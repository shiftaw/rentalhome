from bson import ObjectId
from pydantic import BaseModel

from database import rent_collection
from database_access.dB_api import Db_api
from fastapi import APIRouter
from utils.logger import logger

router = APIRouter()
db_api = Db_api(rent_collection)


class Rent(BaseModel):
    title: str
    description: str
    rooms: int
    area: int
    month_rent: int
    prepaid_rent: int
    deposit: int
    status: str = "draft"
    # Life style
    sharable: bool = False
    pets_allowed: bool = False
    senior_friendly: bool = False
    for_student_only: bool = False
    for_family: bool = False
    for_single: bool = False
    # Facility
    elevator: bool = False
    parking: bool = False
    balcony: bool = False
    charging_station: bool = False
    # inventory
    dishwasher: bool = False
    washing_machine: bool = False
    tumbler_dryer: bool = False
    refrigerator: bool = False
    furnished: bool = False
    # contact
    digital_display: bool = False
    message_via_app: bool = True
    telephone_contact: bool = False
    telephone_number: str = ""


@router.get("/test")
def test():
    return "Rent test"


@router.post("/create")
def create_new_rent(new_rent: Rent):
    current_rent = new_rent.dict()
    current_rent["_id"] = ObjectId()
    result = db_api.insert_one(current_rent)
    return {"success": "ok", "error": "", "rent_id": str(current_rent["_id"])}


@router.get("/all")
def get_all():
    all_rents = db_api.get_all()
    logger.debug(all_rents)
    return all_rents
