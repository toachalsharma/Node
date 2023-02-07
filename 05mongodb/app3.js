var MongoC = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";
console.log('waiting db connection')
MongoC.connect(url, function (err, db) {
    //control not reaching here-- Expected to log to console 'got db connection'
    console.log('got db connection');
    if (err) {
        throw err;
    }
    console.log('hello');
});
