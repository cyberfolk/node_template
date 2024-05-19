const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// My Modules
const { connectDirectDB } = require("./connections/connectMongoDB");
const { connectMongoose } = require("./connections/connectMongoose");
const { peopleRouter } = require("./routes/api-resource");
const { authSession } = require("./middlewares/auth-session");
const { demoJwtRouter } = require("./routes/demo-auth-jwt");
const demoSessionRouter = require("./routes/demo-auth-session");
const directLogger = require("./middlewares/directLogger");
const errorCheck = require("./middlewares/errorCheck");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use("/public", express.static(path.join(__dirname, "public"))); // Middleware che parte da /public e serve i file di /public in modo statico.
app.use(directLogger);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Consente di accedere a req.body
app.use(express.json()); // Consente di accedere a req.json
app.use(cookieParser()); // Consente di accedere a req.cookie
app.use(authSession)
app.use("/demo/jwt", demoJwtRouter);
app.use("/demo/auth", demoSessionRouter);
app.use("/api/people", peopleRouter);
app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use(errorCheck); // Controllo errori. Da posizionare per ultimo.

connectDirectDB();
//connectDirectDB()

module.exports = app;
