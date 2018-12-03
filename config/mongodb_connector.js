const mongoose = require('mongoose');
const config = require('./mongodb_config');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://app:Password1@ds061938.mlab.com:61938/siegewiki', { useNewUrlParser: true });
    var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;