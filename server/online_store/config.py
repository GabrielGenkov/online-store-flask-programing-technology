from datetime import timedelta

DEBUG = True
TESTING = False
DEVELOPMENT = True
SQLALCHEMY_DATABASE_URI = "sqlite:///sample_db.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = "oZhVaTC4jWtijbcNs2OF6M96SxCfQ0uc"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=10)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=1)
