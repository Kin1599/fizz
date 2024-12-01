from fastapi import APIRouter, HTTPException
from typing import List, Optional

from peewee import DoesNotExist

from .models import FamilyGroup
from .schemas import FamilyGroupCreate, FamilyGroupResponse

router = APIRouter(tags=["Family"])

# Роуты для семейных групп
@router.post("/family-groups", response_model=FamilyGroupResponse)
def create_family_group(group_data: FamilyGroupCreate):
    group = FamilyGroup.create(name=group_data.name)
    return {"id": group.id, "name": group.name}

@router.get("/family-groups", response_model=List[FamilyGroupResponse])
def get_family_groups():
    groups = list(FamilyGroup.select())
    return [{"id": group.id, "name": group.name} for group in groups]

@router.get("/family-groups/{group_id}", response_model=FamilyGroupResponse)
def get_family_group(group_id: int):
    try:
        group = FamilyGroup.get(FamilyGroup.id == group_id)
        return {"id": group.id, "name": group.name}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Family group not found")

@router.put("/family-groups/{group_id}", response_model=FamilyGroupResponse)
def update_family_group(group_id: int, group_data: FamilyGroupCreate):
    try:
        group = FamilyGroup.get(FamilyGroup.id == group_id)
        group.name = group_data.name
        group.save()
        return {"id": group.id, "name": group.name}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Family group not found")

@router.delete("/family-groups/{group_id}")
def delete_family_group(group_id: int):
    try:
        FamilyGroup.get(FamilyGroup.id == group_id).delete_instance()
        return {"detail": "Family group deleted successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Family group not found")