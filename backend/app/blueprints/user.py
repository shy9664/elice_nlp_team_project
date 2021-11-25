from flask import Blueprint, request, jsonify, session, g
from models.user import User

from datetime import datetime
from hashlib import sha256

from app import db

user = Blueprint('user', __name__)

@user.before_app_request
def load_logged_in_user_info():
    user_id = session.get('login_user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.filter(User.id == user_id).first()

@user.route('/user', methods=['GET'])
def get_user_info():
    user = User.query.filter(User.id == g.user.id).first()
    return jsonify(photo = user.photo, email = user.email, nickname = user.nickname)

@user.route('/user', methods=['PATCH'])
def update_user_info():
    photo = request.form['photo'] if request.form['photo'] else None  # 추후 파일로 받게되면 request.files['photo'], request.files 로 변경
    password = request.form['password']
    user = User.query.filter(User.id == g.user.id).first()
    '''
    파일로 받게될 시 기존 if photo문 지우고, 이걸로 대체. 서버(static/uploads/)에 파일 저장. 
    if photo:
        mixed_photo_filename = photo.filename + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + user.email
        m = sha256()
        m.update(mixed_photo_filename.encode('utf-8'))
        hashed_photo_filename = m.hexdigest()+'.jpg'
        photo_location = 'static/uploads/' + hashed_photo_filename
        photo.save(photo_location)
    '''
    if photo:
        mixed_photo_filename = photo + datetime.now().strftime("%m/%d/%Y, %H:%M:%S") + user.email
        m = sha256()
        m.update(mixed_photo_filename.encode('utf-8'))
        hashed_photo_filename = m.hexdigest()+'.jpg'
        photo_location = 'static/uploads/' + hashed_photo_filename
    user.photo = '../' + photo_location if photo else None
    user.password = password 
    db.session.commit()
    return jsonify(result='success')