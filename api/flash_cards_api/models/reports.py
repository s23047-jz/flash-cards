import uuid

from sqlalchemy import (
    Column,
    String,
    UUID
)

from flash_cards_api.models import Base


class Reports(Base):
    __tablename__ = "reports"

    id = Column(UUID, primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    deck_id = Column(UUID(as_uuid=True), nullable=False, unique=True)
    submitter_email = Column(String(50), nullable=False)

    class Config:
        orm_mode = True


