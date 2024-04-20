const jwt = require("jsonwebtoken");
const fs = require("fs");
const options = {
    expiresIn: '30s',
    algorithm: 'RS256', // Algoritmo a chiave assimetrica
    //algorithm: 'HS256' // [Default] Se non specificato è sempre HS256 
};

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Non sei loggato, nessun token fornito...")
    try {
        const pub_key = fs.readFileSync('./rsa.public', 'utf8')
        req.user = jwt.verify(token, pub_key, options) // dentro re.user ci sarà il payload
        next()
    } catch {
        return res.status(401).send("Non sei loggato, token non valido o scaduto...")
    }
}

function signToken(req, res, next) {
    const payload = { id: 1, userType: 'admin', theme: 'dark' }
    const secret_key = process.env.JWT_SECRET_KEY;
    const cookieSettings = { // Setto questo oggetto per impedire che il cookie scompaia quando si chiude il browser
        expires: new Date(Date.now() + 30 * 1000), // il cookie scompare passato il tempo di expires
        httpOnly: true, // mitiga attacchi XSS
        secure: false // Da settare a true in fase di produzione
    }
    const prv_key = fs.readFileSync('./rsa.private', 'utf8')
    //const token = jwt.sign(payload, secret_key, options)
    const token = jwt.sign(payload, prv_key, options)
    res.cookie('token', token, cookieSettings)
    next()
}

function deleteToken(req, res, next) {
    const cookieSettings = { // Reimposto il cookie nel passato così da eliminarlo.
        expires: new Date(0), // Data nel passato
        httpOnly: true, // mitiga attacchi XSS
        secure: false // Da settare a true in fase di produzione
    }
    res.cookie('token', '', cookieSettings)
    next()
}

module.exports = { verifyToken, signToken, deleteToken }
