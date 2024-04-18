## Cosa sono i Middleware?

I middleware sono funzioni che intervengono nella gestione delle richieste in un'applicazione web. Essi hanno accesso agli oggetti:

-   `request` (richiesta),
-   `response` (risposta),
-   `next` (la funzione che passa il controllo al successivo middleware nella catena).

Questo meccanismo permette di eseguire codice, modificare gli oggetti delle richieste e delle risposte, e terminare il ciclo di richiesta-risposta, o passare il controllo al prossimo middleware.
