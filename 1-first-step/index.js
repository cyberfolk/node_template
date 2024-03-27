/* Si esegue da terminale con $ node index.js */

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
// const saluta = require('./utils');  // importa saluta() e invoco prova() che è eseguita nel modulo
// const nomi   = require('./nomi');   // importa gli oggetti contenuti in "./nomi"
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

/*************************************************************************************************************
*  FILE SYSTEM [SINCRONO]
*************************************************************************************************************/
// const { readFileSync, writeFileSync } = require('fs');
// const prova = readFileSync('./cartella/prova.txt', 'utf8');
// const ciaoo = readFileSync('./cartella/ciaoo.txt', 'utf8');
// console.log(ciaoo)
// console.log(prova)
// writeFileSync('./cartella/tmp.txt', 'Sovrascrivo il file\n')
// writeFileSync('./cartella/tmp.txt', 'Appendo in coda questa stringa', { 'flag': 'a' })

/*************************************************************************************************************
*  FILE SYSTEM [A-SINCRONO]
* -----------------------------------------------------------------------------------------------------------*
* readFile e writeFile sono funzioni a-sincrone, questo vuol dire che quando vengono chiamate il normale     *
* flusso d'esecuzione non si stoppa, ma viene laniata una subroutine che processa la funzione. Una volta     *
* che la subroutine ha terminto, il normale flusso viene interrotto momentaneamente per eseguire la callback *
* della funzione a-sincrono, dopodichè si riparte col flusso normale da dove si era interrotto.              *
*************************************************************************************************************/
/*
const { readFile, writeFile } = require('fs');
console.log("A-SYNC [1] -> [Flusso normal] -> INIZIO");
readFile('./cartella/prova.txt', 'utf8', (error, result) => {
    if (error) throw error;
    console.log("A-SYNC [2] -> [Flusso attesa] -> readFile-1", result);
    readFile('./cartella/ciaoo.txt', 'utf8', (error, result) => {
        if (error) throw error;
        console.log("A-SYNC [3] -> [Flusso attesa] -> readFile-2", result);
    });
});
console.log("A-SYNC [4] -> [Flusso normal] -> METÀ");
writeFile('./cartella/tmp.txt', 'Appendo in coda questa stringa', { 'flag': 'a' }, (error) => {
    if (error) throw error;
    console.log("A-SYNC [5] -> [Flusso attesa] -> writeFile-1");
    writeFile('./cartella/tmp.txt', 'Appendo in coda questa stringa', { 'flag': 'a' }, (error) => {
        if (error) throw error;
        console.log("A-SYNC [6] -> [Flusso attesa] -> writeFile-2");
    });
});
console.log("A-SYNC [7] -> [Flusso normal] -> FINE");
*/

/****************************************************************************************************************
*  MODULO HTTP - V1
* --------------------------------------------------------------------------------------------------------------*
* res.write() si usa per scrivere 1+ più pezzi di dati nella risposta senza chiuderla.                          *
* res.end segnala la fine della risposta e può, può anche inviare un ultimo pezzo di dati prima di chiuderla.   *
* Si usa res.write più volte se occorre inviare dati in più passaggi. Dopo aver inviato tutti i dati necessari, *
* Si usa res.end per chiudere la risposta. Se occorre inviare un singolo messaggio o pezzo di dati, si puo      *
* semplicemente passarlo come parametro a res.end senza la necessità di chiamare prima res.write.               *
*****************************************************************************************************************/
const http = require('http')
const host = "localhost"
const PORT = process.env.PORT || 3000;  // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.
// Per settare process.env.PORT -> Da terminale: $ export PORT=5000
// Per vedere  process.env.PORT -> Da terminale: $ echo $PORT
const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204); // 204 No Content
        return res.end();
    }else{
        console.log("Ricevuto richiesta: ", req.method, req.url);
    }
    switch (req.url) {
        case "/":
        case "/home":
            res.write("<h1>Home</h1>Benvenuto sul sito");
            res.end();
            break;
        case "/andrea":
            res.write("<h1>Andrea</h1>");
            res.end();
            break;
        case "/luca":
            res.setHeader("Content-Type", "text/plain; charset=UTF-8");
            res.write("<h1>Luca</h1>");
            res.write("<p>Qui uso il Content-Type: text/plain</p>");
            res.end();
            break;
        case "/marco":
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            res.write("<h1>Luca</h1>");
            res.write("<p>qui esplicito che uso il Content-Type: text/plain</p>");
            res.write("<p>Anche se non è necessario</p>");
            res.end();
            break;
        case "/matteo":
            const body = "<h1>Matteo</h1><p>Questa e' la stringa che contiene il body della risposa effettuata con res.writeHead(...)</p>"
            res.writeHead(200, {
                "Content-Type": "text/html",
                "Content-Length": Buffer.byteLength(body),
            });
            res.end(body);
            break;
        default:
            res.writeHead(404); 
            res.write(`<h1>Errore</h1><p>Torna alla <a href='/'>home</a> perche' la pagina non esiste</p>`);
            res.end();
            break;
    }
});
server.listen(PORT, host, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
}); 
server.on('error', (err) => {
    console.log(err);
})

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

