from flask import Flask
from classes import *
from flask_cors import CORS
from routes_users import users
from routes_recipes import recipes


app = Flask('__name__', static_url_path='/public/images', static_folder='public/images')
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, supports_credentials=True)
connect(db='recipes',
        host='mongodb+srv://moshe:wecode123@cluster0.0rtpg.mongodb.net/recipes?retryWrites=true&w=majority')

app.register_blueprint(users)
app.register_blueprint(recipes)


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(host="0.0.0.0", debug=True, port=5000)
