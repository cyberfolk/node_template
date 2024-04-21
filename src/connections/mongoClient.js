const { MongoClient } = require("mongodb");

/******************************************************************************************************************
 *  Connect: Factory => MongoClient 
 *
 * ****************************************************************************************************************
 * Crea un'istanza di MongoClient configurandola coi dati del parametro dbConfig. 
 *
 * @param {Object} dbConfig - Configurazioni per il database [username, password, hostName e dbName].
 *                            Dati personali che arrivano dal file di configurazione.
 * @return {MongoClient} Istanza configurata di MongoClient.
 *****************************************************************************************************************/
function createMongoClient(dbConfig) {
    const pckgName = require("../../package.json").name;
    const appName = `appName=${pckgName}`; // [Opzionale] Facilita il monitoraggio delle connessioni nel cluster.
    const credentials = `${dbConfig.username}:${dbConfig.password}`;
    const hostDetails = `${dbConfig.hostName}`;
    const options = "retryWrites=true&w=majority&" + appName;
    const mongoURI = `mongodb+srv://${credentials}@${hostDetails}?${options}`;

    const client = new MongoClient(mongoURI);
    return client;
}

module.exports = createMongoClient;

/******************************************************************************************************************
 * INFORMAZIONI SUI PARAMETRI MONGO-URI                                                                           *
 * mongodb+srv -------> Protocollo per una connessione semplificata a cluster MongoDB.                            *
 * retryWrites=true" -> Abilita il ritentativo automatico di operazioni di scrittura che falliscono.              * 
 * w=majority --------> Accerta che le operazioni di scrittura siano replicata su + nodi prima di confermarle.    *
 ******************************************************************************************************************/
