

var mongoose = require ("mongoose"); 
var port = process.env.PORT || 8080;

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var uristring = process.env.MONGOLAB_URI



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

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });




console.log("Server Running on port:" + port);

// var setMacA
 // var timeout = setInterval(fuddress = "EC:AD:B8:0A:BB:AD";
var setMacAddress = [];

