from fastapi import APIRouter, HTTPException
from typing import List, Optional
from peewee import DoesNotExist

from src.articles.models import FinancialArticle
from src.articles.schemas import FinancialArticleResponse, FinancialArticleCreate
from src.tests.models import Test
from src.tests.schemas import TestResponse, TestCreate

router = APIRouter(tags=["Tests"])


@router.post("/tests", response_model=TestResponse)
def create_test(test_data: TestCreate):
    test = Test.create(
        article=test_data.article_id,
        question=test_data.question,
        correct_answer=test_data.correct_answer,
    )

    return {
        "id": test.id,
        "article_id": test.article.id if test.article else None,
        "question": test.question,
        "correct_answer": test.correct_answer,
    }


@router.get("/tests", response_model=List[TestResponse])
def get_tests():
    tests = list(Test.select())

    return [{
        "id": test.id,
        "article_id": test.article.id if test.article else None,
        "question": test.question,
        "correct_answer": test.correct_answer,
    } for test in tests]


@router.get("/tests/{test_id}", response_model=TestResponse)
def get_test(test_id: int):
    try:
        test = Test.get(Test.id == test_id)

        return {
            "id": test.id,
            "article_id": test.article.id if test.article else None,
            "question": test.question,
            "correct_answer": test.correct_answer,
        }

    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Test not found")


@router.put("/tests/{test_id}", response_model=TestResponse)
def update_test(test_id: int, test_data: TestCreate):
    try:
        test = Test.get(Test.id == test_id)

        test.article = test_data.article_id
        test.question = test_data.question
        test.correct_answer = test_data.correct_answer

        test.save()

        return {
            "id": test.id,
            "article_id": test.article.id if test.article else None,
            "question": test.question,
            "correct_answer": test.correct_answer,
        }

    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Test not found")


@router.delete("/tests/{test_id}")
def delete_test(test_id: int):
    try:
        Test.get(Test.id == test_id).delete_instance()

        return {"detail": "Test deleted successfully"}

    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Test not found")