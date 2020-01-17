from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token

from online_store.models.user import UserModel


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

        user.save()

        return None, 200
