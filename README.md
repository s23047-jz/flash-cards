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
Zainstaluj requirements poleceniem :
```
$ pip install -r requirements.txt
lub
$ make dev_install
```
______________________________________________
## Uruchomienie projektu:

```
$ python main.py
lub
$ make dev_run
```
Projekt jest konteneryzowany, wiec wystarczy uzyc komendy
```
$ docker-compose up -d --build
```
aby zbudowac kontener. Powyzsze instrukcje do srodowiska wykonaja sie samodzielnie
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

