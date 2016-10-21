
require('dotenv').config();
var port = process.env.PORT || 8080;
var mongoose = require ("mongoose"); 
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
//Set templating engine
app.set('view engine', 'ejs');

var uristring = process.env.MONGOLAB_URI



app.get('/', function(req, res) {
   res.render('pages/layout')
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


