import time
import os
from starlette.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse,RedirectResponse
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routers import (  # properties, bookings, payments, messages
    auth,
    message,
    rent,
    country,
)

# Initialize FastAPI App
from utils.logger import logger

app = FastAPI(title="House Rent API", version="1.0")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    # Log Request
    body = await request.body()
    """ logger.info(
        f"Incoming request: {request.method} {request.url}\nHeaders: {request.headers}\nBody: {body.decode('utf-8') if body else 'No Body'}"
        )
        """
    # Process the request
    response = await call_next(request)

    # Log Response
    process_time = time.time() - start_time
    """ logger.info(
        f"Outgoing response: {response.status_code}\nHeaders: {response.headers}\nProcess Time: {process_time:.4f}s"
    ) """

    return response


@app.exception_handler(Exception)
async def global_exception(req: Request, wxc: Exception):
    logger.error("Unhandled exception")
    return JSONResponse(status_code=500, content={"message": "Internal server error"})


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow frontend to access backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/api/apartment", include_in_schema=False)
@app.get("/api/apartment/", include_in_schema=False)
def redirect_apartment():
    return RedirectResponse(url="/api/rent/type/Apartment")

@app.get("/api/house", include_in_schema=False)
@app.get("/api/house/", include_in_schema=False)
def redirect_house():
    return RedirectResponse(url="/api/rent/type/House")
# Register Routers (APIs)
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
# app.include_router(properties.router, prefix="/properties", tags=["Properties"])
# app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
# app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(message.router, prefix="/api/messages", tags=["Messages"])
app.include_router(rent.router, prefix="/api/rent", tags=["Rent"])
app.include_router(country.router, prefix="/api/country", tags=["country"])




# Path to Vite build
vite_build_path = os.path.join("booking-frontend", "dist")

# Serve static assets (JS, CSS, etc.)
app.mount("/assets", StaticFiles(directory=os.path.join(vite_build_path, "assets")), name="assets")
app.mount("/img", StaticFiles(directory=os.path.join(vite_build_path, "img")), name="assets")

# Serve the React/Vite index.html for all other routes
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    index_path = os.path.join(vite_build_path, "index.html")
    return FileResponse(index_path)