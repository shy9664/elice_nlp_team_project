from flask import Blueprint, request, jsonify
from models.user import User

from datetime import datetime
from hashlib import sha256

from app import db

user = Blueprint('user', __name__)

@user.route('/user', methods=['GET', 'PATCH'])
def user_info():
    '''
    로그인 구현 시, 세션이나 access_token에 저장된 것으로 
    로그인한 유저를 특정할 수 있는 값으로 로그인 유저에 대한 정보 가져오도록 변경 
    '''
    if request.method == 'GET':
        email = 'test'  # 임시. 로그인한 유저.
        user = User.query.filter(User.email == email).first()
        return jsonify(photo = user.photo, email = user.email, nickname = user.nickname)

    else:
        photo = request.form['photo'] if request.form['photo'] else None  # 추후 파일로 받게되면 request.files['photo'], request.files 로 변경
        password = request.form['password']
        email = 'test'  # 임시. 로그인한 유저.
        user = User.query.filter(User.email == email).first()
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
