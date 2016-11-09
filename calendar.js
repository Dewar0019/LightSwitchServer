googleapis = require('googleapis');
googleCal = googleapis.calendar("v3");
serviceEmail = "lightswitch@lightswitch-148215.iam.gserviceaccount.com";
serviceKeyFile = "./key.pem";


var authClient = new googleapis.auth.JWT(
    serviceEmail,
    serviceKeyFile,
    null, ["https://www.googleapis.com/auth/calendar"]
);



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