const jwt = require("jsonwebtoken");
const fs = require("fs");
const ms = require("ms"); // Importa ms
const path = require("path");

function createJwtMiddleware(config) {
    const { algorithm, expiresIn, secretKey } = config
    const options = { expiresIn, algorithm };

    let privateKey, publicKey;

    if (algorithm === 'RS256') {
        privateKey = fs.readFileSync(path.join(__dirname, '../../rsa.private'), 'utf8');
        publicKey = fs.readFileSync(path.join(__dirname, '../../rsa.public'), 'utf8');
    } else {
        privateKey = publicKey = secretKey;
    }

    // Impostare i cookieSettings evita che il cookie di sessione scompaia alla chiusura del browser
    const cookieSettings = {
        expires: new Date(Date.now() + ms(expiresIn)), // Il cookie scompare passato il tempo di expires
        httpOnly: true, // Mitiga attacchi XSS
        secure: false   // Da settare a true in fase di produzione
    }

    /**
     * Firma un nuovo token JWT con payload utente e lo invia come cookie nella risposta.
     */
    function signToken(req, res, next) {
        const payload = { id: 1, userType: 'admin', theme: 'dark' }
        const token = jwt.sign(payload, privateKey, options)
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
            const payload = jwt.verify(token, publicKey, options)
            req.user = payload
            next()
        } catch {
            return res.status(401).send("Non sei loggato, token non valido o scaduto...")
        }
    }

    /**
     * Elimina il token JWT impostando la scadenza del cookie su una data passata.
     * Questo middleware è fallace perchè elimina il cookie ma non elimina il token
     */
    function deleteToken(req, res, next) {
        cookieSettings.expires = new Date(0); // Reimposto il cookie nel passato così da eliminarlo.
        res.cookie('token', '', cookieSettings)
        next()
    }

    return { signToken, verifyToken, deleteToken };
}

module.exports = createJwtMiddleware;
