from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from flash_cards_api.config import MARIADB_URL

# in seconds
CONNECTION_TIMEOUT = 60

engine = create_engine(
    MARIADB_URL,
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
