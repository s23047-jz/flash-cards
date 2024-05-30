from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
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

from flash_cards_api.models.flash_card import FlashCard
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

    result = []
    for deck in decks:
        reports_for_deck = db.query(Reports).filter(Reports.deck_id == deck.id).all()
        if reports_for_deck:
            first_submitter = reports_for_deck[0].submitter_email
        else:
            first_submitter = None

        result.append({
            "id": deck.id,
            "title": deck.title,
            "deck_category": deck.deck_category,
            "submitter": first_submitter
        })

    return result


@router.post("/add_reported_deck", status_code=status.HTTP_201_CREATED)
async def reporte_deck(
        report: ReportModel,
        db: Session = Depends(get_db)
):
    """Report deck"""
    report_model = Reports(**report.dict())

    result = db.execute(select(Reports).filter_by(deck_id=report_model.deck_id))
    existing_report = result.scalars().first()
    if existing_report:
        raise HTTPException(status_code=400, detail="Deck already reported")

    try:
        db.add(report_model)
        db.commit()
        db.refresh(report_model)
    except IntegrityError as e:
        db.rollback()  # Roll back the transaction where the error occurred
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return report_model


@router.delete("/delete_reported_deck/{deck_id}")
async def delete_deck(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Delete deck from reported list not from deck table"""
    deck = db.query(Reports).filter(Reports.deck_id == deck_id).first()
    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(Reports).filter(Reports.deck_id == deck_id).delete()
    db.commit()

@router.delete("/delete_reported_deck_from_app/{deck_id}")
async def delete_deck(
        deck_id: uuid.UUID,
        db: Session = Depends(get_db)
):
    """Delete deck from app"""
    deck_reports = db.query(Reports).filter(Reports.deck_id == deck_id).first()
    deck = db.query(Deck).filter(Deck.id == deck_id).first()

    if deck is None:
        raise HTTPException(status_code=404, detail="Deck not found")
    if deck_reports is None:
        raise HTTPException(status_code=404, detail="Deck not found")

    db.query(Reports).filter(Reports.deck_id == deck_id).delete()

    db.query(FlashCard).filter(FlashCard.deck_id == deck_id).delete()
    db.query(Deck).filter(Deck.id == deck_id).delete()
    db.commit()
