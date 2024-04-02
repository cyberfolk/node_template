/******************************************************************************************************************
 *  ASYNCANDLER = WRAPPER per gestire gli errori                           *
 * ---------------------------------------------------------------------------------------------------------------*
 * La funzione asyncHandler è un middleware di utilità progettato per applicazioni Express.js. Il suo scopo è 
 * gestire in modo elegante le funzioni asincrone all'interno delle route, catturando qualsiasi errore che si
 * verifica e passandolo automaticamente al middleware di gestione degli errori di Express senza dover scrivere
 * esplicitamente blocchi try-catch in ogni route asincrona. Ecco come funziona, passo dopo passo:
 * 
 * Accetta una Funzione (fn) come Argomento:
 * asyncHandler è una funzione di ordine superiore, il che significa che prende un'altra funzione come argomento.
 * Questa funzione fn rappresenta la logica asincrona che si vuole eseguire in una determinata route Express.
 * 
 * Ritorna una Nuova Funzione:
 * La chiamata a asyncHandler(fn) ritorna una nuova funzione. Questa funzione ritornata è compatibile con le
 * aspettative di Express per un middleware o un handler di route, nel senso che accetta gli argomenti req, res, e next:
 *  - req: l'oggetto della richiesta HTTP,
 *  - res: l'oggetto della risposta HTTP,
 *  - next: una funzione che passa il controllo al prossimo middleware nella catena.
 * 
 * Esegue la Funzione Asincrona (fn):
 * Quando la funzione ritornata viene eseguita da Express (cioè, quando una route viene richiesta), essa chiama
 * fn passandogli req, res, e next. Utilizza Promise.resolve() per assicurarsi che qualsiasi cosa ritorni fn 
 * (che può essere un valore o una promessa) venga trattata come una promessa. Questo è utile perché:
 *  - Se fn ritorna direttamente una Promise (ad esempio, il risultato di una chiamata a un database asincrono),
 *    Promise.resolve() restituirà quella Promise.
 *  - Se fn ritorna un valore non-Promise (un caso sincrono), Promise.resolve() avvolgerà quel valore in una 
 *    Promise risolta, garantendo che il trattamento successivo sia consistente sia per operazioni sincrone che asincrone.
 * 
 * Gestione degli Errori:
 * Se la promessa risolta da fn viene rifiutata (cioè, se si verifica un errore durante l'esecuzione di fn),
 * il metodo .catch() cattura l'errore e lo passa alla funzione next di Express. Questo meccanismo attiva il
 * middleware di gestione degli errori di Express, consentendo di gestire l'errore in un unico posto anziché
 * doverlo fare manualmente in ogni route. Passando next al metodo .catch(), l'errore viene poi inoltrato al 
 * middleware di gestione degli errori di Express. La funzione next è una funzione callback di Express che, 
 * quando viene chiamata con un argomento, segnala a Express che si è verificato un errore, spingendo Express 
 * a saltare tutti i middleware successivi fino al prossimo gestore di errori nella catena di middleware.
 * 
 * In sintesi, asyncHandler permette di scrivere codice asincrono nelle route Express in modo più pulito e sicuro,
 * riducendo la necessità di blocchi try-catch ripetitivi e migliorando la leggibilità. Automatizza la cattura 
 * e il forwarding degli errori al sistema di gestione degli errori di Express, facilitando la gestione degli 
 * errori asincroni in un'applicazione.
*****************************************************************************************************************/

/**
 * Middleware per la gestione asincrona degli errori in Express.
 * Avvolge una funzione di route asincrona e passa eventuali errori al middleware di gestione degli errori di Express.
 *
 * @param {Function} fn - La funzione asincrona da eseguire all'interno della route Express.
 * @returns {Function} Una funzione middleware che prende gli oggetti `req`, `res`, e `next` di Express.
 */
function asyncHandler(fn) {
	return function (req, res, next) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

// Versione Alternativa:
// const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler
