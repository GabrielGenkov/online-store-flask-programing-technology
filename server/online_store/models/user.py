from online_store.extensions import db
from passlib.hash import sha256_crypt as sha256


class UserModel(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True, nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def save(self):
        db.session.add(self)
        db.session.commit()

    def to_json(self):
        return {
            "username": self.username,
            "email": self.email
        }

    @staticmethod
    def hash_password(password):
        return sha256.encrypt(password)

    def check_password(self, password):
        return sha256.verify(password, self.password_hash)
