/*****************************************************************************************************************
*  MONGO + Atlas + dotenv                                                                                        *
* ---------------------------------------------------------------------------------------------------------------*
*  NB: Eseguire con "$ NODE_ENV=production npm start" oppure "$npm start"                                        *
*****************************************************************************************************************/

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

const { mongoClient } = require('./utility/mongoClient');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;  // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.

async function run() {
    await mongoClient.connect(); // Ritorna una promise --> necessario usare await --> necessario usare funzione async
    console.log('Siamo connessia a MongoDB Atlas!')
    app.listen(PORT, () => { console.log(`Server in ascolto sulla porta ${PORT}...`); })
}

run().catch(err => console.log('Errore Connessione: ', err));
