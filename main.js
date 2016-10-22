require('dotenv').config();
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var database = require("./dbConnect.js");

app.use(express.static(__dirname + '/public'));
//Set templating engine
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
   database.grabAllrooms();
    res.render('pages/layout')
});


app.post('/', function(req, res) {
    console.log("got a POST request for the homepage");
    res.send('hello POST');
})


var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
});



console.log("Server Running on port:" + port);