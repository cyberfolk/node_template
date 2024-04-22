# Demo di Attacco CSRF su Autenticazione JWT

Questo progetto dimostra un attacco CSRF (Cross-Site Request Forgery) sfruttando le rotte Node.js protette da JSON Web Tokens (JWT). L'attacco permette di cambiare l'indirizzo email di un utente autenticato tramite l'interazione involontaria con un'altra pagina web.

## Descrizione dell'Attacco

L'attacco viene realizzato tramite un form HTML che si auto-invia, portando a un cambio di email senza il consenso dell'utente. Il flusso dell'attacco è il seguente:

1. L'utente autenticato visita una pagina malevola sotto il controllo dell'attaccante (es. http://127.0.0.1:8000/index.html).
2. La pagina contiene un form HTML che si auto-invia alla rotta protetta (http://localhost:3000/demo/jwt/user/cambio-email) bypassando i controlli lato server perché sul browser dell'attaccato è già presente il token JWT.
3. Nel form dell'attaccante è inserito un nuovo indirizzo email (`attaccante@example.com`) che viene passato alla rotta di cambio email.

## Eseguire Demo Attack CSRF

-   Posizionarsi col terminale nella directory `demo_attack_csrf`
-   Avviare il server digitando: `$ php -S 127.0.0.1:8000`
-   Navigare col browser alla rotta: `http://127.0.0.1:8000/index.html`

## Precauzioni

Al momento l'attacco CSRF del file `index.html` è neutralizzato dalla proprietà `SameSite`: `Lax` nel **cookie jwt** di questo file
[/src/middlewares/auth-jwt](../src/middlewares/auth-jwt.js#)

### I Valori di SameSite

La proprietà SameSite dei cookie è un'impostazione che aiuta a proteggere i siti web dai tipi di attacchi informatici conosciuti come `Cross-Site Request Forgery (CSRF)`. Questa proprietà può avere tre valori: `Strict`, `Lax` o `None`, ciascuno dei quali fornisce un livello diverso di protezione e funzionalità.

-   **SameSite: Strict** &rarr; É l'impostazione più restrittiva. Un cookie `Strict` verrà inviato solo se la richiesta proviene dallo stesso dominio che ha impostato il cookie. Questo significa che (nelle chiamate GET) dove un utente clicca su un link da un altro sito che porta al sito che ha impostato il cookie, il cookie non sarà inviato con la richiesta.
-   **SameSite: Lax** &rarr; Questo valore è simile a `Strict`, ma permette l'invio di cookie per le richieste di tipo GET che sono fatte da un sito esterno. Ad esempio, se clicchi su un link da un altro sito che conduce al sito che ha impostato il cookie, il cookie verrà inviato. Questo fornisce un buon equilibrio tra sicurezza e usabilità.
-   **SameSite: None**&rarr; Un cookie con `None` può essere inviato con le richieste tra siti sia GET che POST. Questa proprietà espone i server ad attacchi CSRF.

La scelta del valore appropriato di SameSite dipende dallo specifico utilizzo del cookie e dal bilancio tra la necessità di funzionalità cross-site e la protezione contro gli attacchi CSRF.
