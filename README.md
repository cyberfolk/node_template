# Node Basics

**Initial commit**: 16/03/24

**Technologies**: NodeJS, Javascript

**Info**: This Repo contains fundamental NodeJS exercises such as

## Contenuto

`node_basics/`  
├─ `boilerplate/` _- Codice riutilizzabile e modulare che integra svariati argomenti._  
├─ `step-by-step/` - _Raccolta dei primi esercizi_  
│ ├─ `01-first-step/` → _Variabili globali e importazione di moduli_  
│ ├─ `02-fs/` → _Modulo Fyle System_  
│ ├─ `03-http/` → _Modulo http_  
│ ├─ `04-express/` → _Modulo express_  
│ ├─ `05-middleware/` → _Definisco primi middleware_  
│ ├─ `06-crud_1/` → _CRUD su memoria volatile_  
│ ├─ `07-dotenv/` → _Modulo dotenv e gestione variabili di sistema_  
│ ├─ `08-mongo/` → _Modulo mongoDb e prima connessione ad atlas_  
│ ├─ `09-crud_2/` → _CRUD su db atlas_  
│ ├─ `10-hash/` → _Codifica hash_  
│ ├─ `11-auth-session/` → _Autenticazione tramite cookie di sistema_

## Inizializzare Progetto Node.js

1. **Aprire Terminale e inizializzare il progetto**

    ```bash
    mkdir <nome-progetto>
    cd <nome-progetto>
    npm init -y
    npm install express
    npm install nodemon -D
    echo "node_modules" > .gitignore
    ```

2. **Modificare file `package.json`** per aggiungere gli script di avvio:
    ```json
    "scripts": { "start": "nodemon index.js" },
    ```
