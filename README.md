# Solinum Coding Game

## Back-end Node.js, Express, MongoDB
Fonctionnalités de l'API :
|Method|URLs|Actions|
|--------|--------|--------|
|GET|api/poi|get all POI online|
|GET|api/poi/draft|get all POI draft|
|GET|api/poi/:id|get a specific POI|
|POST|api/poi/add|add new POI|
|PUT|api/poi/:id|modify POI's fields|
|PATCH|api/poi/:id|modify POI's status and state

Avant de lancer le serveur, il faut changer le fichier `back-end/app/config/development/mailing.config.js`

Lancer le serveur : `NODE_ENV=development node back-end/server.js`


## Front-end Angular

Avant de lancer le serveur, il faut changer la valeur de apiKey par une clé api lié aux api places et maps javascript de google
```
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
          apiKey: 'my_api_key'
        })
  ],
})
```

Lancer le serveur : `ng serve --port 8081`
Puis accéder à l'application sur `http://localhost:8081`


# Pour chacun
Après avoir cloné le repo, il faut utiliser la commande `npm install` à la fois dans le dossier `back-end/` et dans le dossier `front-end/`
