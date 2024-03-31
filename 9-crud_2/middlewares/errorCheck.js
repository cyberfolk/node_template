/*****************************************************************************************************************
*  MIDDLEWARE = CONTROLLO ERRORI                                                                                 *
* ---------------------------------------------------------------------------------------------------------------*
*  Intercetta errori di sintassi JSON nelle richieste                                                            *
*****************************************************************************************************************/


const errorCheck = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Invia una risposta personalizzata in caso di errore di parsing JSON
        return res.status(400).json({
            status: 400,
            error: "Invalid JSON format in request body. Please check your JSON syntax."
        });
    }
    // Passa all'errore successivo se ce n'è uno
    next(err);
};

module.exports = { errorCheck };
