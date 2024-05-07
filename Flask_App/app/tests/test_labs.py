"""Labs logic unit testing."""
import pytest

from .. import create_app, db
from ..labs.models import Labs, Question


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


def test_get_lab_success(client):
    """Tests GET request to /labs/get_labs"""
    response = client.get('/labs/get_labs')
    data = response.get_json()[0] # Returns list of labs. For testing only one is created.
    assert response.status_code == 200
    assert data['id'] == 1
    assert data['title'] == 'Test Lab'
    assert len(data['questions']) == 2
    assert data['questions'][0]['id'] == 1 and data['questions'][1]['id'] == 2
    assert data['questions'][0]['question'] == 'Who is the best dog in the world?'
    assert data['questions'][0]['answer'] == 'Maggie'
    assert data['questions'][1]['question'] == 'Is Python fun?'
    assert data['questions'][1]['answer'] == 'Sometimes'
