import uvicorn

from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from flash_cards_api.config import (
    WEBHOST,
    MOBILE_HOST,
    BACKEND_HOST,
    BACKEND_PORT
)
from flash_cards_api.utils.app import (
    catch_exception_middleware,
    jwt_middleware,
    security_headers_middleware,
)


def create_app() -> FastAPI:
    app = FastAPI()

    app.middleware('http')(catch_exception_middleware)
    app.middleware('http')(jwt_middleware)
    app.middleware('http')(security_headers_middleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[WEBHOST, MOBILE_HOST],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"]
    )

    return app


app = create_app()


@app.on_event("startup")
def register_routers():
    from flash_cards_api.endpoints import (
        auth,
        users,
        decs,
        flash_card,
        chat_gpt,
    )

    app.include_router(auth.router)
    app.include_router(users.router)
    app.include_router(decs.router)
    app.include_router(flash_card.router)
    app.include_router(chat_gpt.router)


def run_dev_server():
    uvicorn.run(
        app="flash_cards_api.app:app",
        host=BACKEND_HOST,
        port=BACKEND_PORT,
        reload=True,
        workers=4,
        reload_dirs=[]
    )


if __name__ == "__main__":
    run_dev_server()
