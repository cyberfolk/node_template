var express = require('express');
var router = express.Router();
const authSessionRouter = require("./auth");
const renderViewsRouter = require("./views");
const contactsRouter = require("./contacts");

router.use("/auth", authSessionRouter);
router.use("", renderViewsRouter);
router.use("/contacts", contactsRouter);


// Middleware "catch-all" per gestire le rotte non definite
router.use((req, res, next) => {
  reqStr = `${req.method} ${req.url}`;
  res.render('pages/404', { title: '404', reqStr: reqStr, layout: 'layouts/main' });
})

module.exports = router;
