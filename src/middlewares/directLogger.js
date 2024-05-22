/******************************************************************************************************************
 * Middleware => Direct Logger 
 *
 * Loggare immediatamente i dettagli delle richieste in arrivo.
 * Stampa: il timestamp corrente, il metodo HTTP e il percorso della richiesta.
 * ES: 2024-04-02T21:47:23.040Z - GET /api/people
 *******************************************************************************/
const directLogger = (req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next(); // Passa il controllo al prossimo middleware o route handler
};

module.exports = directLogger;
