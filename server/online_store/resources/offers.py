from flask_restful import Resource, reqparse
from online_store.models.offer import OfferModel
from online_store.models.user import UserModel
from flask_jwt_extended import get_jwt_identity, jwt_required


class OffersResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title")
    parser.add_argument("description")
    parser.add_argument("price", type=float)
    parser.add_argument("count", location="args", default=0, type=int)
    parser.add_argument("page", location="args", default=0, type=int)

    @jwt_required
    def get(self):
        count = self.parser.parse_args()["count"]
        page = self.parser.parse_args()["page"]

        if count == 0:
            offers = OfferModel.query.all()
        else:
            offers = OfferModel.query.limit(count).offset(count * page).all()

        return [offer.to_json() for offer in offers], 200

    @jwt_required
    def post(self):
        args = self.parser.parse_args()
        title = args["title"]
        description = args["description"]
        price = args["price"]
        author_id = get_jwt_identity()

        OfferModel(
            title=title,
            description=description,
            price=price,
            author=UserModel.query.get(author_id)
        ).save()

        return None, 200
