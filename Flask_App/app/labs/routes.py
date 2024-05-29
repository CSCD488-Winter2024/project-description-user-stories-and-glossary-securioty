"""
Lab routes.

This module contains routes for managing lab information.
"""
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from Flask_App.app.extensions import db
from Flask_App.app.labs.models import Labs, UserProgress, Question
from Flask_App.app.auth.models import User

labs = Blueprint('labs', __name__)


def fetch_all_labs():
    """Fetch all labs and format them for JSON response.

    Returns:
        list: A list of labs formatted for JSON response.
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
    return labs_list


def create_new_questions(questions, lab_id):
    """Create new questions for a lab.

    Args:
        questions (list): A list of questions.
        lab_id (int): The ID of the lab to associate the questions with.

    Returns:
        bool: True if all questions are created successfully, False otherwise.
    """
    if not isinstance(questions, list):
        return False
    for question in questions:
        question_title = question.get('title')
        question_description = question.get('description')
        question_answer = question.get('answer')

        if not question_title or not question_description or not question_answer:
            return False
        new_question = Question(
            title=question_title,
            description=question_description,
            answer=question_answer,
            lab_id=lab_id
        )
        db.session.add(new_question)
    return True


def fetch_user_progress(lab_id):
    """Fetch user progress and calculate the percentage correct.

    Args:
        lab_id (int): The ID of the lab.

    Returns:
        list: A list of user progress formatted for JSON response.
    """
    student_list = UserProgress.query.filter_by(lab_id=lab_id).group_by(UserProgress.user_id).all()
    total_questions = Question.query.filter_by(lab_id=lab_id).count()

    student_array = []
    for student in student_list:
        completed_questions = UserProgress.query.filter_by(
            user_id=student.user_id, lab_id=lab_id, is_correct=True).all()
        correct_answers = len(completed_questions)
        percentage_correct = (correct_answers / total_questions) * 100 if total_questions != 0 else 0

        name = User.query.filter_by(user_id=student.user_id).first()
        student_array.append({
            'a': student.user_id,
            'firstname': name.first,
            'lastname': name.last,
            'labId': lab_id,
            'score': percentage_correct
        })

    return student_array


@labs.route('/get_labs', methods=['GET'])
def get_labs():
    """Get a list of all labs.

    Returns:
        JSON: A JSON response containing the list of labs.
    """
    labs_list = fetch_all_labs()
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
        user_id=user_id, lab_id=lab_id, question_id=question_id).first()

    if progress is None:
        progress = UserProgress(
            user_id=user_id, lab_id=lab_id, question_id=question_id, answer=answer, is_correct=is_correct)
        db.session.add(progress)
    else:
        if progress.is_correct:
            is_correct = True
        progress.answer = answer
        progress.is_correct = is_correct

    db.session.commit()
    return jsonify({
        'is_correct': is_correct,
        'message': 'Progress updated successfully'
    }), 200


@labs.route('/create_lab', methods=['POST'])
@jwt_required()
def create_lab():
    """Create a new lab with questions.

    Returns:
        JSON: A JSON response containing the new lab ID.
    """
    title = request.json.get('title')
    description = request.json.get('description')
    questions = request.json.get('questions')

    if not title or not description or not questions:
        return jsonify({'errors': 'Missing parameters'}), 400

    new_lab = Labs(title=title, description=description)
    db.session.add(new_lab)
    db.session.commit()

    if not create_new_questions(questions, new_lab.id):
        return jsonify({'errors': 'Missing question fields or invalid format'}), 400

    db.session.commit()
    return jsonify({'message': 'Lab created successfully', 'id': new_lab.id}), 201


@labs.route('/grade_options', methods=['GET'])
@jwt_required()
def grade_options():
    """Get a list of all lab titles and IDs.

    Returns:
        JSON: A JSON response containing the list of labs.
    """
    labs_list = fetch_all_labs()
    grade_options_list = [{'title': lab['title'], 'id': lab['id']} for lab in labs_list]
    return jsonify(grade_options_list)


@labs.route('/get_students', methods=['POST'])
@jwt_required()
def get_students():
    """Get a list of students and their progress for a specific lab.

    Returns:
        JSON: A JSON response containing the list of students and their progress.
    """
    lab_title = request.json.get('labId')

    lab = Labs.query.filter_by(title=lab_title).first()
    if lab is None:
        return jsonify({"error": "Lab not found"}), 404

    student_array = fetch_user_progress(lab.id)
    return jsonify(student_array)


@labs.route('/get_progress_percentage/<int:lab_id>', methods=['GET'])
@jwt_required()
def get_progress_percentage(lab_id):
    """Get the progress percentage and completed question IDs for a specific lab.

    Returns:
        JSON: A JSON response containing the progress percentage and completed question IDs.
    """
    user_id = get_jwt_identity()
    total_questions = Question.query.filter_by(lab_id=lab_id).count()

    completed_questions = UserProgress.query.filter_by(user_id=user_id, lab_id=lab_id, is_correct=True).all()
    correct_answers = len(completed_questions)
    percentage_correct = (correct_answers / total_questions) * 100 if total_questions != 0 else 0

    completed_question_ids = [q.question_id for q in completed_questions]

    return jsonify({
        'progress_percentage': percentage_correct,
        'completed_question_ids': completed_question_ids
    })


@labs.route('/get_completion_information', methods=["GET"])
@jwt_required()
def get_completion_information():
    """Get all labs a user has worked on and their progress for each lab.

    Args:
        user_id (int): The ID of the user to get the completion information for.

    Returns:
        JSON: A JSON response containing the completion information.
    """
    user_progress = UserProgress.query.filter_by(user_id=user_id).all()
    lab_ids = {progress.lab_id for progress in user_progress}
    user_labs = Labs.query.filter(Labs.id.in_(lab_ids)).all()

    labs_progress_list = []
    for lab in user_labs:
        total_questions = Question.query.filter_by(lab_id=lab.id).count()
        completed_questions = UserProgress.query.filter_by(user_id=user_id, lab_id=lab.id, is_correct=True).all()
        correct_answers = len(completed_questions)
        percentage_correct = (correct_answers / total_questions) * 100 if total_questions != 0 else 0

        labs_progress_list.append({
            'lab_id': lab.id,
            'lab_title': lab.title,
            'lab_description': lab.description,
            'progress_percentage': percentage_correct,
            'completed_questions': [q.question_id for q in completed_questions],
        })
    return jsonify(labs_progress_list)
