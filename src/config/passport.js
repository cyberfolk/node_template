const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const jwt = require('jsonwebtoken');

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
/* 

// Configurazione della strategia JWT
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
  const user = users.find(u => u.id === jwt_payload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));
 */



/* 
Passaport (probabilmente intendi Passport.js) può essere configurato sia con sessioni che con JWT (JSON Web Tokens), a seconda delle esigenze dell'applicazione.

Sessioni:

Utilizza sessioni server-side per mantenere lo stato dell'utente.
Richiede l'uso di un middleware di sessione come express-session.
Buono per applicazioni dove è accettabile mantenere le sessioni sul server.
JWT:

Utilizza token per autenticare le richieste client-side.
I token vengono inviati con ogni richiesta HTTP e verificati lato server.
Ideale per applicazioni senza stato (stateless) e per autenticazione tra microservizi.

---

In sintesi, con le sessioni utilizzi express-session e configuri Passport per utilizzare la sessione lato server, mentre con JWT configuri Passport per accettare e verificare i token JWT che vengono inviati con ogni richiesta.
 */