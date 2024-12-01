from pydantic import BaseModel, Field

class CustomGroupCreate(BaseModel):
    name: str = Field(default="Нужные траты", description="Название кастомной группы")

class CustomGroupUpdate(BaseModel):
    name: str = Field(None, description="Название кастомной группы")

class CustomGroupResponse(BaseModel):
    id: int = Field(..., description="ID кастомной группы")
    name: str = Field(..., description="Название кастомной группы")