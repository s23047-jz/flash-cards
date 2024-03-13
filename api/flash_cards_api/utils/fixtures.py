import json
import os

from flash_cards_api.config import FIXTURES_DIR
from flash_cards_api.database import Session
from flash_cards_api.models.users import User, get_password_hash


def read_json(file_name: str):
	with open(os.path.join(FIXTURES_DIR, file_name), 'r') as json_path:
		return json.load(json_path)


async def inject_users():
	users = read_json("users.json")
	db = Session()
	for user in users:
		password = user.pop('password')
		new_user = User(
			**user,
			password=get_password_hash(password)
		)
		db.add(new_user)
	db.commit()
