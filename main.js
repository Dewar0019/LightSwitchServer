require('dotenv').config();
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var database = require("./dbConnect.js");
var passport = require("passport");
var session  = require('express-session');

app.use(express.static(__dirname + '/public'));
//Set templating engine
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
   database.grabAllrooms();
   res.render('partials/login')
});

app.get('/login', function(req, res) {
	res.render('partials/login');
});

app.post('/', function(req, res) {
    console.log("got a POST request for the homepage");
    res.send('hello POST');
})

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('pages/layout');
 });

app.use(session({ secret: 'digitallumens' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 


var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
});

	





console.log("Server Running on port:" + port);