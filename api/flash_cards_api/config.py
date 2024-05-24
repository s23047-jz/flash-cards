import os
from dotenv import load_dotenv

load_dotenv()

HERE = os.getcwd()
FLASH_CARDS_API_DIR = os.path.join(HERE, "flash_cards_api")
FIXTURES_DIR = os.path.join(FLASH_CARDS_API_DIR, "fixtures")
TEMPLATES_DIR = os.path.join(FLASH_CARDS_API_DIR, "templates")

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")

BACKEND_HOST = os.environ.get('BACKEND_HOST', "0.0.0.0")
BACKEND_PORT = int(os.environ.get('BACKEND_PORT', 8000))

WEBHOST = os.environ.get("WEBHOST")
MOBILE_HOST = os.environ.get("MOBILE_HOST", "exp://192.168.1.25:19000")

MARIADB_HOST = os.environ.get("MARIADB_HOST", "localhost")
MARIADB_DATABASE = os.environ["MARIADB_DATABASE"]
MARIADB_USER = os.environ["MARIADB_USER"]
MARIADB_PASSWORD = os.environ["MARIADB_PASSWORD"]
MARIADB_PORT = os.environ["MARIADB_PORT"]

MARIADB_URL = f"mysql+pymysql://{MARIADB_USER}:{MARIADB_PASSWORD}@{MARIADB_HOST}:{MARIADB_PORT}/{MARIADB_DATABASE}"  # noqa

SMTP_SERVER = os.environ["SMTP_SERVER"]
SMTP_PORT = os.environ["SMTP_PORT"]
SMTP_LOGIN = os.environ["SMTP_LOGIN"]
SMTP_PASSWORD = os.environ["SMTP_PASSWORD"]
