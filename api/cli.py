import asyncio
import click
from functools import wraps

from models import Base
from database import engine


def coroutine(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        return asyncio.get_event_loop().run_until_complete(func(*args, **kwargs))

    return wrapper


@click.group()
def cli():
    """
    CLI for Flash Cards
    """


@cli.command()
@coroutine
@click.option("--fixtures", is_flag=True, default=False)
@click.option("--clear_database", is_flag=True, default=False)
async def database_defaults(fixtures, clear_database):
    try:
        if clear_database:
            Base.metadata.drop_all(engine)
            Base.metadata.create_all(engine)

            click.echo("Models created successfully!")
        if fixtures:
            # TODO create a function to inject fixtures
            pass

    except Exception as e:
        print("Failed in database_defaults", str(e))


if __name__ == "__main__":
    cli()
