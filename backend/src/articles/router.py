from fastapi import APIRouter, HTTPException
from typing import List, Optional
from peewee import DoesNotExist

from src.articles.models import FinancialArticle
from src.articles.schemas import FinancialArticleResponse, FinancialArticleCreate

router = APIRouter(tags=["Articles"])


@router.post("/articles", response_model=FinancialArticleResponse)
def create_article(article_data: FinancialArticleCreate):
    article = FinancialArticle.create(
        title=article_data.title,
        content=article_data.content,
    )

    return {"id": article.id, "title": article.title, "content": article.content}


@router.get("/articles", response_model=List[FinancialArticleResponse])
def get_articles():
    articles = list(FinancialArticle.select())

    return [{"id": article.id, "title": article.title, "content": article.content} for article in articles]


@router.get("/articles/{article_id}", response_model=FinancialArticleResponse)
def get_article(article_id: int):
    try:
        article = FinancialArticle.get(FinancialArticle.id == article_id)
        return {"id": article.id, "title": article.title, "content": article.content}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Article not found")


@router.put("/articles/{article_id}", response_model=FinancialArticleResponse)
def update_article(article_id: int, article_data: FinancialArticleCreate):
    try:
        article = FinancialArticle.get(FinancialArticle.id == article_id)
        article.title = article_data.title
        article.content = article_data.content
        article.save()

        return {"id": article.id, "title": article.title, "content": article.content}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Article not found")


@router.delete("/articles/{article_id}")
def delete_article(article_id: int):
    try:
        FinancialArticle.get(FinancialArticle.id == article_id).delete_instance()
        return {"detail": "Article deleted successfully"}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Article not found")