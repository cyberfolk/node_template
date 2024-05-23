/*****************************************************************************************************************
 *  Routes => Demo Passport                                                                                  *
 *                                                                                                               *
 * Rotte di prova per testare il funzionamento dei coockie per l'autenticazione di sessione con passport         *
 *****************************************************************************************************************/

const express = require("express");
const routes = express.Router();
const passport = require("../middlewares/passport-config")

routes.post('/login', passport.authenticate('local-auth', {
	successRedirect: '/auth-passport/user',
	failureRedirect: '/auth-passport/failure',
	failureFlash: false
}));

routes.get('/success', (req, res) => {
	res.send('success')
});

routes.get('/failure', (req, res) => {
	res.send('failure')
});

routes.get('/login', (req, res) => {
	res.render('./auth-passport/login', { title: 'Login', layout: 'layouts/main-layout' });
});

routes.get("/logout", (req, res) => {
	req.session.isLogged = false
	res.render('./auth-passport/logout', { title: 'Login', layout: 'layouts/main-layout' });
})

routes.get("/session-destroy", (req, res) => {
	req.session.destroy(error => console.log(error))
	res.render('./auth-passport/session-destroy', { title: 'Login', layout: 'layouts/main-layout' });
})

routes.get("/user", (req, res) => {
	res.render('./auth-passport/user', { title: 'user', layout: 'layouts/main-layout', session: req.session });
})

routes.get("/color", (req, res) => {
	res.send(`Hai selezionato il colore ${req.session.colorSelected}`)
})

routes.get('/success', (req, res) => {
	res.send('Login successful');
});

module.exports = routes;
