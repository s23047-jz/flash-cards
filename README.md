# Instrukcja utworzenia środowiska FastApi
#### *1.* Utwórz katalog dla swojego projektu komenda: mkdir fastapi
#### *2.* Wejdź do katalogu fastapi i utwórz środowisko komendą: python -m venv fastapienv
#### *3.* Uruchom środowisko komenda: fastapienv\Scripts\activate.bat
#### *(fastapienv)* po lewej stronie ścieżki oznacza uruchomienie środowiska
#### *4.* Zainstaluj fastapi komenda: pip install fastapi
#### *5.* Zainstaluj uvicorn: pip install "uvicorn[standard]"
#### *komenda* "pip list" sprawdza zainstalowane bibloteki
#### *komenda* "deactivate" dezaktywuje środowisko

## Uruchomienie projektu:
#### Pycharm utwórz projekt korzystając z aktalogu fastapi

## Uruchomienie kontenera aplikacji:
#### docker-compose up -d --build <---- do budowania kontenera, uzywac gdy jakies zmiany nastapily w zmiennych srodowiskowych, zainstalowanych bibliotekach czy pliukach dokerowych
#### docker-compose up -d wlaczacie / uruchamiacie kontenery
#### docker-compose down wylaczacie kontenery
#### jesli pokaze wam problemy ze sciezka dodajcie po docker-compose flage -f "sciezka do docker-compose yml"