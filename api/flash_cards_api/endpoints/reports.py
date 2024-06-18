from sqlalchemy import select, distinct, func, or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from flash_cards_api.database import get_db

from pydantic.main import BaseModel

from typing import Optional, List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Request
)

from flash_cards_api.models.flash_card import FlashCard
from flash_cards_api.models.reports import Reports
from flash_cards_api.models.deck_of_flash_cards import Deck
from flash_cards_api.models.users import User
import uuid



router = APIRouter(prefix="/reports", tags=["reports"])


class ReportModel(BaseModel):
    deck_id: uuid.UUID
    submitter_email: Optional[str] = None


class ReportResponseModel(ReportModel):
    deck_category: str
    title: str


class ReportResponse(BaseModel):
    reports: List[ReportResponseModel]
    total: int


@router.get(
    "/", status_code=status.HTTP_200_OK, response_model=ReportResponse
)
async def get_reported_decks_list(
    request: Request,
    db: Session = Depends(get_db)
):
    """Return all reported decks"""

    query_params = request.query_params

    page = query_params.get("page", None)
    per_page = query_params.get("per_page", None)
    search = query_params.get("search", None)

    q = db.query(
        Reports.deck_id,
        Deck.deck_category,
        Deck.title,
        Reports.submitter_email
    ).select_from(
        Reports
    ).join(
        Deck,
        Deck.id == Reports.deck_id
    )

    if search:
        q = q.filter(
            or_(
                func.lower(Deck.title).ilike(f"%{search.lower()}%"),
                func.lower(Deck.deck_category).ilike(f"%{search.lower()}%")
            )
        )

    q = q.order_by(Reports.deck_id)
    total = len(q.all())

    if page and per_page:
        if isinstance(page, str) or isinstance(per_page, str):
            page = int(page)
            per_page = int(per_page)

        offset = (page - 1) * per_page
        q = q.limit(per_page).offset(offset)

    reports = [
        {
            "deck_id": report.deck_id,
            "deck_category": report.deck_category,
            "title": report.title,
            "submitter_email": report.submitter_email
        }
        for report in q.all()
    ]

    return ReportResponse(reports=reports, total=total)


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
            "deck_id": deck.id,
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


@router.delete("/delete_user/{user_id}")
async def delete_user(
        user_id: uuid.UUID,
        db: Session = Depends(get_db)
):

    user_to_delete = db.query(User).filter(User.id == user_id).first()

    if user_to_delete is None:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        db.delete(user_to_delete)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="An error occurred while deleting the user")


