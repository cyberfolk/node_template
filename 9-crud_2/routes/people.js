const express = require('express');
const { mongoClient } = require('../utility/mongoClient');
const people = [];
const routes = express.Router();
const peopleCollection = mongoClient.db('blog').collection('people');


/************************************************************
*  GET - Tutte le persone                                   *
************************************************************/
routes.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people });
})

/************************************************************
*  GET - Una persona specifica                              *
************************************************************/
routes.get('/:id', (req, res) => {
    const { id } = req.params // id (del url) è un char -> accertarsi che anche person.id (del json) sia un char
    const personId = people.find((person) => person.id === id)
    if (!personId) {
        res.status(404).send({ "message": "Person not found", "code": 404 });
    }
    res.status(200).json({ success: true, data: personId });
})

/************************************************************
*  POST - Una persona specifica                             *
************************************************************/
routes.post('/', async (req, res) => {
    const person = req.body
    const ris = await peopleCollection.insertOne(person)
    if (ris.acknowledged) {
        res.status(200).json({ success: true, data: people });
    }
})

/************************************************************
*  PUT - Una persona specifica                              *
************************************************************/
routes.put('/:id', (req, res) => {
    const { id } = req.params;
    const personPut = req.body;
    const index = people.findIndex((person) => person.id === id);

    if (index === -1) {
        return res.status(404).send({ "message": "Person not found", "code": 404 });
    }

    people[index] = { ...people[index], ...personPut };

    res.status(200).json({ success: true, data: people });
});


/************************************************************
*  DELETE - Una persona specifica                           *
************************************************************/
routes.delete('/:id', (req, res) => {
    const { id } = req.params // id (del url) è un char -> accertarsi che anche person.id (del json) sia un char
    const index = people.findIndex((person) => person.id === id)
    if (index === -1) {
        return res.status(404).send({ "message": "Person not found", "code": 404 });
    }

    people.splice(index, 1)
    res.status(200).json({ success: true, data: people });
})

module.exports = routes