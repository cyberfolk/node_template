const createQuerySearch = require("../utils/createQuerySearch");
const asyncHandler = require("../utils/asyncHandler");
const { ObjectId } = require("mongodb");
const express = require("express");

/******************************************************************************************************************
 *  Routes: Factory => CRUD generiche da applicare su un qualunque modello. 
 *
 * ****************************************************************************************************************
 * Questo router è progettato per essere flessibile e può essere utilizzato per qualsiasi risorsa
 * del database. È sufficiente configurare la factory con i nomi del database e della collezione appropriati.
 * 
 * @param {MongoClient} mongoClient - Il client MongoDB.
 * @param {string} dbName - Il nome del database da utilizzare.
 * @param {string} collection - Il nome della collezione della risorsa da gestire.
 * @returns {Router} Un router Express configurato per la risorsa specificata, pronto per essere
 * utilizzato per eseguire operazioni CRUD generiche su di essa.
 ******************************************************************************************************************/
function createResourcesRouter(mongoClient, dbName, collection) {
	const routes = express.Router();
	const resourceCollection = mongoClient.db(dbName).collection(collection);

	/***************************************************************************************
	 * READ => GET: All resources                                                          *
	 * 200: Ritorna l'elenco di tutte le risorse nel database.                             *
	 **************************************************************************************/
	routes.get("/", asyncHandler(async (req, res, next) => {
		const resources = await resourceCollection.find().toArray();
		if (resources.length === 0) { return next(new ApiError("Resource not found", 404)); }
		res.status(200).json({ success: true, status: 200, data: resources });
	}));

	/***************************************************************************************
	 * READ => GET: 1+ Resource by Query                                                   *
	 * 200: Ritorna l'elenco di risorse che matchano con i query parameters ricevuti.      *
	 **************************************************************************************/
	routes.get("/search", asyncHandler(async (req, res, next) => {
		const query = createQuerySearch(req);
		const resources = await resourceCollection.find(query).toArray();
		if (resources.length === 0) { return next(new ApiError("resources not found", 404)); }
		res.status(200).json({ success: true, status: 200, data: resources });
	}));

	/***************************************************************************************
	 * DELETE => DELETE: 1+ resources by Query                                             *
	 * 200: Ritorna il numero di Resourcee eliminate che matchavano con i query parameters.*
	 **************************************************************************************/
	routes.delete("/delete", asyncHandler(async (req, res, next) => {
		const query = createQuerySearch(req);
		const ris = await resourceCollection.deleteMany(query);
		if (ris.deletedCount === 0) { return next(new ApiError("resources not found", 404)); }
		res.status(200).json({ success: true, status: 200, data: ris });
	}));

	/***************************************************************************************
	 * READ => GET: A Resource by ID                                                       *
	 * 200: Ritorna la Risorsa con l'id specificato nei parameters.                        *
	 **************************************************************************************/
	routes.get("/:id", asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
		const ResourceId = await resourceCollection.findOne({ _id: new ObjectId(id) });
		if (!ResourceId) { return next(new ApiError("Resource not found", 404)); }
		res.status(200).json({ success: true, status: 200, data: ResourceId });
	}));

	/***************************************************************************************
	 * CREATE => POST: 1+ resources by Body                                                *
	 * 201: Ritorna la Risorsa o l'elenco di Resourcee appena create mediante i dati       *
	 *      contenuti nel body della request.                                              *
	 **************************************************************************************/
	routes.post("/", asyncHandler(async (req, res, next) => {
		const dt = req.body;
		const data = Array.isArray(dt) ? dt : [dt]; // Uniformiamo l'input ad array
		const ris = await resourceCollection.insertMany(data);
		console.log(`Inseriti ${ris.insertedCount} oggetti nel database.`);
		res.status(201).json({ success: true, status: 200, data: ris });
	}));

	/***************************************************************************************
	 * UPDATE => PATCH: A Resource by ID - (Aggiornamento Parziale)                        *
	 * 200: Aggiorna parzialmente e ritorna la Risorsa con l'id specificato nei parameters *
	 **************************************************************************************/
	routes.patch("/:id", asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
		const updateData = req.body;
		if (Object.keys(updateData).length === 0) { return next(new ApiError("No data provided for update", 400)); }
		const ris = await resourceCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
		if (ris.matchedCount === 0) { return next(new ApiError("Resource not found", 404)); }
		const resources = await resourceCollection.findOne({ _id: new ObjectId(id) });
		res.status(200).json({ success: true, status: 200, data: resources });
	}));

	/***************************************************************************************
	 * UPDATE => PUT: A Resource by ID - (Sostituzione Completa)                           *
	 * 200: Ritorna la Risorsa con l'id specificato nei parameters dopo averla sostituita  *
	 *      completamente coi dati contenuti nel body della request                        *
	 **************************************************************************************/
	routes.put("/:id", asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
		const replacementData = req.body;
		// Validare qui se replacementData ha tutti campi necessari per una "sostituzione completa".
		const ris = await resourceCollection.replaceOne({ _id: new ObjectId(id) }, replacementData);
		if (ris.matchedCount === 0) { return next(new ApiError("Resource not found", 404)); }
		const resources = await resourceCollection.findOne({ _id: new ObjectId(id) });
		res.status(200).json({ success: true, status: 200, data: resources });
	}));

	/***************************************************************************************
	 * DELETE => DELETE: A Resource by ID                                                  * 
	 * 200: Elimina la Risorsa con l'id specificato nei parameters e ritona la conferma    *
	 **************************************************************************************/
	routes.delete("/:id", asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		if (!ObjectId.isValid(id)) { return next(new ApiError("Invalid ID format", 422)); }
		const ris = await resourceCollection.deleteOne({ _id: new ObjectId(id) });
		if (ris.deletedCount === 0) { return next(new ApiError("Resource not found", 404)); }
		res.status(200).json({ success: true, status: 200, data: ris });
	}));

	return routes;
}

class ApiError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

module.exports = createResourcesRouter;
