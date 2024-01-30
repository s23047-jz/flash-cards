import uuid

from sqlalchemy.orm import relationship

#from deck_of_flash_cards import Deck

from sqlalchemy import (
    Column,
    String,
    ForeignKey,
    UUID,
    Text,
)

from models import Base


class FlashCard(Base):
    __tablename__ = 'flash_card'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    deck_id = Column(UUID(as_uuid=True), ForeignKey("deck.id"))
    password = Column(String(30), nullable=False)
    username = Column(Text, nullable=False)
    deck_relationship = relationship("Deck", back_populates='flash_card_relationship')

    class Config:
        orm_mode = True
