from flask import Flask, jsonify, request, session
from flask_session import Session
from config import Config
from models import db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS
app = Flask(__name__)
server_session = Session()
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/register", methods=["POST"])  # type: ignore
def register_user():
    email = request.json["email"]  # type: ignore
    password = request.json["password"]  # type: ignore
    username = request.json["username"] #type: ignore

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({
            "error":"User already exists"
        }),409

    hashed_password = bcrypt.generate_password_hash(password=password)
    enconded_hashed_password = hashed_password.decode("utf-8")
    
    new_user = User(email=email, password=enconded_hashed_password, username=username)

    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id":new_user.id,
        "email":new_user.email,
        "username":new_user.username,
        "message":f"{new_user.username} registered successfully! ✨"
    })


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            {"error":"Unauthorized"}
        }),401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id":user.id,
        "email":user.email,
        "username":user.username,
        "message":f"{user.username} enjoy your environment! 🌟"
    })


@app.route("/login", methods=["POST"])  # type: ignore
def login_user():
    email = request.json["email"]  # type: ignore
    password = request.json["password"]  # type: ignore
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({
            "error":"Unauthorized"
        }),401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "error":"Unauthorized"
        }),401
    
    session["user_id"] = user.id
    


    return jsonify({
        "id":user.id,
        "email":user.email,
        "message":f" You have successfully logged in 💙"
    })

@app.route("/logout", methods=["POST"])  # type: ignore
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)

