## Instrukcja uruchomienia projektu

## Uruchomienie kontenera bazy danych i backend
#### Zmienne środowisko do urchomienia kontenera znajduja się w pliku .copy_env

Plik .copy_env zawiera zmienne środowiskowe potrzebne do uruchmienia kontenera
1. W terminal trzeba wkleic zmienne środiwskowe
2. Następnie trzeba przejść w terminalu do katalogu api
3. Budowę kontenera wykonuje się przy użcyiu komendy:
```
$ docker-compose up -d --build
```
4. Po zakończeniu budowy kontener uruchomi się. Należy teraz przejśc do budowy kontenera web


## Uruchomienie kontenera dla strony webowej

1. Należy uruchomic terminal i przejść do katalogu web w projekcie
2. Następnie w terminalu należy użyć komendy do budowy kontenera: 
```
$ docker-compose up -d --build
```
3. Po zbudowaniu się kontenera strona będzie dostępna po adresem: 

```
$ http://localhost:3000)
```


#### uruchomienie kontenera
```
$ docker-compose up -d
```
#### wylaczenie kontenera
```
$ docker-compose down
```
______________________________________________

