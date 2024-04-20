/******************************************************************************************************************
 *  Routes => Demo JWT 
 *
 * ****************************************************************************************************************
 * Rotte di prova per testare il funzionamento dei Json Web Token.
 * NB: Per validare i token usare: https://jwt.io/
 *****************************************************************************************************************/
const express = require("express");
const { verifyToken, signToken, deleteToken } = require("../middlewares/authJwt");
const routes = express.Router();

routes.get("/login", signToken, (req, res) => {
    res.send('Ti sei appena loggato...')
})

routes.get("/logout-parziale", deleteToken, (req, res) => {
    res.send('logout-parziale effettuato...')
})

routes.get("/user", verifyToken, (req, res) => {
    const theme = req.user.theme
    console.log(theme);
    res.render('user', { theme })
})

module.exports = routes;
