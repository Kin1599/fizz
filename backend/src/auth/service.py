from fastapi import HTTPException
from passlib.context import CryptContext
from peewee import DoesNotExist
from randominfo import get_birthdate

from .models import User
from .schemas import UserCreate
from russian_names import RussianNames

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

    if user.consent:
        new_user = User(
            email=user.email,
            hashed_password=hashed_password,
            consent=user.consent,
            name=RussianNames().get_person(patronymic=False, surname=False),
            birthday=get_birthdate(startAge = 14, endAge = 99, _format="%Y-%m-%d")
        )
    else:
        new_user = User(
            email=user.email,
            hashed_password=hashed_password,
            consent=user.consent,
            name="Пользователь",
            birthday="1970-01-01"
        )

    new_user.save(force_insert=True)

    return new_user


# Аутентификация пользователя
def authenticate_user(email: str, password: str):
    user = get_user_by_email(email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user