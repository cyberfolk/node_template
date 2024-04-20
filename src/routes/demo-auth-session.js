/******************************************************************************************************************
 *  Routes => Demo Auth Session 
 *
 * ****************************************************************************************************************
 * Rotte di prova per testare il funzionamento dei coockie per l'autenticazione di sessione.
 *****************************************************************************************************************/

const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
	res.send(req.session)
})

routes.get("/login", (req, res) => {
	req.session.isLogged = true;
	res.send()
})

routes.get("/logout", (req, res) => {
	req.session.isLogged = false
	res.send()
})

routes.get("/destroy-session", (req, res) => {
	req.session.destroy(error => console.log(error))
	res.send()
})

routes.get("/user", (req, res) => {
	if (req.session.isLogged) {
		res.send("Sei loggato...")
	} else {
		res.send("Non sei loggato...")
	}
})

routes.get("/color", (req, res) => {
	res.send(`Hai selezionato il colore ${req.session.colorSelected}`)
})

module.exports = routes;
