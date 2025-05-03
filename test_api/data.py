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

url = "https://rentalhome-i7wr.onrender.com/"
url = "http://127.0.0.1:8000/"
auth_url = f"{url}/api/auth"
login_url = f"{auth_url}/login"
register_url = f"{auth_url}/register"
message_url = f"{url}/message/message"
