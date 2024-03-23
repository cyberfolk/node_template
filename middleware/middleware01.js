const middleware01 = (req, res, next) => {
    const { method, url } = req;
    const time = new Date().toLocaleString('it-IT');
    console.log('MW01', time, method, url);
    // Arrivati qui rimarremmo bloccati nel middleware, per uscire si può;
    // - usare next() per proseguire con la risposta dell'endpoint
    // - usare res.send(...) direttamente dentro il middleware
    next();
}

module.exports = middleware01