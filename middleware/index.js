/**********************************************************
*  MIDDLEWARE                                             *
* ------------------------------------------------------- *
*  I middleware sono funzioni che si inseriscono tra la   *
*  chiamata di un endpoint e la sua risposta              *
**********************************************************/
const express = require('express');
const app = express();
const middleware01 = require('./middleware01');

app.use(express.json()) // Mi permette di accedere al paramtero body delle request
app.use(middleware01) // Uso questo middlewre in tutte le route
// app.use('/about', middleware01) // Uso il middlewre in tutte le route che partono da /about

app.get('/home', (req, res) => {
    res.send('<h1>home</h1>');
})

app.post('/home', (req, res) => {
    console.log(req.body)
    res.json(req.body);
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>');
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
})

app.listen(3000)