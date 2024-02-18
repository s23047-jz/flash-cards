import uuid

from sqlalchemy import (
    Column,
    String,
    UUID
)

from models import Base


class Token(Base):
    __tablename__ = "tokens"

    id = Column(UUID, primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    access_token = Column(String(300), nullable=False, unique=True)
    token_type = Column(String(10), nullable=False, default="Bearer")
    user_email = Column(String(50), nullable=False, unique=False)

    class Config:
        orm_mode = True


class Blacklist_Tokens(Base):
    __tablename__ = "blacklist_tokens"

    id = Column(UUID, primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    token = Column(String(300), nullable=False, unique=True)
