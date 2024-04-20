/******************************************************************************************************************
 *  Server => Entry point                                                                                         *
 * ---------------------------------------------------------------------------------------------------------------*
 *  NB: Eseguire con "$ NODE_ENV=development npm start" oppure "$npm start"                                       *
 *****************************************************************************************************************/
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();

const { port, dbConfig, secretKey } = require('./src/config/config');
const createResourceRouter = require("./src/routes/api-resource")
const createMongoClient = require("./src/connections/mongoClient");
const setupEventHandler = require("./src/utils/eventHandler");
const createAuthSession = require("./src/middlewares/auth-session");
const demoAuthRouter = require("./src/routes/demo-auth-session");
const demoJwtRouter = require("./src/routes/demo-auth-jwt");
const directLogger = require("./src/middlewares/directLogger");
const errorCheck = require("./src/middlewares/errorCheck");
const connectDB = require("./src/connections/connectDB");

const mongoClient = createMongoClient(dbConfig);
const authSession = createAuthSession(mongoClient, dbConfig.dbName, secretKey);
const peopleRouter = createResourceRouter(mongoClient, dbConfig.dbName, dbConfig.collection);
setupEventHandler(mongoClient);

app.set("view engine", "ejs");
// Middleware
app.use(express.static("public"));
app.use(directLogger);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Consente di elaborare dati nel req.body
app.use(cookieParser()); // Consente di accedere al parametrocookie delle request
app.use(authSession)
app.use("/demo/auth", demoAuthRouter);
app.use("/demo/jwt", demoJwtRouter);
app.use("/api/people", peopleRouter);
app.use(errorCheck); // Controllo errori da posizionare per ultimo.

async function startServer() {
	await connectDB(mongoClient);
	app.listen(port, () => {
		console.log(`Server in ascolto sulla port ${port}...`);
	});
}

startServer();
