from mongoengine import *
from datetime import date
import json
from werkzeug.utils import secure_filename
import os

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


    @staticmethod
    def before_add_recipe(data, files):
        data = data.to_dict()
        img = files.get('image_url')
        filename = secure_filename(img.filename)
        img.save(os.path.join('public\\images', filename))

        diets_ids = map(lambda diet: diet['id'], json.loads(data['dietsSelected']))
        categories_ids = map(lambda category:category['id'], json.loads(data['categoriesSelected']))

        data['dietsSelected'] = json.loads(Diets.objects.filter(diet_id__in=diets_ids).exclude("id").to_json())
        data['categoriesSelected'] = json.loads(
            Categories.objects.filter(category_id__in=categories_ids).exclude("id").to_json())
        data['ingredients'] = json.loads(data['ingredients'])
        data['instructions'] = json.loads(data['instructions'])
        data['image_url'] = 'public\\images\\' + filename

        return data


    @staticmethod
    def before_update_recipe(data, files):
        updated_recipe = data.to_dict()
        updated_recipe.pop('upload_date')
        updated_recipe.pop('_id')
        updated_recipe['servings'] = json.loads(updated_recipe['servings'])
        updated_recipe['cook'] = json.loads(updated_recipe['cook'])
        updated_recipe['dietsSelected'] = json.loads(updated_recipe['dietsSelected'])
        updated_recipe['categoriesSelected'] = json.loads(updated_recipe['categoriesSelected'])
        updated_recipe['ingredients'] = json.loads(updated_recipe['ingredients'])
        updated_recipe['instructions'] = json.loads(updated_recipe['instructions'])

        if files:
            img = files.get('image_url')
            filename = secure_filename(img.filename)
            img.save(os.path.join('public\\images', filename))
            updated_recipe['image_url'] = 'public\\images\\' + filename

        return updated_recipe


class Users(Document):
    _id = ObjectIdField()
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
