import os
import requests
from typing import List
from pydantic import BaseModel

from fastapi import (
    APIRouter,
    status,
    HTTPException
)

router = APIRouter(prefix="/chat_gpt", tags=["chat_gpt"])

class Message(BaseModel):
    role: str
    content: str

class RequestBody(BaseModel):
    model: str
    messages: List[Message]


@router.post("/chat", status_code=status.HTTP_201_CREATED)
async def create_flash_card(body: RequestBody):
    chat_api_key = os.environ.get('KEY_GPT')
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {chat_api_key}',
    }

    url = 'https://api.openai.com/v1/chat/completions'
    print(body)
    try:
        response = requests.post(url, json=body.dict(), headers=headers)
        response.raise_for_status()

        response_data = response.json()
        chat_answer = response_data['choices'][0]['message']['content']
        print(chat_answer)
        return chat_answer
    except requests.RequestException as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Failed to connect with chatGPT: {e}")
