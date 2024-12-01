from fastapi import APIRouter, HTTPException
from peewee import DoesNotExist
from .models import Card
from .schemas import CardCreate, CardUpdate

router = APIRouter(tags=["Cards"])

@router.post("/cards", response_model=CardCreate)
def add_card(card_data: CardCreate):
    new_card = Card.create(
        bank_name=card_data.bank_name,
        bank_logo=card_data.bank_logo,
        cardType=card_data.cardType,
        card_number=card_data.card_number,
        balance=card_data.balance
    )
    return new_card

@router.get("/cards/{card_id}")
def get_card(card_id: int):
    try:
        card = Card.get(Card.id == card_id)
        return {
            "id": card.id,
            "bank_name": card.bank_name,
            "bank_logo": card.bank_logo,
            "cardType": card.cardType,
            "card_number": card.card_number,
            "balance": card.balance,
        }
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Card not found")

@router.get("/cards")
def get_all_cards():
    cards = list(Card.select())
    return [
        {
            "id": card.id,
            "bank_name": card.bank_name,
            "bank_logo": card.bank_logo,
            "cardType": card.cardType,
            "card_number": card.card_number,
            "balance": card.balance,
        }
        for card in cards
    ]

@router.put("/cards/{card_id}")
def update_card(card_id: int, card_data: CardUpdate):
    try:
        card = Card.get(Card.id == card_id)
        card.bank_name = card_data.bank_name or card.bank_name
        card.bank_logo = card_data.bank_logo or card.bank_logo
        card.cardType = card_data.cardType or card.cardType
        card.card_number = card_data.card_number or card.card_number
        card.balance = card_data.balance if card_data.balance is not None else card.balance
        card.save()
        return {"detail": "Card updated successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Card not found")

@router.delete("/cards/{card_id}")
def delete_card(card_id: int):
    try:
        card = Card.get(Card.id == card_id)
        card.delete_instance()
        return {"detail": "Card deleted successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Card not found")