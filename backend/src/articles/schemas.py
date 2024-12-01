from pydantic import BaseModel, Field
from typing import List, Optional

class FinancialArticleCreate(BaseModel):
    title: str
    content: str

class FinancialArticleResponse(BaseModel):
    id: int
    title: str
    content: str
