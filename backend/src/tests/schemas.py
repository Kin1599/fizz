from pydantic import BaseModel, Field
from typing import List, Optional

class TestCreate(BaseModel):
    article_id: int
    question: str
    correct_answer: str

class TestResponse(BaseModel):
    id: int
    article_id: int
    question: str
    correct_answer: str
