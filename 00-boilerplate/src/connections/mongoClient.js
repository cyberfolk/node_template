const { MongoClient } = require("mongodb");

/******************************************************************************************************************
 *  Connect: Factory => MongoClient 
 *
 * ****************************************************************************************************************
 * Crea e configura un'istanza di MongoClient.
 *
 * @param {Object} dbConfig - Configurazioni per il database, incluse username, password, hostName e dbName.
 * @return {MongoClient} Istanza configurata di MongoClient.
 *****************************************************************************************************************/
function createMongoClient(dbConfig) {
    const pckgName = require("../../package.json").name;
    const appName = `appName=${pckgName}`; // [Opzionale] Facilita il monitoraggio delle connessioni nel cluster.
    const credentials = `${dbConfig.username}:${dbConfig.password}`;
    const hostDetails = `${dbConfig.hostName}/${dbConfig.dbName}`;
    const options = "retryWrites=true&w=majority&" + appName;
    const mongoURI = `mongodb+srv://${credentials}@${hostDetails}?${options}`;

    const client = new MongoClient(mongoURI);
    return client;
}

module.exports = createMongoClient;

/******************************************************************************************************************
 * mongodb+srv -------> Protocollo per una connessione semplificata a cluster MongoDB.                            *
 * retryWrites=true" -> Abilita il ritentativo automatico di operazioni di scrittura che falliscono.              * 
 * w=majority --------> Accerta che le operazioni di scrittura siano replicata su + nodi prima di confermarle.    *
 ******************************************************************************************************************/
