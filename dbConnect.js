var Rooms = require
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uristring = process.env.MONGOLAB_URI

var roomSchema = new Schema({
    displayName: String,
    roomLocation: String,
    building: String,
    devices: [String]
        // lights: [{}]
})


var Room = mongoose.model('Room', roomSchema);

mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});



module.exports = {
    grabAllrooms: function() {
        Room.find({}, function(err, rooms) {
            var allRooms = [];
            rooms.forEach(function(room) {
                allRooms.push(room.displayName);
            })
        });

    }
}