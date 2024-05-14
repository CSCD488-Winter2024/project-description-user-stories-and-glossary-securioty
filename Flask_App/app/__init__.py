"""
Application factory for the Flask application.

This module contains the application factory function that initializes the Flask
application with the necessary configurations, extensions, and blueprints.
"""
from flask import Flask
from flask_cors import CORS
from .extensions import db, bcrypt, jwt, migrate
from ..config import config_dict
from .auth.models import User
from .labs.models import Labs, Question


def create_app(config_name):
    """Create and configure an instance of the Flask application.

    Returns:
        Flask: The Flask application instance.
    """
    app = Flask(__name__)
    app.config.from_object(config_dict[config_name])

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    if config_name == 'testing':
        with app.app_context():
            db.create_all()
            if User.query.count() == 0:
                dummy_user = User(email='Test@gmail.com', first='John', last='Doe', role='ADMIN')
                dummy_user.set_password('TEST1234')
                db.session.add(dummy_user)
                db.session.commit()
            if Labs.query.count() == 0:
                dummy_lab = Labs(id=1, title='Test Lab', description='Test Lab Description')
                db.session.add(dummy_lab)
                db.session.commit()

                questions = [
                    Question(
                        id=1,
                        title='Who is the best dog in the world?',
                        description='This question, obviously asks who the best dog in the world is.',
                        answer='Maggie',
                        lab_id=dummy_lab.id
                    ),
                    Question(
                        id=2,
                        title='Is Python fun?',
                        description='This question asks if programming is fun.',
                        answer='Sometimes',
                        lab_id=dummy_lab.id
                    )
                ]

                db.session.add_all(questions)
                db.session.commit()

    from .auth.routes import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .labs.routes import labs as labs_blueprint
    app.register_blueprint(labs_blueprint, url_prefix='/labs')

    CORS(app)
    return app
