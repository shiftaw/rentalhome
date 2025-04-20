import requests

# print(requests.get('http://localhost:8000').json())
print(requests.get("http://localhost:8000/test/test").json())
# print(requests.put('http://localhost:8000/items/4?name=KENZIE').json())
##print(requests.get('http://localhost:8000/items?name=Hammer').json())
url = "http://127.0.0.1:8000/auth"
