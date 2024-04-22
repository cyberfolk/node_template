const jwt = require("jsonwebtoken");
const fs = require("fs");
const ms = require("ms"); // ms: converte unità di tempo in millisecondi
const path = require("path");

/*******************************************************************************************************************
 *  Middleware Factory => Auth JWT
 * 
 * *****************************************************************************************************************
 * Crea middleware per la gestione di token JWT, uno per la firma, uno per la verifica e uno per l'eliminazione.
 * - FIRMA DEL TOKEN: Crea e firma un token JWT utilizzando una chiave privata (per algoritmi asimmetrici) o una
 *   chiave segreta (per algoritmi simmetrici). Il token firmato viene poi inviato al client sotto forma di
 *   cookie. La firma del token include un payload specifico, che può contenere dati utente come ID, tipo di
 *   utente, preferenze, ecc.
 * - VERIFICA DEL TOKEN: Ogni volta che una richiesta arriva al server, il middleware cerca un token JWT nel
 *   cookie della richiesta. Se il token esiste e corrisponde a uno valido verificato con la chiave pubblica
 *   (per algoritmi asimmetrici) o la chiave segreta (per algoritmi simmetrici), carica i dati del payload e li
 *   rende disponibili nell'oggetto request come req.user.
 * - ELIMINAZIONE DEL TOKEN: Se richiesto, il middleware può eliminare il token JWT dal client reimpostando il
 *   cookie con una data di scadenza passata. Questo non invalida il token nel server o nei clienti che potrebbero
 *   averlo ancora memorizzato ma impedisce al browser di inviare il cookie in future richieste al server.
 *
 * NB: Per provare l'encode dei token usare: https://jwt.io/
 *  - Se siamo in ambiente di produzione i token vengono trasmessi solo su connessioni HTTPS.
 *  - L'accesso ai token tramite script client-side è bloccato usando il flag httpOnly.
 * 
 * @param {string} algorithm - Algoritmo usato per firmare il token.
 * @param {string} expiresIn - Durata del cookie (es. "1d", "2h").
 * @param {string} secretKey - Chiave segreta per gli algoritmi simmetrici..
 * @returns {Object} Oggetto con metodi middleware per gestire i token.
 ******************************************************************************************************************/
function createJwtMiddleware(algorithm, expiresIn, secretKey) {
    const options = { expiresIn, algorithm }; // Opzioni per la firma e verifica del token.
    const { privateKey, publicKey } = getKeyPair(algorithm, secretKey);

    /******************************************************************************************************************
     * Firma un nuovo token JWT con payload utente e lo invia come cookie nella risposta.
     ******************************************************************************************************************/
    function signToken(req, res, next) {
        const payload = { id: 1, userType: 'admin', theme: 'dark' };
        const token = jwt.sign(payload, privateKey, options);
        const cookieSettings = createCookieSettings(expiresIn); // Evita che il cookie di sessione scompaia alla chiusura del browser
        res.cookie('token', token, cookieSettings);
        next();
    }

    /******************************************************************************************************************
     * Verifica la validità del token JWT prelevandolo dai cookie della request, se il token è validato 
     * si preleva il suo payload e lo si aggiunge nella request.
     ******************************************************************************************************************/
    function verifyToken(req, res, next) {
        const token = req.cookies.token;
        if (!token) return res.status(401).send("Non sei loggato, nessun token fornito...");
        try {
            const payload = jwt.verify(token, publicKey, options);
            req.user = payload;
            next();
        } catch {
            return res.status(401).send("Non sei loggato, token non valido o scaduto...");
        }
    }

    /******************************************************************************************************************
     * Elimina il token JWT impostando la sua durata a zero.
     * Questo middleware è fallace perchè elimina il cookie ma non elimina il token
     ******************************************************************************************************************/
    function deleteToken(req, res, next) {
        res.cookie('token', '', { maxAge: 0 }); // Imposta la durata massima del cookie su zero
        next();
    }

    return { signToken, verifyToken, deleteToken };
}

/******************************************************************************************************************
 * Restituisce le chiavi appropriate per la firma dei token JWT, in base all'algoritmo fornito,
 * - Se si utilizza un algoritmo asimmetrico leggerò privateKey publicKey da file
 * - Se si utilizza un algoritmo simmetrico privateKey e publicKey saranno uguali alla secretKey passata
 ******************************************************************************************************************/
function getKeyPair(algorithm, secretKey) {
    let privateKey, publicKey;
    if (algorithm === 'RS256') {
        privateKey = fs.readFileSync(path.join(__dirname, '../../rsa.private'), 'utf8');
        publicKey = fs.readFileSync(path.join(__dirname, '../../rsa.public'), 'utf8');
    } else {
        privateKey = publicKey = secretKey; // Per algoritmi simmetrici, usa la stessa chiave segreta per entrambe
    }
    return { privateKey, publicKey };
}

/******************************************************************************************************************
 * Genera le impostazioni di configurazione per i cookie basate sull'ambiente e sul tempo di scadenza specificato.
 ******************************************************************************************************************/
function createCookieSettings(expiresIn) {
    const secure = process.env.NODE_ENV === 'production';
    return {
        expires: new Date(Date.now() + ms(expiresIn)), // Imposta la scadenza del cookie
        httpOnly: true,  // Mitiga attacchi XSS
        secure: secure,  // Se true permette di navigare solo su HTTPS
        sameSite: 'Lax'   // [Default]='None'. Ho impostato lax per prevenire attacchi CSRF
    };
}

module.exports = createJwtMiddleware;
