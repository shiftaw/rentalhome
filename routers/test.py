from fastapi import APIRouter

router = APIRouter()


@router.get("/test")
def test_router():
    print("test router")
    return {"test": "result"}
