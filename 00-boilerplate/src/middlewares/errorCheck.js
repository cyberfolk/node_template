/******************************************************************************************************************
 *  MIDDLEWARE = CONTROLLO ERRORI                                                                                 *
 *****************************************************************************************************************/

/**
 * Middleware di gestione degli errori per intercettare e rispondere a errori comuni.
 * Gestisce specificamente gli errori di parsing JSON e gli errori interni del server,
 * fornendo risposte HTTP appropriate.
 */
const errorCheck = (err, req, res, next) => {
    console.error(err);

    // Imposta un messaggio di errore predefinito basato sullo status, se non fornito
    const defaultMessage = {
        400: "Invalid request. Please check your input.",
        401: "Unauthorized. You are not authorized to access this resource.",
        403: "Forbidden. You do not have permission to perform this action.",
        404: "Not Found. The requested resource was not found.",
        422: "Unprocessable Entity. Check your input.",
        500: "Internal Server Error. Please try again later."
    };

    // Se err non ha uno status, consideralo un Internal Server Error
    const status = err.status || 500;
    const errorResponse = {
        success: false,
        status: status,
        error: err.message || defaultMessage[status]
    };

    return res.status(status).json(errorResponse);
};

module.exports = errorCheck;
