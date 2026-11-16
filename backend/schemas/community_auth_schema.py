
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
import re


class CommunityRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    mobile: str
    password: str = Field(min_length=8)
    confirm_password: str

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value):
        if not re.fullmatch(r"[6-9]\d{9}", value):
            raise ValueError("Enter a valid 10-digit mobile number")
        return value

    @model_validator(mode="after")
    def validate_passwords(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


class CommunityLogin(BaseModel):
    email: EmailStr
    password: str
