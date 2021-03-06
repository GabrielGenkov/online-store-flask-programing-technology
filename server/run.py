from online_store.app import create_app
from online_store.extensions import db

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run()
