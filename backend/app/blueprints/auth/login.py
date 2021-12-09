from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash
from models.user import User

login = Blueprint("login", __name__, url_prefix='/api')


@login.route("/login", methods=["POST"])
def user_login():
    email = request.json["email"]
    password = request.json["password"]
    login_user = User.query.filter(User.email == email).first()

    if not login_user:
        return jsonify(result="Not Registered Email")
    if not check_password_hash(login_user.password, password):
        return jsonify(result="Email and Password don't match")

    session.clear()
    session['login_user_id'] = login_user.id

    return jsonify(photo = login_user.photo, nickname = login_user.nickname)
