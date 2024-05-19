// npm Modules
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// My Modules
const { connectDirectDB } = require("./connections/connectMongoDB");
const { connectMongoose } = require("./connections/connectMongoose");
const { demoJwtRouter } = require("./routes/demo-auth-jwt");
const { peopleRouter } = require("./routes/api-resource");
const { authSession } = require("./middlewares/auth-session");
const demoSessionRouter = require("./routes/demo-auth-session");
const directLogger = require("./middlewares/directLogger");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const errorCheck = require("./middlewares/errorCheck");

// Variable Setup
const dirPublic = path.join(__dirname, "public"); // path della dir 'public' realtivo alla root project
const dirViews = path.join(__dirname, "views"); // path della dir 'views' realtivo alla root project
const staticFiles = express.static(dirPublic); // "middleware statico" per servire i file statici di 'public'
const urlExtended = express.urlencoded({ extended: true }) // middleware per analisi dati dai form HTML con POST.

// View engine setup
app.set("views", dirViews);
app.set("view engine", "ejs");

// Middleware
app.use("/public", staticFiles); // Imposto il midlleware static partendo da /public
app.use(directLogger);
app.use(morgan("dev"));
app.use(urlExtended);    // Consente di accedere a req.body
app.use(express.json()); // Consente di accedere a req.json
app.use(cookieParser()); // Consente di accedere a req.cookie
app.use(authSession)

// Router Middleware
app.use("/api/people", peopleRouter);
app.use("/demo/auth", demoSessionRouter);
app.use("/demo/jwt", demoJwtRouter);
app.use("/index", indexRouter);
app.use("/users", usersRouter);

app.use(errorCheck); // Controllo errori. Da posizionare per ultimo.

connectDirectDB();
//connectDirectDB()

module.exports = app;
