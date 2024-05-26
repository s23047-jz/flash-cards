import uuid
from typing import Annotated
from datetime import datetime, timedelta

from pydantic.main import BaseModel

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Request
)
from sqlalchemy.orm import Session

from flash_cards_api.database import get_db
from flash_cards_api.models.users import User, get_password_hash
from flash_cards_api.models.token import Blacklist_Tokens, Token
from flash_cards_api.models.roles import UserRoles
from flash_cards_api.logger import logger
from flash_cards_api.dependencies.auth import (
    oauth2_scheme,
    get_current_active_user,
    get_current_user
)
from flash_cards_api.utils.auth import (
    get_user,
    get_user_by_username,
    authenticate_user,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    RESET_ACCESS_TOKEN_EXPIRE_MINUTES
)

from flash_cards_api.utils.email import (
    send_active_account_email,
    send_password_reset_email
)

router = APIRouter(prefix="/api/auth", tags=["authentication"])


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
    avatar: int
    role: str
    is_superuser: bool
    avatar: str


class LoginResponse(BaseModel):
    user_data: UserResponse
    token_data: TokenResponse


@router.post("/login/", response_model=LoginResponse)
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
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    db.add(
        Token(access_token=token, user_email=user.email)
    )
    db.commit()

    res_token = db.query(Token).filter(Token.access_token == token).first()

    return {
        "user_data": user,
        "token_data": res_token
    }


@router.post("/register/", status_code=201)
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
            password=get_password_hash(payload['password']),
            role=UserRoles.get_default_roles()
        )
    )
    db.commit()

    token = create_access_token(
        {"sub": payload["email"]},
        expires_delta=timedelta(minutes=RESET_ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    db.add(
        Token(access_token=token, user_email=payload["email"])
    )
    db.commit()

    send_active_account_email(payload["email"], token, db)
    return {'detail': 'User added successfully'}, 201


@router.post("/logout/")
async def logout(
        token: Annotated[str, Depends(oauth2_scheme)],
        db: Session = Depends(get_db)
):
    db.add(
        Blacklist_Tokens(
            token=token
        )
    )
    db.commit()
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token is no longer valid",
        headers={"WWW-Authenticate": "Bearer"}
    )


@router.post("/reset_password/")
async def reset_password(
        request: Request,
        db: Session = Depends(get_db)
):
    req = request.query_params
    if "email" not in req.keys():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing email"
        )

    user = get_user(email=req["email"], db=db)
    if user is not None:
        token = create_access_token(
            {"sub": req["email"]},
            expires_delta=timedelta(minutes=RESET_ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        db.add(
            Token(access_token=token, user_email=req["email"])
        )
        db.commit()

        send_password_reset_email(req["email"], token, db)

    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )


@router.post("/change_password/")
async def change_password(
        request: Request,
        user: User = Depends(get_current_active_user),
        db: Session = Depends(get_db)
):
    try:
        req = request.query_params
        password = req.get("password")

        user_model = get_user(email=user.email, db=db)
        user_model.password = get_password_hash(password)
        db.commit()
    except Exception as e:
        logger.error(e)


@router.post("/account_activation/")
async def account_activation(
        user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    try:
        user_model = get_user(email=user.email, db=db)
        user_model.active = True
        db.commit()
    except Exception as e:
        logger.error(e)
