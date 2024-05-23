// npm Modules
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// My Modules
const { connectDirectDB } = require("./src/connections/connectMongoDB");
const { connectMongoose } = require("./src/connections/connectMongoose");
const { peopleRouter } = require("./src/routes/api-resource");
const passportRouter = require("./src/routes/demo-passport");
const expressLayouts = require('express-ejs-layouts');
const demoJwtRouter = require("./src/routes/demo-auth-jwt");
const directLogger = require("./src/middlewares/directLogger");
const indexRouter = require("./src/routes/index");
const authSession = require("./src/middlewares/auth-session");
const errorCheck = require("./src/middlewares/errorCheck");
const passport = require("./src/middlewares/passport-config");

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
app.use(expressLayouts);
app.use(directLogger);
app.use(morgan("dev"));
app.use(authSession)     // Va posizionato il prima possibile, crea una sessione e la salva nel DB
app.use(urlExtended);    // Consente di accedere a req.body
app.use(express.json()); // Consente di accedere a req.json
app.use(cookieParser()); // Consente di accedere a req.cookie
app.use("/auth-passport", passport.initialize());
app.use("/auth-passport", passport.session());

// Router Middleware
app.use("/api/people", peopleRouter);
app.use("/auth-passport", passportRouter);
//app.use("/auth/jwt", demoJwtRouter);
app.use("/", indexRouter);

app.use(errorCheck); // Controllo errori. Da posizionare per ultimo.

connectMongoose();
//connectDirectDB()

module.exports = app;
