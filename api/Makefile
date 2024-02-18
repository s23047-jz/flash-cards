dev_install:
	@pip install -r ./requirements.txt

dev_run:
	@python ./main.py

db_load_models_and_fixtures:
	@python cli.py database_defaults --clear_database
	@python cli.py database_defaults --fixtures
