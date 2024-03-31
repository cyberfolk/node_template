/****************************************************************************************************************
*  MODULO HTTP - switch
* --------------------------------------------------------------------------------------------------------------*
* res.write() si usa per scrivere 1+ più pezzi di dati nella risposta senza chiuderla.                          *
* res.end segnala la fine della risposta e può, può anche inviare un ultimo pezzo di dati prima di chiuderla.   *
* Si usa res.write più volte se occorre inviare dati in più passaggi. Dopo aver inviato tutti i dati necessari, *
* Si usa res.end per chiudere la risposta. Se occorre inviare un singolo messaggio o pezzo di dati, si puo      *
* semplicemente passarlo come parametro a res.end senza la necessità di chiamare prima res.write.               *
*****************************************************************************************************************/

const http = require('http')
const host = "localhost"
const PORT = 3000;
const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        return res.writeHead(204).end(); // 204 No Content
    } else {
        console.log("Ricevuto richiesta: ", req.method, req.url);
    }
    switch (req.url) {
        case "/":
        case "/home":
            res.end("<h1>Home</h1>Benvenuto sul sito");
            break;
        case "/andrea":
            res.end("<h1>Andrea</h1>");
            break;
        case "/luca":
            res.setHeader("Content-Type", "text/plain; charset=UTF-8");
            res.write("<h1>Luca</h1>");
            res.end("<p>Qui uso il Content-Type: text/plain</p>");
            break;
        case "/marco":
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            res.write("<h1>Luca</h1><p>qui esplicito che uso il Content-Type: text/plain</p>");
            res.end("<p>Anche se non è necessario</p>");
            break;
        case "/matteo":
            const body = "<h1>Matteo</h1><p>Questa stringa è il body della risposta fatta con res.writeHead(...)</p>"
            res.writeHead(200, {
                "Content-Type": "text/html",
                "Content-Length": Buffer.byteLength(body),
            });
            res.end(body);
            break;
        default:
            res.writeHead(404);
            res.end(`<h1>Errore</h1><p>Torna alla <a href='/'>home</a> perche' la pagina non esiste</p>`);
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
*  MODULO HTTP - obj routing + readStream
*****************************************************************************************************************/
/* 
const http = require('http')
const fs = require('fs')
const host = "localhost"
const PORT = 3000; 
const server = http.createServer((req, res) => {
    let htmlfile = ""
    const routing = {
        '/': 'home.html',
        '/home': 'home.html',
        '/contatti': 'contatti.html'
    }
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    render(res, routing[req.url]);
});

function render(res, htmlfile) {
    fs.stat(`./${htmlfile}`, (err, stats) => {
        if (stats) { 
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            fs.createReadStream(htmlfile).pipe(res);
        }else{
            res.statusCode = 404;
            res.end("Risorsa Non trovata");
        }
    });
}

server.listen(PORT, host, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
}); 
server.on('error', (err) => {
    console.log(err);
})
*/