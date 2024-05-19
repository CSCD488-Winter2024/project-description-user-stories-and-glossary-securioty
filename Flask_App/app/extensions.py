"""
Initialize Flask extensions.

This module initializes and configures Flask extensions used in the application.
These are placed neatly in this file to allow Flask extensions to be imported in directly.
"""
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()
