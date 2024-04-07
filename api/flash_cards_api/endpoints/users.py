from pydantic.main import BaseModel
from typing import List, Optional
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
    prefix="/api/users",
    tags=["users"]
)


class UserDetailsResponse(BaseModel):
    username: str
    created_at: datetime
    ranking: int
    # TODO add count query for users decks
    # number_of_decs: int


class UserUpdateModel(BaseModel):
    email: Optional[str]
    username: Optional[str]


class SelfUserUpdate(UserUpdateModel):
    password: str
    re_password: str


@router.get(
    "/",
    response_model=List[UserDetailsResponse],
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))]
)
async def get_user_list(
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return users


@router.get(
    "/{user_id}",
    response_model=UserDetailsResponse,
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))]
)
async def get_user_details(
    user_id: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).get(User.id == user_id)
    return user


@router.put(
    "/{user_id}",
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))]
)
async def get_user_details(
    user_id: str,
    payload: UserUpdateModel,
    db: Session = Depends(get_db)
):
    payload = payload.dict()
    user: User = db.query(User).get(User.id == user_id)

    if user:
        if 'email' in payload.keys():
            user.email = payload['email']

        if 'username' in payload.keys():
            user.username = payload['username']

        db.commit()
        db.refresh(user)

    return user
