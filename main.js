

var mongodb = require('mongodb');
var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI



app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});
app.post('/',function  (req, res) {
   console.log("got a POST request for the homepage");
   res.send('hello POST');
})


var server = app.listen(port, function() {
   var host = server.address().address
   var port = server.address().port
});

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});




console.log("Server Running on port:" + port);

// var setMacA
 // var timeout = setInterval(fuddress = "EC:AD:B8:0A:BB:AD";
var setMacAddress = [];

