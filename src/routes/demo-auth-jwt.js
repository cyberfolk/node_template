const express = require("express");

/******************************************************************************************************************
 *  Routes Factory => Demo JWT 
 ******************************************************************************************************************
 * Crea Rotte di prova per testare il funzionamento dei Json Web Token.
 * Le rotte fornite consentono il login, il logout parziale e l'accesso alle informazioni dell'utente.
 *
 * @param {Object} jwtMiddleware - Un oggetto contenente tre funzioni middleware: signToken, verifyToken e deleteToken.
 * @returns {express.Router} Un router Express configurato con le rotte per il JWT.
 *****************************************************************************************************************/
function createJwtRouter(jwtMiddleware) {
    const routes = express.Router();
    const { signToken, verifyToken, deleteToken } = jwtMiddleware

    routes.get("/login", signToken, (req, res) => {
        res.send('Ti sei appena loggato...')
    })

    routes.get("/logout-parziale", deleteToken, (req, res) => {
        res.send('logout-parziale effettuato...')
    })

    routes.get("/user", verifyToken, (req, res) => {
        const theme = req.user.theme
        res.render('user', { theme })
    })
    return routes
}
module.exports = createJwtRouter;
