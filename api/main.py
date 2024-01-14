import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import (
    WEBHOST,
    BACKEND_HOST,
    BACKEND_PORT,
    API_DIR
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


@app.on_event("startup")
def register_routers():
    pass


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
