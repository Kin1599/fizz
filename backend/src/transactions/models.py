from peewee import *
from ..database import pg_db
from ..cards.models import Card
from ..custom_groups.models import CustomGroup

class BaseModel(Model):
    class Meta:
        database = pg_db

class Transaction(BaseModel):
    id = AutoField(column_name="id", primary_key=True)
    paymentType = CharField(column_name="paymentType", default="Карта")
    transactionType = CharField(column_name="transactionType", default="Расход")
    amount = FloatField(column_name="amount")
    source = CharField(column_name="source", default="Перекресток")
    isHidden = BooleanField(column_name="isHidden", default=False)
    importance = CharField(column_name="importance", default="Обычная", null=True)
    custom_group = ForeignKeyField(column_name="custom_group_id", model=CustomGroup, null=True)
    standart_group = CharField(column_name="standart_group", default="Фаст-фуд", null=True)
    card = ForeignKeyField(column_name="card_id", model=Card, null=True)
    transaction_date = DateField(column_name="transaction_date", null=True)

    class Meta:
        table_name = 'transactions'