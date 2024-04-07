# This will contain logic for API calls regarding "routes". See pseudo example below
# Note: None of this is working, this serves as an example. Imports are Boilerplate at the moment.

from flask import jsonify, request
from . import auth

# DOES NOT WORK, SERVES AS BP EXAMPLE
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    # Deliver to cognito, return proper token

