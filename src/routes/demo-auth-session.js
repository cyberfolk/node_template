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
	successRedirect: '/auth-session/success',
	failureRedirect: '/auth-session/failure',
	failureFlash: false
}));

routes.get('/success', (req, res) => {
	res.send('success')
});

routes.get('/failure', (req, res) => {
	res.send('failure')
});

routes.get('/login', (req, res) => {
	res.render('./auth-session/login', { title: 'Login', layout: 'layouts/main-layout' });
});

routes.get("/logout", (req, res) => {
	req.session.isLogged = false
	res.render('./auth-session/logout', { title: 'Login', layout: 'layouts/main-layout' });
})

routes.get("/destroy-session", (req, res) => {
	req.session.destroy(error => console.log(error))
	res.render('./auth-session/destroy-session', { title: 'Login', layout: 'layouts/main-layout' });
})

routes.get("/user", (req, res) => {
	res.render('./auth-session/user', { title: 'user', layout: 'layouts/main-layout', session: req.session });
})

routes.get("/color", (req, res) => {
	res.send(`Hai selezionato il colore ${req.session.colorSelected}`)
})

routes.get('/success', (req, res) => {
	res.send('Login successful');
});

module.exports = routes;
