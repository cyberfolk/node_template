const { mongoURI_envDB } = require('../config/config');
const mongoose = require('mongoose');
const Contact = require('../models/contact');

mongoose.connect(mongoURI_envDB);

const contact = [
    { name: 'Mario', email: 'mario.bossi@example.com', password: 'password123' },
    { name: 'Luigi', email: 'luigi.merdi@example.com', password: 'password123' }
];

Contact.insertMany(contact)
    .then(() => {
        console.log('Dati inseriti con successo');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Errore durante l\'inserimento:', err);
        mongoose.connection.close();
    });