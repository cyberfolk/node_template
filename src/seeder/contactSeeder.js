// eseguibile con $ NODE_ENV=dev node src/seeder/contactSeeder.js
const { mongoURI_envDB } = require('../config/config');
const mongoose = require('mongoose');
const Contact = require('../models/contact');

mongoose.connect(mongoURI_envDB);

const contact = [
    { name: 'Contatto001', email: 'contatto001@example.com' },
    { name: 'Contatto002', email: 'contatto002@example.com' },
    { name: 'Contatto003', email: 'contatto003@example.com' },
    { name: 'Contatto004', email: 'contatto004@example.com' }
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
