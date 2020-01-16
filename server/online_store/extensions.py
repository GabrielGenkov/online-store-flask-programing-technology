from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from resources.hello_world import HelloWorldResource

api = Api()
db = SQLAlchemy()

api.add_resource(HelloWorldResource, '/hello_world')
