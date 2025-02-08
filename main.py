from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, message  # properties, bookings, payments, messages
from database import client  # MongoDB Connection

# Initialize FastAPI App
app = FastAPI(title="House Rent API", version="1.0")

# Enable CORS for frontend requests (React/Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow frontend to access backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers (APIs)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
# app.include_router(properties.router, prefix="/properties", tags=["Properties"])
# app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
# app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(message.router, prefix="/messages", tags=["Messages"])


# Root Endpoint (Health Check)
@app.get("/")
def home():
    return {"message": "Welcome to the House Rent API!"}
