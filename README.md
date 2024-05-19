# Node Template

## Overview

Questo boilerplate è composto da moduli indipendenti, ognuno dedicato a un argomento diverso che ho studiato. Serve come base per applicazioni Node.js.

## Custom Modules

-   **[Direct Logging](./middlewares/directLogger.js)** &rarr; Middleware per registrare immediatamente i dettagli delle richieste in arrivo..
-   **[Error Check](./middlewares/errorCheck.js)** &rarr; Middleware per intercettare errori restituendo risposte HTTP appropriate.
-   **[Connect MongoDB](./connections/connectMongoDB.js)** &rarr; Factory che genera un'istanza di MongoClient dai parametri di configurazione.
-   **[MongoDB Mongoose](./connections/connectMongoose.js)** &rarr; Factory che genera un'istanza di Mongoose dai parametri di configurazione.
-   **[Async Handler](./utils/asyncHandler.js)** &rarr; Utility per incapsulare i gestori di route asincroni, semplificando la gestione degli errori nelle operazioni asincrone.
-   **[Auth Session](./middlewares/auth-session.js)** &rarr; Factory che restituisce middleware per la gestione delle sessioni tramite cookie e memorizzazione in MongoDB.
-   **[Auth JWT](./middlewares/auth-jwt.js)** &rarr; Factory che restituisce middleware per la gestione dei token JWT (Sign, Verify, Delete).
-   **[Clean Shutdown](./utils/eventHandler.js)** &rarr; Imposta gestori di eventi per una chiusura pulita dell'applicazione
-   **[Demo Auth Session](./routes/demo-auth-session.js)** &rarr; Fornisce route di base per la gestione delle sessioni e dimostrazioni di autenticazione utente.
-   **[Demo Auth JWT](./routes/demo-auth-session.js)** &rarr; Fornisce route di base per la gestione dei jwt e dimostrazioni di autenticazione utente.
-   **[Resource API](./routes/api-resource.js)** &rarr; Factory che fornisce route API RESTful modulari /api/<resource> per operazioni CRUD su collezioni MongoDB, supportando funzionalità di ricerca, aggiunta, aggiornamento e eliminazione. Questa struttura consente una facile adattabilità per diverse risorse, garantendo una gestione flessibile e scalabile.

## Directory Structure

`node_template/`  
├─ `public/` _- Directory per file statici accessibili al client. Contiene asset come immagini, CSS e JS._  
│ └─ `css/` _- Contiene file CSS personalizzati per lo stile delle pagine web._  
├─ `config/` _- Gestione della configurazione e impostazione dell'ambiente._  
├─ `connections/` _- Configurazione del client MongoDB e utility di connessione al database._  
├─ `middlewares/` _- Middleware per la gestione degli errori, la registrazione delle richieste e la gestione delle sessioni._  
├─ `routes/` _- Definizioni delle route di Express per autenticazione demo e gestione degli utenti_  
├─ `utils/` _- Utility come il wrapper async handler, query builders e gestione dei segnali._  
├─ `views/` _- Template per il rendering delle viste sul server utilizzando un motore di template (es. EJS, Pug)._  
├─ `.env` _- Template per le variabili d'ambiente (copiare in .env.dev per lo sviluppo)._  
├─ `server.js` _- Punto di ingresso per l'applicazione._  
└─ `package.json` _- Metadata del progetto e dipendenze._

## Getting Started

### Clona la repo e installa i pacchetti

```bash
$ git clone https://github.com/cyberfolk/node_template.git
$ cd node_template
$ npm install
```

### Crea e compila `.env.dev` partendo da `env`.

### Esegui l'Applicazione

```bash
$ npm run dev
# Esegue il server con nodemon in ambiente di sviluppo
# Esegue "cross-env NODE_ENV=dev nodemon bin/www",

$ npm dev_debug
# Esegue il server con nodemon in modalità debug e in ambiente di sviluppo
# Esegue "cross-env DEBUG=node_template:* NODE_ENV=dev nodemon bin/www"
```

## License

Questo progetto è software open-source con licenza ISC.
