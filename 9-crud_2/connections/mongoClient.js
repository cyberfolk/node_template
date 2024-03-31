/*****************************************************************************************************************
* mongodb+srv -------> Indica che si usa il protocollo MongoDB con supporto SRV per semplificare la connessione  *
* retryWrites=true --> Permette di ritentare automaticamente una singola operazione di scrittura fallita.        *
* w=majority -> Assicura che le operazioni di scrittura siano replicata su + nodi prima di considerarle riuscite *
*****************************************************************************************************************/
const { MongoClient } = require('mongodb');

const username = encodeURIComponent(process.env.DB_USERNAME)
const password = encodeURIComponent(process.env.DB_PASSWORD)
const hostName = encodeURIComponent(process.env.DB_HOST)
const dbName__ = encodeURIComponent(process.env.DB_NAME)
const pckgName = require('../package.json').name;
const appName = `&appName=${pckgName}` // [Facoltativo] Facilita il monitoraggio delle connessioni nel cluster.
const mongoURI = `mongodb+srv://${username}:${password}@${hostName}/${dbName__}?retryWrites=true&w=majority&${appName}`
const mongoClient = new MongoClient(mongoURI);

module.exports = { mongoClient };