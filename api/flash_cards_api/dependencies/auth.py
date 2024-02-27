from typing import Annotated

from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from api.flash_cards_api.models.users import User

from api.flash_cards_api.config import (
    SECRET_KEY,
    ALGORITHM
)
from api.flash_cards_api.database import get_db

from api.flash_cards_api.utils.auth import get_user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(
        token: Annotated[str, Depends(oauth2_scheme)],
        db: Session = Depends(get_db)
) -> User | None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user(email, db)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User | None:
    if not current_user.active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user