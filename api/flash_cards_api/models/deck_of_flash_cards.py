import uuid
from datetime import datetime

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

from flash_cards_api.models import Base
from flash_cards_api.models.flash_card import FlashCard


class Deck(Base):
    __tablename__ = 'deck'

    id = Column(UUID, primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String(30), nullable=False)
    deck_category = Column(String(30), nullable=False)
    created_at = Column(DateTime, default=datetime.now, server_default=func.now())
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, server_default=func.now())
    is_deck_public = Column(Boolean, default=False)
    is_created_by_user = Column(Boolean, default=True)
    downloads = Column(Integer, default=0)
    user = relationship("User", back_populates="decks")

    flash_card_relationship = relationship(
        "FlashCard",
        back_populates='deck_relationship',
        cascade="all, delete-orphan"
    )

    def get_number_of_flash_cards(self):
        return len(self.flash_card_relationship)

    class Config:
        orm_mode = True