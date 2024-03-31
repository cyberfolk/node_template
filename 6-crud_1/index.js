/**************************************
*  MODULO CRUD                        *
**************************************/
const express = require('express');
const app = express();
const peopleRouter = require('./routes/people');

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Consente di elaborare dati rocevuti dai form

app.use('/api/people', peopleRouter)


app.listen(3000)