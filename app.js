// npm Modules
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const favicon = require('serve-favicon');
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const flash = require('connect-flash');
const app = express();

// My Modules
const { connectDirectDB } = require("./src/connections/connectMongoDB");
const { connectMongoose } = require("./src/connections/connectMongoose");
const { peopleRouter } = require("./src/routes/api-resource");
const authSessionRouter = require("./src/routes/auth");
const authJwtRouter = require("./src/api/auth");
const expressLayouts = require('express-ejs-layouts');
const directLogger = require("./src/middlewares/directLogger");
const indexRouter = require("./src/routes/index");
const authSession = require("./src/middlewares/auth-session");
const errorCheck = require("./src/middlewares/errorCheck");
const passport = require("./src/config/passport");
const msg_flash = require('./src/middlewares/msg_flash');

// Variable Setup
const pathDirPublic = path.join(__dirname, "public"); // path della dir 'public' realtivo alla root project
const pathDirViews = path.join(__dirname, "views"); // path della dir 'views' realtivo alla root project
const pathFavicon = path.join(__dirname, 'favicon.ico'); // path della file 'favicon' realtivo alla root project
const staticFiles = express.static(pathDirPublic); // "middleware statico" per servire i file statici di 'public'
const urlExtended = express.urlencoded({ extended: true }) // middleware per analisi dati dai form HTML con POST.

// View engine setup
app.set("views", pathDirViews);
app.set("view engine", "ejs");

// Middleware
app.use("/public", staticFiles); // Imposto il midlleware static partendo da /public
app.use(favicon(pathFavicon)); // Servire il file favicon.ico
app.use(expressLayouts);
app.use(directLogger);
//app.use(morgan("dev"));
app.use(authSession)     // Va posizionato il prima possibile, crea una sessione e la salva nel DB
app.use(urlExtended);    // Consente di accedere a req.body
app.use(express.json()); // Consente di accedere a req.json
app.use(cookieParser()); // Consente di accedere a req.cookie
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(msg_flash);

// Router Middleware
app.use("/api/people", peopleRouter);
app.use("/auth", authSessionRouter);
app.use("/api/auth", authJwtRouter);
//app.use("/auth/jwt", demoJwtRouter);
app.use("/", indexRouter); // A causa della rotta 404 deve stare per pernultimo
app.use(errorCheck); // Controllo errori. Da posizionare per ultimo.

connectMongoose();
//connectDirectDB()

module.exports = app;
