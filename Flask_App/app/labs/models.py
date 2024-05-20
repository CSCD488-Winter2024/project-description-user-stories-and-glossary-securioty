"""Defines the labs database model."""
from .. import db
from ..auth.models import User


class Labs(db.Model):
    """Database model for the labs table."""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=False)
    questions = db.relationship('Question', backref='lab', lazy=True)


class Question(db.Model):
    """Database model for the questions table."""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    answer = db.Column(db.String(200), nullable=False)
    lab_id = db.Column(db.Integer, db.ForeignKey('labs.id'), nullable=False)


class UserProgress(db.Model):
    """Database model to keep track of user progress"""
    progress_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.user_id), nullable=False)
    lab_id = db.Column(db.Integer, db.ForeignKey(Labs.id), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(Question.id), nullable=False)
    answer = db.Column(db.String(200), nullable=False)
    is_correct = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    user = db.relationship('User', backref='progress', lazy=True)
    lab = db.relationship('Labs', backref='progress', lazy=True)
    question = db.relationship('Question', backref='progress', lazy=True)
