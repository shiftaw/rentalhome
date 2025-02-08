from pymongo import MongoClient
import os
import logging

# Configure Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = "houserent"

try:
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    
    # Log Success Message
    logger.info(f"✅ Connected to MongoDB at {MONGO_URI}")
except Exception as e:
    logger.error(f"❌ Failed to connect to MongoDB: {str(e)}")
    raise e
db = client["houserent"]
users_collection = db["users"]
properties_collection = db["properties"]
bookings_collection = db["bookings"]
payments_collection = db["payments"]
messages_collection = db["messages"]
