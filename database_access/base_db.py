from abc import ABC, abstractmethod


class BaseDb(ABC):
    @abstractmethod
    def get_all(self, options):
        pass

    @abstractmethod
    def find_one(self, options):
        pass

    @abstractmethod
    def delete_one(self, options):
        pass

    @abstractmethod
    def delete_multiple(self, options):
        pass

    @abstractmethod
    def insert_one(self, item):
        pass

    @abstractmethod
    def insert_multiple(self, items):
        pass
