#!/bin/bash

celery -A flash_cards_api.app.celery worker -E -l INFO --beat
