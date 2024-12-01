from peewee import *
from ..database import pg_db
from ..family.models import FamilyGroup


class BaseModel(Model):
    class Meta:
        database = pg_db

class FinancialArticle(BaseModel):
    id = AutoField(primary_key=True)
    title = CharField(max_length=255)
    content = TextField()

    class Meta:
        table_name = 'financial_articles'