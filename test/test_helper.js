const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before( function(done) {
    mongoose.disconnect();
    mongoose.connect('mongodb://localhost/siegewiki_test', { useNewUrlParser: true })
    var connection = mongoose.connection
        .once('open', () => {
            console.log('Connected to Mongo on localhost to test')
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error.toString());
        });
});

beforeEach( function(done) {
    this.timeout(0);
    done();
    const { users, operators, seasons, siegemaps } = mongoose.connection.collections;

    // users.drop(() => {
    //     siegemaps.drop(() => {
    //         operators.drop(() => {
    //             seasons.drop(() => {
    //                 done();
    //             });
    //         });
    //     });
    // });
});