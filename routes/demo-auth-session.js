/*****************************************************************************************************************
 *  Routes => Demo Auth Session                                                                                  *
 *                                                                                                               *
 * Rotte di prova per testare il funzionamento dei coockie per l'autenticazione di sessione con passport         *
 *****************************************************************************************************************/

const express = require("express");
const routes = express.Router();
const passport = require("../middlewares/passport-config")

routes.get("/", (req, res) => {
	res.send(req.session)
})

routes.post('/login', passport.authenticate('local-auth', {
	successRedirect: '/demo/session/success',
	failureRedirect: '/demo/session/failure',
	failureFlash: false
}));

routes.get('/success', (req, res) => {
	res.send('success')
});

routes.get('/failure', (req, res) => {
	res.send('failure')
});

routes.get('/login', (req, res) => {
	res.render('login')
});

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

routes.get('/success', (req, res) => {
	res.send('Login successful');
});

routes.get('/user/dashboard', function (req, res) {
	res.send('dashboard');
});

routes.get('/user/dashboard2', function (req, res) {
	res.send('dashboard2');
});

module.exports = routes;
