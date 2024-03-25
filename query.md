# Query Mongo DB

```js
db.people.insertOne({ "age": 35, "name": "Randal Mack", "gender": "male"})
db.people.insertMany([
    {"age": 29, "name": "Kinney Randolph", "gender": "male",},
    {"age": 35, "name": "Randal Bonnnie", "gender": "male",},
    {"age": 40, "name": "Rebecca Smith", "gender": "female",},
    {"age": 34, "name": "Elen Hendrix", "gender": "male",},
    {"age": 29, "name": "Zeb Randolph", "gender": "male",},
    {"age": 33, "name": "Zeno Hendrix", "gender": "male",},
    {"age": 40, "name": "Barbara Howe", "gender": "female",},
    {"age": 34, "name": "Ronnie verdi", "gender": "male",},
    {"age": 42, "name": "Sherry Howe", "gender": "female",},
    {"age": 31, "name": "Robin brown", "gender": "male",},
    {"age": 33, "name": "Zoe rossi", "gender": "male",},
    {"age": 42, "name": "Mark Howe", "gender": "female",},
    {"age": 36, "name": "Bob Mack", "gender": "male",}])
db.people.find()
db.people.findOne("name": "Kinney Randolph")
db.people.updateOne({ _id: ObjectId("66003b38a6fd8349cbd14a0e") }, { $set: { name: "Marie" } })
db.people.updateMany({ name: "Lucy" }, { $set: { "age": 34, "name": "Lucy", "gender": "female" } }, { upsert: true }) // Cerca Luciano Mariucci, se non 'è lo crea.
db.people.updateMany({}, { $inc: { age: 1 } }) // Aumento age di tutti di uno.
db.people.updateMany({}, { $unset: { age: "" } }) // Rimuovo l'attributo age da tutti i documenti
db.people.find({ $and: [ { gender: "female" }, { age: { $in: [35, 42] } } ]}) // Cerco tutte le donne con eta 35 o 42
```
