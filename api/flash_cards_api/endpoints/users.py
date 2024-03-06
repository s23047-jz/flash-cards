from datetime import datetime
from pydantic.main import BaseModel
from typing import List

from fastapi import (
    APIRouter,
    Depends
)
from sqlalchemy.orm import Session

from flash_cards_api.database import get_db
from flash_cards_api.models.users import User
from flash_cards_api.models.roles import UserRoles

from flash_cards_api.dependencies.role import RoleAccessChecker


router = APIRouter(
    prefix="/users",
    tags=["users"],

)

# dependencies = [Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))]
class UserDetailsResponse(BaseModel):
    email: str
    username: str
    created_at: datetime


@router.get("/", response_model=List[UserDetailsResponse])
async def get_user_list(
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return users


@router.get("/{user_id}", response_model=UserDetailsResponse)
async def get_user_details(
    user_id: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).get(User.id == user_id)
    return user
