"""Contains routes for the labs app."""

from flask import Blueprint, jsonify
from .models import Labs

labs = Blueprint('labs', __name__)


@labs.route('/get_labs', methods=['GET'])
def get_labs():
    """Get all lab data from the database."""
    all_labs = Labs.query.all()
    labs_list = []
    for lab in all_labs:
        labs_list.append({
            'id': lab.id,
            'title': lab.title,
            'description': lab.description,
            'questions': [
                {'id': question.id,
                 'question': question.question,
                 'answer': question.answer} for question in lab.questions
            ]
        })
        return jsonify(labs_list)
