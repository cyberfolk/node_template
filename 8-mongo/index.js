/*****************************************************************************************************************
*  MONGO
* ---------------------------------------------------------------------------------------------------------------*
* mongodb+srv -------> Indica che si usa il protocollo MongoDB con supporto SRV per semplificare la connessione  *
* retryWrites=true --> Parametro che permette di ritentare automaticamente una singola operazione di scrittura   *
*                        fallita, migliorando così la robustezza dell'applicazione.                              *
* w=majority --------> Parametro con il quale ci si assicura che le operazioni di scrittura siano replicate su   *
*                        una maggioranza dei nodi prima di considerare l'operazione stessa come riuscita.        *
*****************************************************************************************************************/

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;  // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.

require('dotenv').config({
    path: `.env.${app.get('env')}`
});

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;

const db_name = 'blog'
const appName = '8-mongo' // Parametro opzionale usato per identificare la connessione e facilitarne il monitoraggio.

const dbURI = `mongodb+srv://${db_username}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority&appName=${appName}`

const mongoClient = new MongoClient(dbURI);

async function run() {
    await mongoClient.connect();
    console.log('Siamo connessia a MongoDB Atlas!')
    app.listen(PORT, () => {
        console.log(`Server in ascolto sulla porta ${PORT}...`);
    })
}
run().catch(err => console.log('Errore Connessione: ', err));
