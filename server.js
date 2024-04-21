/******************************************************************************************************************
 *  Server => Entry point                                                                                         *
 * ---------------------------------------------------------------------------------------------------------------*
 *  NB: Eseguire con "$ NODE_ENV=development npm start" oppure "$npm start"                                       *
 *****************************************************************************************************************/
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();

// My Modules
const { port, secretKeySession, secretKeyJwt, dbConfig } = require('./src/config/config');
const createResourceRouter = require("./src/routes/api-resource");
const createJwtMiddleware = require('./src/middlewares/auth-jwt');
const createMongoClient = require("./src/connections/mongoClient");
const setupEventHandler = require("./src/utils/eventHandler");
const createAuthSession = require("./src/middlewares/auth-session");
const demoSessionRouter = require("./src/routes/demo-auth-session");
const createJwtRouter = require("./src/routes/demo-auth-jwt");
const directLogger = require("./src/middlewares/directLogger");
const errorCheck = require("./src/middlewares/errorCheck");
const connectDB = require("./src/connections/connectDB");

// Factory
const mongoClient = createMongoClient(dbConfig);
const authSession = createAuthSession(mongoClient, 'blog', secretKeySession);
const peopleRouter = createResourceRouter(mongoClient, 'blog', 'people');
const jwtMiddleware = createJwtMiddleware('RS256', '1h', secretKeyJwt);
const demoJwtRouter = createJwtRouter(jwtMiddleware);
setupEventHandler(mongoClient);

// Other Congigurations
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(directLogger);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Consente di accedere a req.body
app.use(express.json()); // Consente di accedere a req.json
app.use(cookieParser()); // Consente di accedere a req.cookie
app.use(authSession)
app.use("/demo/jwt", demoJwtRouter);
app.use("/demo/auth", demoSessionRouter);
app.use("/api/people", peopleRouter);
app.use(errorCheck); // Controllo errori. Da posizionare per ultimo.

async function startServer() {
	await connectDB(mongoClient);
	app.listen(port, () => {
		console.log(`Server in ascolto sulla port ${port}...`);
	});
}

startServer();
