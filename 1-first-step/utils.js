function saluta(nome) {
    console.log(`ciao ${nome}`);
}

function prova() {
    console.log(`ciao da utils.js`);
}

prova() // É una funzione eseguibile e quando questo modulo viene richiamato questa funzione verrà eseguita.
module.exports = { prova, saluta }