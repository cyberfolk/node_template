# Rotte e Router

**Cos'è un Middleware?** &rarr;
[/middlewares/readme.md](../middlewares/readme.md)

## Cos'è una Rotta?

Le rotte in Express sono definizioni che specificano come rispondere a richieste HTTP a percorsi specifici. Le rotte utilizzano metodi come `get`, `post`, `put`, `delete`, ecc., per gestire le richieste.

## Cos'è un Router?

Un router in Express è un oggetto che permette di raggruppare e definire le rotte in moduli separati. Utilizzando `const router = express.Router();`, possiamo creare un'istanza di un router che può essere poi montato nell'applicazione principale.

Il router in Express supporta diversi metodi HTTP come `get`, `post`, `put`, `delete`, ecc. Questi metodi vengono utilizzati per definire le rotte che rispondono alle richieste HTTP specifiche.

```javascript
// Modulo ./routes/item.js
const express = require("express");
const itemRouter = express.Router();

itemRouter.get("/item", (req, res) => {
	res.send("Elenco degli item");
}); // Inserisco in itemRouter la rotta get: /item

itemRouter.post("/item", (req, res) => {
	res.send("Creazione di un item");
}); // Inserisco in itemRouter la rotta post: /item

itemRouter.put("/item/:id", (req, res) => {
	res.send(`Aggiornamento dell'item con ID ${req.params.id}`);
}); // Inserisco in itemRouter la rotta put: /item

itemRouter.delete("/item/:id", (req, res) => {
	res.send(`Eliminazione dell'item con ID ${req.params.id}`);
}); // Inserisco in itemRouter la rotta delete: /item

module.exports = itemRouter;
```

## Cos'è un Middleware di Gestione Rotte?

Il middleware di gestione rotte è un middleware che gestisce un insieme di rotte, spesso utilizzando express.Router(). Viene registrato nell'applicazione principale utilizzando app.use().

```javascript
// Modulo ./app.js
const express = require("express");
const app = express();
const itemRouter = express.Router("./routes/item.js");

// Registro il Middleware di Gestione Rotte per itemRouter
app.use("/api", itemRouter);

app.listen(3000, () => {
	console.log("Server in ascolto sulla porta 3000");
});
```

-   itemRouter è un middleware di gestione rotte importato da un altro file.
-   app.use('/api', itemRouter); monta itemRouter sull'applicazione principale. Tutte le richieste che iniziano con /api saranno gestite da itemRouter.
-   Verranno effettivamente gestite solo quelli che iniziano con /api/item

## Conclusione

Le rotte in Express sono endpoint che rispondono a richieste HTTP specifiche, mentre i middleware di gestione rotte sono middleware che gestiscono un insieme di rotte utilizzando express.Router(). Utilizzare app.use(router) permette di organizzare le rotte in moduli separati, migliorando la struttura e la manutenibilità del codice.
