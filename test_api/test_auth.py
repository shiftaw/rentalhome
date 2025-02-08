import requests

url = "http://127.0.0.1:8000/auth"

new_user1 = {
    "email": "test@gmail.com",
    "name": "daniel",
    "password": "password",
    "is_owner": True,
}
new_user = {
    "email": "samra@gmail.com",
    "name": "Samra",
    "password": "password",
    "is_owner": True,
}

# Headers (Ensure JSON format)
headers = {"Content-Type": "application/json"}
# print(requests.post(f'{url}/register', json=new_user).json())
# print(requests.get(f'{url}/test').json())


# Login Daniel
data = {"email": "test@gmail.com", "password": "password"}
print(requests.post(f"{url}/login", json=data).json())
