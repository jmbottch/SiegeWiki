const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const World = require('./world');
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
    season: {
        type: Number,
        required: [true, 'Season is required']
    },
    operators: [{
        type: Schema.Types.ObjectId,
        ref: 'operator'
    }],
    world: {
        type: Schema.Types.ObjectId,
        ref: 'world'
    }

    
});

const Season = mongoose.model('season', SeasonSchema);

module.exports = Season;