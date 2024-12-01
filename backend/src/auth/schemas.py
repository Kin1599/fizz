from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    hashed_password: str
    consent: bool

class Token(BaseModel):
    access_token: str
    token_type: str