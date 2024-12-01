from fastapi import APIRouter, HTTPException, Query
from peewee import DoesNotExist
from typing import List, Optional
from .models import Transaction, CustomGroup
from .schemas import TransactionCreate, TransactionUpdate
from .schemas import Transaction as TransactionSchema
from datetime import date
from ..cards.models import Card

router = APIRouter(tags=["Transactions"])


@router.get("/transactions", response_model=List[TransactionSchema])
def get_transactions(
        start_date: Optional[date] = Query(None, description="Начальная дата фильтра"),
        end_date: Optional[date] = Query(None, description="Конечная дата фильтра"),
        transaction_type: Optional[str] = Query(None, description="Тип транзакции (Расход/Доход)"),
        custom_group_id: Optional[int] = Query(None, description="ID кастомной группы")
):
    query = Transaction.select()

    if start_date:
        query = query.where(Transaction.transaction_date >= start_date)
    if end_date and start_date != end_date:
        query = query.where(Transaction.transaction_date <= end_date)
    if transaction_type:
        query = query.where(Transaction.transactionType == transaction_type)
    if custom_group_id:
        query = query.where(Transaction.custom_group == custom_group_id)

    transactions = list(query)
    return [
        {
            "id": transaction.id,
            "paymentType": transaction.paymentType,
            "transactionType": transaction.transactionType,
            "amount": transaction.amount,
            "source": transaction.source,
            "isHidden": transaction.isHidden,
            "importance": transaction.importance,
            "custom_group": transaction.custom_group.id if transaction.custom_group else None,
            "standart_group": transaction.standart_group,
            "card": transaction.card.id if transaction.card else None,
            "transaction_date": transaction.transaction_date,
        }
        for transaction in transactions
    ]


@router.get("/transactions/{transaction_id}")
def get_transaction(transaction_id: int):
    try:
        transaction = Transaction.get(Transaction.id == transaction_id)
        return {
            "id": transaction.id,
            "paymentType": transaction.paymentType,
            "transactionType": transaction.transactionType,
            "amount": transaction.amount,
            "source": transaction.source,
            "isHidden": transaction.isHidden,
            "importance": transaction.importance,
            "custom_group": transaction.custom_group.id if transaction.custom_group else None,
            "standart_group": transaction.standart_group,
            "card": transaction.card.id if transaction.card else None,
            "transaction_date": transaction.transaction_date,
        }
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Transaction not found")


@router.post("/transactions", tags=["Transactions"])
def create_transaction(transaction_data: TransactionCreate):
    if transaction_data.custom_group is not None:
        try:
            custom_group = CustomGroup.get(CustomGroup.id == transaction_data.custom_group)
        except DoesNotExist:
            raise HTTPException(status_code=404, detail="Custom group not found")
    else:
        custom_group = None

    if transaction_data.card is not None:
        try:
            card = Card.get(Card.id == transaction_data.card)
        except DoesNotExist:
            raise HTTPException(status_code=404, detail="Card not found")
    else:
        card = None

    new_transaction = Transaction.create(
        paymentType=transaction_data.paymentType,
        transactionType=transaction_data.transactionType,
        amount=transaction_data.amount,
        source=transaction_data.source,
        isHidden=transaction_data.isHidden,
        importance=transaction_data.importance,
        custom_group=custom_group,
        standart_group=transaction_data.standart_group,
        card=card,
        transaction_date=transaction_data.transaction_date
    )

    return {
        "id": new_transaction.id,
        "paymentType": new_transaction.paymentType,
        "transactionType": new_transaction.transactionType,
        "amount": new_transaction.amount,
        "source": new_transaction.source,
        "isHidden": new_transaction.isHidden,
        "importance": new_transaction.importance,
        "custom_group": custom_group.id if custom_group else None,
        "standart_group": new_transaction.standart_group,
        "card": card.id if card else None,
        "transaction_date": new_transaction.transaction_date
    }

@router.put("/transactions/{transaction_id}")
def update_transaction(transaction_id: int, transaction_data: TransactionUpdate):
    try:
        transaction = Transaction.get(Transaction.id == transaction_id)

        transaction.paymentType = transaction_data.paymentType or transaction.paymentType
        transaction.transactionType = transaction_data.transactionType or transaction.transactionType
        transaction.amount = transaction_data.amount if transaction_data.amount is not None else transaction.amount
        transaction.source = transaction_data.source or transaction.source
        transaction.isHidden = transaction_data.isHidden if transaction_data.isHidden is not None else transaction.isHidden
        transaction.importance = transaction_data.importance or transaction.importance

        if transaction_data.custom_group is not None:
            try:
                custom_group = CustomGroup.get(CustomGroup.id == transaction_data.custom_group)
                transaction.custom_group = custom_group
            except DoesNotExist:
                raise HTTPException(status_code=404, detail="Custom group not found")

        if transaction_data.card is not None:
            try:
                card = Card.get(Card.id == transaction_data.card)
                transaction.card = card
            except DoesNotExist:
                raise HTTPException(status_code=404, detail="Card not found")

        if isinstance(transaction_data.transaction_date, date):
            transaction.transaction_date = transaction_data.transaction_date

        transaction.save()

        return {"detail": "Transaction updated successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Transaction not found")


@router.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int):
    try:
        transaction = Transaction.get(Transaction.id == transaction_id)
        transaction.delete_instance()
        return {"detail": "Transaction deleted successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Transaction not found")