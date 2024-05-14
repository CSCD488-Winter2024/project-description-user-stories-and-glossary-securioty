"""Tests for the lab routes."""
import pytest

from .. import create_app, db
from ..auth.models import User
from ..labs.models import Labs, Question


@pytest.fixture
def client():
    """Creates app in testing mode, and creates a mock db that self-destructs after usage"""
    app = create_app('testing')

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            # Create a test user with admin role
            user = User(email='admin@example.com', first='Admin', last='User', role='ADMIN')
            user.set_password('adminPassword')
            db.session.add(user)
            db.session.commit()
        yield client
        with app.app_context():
            db.session.remove()
            db.drop_all()

def get_access_token(client, email, password):
    """Helper function to get JWT token for a user"""
    response = client.post('/auth/login', json={
        'email': email,
        'password': password
    })
    data = response.get_json()
    return data.get('access_token')

def test_create_lab_success(client):
    """Tests creating a lab with valid data"""
    access_token = get_access_token(client, 'admin@example.com', 'adminPassword')
    response = client.post('/labs/create_lab', json={
        'title': 'New Lab',
        'description': 'This is a description of the new lab.',
        'questions': [
            {
                'title': 'Question 1',
                'description': 'Description of question 1',
                'answer': 'Answer to question 1'
            },
            {
                'title': 'Question 2',
                'description': 'Description of question 2',
                'answer': 'Answer to question 2'
            }
        ]
    }, headers={'Authorization': f'Bearer {access_token}'})

    data = response.get_json()
    assert response.status_code == 201
    assert data['message'] == 'Lab created successfully'
    assert Labs.query.count() == 2  # Including the dummy lab
    assert Question.query.count() == 4  # Including the questions of the dummy lab

def test_create_lab_missing_fields(client):
    """Tests creating a lab with missing required fields"""
    access_token = get_access_token(client, 'admin@example.com', 'adminPassword')
    response = client.post('/labs/create_lab', json={
        'title': 'New Lab'
    }, headers={'Authorization': f'Bearer {access_token}'})

    data = response.get_json()
    assert response.status_code == 400
    assert 'errors' in data

def test_create_lab_invalid_questions_format(client):
    """Tests creating a lab with invalid questions format"""
    access_token = get_access_token(client, 'admin@example.com', 'adminPassword')
    response = client.post('/labs/create_lab', json={
        'title': 'New Lab',
        'description': 'This is a description of the new lab.',
        'questions': 'invalid_format'
    }, headers={'Authorization': f'Bearer {access_token}'})

    data = response.get_json()
    assert response.status_code == 400
    assert 'errors' in data
