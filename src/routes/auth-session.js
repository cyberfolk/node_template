/*****************************************************************************************************************
 *  Routes => Demo Passport                                                                                  *
 *                                                                                                               *
 * Rotte di prova per testare il funzionamento dei coockie per l'autenticazione di sessione con passport         *
 *****************************************************************************************************************/

const express = require("express");
const routes = express.Router();
const passport = require("../config/passport")
const User = require('../models/user')
const bcrypt = require('bcrypt');

/* function getBaseUrl(req, res, next) {
	  const baseUrl = req.originalUrl.replace(req.path, '');
	  req.baseUrl = baseUrl;
	  next();
} */

function checkAuth(req, res, next) {
	if (req.session.passport) { next(); }
	else {
		req.flash('warning', 'Devi essere loggato per accedere a questa risorsa.');
		res.redirect('/auth/login');
	}
}

function checkNotAuth(req, res, next) {
	if (!req.session.passport) { next(); }
	else {
		req.flash('warning', 'Sei già loggato.');
		res.redirect('/auth/user');
	}
}

routes.post('/login', passport.authenticate('local-auth', {
	successRedirect: '/auth/user',
	failureRedirect: '/auth/login',
	failureFlash: true // Attiva i messaggi flash in caso di fallimento
}));

routes.get('/login', checkNotAuth, (req, res) => {
	res.render('./auth/login', { title: 'Login', layout: 'layouts/main-layout' });
});

routes.get("/logout", checkAuth, (req, res) => {
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

routes.get("/user", checkAuth, async (req, res) => {
	const user = await User.findById(req.session.passport.user);
	res.render('./auth/user', { title: 'user', layout: 'layouts/main-layout', username: user.username });
})

routes.get('/change-password', checkAuth, (req, res) => {
	res.render('./auth/change-password', { title: 'Change Password', layout: 'layouts/main-layout' });
});

// Rotta per cambiare la password
routes.post('/change-password', checkAuth, async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const user = await User.findById(req.session.passport.user);

	const isMatch = await bcrypt.compare(oldPassword, user.password);
	if (!isMatch) {
		req.flash('error', 'La vecchia password non è corretta.');
		return res.redirect('/auth/user');
	}

	user.password = newPassword;
	await user.save();

	req.flash('success', 'Password cambiata con successo.');
	res.redirect('/auth/user');
});

routes.get('/change-username', checkAuth, (req, res) => {
	res.render('./auth/change-username', { title: 'Change Username', layout: 'layouts/main-layout' });
});

// Rotta per cambiare il nome utente
routes.post('/change-username', checkAuth, async (req, res) => {
	const { newUsername } = req.body;
	const user = await User.findById(req.session.passport.user);

	user.username = newUsername;
	await user.save();

	req.flash('success', 'Nome utente cambiato con successo.');
	res.redirect('/auth/user');
});

module.exports = routes;
