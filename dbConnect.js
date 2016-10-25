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
    fetchAllRooms: function(callback) {
        Room.find({}, function(err, rooms) {
            if(err) {
                console.log("Error:\n" + err);
            }

            console.log("Retrieved Rooms from Database")
            // console.log(rooms);
            // rooms.forEach(function(room) {
                // allRooms.push(room.displayName);
            // })
            callback(null, {data : rooms});
        });
    },

    fetchRoom: function(id, callback) {
        Room.find({'_id': id}, function(err, rooms) {
            if(err) {
                console.log("Error:\n" + err);
            }

            console.log("Retrieved Rooms from Database")
            // console.log(rooms);
            // rooms.forEach(function(room) {
                // allRooms.push(room.displayName);
            // })
            callback(null, {data : rooms});
        });

    }
}