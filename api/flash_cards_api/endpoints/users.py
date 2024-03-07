from datetime import date
from pydantic.main import BaseModel
from typing import List
from datetime import datetime

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


class UserDetailsResponse(BaseModel):
    username: str
    created_at: datetime
    ranking: int
    # TODO add count query for users decks
    # number_of_decs: int


@router.get("/", response_model=List[UserDetailsResponse])
async def get_user_list(
    db: Session = Depends(get_db),
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR, UserRoles.USER]))]
):
    users = db.query(User).all()
    return users


@router.get("/{user_id}", response_model=UserDetailsResponse)
async def get_user_details(
    user_id: str,
    db: Session = Depends(get_db),
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR, UserRoles.USER]))]
):
    user = db.query(User).get(User.id == user_id)
    return user
