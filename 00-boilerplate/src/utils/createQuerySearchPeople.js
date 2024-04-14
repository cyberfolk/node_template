/******************************************************************************************************************
 *  Utils: createQuerySearchPeople => Query da usare nelle route della collection People
 *
 * ****************************************************************************************************************
 * Crea un oggetto query per la ricerca sulla collection People, partendo dai parametri della request. Supporta la
 * ricerca case-insensitive per il name che inizia con un valore specificato e l'assegnazione diretta per tutti
 * gli altri parametri di ricerca validi.
 *
 * @param {Object} req - L'oggetto richiesta Express, che contiene i parametri di query.
 * @returns {Object} Una di query per MongoDB, dove per `name` viene usata una reg-ex per la ricerca "inizia con" 
 * case-insensitive, e tutti gli altri parametri di query validi sono inclusi come sono.
 *****************************************************************************************************************/

function createQuerySearchPeople(req) {
    return Object.entries(req.query).reduce((acc, [key, value]) => {
        if (value) { // Controlla se il valore associato alla chiave corrente esiste.
            if (key === "name") { // Se la chiave è 'name', trattala in modo speciale.
                // Usa una regex per fare la ricerca "inizia con", ignorando il case.
                acc[key] = new RegExp("^" + value, "i");
            } else {
                acc[key] = value; // Per tutte le altre chiavi, assegna direttamente il valore.
            }
        }
        return acc; // Restituisci l'accumulatore per il prossimo ciclo di iterazione.
    }, {}); // L'oggetto vuoto qui è il valore iniziale dell'accumulatore.
}

module.exports = createQuerySearchPeople;

/******************************************************************************************************************
 * PROCESSO:                                                                                                      *
 * 1. Iterazione sui Parametri: Utilizza Object.entries(req.query) per iterare su ogni coppia chiave-valore       *
 *    presente nell'oggetto query della richiesta HTTP.                                                           *
 * 2. Controllo del Valore: Per ogni coppia, verifica se esiste un valore associato. Se non c'è un valore,        *
 *    la coppia viene ignorata.                                                                                   *
 * 3. Gestione Speciale per 'name': Se la chiave è 'name', il valore viene trattato con una regex che             *
 *    implementa una ricerca "inizia con", ignorando differenze di maiuscole e minuscole. Questo approccio        *
 *    è particolarmente utile per ricerche testuali flessibili.                                                   *
 * 4. Assegnazione Diretta: Per tutte le altre chiavi, assegna direttamente il valore all'accumulatore.           *
 * 5. Accumulatore: L'oggetto vuoto iniziale serve come base per costruire dinamicamente l'oggetto di query       *
 *    finale, che viene poi ritornato dalla funzione.                                                             *
 *                                                                                                                *
 * USO:                                                                                                           *
 * La funzione è ideale per elaborare parametri di ricerca dinamici in applicazioni web, riducendo la             *
 * necessità di scrivere logiche di filtro complesse e migliorando la leggibilità del codice.                     *
 *****************************************************************************************************************/
