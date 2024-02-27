import os

HERE = os.getcwd()
API_DIR = os.path.join(HERE, 'api')

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")

BACKEND_HOST = os.environ.get('BACKEND_HOST', "0.0.0.0")
BACKEND_PORT = int(os.environ.get('BACKEND_PORT', 8000))

WEBHOST = os.environ.get("WEBHOST")

MARIADB_HOST = os.environ["MARIADB_HOST"]
MARIADB_DATABASE = os.environ["MARIADB_DATABASE"]
MARIADB_USER = os.environ["MARIADB_USER"]
MARIADB_PASSWORD = os.environ["MARIADB_PASSWORD"]
MARIADB_PORT = os.environ["MARIADB_PORT"]

MARIADB_URL = f"mysql+pymysql://{MARIADB_USER}:{MARIADB_PASSWORD}@{MARIADB_HOST}:{MARIADB_PORT}/{MARIADB_DATABASE}"
