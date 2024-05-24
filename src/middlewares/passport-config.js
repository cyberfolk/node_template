const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Definizione della strategia locale con Passport
passport.use('local-auth', new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await user.verifyPassword(password);
        console.log(`Risultato della verifica password: ${isMatch}`);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        console.error('Errore durante l\'autenticazione:', err);
        return done(err);
    }
}));

// Serializzazione dell'utente
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializzazione dell'utente
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
