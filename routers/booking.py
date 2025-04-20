from bson import ObjectId
from pydantic import BaseModel

from database import bookings_collection
from fastapi import APIRouter

router = APIRouter()


class BookingCreate(BaseModel):
    property_id: str
    booker_id: str
    state: str


router.post("/booking")


def create_booking(booking: BookingCreate):
    new_booking = booking.dict()
    new_booking["_id"] = ObjectId()
    bookings_collection.insert_one(new_booking)
    return {
        "message": "Property added successfully",
        "property_id": str(new_booking["_id"]),
    }


router.get("/booking")


def read_booking():
    bookings = bookings_collection.find()
    return {"message": "Property added successfully", "booking": bookings}
