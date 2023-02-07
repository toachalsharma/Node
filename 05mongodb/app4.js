var MongoClient = require('mongodb').MongoClient;

// Connection url
var url = 'mongodb://localhost:27017/test';
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
  // Use the admin database for the operation
  var adminDb = db.admin();
  console.log('admin db')
  // List all the available databases
  adminDb.listDatabases(function(err, result) {
    console.log(result.databases);
    db.close();
  });
});