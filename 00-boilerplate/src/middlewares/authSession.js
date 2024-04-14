/******************************************************************************************************************
 *  FACTORY: AUTH SESSION WITH COOKIES                                                                                   *
 *****************************************************************************************************************/

const MongoStore = require('connect-mongo');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');	// Recupero la funzione v4 e la assegno alla variabile uuidv4

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
