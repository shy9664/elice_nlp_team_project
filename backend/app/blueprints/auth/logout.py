from flask import Blueprint,jsonify, session

logout = Blueprint("logout", __name__)

@logout.route("/logout", methods=["GET"])
def user_logout():
    print(session)
    session.clear()
    print(session)
    return jsonify(result = 'success')