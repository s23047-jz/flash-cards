import requests

ENDPOINT = "http://localhost:8000/"

def test_chatGPT_connection():

    body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": "Hello Chat"}
        ]
    }

    response = requests.post(ENDPOINT + "chat_gpt/chat", json=body)
    assert response.status_code == 201
