from flask_restful import Resource, reqparse
from online_store.models.offer import OfferModel
from online_store.models.user import UserModel
from flask_jwt_extended import get_jwt_identity, jwt_required


class OffersResource(Resource):
    offer_parser = reqparse.RequestParser()
    offer_parser.add_argument("id", type=int)
    offer_parser.add_argument("title")
    offer_parser.add_argument("description")
    offer_parser.add_argument("price", type=float)

    options_parser = reqparse.RequestParser()
    options_parser.add_argument("count", location="args", default=0, type=int)
    options_parser.add_argument("page", location="args", default=0, type=int)

    @jwt_required
    def get(self):
        count = self.options_parser.parse_args()["count"]
        page = self.options_parser.parse_args()["page"]

        if count == 0:
            offers = OfferModel.query.all()
        else:
            offers = OfferModel.query.limit(count).offset(count * page).all()

        return [offer.to_json() for offer in offers], 200

    @jwt_required
    def post(self):
        args = self.offer_parser.parse_args()
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

    @jwt_required
    def put(self):
        args = self.offer_parser.parse_args()
        offer = OfferModel.query.get(args["id"])

        if not offer:
            return {
                "error": {
                    "message": "Offer not found"
                }
            }, 404

        user = UserModel.query.get(get_jwt_identity())
        if offer.author != user:
            return {
                "error": {
                    "message": "Not authorized to edit this offer"
                }
            }, 401

        offer.title = args["title"]
        offer.description = args["description"]
        offer.price = args["price"]

        offer.save()

        return None, 200
