from fastapi import HTTPException
from passlib.context import CryptContext
from peewee import DoesNotExist
from .models import User
from .schemas import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Хеширование пароля
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# Проверка пароля
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# Получение пользователя по email
def get_user_by_email(email: str):
    try:
        return User.get(User.email == email)
    except DoesNotExist:
        return None


# Создание нового пользователя
def create_user(user: UserCreate):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Хешируем пароль
    hashed_password = hash_password(user.hashed_password)

    new_user = User(
        login=user.login,
        hashed_password=hashed_password
    )

    new_user.save()

    return new_user


# Аутентификация пользователя
def authenticate_user(email: str, password: str):
    user = get_user_by_email(email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user