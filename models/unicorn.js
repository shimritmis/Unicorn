const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


//crearte geolocation Schema
const GeoSchema = new Schema ({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

//create unicorn Schema & model
const UnicornSchema = new Schema ({
    name: {
        type: String,
        required:[true, 'Name field is required']
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Unicorn = mongoose.model('unicorn', UnicornSchema);  //Unicorn model will represent 'ninja' collection in the db.

module.exports = Unicorn; //export the model


