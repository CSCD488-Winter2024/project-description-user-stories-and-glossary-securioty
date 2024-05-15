"""
Lab routes.

This module contains routes for managing lab information.
"""
from urllib import request

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from .models import Labs, UserProgress, Question
from .. import db

labs = Blueprint('labs', __name__)


@labs.route('/get_labs', methods=['GET'])
def get_labs():
    """Get a list of all labs.

    Returns:
        JSON: A JSON response containing the list of labs.
    """
    all_labs = Labs.query.all()
    labs_list = []
    for lab in all_labs:
        labs_list.append({
            'id': lab.id,
            'title': lab.title,
            'description': lab.description,
            'questions': [
                {'id': question.id,
                 'title': question.title,
                 'description': question.description} for question in lab.questions
            ]
        })
        return jsonify(labs_list)


@labs.route('/update_progress', methods=['POST'])
@jwt_required()
def update_progress():
    """Update user progress for a specific question in a lab.

    Returns:
        JSON: A JSON response success response, and is_correct boolean.
    """
    user_id = get_jwt_identity()
    lab_id = request.json.get('lab_id')
    question_id = request.json.get('question_id')
    answer = request.json.get('answer')

    question = Question.query.filter_by(id=question_id, lab_id=lab_id).first()
    is_correct = question.answer == answer

    progress = UserProgress.query.filter_by(
        user_id=user_id, lab_id=lab_id, question_id=question_id).all()

    if progress is None:
        progress = UserProgress(
            user_id=user_id, lab_id=lab_id, question_id=question_id, answer=answer, is_correct=is_correct)
        db.session.add(progress)
    else:
        progress.answer = answer
        progress.is_correct = is_correct

    db.session.commit()
    return jsonify(
        {
            'is_correct': is_correct,
            'message': 'Progress updated successfully'
        }
    )

@labs.route('/get_progress_percentage/<int:lab_id>', methods=['GET'])
@jwt_required()
def get_progress_percentage(lab_id):
    """Get the user's progress percentage for a specific lab id and the IDs of completed questions.

    Returns:
        JSON: A JSON response containing the lab progress percentage and completed question IDs.
    """
    user_id = get_jwt_identity()
    total_questions = Question.query.filter_by(lab_id=lab_id).count()

    completed_questions = UserProgress.query.filter_by(user_id=user_id, lab_id=lab_id, is_correct=True).all()
    correct_answers = len(completed_questions)
    completed_question_ids = [progress.question_id for progress in completed_questions]

    progress_percentage = (correct_answers / total_questions) * 100 if total_questions > 0 else 0

    return jsonify({
        'progress_percentage': progress_percentage,
        'completed_question_ids': completed_question_ids
    })


@labs.route('/create_lab', methods=['POST'])
@jwt_required()
def create_lab():
    """Create a new lab and its associated questions.

    Returns:
        JSON: A JSON response with the creation status.
    """
    title = request.json.get('title')
    description = request.json.get('description')
    questions = request.json.get('questions')

    if not title or not description or not questions:
        return jsonify({'errors': 'Missing required fields'}), 400

    if not isinstance(questions, list) or len(questions) == 0:
        return jsonify({'errors': 'Questions must be a non-empty list'}), 400

    new_lab = Labs(title=title, description=description)
    db.session.add(new_lab)
    db.session.flush()

    for q in questions:
        question_title = q.get('title')
        question_description = q.get('description')
        question_answer = q.get('answer')
        if not question_title or not question_description or not question_answer:
            db.session.rollback()
            return jsonify({'errors': 'Missing question fields'}), 400
        new_question = Question(
            title=question_title,
            description=question_description,
            answer=question_answer,
            lab_id=new_lab.id
        )
        db.session.add(new_question)

    db.session.commit()
    return jsonify({'message': 'Lab created successfully', 'id': new_lab.id}), 201
