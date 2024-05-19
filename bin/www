/*********************************************************************************************
 * Separare SERVER e APP:                                                                    *
 * app.js --> Definisce route, middleware e altre logiche specifiche dell'applicazione.      *
 * bin/www -> Avvia server HTTP. Configura porta d'ascolto e gestisce errori di avvio.       *
 *********************************************************************************************/

const app = require("../app");
const debug = require("debug")("node_template:server");
const http = require("http");

const port = normalizePort(process.env.PORT || "3000");
const bind = typeof port === "string" ? "Pipe " + port : "Port " + port; // Distingue una porta da una pipe
const server = http.createServer(app);

app.set("port", port); // Salvo questa {key:value} dento app

server
	.listen(port)
	.on("error", onError) // Se debug è attivo logga la porta in uso quando inizia l'ascolto
	.on("listening", () => debug(`Listening on ${bind}...`));

/*********************************************************************************************
 * Normalizza un valore di porta per determinare se è utilizzabile come porta di server.     *
 * @param {string|number} val - Il valore della porta da normalizzare.                       *
 * @returns {number|string|false} - Ritorna il numero di porta, una stringa di pipe o false  *
 *********************************************************************************************/
function normalizePort(val) {
	const parsedPort = parseInt(val, 10);
	if (isNaN(parsedPort)) return val; // named pipe
	return parsedPort >= 0 ? parsedPort : false; // port number or false
}

/*********************************************************************************************
 * Gestore di errori che logga e chiude l'app al verificarsi di specifici errori del server  *
 * @param {Object} error - L'oggetto errore emesso dall'evento 'error' del server.           *
 * @throws {Object} Rilancia error se non è syscall 'listen' o se non è riconosciuto.        *
 *********************************************************************************************/
function onError(error) {
	// Se error arriva da una syscall diversa da 'listen' non lo gestisce e lo rilancia
	if (error.syscall !== "listen") {
		throw error;
	}
	switch (error.code) {
		case "EACCES": // Il processo non ha i privilegi per ascoltare sulla porta specificata
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE": // La porta specificata è già in uso
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default: // Nessuno dei due casi precedenti, rilancio l'errore
			throw error;
	}
}
