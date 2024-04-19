"""Defines the User database."""
from .. import db, bcrypt
from .roles import UserRole


class User(db.Model):
    User_Id = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(75), unique=True, nullable=False)
    First = db.Column(db.String(20), unique=False, nullable=False)
    Last = db.Column(db.String(20), unique=False, nullable=False)
    Password_Hash = db.Column(db.String(20), unique=False, nullable=False)
    Role = db.Column(db.Enum(UserRole), nullable=False)

    def set_password(self, password):
        self.Password_Hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.Password_Hash, password)
