"""Driver file which creates the app based on passed in configs"""
import os
from app import create_app

# Defaults to dev if not given specific config
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    app.run()
