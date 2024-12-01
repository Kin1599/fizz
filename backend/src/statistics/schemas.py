from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class Transaction(BaseModel):
    paymentType: Optional[str] = Field("Карта", description="Тип платежа")
    transactionType: Optional[str] = Field("Расход", description="Тип транзакции (Расход/Доход)")
    amount: float = Field(..., description="Сумма транзакции")
    source: Optional[str] = Field("Перекресток", description="Источник транзакции")
    isHidden: Optional[bool] = Field(False, description="Скрыта ли транзакция")
    importance: Optional[str] = Field("Обычная", description="Важность транзакции")
    custom_group: Optional[int] = Field(None, description="ID кастомной группы")
    standart_group: Optional[str] = Field("Фаст-фуд", description="Стандартная группа")
    card: Optional[int] = Field(None, description="ID карты")
    transaction_date: Optional[date] = Field(None, description="Дата транзакции")

class TransactionCreate(BaseModel):
    paymentType: Optional[str] = Field("Карта", description="Тип платежа")
    transactionType: Optional[str] = Field("Расход", description="Тип транзакции (Расход/Доход)")
    amount: float = Field(..., description="Сумма транзакции")
    source: Optional[str] = Field("Перекресток", description="Источник транзакции")
    isHidden: Optional[bool] = Field(False, description="Скрыта ли транзакция")
    importance: Optional[str] = Field("Обычная", description="Важность транзакции")
    custom_group: Optional[int] = Field(None, description="ID кастомной группы")
    standart_group: Optional[str] = Field("Фаст-фуд", description="Стандартная группа")
    card: Optional[int] = Field(None, description="ID карты")
    transaction_date: Optional[date] = Field(None, description="Дата транзакции")

class TransactionUpdate(BaseModel):
    paymentType: Optional[str] = Field(None, description="Тип платежа")
    transactionType: Optional[str] = Field(None, description="Тип транзакции (Расход/Доход)")
    amount: Optional[float] = Field(None, description="Сумма транзакции")
    source: Optional[str] = Field(None, description="Источник транзакции")
    isHidden: Optional[bool] = Field(None, description="Скрыта ли транзакция")
    importance: Optional[str] = Field(None, description="Важность транзакции")
    custom_group: Optional[int] = Field(None, description="ID кастомной группы")
    standart_group: Optional[str] = Field(None, description="Стандартная группа")
    card: Optional[int] = Field(None, description="ID карты")
    transaction_date: Optional[date] = Field(None, description="Дата транзакции")  # Может быть None для не обновления