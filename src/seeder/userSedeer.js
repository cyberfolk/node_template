// eseguibile con $ NODE_ENV=dev node src/seeder/userSedeer.js
const { mongoURI_envDB } = require('../config/config');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

mongoose.connect(mongoURI_envDB);

const users = [
    //{ username: 'admin', password: 'admin' },
    //{ username: 'demo', password: 'demo' },
    { username: 'luca', password: 'luca' },
    { username: 'marco', password: 'marco' },
    { username: 'matteo', password: 'matteo' },
    { username: 'giovanni', password: 'giovanni' },
    { username: 'user001', password: 'user001' },
    { username: 'user002', password: 'user002' },
    { username: 'user003', password: 'user003' },
    { username: 'user004', password: 'user004' },
    { username: 'user005', password: 'user005' },
    { username: 'user006', password: 'user006' },
    { username: 'user007', password: 'user007' },
    { username: 'user008', password: 'user008' },
    { username: 'user009', password: 'user009' },
    { username: 'user010', password: 'user010' },
    { username: 'user011', password: 'user011' },
    { username: 'user012', password: 'user012' },
    { username: 'user013', password: 'user013' },
    { username: 'user014', password: 'user014' },
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
