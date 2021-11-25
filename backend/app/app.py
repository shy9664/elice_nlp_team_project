from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

import config
from env import secret_key

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.secret_key = secret_key

    app.config.from_object(config)
    db.init_app(app)
    migrate.init_app(app, db)
    from models.user import User
    from models.article import Article
    from models.sympathy import Sympathy

    from blueprints.article import my_article
    from blueprints.user import user
    from blueprints.main import main
    from blueprints.board import board
    from blueprints.auth.signup import signup
    from blueprints.auth.login import login
    from blueprints.auth.logout import logout

    app.register_blueprint(my_article)
    app.register_blueprint(user)
    app.register_blueprint(main)
    app.register_blueprint(board)
    app.register_blueprint(signup)
    app.register_blueprint(login)
    app.register_blueprint(logout)

    return app


if __name__ == "__main__":
    create_app().run(debug=True)
