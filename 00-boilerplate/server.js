/******************************************************************************************************************
 *  BOILERPLATE                                                                                                   *
 * ---------------------------------------------------------------------------------------------------------------*
 *  NB: Eseguire con "$ NODE_ENV=development npm start" oppure "$npm start"                                       *
 *****************************************************************************************************************/

const express = require("express");
const morgan = require("morgan");
const app = express();

const { port, dbConfig, secretKey } = require('./src/config/config');
const createMongoClient = require("./src/connections/mongoClient");
const connectDB = require("./src/connections/connectDB");
const directLogger = require("./src/middlewares/directLogger");
//const setupEventHandler = require("./src/utils/eventHandler")(mongoClient);
const createAauthSession = require("./src/middlewares/authSession");
const errorCheck = require("./src/middlewares/errorCheck");
const demoRouter = require("./src/routes/demoAuthSession");
const createPeopleRouter = require("./src/routes/people");

const mongoClient = createMongoClient(dbConfig);
const authSession = createAauthSession(mongoClient, dbConfig.dbName, secretKey);
const peopleRouter = createPeopleRouter(mongoClient);

// Middleware
app.use(directLogger);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Consente di elaborare dati nel req.body
app.use(authSession)
app.use("/", demoRouter);
app.use("/api/people", peopleRouter);
app.use(errorCheck); // Controllo errori da posizionare per ultimo.


async function startServer() {
	await connectDB(mongoClient);
	app.listen(port, () => {
		console.log(`Server in ascolto sulla port ${port}...`);
	});
}

startServer();
