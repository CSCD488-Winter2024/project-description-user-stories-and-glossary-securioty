"""
This is the main entry point for the Flask application.
It initializes the application with the specified configuration
and runs the application server.
"""
import os
from app import create_app

config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    app.run()
