import uuid
from datetime import datetime, timedelta

from pydantic.main import BaseModel

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session
from typing import List, Tuple, Optional

from database import get_db
from models.users import User, get_password_hash
from models.token import Blacklist_Tokens, Token
from dependencies.auth import (
    authenticate_user,
    create_access_token,
    get_user,
    get_user_by_username,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_current_active_user,
    oauth2_scheme,
    decode_token
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


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    username: str
    created_at: datetime
    updated_at: datetime
    active: bool


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
        {"sub": user.email},
        expires_delta=timedelta(ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    db.add(
        Token(access_token=token, user_email=user.email)
    )
    db.commit()

    res_token = db.query(Token).filter(Token.access_token==token).first()

    return {
        "user_data": user,
        "token": res_token
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

    if payload['password'] != payload['re_password']:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )

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


@router.post("/refresh")
async def refresh(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if datetime.now() > payload["exp"]:
        db.add(
            Blacklist_Tokens(
                token=token
            )
        )
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {"message": "Token refreshed successfully"}


@router.post("/logout")
async def logout(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    db.add(
        Blacklist_Tokens(
            token=token
        )
    )
    db.commit()
    return {"message": "Successfully logged out"}
