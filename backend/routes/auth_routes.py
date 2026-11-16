
from fastapi import APIRouter, Depends
from schemas.auth_schema import AdminRegister, AdminLogin
from controllers.auth_controller import register_admin, login_admin
from config.db import get_db

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register")
def register(data: AdminRegister, db=Depends(get_db)):
    return register_admin(data, db)


@router.post("/login")
def login(data: AdminLogin, db=Depends(get_db)):
    return login_admin(data, db)
