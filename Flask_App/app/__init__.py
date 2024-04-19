"""Creates the Flask app with all necessary configurations and blueprints"""
from flask import Flask
from flask_cors import CORS
from .extensions import db, bcrypt, jwt
from ..config import config_dict
from .auth.models import User


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_dict[config_name])

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    if config_name == 'testing':
        with app.app_context():
            db.create_all()
            if User.query.count() == 0:
                dummy_user = User(Email='Test@gmail.com', First='John', Last='Doe', Role='ADMIN')
                dummy_user.set_password('TEST1234')
                db.session.add(dummy_user)
                db.session.commit()

    from .auth.routes import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    CORS(app)
    return app
