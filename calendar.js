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
//             if (err) {
//                 console.log("createCalendar Error");
//                 console.log(err);
//             } else {

//                 googleCal.calendarList.list({
//                         auth: authClient,
                        
//                     },
//                     function(err, res) {
//                         if (err) {
//                             console.log("createCalendar response errror");
//                             console.log(err);
//                         } else {
//                             console.log("successfully created calendar");
                            
//                            console.log(res);
//                         }
//                     }
//                 );
//             }
//         });





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
}