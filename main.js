var currentPage = null;

// $( document ).ready(function() {
//     if(currentPage == null) {
//     	currentPage = "volen";
//     	$( "#volen" ).addClass("selected");
//     }
// });

// $("#makerlab").click(function(event) {
//         alert(event.target.id);
// });

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));




app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});
app.post('/',function  (req, res) {
   console.log("got a POST request for the homepage");
   res.send('hello POST');
})


var server = app.listen(8081, function() {
   var host = server.address().address
   var port = server.address().port
});



console.log("Server Running on port 8081");

// var setMacA
 // var timeout = setInterval(fuddress = "EC:AD:B8:0A:BB:AD";
var setMacAddress = [];

