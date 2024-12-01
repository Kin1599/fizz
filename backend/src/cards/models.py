from peewee import *
from ..database import pg_db

class BaseModel(Model):
    class Meta:
        database = pg_db

class Card(BaseModel):
    id = AutoField(column_name="id", primary_key=True)
    bank_name = CharField(column_name="bank_name", null=True)
    bank_logo = CharField(column_name="bank_logo", null=True)
    cardType = CharField(column_name="cardType", null=True)
    card_number = CharField(column_name="card_number", null=True)
    balance = FloatField(column_name="balance")

    class Meta:
        table_name = 'cards'