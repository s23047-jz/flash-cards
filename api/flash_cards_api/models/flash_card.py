import uuid

from sqlalchemy.orm import relationship

# from deck_of_flash_cards import Deck

from sqlalchemy import (
    Column,
    String,
    ForeignKey,
    UUID,
    Text,
)

from flash_cards_api.models import Base


class FlashCard(Base):
    __tablename__ = 'flash_card'

    id = Column(UUID, primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    deck_id = Column(UUID(as_uuid=True), ForeignKey("deck.id"))
    card_title = Column(String(256), nullable=False)
    card_text = Column(Text, nullable=False)
    deck_relationship = relationship("Deck", back_populates='flash_card_relationship')

    class Config:
        orm_mode = True
