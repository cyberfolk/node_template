/*****************************************************************************************************************
*  CRUD + EXPRESS + MONGO (Atlas) + DOTENV                                                                                        *
* ---------------------------------------------------------------------------------------------------------------*
*  NB: Eseguire con "$ NODE_ENV=development npm start" oppure "$npm start"                                        *
*****************************************************************************************************************/
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

const { mongoClient } = require('./connections/mongoClient');
const { errorCheck } = require('./middlewares/errorCheck');
const peopleRouter = require('./routes/people');
const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;  // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.

// Middleware
app.use(express.json());
app.use(errorCheck); // Controllo errori
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // Consente di elaborare dati nel req.body
app.use('/api/people', peopleRouter);


async function run() {
    await mongoClient.connect();  // Ritorna una promise --> necessario usare await --> necessario usare funzione async
    console.log('Siamo connessia a MongoDB Atlas!')
    app.listen(PORT, () => { console.log(`Server in ascolto sulla porta ${PORT}...`); })
}

run().catch(err => console.log('Errore Connessione: ', err));
