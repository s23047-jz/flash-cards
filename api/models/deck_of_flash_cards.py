import uuid
from datetime import datetime
from api.models.users import User
from sqlalchemy.orm import relationship
from sqlalchemy import (
    Column,
    String,
    DateTime,
    Boolean,
    Integer,
    UUID,
    func,
    ForeignKey
)

from api.models import Base


class Deck(Base):
    __tablename__ = 'deck'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    deck_category = Column(String(30), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), server_default=func.now())
    updated_at = Column(DateTime, default=datetime.now(), server_default=func.now())
    is_deck_public = Column(Boolean, default=False)
    downloads = Column(Integer, default=0)
    flash_card_relationship = relationship("FlashCard", back_populates='deck_relationship')
    user_relationship = relationship("User", back_populates='stworzyc u usera relacje i zaktualizowac !!!')

    class Config:
        orm_mode = True
