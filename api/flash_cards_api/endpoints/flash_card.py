from sqlalchemy.orm import Session

from flash_cards_api.database import get_db

from pydantic.main import BaseModel

from typing import Optional

from typing import List


from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from flash_cards_api.models.flash_card import FlashCard
import uuid

router = APIRouter(prefix="/flash_card", tags=["flash_cards"])


class FlashCardCreate(BaseModel):
    deck_id: uuid.UUID
    card_title: Optional[str] = None
    card_text: Optional[str] = None
    is_memorized: Optional[bool] = False


class FlashCardUpdate(BaseModel):
    id: uuid.UUID
    card_title: Optional[str] = None
    card_text: Optional[str] = None
    is_memorized: Optional[bool] = False

class FlashCardUpdateText(BaseModel):
    card_title: Optional[str] = None
    card_text: Optional[str] = None


@router.get("/{flash_card_id}", status_code=status.HTTP_200_OK)
async def read_flash_card_by_id(
        flash_card_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Return flash card by id"""
    flash_card = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()

    if flash_card is not None:
        return flash_card
    raise HTTPException(status_code=404, detail="Flash card not found")


@router.post("/create_flash_card", status_code=status.HTTP_201_CREATED)
async def create_flash_card(
        flash_card: FlashCardCreate,
        db: Session = Depends(get_db)
):
    """Create a new flash card"""
    flash_card_model = FlashCard(**flash_card.dict())
    db.add(flash_card_model)
    db.commit()
    db.refresh(flash_card_model)
    return flash_card_model


@router.put("/update_flash_card_text/{flash_card_id}")
async def update_flash_card_text(
    flash_card_id: uuid.UUID,
    flash_card_data: FlashCardUpdateText,
    db: Session = Depends(get_db)
):
    """
    Update a single flash card by its ID.
    """
    flash_card_model = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()

    if flash_card_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Flash card with ID {flash_card_id} not found"
        )

    if flash_card_data.card_title is not None:
        flash_card_model.card_title = flash_card_data.card_title
    if flash_card_data.card_text is not None:
        flash_card_model.card_text = flash_card_data.card_text

    db.commit()

@router.put("/update_flash_cards", status_code=status.HTTP_204_NO_CONTENT)
async def update_flash_cards(
    flash_cards_data: List[FlashCardUpdate],
    db: Session = Depends(get_db)
):
    "Update multiple flashcards"
    for flash_card in flash_cards_data:
        flash_card_model = db.query(FlashCard).filter(FlashCard.id == flash_card.id).first()
        if flash_card_model is None:
            raise HTTPException(status_code=404, detail=f"Flash card with ID {flash_card.id} not found")

        if flash_card.card_title is not None:
            flash_card_model.card_title = flash_card.card_title
        if flash_card.card_text is not None:
            flash_card_model.card_text = flash_card.card_text

        flash_card_model.is_memorized = flash_card.is_memorized

    db.commit()

@router.put("/reset_flash_cards", status_code=status.HTTP_204_NO_CONTENT)
async def update_flash_cards(
    flash_cards_data: List[FlashCardUpdate],
    db: Session = Depends(get_db)
):
    "Update flash cards is_memorized as false"
    for flash_card in flash_cards_data:
        flash_card_model = db.query(FlashCard).filter(FlashCard.id == flash_card.id).first()
        if flash_card_model is None:
            raise HTTPException(status_code=404, detail=f"Flash card with ID {flash_card.id} not found")


        flash_card_model.is_memorized = False

    db.commit()

# @router.put("/update_flash_card/{flash_card_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def update_flash_card(
#         flash_card_id: uuid.UUID,
#         flash_card_data: FlashCardCreate,
#         db: Session = Depends(get_db)
# ):
#     "Update a flash card"
#     flash_card_model = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()
#     if flash_card_model is None:
#         raise HTTPException(status_code=404, detail="Flash card not found")
#
#     if flash_card_data.card_title is not None:
#         flash_card_model.card_title = flash_card_data.card_title
#     if flash_card_data.card_text is not None:
#         flash_card_model.card_text = flash_card_data.card_text
#     if flash_card_data.is_memorized is not None:
#         flash_card_model.is_memorized = flash_card_data.is_memorized
#
#     db.commit()


@router.delete("/delete_flash_card/{flash_card_id}")
async def delete_flash_card(
        flash_card_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Delete flash card"""
    deck = db.query(FlashCard).filter(FlashCard.id == flash_card_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(FlashCard).filter(FlashCard.id == flash_card_id).delete()
    db.commit()
