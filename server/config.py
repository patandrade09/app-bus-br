from dotenv import load_dotenv
import os
from redis import Redis
load_dotenv()

class Config:
    SECRET_KEY = os.environ["SECRET_KEY"] # type: ignore
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = Redis.from_url("redis://127.0.0.1:6379")
