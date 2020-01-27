from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)

from sqlalchemy.exc import IntegrityError

from online_store.models.user import UserModel

from online_store.models.offer import OfferModel


class UsersResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username")
    parser.add_argument("email")
    parser.add_argument("password")

    def post(self):
        request = self.parser.parse_args()
        user = UserModel.query.filter_by(email=request.get("email")).first()

        if not user:
            return {
                "error": {
                    "message": "User not found!"
                }
            }, 404

        if not user.check_password(request.get("password")):
            return {
                "error": {
                    "message": "Incorrect password!"
                }
            }, 401

        return {
            "access_token": create_access_token(identity=user.id),
            "refresh_token": create_refresh_token(identity=user.id)
        }, 200

    def get(self):
        users = UserModel.query.all()
        return [user.to_json() for user in users], 200

    def put(self):
        request = self.parser.parse_args()
        user = UserModel(
            username=request.get("username"),
            email=request.get("email"),
            password_hash=UserModel.hash_password(request.get("password"))
        )

        try:
            user.save()
        except IntegrityError:
            return {
                "error": {
                    "message": "Username or email already in use!"
                }
            }, 400

        return None, 200


class UserBoughtItemsResource(Resource):
    @jwt_required
    def get(self):
        offers = OfferModel.query.filter_by(buyer_id=get_jwt_identity()).all()
        return [offer.to_json() for offer in offers], 200


class UserItemsResource(Resource):
    @jwt_required
    def get(self):
        offers = OfferModel.query.filter_by(author_id=get_jwt_identity()).all()
        return [offer.to_json() for offer in offers], 200
