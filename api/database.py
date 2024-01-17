from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker

from config import (
    MARIADB_USER,
    MARIADB_PASSWORD,
    MARIADB_DATABASE,
    MARIADB_HOST,
    MARIADB_PORT
)

# in seconds
CONNECTION_TIMEOUT = 60

MARIADB_URL = URL(
    "'mysql+pymysql",
    MARIADB_USER,
    MARIADB_PASSWORD,
    MARIADB_HOST,
    MARIADB_PORT,
    MARIADB_DATABASE
)

engine = create_engine(
    MARIADB_URL,
    convert_unicode=True,
    connect_args=dict(connect_timeout=CONNECTION_TIMEOUT, use_unicode=True),
    pool_size=20,
    max_overflow=5
)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """
    Returns the SQLAlchemy database connector
    """
    db = Session()
    try:
        yield db
    finally:
        db.close()
