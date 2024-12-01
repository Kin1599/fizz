from peewee import *

from ..articles.models import FinancialArticle
from ..database import pg_db
from ..family.models import FamilyGroup


class BaseModel(Model):
    class Meta:
        database = pg_db

class Test(BaseModel):
    id = AutoField(primary_key=True)
    article = ForeignKeyField(FinancialArticle, backref='tests')
    question = CharField(max_length=255)
    correct_answer = CharField(max_length=255)

    class Meta:
        table_name = 'tests'