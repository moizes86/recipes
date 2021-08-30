import json
from classes import Users
from flask import Blueprint, request, Response, jsonify, abort
from validations import validations
import mongoengine.errors


users = Blueprint('users', __name__, url_prefix='/users')


@users.route('/login', methods=['POST'])
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
        return response


@users.route('/signup', methods=['POST'])
def signup():
    data = json.loads(request.data)
    try:
        result = Users(email=data['email'], username=data['username'], password=data['password']).save()
        return Response(result.to_json(), 200)

    except mongoengine.errors.NotUniqueError:
        return Response('Email already exist', 400)


@users.route('/update-details', methods=['PUT'])
def update_details():
    data = json.loads(request.data)
    Users.objects(_id=data['id']).update(username=data['username'], password=data['password'])
    return Response('Details updated', 200)
