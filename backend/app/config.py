import os

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://root:{os.getenv('password')}@localhost/nlp_team_project"
)
SQLALCHEMY_TRACK_MODIFICATIONS = False
