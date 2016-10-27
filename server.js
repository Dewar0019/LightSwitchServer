require('dotenv').config();
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
// var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var passport = require('passport');
var unirest = require("unirest");
var flash    = require('connect-flash');
var database = require("./dbConnect.js");

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: false
// }));




app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



// configuration ===============================================================
//mongoose.createConnection(database.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
var server = app.listen(port, function() {
    var host = server.address().address
    var port = server.address().port
});
console.log('The magic happens on port ' + port);
