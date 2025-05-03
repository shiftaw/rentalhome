
import requests


def send_message(message):
    token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjgwZmU5NDRkOGE0NDlmYjFhYjdkM2I0IiwiZXhwIjoxNzQ2MzA5ODUzfQ.4bK6ot7OOACdhqNjpJOIJpuNPwKN0aOhhJS9gynCacY'

    headers = {
        "Authorization": f"Bearer {token}"
    }
    requests.post('http://127.0.0.1:8000/api/messages/send',json=message,headers=headers).json()


def get_conversations(id):
    print(id)
    conversations = requests.get(f'http://127.0.0.1:8000/api/messages/conversations/{id}').json()
    print(conversations)



if  __name__ =="__main__":
    msg = {
    "receiver_id": "681386b4d9f3175ea24ee881",
    "content": "Test message",
}
    #send_message(msg)
    get_conversations('680fe944d8a449fb1ab7d3b4')