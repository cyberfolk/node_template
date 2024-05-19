/******************************************************************************************************************
 *  Utils => setupEventHandler 
 *
 * ****************************************************************************************************************
 * Imposta i gestori di eventi per i segnali di chiusura pulita dell'applicazione.
 * 
 * @param {MongoClient} client - Il client MongoDB usato per gestire la connessione al database.
*****************************************************************************************************************/
function setupEventHandler(client) {
	const handleSignal = createSignalHandler(client);
	process.on("SIGINT", handleSignal("SIGINT")); // SIGINT indica una terminazione da parte dell'utente.
	process.on("SIGTERM", handleSignal("SIGTERM")); // SIGTERM indica una terminazione programmata e ordinata
}

/******************************************************************************************************************
 * Restituisce una funzione che gestisce i segnali di uscita. Questa funzione restituita chiuderà la connessione MongoDB
 * e terminerà il processo quando viene chiamata.
 * 
 * @param {MongoClient} clientDB - Il client usato per gestire la connessione al database.
 * @returns {Function} Una funzione che prende un tipo di segnale e gestisce la chiusura dell'applicazione.
*****************************************************************************************************************/
function createSignalHandler(clientDB) {
	return (signal) => async () => {
		console.log(`Ricevuto segnale ${signal}. Chiusura del client del database.`);
		try {
			await clientDB.close();
			console.log("Connessione al database chiusa con successo.");
			process.exit(0);
		} catch (error) {
			console.error("Chiusura della connessione al database fallita:", error);
			process.exit(1);
		}
	};
}

module.exports = setupEventHandler;

/******************************************************************************************************************
 * *** USO DI CLOSURE PER EVITARE LA RIPETIZIONE DEL PARAMETRO CLIENT ***
 * 
 * Nella funzione `setupEventHandler`, si utilizza una funzione parzialmente applicata, `createSignalHandler`,
 * che riceve come parametro il client MongoDB. Questa funzione restituisce una nuova funzione già configurata
 * con il client, che può essere utilizzata direttamente come gestore per i segnali SIGINT e SIGTERM.
 * 
 * La chiusura (closure) è una funzionalità che permette alla funzione interna di ricordare e accedere alle 
 * variabili della funzione esterna, in questo caso il `clientDB`. Questo approccio elimina la necessità 
 * di ripassare il `client` ogni volta che si deve gestire un segnale di uscita, rendendo il codice più 
 * pulito e mantenendo il client nascosto e sicuro all'interno della closure.
 * 
 * Questa strategia riduce il coupling e migliora la modularità e la riusabilità del codice, consentendo 
 * una migliore gestione delle risorse e una struttura più organizzata.
 ******************************************************************************************************************/
