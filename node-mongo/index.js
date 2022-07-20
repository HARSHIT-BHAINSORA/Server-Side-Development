const MongoClient = require("mongodb").MongoClient;
// object -> node application ka pta hai jisko
const assert = require("assert");
const { debugPort } = require("process");
const dboper = require("./operation");

// db kaha hai db server.
const url = "mongodb://localhost:27017/";
const dbName = "conFusion";

MongoClient.connect(url, function (err, client) {
  assert.equal(err, null);

  console.log("Connection built succesfully...");

  const db = client.db(dbName);

  dboper.insertDocument(
    db,
    { name: "ankita", age: "45" },
    "dishes",
    (result) => {
      console.log("Insert Document :\n", result.ops);

      dboper.findDocument(db, "dishes", (docs) => {
        console.log("found Documents :\n", docs);

        dboper.updateDocument(
          db,
          { name: "ankita" },
          { age: "21" },
          "dishes",
          (result) => {
            console.log("Updated Documents:\n", result.result);

            dboper.findDocument(db, "dishes", (docs) => {
              console.log("found Documents :\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection : " + result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
});
