from typing import Annotated

from jose import jwt, JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from flash_cards_api.models.users import User
from flash_cards_api.models.token import Blacklist_Tokens

from flash_cards_api.config import (
    SECRET_KEY,
    ALGORITHM
)
from flash_cards_api.database import get_db

from flash_cards_api.utils.auth import get_user, check_if_token_is_expired


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
        black_token = db.query(
            Blacklist_Tokens
        ).filter(Blacklist_Tokens.token == token).first()
        if black_token is not None:
            raise credentials_exception
        payload = jwt.decode(token[1:],SECRET_KEY, algorithms=ALGORITHM)
        if check_if_token_is_expired(payload):
            db.add(
                Blacklist_Tokens(
                    token=token
                )
            )
            db.commit()
            raise credentials_exception

        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as e:
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
