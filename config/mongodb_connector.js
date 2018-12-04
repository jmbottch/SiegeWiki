const mongoose = require('mongoose');
const config = require('./mongodb_config');

mongoose.Promise = global.Promise;

mongoose.connect(config.dburl_env, { useNewUrlParser: true });
    var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl_env))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;