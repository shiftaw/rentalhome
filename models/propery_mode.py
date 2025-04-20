from pydantic import BaseModel


class PropertyModel(BaseModel):
    title: str
    description: str
    price: float
    images: list[str]
    city: str
    street_name: str
    postal_code: str
    category: str
    rooms: float
    size_m2: float
    monthly_rent: float
    monthly_rent_currency: str
    monthly_rent_extra_costs: float
    prepaid_rent: float
    deposit: float
    deposit_currency: str
    location: {"lat": float, "lng": float}
    ad_phone_number: str
    state: str
    floor: int
    rental_period: str
    available_from: str
    is_contactable_via_message: bool
