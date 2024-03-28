/****************************************************************************************************************
*  DOTENV
* --------------------------------------------------------------------------------------------------------------*
* In base a come eseguo il programma da terminale posso cambiare le variabili d'ambiente                        *
* Con: $ NODE_ENV=production npm start --> app.get('env') = 'production'                                        *
* Con: $ npm start ----------------------> app.get('env') = 'development'                                       *
* E in base a app.get('env') posso eseguire due file di convfigurazione differente                              *
*****************************************************************************************************************/

const morgan = require('morgan');
const express = require('express');
const app = express();

require('dotenv').config({
    path: `.env.${ app.get('env') }`
});

console.log(app.get('env'));
console.log(`.env.${ app.get('env') }`);
console.log(process.env.APP_PWD);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
    res.send('Home page\n ');    
})

app.listen(3000);