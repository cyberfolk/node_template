/*****************************************************************************************************************
 *  Routes => Demo Passport                                                                                  *
 *                                                                                                               *
 * Rotte di prova per testare il funzionamento dei coockie per l'autenticazione di sessione con passport         *
 *****************************************************************************************************************/

const express = require("express");
const routes = express.Router();
const passport = require("../config/passport")
const User = require('../models/user')


routes.post('/login', passport.authenticate('local-auth', {
	successRedirect: '/auth/user',
	failureRedirect: '/auth/failure',
	failureFlash: false
}));

routes.get('/success', (req, res) => {
	res.send('success')
});

routes.get('/failure', (req, res) => {
	res.send('failure')
});

routes.get('/login', (req, res) => {
	res.render('./auth/login', { title: 'Login', layout: 'layouts/main-layout' });
});

routes.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			console.error('Errore nel logout:', err);
			return res.status(500).send('Errore nel logout');
		}
		req.session.destroy((error) => {
			if (error) {
				console.error('Errore nella distruzione della sessione:', error);
				return res.status(500).send('Errore nella distruzione della sessione');
			}
			res.clearCookie('connect.sid'); // Cancella il cookie di sessione
			res.render('./auth/logout', { title: 'Login', layout: 'layouts/main-layout' });
		});
	});
});


routes.get("/user", async (req, res) => {
	if (!req.session.passport) {
		req.flash('msg_error', 'Volevi accedere alla pagina user, ma non sei loggato.');
		return res.redirect('/auth/login');
	}
	const user = await User.findById(req.session.passport.user);
	res.render('./auth/user', { title: 'user', layout: 'layouts/main-layout', username: user.username });
})

routes.get("/color", (req, res) => {
	res.send(`Hai selezionato il colore ${req.session.colorSelected}`)
})

routes.get('/success', (req, res) => {
	res.send('Login successful');
});

module.exports = routes;
