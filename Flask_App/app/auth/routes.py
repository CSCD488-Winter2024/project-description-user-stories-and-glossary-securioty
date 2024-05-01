"""Contains routes for auth app."""

from flask import Blueprint, jsonify, request
from .. import db
from .models import User
from flask_jwt_extended import create_access_token

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    """Register a new user via POST request."""
    email = request.json.get('email')
    password = request.json.get('password')
    first = request.json.get('first')
    last = request.json.get('last')
    role = request.json.get('role')
    user = User(email=email, first=first, last=last, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@auth.route('/login', methods=['POST'])
def login():
    """Login a user via POST request. Returns token."""
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
