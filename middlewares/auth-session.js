/******************************************************************************************************************
 * MIDDLEWARE => Gestione Sessioni con cookies e savataggio in MongoDB.                                           *
 *                                                                                                                *
 * - GESTISCE ID SESSIONE: Ogni volta che una richiesta arriva al server, il middleware cerca un ID di            *
 *   sessione nel cookie della richiesta. Se l'ID esiste e corrisponde a una sessione valida nello store, allora  *
 *   carica i dati di quella sessione e li rende disponibili nell'oggetto request come req.session.               *
 *                                                                                                                *
 * - CREA ID SESSIONE: Se non c'è un ID di sessione, o se l'ID non corrisponde a nessuna sessione nel db          *
 *   il middleware può generare un nuovo ID sessione (usando la funzione genid se fornita) e iniziarne una nuova. *
 *                                                                                                                *
 * - IMPOSTA I COOKIE: Basato sulle configurazioni del cookie fornite (come secure, httpOnly, e maxAge),          *
 *   il middleware si assicura che il cookie nella risposta sia corretto e che rispetti le direttive di sicurezza.*
 ******************************************************************************************************************/

const MongoStore = require('connect-mongo'); // Gestione della persistenza delle sessioni in MongoDB.
const session = require('express-session');  // Middleware per la gestione delle sessioni in Express.
const { v4: uuidv4 } = require('uuid');      // Genera ID univoci per le sessioni tramite UUID versione 4.
const { secretKeySession, mongoURI_envDB, dbConfig } = require('../config/config');
const { mongoose } = require("../connections/connectMongoose")
const store = MongoStore.create({ mongoUrl: mongoURI_envDB, mongooseConnection: mongoose.connection }) // Configura Mongoose come store per le sessioni.

const authSession = session({
    secret: secretKeySession, // Chiave segreta per la firma dell'ID della sessione
    resave: false, // Evita il resave della sessione se non modificata.
    saveUninitialized: true, // Salva le nuove sessioni non presenti nello store.
    cookie: {
        secure: false, // Se true, abilita i cookie solo su HTTPS.
        httpOnly: true, // Se true, impedisce accesso al cookie da parte di JS nel browser (mitiga attacchi XSS).
        maxAge: 3600000 // Tempo di vita del cookie in millisecondi (es. 3600000ms = 1 ora).
    },
    genid: () => uuidv4(), // Funzione per generare ID di sessione univoci.
    store: store
})

module.exports = authSession;


// PER CONNETTERSI CON mongoClient
// const { mongoClient } = require("../connections/connectMongoDB")
// const store = new MongoStore({ client: client, dbName: dbConfig.dbName }) // Configura MongoDB come store per le sessioni.
