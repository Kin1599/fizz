from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    login: EmailStr

class UserCreate(UserBase):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str