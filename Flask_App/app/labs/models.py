"""Defines the labs database model."""
from .. import db


class Labs(db.Model):
    """Database model for the labs table."""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=False)
    questions = db.relationship('Question', backref='lab', lazy=True)


class Question(db.Model):
    """Database model for the questions table."""
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(200), nullable=False)
    lab_id = db.Column(db.Integer, db.ForeignKey('labs.id'), nullable=False)
