from flask_restful import Resource, reqparse
from online_store.models.user import UserModel


class UsersResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username")
    parser.add_argument("email")

    def post(self):
        request = self.parser.parse_args()
        user = UserModel(username=request.get("username"), email=request.get("email"))

        user.save()

        return {}, 200

    def get(self):
        users = UserModel.query.all()

        return [user.to_json() for user in users], 200
