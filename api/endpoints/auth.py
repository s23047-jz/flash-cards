from datetime import date
from typing import Annotated

from pydantic.main import BaseModel

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session

from api.database import get_db
from api.models.users import User
from api.models.token import Token
from api.dependencies.auth import (
    authenticate_user,
    get_password_hash,
    create_access_token,
    get_user,
    get_user_by_username,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_current_active_user, oauth2_scheme
)


router = APIRouter(prefix="/auth", tags=["authentication"])


class LoginPayloadScheme(BaseModel):
    email: str
    password: str


class RegisterPayloadScheme(LoginPayloadScheme):
    username: str
    re_password: str


class RefreshTokenPayloadScheme(BaseModel):
    access_token: str


class TokenResponse(RefreshTokenPayloadScheme):
    token_type: str


class UserResponse(LoginPayloadScheme):
    id: str
    username: str
    created_at = date
    updated_at = date
    active = bool


class LoginResponse(BaseModel):
    user_data: UserResponse
    token: TokenResponse


@router.post("/login", response_model=LoginResponse)
async def login(
    payload: LoginPayloadScheme,
    db: Session = Depends(get_db)
):
    payload = payload.dict()
    user = authenticate_user(payload['email'], payload['password'], db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

    token = create_access_token(
        {"sub": user.email}, expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    db.add(
        Token(
            access_token=token,
            user_email=user.email
        )
    )
    db.commit()
    token = db.query(Token).filter(Token.access_token == user.email).first()

    return {
        "user_data": user,
        "token": token
    }


@router.post("/register")
async def register(
    payload: RegisterPayloadScheme,
    db: Session = Depends(get_db)
):
    payload = payload.dict()

    if get_user(payload['email'], db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already taken"
        )

    if get_user_by_username(payload['username'], db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )

    # TODO dodac walidacje hasla? @Kossak

    db.add(
        User(
            email=payload['email'],
            username=payload['username'],
            password=get_password_hash(payload['password'])
        )
    )
    db.commit()

    return HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail="Successfully created a new user"
        )


# TODO add refresh / check token
@router.post("/refresh")
async def refresh(
    user: User = Depends(get_current_active_user)
):
    return user
