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
3. Run "npm run dev" and navigate to the localhost url that is displayed to view the webapp

#### Back End Development
0. Have the most recent version of Python3 installed.
1. Clone this repository
2. Checkout Flask-Backend-Development
3. Navigate to Flask_App directory within the main project
4. OPTIONAL: Set up a Python virtual environment if desired, more information found here - [venv documentation](https://docs.python.org/3/library/venv.html).
5. Run `pip install -r requirements.txt` to install required python packages

## Functionality

Currently our functionality does not extend past a basic UI.


## Known Problems

There are not any known problems at this early stage in development.


## Contributing

TODO: Leave the steps below if you want others to contribute to your project.
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

No additional documentation at this early stage of development.
