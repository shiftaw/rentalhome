from database_access.dB_api import Db_api

from database import places
from fastapi import APIRouter

router = APIRouter()

Dba_api_place = Db_api(places)


@router.get("/all")
def get_all_countries():
    cities = Dba_api_place.get_all()
    print(cities)
    return cities
