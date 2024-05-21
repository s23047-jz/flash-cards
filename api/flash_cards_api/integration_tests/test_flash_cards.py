import requests

ENDPOINT = "http://localhost:8000/"

def test_get_flashcard_data_by_id():
    test_flash_card_data = {
        "id": "3cc32d65-8cdc-4abc-a063-02e0bef78eaf",
        "deck_id": "93579120-180a-404f-880f-4ffab9f4ba33",
        "card_title": "test card",
        "card_text": "test card",
        "is_memorized": False
    }

    response = requests.get(ENDPOINT + f"flash_card/{test_flash_card_data['id']}", json=test_flash_card_data)
    assert response.status_code == 200


def test_post_create_flash_card():

    test_flash_card_data = {
        "deck_id": "93579120-180a-404f-880f-4ffab9f4ba33",
        "card_title": "test card",
        "card_text": "test card",
        "is_memorized": False
    }

    response = requests.post(ENDPOINT + f"flash_card/create_flash_card", json=test_flash_card_data)
    assert response.status_code == 201

def test_put_update_flash_cards():

    test_flash_card_data = [{
        "id": "3cc32d65-8cdc-4abc-a063-02e0bef78eaf",
        "card_title": "test card update",
        "card_text": "test card update",
        "is_memorized": False
    }]

    response = requests.put(ENDPOINT + "flash_card/update_flash_cards", json=test_flash_card_data)
    assert response.status_code == 204

def test_delete_update_flash_cards():
    test_flash_card_data = {
        "deck_id": "93579120-180a-404f-880f-4ffab9f4ba33",
        "card_title": "test card",
        "card_text": "test card",
        "is_memorized": False
    }

    response = requests.post(ENDPOINT + f"flash_card/create_flash_card", json=test_flash_card_data)
    data = response.json()
    response_delete = requests.delete(ENDPOINT + f"flash_card/delete_flash_card/{data['id']}", json=test_flash_card_data)
    assert response_delete.status_code == 200