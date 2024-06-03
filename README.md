# SecurIoTy

## Project summary

This project proposes a web-based lab platform to train cybersecurity students on practical skills to combat the unique security challenges of the expanding Internet of Things field.

### Additional information about the project

SecurIoTy strives to allow cybersecurity students and professionals the ability to easily learn about IoT security challenges. Through our website students may take on different labs detailing security vulnerabilities in IoT devices so students may learn how to prevent them. Labs will come with a prebuilt virtual machine for students to interact with while they are conducting their lab to help gain hands on experience.

## Installation

### Prerequisites

- Up to date Node.js
- Up to date Python 3.12

### Add-ons

- Flask: Backend API

### Installation Steps

#### Front End Development
0. Download Node.js here - [Node.js Download](https://nodejs.org/en/download)
1. Clone this repository
2. Open a terminal and navigate to where you cloned + "SecurIoTy\project-description-user-stories-and-glossary-securioty\securioty-webapp"
3. Run "npm i" to download all necessary dependencies


#### Back End Development
0. Have the most recent version of Python3 installed.
1. Clone this repository
2. Checkout Flask-Backend-Development
3. Navigate to Flask_App directory within the main project
4. OPTIONAL: Set up a Python virtual environment if desired, more information found here - [venv documentation](https://docs.python.org/3/library/venv.html).
5. Run `pip install -r requirements.txt` to install required python packages


## Functionality
Our app currently has robust functionality in the following areas:
* Students can create accounts, log in and logout. Instructors can create accounts with higher privileges with a special passphrase.
* Users can access CTF style labs that are composed of instructions, questions and VM access
* There are 2 hard-coded labs for users to attemp
* Users can see what labs they’ve completed and see their progress on ones they’re working on
* Instructors (or admins) can create and publish labs for others to complete
* Instructors (or admins) can view the progress students have made on each lab


## Known Problems
* We currently don't have a way for users to edit account information or recover passwords
* There is no filter for fields when creating an account


## Contributing

#### Back End Contributing
- All backend development will be done in the form of modules, and will conform to the PEP-8 standards. 
- You must ensure that your python environment is configured with the proper packages outlined in requirements.txt. 
- If you need to install a new pip package for your feature you must run pip freeze > requirements.txt to update requirements as needed. 
- Proper documentation using [Google's Docstring Format](https://google.github.io/styleguide/pyguide.html) shall be used.
- Pylint should not be ignored unless it is a special circumstance where there is no other way to solve the problem.

#### Pushing Changes
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Additional Documentation

### Backend Testing
- In order to set up a functional testing environment for the API a few things must be done. First it is **HIGHLY** 
recommended to set up a virtual environment in Python in order to keep your package environment clean. Setting up
a virtual environment will save headaches with package versioning for this project and any future Python projects.
More information can be found [here](https://docs.python.org/3/library/venv.html). </br></br>
- Once all steps have been completed from the Backend Contributing list two environment variables must be set.
  - FLASK_APP needs to be set to 'run.py'
  - FLASK_CONFIG needs to be set to 'testing' </br></br>
- With the environment variables set you can simply run `flask run` in your terminal. The terminal will output which
port is being used for testing.

### Full Stack Testing
- In order to have the frontend and backend working in tandem, firstly follow the above steps.
- Additionally for the frontend, ensure you have followed the installation steps, then navigate to where you cloned + "SecurIoTy\project-description-user-stories-and-glossary-securioty\securioty-webapp" run "npm run dev" and navigate to the localhost url that is displayed to view the webapp
