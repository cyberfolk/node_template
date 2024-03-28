/*****************************************************************************************************************
*  MONGO - connessione ad Atlas tramite dotenv
* ---------------------------------------------------------------------------------------------------------------*
*  Configurare il file .env e poi eseguire "$ NODE_ENV=production npm start" oppure "$npm start"                 *
* ---------------------------------------------------------------------------------------------------------------*
* PARAMETRI INTERESSANTI                                                                                         *
* mongodb+srv -------> Indica che si usa il protocollo MongoDB con supporto SRV per semplificare la connessione  *
* retryWrites=true --> Parametro che permette di ritentare automaticamente una singola operazione di scrittura   *
*                        fallita, migliorando così la robustezza dell'applicazione.                              *
* w=majority --------> Parametro con il quale ci si assicura che le operazioni di scrittura siano replicate su   *
*                        una maggioranza dei nodi prima di considerare l'operazione stessa come riuscita.        *
*****************************************************************************************************************/

const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');
require('dotenv').config({
    path: `.env.${app.get('env')}`
});

const dbConfig = {
    username: encodeURIComponent(process.env.DB_USERNAME),
    password: encodeURIComponent(process.env.DB_PASSWORD),
    host: encodeURIComponent(process.env.DB_HOST),
    appName: '8-mongo', // Facilita il monitoraggio delle connessioni nel cluster MongoDB.
    name: 'blog'
};
const dbURI = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}?retryWrites=true&w=majority&appName=${dbConfig.appName}`
const mongoClient = new MongoClient(dbURI);
const PORT = process.env.PORT || 3000;  // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.


async function run() {
    await mongoClient.connect(); // Ritorna una promise, quindi è necessario usare await, e await deve essere all'interno di una funzione async
    console.log('Siamo connessia a MongoDB Atlas!')
    app.listen(PORT, () => { console.log(`Server in ascolto sulla porta ${PORT}...`); })
}
run().catch(err => console.log('Errore Connessione: ', err));
