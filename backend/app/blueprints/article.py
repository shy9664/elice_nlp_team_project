from flask import Blueprint, request, jsonify
from models.article import Article

from app import db

my_article = Blueprint('my_article', __name__, url_prefix='/article')

@my_article.route('/<date>', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def article(date):

    '''
    1) 추후에 jwt로 로그인 구현 시, @jwt_required를 걸고, access_token을 decode해서
    id등 특정 유저를 식별할 수 있는 것으로 가져와서
    쿼리를 다음과 같은 방식으로 로그인된 특정 유저의 해당 날짜 일기만 데이터로 가져오도록 수정.
    ex) GET, PATCH, DELETE
    diary = Article.query.filter((Article.date == date ) & (Article.author_id == id)).first()
    2) POST는 AI모델이 완성되면 일기 분석 관련 로직 추가해주고 DB에 저장. 
    author 정보도 jwt에서 가져옴.
    ex)
    new_diary = Article(author, text, date, emotion, is_sharable, is_shared)
    '''

    if request.method == 'GET':
        diary = Article.query.filter(Article.date == date).first()
        return jsonify(date=diary.date.strftime('%Y-%m-%d'), text=diary.text, emotion=diary.emotion, is_shared=diary.is_shared, is_sharable=diary.is_sharable)
    
    elif request.method == 'POST':
        text = request.json['text']
        if request.json['date']:  
            if date != request.json['date']:  # 작성하는 곳에서 날짜 변경 시 변경된 날짜로. URL 상관없이.
                date = request.json['date']
        
        # 분석했다 치고 임시로.
        emotion = 'joy'
        is_sharable = False 
        
        author = 'test' # 테스트를 위해 임시로. 
        
        is_shared = False  # 처음 작성 시 default는 비공개
        new_diary = Article(author, text, date, emotion, is_sharable, is_shared)
        db.session.add(new_diary)
        db.session.commit()
        return jsonify(result='success')

    elif request.method == 'PATCH':
        text = request.json['text']
        diary = Article.query.filter(Article.date == date).first()
        diary.text = text
        db.session.commit()
        return jsonify(result='success')

    else:
        diary = Article.query.filter(Article.date == date).first()
        db.session.delete(diary)
        db.session.commit()
        return jsonify(result='success')

@my_article.route('/<date>/<string:emotion>', methods=['PATCH'])
def change_emotion(date, emotion):
    diary = Article.query.filter(Article.date == date).first()
    diary.emotion = emotion
    db.session.commit()
    return jsonify(result='success')

@my_article.route('/<date>/<int:share>', methods=['PATCH'])
def change_share_status(date, share):
    diary = Article.query.filter(Article.date == date).first()
    print(share)
    print(diary.is_shared)
    diary.is_shared = share
    db.session.commit()
    return jsonify(result='success')

@my_article.route('/my-list')
def get_my_diarys():
    emotion = request.args.get('emotion', 'all')
    if emotion == 'all':
        emotion = ['joy', 'anger',]  # 추후 감정 추가되는대로 다 집어넣기
    else:
        emotion = [emotion]
    share_status = request.args.get('share', 0, type=int)
    share_status = [share_status] if share_status else [0, 1]
    sort = request.args.get('sort', 0, type=int)
    sort = Article.date.asc() if sort else Article.date.desc()
    
    # 임시 
    id = None

    query = Article.query.filter((Article.author_id == id) & (Article.emotion.in_(emotion)) & (Article.is_shared.in_(share_status))).order_by(sort)
    my_diarys = []
    for diary in query:
        one_diary = {}
        one_diary['date'] = diary.date.strftime('%Y-%m-%d')
        one_diary['text'] = diary.text
        one_diary['emotion'] = diary.emotion
        one_diary['is_shared'] = diary.is_shared
        my_diarys.append(one_diary)
    return jsonify(my_diarys)