/****************************************************************************************************************
*  STREAM
* ---------------------------------------------------------------------------------------------------------------*
* Flusso di dati costante, emesso a "chunk"                                                                      *
*****************************************************************************************************************/
/* const { createReadStream, readFileSync, writeFileSync } = require("fs");
for (let i = 0; i < 10000; i++) {
    writeFileSync('./cartella/bigFile.txt', `Sono il numero ${i}\n`, { 'flag': 'a' });
}
const bigFile = readFileSync('./cartella/bigFile.txt');
console.log("bigFile:");
console.log(bigFile);
console.log("chunk:");
const stream = createReadStream('./cartella/bigFile.txt',);
stream.on('data', (chunk) => {
    console.log(chunk);
}) */

/*****************************************************************************************************************
*  FILE WATCHER + DEBOUNCE 
* ---------------------------------------------------------------------------------------------------------------*
* Il file ./cartella/prova.txt rimane in ascolto, e suoi cambiamenti verranno registrati con dei log             *
* Ho inserito un timeout per limitare il debounce, ovvero un comportamento anomalo che si ha quando si salvano   *
* i file che ci porterebbe a visualizzare più console log.                                                       *
*****************************************************************************************************************/
/* const fs = require('fs')
let timeout;

const opz = { persistent: true }
fs.watch('./cartella/prova.txt', opz, (event, filename) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        console.log(`File ${filename} evento ${event} `)
    }, 100); // Adjust debounce time as needed
}) */

/*****************************************************************************************************************
*  FILE WATCHER => EVENT EMITTER 
-----------------------------------------------------------------------------------------------------------------*
* la classe fs.watch() restituisce un EventEmitter che emette un evento 'change' quando il file cambia.          *
*****************************************************************************************************************/
/* const fs = require('fs')

const opz = { persistent: true }
const monitorato = fs.watch('./cartella/prova.txt', opz)
monitorato
    .on('change', (evt, f) => console.log(`File ${f} evento ${evt} `))
    .on('error', () => console.log("Errore nel file Monitorato"))
    .on('close', () => console.log("File non più Monitorato"))
setTimeout(() => monitorato.close(), 5000) */

/*****************************************************************************************************************
*  CHOKIDAR 
-----------------------------------------------------------------------------------------------------------------*
* Come f.watch ma gestisce il debounce e altre anomalie.                                                         *
*****************************************************************************************************************/
/* const chokidar = require('chokidar');

chokidar.watch('./cartella/prova.txt').on('all', (event, path) => {
    console.log(event, path);
}); */

/*****************************************************************************************************************
*  URL 
*****************************************************************************************************************/
/* const url = require('url');
const indirizzo = 'http://admin:123@www.sito.com:8000/p/a/t/h?id=1&nome=Anna#hash';
const {URL} = url
const urlObj = new URL(indirizzo)
console.log(urlObj)
console.log(url.parse(indirizzo)) */
