const mongoClient = require("../connections/mongoClient");

/**
 * Gestisce i segnali di uscita per terminare il processo in modo pulito.
 * Chiude la connessione al client MongoDB e termina il processo con successo.
 *
 * @param {string} signal - Il nome del segnale ricevuto (es. 'SIGINT', 'SIGTERM').
 */
async function handleExitSignal(signal) {
	console.log(`Ricevuto ${signal}. Chiusura client MongoDB.`);
	await mongoClient.close();
	process.exit(0);
}

module.exports = handleExitSignal;
