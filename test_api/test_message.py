import requests

daniel_id = "679e681a3b1402b60d920c80"
samra_access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc5ZThhOTdlNzUyNWZkM2NjMjNlYWE2IiwiZXhwIjoxNzM4NDQ3MDcyfQ.JTExn4LzY5NmG_dV0hiegM0Gtwrjhhinl8BIrTRTpPo"
daniel_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc5ZTY4MWEzYjE0MDJiNjBkOTIwYzgwIiwiZXhwIjoxNzM4NDQ4Mzg0fQ.HL3JM8JtYhLaBcDByJMglzcT9oINkw2EcnWMO9vB9js"

message = {"receiver_id": daniel_id, "content": "test mesage"}

url = "http://localhost:8000/messages/messages"

# Send message to daniel
# print(requests.post(f'{url}?token={samra_access_token}',json=message,).json())

# delete message
message_id = "679e8ef6a037d7f53e2d6ffa"
# print(requests.delete(f'{url}/{message_id}?token={samra_access_token}').json())

# read daniel messages

print(requests.get(f"{url}?token={daniel_token}").json())
