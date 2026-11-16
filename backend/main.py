
from fastapi import FastAPI
from routes.base_routes import router
from routes.auth_routes import router as auth_router
from routes.community_auth_routes import router as community_auth_router
from routes.community_profile_routes import router as community_profile_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="TVS Community Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(router)
app.include_router(auth_router)
app.include_router(community_auth_router)
app.include_router(community_profile_router)