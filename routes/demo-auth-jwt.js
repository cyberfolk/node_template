const express = require("express");
const demoJwtRouter = express.Router();
const { jwtMiddleware } = require("../middlewares/auth-jwt");
const { signToken, verifyToken, deleteToken } = jwtMiddleware

/******************************************************************************************************************
 *  Routes Demo JWT 
 ******************************************************************************************************************
 * Rotte di prova per testare il funzionamento dei Json Web Token.
 * Le rotte fornite consentono il login, il logout parziale e l'accesso alle informazioni dell'utente.
******************************************************************************************************************/

demoJwtRouter.get("/login", signToken, (req, res) => {
    res.send('Ti sei appena loggato...')
})

demoJwtRouter.get("/logout-parziale", deleteToken, (req, res) => {
    res.send('logout-parziale effettuato...')
})

demoJwtRouter.get("/user", verifyToken, (req, res) => {
    const theme = req.user.theme
    console.log(theme);
    res.render('user', { theme })
})

demoJwtRouter.get("/user/cambio-email", verifyToken, (req, res) => {
    res.render('cambio-email')
})

demoJwtRouter.post("/user/cambio-email", verifyToken, (req, res) => {
    const email = req.body.email;
    res.send(`Hai richiestoo la modifica di email in ${email}. Sei autorizzato.`)
})

module.exports = demoJwtRouter;
