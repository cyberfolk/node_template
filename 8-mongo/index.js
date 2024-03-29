/*****************************************************************************************************************
*  MONGO + Atlas + dotenv                                                                   *
* ---------------------------------------------------------------------------------------------------------------*
*  NB: Eseguire con "$ NODE_ENV=production npm start" oppure "$npm start"                                        *
* ---------------------------------------------------------------------------------------------------------------*
* mongodb+srv -------> Indica che si usa il protocollo MongoDB con supporto SRV per semplificare la connessione  *
* retryWrites=true --> Permette di ritentare automaticamente una singola operazione di scrittura fallita.        *
* w=majority -> Assicura che le operazioni di scrittura siano replicata su + nodi prima di considerarle riuscite *
*****************************************************************************************************************/

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

username = encodeURIComponent(process.env.DB_USERNAME)
password = encodeURIComponent(process.env.DB_PASSWORD)
hostName = encodeURIComponent(process.env.DB_HOST)
appName = '8-mongo' // Facilita il monitoraggio delle connessioni nel cluster MongoDB.
dbName = 'blog'
const dbURI = `mongodb+srv://${username}:${password}@${hostName}/${dbName}?retryWrites=true&w=majority&appName=${appName}`
const mongoClient = new MongoClient(dbURI);
const PORT = process.env.PORT || 3000;  // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.

async function run() {
    await mongoClient.connect(); // Ritorna una promise --> necessario usare await --> necessario usare una funzione async
    console.log('Siamo connessia a MongoDB Atlas!')
    app.listen(PORT, () => { console.log(`Server in ascolto sulla porta ${PORT}...`); })
}
run().catch(err => console.log('Errore Connessione: ', err));
