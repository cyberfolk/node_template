const jwt = require("jsonwebtoken");
const fs = require("fs");
const ms = require("ms"); // Importa ms

function createJWTMiddleware(config) {
    const options = { expiresIn: config.expiresIn, algorithm: config.algorithm };
    // algorithm: 'HS256' -> Chiave simmetrica. Impostato di [Default] 
    // algorithm: 'RS256' -> Chiave assimetrica

    const privateKey = config.algorithm === 'RS256' ? fs.readFileSync('./rsa.private', 'utf8') : process.env.SECRET_KEY_JWT;
    const publicKey = config.algorithm === 'RS256' ? fs.readFileSync('./rsa.public', 'utf8') : privateKey;


    /**
     * Firma un nuovo token JWT con payload utente e lo invia come cookie nella risposta.
     */
    function signToken(req, res, next) {
        const payload = { id: 1, userType: 'admin', theme: 'light' }
        // Impostare i cookieSettings evita che il cookie di sessione scompaia alla chiusura del browser
        const cookieSettings = {
            expires: new Date(Date.now() + 30 * 1000), // Il cookie scompare passato il tempo di expires (30s)
            httpOnly: true, // Mitiga attacchi XSS
            secure: false   // Da settare a true in fase di produzione
        }
        const prv_key = fs.readFileSync('./rsa.private', 'utf8')
        // const secret_key = process.env.SECRET_KEY_JWT;
        // const token = jwt.sign(payload, secret_key, options)
        const token = jwt.sign(payload, prv_key, options)
        res.cookie('token', token, cookieSettings)
        next()
    }

    /**
     * Verifica la validità del token JWT prelevandolo dai cookie della request, se il token è validato 
     * si preleva il suo payload e lo si aggiunge nella request.
     */
    function verifyToken(req, res, next) {
        const token = req.cookies.token;
        if (!token) return res.status(401).send("Non sei loggato, nessun token fornito...")
        try {
            const pub_key = fs.readFileSync('./rsa.public', 'utf8')
            const payload = jwt.verify(token, pub_key, options)
            req.user = payload
            next()
        } catch {
            return res.status(401).send("Non sei loggato, token non valido o scaduto...")
        }
    }

    /**
     * Elimina il token JWT impostando la scadenza del cookie su una data passata.
     */
    function deleteToken(req, res, next) {
        const cookieSettings = { // Reimposto il cookie nel passato così da eliminarlo.
            expires: new Date(0), // Data nel passato
            httpOnly: true, // mitiga attacchi XSS
            secure: false // Da settare a true in produzione
        }
        res.cookie('token', '', cookieSettings)
        next()
    }

    return { signToken, verifyToken, deleteToken };
}

module.exports = createJWTMiddleware;
