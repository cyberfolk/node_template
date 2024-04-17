/******************************************************************************************************************
 *  Confing => dotenv + process.env
 * 
 * ****************************************************************************************************************
 * Questo file utilizza il pacchetto `dotenv` per caricare le variabili di ambiente dai file `.env`
 * Uso: Eseguire l'app con le impostazioni specifiche dell'ambiente che desideri buildare:
 *   - con `NODE_ENV=development npm start` l'app leggerà il file .env.development attivando l'ambiente di sviluppo.
 *   - con `NODE_ENV=production npm start` l'app leggerà il file .env.production attivando l'ambiente di produzione.
 ******************************************************************************************************************/

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

// Recupero le variabili d'ambiente
const port = process.env.PORT || 3000; // Se non PORT fallback su 3000.
const secretKey = encodeURIComponent(process.env.SESSION_SECRET_KEY)
const dbConfig = {
    collection: encodeURIComponent(process.env.DB_COLLECTION),
    username: encodeURIComponent(process.env.DB_USERNAME),
    password: encodeURIComponent(process.env.DB_PASSWORD),
    hostName: encodeURIComponent(process.env.DB_HOST),
    dbName: encodeURIComponent(process.env.DB_NAME),
}

module.exports = { port, secretKey, dbConfig };
