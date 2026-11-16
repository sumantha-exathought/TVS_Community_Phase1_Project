
from fastapi import APIRouter, Depends
from config.db import get_db

router = APIRouter()

@router.get("/")
def home():
    return {
        "status": "success",
        "message": "Backend application is running"
    }

@router.get("/db-check")
def database_check(db=Depends(get_db)):
    with db.cursor() as cursor:
        cursor.execute("SELECT DATABASE() AS database_name")
        result = cursor.fetchone()

    return {
        "status": "success",
        "message": "MySQL connected successfully",
        "database": result["database_name"]
    }
