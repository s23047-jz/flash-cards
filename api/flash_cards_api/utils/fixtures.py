import json
import os

from flash_cards_api.config import FIXTURES_DIR
from flash_cards_api.database import Session
from flash_cards_api.models.users import User, get_password_hash
from flash_cards_api.models.deck_of_flash_cards import Deck


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


async def inject_decks():
	db = Session()
	users_mails = [
		"jacob@flashcards.com",
		"user@flashcards.com",
		"oliwier@flashcards.com"
	]

	decks = read_json("decks.json")

	for index, user_mail in enumerate(users_mails):
		user = db.query(User.id).where(User.email == user_mail).first()
		for deck in decks[index]:
			new_deck = Deck(
				user_id=user.id,
				**deck
			)
			db.add(new_deck)

	db.commit()
