from mongoengine import *
from datetime import date

today = date.today()


class Recipes(Document):
    _id = ObjectIdField()
    user_id = StringField()
    title = StringField()
    description = StringField()
    views = IntField()
    created = StringField()
    source = StringField()
    source_url = StringField()
    servings = IntField()
    cook = IntField()
    image = ImageField()
    image_url = StringField()
    dietsSelected = ListField()
    categoriesSelected = ListField()
    ingredients = ListField()
    instructions = ListField()
    upload_date = DateTimeField(default=today.strftime("%d/%m/%Y"))


class Users(Document):
    username = StringField()
    password = StringField()
    email = StringField()


class Diets(Document):
    title = StringField()
    diet_id = IntField()


class Measurings(Document):
    unit = StringField()


class Categories(Document):
    title = StringField()
    category_id = IntField()
