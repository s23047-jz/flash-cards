clean:
	@rm -rf */_version.txt
	@rm -rf ./*/__pycache__
	@rm -rf ./*/*/__pycache__
	@rm -rf ./__pycache__
	@echo ':) Cleaning done (:'

dev_install:
	@pip install -e .

dev_run:
	@python ./flash_cards_api/app.py

dev_run_worker:
	@./celery_worker.sh

db_load_models_and_fixtures:
	flash_cards_api_cli database_defaults --clear_database
	flash_cards_api_cli database_defaults --fixtures

check_code:
	@flake8 .
