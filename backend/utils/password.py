
import hashlib
import secrets
import hmac

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)

    hashed = hashlib.scrypt(
        password.encode(),
        salt=salt,
        n=16384,
        r=8,
        p=1
    )

    return f"scrypt${salt.hex()}${hashed.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        algorithm, salt_hex, hash_hex = stored_hash.split("$")

        if algorithm != "scrypt":
            return False

        salt = bytes.fromhex(salt_hex)
        original_hash = bytes.fromhex(hash_hex)

        new_hash = hashlib.scrypt(
            password.encode(),
            salt=salt,
            n=16384,
            r=8,
            p=1
        )

        return hmac.compare_digest(new_hash, original_hash)

    except (ValueError, TypeError):
        return False
