from flask import Blueprint, request, jsonify
from models.article import Article

from datetime import datetime

main = Blueprint('main', __name__)

@main.route('/main', methods=['GET'])
def main_info():
    year = datetime.now().strftime("%Y")
    month = int(datetime.now().strftime("%m"))
    month = f'{month:02d}'
    year = request.args.get('year', year)
    month = request.args.get('month', month)
    year_month = f'{year}-{month}'

    author_id = 2  # 임시 
    
    query = Article.query.filter((Article.author_id == author_id) & Article.date.like(f'{year_month}%')).order_by(Article.date.asc())
    year_month_diarys = []
    for diary in query:
        one_diary = {}
        one_diary['date'] = diary.date.strftime('%Y-%m-%d')
        one_diary['text'] = diary.text
        one_diary['emotion'] = diary.emotion
        year_month_diarys.append(one_diary)
    return jsonify(year_month_diarys)