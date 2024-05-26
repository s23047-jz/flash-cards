import uuid
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

from pydantic import BaseModel

from pydantic import BaseModel

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)]
)


class SelfUserUpdate(BaseModel):
    email: Optional[str] = ''
    username: Optional[str] = ''
    current_password: str
    password: Optional[str] = ''
    re_password: Optional[str] = ''


class UserDetailsResponse(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    created_at: datetime


class UserUpdateModel(BaseModel):
    email: Optional[str] = ''
    username: Optional[str] = ''


class SelfUserUpdate(UserUpdateModel):
    current_password: str
    password: Optional[str] = ''
    re_password: Optional[str] = ''


class DeleteAccountPayload(BaseModel):
    current_password: str


class AvatarUpdatePayload(BaseModel):
    avatar: str


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


@router.get("/me/", status_code=200)
async def get_me(
        user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
):
    user_details: User = db.query(User).filter(User.id == user.id).first()
    if user_details:
        return user_details
    raise HTTPException(status_code=404, detail="User not found")


@router.put("/me/", response_model=UserResponse, status_code=200)
async def update_me(
        payload: SelfUserUpdate,
        user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
):
    payload = payload.dict()
    user_details: User = db.query(User).filter(User.id == user.id).first()

    if user_details:
        if not user_details.verify_password(payload['current_password']):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid password"
            )

        if payload.get('password') and payload.get('re_password'):
            if payload['password'] != payload['re_password']:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Passwords do not match"
                )
            user_details.password = get_password_hash(payload['password'])

        if payload.get('username'):
            if get_user_by_username(payload['username'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )
            user_details.username = payload['username']

        if payload.get('email'):
            if get_user(payload['email'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already taken"
                )
            user_details.email = payload['email']

        db.commit()
        db.refresh(user_details)

        return user_details

    raise HTTPException(status_code=404, detail="User not found")


@router.put("/me/avatar", response_model=UserResponse, status_code=200)
async def update_avatar(
        payload: AvatarUpdatePayload,
        user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
):
    user_details: User = db.query(User).filter(User.id == user.id).first()

    if user_details:
        user_details.avatar = payload.avatar
        db.commit()
        db.refresh(user_details)
        return user_details

    raise HTTPException(status_code=404, detail="User not found")


@router.get(
    "/{user_id}/",
    response_model=UserDetailsResponse,
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))],
    status_code=200
)
async def get_user_details(
        user_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    user: User = db.query(User).filter(User.id == user_id).first()
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")


@router.put(
    "/{user_id}/",
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))],
    status_code=200
)
async def update_user_details(
        user_id: uuid.UUID,
        payload: UserUpdateModel,
        db: Session = Depends(get_db)
):
    payload = payload.dict()
    user: User = db.query(User).get(User.id == user_id)

    if user:
        if payload['email']:
            if get_user(payload['email'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already taken"
                )
            user.email = payload['email']

        if payload['username']:
            if get_user_by_username(payload['username'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )
            user.username = payload['username']

        db.commit()
        db.refresh(user)

        return user

    raise HTTPException(status_code=404, detail="User not found")


@router.delete("/me", status_code=204)
async def delete_account(
        payload: DeleteAccountPayload,
        user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
):
    user_details: User = db.query(User).filter(User.id == user.id).first()

    if user_details:
        if not user_details.verify_password(payload.current_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid password"
            )

        db.delete(user_details)
        db.commit()
        return

    raise HTTPException(status_code=404, detail="User not found")
