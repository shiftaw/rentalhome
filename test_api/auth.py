import logging

import requests
from data import login_url, register_url

# Configure Logging
logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s"
)
logging.getLogger(__name__)


def login(user):
    logging.debug("Login with user credential  %s", user)
    response = requests.post(
        login_url, json={"email": user["email"], "password": user["password"]}
    ).json()
    logging.debug("user token  %s", response)

    return response


def register(new_user):
    logging.debug("Creating new user %s", new_user)
    response = requests.post(register_url, json=new_user).json()
    return response


if __name__ == "__main__":
   login({"email":"samra@gmail.com","password":"password"})
