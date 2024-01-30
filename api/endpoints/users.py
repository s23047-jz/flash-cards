from datetime import date
from pydantic.main import BaseModel

from fastapi import (
    APIRouter,
    Depends
)
from sqlalchemy.orm import Session

from api.database import get_db
from api.models.users import User

from api.dependencies.auth import get_current_active_user

router = APIRouter(prefix="/users", tags=["users"], dependencies=[Depends(get_current_active_user)])


class UserDetailsResponse(BaseModel):
    username: str
    created_at: date
    ranking: int
    # TODO add count query for users decks
    # number_of_decs: int


@router.get("/{user_id}", response_model=UserDetailsResponse)
async def get_user_details(
    user_id: str,
    db: Session = Depends(get_db)
):
    user = db.query(User).get(User.id == user_id)
    return user
