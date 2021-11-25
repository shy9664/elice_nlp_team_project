from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from models.user import User

login = Blueprint("login", __name__)


@login.route("/login", methods=["POST"])
def user_login():
    email = request.json["email"]
    password = request.json["password"]

    login_data = User.query.filter(User.email == email).first()

    if not login_data:
        return jsonify(result="Not Registered Email")

    if not check_password_hash(login_data.password, password):
        return jsonify(result="Email and Password don't match")

    session.clear()
    session["user_email"] = email
    session["nickname"] = login_data.nickname

    return jsonify(login_data.photo, login_data.nickname)
