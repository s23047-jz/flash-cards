from sqlalchemy.orm import Session

from flash_cards_api.database import get_db

from pydantic.main import BaseModel

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from flash_cards_api.models.flash_card import FlashCard
from flash_cards_api.models.deck_of_flash_cards import Deck
from flash_cards_api.dependencies.role import RoleAccessChecker
from flash_cards_api.models.roles import UserRoles
import uuid

router = APIRouter(prefix="/decs", tags=["authentication"])


class DeckCreate(BaseModel):
    title: str
    deck_category: str


class DeckUpdate(DeckCreate):
    is_deck_public: bool
    downloads: int


# @router.get("/flash_card/{flash_card_id}", status_code=status.HTTP_200_OK)
# async def read_flash_card_by_id(flash_card_id: str, db: Session = Depends(get_db)):
#     """Return flash card by id"""
#     flash_card = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()
#
#     if flash_card is not None:
#         return flash_card
#     raise HTTPException(status_code=404, detail="Flash card not found")
#

# class DeckDetailsResponse(BaseModel):
#     pass

@router.get("/{deck_id}", status_code=status.HTTP_200_OK)
async def read_deck_by_id(
        deck_id: str,
        db: Session = Depends(get_db)
):
    """Return deck by id"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()

    if deck is not None:
        return deck
    raise HTTPException(status_code=404, detail="Deck not found")


@router.post("/create_deck", status_code=status.HTTP_201_CREATED)
async def create_deck(
    deck: DeckCreate,
    db: Session = Depends(get_db)
):
    """Create a new deck"""
    deck_model = Deck(**deck.dict())
    db.add(deck_model)
    db.commit()
    db.refresh(deck_model)  # Refresh to get the updated data from the database
    return deck_model


@router.put("/update_deck/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_deck(
    deck: DeckUpdate,
    deck_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    deck_model = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck_model is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    deck_model.title = deck.title
    deck_model.deck_category = deck.deck_category
    deck_model.is_deck_public = deck.is_deck_public
    deck_model.downloads = deck.downloads

    db.add(deck_model)
    db.commit()


@router.delete("/delete_deck/{delete_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_deck(
    delete_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    """Delete deck"""
    deck = db.query(Deck).filter(Deck.id == delete_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(Deck).filter(Deck.id == delete_id).delete()
    db.commit()
