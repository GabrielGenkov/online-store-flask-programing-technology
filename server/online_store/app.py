from flask import Flask
from flask_cors import CORS

from online_store.extensions import api, db, jwt
from online_store.resources.users import (
    UsersResource,
    UserBoughtItemsResource,
    UserItemsResource
)
from online_store.resources.offers import (
    OffersResource,
    OfferResource,
    BuyOfferResource
)


def register_extensions(app):
    api.add_resource(UsersResource, "/users")
    api.add_resource(UserBoughtItemsResource, "/bought_items")
    api.add_resource(UserItemsResource, "/items")
    api.add_resource(OffersResource, "/offers")
    api.add_resource(OfferResource, "/offers/<int:id>")
    api.add_resource(BuyOfferResource, "/offers/<int:id>/buy")

    api.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")
    register_extensions(app)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
