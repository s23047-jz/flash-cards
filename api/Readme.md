## Instrukcja utworzenia środowiska


#### W katalogu domowym projektu utworz srodowisko python'owe w wersji 3.10.

Do tego celu mozesz wykorzystac pyenv z poleceniem

```
$ pyenv exec python -m venv venv
```

Nastepnie aktywowac srodowisko
```
Unix
$ source venv/bin/activate

Windows
$ source venv/Scripts/activate
```

______________________________________________
## Zainstaluj odpowiednie dependencje:
    "setuptools" >= 60.0,
    "setuptools_scm" >= 8.0

Nastepnie uzyj komendy z Makefile:

    $ make dev_install

która przeprowadzi konfiguracje projektu i zainstaluje pozostałe dependencje


______________________________________________
## Tworzenie tablic i ładowanie danych:
Używając komendy:

    $ make db_load_models_and_fixtures

uruchamiomy metode z grupy click commands, która tworzy modele w bazie danych
oraz injectuje fixtury do bazy.


______________________________________________
## Uruchomienie projektu:

```
$ make dev_run
```
Projekt jest konteneryzowany, wiec wystarczy uzyc komendy
```
$ docker-compose up -d --build
```
aby zbudowac kontener. Powyższe instrukcje do srodowiska wykonaja sie samodzielnie
w kontenerze.

______________________________________________

## Uruchomienie kontenera aplikacji:

#### uruchomienie kontenera
```
$ docker-compose up -d
```
#### wylaczenie kontenera
```
$ docker-compose down
```
______________________________________________

