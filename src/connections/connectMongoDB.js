// Modulo Deprecato. Funziona, ma non è utilizzato.
// Al suo posto viene usato ./connections/connectMongoDB.js

const { MongoClient } = require("mongodb");
const { mongoURI } = require('../config/config');
const mongoClient = new MongoClient(mongoURI);

/******************************************************************************************************************
 * Si connette asincronamente al DB utilizzando l'istanza di Client fornita.
 * Registra lo stato della connessione e gestisce eventuali errori loggandoli e chiudendo il client.
 *
 * @param {Client} client - L'istanza del Client per connettersi al database.
 ******************************************************************************************************************/
async function connectDB(client) {
    try {
        await client.connect(); // Return promise --> richiede await --> richiede function async
        console.log("Siamo connessi al DB!");
    } catch (err) {
        console.error("Chiusura del client...");
        console.error("Chiusura del applicazione...");
        console.error("Errore Connessione:", err);
        await client.close();
        process.exit(1);
    }
}

/******************************************************************************************************************
 * Si connette direttamente al DB specificato nel file .env. É più pulito della funzione *connectDB* ma è vincolato
 * al file .env. Registra lo stato della connessione e gestisce eventuali errori loggandoli e chiudendo il client.
 ******************************************************************************************************************/
function connectDirectDB() {
    connectDB(mongoClient);
}
module.exports = { mongoClient, connectDB, connectDirectDB };
