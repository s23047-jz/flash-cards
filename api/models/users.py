import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    String,
    DateTime,
    Boolean,
    Integer,
    UUID,
    func
)

from models import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    username = Column(String(60), unique=True, nullable=False)
    password = Column(String(256), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), server_default=func.now())
    updated_at = Column(DateTime, default=datetime.now(), server_default=func.now())
    ranking = Column(Integer, nullable=False)
    active = Column(Boolean, default=False)

    class Config:
        orm_mode = True
