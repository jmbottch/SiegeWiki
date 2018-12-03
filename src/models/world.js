const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Season = require('./season');

const WorldSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: [true, 'Name of World is required']
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

const World = mongoose.model('world', WorldSchema);

module.exports = World;