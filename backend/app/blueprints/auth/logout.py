from flask import Blueprint,jsonify, session

logout = Blueprint("logout", __name__)

@logout.route("/logout", methods=["GET"])
def user_logout():
    session.clear()
    return jsonify(result = 'success')