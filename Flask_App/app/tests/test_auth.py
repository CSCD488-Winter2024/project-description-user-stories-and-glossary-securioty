"""Auth logic unit testing."""
import pytest

from .. import create_app, db
from ..auth.models import User


@pytest.fixture
def client():
    """Creates app in testing mode, and creates a mock db that self-destructs after usage"""
    app = create_app('testing')

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.session.remove()
            db.drop_all()


def test_registration_success(client):
    """Using mocked database in memory, tests valid responses from registration"""
    response = client.post('/auth/register', json={
        'email': 'test@example.com',
        'password': 'testPassword',
        'first': 'testFirst',
        'last': 'testLast',
        'role': 'Student'
    })
    data = response.get_json()
    assert response.status_code == 201
    assert data['message'] == 'User registered successfully'
    assert User.query.count() == 1


def test_login_success(client):
    """Using mocked database in memory, tests valid response from login"""
    client.post('/auth/register', json={
        'email': 'test@example.com',
        'password': 'testPassword',
        'first': 'testFirst',
        'last': 'testLast',
        'role': 'STUDENT'
    })

    login_response = client.post('auth/login', json={
        'email': 'test@example.com',
        'password': 'testPassword'
    })

    login_data = login_response.get_json()
    assert login_response.status_code == 200
    assert 'access_token' in login_data


def test_login_failure(client):
    """Using mocked database in memory, tests invalid response from login"""
    client.post('/auth/register', json={
        'email': 'test@example.com',
        'password': 'testPassword',
        'first': 'testFirst',
        'last': 'testLast',
        'role': 'STUDENT'
    })

    login_response = client.post('auth/login', json={
        'email': 'test@example.com',
        'password': 'INCORRECT'
    })

    login_data = login_response.get_json()
    assert login_response.status_code == 401
    assert login_data['message'] == 'Invalid email or password'

    login_response = client.post('auth/login', json={
        'email': 'INVALID_USER',
        'password': 'FAKE_PASSWORD'
    })

    login_data = login_response.get_json()
    assert login_response.status_code == 401
    assert login_data['message'] == 'Invalid email or password'
