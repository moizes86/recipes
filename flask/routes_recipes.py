import os
import json
from classes import Recipes
from flask import Blueprint, request, Response, jsonify
from werkzeug.utils import secure_filename
from classes import Measurings, Diets, Categories


recipes = Blueprint('recipes', __name__, url_prefix='/recipes')


@recipes.route('/')
def get_recipes():
    return Response(Recipes.objects.to_json(), 200)


@recipes.route('/recipe')
def get_recipe():
    try:
        recipeId = request.args.get('recipeId')
        recipe = Recipes.objects(_id=recipeId)[0].to_json()
        return Response(recipe, 200)
    except ConnectionError:
        return Response('Error', 400)


@recipes.route('/diets')
def get_diets():
    try:
        diets = []
        diet_titles = [diet.title for diet in Diets.objects.only('title').select_related()]

        for index, title in enumerate(diet_titles):
            diets.append({'title': title, 'id': index + 1})
        return Response(json.dumps(diets), 200)

    except ConnectionError:
        return jsonify({'message': 'Connection problem; couldn\'t get recipes', 'status': '401'})


@recipes.route('/measuring-units')
def get_measuring_unit():
    try:
        measurings = []
        measuring_units = [measuring.unit for measuring in Measurings.objects.only('unit').select_related()]

        for index, unit in enumerate(measuring_units):
            measurings.append({'unit': unit, 'id': index + 1})
        return Response(json.dumps(measurings), 200)
    except ConnectionError:
        return jsonify({'message': 'Connection problem; couldn\'t get measuring units', 'status': '401'})


@recipes.route('/categories')
def get_categories():
    try:
        categories = []
        categories_titles = [category.title for category in Categories.objects.only('title').select_related()]

        for index, title in enumerate(categories_titles):
            categories.append({'title': title, 'id': index + 1})
        return Response(json.dumps(categories), 200)
    except ConnectionError:
        return jsonify({'message': 'Connection problem; couldn\'t get categories', 'status': '401'})


@recipes.route('/add-recipe', methods=['POST'])
def add_recipe():
    data = request.form.to_dict()
    img = request.files.get('image_url')
    filename = secure_filename(img.filename)
    img.save(os.path.join('public\\images', filename))

    dietsSelected = json.loads(data['dietsSelected'])
    categoriesSelected = json.loads(data['categoriesSelected'])
    data['dietsSelected'] = json.loads(Diets.objects.filter(diet_id__in=dietsSelected).exclude("id").to_json())
    data['categoriesSelected'] = json.loads(
        Categories.objects.filter(category_id__in=categoriesSelected).exclude("id").to_json())
    data['ingredients'] = json.loads(data['ingredients'])
    data['instructions'] = json.loads(data['instructions'])
    data['image_url'] = 'public\\images\\' + filename
    return Response(Recipes(**data).save(), 200)


@recipes.route('/edit-recipe', methods=['PUT'])
def update_recipe():
    update_details = Recipes.before_update_recipe(request.form, request.files)
    recipe_id = str(request.data['_id'])
    print(recipe_id)

    return Response(Recipes.objects(_id=recipe_id).update(**update_details), 200)


@recipes.route('/my-recipes')
def get_my_recipes():
    userId = request.args.get('userId')
    return Response(Recipes.objects(user_id=userId).to_json(), 200)

@recipes.route('/search')
def search_recipe():
    query = request.args.get('q')
    return Response(Recipes.objects.filter(title__icontains=query).to_json(), 200)


@recipes.route('/delete', methods=['DELETE'])
def delete_recipe():
    recipe_id = request.args.get('recipeId')
    recipe = json.loads(Recipes.objects(_id=recipe_id).to_json())[0]
    os.remove(recipe['image_url'])
    return Response(Recipes.objects(_id=recipe_id).delete(), 200)
