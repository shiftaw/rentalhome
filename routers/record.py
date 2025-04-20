from fastapi import APIRouter
from tiktok_live_recorder.src import main

router = APIRouter()

router.post("/record")


def start_recording():
    main('record_test')
    return "ok"
