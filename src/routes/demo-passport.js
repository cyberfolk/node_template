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


routes.post('/login', passport.authenticate('local-auth', {
	successRedirect: '/auth/user',
	failureRedirect: '/auth/login',
	failureFlash: true // Attiva i messaggi flash in caso di fallimento
}));

routes.get('/login', (req, res) => {
	if (req.session.passport) {
		req.flash('warning', 'Volevi accedere alla rotta di login, ma sei già loggato.');
		return res.redirect('/auth/user');
	}
	res.render('./auth/login', { title: 'Login', layout: 'layouts/main-layout' });
});

routes.get("/logout", (req, res) => {
	if (!req.session.passport) {
		req.flash('warning', 'Volevi accedere alla rotta di logout, ma non sei loggato.');
		return res.redirect('/auth/login');
	}
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
		req.flash('warning', 'Volevi accedere alla rotta di user, ma non sei loggato.');
		return res.redirect('/auth/login');
	}
	const user = await User.findById(req.session.passport.user);
	res.render('./auth/user', { title: 'user', layout: 'layouts/main-layout', username: user.username });
})

routes.get('/change-password', (req, res) => {
	if (!req.session.passport) {
		req.flash('warning', 'Devi essere loggato per cambiare la password.');
		return res.redirect('/auth/login');
	}
	res.render('./auth/change-password', { title: 'Change Password', layout: 'layouts/main-layout' });
});

// Rotta per cambiare la password
routes.post('/change-password', async (req, res) => {
	if (!req.session.passport) {
		req.flash('warning', 'Devi essere loggato per cambiare la password.');
		return res.redirect('/auth/login');
	}

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

routes.get('/change-username', (req, res) => {
	if (!req.session.passport) {
		req.flash('warning', 'Devi essere loggato per cambiare il nome utente.');
		return res.redirect('/auth/login');
	}
	res.render('./auth/change-username', { title: 'Change Username', layout: 'layouts/main-layout' });
});

// Rotta per cambiare il nome utente
routes.post('/change-username', async (req, res) => {
	if (!req.session.passport) {
		req.flash('warning', 'Devi essere loggato per cambiare il nome utente.');
		return res.redirect('/auth/login');
	}

	const { newUsername } = req.body;
	const user = await User.findById(req.session.passport.user);

	user.username = newUsername;
	await user.save();

	req.flash('success', 'Nome utente cambiato con successo.');
	res.redirect('/auth/user');
});

module.exports = routes;
