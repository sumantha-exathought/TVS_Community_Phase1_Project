
import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from config.db import get_db
from utils.jwt_handler import decode_access_token

router = APIRouter(
    prefix="/api/community",
    tags=["Community Profile"]
)

security = HTTPBearer()


def get_current_community_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db=Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = decode_access_token(token)
        user_id = int(payload.get("sub"))
    except (jwt.InvalidTokenError, TypeError, ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    cursor = db.cursor()

    try:
        cursor.execute(
            """
            SELECT id, full_name, email, mobile, status
            FROM community_users
            WHERE id = %s
            """,
            (user_id,)
        )

        user = cursor.fetchone()

        if not user or user["status"] != "ACTIVE":
            raise HTTPException(
                status_code=401,
                detail="User not found or inactive"
            )

        return user

    finally:
        cursor.close()


@router.get("/me")
def get_my_profile(
    current_user=Depends(get_current_community_user)
):
    return {
        "status": "success",
        "user": current_user
    }
