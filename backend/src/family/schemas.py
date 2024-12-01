from pydantic import BaseModel, Field
from typing import List, Optional

class FamilyGroupCreate(BaseModel):
    name: str = Field(..., description="Название семейной группы")

class FamilyGroupResponse(BaseModel):
    id: int
    name: str