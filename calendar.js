// googleapis = require('googleapis');
// googleCal = googleapis.calendar("v3");
// serviceEmail = "lightswitch@lightswitch-148215.iam.gserviceaccount.com",
//     serviceKeyFile = "./key.pem";


// var authClient = new googleapis.auth.JWT(
//     serviceEmail,
//     serviceKeyFile,
//     null, ["https://www.googleapis.com/auth/calendar"]
// );

// authClient.authorize(function(err, tokens) {



//     if (err) {
//         console.log("this is error");
//         console.log(err);
//     } else {


//         googleCal.calendars.insert({
//             auth: authClient,
//             resource: {
//                 summary: "first"
//             },
//             function(err, res) {
//                 if (err) {
//                     console.log("error");
//                     console.log(err);
//                 } else {
//                 	console.log("wht happen");
//                     console.log(res);
//                     // do something else
//                 }
//             }
//         });
//     }
//     console.log("finish calling");


//     //     console.log(tokens);
//     //     googleCal.events.list({
//     //         auth: authClient,
//     //         calendarId: "primary",
//     //         fields: {
//     //             items: ["end", "start", "summary"]
//     //         }
//     //     }, function(err, CL) {
//     //         if (err) {
//     //             console.log("Error with callback");
//     //             console.log(err);
//     //         } else {
//     //             console.log(CL);
//     //         }
//     //     });
//     // }
// });





// // http://stackoverflow.com/questions/24918629/inserting-an-event-with-the-nodejs-google-calendar-api-returns-400-missing-end
// // http://stackoverflow.com/questions/21607896/how-can-i-download-my-google-api-key-as-pem-file