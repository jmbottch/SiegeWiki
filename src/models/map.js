const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Season = require('./season');

const MapSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name of Map is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    season: {
        type: Schema.Types.ObjectId,
        ref: 'season'
    },
    availableInRanked: Boolean

});

const Map = mongoose.model('map', MapSchema);

module.exports = Map;