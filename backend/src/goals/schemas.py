from pydantic import BaseModel, Field
from typing import List, Optional

class FinancialGoalCreate(BaseModel):
    name: str
    target_amount: float
    current_amount: float
    family_group: Optional[int]

class FinancialGoalResponse(BaseModel):
    id: int
    name: str
    target_amount: float
    current_amount: float
    family_group: Optional[int]
