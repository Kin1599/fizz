from peewee import *
from ..database import pg_db
from ..family.models import FamilyGroup


class BaseModel(Model):
    class Meta:
        database = pg_db

class FinancialGoal(BaseModel):
    id = AutoField(primary_key=True)
    name = CharField(max_length=255)
    target_amount = FloatField()
    current_amount = FloatField()
    family_group = ForeignKeyField(FamilyGroup, backref='goals', null=True)

    class Meta:
        table_name = 'financial_goals'