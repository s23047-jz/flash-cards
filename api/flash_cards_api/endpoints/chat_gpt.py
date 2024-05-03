import os
import requests

from fastapi import (
    APIRouter,
    status
)

router = APIRouter(prefix="/chat_gpt", tags=["chat_gpt"])

@router.post("/{message}/chat", status_code=status.HTTP_201_CREATED)
async def create_flash_card(
        message: str,
):
    chat_api_key = os.environ.get('KEY_GPT')
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chat_api_key}',
    }

    body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": f"{message}"}
        ]
    }

    url = 'https://api.openai.com/v1/chat/completions'
    response = requests.post(url, json=body, headers=headers)

    response_data = response.json()
    chat_answer = response_data['choices'][0]['message']['content']

    return chat_answer
