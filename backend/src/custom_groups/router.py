from fastapi import APIRouter, HTTPException
from peewee import DoesNotExist
from typing import List
from .models import CustomGroup
from .schemas import CustomGroupCreate, CustomGroupUpdate, CustomGroupResponse

router = APIRouter(tags=["CustomGroups"])

@router.get("/custom-groups", response_model=List[CustomGroupResponse])
def get_all_custom_groups():
    groups = list(CustomGroup.select())
    return [{"id": group.id, "name": group.name} for group in groups]

@router.get("/custom-groups/{group_id}")
def get_custom_group(group_id: int):
    try:
        group = CustomGroup.get(CustomGroup.id == group_id)
        return {"id": group.id, "name": group.name}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Custom group not found")

@router.post("/custom-groups", response_model=CustomGroupResponse, tags=["CustomGroups"])
def create_custom_group(group_data: CustomGroupCreate):
    new_group = CustomGroup.create(name=group_data.name)
    return {"id": new_group.id, "name": new_group.name}

@router.put("/custom-groups/{group_id}", tags=["CustomGroups"])
def update_custom_group(group_id: int, group_data: CustomGroupUpdate):
    try:
        group = CustomGroup.get(CustomGroup.id == group_id)
        group.name = group_data.name or group.name
        group.save()
        return {"detail": "Custom group updated successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Custom group not found")

@router.delete("/custom-groups/{group_id}", tags=["CustomGroups"])
def delete_custom_group(group_id: int):
    try:
        CustomGroup.get(CustomGroup.id == group_id).delete_instance()
        return {"detail": "Custom group deleted successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Custom group not found")