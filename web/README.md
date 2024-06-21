# Instrukcja uruchomienia projektu

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

## Uruchomienie kontenera bazy danych i backend
### Zmienne środowisko do urchomienia kontenera znajduja się w pliku .env.dev

Plik .copy_env zawiera zmienne środowiskowe potrzebne do uruchmienia kontenera
1. Należy uruchomić terminal i wkleić zmienne środowiskowe znajdujące się w pliku .env.dev w katalogu api
2. Następnie trzeba przejść w terminalu do katalogu api 
3. Z poziomu katalogu api wykonuje się budowę kontenera przy użyciu komendy:
```
$ docker-compose up -d --build
```
4. Po zakończeniu budowy kontener uruchomi się. Należy teraz przejśc do budowy kontenera web


## Uruchomienie kontenera dla strony webowej

1. Należy uruchomic terminal i przejść do katalogu web w projekcie
2. Następnie z poziomu katalogu web w terminalu należy użyć komendy do budowy kontenera: 
```
$ docker-compose up -d --build
```
3. Po zbudowaniu kontenera strona będzie dostępna po adresem: 

```
$ http://localhost:3000
```


### uruchomienie kontenera
```
$ docker-compose up -d
```
### wylaczenie kontenera
```
$ docker-compose down
```
______________________________________________

