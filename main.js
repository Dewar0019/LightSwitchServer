require('dotenv').config();
var port = process.env.PORT || 8080;
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var database = require("./dbConnect.js");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public'));

//Set templating engine
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    database.fetchAllRooms(function(err, result) {
        res.render('pages/layout', {
            'rooms': result.data
        })
    })
});


// app.get('/room/:id', function(req, res) {
//     database.fetchRoom(req.params.id, function(err, result) {
//         res.render('pages/layout', {
//             'rooms': result.data
//         })
//     })
// });


app.post('/test', function(req, res) {
	console.log(req.body)
    if (req.xhr) {
        database.fetchRoom(req.body.number, function(err, result) {
        	if(err) {
        		console.log("fetch room error");
        	}
            console.log(result.data);
            res.render('pages/room', {'room': result.data[0]})
        })
    }

})


var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
});


console.log("Server Running on port:" + port);