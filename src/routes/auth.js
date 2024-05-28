const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const User = require('../models/user');

// --- Middleware di Utilità ---

// Middleware per verificare se l'utente è autenticato.
function checkAuth(req, res, next) {
	if (req.session.passport) { next(); }
	else {
		req.flash('warning', 'Devi essere loggato per accedere a questa risorsa.');
		res.redirect('/ssr/auth/login');
	}
}

// Middleware per verificare se l'utente non è autenticato.
function checkNotAuth(req, res, next) {
	if (!req.session.passport) { next(); }
	else {
		req.flash('warning', 'Sei già loggato.');
		res.redirect('/ssr/auth/user');
	}
}

// Middleware per trovare l'utente autenticato.
async function findUser(req, res, next) {
	try {
		const user = await User.findById(req.session.passport.user);
		if (!user) {
			req.flash('error', 'Utente non trovato.');
			return res.redirect('/ssr/auth/user');
		}
		req.user = user;
		next();
	} catch (error) {
		req.flash('error', 'Errore durante la ricerca dell\'utente.');
		res.redirect('/ssr/auth/login');
	}
}

// --- Rotte di visualizzazione ---

// Mostra la pagina di login.
router.get('/login', checkNotAuth, (req, res) => {
	res.render('./auth/login', { title: 'Login', layout: 'layouts/main' });
});

// Mostra la pagina del profilo utente.
router.get('/user', checkAuth, findUser, (req, res) => {
	res.render('./auth/user', { title: 'User', layout: 'layouts/main', username: req.user.username });
});

// Mostra la pagina per cambiare la password.
router.get('/change-password', checkAuth, (req, res) => {
	res.render('./auth/change-password', { title: 'Change Password', layout: 'layouts/main' });
});

// Mostra la pagina per cambiare l'username.
router.get('/change-username', checkAuth, (req, res) => {
	res.render('./auth/change-username', { title: 'Change Username', layout: 'layouts/main' });
});

// Mostra la pagina di registrazione.
router.get('/register', checkNotAuth, (req, res) => {
	res.render('./auth/register', { title: 'Registrazione', layout: 'layouts/main' });
});

// Mostra la pagina per eliminare l'utente.
router.get('/delete-user', checkAuth, (req, res) => {
	res.render('./auth/delete-user', { title: 'Delete User', layout: 'layouts/main' });
});

// --- Rotte di autenticazione ---

// Gestisce il login dell'utente.
router.post('/login', passport.authenticate('local', {
	successRedirect: '/ssr/auth/user',
	failureRedirect: '/ssr/auth/login',
	failureFlash: true
}));

// Gestisce il logout dell'utente.
router.get('/logout', checkAuth, (req, res) => {
	req.logout(err => {
		if (err) {
			console.error('Errore nel logout:', err);
			return res.status(500).send('Errore nel logout');
		}
		req.session.destroy(error => {
			if (error) {
				console.error('Errore nella distruzione della sessione:', error);
				return res.status(500).send('Errore nella distruzione della sessione');
			}
			res.clearCookie('connect.sid');
			res.render('./auth/login', { title: 'Login', layout: 'layouts/main' });
		});
	});
});

// Gestisce la richiesta di cambio password.
router.post('/change-password', checkAuth, findUser, async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	try {
		await req.user.changePassword(oldPassword, newPassword);
		req.flash('success', 'Password cambiata con successo.');
	} catch (error) {
		req.flash('error', error.message);
	}
	res.redirect('/ssr/auth/user');
});

// Gestisce la richiesta di cambio nome utente.
router.post('/change-username', checkAuth, findUser, async (req, res) => {
	const { newUsername } = req.body;
	req.user.username = newUsername;
	await req.user.save();
	req.flash('success', 'Nome utente cambiato con successo.');
	res.redirect('/ssr/auth/user');
});

// Gestisce la registrazione di un nuovo utente.
router.post('/register', checkNotAuth, async (req, res) => {
	try {
		const { username, password } = req.body;
		await User.register(username, password);
		req.flash('success', 'Registrazione completata con successo. Puoi effettuare il login.');
		res.redirect('/ssr/auth/login');
	} catch (error) {
		console.error('Errore durante la registrazione:', error);
		req.flash('error', error.message);
		res.redirect('/ssr/auth/register');
	}
});

// Gestisce la richiesta di eliminazione dell'utente.
router.post('/delete-user', checkAuth, findUser, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user._id);
		req.flash('success', 'Utente eliminato con successo.');
		res.redirect('/ssr/auth/logout');
	} catch (error) {
		req.flash('error', 'Errore durante l\'eliminazione dell\'utente.');
		res.redirect('/ssr/auth/user');
	}
});

module.exports = router;
