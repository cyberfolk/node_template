/*********************************************************************************************************
 *  Confing => dotenv + process.env                                                                      *
 *                                                                                                       *
 * *******************************************************************************************************
 * Questo file utilizza il pacchetto `dotenv` per caricare le variabili d'ambiente dai file `.env`       *
 * Uso: Eseguire l'app con le impostazioni specifiche dell'ambiente che desideri buildare:               *
 *   - con `NODE_ENV=dev npm start` l'app leggerà il file .env.dev attivando l'ambiente di sviluppo.     *
 *   - con `NODE_ENV=prod npm start` l'app leggerà il file .env.prod attivando l'ambiente di produzione. *
 *********************************************************************************************************/
const path = require('path');

require('dotenv').config({
    path: `src/config/.env.${process.env.NODE_ENV}`
});

// Recupero le variabili d'ambiente
const secretKeySession = encodeURIComponent(process.env.SECRET_KEY_SESSION)
const secretKeyJwt = encodeURIComponent(process.env.SECRET_KEY_JWT)
const username = encodeURIComponent(process.env.DB_USERNAME)
const password = encodeURIComponent(process.env.DB_PASSWORD)
const hostName = encodeURIComponent(process.env.DB_HOST)
const dbName = encodeURIComponent(process.env.DB_NAME)

const dbConfig = { username, password, hostName, dbName }
const pckgName = path.basename(process.cwd());
const appName = `appName=${pckgName}`; // [Opzionale] Facilita il monitoraggio delle connessioni nel cluster.
const credentials = `${dbConfig.username}:${dbConfig.password}`;
const hostDetails = `${dbConfig.hostName}`;
const options = `retryWrites=true&w=majority&${appName}`
const mongoURI = `mongodb+srv://${credentials}@${hostDetails}`
const mongoURI_envDB = createDBMongoURI(dbName)
/**
 * Crea una stringa di connessione MongoDB URI per il database specificato.
 */
function createDBMongoURI(dbName) {
    return `${mongoURI}/${dbName}?${options}`
}
module.exports = { secretKeySession, secretKeyJwt, dbConfig, mongoURI, createDBMongoURI, mongoURI_envDB };

/******************************************************************************************************************
 * INFORMAZIONI SUI PARAMETRI MONGO-URI                                                                           *
 * mongodb+srv -------> Protocollo per una connessione semplificata a cluster MongoDB.                            *
 * retryWrites=true" -> Abilita il ritentativo automatico di operazioni di scrittura che falliscono.              * 
 * w=majority --------> Accerta che le operazioni di scrittura siano replicata su + nodi prima di confermarle.    *
 ******************************************************************************************************************/
