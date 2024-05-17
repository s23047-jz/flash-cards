from fastapi import Query
from flash_cards_api.models.flash_card import FlashCard

from typing import Optional, List, Dict, Any

from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from flash_cards_api.database import get_db

from pydantic.main import BaseModel

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from flash_cards_api.models.deck_of_flash_cards import Deck
from flash_cards_api.models.users import User
import uuid

router = APIRouter(prefix="/decks", tags=["decks"])


class DeckCreate(BaseModel):
    user_id: uuid.UUID
    title: Optional[str] = None
    deck_category: Optional[str] = None


class DeckUpdate(DeckCreate):
    is_deck_public: Optional[bool] = None
    downloads: Optional[int] = None

class DeckUpdateCategoryTitle(BaseModel):
    title: Optional[str] = None
    deck_category: Optional[str] = None

class DeckPublic(BaseModel):
    is_deck_public: Optional[bool] = None
@router.get("/{deck_id}", status_code=status.HTTP_200_OK)
async def read_deck_by_id(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Return deck by id"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()

    if deck is not None:
        return deck
    raise HTTPException(status_code=404, detail="Deck not found")


@router.get("/{user_id}/decks/", status_code=status.HTTP_200_OK)
async def read_decks_by_user_id(
        user_id: uuid.UUID,
        db: Session = Depends(get_db),
):
    """Return decks by user id"""
    user = db.query(User).filter(and_(User.id == user_id)).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    decks = user.decks
    decks_json = [
        {
            "id": deck.id,
            "title": deck.title,
            "deck_category": deck.deck_category,
            "number_of_cards": deck.get_number_of_flash_cards()
        }
        for deck in decks if deck.is_created_by_user
    ]

    return decks_json

@router.get("/{user_id}/imported/decks/", status_code=status.HTTP_200_OK)
async def read_imported_decks_by_user_id(
        user_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Return imported decks by user id"""
    user = db.query(User).filter(and_(User.id == user_id)).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    decks = user.decks
    decks_json = [
        {
            "id": deck.id,
            "title": deck.title,
            "deck_category": deck.deck_category,
            "number_of_cards": deck.get_number_of_flash_cards()
        }
        for deck in decks if not deck.is_created_by_user
    ]

    return decks_json


@router.get("/{user_id}/filtered_decks/", status_code=status.HTTP_200_OK)
async def read_filtered_decks_by_user_id(
        user_id: uuid.UUID,
        filter_string: str = Query(None),
        db: Session = Depends(get_db)
):
    """Return filtered decks by user id"""
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    filter_conditions = [
        (Deck.user_id == user_id),
    ]

    if filter_string:
        filter_conditions.append(
            or_(Deck.title.ilike(f"%{filter_string}%"), Deck.deck_category.ilike(f"%{filter_string}%")))

    decks = db.query(Deck).filter(*filter_conditions).all()

    decks_json = [
        {"id": deck.id, "title": deck.title, "deck_category": deck.deck_category,
         "number_of_cards": deck.get_number_of_flash_cards()}
        for deck in decks
    ]

    return decks_json


@router.get("/decks_ranking/", status_code=status.HTTP_200_OK)
async def read_decks(db: Session = Depends(get_db)):
    """Return decks sorted by downloads"""
    decks = db.query(Deck).filter(Deck.is_deck_public == True).order_by(Deck.downloads.desc()).all()
    decks_json = [
        {"id": deck.id, "title": deck.title, "deck_category": deck.deck_category,
         "number_of_cards": deck.get_number_of_flash_cards(), "ranking": index + 1}
        for index, deck in enumerate(decks)
    ]
    return decks_json




@router.get("/{deck_id}/flash_cards", status_code=status.HTTP_200_OK)
async def read_deck_cards_by_id(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):

    """Return all flash cards from deck"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    flashcards = deck.flash_card_relationship

    return [{"id": card.id, "title": card.card_title, "card text": card.card_text} for card in flashcards]


@router.get("/{deck_id}/memorized_flash_cards", status_code=status.HTTP_200_OK)
async def read_memorized_flash_cards_from_deck(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Return all memorized flash cards from a deck"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    memorized_flash_cards = [card for card in deck.flash_card_relationship if card.is_memorized]

    return [{
        "id": card.id,
        "title": card.card_title,
        "card text": card.card_text
    } for card in memorized_flash_cards]

@router.get("/{deck_id}/not_memorized_flash_cards", status_code=status.HTTP_200_OK)
async def read_not_memorized_flash_cards_from_deck(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Return all not memorized flash cards from a deck"""
    deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    memorized_flash_cards = [card for card in deck.flash_card_relationship if not card.is_memorized]

    return [{
        "id": card.id,
        "title": card.card_title,
        "card text": card.card_text
    } for card in memorized_flash_cards]
@router.post("/decks_ranking/filtered_decks/", status_code=status.HTTP_200_OK)
async def filter_decks(data: List[Dict[str, Any]], db: Session = Depends(get_db)):
    """Filter decks ranking based on title or category"""
    filtered_decks = []

    for item in data:
        title = item.get('title')
        category = item.get('deck_category')
        ranking = item.get('ranking')

        query = db.query(Deck).filter(Deck.is_deck_public == True)

        if title:
            query = query.filter(Deck.title.like(f"%{title}%"))

        if category:
            query = query.filter(Deck.deck_category == category)

        decks = query.order_by(Deck.downloads.desc()).all()

        if decks:
            for deck in decks:
                deck_json = {
                    "id": deck.id,
                    "title": deck.title,
                    "deck_category": deck.deck_category,
                    "number_of_cards": deck.get_number_of_flash_cards(),
                    "ranking": ranking
                }
                filtered_decks.append(deck_json)

    return filtered_decks
@router.post("/create_deck", status_code=status.HTTP_201_CREATED)
async def create_deck(
        deck: DeckCreate,
        db: Session = Depends(get_db)
):
    """Create a new deck"""
    deck_model = Deck(**deck.dict())
    db.add(deck_model)
    db.commit()
    db.refresh(deck_model)
    return deck_model

@router.post("/copy_deck/{deck_id}/{user_id}", status_code=status.HTTP_201_CREATED)
async def copy_deck(
    deck_id: uuid.UUID,
    user_id: uuid.UUID,
    db: Session = Depends(get_db)
):
    """Copy deck without modifying the original"""
    original_deck = db.query(Deck).filter(Deck.id == deck_id).first()
    if original_deck is None:
        raise HTTPException(status_code=404, detail="Original deck not found")

    copied_deck = Deck(
        user_id=user_id,
        title=original_deck.title,
        deck_category=original_deck.deck_category,
        is_deck_public=False,
        is_created_by_user=False
    )
    db.add(copied_deck)
    db.commit()
    db.refresh(copied_deck)

    for original_flash_card in original_deck.flash_card_relationship:
        copied_flash_card = FlashCard(
            deck_id=copied_deck.id,
            card_title=original_flash_card.card_title,
            card_text=original_flash_card.card_text,
            is_memorized=False
        )
        db.add(copied_flash_card)

    db.commit()

    return copied_deck

@router.put("/update_deck/{deck_id}")
async def update_deck(
        deck_id: uuid.UUID,
        deck_data: DeckUpdate,
        db: Session = Depends(get_db)
):
    deck_model = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck_model is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    if deck_data.title is not None:
        deck_model.title = deck_data.title
    if deck_data.deck_category is not None:
        deck_model.deck_category = deck_data.deck_category
    if deck_data.is_deck_public is not None:
        deck_model.is_deck_public = deck_data.is_deck_public
    if deck_data.downloads is not None:
        deck_model.downloads = deck_data.downloads

    db.commit()

@router.put("/update_deck/category_and_title/{deck_id}")
async def update_deck_title_category(
        deck_id: uuid.UUID,
        deck_data: DeckUpdateCategoryTitle,
        db: Session = Depends(get_db)
):
    """Update deck category and name"""
    deck_model = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck_model is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    if deck_data.title is not None:
        deck_model.title = deck_data.title
    if deck_data.deck_category is not None:
        deck_model.deck_category = deck_data.deck_category

    db.commit()

@router.put("/update_deck/is_public/{deck_id}")
async def update_deck_is_public(
        deck_id: uuid.UUID,
        deck_data: DeckPublic,
        db: Session = Depends(get_db)
):
    deck_model = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck_model is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    if deck_data.is_deck_public is not None:
        deck_model.is_deck_public = deck_data.is_deck_public


    db.commit()

@router.put("/update_deck/flashcards_is_memorized/{deck_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_deck_is_memorized_false(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Update all flashcards is_memorized column  in the deck as false"""
    deck_model = db.query(Deck).filter(Deck.id == deck_id).first()
    if deck_model is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(FlashCard).filter(FlashCard.deck_id == deck_id).update({FlashCard.is_memorized: False})
    db.commit()


@router.delete("/delete_deck/{delete_id}")
async def delete_deck(
        delete_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Delete deck and all flash cards associated with it"""
    deck = db.query(Deck).filter(Deck.id == delete_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(FlashCard).filter(FlashCard.deck_id == delete_id).delete()

    db.query(Deck).filter(Deck.id == delete_id).delete()
    db.commit()
