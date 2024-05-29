"""
Authentication routes.

This module contains routes for user authentication, including login and registration.
"""

from flask import Blueprint, jsonify, request
from Flask_App.app.extensions import db
from Flask_App.app.auth.models import User
from flask_jwt_extended import create_access_token

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    """User registration route.

    Returns:
        JSON: User registration response.
    """
    email = request.json.get('email')
    password = request.json.get('password')
    first = request.json.get('first')
    last = request.json.get('last')
    role = request.json.get('role')

    if not email or not password or not first or not last or not role:
        return jsonify({'errors': 'Missing parameters'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'errors': 'Email already registered'}), 400

    user = User(email=email, first=first, last=last, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@auth.route('/login', methods=['POST'])
def login():
    """User login route.

    Returns:
        JSON object with access token, or error message.
    """
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.user_id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
