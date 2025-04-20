from bson import ObjectId
from pydantic import BaseModel

from database import properties_collection
from fastapi import APIRouter

router = APIRouter()


# Request Body Schema
class PropertyCreate(BaseModel):
    title: str
    description: str
    price: float
    location: str
    images: list[str]
    city: str


@router.post("/properties")
def create_property(property: PropertyCreate):
    new_property = property.dict()
    new_property["_id"] = ObjectId()  # Generate a MongoDB ObjectID
    properties_collection.insert_one(new_property)
    return {
        "message": "Property added successfully",
        "property_id": str(new_property["_id"]),
    }
