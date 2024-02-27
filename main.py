import uvicorn
import api

from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from api import (
    get_db,
    engine
)
from fastapi import (
    FastAPI,
    Depends,
)
from api import (
    WEBHOST,
    BACKEND_HOST,
    BACKEND_PORT
)
from api import (
    catch_exception_middleware,
    jwt_middleware,
    security_headers_middleware
)


def create_app() -> FastAPI:
    app = FastAPI()

    app.middleware('http')(catch_exception_middleware)
    app.middleware('http')(jwt_middleware)
    app.middleware('http')(security_headers_middleware)

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
api.models.metadata.create_all(bind=engine)
db_dependency = Annotated[Session, Depends(get_db)]


@app.on_event("startup")
def register_routers():
    from api.flash_cards_api.endpoints import auth

    app.include_router(auth.router)


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