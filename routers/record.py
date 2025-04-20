from fastapi import APIRouter

router = APIRouter()

router.post("/record")


def start_recording():

    return "ok"
