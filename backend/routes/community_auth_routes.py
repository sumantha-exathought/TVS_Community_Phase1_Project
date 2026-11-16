
from fastapi import APIRouter, Depends

from config.db import get_db
from schemas.community_auth_schema import CommunityRegister, CommunityLogin
from controllers.community_auth_controller import (
    register_community_user,
    login_community_user
)

router = APIRouter(
    prefix="/api/auth/community",
    tags=["Community Authentication"]
)


@router.post("/register")
def register(data: CommunityRegister, db=Depends(get_db)):
    return register_community_user(data, db)


@router.post("/login")
def login(data: CommunityLogin, db=Depends(get_db)):
    return login_community_user(data, db)
