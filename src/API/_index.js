var express = require('express');
var router = express.Router();
const { mongoClient } = require("../connections/connectMongoDB")
const createResourcesRouter = require('./api-resource')
const peopleRouter = createResourcesRouter(mongoClient, "blog", "people");
const contactRouter = createResourcesRouter(mongoClient, "blog", "contacts");

router.use("/people", peopleRouter);
router.use("/contacts", contactRouter);


module.exports = router;
