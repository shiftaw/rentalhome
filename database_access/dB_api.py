import json

from bson import ObjectId  # bson = binary JSON, the data format used by MongoDB
from pymongo.collection import Collection

from database_access.base_db import BaseDb
from utils.logger import logger


class MyJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)  # this will return the ID as a string
        return json.JSONEncoder.default(self, o)


class Db_api(BaseDb):
    def __init__(self, collection: Collection):
        self.collection = collection
        self.json_encoder = MyJSONEncoder().encode

    def get_all(self, options={}):
        result = self.collection.find(options).to_list()
        return self.json_encoder(result)

    def find_one(self, options):
        result = self.collection.find_one(options)
        return self.json_encoder(result)

    def insert_multiple(self, item):
        pass

    def insert_one(self, item):
        result = self.collection.insert_one(item)
        if result.inserted_id:
            logger.info("✅  Database insert success %s ", result.inserted_id)
        else:
            logger.error("Database insert failed %s", result)
        return result.inserted_id

    def delete_multiple(
        self,
        options,
    ):
        pass

    def delete_one(self, options):
        pass
