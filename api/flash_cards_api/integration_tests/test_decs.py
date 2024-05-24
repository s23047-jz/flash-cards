import requests
from flash_cards_api.dependencies.auth import get_current_user


ENDPOINT = "http://localhost:8000/"


def get_user_data():

    user_body = {
        "email": "string10",
        "password": "string10",
        "username": "string10",
        "re_password": "string10"
    }

    requests.post(ENDPOINT + "api/auth/register/", json=user_body)

    user_login = {
        "email": "string10",
        "password": "string10",
    }

    response = requests.post(ENDPOINT + "api/auth/login/", json=user_login)

    token = response.json()["token_data"]["access_token"]

    headers = {
        "Authorization": f"Bearer {token}",
    }

    user = requests.get(ENDPOINT + "api/users/me", headers=headers)

    return user.json(), token

user, token = get_user_data()

def test_post_create_deck():
    user_body = {
        "email": "string10",
        "password": "string10",
        "username": "string10",
        "re_password": "string10"
    }

    requests.post(ENDPOINT + "api/auth/register/", json=user_body)

    user_login = {
        "email": "string10",
        "password": "string10",
    }
    response = requests.post(ENDPOINT + "api/auth/login/", json=user_login)
    token = response.json()["token_data"]["access_token"]

    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    response = requests.post(ENDPOINT + "decks/create_deck", json=body, headers=headers)
    assert response.status_code == 201


def test_delete_deck():
    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }
    headers = {
        "Authorization": f"Bearer {token}",
    }

    deck = requests.post(ENDPOINT + "decks/create_deck", json=body , headers=headers)
    deck_id = deck.json()['id']
    response = requests.delete(ENDPOINT + f"decks/delete_deck/{deck_id}", json=body , headers=headers)
    assert response.status_code == 200


def test_get_deck_by_id():
    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    deck = requests.post(ENDPOINT + "decks/create_deck", json=body, headers=headers)
    deck_id = deck.json()['id']
    response = requests.get(ENDPOINT + f"decks/{deck_id}", json=body, headers=headers)
    assert response.status_code == 200


def test_get_all_user_decks():
    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    response = requests.get(ENDPOINT + f"decks/{body['user_id']}/decks", json=body, headers=headers)
    assert response.status_code == 200


def test_get_all_user_imported_decks():
    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    response = requests.get(ENDPOINT + f"decks/{body['user_id']}/imported/decks", json=body, headers=headers)
    assert response.status_code == 200


def test_get_decks_ranking():
    headers = {
        "Authorization": f"Bearer {token}",
    }
    response = requests.get(ENDPOINT + f"decks/decks_ranking/", headers=headers)
    assert response.status_code == 200


def test_put_update_deck():
    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    deck = requests.post(ENDPOINT + "decks/create_deck", json=body, headers=headers)
    deck_id = deck.json()['id']

    updated_deck = {
        "user_id": f"{deck_id}",
        "title": "string",
        "deck_category": "string",
        "is_deck_public": True,
        "downloads": 0
    }
    response = requests.put(ENDPOINT + f"decks/update_deck/{deck_id}", json=updated_deck, headers=headers)
    assert response.status_code == 200


def test_put_update_deck_is_deck_public():
    body = {
        "user_id": "f6f5ddb0-38f6-42a9-bfd1-fe3e0cfc8ead",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    deck = requests.post(ENDPOINT + "decks/create_deck", json=body, headers=headers)
    deck_id = deck.json()['id']

    updated_deck = {
        "is_deck_public": True,
    }
    response = requests.put(ENDPOINT + f"decks/update_deck/is_public/{deck_id}", json=updated_deck, headers=headers)
    assert response.status_code == 200


def test_put_update_deck_title_category():
    body = {
        "user_id": f"{user['id']}",
        "title": "string",
        "deck_category": "string"
    }

    headers = {
        "Authorization": f"Bearer {token}",
    }

    deck = requests.post(ENDPOINT + "decks/create_deck", json=body, headers=headers)
    deck_id = deck.json()['id']

    updated_deck = {
        "title": "string update",
        "deck_category": "string update"
    }
    response = requests.put(ENDPOINT + f"decks/update_deck/category_and_title/{deck_id}", json=updated_deck, headers=headers)
    assert response.status_code == 200
