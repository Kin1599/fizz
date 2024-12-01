import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth.router import router as auth_router
from .users.router import router as users_router
from .cards.router import router as cards_router
from .transactions.router import router as transactions_router
from .custom_groups.router import router as custom_groups_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="FinFairyAPI",
    root_path="/api"
)

origins = os.getenv("ORIGINS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#* ROUTERS
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(cards_router)
app.include_router(transactions_router)
app.include_router(custom_groups_router)
