const MongoClient = require("mongodb").MongoClient;
// object -> node application ka pta hai jisko
const assert = require("assert");

// db kaha hai db server.
const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

MongoClient.connect(url, function (err, client) {
  assert.equal(err, null);

  console.log("Connection built succesfully...");

  const db = client.db(dbName);
  const collection = db.collection("dishes");

  collection.insert({ name: "Sumit", rollno: "23" }, (err, result) => {
    assert.equal(err, null);

    console.log("successfully insert into collection");
    console.log(result.ops);

    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);

      console.log("Found: \n");
      console.log(docs);

      db.dropCollection("dishes", (err, result) => {
        assert.equal(err, null);
        client.close();
      });
    });
  });
});
