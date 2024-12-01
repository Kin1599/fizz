from fastapi import APIRouter, HTTPException, Depends
from playhouse.shortcuts import model_to_dict

from .schemas import UserCreate, Token
from .service import authenticate_user, create_user
from .utils import create_access_token

router = APIRouter(tags=["Auth"])

@router.post("/login")
def login_user(email: str, password: str):
    user = authenticate_user(email, password)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", response_model=Token)
def register_user(user: UserCreate):
    new_user = create_user(user)
    print(model_to_dict(new_user))

    # Генерируем JWT токен для нового пользователя
    access_token = create_access_token(data={"sub": new_user.email})

    return {"access_token": access_token, "token_type": "bearer"}