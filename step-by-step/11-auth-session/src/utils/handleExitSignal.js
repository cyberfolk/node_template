
/**
 * Gestisce i segnali di uscita per terminare il processo in modo pulito.
 * Chiude la connessione al client MongoDB e termina il processo con successo.
 * 
 * @param {string} signal - Il nome del segnale ricevuto (es. 'SIGINT', 'SIGTERM').
 * @param {client} clientDB - Il client utilizzato per gestire la connessione al database.
 */
async function handleExitSignal(signal, clientDB) {
	console.log(`Ricevuto ${signal}. Chiusura client database.`);
	await clientDB.close();
	process.exit(0);
}

module.exports = handleExitSignal;
