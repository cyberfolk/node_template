/******************************************************************************************************************
 *  Connections => connectDB
 *
 * ****************************************************************************************************************
 * Si connette asincronamente a MongoDB utilizzando l'istanza di MongoClient fornita.
 * Registra lo stato della connessione e gestisce eventuali errori loggandoli e chiudendo il client.
 *
 * @param {MongoClient} mongoClient - L'istanza di MongoClient per connettersi al database.
 ******************************************************************************************************************/
async function connectDB(mongoClient) {
    try {
        await mongoClient.connect(); // Return promise --> richiede await --> richiede function async
        console.log("Siamo connessi a MongoDB Atlas!");
    } catch (err) {
        console.error("Errore Connessione:", err);
        await mongoClient.close();
        process.exit(1);
    }
}

module.exports = connectDB;
