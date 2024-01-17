from sqlalchemy import (
    Column,
    String
)

from api.models import Base


class Token(Base):
    __tablename__ = 'token'

    access_token = Column(String(300), nullable=False, unique=True)
    token_type = Column(String(10), nullable=False, unique=True)
    user_email = Column(String(50), nullable=False, unique=True)

    class Config:
        orm_mode = True


class BlackToken(Base):
    __tablename__ = 'blacktoken'

    token = Column(String(300), nullable=False, unique=True)
