from peewee import *
from ..database import pg_db

class BaseModel(Model):
    class Meta:
        database = pg_db

class FamilyGroup(BaseModel):
    id = AutoField(primary_key=True)
    name = CharField(max_length=255)

    class Meta:
        table_name = 'family_groups'
