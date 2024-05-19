const { mongoURI_envDB } = require('../config/config');
const mongoose = require('mongoose');
const User = require('../models/contact');

mongoose.connect(mongoURI_envDB);

const utenti = [
    { name: 'Mario', email: 'mario.bossi@example.com', password: 'password123' },
    { name: 'Luigi', email: 'luigi.merdi@example.com', password: 'password123' }
];

User.insertMany(utenti)
    .then(() => {
        console.log('Dati inseriti con successo');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Errore durante l\'inserimento:', err);
        mongoose.connection.close();
    });