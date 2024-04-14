/*****************************************************************************************************************
 * CONFIG + DOTENV
 *****************************************************************************************************************/

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

// Recupero le variabili d'ambiente
const port = process.env.PORT || 3000; // Se non PORT fallback su 3000.
const secretKey = encodeURIComponent(process.env.SESSION_SECRET_KEY)
const dbConfig = {
    username: encodeURIComponent(process.env.DB_USERNAME),
    password: encodeURIComponent(process.env.DB_PASSWORD),
    hostName: encodeURIComponent(process.env.DB_HOST),
    dbName: encodeURIComponent(process.env.DB_NAME),
}

module.exports = { port, secretKey, dbConfig };
