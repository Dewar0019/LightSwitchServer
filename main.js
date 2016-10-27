require('dotenv').config();
var port = process.env.PORT || 8080;
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var database = require("./dbConnect.js");
var passport = require("passport");
var session = require('express-session');
var unirest = require("unirest");

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

app.get('/login', function(req, res) {
    res.render('partials/login');
});


app.post('/navigate', function(req, res) {
    if (req.xhr) {
        database.fetchRoom(req.body.number, function(err, result) {
            if (err) {
                console.log("fetch room error");
            }
            // console.log(result.data);
            res.render('pages/room', {
                'room': result.data
            })
        })
    }

})


app.post('/addDevice', function(req, res) {
    if (req.xhr) {
        database.addDevice(req.body.id, req.body.macAddress, function(err, result) {
            if (err) {
                console.log("error adding device:" + req.body.macAddress);
            } else {
                console.log("Device added");
                sendDataToServer(result.data);
                res.render('pages/room', {'room': result.data})
            }
        })
    }
})


app.post('/getStatus', function(req, res) {
	database.fetchRoomByPiName(req.body.deviceName, function(err, result) {
        console.log(result.data);
       res.send(result.data);
    })
})


app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('pages/layout');
    });

app.use(session({
    secret: 'digitallumens'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
});


sendDataToServer = function(roomInfo) {
    var room = JSON.parse(JSON.stringify(roomInfo))
    console.log("http://"+room.piAddress+"/updateMe");
    console.log("Sending Updated Device List to piNode " + room.piName);

    unirest.post("http://"+room.piAddress+"/updateMe")
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send({"devices": room.devices}).end(function(res) {
        console.log(res.body);
    })

}





console.log("Server Running on port:" + port);