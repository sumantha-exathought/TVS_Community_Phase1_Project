
from fastapi import HTTPException
from datetime import datetime, timedelta

from utils.password import hash_password, verify_password
from utils.jwt_handler import create_access_token


def register_community_user(data, db):
    cursor = db.cursor()

    try:
        cursor.execute(
            "SELECT id FROM community_users WHERE email = %s OR mobile = %s",
            (str(data.email), data.mobile)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="Email or mobile number already registered"
            )

        password_hash = hash_password(data.password)

        cursor.execute(
            """
            INSERT INTO community_users
            (full_name, email, mobile, password_hash)
            VALUES (%s, %s, %s, %s)
            """,
            (
                data.full_name,
                str(data.email),
                data.mobile,
                password_hash
            )
        )

        db.commit()

        return {
            "status": "success",
            "message": "Account created successfully",
            "user_id": cursor.lastrowid
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Registration failed"
        )

    finally:
        cursor.close()


def login_community_user(data, db):
    cursor = db.cursor()

    try:
        cursor.execute(
            "SELECT * FROM community_users WHERE email = %s",
            (str(data.email),)
        )

        user = cursor.fetchone()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        if user["status"] != "ACTIVE":
            raise HTTPException(
                status_code=403,
                detail="Account is inactive"
            )

        now = datetime.now()

        if user["locked_until"] and user["locked_until"] > now:
            raise HTTPException(
                status_code=423,
                detail="Account temporarily locked. Try again later."
            )

        if not verify_password(data.password, user["password_hash"]):
            failed_count = user["failed_login_count"] + 1
            locked_until = None

            if failed_count >= 5:
                failed_count = 0
                locked_until = now + timedelta(minutes=15)

            cursor.execute(
                """
                UPDATE community_users
                SET failed_login_count = %s, locked_until = %s
                WHERE id = %s
                """,
                (failed_count, locked_until, user["id"])
            )

            db.commit()

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        cursor.execute(
            """
            UPDATE community_users
            SET failed_login_count = 0,
                locked_until = NULL,
                last_login_at = %s
            WHERE id = %s
            """,
            (now, user["id"])
        )

        db.commit()

        token = create_access_token(user["id"])

        return {
            "status": "success",
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "full_name": user["full_name"],
                "email": user["email"],
                "mobile": user["mobile"]
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

    finally:
        cursor.close()
