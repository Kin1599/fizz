from fastapi import APIRouter, HTTPException, Query
from peewee import fn
from typing import List, Optional
from datetime import date
from .models import Transaction
import joblib

router = APIRouter()

model = joblib.load("model.pkl")


@router.get("/statistics/monthly", tags=["Statistics"])
def get_monthly_statistics(start_date: Optional[date] = None, end_date: Optional[date] = None,
                           card_id: Optional[int] = None):
    query = Transaction.select(
        fn.strftime('%Y-%m', Transaction.transaction_date).alias('month'),
        fn.SUM(Transaction.amount).alias('total_amount'),
        fn.AVG(Transaction.amount).alias('average_amount')
    )

    if start_date:
        query = query.where(Transaction.transaction_date >= start_date)
    if end_date:
        query = query.where(Transaction.transaction_date <= end_date)
    if card_id:
        query = query.where(Transaction.card == card_id)

    query = query.group_by('month')

    return [{"month": row.month, "total_amount": row.total_amount, "average_amount": row.average_amount} for row in
            query]


@router.get("/statistics/weekly", tags=["Statistics"])
def get_weekly_statistics(start_date: Optional[date] = None, end_date: Optional[date] = None,
                          card_id: Optional[int] = None):
    query = Transaction.select(
        fn.strftime('%Y-%W', Transaction.transaction_date).alias('week'),
        fn.SUM(Transaction.amount).alias('total_amount'),
        fn.AVG(Transaction.amount).alias('average_amount')
    )

    if start_date:
        query = query.where(Transaction.transaction_date >= start_date)
    if end_date:
        query = query.where(Transaction.transaction_date <= end_date)
    if card_id:
        query = query.where(Transaction.card == card_id)

    query = query.group_by('week')

    return [{"week": row.week, "total_amount": row.total_amount, "average_amount": row.average_amount} for row in query]


@router.get("/statistics/daily", tags=["Statistics"])
def get_daily_statistics(start_date: Optional[date] = None, end_date: Optional[date] = None,
                         card_id: Optional[int] = None):
    query = Transaction.select(
        Transaction.date,
        fn.SUM(Transaction.amount).alias('total_amount'),
        fn.AVG(Transaction.amount).alias('average_amount')
    )

    if start_date:
        query = query.where(Transaction.transaction_date >= start_date)
    if end_date:
        query = query.where(Transaction.transaction_date <= end_date)
    if card_id:
        query = query.where(Transaction.card == card_id)

    query = query.group_by(Transaction.transaction_date)

    return [{"date": row.date.isoformat(), "total_amount": row.total_amount, "average_amount": row.average_amount} for
            row in query]


@router.get("/statistics/averages", tags=["Statistics"])
def get_average_income_expense(start_date: Optional[date] = None, end_date: Optional[date] = None):
    income_query = Transaction.select(fn.AVG(Transaction.amount)).where(
        Transaction.transactionType == "Доход"
    )

    expense_query = Transaction.select(fn.AVG(Transaction.amount)).where(
        Transaction.transactionType == "Расход"
    )

    if start_date:
        income_query = income_query.where(Transaction.transaction_date >= start_date)
        expense_query = expense_query.where(Transaction.transaction_date >= start_date)

    if end_date:
        income_query = income_query.where(Transaction.transaction_date <= end_date)
        expense_query = expense_query.where(Transaction.transaction_date <= end_date)

    average_income = income_query.scalar() or 0
    average_expense = expense_query.scalar() or 0

    return {
        "average_income": average_income,
        "average_expense": average_expense,
        "net_investment_capacity": average_income - average_expense
    }


@router.get("/statistics/categories", tags=["Statistics"])
def get_category_statistics(start_date: Optional[date] = None, end_date: Optional[date] = None,
                            card_id: Optional[int] = None):
    query = Transaction.select(
        Transaction.standart_group,
        fn.SUM(Transaction.amount).alias('total_amount'),
        fn.AVG(Transaction.amount).alias('average_amount')
    )

    if start_date:
        query = query.where(Transaction.transaction_date >= start_date)
    if end_date:
        query = query.where(Transaction.transaction_date <= end_date)
    if card_id:
        query = query.where(Transaction.card == card_id)

    query = query.group_by(Transaction.standart_group)

    return [{"category": row.standart_group, "total_amount": row.total_amount, "average_amount": row.average_amount} for
            row in query]


@router.post("/statistics/prediction", tags=["Statistics"])
def predict_expenses(data: List[float]):
    try:
        input_data = [data]

        predicted_expenses = model.predict(input_data)

        return {
            "predicted_expenses": predicted_expenses[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while predicting expenses: {str(e)}")