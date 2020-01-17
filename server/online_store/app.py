from flask import Flask

from online_store.extensions import api, db
from online_store.resources.users import UsersResource
from online_store.resources.hello_world import HelloWorld


def register_extensions(app):
    api.add_resource(UsersResource, "/users")
    api.add_resource(HelloWorld, "/hello_world")

    api.init_app(app)
    db.init_app(app)


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")
    register_extensions(app)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
