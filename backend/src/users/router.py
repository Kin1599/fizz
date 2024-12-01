from fastapi import APIRouter, HTTPException, Depends
from peewee import DoesNotExist
from .models import User
from service import hash_password

router = APIRouter()

@router.get("/users/{user_id}", tags=["Users"])
def get_user(user_id: int):
    try:
        user = User.get(User.id == user_id)
        return {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "birthday": user.birthday,
        }
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}/password", tags=["Users"])
def change_password(user_id: int, new_password: str):
    try:
        user = User.get(User.id == user_id)
        user.hashed_password = hash_password(new_password)
        user.save()
        return {"detail": "Password updated successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}/name", tags=["Users"])
def update_name(user_id: int, name: str):
    try:
        user = User.get(User.id == user_id)
        user.name = name
        user.save()
        return {"detail": "Name updated successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

@router.put("/users/{user_id}/birthday", tags=["Users"])
def update_birthday(user_id: int, birthday: str):
    try:
        user = User.get(User.id == user_id)
        user.birthday = birthday
        user.save()
        return {"detail": "Birthday updated successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")