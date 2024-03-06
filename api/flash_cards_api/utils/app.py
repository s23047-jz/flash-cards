from fastapi import Request, Response
from typing import Annotated
from flash_cards_api.database import Session
from flash_cards_api.models.token import Blacklist_Tokens
from fastapi.security import OAuth2PasswordBearer
from flash_cards_api.logger import logger
from sqlalchemy import select
from flash_cards_api.database import get_db
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
def get_token(headers) -> str:
    token = headers['Authorization']
    token = token.replace('Bearer ', '')
    token = token.replace('JWT', '')
    return token


async def catch_exception_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.error(str(e))
        return Response("Internal Server Error", status_code=500)

async def jwt_middleware(request: Request, call_next):
    if "Authorization" not in request.headers or "auth" in str(request.url.path):
        return await call_next(request)

    token = get_token(request.headers)

    if not token:
        return Response("Token is invalid", status_code=401)
    return await call_next(request)


async def security_headers_middleware(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    response.headers["X-Frame-Options"] = "deny"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1"

    return response
