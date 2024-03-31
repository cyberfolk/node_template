/*************************************************************************************************************
*  VARIABILI GLOBABLI
*************************************************************************************************************/
// console.log("__filename ->", __dirname);   // Nome del file corrente
// console.log("__dirname -->", __filename);  // Percoso alla cartella corrente
// console.log("module ----->", module);      // Info sul modulo corrente
// console.log("process ---->", process);     // Info relative all 'ambiente di esecuzione

/*************************************************************************************************************
*  MODULI CUSTOM
*************************************************************************************************************/
// const saluta = require('./cartella/utils');  // importa saluta() e invoco prova() che è eseguita nel modulo
// const nomi   = require('./cartella/nomi');   // importa gli oggetti contenuti in "./nomi"
// saluta.saluta("mario");
// saluta.saluta(nomi.persona4);
// console.log("nomi", nomi)
// console.log("saluta", saluta)

/*************************************************************************************************************
*  MODULO [OS]
*************************************************************************************************************/
// const os = require('os')
// console.log("os.hostname() ->", os.hostname())
// console.log("os.userInfo() ->", os.userInfo())
// console.log("os.uptime() --->", os.uptime() / 60 / 60)
// console.log("os.arch() ----->", os.arch())
// console.log("os.type() ----->", os.type())
// console.log("os.release() -->", os.release())
// console.log("os.totalmem() ->", os.totalmem())
// console.log("os.freemem() -->", os.freemem())

/*************************************************************************************************************
*  MODULO [PATH]
*************************************************************************************************************/
// const path = require('path')
// const pathFile = path.join('/cartella', 'sottocartella', 'file.txt')
// const pathAbsolute = path.join(__dirname, '/cartella', 'sottocartella', 'file.txt')
// console.log("pathFile ----------------->", pathFile)
// console.log("pathAbsolute ------------->", pathAbsolute)
// console.log("path.basename(pathFile)) ->", path.basename(pathFile))
// console.log("path.sep ----------------->", path.sep);
// console.log("path.resolve() ----------->", path.resolve())
// console.log("__dirname ---------------->", __dirname);

/****************************************************************************************************************
*  NODEMON
* ---------------------------------------------------------------------------------------------------------------*
* $ npm install nodemon -D --> Installa nodemon tra le devDependencies                                           *
* In "package.json" --> Cerco "scripts": { .. } --> Aggiungo "start": "nodemon index.js"                         *
* $ npm start --> Avvia il server che rimane in attesa e si refresca ad ogni modifica salvata.                   *
*****************************************************************************************************************/

/****************************************************************************************************************
*  EVENT EMITTER
*****************************************************************************************************************/
/* const EventEmitter = require('events');
const customEmitter = new EventEmitter();
customEmitter.on("messaggio", (nome, anno) => {
    console.log("Heii", nome, "siamo nel", anno);
});
customEmitter.emit("messaggio", "Andrea", 2024); */

/*****************************************************************************************************************
*  URL 
*****************************************************************************************************************/
/* const url = require('url');
const indirizzo = 'http://admin:123@www.sito.com:8000/p/a/t/h?id=1&nome=Anna#hash';
const {URL} = url
const urlObj = new URL(indirizzo)
console.log(urlObj)
console.log(url.parse(indirizzo)) */