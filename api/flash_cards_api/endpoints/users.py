import uuid
from pydantic.main import BaseModel
from typing import List, Optional
from datetime import datetime

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Request
)
from sqlalchemy import func, desc, case
from sqlalchemy.orm import Session

from flash_cards_api.database import get_db
from flash_cards_api.models.users import User, get_password_hash
from flash_cards_api.models.roles import UserRoles
from flash_cards_api.models.deck_of_flash_cards import Deck

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
    id: uuid.UUID
    username: str
    email: str
    created_at: datetime


class UserRankingResponse(BaseModel):
    id: uuid.UUID
    username: str
    avatar: str
    shared_decks: int
    rank: int


class UserUpdateModel(BaseModel):
    email: Optional[str] = ''
    username: Optional[str] = ''


class SelfUserUpdate(UserUpdateModel):
    current_password: str
    password: Optional[str] = ''
    re_password: Optional[str] = ''


class SelfDelete(BaseModel):
    email: str
    password: str


class UserStatsResponse(BaseModel):
    id: uuid.UUID
    username: str
    avatar: str
    rank: int
    created_decks: int
    public_decks: int


class UpdateAvatarPayloadScheme(BaseModel):
    avatar: str


@router.get(
    "/",
    response_model=List[UserDetailsResponse],
    dependencies=[Depends(RoleAccessChecker([UserRoles.ADMIN, UserRoles.MODERATOR]))]
)
async def get_user_list(
    db: Session = Depends(get_db)
):
    users = db.query(
        User
    ).all()
    return users


@router.get(
    "/users_ranking/",
    response_model=List[UserRankingResponse],
    dependencies=[Depends(get_current_active_user)]
)
async def get_users_ranking(
    request: Request,
    db: Session = Depends(get_db)
):
    query_params = request.query_params
    print(query_params)

    sub_q = db.query(
        Deck.user_id.label('user_id'),
        func.rank().over(order_by=desc(func.sum(Deck.downloads))).label('rank')
    ).group_by(
        Deck.user_id
    ).subquery()

    q = db.query(
        User.id,
        User.username,
        User.avatar,
        func.count(Deck.id).label('shared_decks'),
        sub_q.c.rank
    ).select_from(
        User
    ).join(
        sub_q,
        sub_q.c.user_id == User.id
    ).join(
        Deck,
        Deck.user_id == User.id
    ).filter(
        Deck.is_deck_public
    ).group_by(
        User.username
    ).order_by(
        desc('shared_decks')
    )
    return q.all()


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

        if payload['password'] and payload['re_password']:
            if payload['password'] == payload['re_password']:
                user_details.password = get_password_hash(payload['password'])
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Passwords do not match"
            )
        if payload['username']:
            if get_user_by_username(payload['username'], db):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )
            user_details.username = payload['username']

        if payload['email']:
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


@router.delete("/me/", status_code=401)
async def delete_me(
    payload: SelfDelete,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    payload = payload.dict()
    if user.verify_password(payload['password']) \
            and user.email == payload['email']:
        try:
            user_to_delete = db.query(User).filter(User.id == user.id).first()
            db.delete(user_to_delete)
            db.commit()
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

        raise HTTPException(status_code=401)

    else:
        raise HTTPException(status_code=404, detail="Bad request")


@router.get(
    "/user_stats/{user_id}/",
    dependencies=[Depends(get_current_active_user)],
    status_code=200,
    response_model=UserStatsResponse
)
async def get_user_stats(
    user_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    sub_q = db.query(
        Deck.user_id.label('user_id'),
        func.rank().over(order_by=desc(func.sum(Deck.downloads))).label('rank')
    ).group_by(
        Deck.user_id
    ).subquery()

    q = db.query(
        User.id,
        User.username,
        User.avatar,
        func.count(Deck.id).label('created_decks'),
        func.count(case((Deck.is_deck_public == True, Deck.id), else_=None)).label('public_decks'),
        sub_q.c.rank
    ).outerjoin(
        Deck,
        Deck.user_id == User.id
    ).join(
        sub_q,
        sub_q.c.user_id == User.id
    ).filter(
        User.id == user_id
    )

    return q.first()


@router.put("/update-avatar/{user_id}/", status_code=200, dependencies=[Depends(get_current_active_user)])
async def update_avatar(
    user_id: uuid.UUID,
    payload: UpdateAvatarPayloadScheme,
    db: Session = Depends(get_db)
):
    payload = payload.dict()
    user: User = db.query(User).where(User.id == user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.avatar = payload['avatar']
    db.commit()
    db.refresh(user)

    return {"detail": "Avatar updated successfully"}


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
