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
        intro_lab = Labs(id=1, title='Lab 1: Introduction Lab', description='binwalk, hashcat, FAT')
        db.session.add(intro_lab)
        bypass_lab = Labs(id=2, title='Lab 2: Bypassing Login Pages', description='Using burpsuite to get admin credentials')
        db.session.add(bypass_lab)
        remote_lab = Labs(id=3, title='Lab 3: Remote Code Execution', description='Exposing credentials')
        db.session.add(remote_lab)
        db.session.commit()

        questions = [

            Question(
                id=1,
                title='What is the cpu name?',
                description='Open up VM. Run “sudo apt update”. Run “sudo apt install hashcat”. Unzip firmware onto desktop. Open up terminal window and navigate to desktop. Run “binwalk firmwarename”.',
                answer='MIPS',
                lab_id=intro_lab.id
            ),
            Question(
                id=2,
                title='True/False: Is this firmware encrypted?',
                description='Run “binwalk -E firmwarename”. An entropy graph will popup, and a straight line across means that the firmware is encrypted, any dips in the graph shows not encrypted.',
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
                description='Run “hashid pastedhash”. Use hashcat.net to find the correct id number associated with the type of hash used.',
                answer='500',
                lab_id=intro_lab.id
            ),
            Question(
                id=6,
                title='What was the password for the admin user?',
                description='Run “hashcat -a 3 -m 1500 passwd –force”. -a 3 specifies a dictionary brute force hashing attack. -m 1500 specifies DES encryption was used to hash the passwords. Run the same command with “--show” at the end to show cracked passwords.',
                answer='1234',
                lab_id=intro_lab.id
            ),
            Question(
                id=7,
                title='What is the architecture that FAT is being ran on?',
                description='In the terminal navigate back to the Desktop. Navigate to “/tools/firmware-analysis-toolkit”. Run “./fat.py path/tp/rootfs.squashfs”.',
                answer='mipseb',
                lab_id=intro_lab.id
            ),
            Question(
                id=8,
                title='What is FAT doing? \'Emulating a router\'s firmware\' or \'connecting to a physical device\'?',
                description='Press enter to run the firmware. Take note of the IP address 192.168.0.100 that shows when the router is being emulated. Open a web browser and navigate to the ip address.',
                answer='Emulating a router\'s firmware',
                lab_id=intro_lab.id
            ),
            Question(
                id=9,
                title='From research, what is the most common password for an admin user?',
                description='Same as you did in the intro lab, expand your firmware onto your desktop and run “binwalk -Me firmwarename”. Same as you did in the intro lab, navigate to /tools/firmware-analysis-toolkit and run the fat.py on the router and open up the interface in the browser.',
                answer='admin',
                lab_id=bypass_lab.id
            ),
            Question(
                id=10,
                title='What does “Send to intruder” do on burpsuite? \'Built-in fuzzing tool\' or \'Auto-hacker\'?',
                description='Open a new terminal and run the command “java -jar -Xmx4g ‘/home/iot/Desktop/tools/burpsuite.jar’”. Select create temporary project and then finish to create a new burpsuite window to run the proxy. Return to the interface website and open the browser settings on the top right-hand side, navigate to the bottom and open up the network settings. Select radio button “Manual proxy configuration” and add 127.0.0.1 with port 8080 and hit OK at the bottom.',
                answer='Built-in fuzzing tool',
                lab_id=bypass_lab.id
            ),
            Question(
                id=11,
                title='Which attack type would be best for a dictionary password attack? (do some research on each attack type)',
                description='On the burpsuite window, make sure “Intercept is on”. On the browser, type “admin” as the password. The request should be captured in the burpsuite “raw” window. Right-click on the request and hit “send to intruder”. Click on the positions tab, and click the drop-down of attack types. ',
                answer='Cluster-bomb',
                lab_id=bypass_lab.id
            ),
            Question(
                id=12,
                title='How many payload positions are there after the variables are set?',
                description='Select the attack type from the last question and click “Clear $” on the right-hand side. Now we have to select our attack variables, so you can double click on “admin” as the username and click “Add $” as well as double click on “admin” as the password and click “Add $”. ',
                answer='2',
                lab_id=bypass_lab.id
            ),
            Question(
                id=13,
                title='True/False: 40\% of admin default credentials go unchanged.',
                description='Click on the Payloads tab. Now you can specify two lists of variables, one for the username and one for the list of passwords you would like to try. Type admin and click add for the first list. Change the payloads dropdown to 2 for the passwords list. Type a list of passwords including admin, 1234, password, netgear, 123456, admin123 clicking add for each separate password. On the payloads tab, click start attack on far right side. As the attack is happening, you can hopefully see two different response codes, one for success and one for failure.',
                answer='True',
                lab_id=bypass_lab.id
            ),
            Question(
                id=14,
                title='What was the correct password?',
                description='Return back to the burpsuite proxy tab and select “Intercept is off”. Return to the browser window and turn off the manual proxy in the network settings. You will notice you have been successfully logged into the router! This happened because not only was the intruder testing each password on the proxy, but also trying each one on the browser.',
                answer='password',
                lab_id=bypass_lab.id
            ),
            Question(
                id=15,
                title='What OS does this file system represent?',
                description='Same as you did in the intro lab, expand your firmware onto your desktop and run “binwalk -Me firmwarename”. Navigate to the squashfs-root folder and run “ls”.',
                answer='Linux',
                lab_id=remote_lab.id
            ),
            Question(
                id=16,
                title='What is one function used in this file that shows us it is insecure and can be exploited?',
                description='Run ‘find . -name “*.php”’ . Use nano to open up boardDataWW.php and look over the file.',
                answer='exec()',
                lab_id=remote_lab.id
            ),
            Question(
                id=17,
                title='As a refresher, what is the password for admin?',
                description='Now that we have identified the file we will be exploiting we can emulate this router. Same as you did in the intro lab, navigate to /tools/firmware-analysis-toolkit and run the fat.py on the router and open up the interface in the browser and login.',
                answer='password',
                lab_id=remote_lab.id
            ),
            Question(
                id=18,
                title='What does WW stand for?',
                description='Once logged in, navigate to 192.168.0.100/boardDataWW.php',
                answer='worldwide',
                lab_id=remote_lab.id
            ),
            Question(
                id=19,
                title='What is the error received when you type an invalid MAC address?',
                description='Play around by typing some MAC addresses that are valid or invalid and see what kind of responses you get. Also try typing some terminal commands since that is ultimately what we are trying to accomplish here.',
                answer='Enter a valid MAC Address',
                lab_id=remote_lab.id
            ),
            Question(
                id=20,
                title='What is the point of using burpsuite? \'Security testing of web applications\' or \'Capturing of packets\'?',
                description='Open a new terminal and run the command “java -jar -Xmx4g ‘/home/iot/Desktop/tools/burpsuite.jar’”. Select create temporary project and then finish to create a new burpsuite window to run the proxy.',
                answer='Security testing of web applications',
                lab_id=remote_lab.id
            ),
            Question(
                id=21,
                title='Why use the IP address 127.0.0.1? \'Address is reserved for loopback purposes\' or \'Cheap costs and never used\'?',
                description='Return to the interface website and open the browser settings on the top right-hand side, navigate to the bottom and open up the network settings. Select radio button “Manual proxy configuration” and add 127.0.0.1 with port 8080 and hit OK at the bottom.',
                answer='Address is reserved for loopback purposes',
                lab_id=remote_lab.id
            ),
            Question(
                id=22,
                title='What is the intercept doing? \'Exploiting the website\' or \'Intercepting a request from the browser\'?',
                description='Return back to the boardDataWW.php screen and alter the screen size so you can see both the interface and the burpsuite proxy window. On the burpsuite window, click the proxy tab on the top and underneath that the intercept tab, and ensure that “Intercept is on”.',
                answer='Intercepting a request from the browser',
                lab_id=remote_lab.id
            ),
            Question(
                id=23,
                title='What is the content-type?',
                description='On the browser window, type in a valid MAC address for the requirements (Ex: 112233445566) and hit submit. You should entice in the burpsuite window that the packets sent by the request were captured, appearing in the “Raw” window.',
                answer='application/x-www-form-urlencoded',
                lab_id=remote_lab.id
            ),
            Question(
                id=25,
                title='What does the request line read (last line in the Raw window)?',
                description='Click the “Forward” button near the intercept button, which will ensure the request goes through on the browser window and it will stop refreshing.',
                answer='macAddress=112233445566&reigninfo=0&writeData=Submit',
                lab_id=remote_lab.id
            ),
            Question(
                id=26,
                title='What does the repeater allow us to do? \'Intercept a request\' or \'Modify a HTTP request and send it to the server\'?',
                description='Right click on the raw request and click “Send to repeater”. Return back to the Proxy tab and click the intercept button to change it to “Intercept is off”.',
                answer='Modify a HTTP request and send it to the server',
                lab_id=remote_lab.id
            ),
            Question(
                id=27,
                title='What error message appears in Raw Response window when you add a semicolon in the macAddress?',
                description='Return to the repeater tab, where we can mess with the value of the macAddress and see what kind of responses we get in the Raw Response window. Add a colon anywhere in the macAddress or throughout the whole thing to make it an actual ‘valid’ address. Hit the “Send” button.',
                answer='Invalid Data!',
                lab_id=remote_lab.id
            ),
            Question(
                id=28,
                title='What message appears now in the Raw Response Window?',
                description='Change the macAddress line to read “macAddress=001122334455 -c; ls >> iot.txt #&reigninfo=0&writeData=Submit”. Hit the “Send” button.',
                answer='Update Successful!',
                lab_id=remote_lab.id
            ),
            Question(
                id=29,
                title='True/False: Executing \'cat /etc/passwd > file\' is a potential malicious command to try with these techniques?',
                description='On the browser window, navigate to the URL iot.txt and view the command you were successfully able to execute remotely.',
                answer='True',
                lab_id=remote_lab.id
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
            )
        ]

        db.session.add_all(user_progress)
        db.session.commit()
