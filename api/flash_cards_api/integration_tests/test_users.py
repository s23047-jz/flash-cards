import pytest
from starlette.testclient import TestClient
from flash_cards_api.app import app
from flash_cards_api.database import get_db

# Fixture Pytest do utworzenia klienta testowego
@pytest.fixture
def test_client():
    with TestClient(app) as client:
        yield client

# Testy dla endpointu /register/
def test_successful_registration(test_client):
    payload = {
        "email": "test@example.com",
        "username": "testuser",
        "password": "password123",
        "re_password": "password123"
    }
    response = test_client.post("/register/", json=payload)
    assert response.status_code == 201
    assert response.json() == {"detail": "User added successfully"}

def test_duplicate_email(test_client):
    # Użyj istniejącego adresu e-mail
    payload = {
        "email": "existing@example.com",
        "username": "newuser",
        "password": "password123",
        "re_password": "password123"
    }
    response = test_client.post("/register/", json=payload)
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already taken"}

def test_duplicate_username(test_client):
    # Użyj istniejącej nazwy użytkownika
    payload = {
        "email": "new@example.com",
        "username": "existinguser",
        "password": "password123",
        "re_password": "password123"
    }
    response = test_client.post("/register/", json=payload)
    assert response.status_code == 400
    assert response.json() == {"detail": "Username already taken"}

def test_password_mismatch(test_client):
    # Hasła nie pasują do siebie
    payload = {
        "email": "mismatch@example.com",
        "username": "mismatchuser",
        "password": "password123",
        "re_password": "differentpassword"
    }
    response = test_client.post("/register/", json=payload)
    assert response.status_code == 400
    assert response.json() == {"detail": "Passwords do not match"}