var google = require('googleapis');
var googleCal = googleapis.calendar("v3");
var serviceEmail = "********@developer.gserviceaccount.com",
var serviceKeyFile = "./key.pem";




var authClient = new googleapis.auth.JWT(
        serviceEmail,
        serviceKeyFile,
        null,
        ["https://www.googleapis.com/auth/calendar"]
    );

http://stackoverflow.com/questions/24918629/inserting-an-event-with-the-nodejs-google-calendar-api-returns-400-missing-end
http://stackoverflow.com/questions/21607896/how-can-i-download-my-google-api-key-as-pem-file