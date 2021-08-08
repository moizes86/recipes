import mongoengine.errors
from flask import Flask, request, abort, Response, jsonify
from werkzeug.utils import secure_filename
import json
from validations import validations
from classes import *
import os
from flask_cors import CORS, cross_origin

app = Flask('__name__', static_url_path='/public/images', static_folder='public/images')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

connect(db='recipes',
        host='mongodb+srv://moshe:wecode123@cluster0.0rtpg.mongodb.net/recipes?retryWrites=true&w=majority')


@app.route('/recipes')
def get_recipes():
    return Response(Recipes.objects.to_json(), 200)


@app.route('/recipes/recipe')
def get_recipe():
    try:
        recipeId = request.args.get('recipeId')
        recipe = Recipes.objects(_id=recipeId)[0].to_json()
        return Response(recipe, 200)
    except ConnectionError:
        return Response('Error', 400)


@app.route('/recipes/diets')
def get_diets():
    try:
        diets = []
        diet_titles = [diet.title for diet in Diets.objects.only('title').select_related()]

        for index, title in enumerate(diet_titles):
            diets.append({'title': title, 'id': index + 1})
        return Response(json.dumps(diets), 200)

    except ConnectionError:
        return jsonify({'message': 'Connection problem; couldn\'t get recipes', 'status': '401'})


@app.route('/recipes/measuring-units')
def get_measuring_unit():
    try:
        measurings = []
        measuring_units = [measuring.unit for measuring in Measurings.objects.only('unit').select_related()]

        for index, unit in enumerate(measuring_units):
            measurings.append({'unit': unit, 'id': index + 1})
        return Response(json.dumps(measurings), 200)
    except ConnectionError:
        return jsonify({'message': 'Connection problem; couldn\'t get measuring units', 'status': '401'})


@app.route('/recipes/categories')
def get_categories():
    try:
        categories = []
        categories_titles = [category.title for category in Categories.objects.only('title').select_related()]

        for index, title in enumerate(categories_titles):
            categories.append({'title': title, 'id': index + 1})
        return Response(json.dumps(categories), 200)
    except ConnectionError:
        return jsonify({'message': 'Connection problem; couldn\'t get categories', 'status': '401'})


@app.route('/recipes/add-recipe', methods=['POST'])
@cross_origin()
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


@app.route('/recipes/edit-recipe', methods=['PUT'])
def update_recipe():
    updated_recipe = request.form.to_dict()
    recipe_id = json.loads(updated_recipe['_id'])['$oid']
    updated_recipe.pop('upload_date')
    updated_recipe.pop('_id')
    updated_recipe['servings'] = json.loads(updated_recipe['servings'])
    updated_recipe['cook'] = json.loads(updated_recipe['cook'])
    updated_recipe['dietsSelected'] = json.loads(updated_recipe['dietsSelected'])
    updated_recipe['categoriesSelected'] = json.loads(updated_recipe['categoriesSelected'])
    updated_recipe['ingredients'] = json.loads(updated_recipe['ingredients'])
    updated_recipe['instructions'] = json.loads(updated_recipe['instructions'])
    img = request.files.get('image_url')
    filename = secure_filename(img.filename)
    img.save(os.path.join('public\\images', filename))
    updated_recipe['image_url'] = 'public\\images\\' + filename

    return Response(Recipes.objects(_id=recipe_id).update(**updated_recipe), 200)


@app.route('/recipes/my-recipes')
def get_my_recipes():
    userId = request.args.get('userId')

    return Response(Recipes.objects(user_id=userId).to_json(), 200)


@app.route('/users/login', methods=['POST'])
@cross_origin()
def login():
    data = json.loads(request.data)
    email = data['email']
    password = data['password']

    valid_email = validations['email'](email)
    if not valid_email:
        abort(400, valid_email)
    valid_password = validations['password'](password)
    if valid_password is not True:
        abort(400, valid_password)

    try:
        user = Users.objects.get(email=email)
    except mongoengine.errors.DoesNotExist:
        return jsonify({'message': 'User does not exist', 'status': '401'})

    if user.password != password:
        return jsonify({'message': 'Password don\'t match', 'status': '401'})
    else:
        user = user.to_json()
        response = Response(user, 200)
        response.set_cookie('user', user)
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response


@app.route('/users/login-with-cookie')
@cross_origin()
def is_coockie():
    mycookie = request.cookies.get('user')
    return 'yay'


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
