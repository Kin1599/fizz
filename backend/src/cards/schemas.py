from pydantic import BaseModel, Field
from typing import Optional

class CardCreate(BaseModel):
    bank_name: Optional[str] = Field(None, description="Название банка")
    bank_logo: Optional[str] = Field(None, description="Логотип банка")
    cardType: Optional[str] = Field(None, description="Тип карты")  # Значение по умолчанию
    card_number: Optional[str] = Field(None, description="Номер карты")  # Значение по умолчанию
    balance: float = Field(..., description="Баланс карты")  # Обязательное поле

class CardUpdate(BaseModel):
    bank_name: Optional[str] = Field(None, description="Название банка")
    bank_logo: Optional[str] = Field(None, description="Логотип банка")
    cardType: Optional[str] = Field(None, description="Тип карты")
    card_number: Optional[str] = Field(None, description="Номер карты")
    balance: Optional[float] = Field(None, description="Баланс карты")  # Может быть None для не обновления