from sqlalchemy.orm import Session

from database import get_db

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from models.flash_card import FlashCard
from models.deck_of_flash_cards import Deck


router = APIRouter(prefix="/auth", tags=["authentication"])


@router.get("/flash_card/{flash_card_id}", status_code=status.HTTP_200_OK)
async def read_flash_card_by_id(flash_card_id: str, db: Session = Depends(get_db)):
    """Return flash card by id"""
    flash_card = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()

    if flash_card is not None:
        return flash_card
    raise HTTPException(status_code=404, detail="Flash card not found")


@router.get("/deck/{deck_id}", status_code=status.HTTP_200_OK)
async def read_deck_by_id(deck_id: str, db: Session = Depends(get_db)):
    """Return deck by id"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()

    if deck is not None:
        return deck
    raise HTTPException(status_code=404, detail="Deck not found")
