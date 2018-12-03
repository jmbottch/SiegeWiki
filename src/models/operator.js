const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Season = require('./season');

const OperatorSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name of operator is required.']        
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    side: {
        type: String,
        required: [true, 'side is required']          // TODO: DROPDOWN FOR ATTACKER/DEFENDER
    },
    season: {
        type: Schema.Types.ObjectId,
        ref: 'season'
    }
});

const Operator = mongoose.model('operator', OperatorSchema);

module.exports = Operator;