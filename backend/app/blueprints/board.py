from flask import Blueprint, json, request, jsonify
from models.sympathy import Sympathy

from app import db

board = Blueprint('board', __name__, url_prefix='/board')

@board.route('/article/<int:article_id>/<sympathize>', methods=['DELETE'])
def delete_sympathy(article_id, sympathize):
    
    if sympathize: 
        user_id = 2  # 로그인한 유저 식별번호. 임시.

        sympathy_on_diary = Sympathy.query.filter((Sympathy.article_id == article_id) & (Sympathy.user_id == user_id)).first()
        db.session.delete(sympathy_on_diary)
        db.session.commit()
        return jsonify(result='success')