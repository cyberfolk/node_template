// eseguibile con $ NODE_ENV=dev node src/seeder/userSedeer.js
const { mongoURI_envDB } = require('../config/config');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

mongoose.connect(mongoURI_envDB);

const users = [
    //{ username: 'admin', password: 'admin' },
    { username: 'demo', password: 'demo' },
];

const insertUsers = async (users) => {
    try {
        // Hash delle password in parallelo
        await Promise.all(users.map(async user => {
            user.password = await bcrypt.hash(user.password, 10);
        }));
        await User.insertMany(users);
        console.log('Dati inseriti con successo');
    } catch (err) {
        console.error('Errore durante l\'inserimento:', err);
    } finally {
        mongoose.connection.close();
    }
};

// Esegui l'inserimento degli utenti
insertUsers(users);
