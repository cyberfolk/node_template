const express = require("express");
const { ObjectId } = require("mongodb");
const asyncHandler = require("../utilities/asyncHandler");
const createPeopleSearchQuery = require("../utilities/createPeopleSearchQuery");
const mongoClient = require("../connections/mongoClient");
const people = [];
const routes = express.Router();
const peopleCollection = mongoClient.db("blog").collection("people");

/*************************************************************
 *  GET - Tutte le persone                                   *
 ************************************************************/
routes.get("/", asyncHandler(async (req, res, next) => {
	const people = await peopleCollection.find().toArray();
	if (people.length === 0) { return next(new ApiError("People not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: people });
}));

/*************************************************************
 *  GET - Una o più persone da query                         *
 ************************************************************/
routes.get("/search", asyncHandler(async (req, res, next) => {
	const query = createPeopleSearchQuery(req);
	const people = await peopleCollection.find(query).toArray();
	if (people.length === 0) { return next(new ApiError("People not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: people });
}));

/*************************************************************
 *  GET - Una persona specifica da ID                            *
 ************************************************************/
routes.get("/:id", asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
	const personId = await peopleCollection.findOne({ _id: new ObjectId(id) });
	if (!personId) { return next(new ApiError("Person not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: personId });
}));

/*************************************************************
 *  POST - Una o più persone                                 *
 ************************************************************/
routes.post("/", asyncHandler(async (req, res) => {
	const dt = req.body;
	const data = Array.isArray(dt) ? dt : [dt]; // Uniformiamo l'input ad array
	const ris = await peopleCollection.insertMany(data);
	console.log(`Inseriti ${ris.insertedCount} oggetti nel database.`);
	res.status(200).json({ success: true, status: 200, data: ris });
}));

/*************************************************************
 *  PUT - Una persona specifica                              *
 ************************************************************/
routes.put("/:id", (req, res) => {
	const { id } = req.params;
	const personPut = req.body;
	const index = people.findIndex((person) => person.id === id);

	if (index === -1) {
		return res.status(404).json({ success: false, message: "Person not found" });
	}

	people[index] = { ...people[index], ...personPut };

	res.status(200).json({ success: true, status: 200, data: people });
});

/*************************************************************
 *  DELETE - Una persona specifica                           *
 ************************************************************/
routes.delete("/:id", (req, res) => {
	const { id } = req.params; // id (del url) è un char -> accertarsi che anche person.id (del json) sia un char
	const index = people.findIndex((person) => person.id === id);
	if (index === -1) {
		return res.status(404).json({ success: false, message: "Person not found" });
	}

	people.splice(index, 1);
	res.status(200).json({ success: true, status: 200, data: people });
});

class ApiError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

module.exports = routes;
