/**************************************
*  MODULO EXPRESS                     *
**************************************/
const express = require('express');
const people = require('./people.json');
const app = express();

/**************************************
* SEND                                *
**************************************/
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
})

/**************************************
* SENDFILE                            *
**************************************/
app.get('/', (req, res) => {
    res.sendFile('home.html', { root: __dirname + '/public' });
})

/**************************************
* JSON                                *
**************************************/
app.get('/people', (req, res) => {
    res.json(people);
})

/**************************************
* JSON MAPPED                         *
**************************************/
app.get('/people_mapped', (req, res) => {
    const mappedPeople = people.map((person) => {
        const { name, age, id } = person
        return { name, age, id }
    })
    res.json(mappedPeople);
})

/**************************************
* JSON PARAMS                         *
**************************************/
app.get('/people/:id', (req, res) => {
    const { id } = req.params // id (del url) è un char -> accertarsi che anche person.id (del json) sia un char
    const personId = people.find((person) => person.id === id)
    if (!personId) {
        res.status(404).send({ "message": "Person not found", "code": 404 });
    }
    res.json(personId);
})

/**************************************
* JSON QUERY                          *
*-------------------------------------*
* Es: /search?name=A&limit=2
**************************************/
app.get('/search', (req, res) => {
    const { name, limit } = req.query
    let personFiltered = [...people]  // Creo una shallowCopy di people
    if (name) {
        personFiltered = personFiltered.filter((person) => {
            return person.name.startsWith(name)
        })
    }
    if (limit) {
        personFiltered = personFiltered.slice(0, Number(limit))
    }
    if (personFiltered.length < 1) {
        // NB: return per evitare un conflitto con il res. della riga dopo
        return res.status(200).send({ "success": true, "data": [] });
    }
    res.status(200).send(personFiltered);
})

/**************************************
* 404                                 *
**************************************/
app.all('*', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
})

app.listen(3000)