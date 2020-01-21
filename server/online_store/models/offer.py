from online_store.extensions import db


class OfferModel(db.Model):
    __tablename__ = "offer"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(1024), nullable=False)
    price = db.Column(db.Float, nullable=False)
    publication_date = db.Column(
        db.DateTime,
        default=db.func.current_timestamp()
    )
    active = db.Column(db.Boolean, default=True)
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def buy(self, buyer):
        self.active = False
        self.buyer = buyer

        self.save()

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "publication_date": str(self.publication_date),
            "active": self.active,
            "author": self.author.to_json(),
            "buyer": self.buyer.to_json() if self.buyer else None
        }
