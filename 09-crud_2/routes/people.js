const express = require("express");
const { ObjectId } = require("mongodb");
const asyncHandler = require("../utilities/asyncHandler");
const createQuerySearchPeople = require("../utilities/createQuerySearchPeople");
const mongoClient = require("../connections/mongoClient");
const people = [];
const routes = express.Router();
const peopleCollection = mongoClient.db("blog").collection("people");

/***************************************************************************************
 * READ => GET: All People                                                             *
 * 200: Ritorna l'elenco di tutte le persone nel database.                             *
 **************************************************************************************/
routes.get("/", asyncHandler(async (req, res, next) => {
	const people = await peopleCollection.find().toArray();
	if (people.length === 0) { return next(new ApiError("People not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: people });
}));

/***************************************************************************************
 * READ => GET: 1+ People by Query                                                     *
 * 200: Ritorna l'elenco di persone che matchano con i query parameters ricevuti.      *
 **************************************************************************************/
routes.get("/search", asyncHandler(async (req, res, next) => {
	const query = createQuerySearchPeople(req);
	const people = await peopleCollection.find(query).toArray();
	if (people.length === 0) { return next(new ApiError("People not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: people });
}));

/***************************************************************************************
 * DELETE => DELETE: 1+ People by Query                                                *
 * 200: Ritorna il numero di persone eliminate che matchavano con i query parameters.  *
 **************************************************************************************/
routes.delete("/delete", asyncHandler(async (req, res, next) => {
	const query = createQuerySearchPeople(req);
	const ris = await peopleCollection.deleteMany(query);
	if (ris.deletedCount === 0) { return next(new ApiError("People not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: ris });
}));

/***************************************************************************************
 * READ => GET: A Person by ID                                                         *
 * 200: Ritorna la persona con l'id specificato nei parameters.                        *
 **************************************************************************************/
routes.get("/:id", asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
	const personId = await peopleCollection.findOne({ _id: new ObjectId(id) });
	if (!personId) { return next(new ApiError("Person not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: personId });
}));

/***************************************************************************************
 * CREATE => POST: 1+ People by Body                                                   *
 * 201: Ritorna la persona o l'elenco di persone appena create mediante i dati         *
 *      contenuti nel body della request.                                              *
 **************************************************************************************/
routes.post("/", asyncHandler(async (req, res, next) => {
	const dt = req.body;
	const data = Array.isArray(dt) ? dt : [dt]; // Uniformiamo l'input ad array
	const ris = await peopleCollection.insertMany(data);
	console.log(`Inseriti ${ris.insertedCount} oggetti nel database.`);
	res.status(201).json({ success: true, status: 200, data: ris });
}));

/***************************************************************************************
 * UPDATE => PATCH: A Person by ID - (Aggiornamento Parziale)                          *
 * 200: Aggiorna parzialmente e ritorna la persona con l'id specificato nei parameters *
 **************************************************************************************/
routes.patch("/:id", asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
	const updateData = req.body;
	if (Object.keys(updateData).length === 0) { return next(new ApiError("No data provided for update", 400)); }
	const ris = await peopleCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
	if (ris.matchedCount === 0) { return next(new ApiError("Person not found", 404)); }
	const people = await peopleCollection.findOne({ _id: new ObjectId(id) });
	res.status(200).json({ success: true, status: 200, data: people });
}));

/***************************************************************************************
 * UPDATE => PUT: A Person by ID - (Sostituzione Completa)                             *
 * 200: Ritorna la persona con l'id specificato nei parameters dopo averla sostituita  *
 *      completamente coi dati contenuti nel body della request                        *
 **************************************************************************************/
routes.put("/:id", asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
	const replacementData = req.body;
	// Validare qui se replacementData ha tutti campi necessari per una "sostituzione completa".
	const ris = await peopleCollection.replaceOne({ _id: new ObjectId(id) }, replacementData);
	if (ris.matchedCount === 0) { return next(new ApiError("Person not found", 404)); }
	const people = await peopleCollection.findOne({ _id: new ObjectId(id) });
	res.status(200).json({ success: true, status: 200, data: people });
}));

/***************************************************************************************
 * DELETE => DELETE: A Person by ID                                                    * 
 * 200: Elimina la persona con l'id specificato nei parameters e ritona la conferma    *
 **************************************************************************************/
routes.delete("/:id", asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
	const ris = await peopleCollection.deleteOne({ _id: new ObjectId(id) });
	if (ris.deletedCount === 0) { return next(new ApiError("Person not found", 404)); }
	res.status(200).json({ success: true, status: 200, data: ris });
}));

class ApiError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

module.exports = routes;
