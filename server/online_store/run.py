from flask import Flask

from extensions import api, db


def register_extensions(app):
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
