const MongoStore = require('connect-mongo'); // Gestione della persistenza delle sessioni in MongoDB.
const session = require('express-session');  // Middleware per la gestione delle sessioni in Express.
const { v4: uuidv4 } = require('uuid');      // Genera ID univoci per le sessioni tramite UUID versione 4.

/******************************************************************************************************************
 *  Middleware Factory => Auth Session with Cookies
 * 
 * ****************************************************************************************************************
 * Crea un middleware per la gestione delle sessioni tramite cookies e salvataggio in MongoDB.
 * 
 * @param {MongoClient} client - Il client MongoDB da utilizzare per memorizzare le sessioni.
 * @param {string} dbName - Il nome del database MongoDB dove memorizzare le sessioni.
 * @param {string} secretKey - La chiave segreta utilizzata per firmare l'ID della sessione.
 * @returns {Express.Session} Middleware di sessione configurato per Express.
 ******************************************************************************************************************/
function createAauthSession(client, dbName, secretKey) {
    return session({
        secret: secretKey, // Chiave segreta per la firma dell'ID della sessione
        resave: false, // Evita il resave della sessione se non modificata.
        saveUninitialized: true, // Salva le nuove sessioni non presenti nello store.
        cookie: {
            secure: false, // Se true, abilita i cookie solo su HTTPS.
            httpOnly: true, // Se true, impedisce accesso al cookie da parte di JS nel browser (mitiga attacchi XSS).
            maxAge: 3600000 // Tempo di vita del cookie in millisecondi (es. 3600000ms = 1 ora).
        },
        genid: () => uuidv4(), // Funzione per generare ID di sessione univoci.
        store: new MongoStore({ client: client, dbName: dbName }) // Configura MongoDB come store per le sessioni.
    })
}

module.exports = createAauthSession;

/******************************************************************************************************************
 * SPIEGAZIONE DETTAGLIATA: I compiti di un middleware di sessione sono i seguenti:                               *
 * - GESTIRE L'ID DELLA SESSIONE: Ogni volta che una richiesta arriva al server, il middleware cerca un ID di     *
 *   sessione nel cookie della richiesta. Se l'ID esiste e corrisponde a una sessione valida nello store, allora  *
 *   carica i dati di quella sessione e li rende disponibili nell'oggetto request come req.session.               *
 * - CREAZIONE DELLA SESSIONE: Se non c'è un ID di sessione, o se l'ID non corrisponde a nessuna sessione nel db  *
 *   il middleware può generare un nuovo ID sessione (usando la funzione genid se fornita) e iniziarne una nuova. *
 * - IMPOSTAZIONE DEI COOKIE: Basato sulle configurazioni del cookie fornite (come secure, httpOnly, e maxAge),   *
 *   il middleware si assicura che il cookie nella risposta sia corretto e che rispetti le direttive di sicurezza.*
 ******************************************************************************************************************/
