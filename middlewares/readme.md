# Middleware in Express.js

I middleware sono funzioni che intervengono nella gestione delle richieste in un'applicazione web. La loro firma è così composta:

-   `req` &rarr; Oggetto Richiesta.
-   `res` &rarr; oggetto Risposta.
-   `next` &rarr; Funzione che passa il controllo al successivo middleware nella catena.

Questo meccanismo permette di:

-   Eseguire il codice presente nel corpo del middleware,
-   Modificare gli oggetti `req` e `res,
-   Terminare il ciclo di _richiesta-risposta_,
-   Passare il controllo al prossimo middleware usano `next()`.
