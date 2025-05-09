import asyncio
import click
from functools import wraps

from flash_cards_api.models import Base
from flash_cards_api.database import engine
from flash_cards_api.utils.fixtures import (
    inject_users,
    inject_decks
)


def get_models():
    from flash_cards_api.models.users import User
    from flash_cards_api.models.token import Token, Blacklist_Tokens
    from flash_cards_api.models.flash_card import FlashCard
    from flash_cards_api.models.deck_of_flash_cards import Deck
    from flash_cards_api.models.reports import Reports

    return (
        Token,
        Blacklist_Tokens,
        User,
        FlashCard,
        Deck,
        Reports
    )


def coroutine(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return asyncio.get_event_loop().run_until_complete(func(*args, **kwargs)) # noqa

    return wrapper


@click.group()
def cli():
    """
    CLI for Flash Cards
    """


@cli.command("database_defaults")
@coroutine
@click.option("--fixtures", is_flag=True, default=False)
@click.option("--clear_database", is_flag=True, default=False)
async def database_defaults(fixtures, clear_database):
    try:
        if clear_database:
            click.echo("Dropping all tables...!")
            get_models()

            Base.metadata.drop_all(engine)
            Base.metadata.create_all(engine)

            click.echo("New tables created successfully!")
        if fixtures:
            await inject_users()
            await inject_decks()

    except Exception as e:
        print("Failed in database_defaults", str(e))


if __name__ == "__main__":
    cli()
