const mongoose = require('mongoose');
const { mongoURI } = require('../config/config');

/******************************************************************************************************************
 * Si connette direttamente al DB specificato nel file .env, utilizzando mongoose.
 * Registra lo stato della connessione e gestisce eventuali errori loggandoli e chiudendo il client.
 ******************************************************************************************************************/
function connectMongoose() {
    mongoose.connect(mongoURI);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Errore di connessione:'));
    db.once('open', () => {
        console.log('Connesso a MongoDB!');
    });

}
module.exports = { connectMongoose, mongoose, db: mongoose.connection };
