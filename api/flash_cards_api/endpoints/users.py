from pydantic.main import BaseModel
from typing import List, Optional
from datetime import datetime

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session

from flash_cards_api.database import get_db
from flash_cards_api.models.users import User, get_password_hash
from flash_cards_api.models.roles import UserRoles

from flash_cards_api.dependencies.role import RoleAccessChecker
from flash_cards_api.dependencies.auth import get_current_active_user

from flash_cards_api.utils.auth import get_user_by_username, get_user

from flash_cards_api.endpoints.auth import UserResponse


router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)]
)


class UserDetailsResponse(BaseModel):
    username: str
    created_at: datetime
    ranking: int


class UserUpdateModel(BaseModel):
    email: Optional[str]
    username: Optional[str]


class SelfUserUpdate(UserUpdateModel):
    current_password: str
    password: Optional[str]
    re_password: Optional[str]


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
    "/{user_id}/",
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
    "/{user_id}/",
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))]
)
async def update_user_details(
    user_id: str,
    payload: UserUpdateModel,
    db: Session = Depends(get_db)
):
    payload = payload.dict()
    user: User = db.query(User).get(User.id == user_id)

    if user:
        if 'email' in payload.keys():
            if get_user(payload['email'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already taken"
                )
            user.email = payload['email']

        if 'username' in payload.keys():
            if get_user_by_username(payload['user'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )
            user.username = payload['username']

        db.commit()
        db.refresh(user)

    return user


@router.get("/me/", response_model=UserDetailsResponse, dependencies=[Depends(get_current_active_user)])
async def get_me(
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    user_details: User = db.query(User).filter(User.id == user.id).first()
    return user_details


@router.put("/me/", response_model=UserResponse)
async def update_me(
    request: SelfUserUpdate,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    payload = payload.dict()

    print("HEHEHEHE", payload)

    user_details: User = db.query(User).get(User.id == user.id)

    print("HEHEHEHE", user_details)

    if not user_details.verify_password(payload['current_password']):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid password"
        )

    if 'password' in payload and 're_password' in payload:
        if payload['password'] == payload['re_password']:
            user_details.password = get_password_hash(payload['password'])
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    if 'username' in payload:
        if get_user_by_username(payload['user'], db):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        user_details.username = payload['username']

    if 'email' in payload:
        if get_user(payload['email'], db):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already taken"
            )
        user_details.email = payload['email']

    db.commit()
    db.refresh(user_details)

    return user_details, 200
