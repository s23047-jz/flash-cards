import uuid
from datetime import datetime
from sqlalchemy.orm import relationship
from passlib.context import CryptContext

from sqlalchemy import (
    Column,
    String,
    DateTime,
    Boolean,
    Integer,
    UUID,
    func,
    Text
)

from flash_cards_api.models.deck_of_flash_cards import Deck
from flash_cards_api.models import Base


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


class User(Base):
    __tablename__ = "users"

    id = Column(UUID, primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    username = Column(String(60), unique=True, nullable=False)
    password = Column(String(256), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), server_default=func.now())
    updated_at = Column(DateTime, default=datetime.now(), server_default=func.now())
    ranking = Column(Integer, nullable=False, default=0)
    avatar = Column(Text, default="../Avatar_1.svg")
    active = Column(Boolean, default=True)
    role = Column(String(50), nullable=False)
    is_superuser = Column(Boolean, default=False)

    decks = relationship("Deck", back_populates="user")

    def verify_password(self, password: str):
        return pwd_context.verify(password, self.password)

    class Config:
        orm_mode = True
