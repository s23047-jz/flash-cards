import os

HERE = os.getcwd()
API_DIR = os.path.join(HERE, 'api')

BACKEND_HOST = os.environ.get('BACKEND_HOST', 'localhost')
BACKEND_PORT = os.environ.get('BACKEND_PORT', 8000)

WEBHOST = os.environ.get("WEBHOST")

MARIADB_DATABASE = os.environ.get("MARIADB_DATABASE")
MARIADB_USER = os.environ.get("MARIADB_USER")
MARIADB_PASSWORD = os.environ.get("MARIADB_PASSWORD")
MARIADB_PORT = os.environ.get("MARIADB_PORT")
