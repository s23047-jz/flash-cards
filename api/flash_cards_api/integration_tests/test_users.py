import requests

ENDPOINT = "http://localhost:8000/"


def test_post_create_user():
    body = {
        "email": "string5",
        "password": "string",
        "username": "string5",
        "re_password": "string"
    }

    response = requests.post(ENDPOINT + "api/auth/register", json=body)
    assert response.status_code == 201


def test_post_login():
    body = {
        "email": "string",
        "password": "string",
    }

    response = requests.post(ENDPOINT + "api/auth/login", json=body)
    assert response.status_code == 200


def test_get_users():

    response = requests.get(ENDPOINT + "api/users")
    assert response.status_code == 401


def test_get_me():

    response = requests.get(ENDPOINT + "api/users/me")

    assert response.status_code == 401
