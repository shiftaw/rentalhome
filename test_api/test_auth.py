import requests

url = "https://rentalhome-i7wr.onrender.com/auth"
#url ="https://127.0.0.1:8000/auth"

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
data = {"email": "samra@gmail.com", "password": "password"}
response = requests.post(f"{url}/login", json=data)
print("Status Code:", response.status_code)
print("Response Text:", response.text)
