from fastapi import APIRouter, HTTPException
from typing import List, Optional
from peewee import DoesNotExist

from .models import FinancialGoal
from .schemas import FinancialGoalResponse, FinancialGoalCreate

router = APIRouter(tags=["Goals"])


@router.post("/financial-goals", response_model=FinancialGoalResponse)
def create_financial_goal(goal_data: FinancialGoalCreate):
    goal = FinancialGoal.create(
        name=goal_data.name,
        target_amount=goal_data.target_amount,
        current_amount=goal_data.current_amount,
        family_group=goal_data.family_group,
    )

    return {
        "id": goal.id,
        "name": goal.name,
        "target_amount": goal.target_amount,
        "current_amount": goal.current_amount,
        "family_group": goal.family_group.id if goal.family_group else None,
    }


@router.get("/financial-goals", response_model=List[FinancialGoalResponse])
def get_financial_goals():
    goals = list(FinancialGoal.select())

    return [{
        "id": goal.id,
        "name": goal.name,
        "target_amount": goal.target_amount,
        "current_amount": goal.current_amount,
        "family_group": goal.family_group.id if goal.family_group else None,
    } for goal in goals]


@router.get("/financial-goals/{goal_id}", response_model=FinancialGoalResponse)
def get_financial_goal(goal_id: int):
    try:
        goal = FinancialGoal.get(FinancialGoal.id == goal_id)

        return {
            "id": goal.id,
            "name": goal.name,
            "target_amount": goal.target_amount,
            "current_amount": goal.current_amount,
            "family_group": goal.family_group.id if goal.family_group else None,
        }

    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Financial goal not found")


@router.put("/financial-goals/{goal_id}", response_model=FinancialGoalResponse)
def update_financial_goal(goal_id: int, goal_data: FinancialGoalCreate):
    try:
        goal = FinancialGoal.get(FinancialGoal.id == goal_id)

        goal.name = goal_data.name
        goal.target_amount = goal_data.target_amount
        goal.current_amount = goal_data.current_amount

        if goal_data.family_group is not None:
            goal.family_group = goal_data.family_group

        goal.save()

        return {
            "id": goal.id,
            "name": goal.name,
            "target_amount": goal.target_amount,
            "current_amount": goal.current_amount,
            "family_group": goal.family_group.id if goal.family_group else None,
        }

    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Financial goal not found")


@router.delete("/financial-goals/{goal_id}")
def delete_financial_goal(goal_id: int):
    try:
        FinancialGoal.get(FinancialGoal.id == goal_id).delete_instance()

        return {"detail": "Financial Goal deleted successfully"}

    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Financial Goal not found")