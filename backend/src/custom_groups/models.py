from peewee import *
from ..database import pg_db

class BaseModel(Model):
    class Meta:
        database = pg_db

class CustomGroup(BaseModel):
    id = AutoField(column_name="id", primary_key=True)
    name = CharField(column_name="name", default="Нужные траты")

    class Meta:
        table_name = 'custom_groups'