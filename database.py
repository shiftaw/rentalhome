import logging
import os
from pymongo import MongoClient, ASCENDING

from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()


# Configure Logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Load MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# print('MONGO_URI ', MONGO_URI)
DATABASE_NAME = "houserent"

try:
    # Connect to MongoDB
    client = MongoClient(MONGO_URI, tls=True)
    db = client[DATABASE_NAME]
    # Log Success Message
    logger.info(f"✅ Connected to MongoDB at {MONGO_URI}")
except Exception as e:
    logger.error(f"❌ Failed to connect to MongoDB: {str(e)}")
    raise e
users_collection = db["users"]
properties_collection = db["properties"]
bookings_collection = db["bookings"]
payments_collection = db["payments"]
messages_collection = db["messages"]
rent_collection = db["rent"]
places = db['places']

# Create UNIQUE index on city + country
places.create_index(
    [("city", ASCENDING), ("country", ASCENDING)],
    unique=True
)
