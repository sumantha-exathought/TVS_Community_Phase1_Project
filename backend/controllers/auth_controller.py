
from fastapi import HTTPException
from datetime import datetime, timedelta
from utils.password import hash_password, verify_password
from utils.jwt_handler import create_access_token


def register_admin(data, db):
    try:
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT COUNT(*) AS total FROM admin_users"
            )
            result = cursor.fetchone()

            if result["total"] > 0:
                raise HTTPException(
                    status_code=403,
                    detail="Admin already exists. Invitation required."
                )

            cursor.execute(
                """
                INSERT INTO admin_users
                (name, email, mobile, role, is_tvsm_user,
                 password_hash, status)
                VALUES (%s, %s, %s, %s, %s, %s, 'ACTIVE')
                """,
                (
                    data.name,
                    data.email,
                    data.mobile,
                    data.role,
                    data.is_tvsm_user,
                    hash_password(data.password)
                )
            )

            admin_id = cursor.lastrowid

        db.commit()

        return {
            "status": "success",
            "message": "First admin registered successfully",
            "admin_id": admin_id
        }

    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Admin registration failed"
        )


def login_admin(data, db):
    try:
        with db.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, email, role, password_hash,
                       status, failed_login_count, locked_until
                FROM admin_users
                WHERE email = %s
                """,
                (data.email.strip().lower(),)
            )

            admin = cursor.fetchone()

            if not admin:
                raise HTTPException(
                    status_code=401,
                    detail="Invalid email or password"
                )

            if admin["status"] != "ACTIVE":
                raise HTTPException(
                    status_code=403,
                    detail="Admin account is not active"
                )

            now = datetime.now()

            if admin["locked_until"] and admin["locked_until"] > now:
                raise HTTPException(
                    status_code=423,
                    detail="Account temporarily locked"
                )

            if not admin["password_hash"] or not verify_password(
                data.password, admin["password_hash"]
            ):
                failed_count = admin["failed_login_count"] + 1

                locked_until = (
                    now + timedelta(minutes=15)
                    if failed_count >= 5 else None
                )

                cursor.execute(
                    """
                    UPDATE admin_users
                    SET failed_login_count = %s,
                        locked_until = %s
                    WHERE id = %s
                    """,
                    (failed_count, locked_until, admin["id"])
                )

                db.commit()

                raise HTTPException(
                    status_code=401,
                    detail="Invalid email or password"
                )

            cursor.execute(
                """
                UPDATE admin_users
                SET failed_login_count = 0,
                    locked_until = NULL,
                    last_login_at = %s
                WHERE id = %s
                """,
                (now, admin["id"])
            )

        db.commit()

        token = create_access_token(admin["id"])

        return {
            "status": "success",
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer",
            "admin": {
                "id": admin["id"],
                "name": admin["name"],
                "email": admin["email"],
                "role": admin["role"]
            }
        }

    except HTTPException:
        raise
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Login failed"
        )
