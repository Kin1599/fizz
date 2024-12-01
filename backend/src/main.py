
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth.router import router as auth_router
from .users.router import router as users_router
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
