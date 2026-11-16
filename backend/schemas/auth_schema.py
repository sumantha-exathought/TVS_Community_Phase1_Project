

from pydantic import BaseModel, Field, field_validator
import re


class AdminRegister(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    email: str = Field(max_length=255)
    mobile: str = Field(min_length=10, max_length=15)
    role: str = Field(min_length=1, max_length=20)
    is_tvsm_user: bool = False
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value):
        value = value.strip().lower()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", value):
            raise ValueError("Invalid email address")
        return value

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value):
        value = value.strip()
        if not re.fullmatch(r"\+?[0-9]{10,15}", value):
            raise ValueError("Invalid mobile number")
        return value


class AdminLogin(BaseModel):
    email: str
    password: str
