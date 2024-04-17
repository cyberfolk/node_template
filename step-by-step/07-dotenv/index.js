/****************************************************************************************************************
*  DOTENV
* --------------------------------------------------------------------------------------------------------------*
* Con: $ NODE_ENV=production npm start --> process.env.NODE_ENV = 'production'  --> userò .env.production       *
* Con: $ NODE_ENV=production npm start --> process.env.NODE_ENV = 'development' --> userò .env.development      *
****************************************************************************************************************/

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

console.log(process.env.NODE_ENV);
console.log(`.env.${process.env.NODE_ENV}`);
console.log(process.env.APP_PWD);
