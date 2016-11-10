googleapis = require('googleapis');
googleCal = googleapis.calendar("v3");
serviceEmail = "lightswitch@lightswitch-148215.iam.gserviceaccount.com";
serviceKeyFile = "./key.pem";


var authClient = new googleapis.auth.JWT(
    serviceEmail,
    serviceKeyFile,
    null, ["https://www.googleapis.com/auth/calendar"]
);

function ISODateString(d) {
    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    return d.getUTCFullYear() + '-' +
        pad(d.getUTCMonth() + 1) + '-' +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) + 'Z'
}

function getDateTime(date, time, duration) {
    var setDate = new Date(date)
    var arr = time.split(":");
    setDate.setMinutes(arr[1].substring(0, 2));
    if (time.includes("pm")) {
        setDate.setHours(parseInt(arr[0]) + 12);
    } else {
        setDate.setHours(parseInt(arr[0]));
    }
    setDate.setTime(setDate.getTime() + (duration * 60 * 60 * 1000));
    return ISODateString(setDate);
}

// authClient.authorize(function(err, tokens) {
//     if (err) {
//         console.log("createCalendar Error");
//         console.log(err);
//     } else {

//         googleCal.calendarList.list({
//                 auth: authClient,

//             },
//             function(err, res) {
//                 if (err) {
//                     console.log("createCalendar response errror");
//                     console.log(err);
//                 } else {
//                     console.log("successfully listed all calendars");
//                     res.items.forEach(function(object) {
//                         deleteItems(object.id)
//                     })
//                 }
//             }
//         );
//     }
// });



// authClient.authorize(function(err, tokens) {
//     if (err) {
//         console.log("createCalendar Error");
//         console.log(err);
//     } else {

//         googleCal.events.list({
//                 auth: authClient,
//                 calendarId: "4hi2u5ah4t39ncgdb2k8a49k7k@group.calendar.google.com"

//             },
//             function(err, res) {
//                 if (err) {
//                     console.log("createCalendar response errror");
//                     console.log(err);
//                 } else {
//                     console.log("successfully listed all calendars");
//                     console.log(res);
//                 }
//             }
//         );
//     }
// });





// authClient.authorize(function(err, tokens) {
//     if (err) {
//         console.log("createCalendar Error");
//         console.log(err);
//     } else {

//         googleCal.acl.list({
//                 auth: authClient,
//                 calendarId: "nttq7hid9vhimpdnqusn6a6654@group.calendar.google.com"
//             },
//             function(err, res) {
//                 if (err) {
//                     console.log("createCalendar response errror");
//                     console.log(err);
//                 } else {
//                     console.log("successfully listed all calendars");
//                     console.dir(res.items);
//                 }
//             }
//         );
//     }
// });



function createAccess(calendarId) {
    googleCal.acl.insert({
            auth: authClient,
            calendarId: calendarId,
            resource: {
                "scope": {
                    "type": "default"
                },
                "role": 'reader'
            }
        },
        function(err, res) {
            if (err) {
                console.log("error creating access to calendar " + calendarId);
                console.log(err);
            } else {
                console.log("successfully added public access " + calendarId);
                console.dir(res);
            }
        }
    );
}



// authClient.authorize(function(err, tokens) {
//     if (err) {
//         console.log("Event Error");
//         console.log(err);
//     } else {
//         var d = new Date();
//         var curr = ISODateString(d);
//         d.setTime(d.getTime() + (4 * 60 * 60 * 1000));
//         var end = ISODateString(d);
//         console.log(curr);
//         googleCal.events.insert({
//                 auth: authClient,
//                 calendarId: "nttq7hid9vhimpdnqusn6a6654@group.calendar.google.com",
//                 resource: {
//                     "summary": "newMeeting",
//                     "start": {
//                         "dateTime": curr
//                     },
//                     "end": {
//                         "dateTime": end
//                     },
//                     "visibility": "public"
//                 }
//             },
//             function(err, res) {
//                 if (err) {
//                     console.log("event response errror");
//                     console.log(err);
//                 } else {
//                     console.log("successfully added event");
//                     console.log(res);

//                 }
//             }
//         );
//     }
// });




module.exports = {
    createCalendar: function(calendarName, callback) {
        authClient.authorize(function(err, tokens) {
            if (err) {
                console.log("createCalendar Error");
                console.log(err);
            } else {

                googleCal.calendars.insert({
                        auth: authClient,
                        resource: {
                            "summary": calendarName
                        }
                    },
                    function(err, res) {
                        if (err) {
                            console.log("createCalendar response errror");
                            console.log(err);
                        } else {
                            console.log("successfully created calendar");
                            createAccess(res.id);
                            callback(null, {
                                data: res
                            });
                        }
                    }
                );
            }
        });
    },

    addEvent: function(eventInfo, callback) {
        authClient.authorize(function(err, tokens) {
            if (err) {
                console.log("Event Error");
                console.log(err);
            } else {
                var startTime = getDateTime(eventInfo.date, eventInfo.startTime, 0);
                var endTime = getDateTime(eventInfo.date, eventInfo.startTime, eventInfo.duration);
                console.log(startTime);
                console.log(endTime);
                googleCal.events.insert({
                        auth: authClient,
                        calendarId: eventInfo.calendarId,
                        resource: {
                            "summary": eventInfo.description,
                            "start": {
                                "dateTime": startTime
                            },
                            "end": {
                                "dateTime": endTime
                            },
                            "visibility": "public"
                        }
                    },
                    function(err, res) {
                        if (err) {
                            console.log("event response errror");
                            console.log(err);
                        } else {
                            console.log("successfully added event");
                            callback(null, {
                                data: res
                            });
                        }
                    }
                );
            }
        });
    },

    deleteCalendar: function(calendarId) {
        authClient.authorize(function(err, tokens) {
            if (err) {
                console.log("delete Error");
                console.log(err);
            } else {
                googleCal.calendars.delete({
                        auth: authClient,
                        calendarId: calendarId
                    },
                    function(err, res) {
                        if (err) {
                            console.log("delete response errror");
                            console.log(err);
                        } else {
                            console.log("successfully deleted calendar");

                        }
                    }
                );
            }
        });
    }
}