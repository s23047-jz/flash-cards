#!/bin/bash

# wait for db
sleep 20

echo "Injecting fixtures"
make db_load_models_and_fixtures
#start server

echo "Starting server"
make dev_run
