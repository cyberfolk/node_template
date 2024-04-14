const MongoStore = require('connect-mongo');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');	// Recupero la funzione v4 e l'assegno alla variabile uuidv4

/******************************************************************************************************************
 *  Middleware: Factory => Auth Session with Cookies
 *
 * ****************************************************************************************************************
 * Crea un express-session configurata per l'uso di cookies e salvataggio della sessione in MongoDB.
 * 
 * @param {MongoClient} client - Il client MongoDB da utilizzare per memorizzare le sessioni.
 * @param {string} dbName - Il nome del database MongoDB dove memorizzare le sessioni.
 * @param {string} secretKey - La chiave segreta utilizzata per firmare l'ID della sessione.
 * @returns {Express.Session} Un middleware di sessione configurato per Express.
 ******************************************************************************************************************/
function createAauthSession(client, dbName, secretKey) {
    return session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
        genid: () => uuidv4(),
        store: new MongoStore({ client: client, dbName: dbName })
    })
}

module.exports = createAauthSession;
