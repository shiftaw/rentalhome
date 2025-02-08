import requests
daniel_id ="679e681a3b1402b60d920c80"
samra_access_token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc5ZThhOTdlNzUyNWZkM2NjMjNlYWE2IiwiZXhwIjoxNzM4NDQ3MDcyfQ.JTExn4LzY5NmG_dV0hiegM0Gtwrjhhinl8BIrTRTpPo'
daniel_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc5ZTY4MWEzYjE0MDJiNjBkOTIwYzgwIiwiZXhwIjoxNzM4NDQ4Mzg0fQ.HL3JM8JtYhLaBcDByJMglzcT9oINkw2EcnWMO9vB9js'

message = {
     "receiver_id": daniel_id,
    "content": "test mesage"
}

url = 'http://localhost:8000/messages/messages?token='

# Send message to daniel
#print(requests.post(f'{url}{samra_access_token}',json=message,).json()) 

# read daniel messages

print(requests.get(f'{url}{daniel_token}').json())

