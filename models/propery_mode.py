from pydantic import BaseModel


class PropertyModel(BaseModel):
    title: str
    rooms: int
    area: int
    month_rent: int
    deposit: int = 0
    prepaid_rent: int
    sharable: bool = False
    pets_allowed: bool = False
    senior_friendly: bool = False
    for_student_only: bool = False
    for_single_only: bool = False
    for_family_only: bool = False
    elevator: bool = False
    parking: bool = False
    balcony: bool = False
    charging_station: bool = False
    dishwasher: bool = False
    washing_machine: bool = False
    tumbler_dryer: bool = False
    refrigerator: bool = False
    furnished: bool = False
    digital_display: bool = False
    message_via_app: bool = False
    telephone_contact: bool = False
    telephone_number: str = ""
    description: str
    rent_period: str
    available_from: str
