import re
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User
from app import db

signup = Blueprint("signup", __name__)

email_validation = re.compile("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
password_validation = re.compile(
    "^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%*^&+=]).*$"
)
nickname_validation = re.compile("^[a-zA-Z]+$")


@signup.route("/signup", methods=["POST"])
def user_signup():
    email = request.json["email"]
    password = request.json["password"]
    password_check = request.json["password_check"]
    nickname = request.json["nickname"]

    if email == "" or password == "":
        return jsonify(result="KEY_ERROR")

    if not email_validation.match(email):
        return jsonify(result="EMAIL_VALIDATION_ERROR")

    if not password_validation.match(password) or password != password_check:
        return jsonify(result="PASSWORD_VALIDATION_ERROR")

    if not nickname_validation.match(nickname):
        return jsonify(result="NICKNAME_VALIDATION_ERROR")

    user_info = User.query.filter(User.email == email).first()
    if user_info:
        return jsonify(result="Registered email")

    password = generate_password_hash(password)

    user = User(email=email, password=password, nickname=nickname)

    db.session.add(user)
    db.session.commit()

    return jsonify(result="success", status=200)