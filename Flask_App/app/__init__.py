"""
Application factory for the Flask application.

This module contains the application factory function that initializes the Flask
application with the necessary configurations, extensions, and blueprints.
"""
from flask import Flask
from flask_cors import CORS
from Flask_App.app.extensions import db, bcrypt, jwt, migrate
from Flask_App.config import config_dict
from Flask_App.app.auth.models import User
from Flask_App.app.labs.models import Labs, Question, UserProgress


def create_app(config_name):
    """Create and configure an instance of the Flask application.

    Args:
        config_name (str): The configuration name to use.

    Returns:
        Flask: The Flask application instance.
    """
    app = Flask(__name__)
    app.config.from_object(config_dict[config_name])

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    if config_name == 'testing':
        with app.app_context():
            setup_testing_data()

    from .auth.routes import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .labs.routes import labs as labs_blueprint
    app.register_blueprint(labs_blueprint, url_prefix='/labs')

    CORS(app)
    return app


def setup_testing_data():
    """Setup dummy data for testing."""
    db.create_all()
    if User.query.count() == 0:
        dummy_user = User(email='Test@gmail.com', first='John', last='Doe', role='ADMIN')
        dummy_user.set_password('TEST1234')
        db.session.add(dummy_user)
        db.session.commit()
    if Labs.query.count() == 0:
        #dummy_lab = Labs(id=1, title='Test Lab', description='Test Lab Description')
        intro_lab = Labs(id=1, title='Introduction Lab', description='Beginner concepts including binwalk on a firmware')
        db.session.add(intro_lab)
        db.session.commit()

        questions = [

            Question(
                id=1,
                title='What is the cpu name?',
                description='''Open up VM.
                            Run “sudo apt update”.
                            Run “sudo apt install hashcat”.
                            Unzip firmware onto desktop.
                            Open up terminal window and navigate to desktop.
                            Run “binwalk firmwarename”.''',
                answer='MIPS',
                lab_id=intro_lab.id
            ),
            Question(
                id=2,
                title='True/False: Is this firmware encrypted?',
                description='''Run “binwalk -E firmwarename”.
                            An entropy graph will popup, and a straight line across means that the firmware is encrypted, any dips in the graph shows not encrypted.''',
                answer='False',
                lab_id=intro_lab.id
            ),
            Question(
                id=3,
                title='What is the first location listed that password files are located in?',
                description='Run “binwalk -Me firmwarename”. Navigate to the squashfs-root folder. Run “find . -name passwd”.',
                answer='./etc',
                lab_id=intro_lab.id
            ),
            Question(
                id=4,
                title='True/False: Are these hashed passwords?',
                description='Navigate to ./etc. Run “cat passwd.bak” or “cat passwd”. This gives us the names of the users and the hashed passwords so we need to find the type of hash to run on hashcat to crack the passwords.',
                answer='True',
                lab_id=intro_lab.id
            ),
            Question(
                id=5,
                title='What is the id number associated with md5crypt?',
                description='Run “hashid pastedhash”. Use hashcat.net to find the correct id number associated with the type of hash used',
                answer='500',
                lab_id=intro_lab.id
            ),
            Question(
                id=6,
                title='What was the password for the admin user?',
                description='Run “hashcar -a 3 -m 1500 passwd –force”. -a 3 specifies a dictionary brute force hashing attack. -m 1500 specifies DES encryption was used to hash the passwords. Run the same command with “--show” at the end to show cracked passwords',
                answer='1234',
                lab_id=intro_lab.id
            ),
            Question(
                id=7,
                title='What is the architecture that FAT is being ran on?',
                description='In the terminal navigate back to the Desktop. Navigate to “/tools/firmware-analysis-toolkit”. Run “./fat.py path/tp/rootfs.squashfs”',
                answer='mipseb',
                lab_id=intro_lab.id
            ),
            Question(
                id=8,
                title='What is FAT doing? Emulating a router\'s firmware or connecting to a physical device?',
                description='Press enter to run the firmware. Take note of the IP address 192.168.0.100 that shows when the router is being emulated. Open a web browser and navigate to the ip address',
                answer='Emulating a router\'s firmware',
                lab_id=intro_lab.id
            )
            
        ]
        """Question(
                id=1,
                title='Who is the best dog in the world?',
                description='This question, obviously asks who the best dog in the world is.',
                answer='Maggie',
                lab_id=dummy_lab.id
            ),
            Question(
                id=2,
                title='Is Python fun?',
                description='This question asks if programming is fun.',
                answer='Sometimes',
                lab_id=dummy_lab.id
            )"""

        db.session.add_all(questions)
        db.session.commit()

        # Setup user progress
        user = User.query.filter_by(email='Test@gmail.com').first()
        user_progress = [
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[0].id,
                answer=questions[0].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[1].id,
                answer=questions[1].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[2].id,
                answer=questions[2].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[3].id,
                answer=questions[3].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[4].id,
                answer=questions[4].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[5].id,
                answer=questions[5].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[6].id,
                answer=questions[6].answer,
                is_correct=True
            ),
            UserProgress(
                user_id=user.user_id,
                lab_id=intro_lab.id,
                question_id=questions[7].id,
                answer=questions[7].answer,
                is_correct=True
            )
        ]

        db.session.add_all(user_progress)
        db.session.commit()
