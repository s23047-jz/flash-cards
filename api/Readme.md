# Instrukcja uruchomienia API

## Instalacja docker i docker-compose
### W celu uruchomienia projektu niezbędny jest docker i docker-compose
#### Instalacja dockera 

1. Należy uruchomic terminal i wpisać poniższą komendą, która zainstaluje dockera:

```
$ sudo apt-get install docker-ce=5:26.1.3~3-0~ubuntu-$(lsb_release -cs) docker-ce-cli=5:26.1.3~3-0~ubuntu-$(lsb_release -cs) containerd.io docker-buildx-plugin docker-compose-plugin
```

2. Po zakończeniu instalacji  wersję dockera można sprawdzić komendą:

```
$ docker --version
```

#### Instalacja docker-compose 

1. Należy uruchomic terminal i wpisać poniższą komendą, która zainstaluje docker-compose:

```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. Po pobraniu pliku binarnego należy nadać mu prawa do wykonywania:

```
$ sudo chmod +x /usr/local/bin/docker-compose
```

3. Po zakończeniu instalacji  wersję docker-compose można sprawdzić komendą:

```
$ docker-compose --version
```

----------------------------------------------
## Uruchamianie kontenerów

1. W terminalu bashowym należy wejść do ścieżki api.
2. Z poziomu katalogu api, wykonać komende budującą konterer dla bazy danych i api.

```
docker-componse up -d --build
```
3. Po zakończeniu budowy, api wystartuje na przypisanym adresie i porcie 
w zmiennych środowiskowych (.env.dev)
Domyślnie ustawiono na localhost:8000

______________________________________________

## Przydatne komendy:

#### uruchomienie zbudowanego wcześniej kontenera
```
$ docker-compose up -d
```
#### wylaczenie kontenera
```
$ docker-compose down
```
______________________________________________

