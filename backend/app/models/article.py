from sqlalchemy.orm import relationship
from app import db


class Article(db.Model):
    __tablename__ = "Article"
    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    author_id = db.Column(db.Integer, db.ForeignKey('User.id', ondelete='CASCADE'))
=======
    author_id = db.Column(
        db.Integer, db.ForeignKey("User.id", ondelete="CASCADE"), nullable=False
    )
>>>>>>> dev
    author = db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    emotion = db.Column(db.String(255), nullable=False)
    is_sharable = db.Column(db.Boolean(), nullable=False)
    is_shared = db.Column(db.Boolean(), nullable=False)

<<<<<<< HEAD

    def __init__(self, author, text, date, emotion, is_sharable, is_shared):
=======
    def __init__(self, author, author_id, text, date, emotion, is_sharable, is_shared):
>>>>>>> dev
        self.author = author
        self.text = text
        self.date = date
        self.emotion = emotion
        self.is_sharable = is_sharable
        self.is_shared = is_shared

    user = relationship("User")
