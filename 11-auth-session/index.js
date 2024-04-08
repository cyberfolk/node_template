/******************************************************************************************************************
 *  AUTENTICAZIONE CON SESSIONE                                                                       *
 * ---------------------------------------------------------------------------------------------------------------*
 *  NB: Eseguire con "$ NODE_ENV=development npm start" oppure "$npm start"                                       *
 *****************************************************************************************************************/

// Caricamento della configurazione dell'ambiente
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const MongoStore = require('connect-mongo');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const express = require("express");
const morgan = require("morgan");
const app = express();

const immediateRequestLogger = require("./src/middlewares/immediateRequestLogger");
const handleExitSignal = require("./src/utils/handleExitSignal");
const mongoClient = require("./src/connections/mongoClient");
const errorCheck = require("./src/middlewares/errorCheck");

const PORT = process.env.PORT || 3000; // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.
const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY

// Eventhanlder
process.on("SIGINT", () => handleExitSignal("SIGINT")); // SIGINT indica una terminazione da parte dell'utente.
process.on("SIGTERM", () => handleExitSignal("SIGTERM")); // SIGTERM indica una terminazione programmata e ordinata

// Middleware
app.use(immediateRequestLogger);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Consente di elaborare dati nel req.body
app.use(session({
	secret: SESSION_SECRET_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
	genid: () => uuidv4(),
	store: new MongoStore({ client: mongoClient, dbName: 'blog' })
}))
app.use(errorCheck); // Controllo errori da posizionare per ultimo.

async function run() {
	try {
		await mongoClient.connect(); // Ritorna una promise --> necessario usare await --> necessario usare funzione async
		console.log("Siamo connessi a MongoDB Atlas!");
		app.listen(PORT, () => {
			console.log(`Server in ascolto sulla porta ${PORT}...`);
		});
	} catch (err) {
		console.error("Errore Connessione:", err);
		await mongoClient.close();
		process.exit(1);
	}
}

run();
