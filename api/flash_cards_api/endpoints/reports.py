from sqlalchemy.orm import Session

from flash_cards_api.database import get_db

from pydantic.main import BaseModel

from typing import Optional


from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from flash_cards_api.models.reports import Reports
from flash_cards_api.models.deck_of_flash_cards import Deck
import uuid

router = APIRouter(prefix="/reports", tags=["reports"])


class ReportModel(BaseModel):
    deck_id: uuid.UUID
    submitter_email: Optional[str] = None


@router.get("/reported_decks", status_code=status.HTTP_200_OK)
async def read_all_reported_decks(db: Session = Depends(get_db)):
    """Return all reported decks"""

    reported_deck_ids = db.query(Reports.deck_id).distinct().all()


    deck_ids = [report.deck_id for report in reported_deck_ids]


    decks = db.query(Deck).filter(Deck.id.in_(deck_ids)).all()

    if not decks:
        raise HTTPException(status_code=404, detail="No decks found")

    result = []
    for deck in decks:
        result.append({
            "id": deck.id,
            "title": deck.title,
            "description": deck.description
        })

    return result

@router.post("/add_reported_deck", status_code=status.HTTP_201_CREATED)
async def create_reported_deck(
        report: ReportModel,
        db: Session = Depends(get_db)
):
    """Create a new flash card"""
    report_model = Reports(**report.dict())
    db.add(report_model)
    db.commit()
    db.refresh(report_model)
    return report_model

@router.delete("/delete_reported_deck_from_list{deck_id}")
async def delete_flash_card(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Delete deck from report table """
    deck = db.query(Reports).filter(Reports.deck_id == deck_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(Reports).filter(Reports.deck_id == deck_id).delete()
    db.commit()



