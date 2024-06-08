var express = require('express');
var router = express.Router();
const authSessionRouter = require("./auth");
const renderViewsRouter = require("./views");

router.use("/auth", authSessionRouter);
router.use("", renderViewsRouter);


// Middleware "catch-all" per gestire le rotte non definite
router.use((req, res, next) => {
  reqStr = `${req.method} ${req.url}`;
  res.render('404', { title: '404', reqStr: reqStr, layout: 'layouts/main' });
})

module.exports = router;
