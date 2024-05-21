import requests

ENDPOINT = "http://localhost:8000/"

def test_post_create_deck():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }

    response = requests.post(ENDPOINT + "decks/create_deck", json=body)
    assert response.status_code == 201


def test_delete_deck():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    deck = requests.post(ENDPOINT + "decks/create_deck", json=body)
    deck_id = deck.json()['id']
    response = requests.delete(ENDPOINT + f"decks/delete_deck/{deck_id}", json=body)
    assert response.status_code == 200


def test_get_deck_by_id():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    deck = requests.post(ENDPOINT + "decks/create_deck", json=body)
    deck_id = deck.json()['id']
    response = requests.get(ENDPOINT + f"decks/{deck_id}", json=body)
    assert response.status_code == 200


def test_get_all_user_decks():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    response = requests.get(ENDPOINT + f"decks/{body['user_id']}/decks", json=body)
    assert response.status_code == 200


def test_get_all_user_imported_decks():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    response = requests.get(ENDPOINT + f"decks/{body['user_id']}/imported/decks", json=body)
    assert response.status_code == 200


def test_get_decks_ranking():
    response = requests.get(ENDPOINT + f"decks/decks_ranking/")
    assert response.status_code == 200


def test_put_update_deck():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    deck = requests.post(ENDPOINT + "decks/create_deck", json=body)
    deck_id = deck.json()['id']

    updated_deck = {
        "user_id": f"{deck_id}",
        "title": "string",
        "deck_category": "string",
        "is_deck_public": True,
        "downloads": 0
    }
    response = requests.put(ENDPOINT + f"decks/update_deck/{deck_id}", json=updated_deck)
    assert response.status_code == 200


def test_put_update_deck_is_deck_public():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    deck = requests.post(ENDPOINT + "decks/create_deck", json=body)
    deck_id = deck.json()['id']

    updated_deck = {
        "is_deck_public": True,
    }
    response = requests.put(ENDPOINT + f"decks/update_deck/is_public/{deck_id}", json=updated_deck)
    assert response.status_code == 200


def test_put_update_deck_title_category():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }
    deck = requests.post(ENDPOINT + "decks/create_deck", json=body)
    deck_id = deck.json()['id']

    updated_deck = {
        "title": "string update",
        "deck_category": "string update"
    }
    response = requests.put(ENDPOINT + f"decks/update_deck/category_and_title/{deck_id}", json=updated_deck)
    assert response.status_code == 200
