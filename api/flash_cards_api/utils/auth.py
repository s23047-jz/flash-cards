from datetime import timedelta, datetime

from jose import jwt, JWTError

from api.flash_cards_api.config import (
    SECRET_KEY,
    ALGORITHM
)

from api.flash_cards_api.models.users import User


# in minutes
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
RESET_ACCESS_TOKEN_EXPIRE_MINUTES = 60


def get_user(email: str, db) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    return user if user else None


def get_user_by_username(username: str, db) -> User | None:
    user = db.query(User).filter(User.username == username).first()
    return user if user else None


def authenticate_user(email: str, password: str, db) -> User | None:
    user = get_user(email, db)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=RESET_ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None