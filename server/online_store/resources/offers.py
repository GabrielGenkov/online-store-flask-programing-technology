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
    options_parser.add_argument("search",
                                location="args",
                                default="",
                                type=str)

    delete_parser = reqparse.RequestParser()
    delete_parser.add_argument("id", type=int)

    def get(self):
        count = self.options_parser.parse_args()["count"]
        page = self.options_parser.parse_args()["page"] - 1
        search = self.options_parser.parse_args()["search"]

        offers = OfferModel.query.filter(OfferModel.title.contains(search)) \
            .filter_by(active=True)

        all_offer_count = offers.count()

        if count == 0:
            page_count = 1
            offers = offers.all()
        else:
            page_count = (all_offer_count // count) + \
                (1 if all_offer_count % count != 0 else 0)
            offers = offers.limit(count).offset(count * page).all()

        return {
            "page_count": page_count,
            "offers": [offer.to_json() for offer in offers]
        }, 200

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
            }, 403

        offer.title = args["title"]
        offer.description = args["description"]
        offer.price = args["price"]

        offer.save()

        return None, 200

    @jwt_required
    def delete(self):
        offer_id = self.delete_parser.parse_args()["id"]
        offer = OfferModel.query.get(offer_id)

        user = UserModel.query.get(get_jwt_identity())

        if offer.author != user:
            return {
                "error": {
                    "message": "Not authorized to edit this offer"
                }
            }, 403

        offer.delete()

        return None, 200


class OfferResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title")
    parser.add_argument("description")
    parser.add_argument("price", type=float)

    @jwt_required
    def get(self, id):
        return OfferModel.query.get(id).to_json()

    @jwt_required
    def put(self, id):
        args = self.parser.parse_args()
        offer = OfferModel.query.get(id)

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
            }, 403

        offer.title = args["title"]
        offer.description = args["description"]
        offer.price = args["price"]

        offer.save()

        return None, 200

    @jwt_required
    def delete(self, id):
        offer = OfferModel.query.get(id)

        user = UserModel.query.get(get_jwt_identity())

        if offer.author != user:
            return {
                "error": {
                    "message": "Not authorized to edit this offer"
                }
            }, 403

        offer.delete()


class BuyOfferResource(Resource):
    @jwt_required
    def post(self, id):
        offer = OfferModel.query.get(id)
        current_user = UserModel.query.get(get_jwt_identity())

        if offer.author == current_user:
            return {
                "error": {
                    "message": "Cannot buy your own product"
                }
            }, 400

        offer.buy(current_user)

        return None, 200
