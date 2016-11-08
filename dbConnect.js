var Rooms = require
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uristring = process.env.MONGOLAB_URI

var roomSchema = new Schema({
    displayName: String,
    roomLocation: String,
    building: String,
    piName: String,
    piAddress: String,
    devices: [String],
    calendarId: String
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
            if (err) {
                console.log("Error:\n" + err);
            }
            console.log("Retrieved Rooms from Database")
            callback(null, {
                data: rooms
            });
        });
    },

    fetchRoom: function(id, callback) {
        Room.find({
            '_id': id
        }, function(err, rooms) {
            if (err) {
                console.log("Error:\n" + err);
            }

            console.log("Retrieved Single Room from Database")

            callback(null, {
                data: rooms[0]
            });
        });
    },

    addDevice: function(id, newAddress, callback) {
        Room.findByIdAndUpdate(id, {
            $push: {
                "devices": newAddress
            }
        }, {
            safe: true,
            new: true,
            upsert: true
        }, function(err, data) {
            if (err) {
                console.log("Error:" + err);
            }
            callback(null, {
                data: data
            });
        });
    },

    addRoom: function(data) {
        Room.insertMany([data], function(err, res) {
            if (err) {
                console.log("Error:\n" + err);
            }

            // callback(null, {
            //     data: data
            // });
        })
    },

    fetchRoomByPiName: function(piName, callback) {
        Room.find({
            'piName': piName
        }, function(err, rooms) {
            if (err) {
                console.log("Error:\n" + err);
            }
            if(rooms.length == 0 ) {
                return;
            }
            console.log("Retrieved pi node: " + piName);
                callback(null, {data: rooms[0]});
        });
    },
}