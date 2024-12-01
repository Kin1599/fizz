from peewee import *
from ..database import pg_db

class BaseModel(Model):
    class Meta:
        database = pg_db

class User(BaseModel):
    id = AutoField(column_name="id", primary_key=True, default=1)
    email = CharField(column_name="email", max_length=255)
    hashed_password = CharField(column_name="hashed_password", max_length=255)
    name = CharField(column_name="name", max_length=255)
    birthday = DateField(column_name="birthday")

    class Meta:
        table_name = 'users'