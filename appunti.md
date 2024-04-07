# Pacchetti interessanti

-   `debg` --> Da usare in ambiente di sviluppo
-   `validator` --> Valida dati in entrata.
-   `uuid` --> Genera ID di sessione unico e casuale
-   `express-session` --> Ci permette effettivamenti di lavorare con le sessioni
-   `connect-mongo` --> Ci permette di salvare i dati delle sessioni non dentro un file ma dentro mongoDB

## Set variabili d'ambiente

-   `process.env.PORT` -> Variabile d'ambiente relativa alla porta del server.
-   Per settare process.env.PORT -> Da terminale: `$ export PORT=5000`
-   Per vedere process.env.PORT -> Da terminale: `$ echo $PORT`
-   Per eliminare process.env.PORT -> Da terminale: `$ unset PORT`

NB: Questo passaggi possono essere evitati configurando opportunamente il file `.dotenv`.
