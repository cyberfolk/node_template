/******************************************************************************************************************
 *  AUTENTICAZIONE CON SESSIONE                                                                       *
 * ---------------------------------------------------------------------------------------------------------------*
 *  NB: Eseguire con "$ NODE_ENV=development npm start" oppure "$npm start"                                       *
 *****************************************************************************************************************/

// Caricamento della configurazione dell'ambiente
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const morgan = require("morgan");
const app = express();

const immediateRequestLogger = require("./src/middlewares/immediateRequestLogger");
const handleExitSignal = require("./src/utils/handleExitSignal");
const authSession = require("./src/middlewares/authSession");
const { mongoClient, connectDB } = require("./src/connections/mongoClient");
const errorCheck = require("./src/middlewares/errorCheck");
const demoRouter = require("./src/routes/demoAuthSession");

const PORT = process.env.PORT || 3000; // Cerco la variabile d'ambiente process.env.PORT, se non la trovo userò 3000.

// Eventhanlder
process.on("SIGINT", () => handleExitSignal("SIGINT", mongoClient)); // SIGINT indica una terminazione da parte dell'utente.
process.on("SIGTERM", () => handleExitSignal("SIGTERM", mongoClient)); // SIGTERM indica una terminazione programmata e ordinata

// Middleware
app.use(immediateRequestLogger);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Consente di elaborare dati nel req.body
app.use(authSession(mongoClient))
app.use("/", demoRouter);
app.use(errorCheck); // Controllo errori da posizionare per ultimo.


async function startServer() {
	await connectDB();
	app.listen(PORT, () => {
		console.log(`Server in ascolto sulla porta ${PORT}...`);
	});
}

startServer();
