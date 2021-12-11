from datetime import datetime
from flask import Blueprint, json, jsonify, request
from models.article import Article
from models.sympathy import Sympathy

from app import db

open_board = Blueprint("open_board", __name__, url_prefix="/api/board")


@open_board.route("")
def open_bulletin_board():
    # dates = request.json["date"]
    # dates = dates if dates else int(datetime.now().strftime("%Y-%m-%d"))

    diary_and_sympathy_infos = []

    test_dates = [
        "2021-11-19",
        "2021-11-20",
        "2021-11-21",
        "2021-11-22",
        "2021-11-23",
    ]  # 임시
    dates = []
    for date in test_dates:
        dates.append(datetime.strptime(date, "%Y-%m-%d"))

    for date in dates:
        diaries = Article.query.filter(Article.date == date).all()

        for diary in diaries:
            open_diary = {}
            open_diary["article_id"] = diary.id
            open_diary["date"] = diary.date.strftime("%Y-%m-%d")
            open_diary["sympathy_count"] = len(
                Sympathy.query.filter(Sympathy.article_id == diary.id).all()
            )
            open_diary["text"] = diary.text
            open_diary["emotion"] = diary.emotion
            sympathy_count = len(
                Sympathy.query.filter(Sympathy.article_id == diary.id).all()
            )
            diary_date_to_int = int(open_diary["date"].replace("-", ""))
            diary_and_sympathy_infos.append(
                (open_diary, sympathy_count, diary_date_to_int)
            )

    sympathy_sort = request.args.get("sympathy_sort", 0, type=int)
    sorted_diary = []
    if sympathy_sort:  # 공감 많은 순
        sort = lambda x: (-x[1], -x[2])
    else:  # 최신 순
        sort = lambda x: (-x[2], -x[1])
    sorted_many_sympathies = sorted(diary_and_sympathy_infos, key=sort)
    for sorted_many_sympathy in sorted_many_sympathies:
        sorted_diary.append(sorted_many_sympathy[0])

    db.session.close()
    return jsonify(sorted_diary)


@open_board.route("/article/<int:id>")
def someone_diary(id):
    diary = Article.query.filter(Article.id == id).first()
    user = diary.user
    sympathy_count = len(Sympathy.query.filter(Sympathy.article_id == id).all())
    db.session.close()
    return jsonify(
        date=diary.date.strftime("%Y-%m-%d"),
        emotion=diary.emotion,
        sympathy=sympathy_count,
        text=diary.text,
        photo=user.photo,
        nickname=user.nickname,
    )
