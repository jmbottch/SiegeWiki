const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Map = require('./map');
const Operator = require('./operator');

const SeasonSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: [true, 'Name of the Season is required']
    },
    description:{
        type:  String,
        required: [true, 'Description is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },            // example: Year 1, Year 2
    operators: [{
        type: Schema.Types.ObjectId,
        ref: 'operator'
    }],
    map: {
        type: Schema.Types.ObjectId,
        ref: 'map'
    }
});

const Season = mongoose.model('season', SeasonSchema);

module.exports = Season;