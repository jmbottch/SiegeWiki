const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/siegewiki', { useNewUrlParser: true });

    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => { console.warn('Error: ', error); });
});

beforeEach((done) => {
    const { users, worlds, operators, seasons } = mongoose.connection.collections;
    worlds.drop(() => {
        operators.drop(() => {
            seasons.drop(() => {
                users.drop(() => {
                    done();
                });                
            });
        });
    });
});