import uvicorn
import models

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from starlette import status
from models.flash_card import FlashCard
from models.deck_of_flash_cards import Deck
from models.users import User
from database import (
    get_db,
    engine
)
from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    Path
)
from config import (
    WEBHOST,
    BACKEND_HOST,
    BACKEND_PORT
)


def create_app() -> FastAPI:
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[WEBHOST],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"]
    )

    return app


app = create_app()
models.metadata.create_all(bind=engine)
db_dependency = Annotated[Session, Depends(get_db)]


@app.on_event("startup")
def register_routers():
    pass


@app.get("/flash_card/{flash_card_id}", status_code=status.HTTP_200_OK)
async def read_flash_card_by_id(db: db_dependency, flash_card_id: int = Path(gt=0)):
    """Return flash card by id"""
    flash_card = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()

    if flash_card is not None:
        return flash_card
    raise HTTPException(status_code=404, detail="Flash card not found")


@app.get("/deck/{deck_id}", status_code=status.HTTP_200_OK)
async def read_deck_by_id(db: db_dependency, deck_id: int = Path(gt=0)):
    """Return deck by id"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()

    if deck is not None:
        return deck
    raise HTTPException(status_code=404, detail="Deck not found")

@app.get("/user/{deck_id}", status_code=status.HTTP_200_OK)
async def read_user_by_id(db: db_dependency, user_id: int = Path(gt=0)):
    """Return user by id"""
    user = db.query(User).filter(User.id == user_id).first()

    if user is not None:
        return user
    raise HTTPException(status_code=404, detail="User not found")


def run_dev_server():
    uvicorn.run(
        app="main:app",
        host=BACKEND_HOST,
        port=BACKEND_PORT,
        reload=True,
        workers=4,
        reload_dirs=[]
    )


if __name__ == "__main__":
    run_dev_server()
