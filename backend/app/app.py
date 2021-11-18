from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

import config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config.from_object(config)
    db.init_app(app)
    migrate.init_app(app, db)
    from models.user import User
    from models.article import Article

    from blueprints.article import my_article

    app.register_blueprint(my_article)

    return app

if __name__ == '__main__':
    create_app().run(debug=True)