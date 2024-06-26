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
* There is no filter or checks for fields when creating an account.
* There is no current functionality for editing or deleting labs upon creation.
* Currently there is no way to select a VM when creating a lab.
* All instructors are assigned to all students and vise versa.
* None of our code is deployed to a remote webserver, meaning it can only be run locally.
* We were not able to setup VM's permanently and can only access them via local connection.

## Contributing

#### Back End Contributing
- All backend development will be done in the form of modules, and will conform to the PEP-8 standards. 
- You must ensure that your python environment is configured with the proper packages outlined in requirements.txt. 
- If you need to install a new pip package for your feature you must run pip freeze > requirements.txt to update requirements as needed. 
- Proper documentation using [Google's Docstring Format](https://google.github.io/styleguide/pyguide.html) shall be used.
- Pylint should not be ignored unless it is a special circumstance where there is no other way to solve the problem.

#### Back End File Structure
- The backend file structure follows standard Flaks application best practices.
- In the root directory you will find requirements.txt which outlines each pip requirement. run.py and config.py are the entry points where you can define environment variables and database integration
- Inside the app directory is where all the "sub modules" are found. extensions.py exists as a nice place to put all outside library intialization in so there isn't any circular dependencies within the submodules. init creates the flask app with the defined environment variables in config.py. This is where the testing environment gets initialized.
- tests contain basic unit tests for the routes.
- auth contains the user data model, as well as logic to handle logging in and registering. JWT tokens are passed to the front end upon login.
- test contains the lab data models. This is where labs can be created, deleted, modified, interacted with etc.

#### Front End Contributing
- This project is built with React + Typescript. All variables in the frontend are typed to avoid errors.
- All frontend components were built with React fundamentals in mind.
- For a refresher on how components are to be built, check out the React starting guide.(https://react.dev/learn)
- Ensure that all hooks are located at the top of the page to follow React standards.
- Persistent state is achieved in our app via localStorage and useEffect hooks.

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

### Backend Deployment
- Everything in the backend is setup to utilize environment variables to accomplish a cloud hosting option.
- To deploy the Flask app all you will need to do is navigate to config.py in the app directory to see which variables need to be set, and what they do.
- SQL alchemy also has a very convinent migrate function to help setup the database tables once everything is plugged in properly. You can read more about that [here](https://flask-migrate.readthedocs.io/en/latest/)

### Full Stack Testing
- In order to have the frontend and backend working in tandem, firstly follow the above steps.
- Additionally for the frontend, ensure you have followed the installation steps, then navigate to where you cloned + "SecurIoTy\project-description-user-stories-and-glossary-securioty\securioty-webapp" run "npm run dev" and navigate to the localhost url that is displayed to view the webapp
- - The "secret phrase" when creating an instructor or admin account is "spring2024"
- NOTE: The frontend uses React Proxy to avoid issues with CORS. This will cause the app to break when deployed unless both the react app, and flask app are both on the same port.
