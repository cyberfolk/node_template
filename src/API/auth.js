const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ms = require("ms");
const { secretKeyJwt } = require('../config/config');


// Rotta di login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ message: 'Authentication failed' }); }

        req.logIn(user, { session: false }, (err) => {
            if (err) { return next(err); }
            const payload = {
                id: user.id,
                expiration: Date.now() + ms('1h')
            };
            const token = jwt.sign(payload, secretKeyJwt);
            const secure = process.env.NODE_ENV === 'prod';
            const cookieSettings = {
                expires: new Date(Date.now() + ms('1h')), // Imposta la scadenza del cookie
                httpOnly: true,  // Mitiga attacchi XSS
                secure: secure,  // Se true permette di navigare solo su HTTPS
                sameSite: 'Lax'   // [Default]='None'. Ho impostato lax per prevenire attacchi CSRF
            };
            res.cookie('jwt', token, cookieSettings);
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});


module.exports = router;


/* 
router.get("/logout-parziale", deleteToken, (req, res) => {
    res.send('logout-parziale effettuato...')
})

router.get("/user", verifyToken, (req, res) => {
    const theme = req.user.theme
    console.log(theme);
    res.render('user', { theme })
})

router.get("/user/cambio-email", verifyToken, (req, res) => {
    res.render('cambio-email')
})

router.post("/user/cambio-email", verifyToken, (req, res) => {
    const email = req.body.email;
    res.send(`Hai richiestoo la modifica di email in ${email}. Sei autorizzato.`)
}) */

module.exports = router;
