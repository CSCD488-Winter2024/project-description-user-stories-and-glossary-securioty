"""Defines the User database."""
from .. import db, bcrypt
from .roles import UserRole


class User(db.Model):
    """Database model for the user. This will eventually need to store progress."""
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(75), unique=True, nullable=False)
    first = db.Column(db.String(20), unique=False, nullable=False)
    last = db.Column(db.String(20), unique=False, nullable=False)
    password_hash = db.Column(db.String(128), unique=False, nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)

    def set_password(self, password):
        """Uses bcrypt to generate a password hash based on the passed in plain text."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Uses bcrypt to verify a password hash based on the passed in plain text."""
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        """String representation of the model."""
        return '<User %r>' % self.email
