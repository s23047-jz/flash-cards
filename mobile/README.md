# Uruchamianie mobilki w symulatorze

### Za pomocą android studio lub xcode należy pobrać i skonfigurować emulator pod react native (zalecane android >= 10, iOS >= 13)
### Pod tym linkiem znajduje się instrukcja konfiguracji https://reactnative.dev/docs/0.71/environment-setup?platform=android&os=linux
### Przykładowa konfiguracja symulatora https://youtu.be/8ejuHsaXiwU?si=HFWaArKHzDaRtKtp&t=337

--------------------------------------------------------------------------------------------------

## Konfiguracja środowiska

1. Należy zainstalować node w wersji 16. Można wykorzystać do tego celu nvm [Node Version Manager](https://github.com/nvm-sh/nvm)
2. Następnie przejść do katalogu mobile i wywołać następującą komende
```
npm i lub yarn
```
3.  Następnie w zależności od emulatora, aby uruchomić projekt:

android:
```
$ npm run android 
```

ios:
```
$ npm run ios  
```

--------------------------------------------------------------------
### UWAGA
W przypadku testowania aplikacji mobilnej, należy zmienić pare rzeczy.

W zmiennych środowiskowych na API należy zmienić poniższe wartości zmiennych na adres lokalny komputera, ponieważ na takim adresie wystartuje aplikacja mobilna
i emulator nie będzie widzieć localhosta.

1. Adres hosta (BACKEND_HOST) na którym będzie hostowane API.
2. Adres aplikacji mobilnej (MOBILE_HOST)

3. Z kolei w katalogu mobilnej aplikacji, przejść do /src/services/config.ts. Wartość BASE_API ustawić na http://BACKEND_HOST:8000

#### Przykład

BACKEND_HOST="192.168.1.101"
MOBILE_HOST="exp://192.168.1.101:19000"
BASE_API="http://192.168.1.101:8000"

----------------------------------------------------------------------------------------------

## Źródła
 
https://docs.expo.dev/guides/typescript/  
https://www.nativewind.dev/quick-starts/expo  
