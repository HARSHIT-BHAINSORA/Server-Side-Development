const assert = require("assert");

// 1 . insert

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};

// find

exports.findDocument = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

// delete
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

// Update

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
