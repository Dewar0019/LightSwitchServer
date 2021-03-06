// app/routes.js
var googleCalendar = require("../calendar.js")
var database = require("../dbConnect.js");

module.exports = function(app, passport) {

    sendDataToServer = function(roomInfo) {
        var room = JSON.parse(JSON.stringify(roomInfo))
        console.log("http://" + room.piAddress + "/updateMe");
        console.log("Sending Updated Device List to piNode " + room.piName);
    }

    //Home page
    app.get('/home', isLoggedIn, function(req, res) {
        database.fetchAllRooms(function(err, result) {
            res.render('pages/layout', {
                'rooms': result.data,
                'user': req.user
            })
        })
    });

    app.post('/bookRoom', function(req, res) {
        console.log(req.body);
        googleCalendar.addEvent(req.body, function(err, result) {
            console.log("finished adding event");
            console.log(result.data);
        })
    });


    //Navigates to a specify rom
    app.post('/navigate', function(req, res) {
        if (req.xhr) {
            database.fetchRoom(req.body.number, function(err, result) {
                if (err) {
                    console.log("fetch room error");
                }
                // console.log(result.data);
                res.render('pages/room', {
                    'room': result.data,
                    'user': req.user

                })
            })
        }

    })


    //Adds a room to the database
    app.post('/addRoomDatabase', function(req, res1) {
        console.log("adding room to database");
        if (req.xhr) {
            //Create Google Calendar First
            googleCalendar.createCalendar(req.body.piName, function(err, response) {
                req.body.calendarId = response.data.id;

                database.addRoom(req.body, function(err, res) {

                    database.fetchAllRooms(function(err, result) {
                        console.log(result.data);
                        res1.render('pages/layout', {
                            'rooms': result.data,
                            'user': req.user
                        })
                    })
                });


            })
        }
    })


    //Renders the addRoom form
    app.post('/addRoom', function(req, res) {
        if (req.xhr) {
            res.render('partials/addroom')
        }
    })

    app.post('/deleteRoom', function(req, res1) {
        if (req.xhr) {
            database.deleteRoom(req.body.roomId, function(err, res) {
                googleCalendar.deleteCalendar(res.data);
                database.fetchAllRooms(function(err, result) {
                    res1.render('pages/layout', {
                        'rooms': result.data,
                        'user': req.user
                    });
                });
            });
        }
    })


    //Adds device to piNode
    app.post('/addDevice', function(req, res) {
        if (req.xhr) {
            database.addDevice(req.body.id, req.body.macAddress, function(err, result) {
                if (err) {
                    console.log("error adding device:" + req.body.macAddress);
                } else {
                    console.log("Device added");
                    sendDataToServer(result.data);
                    res.render('pages/room', {
                        'room': result.data
                    })
                }
            })
        }
    })


    //Endpoint for pi to query to get running list of added devices
    app.post('/getStatus', function(req, res) {
            database.fetchRoomByPiName(req.body.deviceName, function(err, result) {
                if (err) {
                    console.log("error getting status");
                }
                console.log(result.data);
                console.log(result.devices);
                res.send(result.data.devices);
            })
        })
        // =====================================
        // HOME PAGE (with login links) ========
        // =====================================
    app.get('/', function(req, res) {
        res.render('pages/index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/layout.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}