const WorldController = require('../src/controllers/world_controller');
// const OperatorController = require('../src/controllers/operator_controller');
// const SeasonController = require('../src/controllers/season_controller');

module.exports = (app) => {

    //create a new world
    app.post('/api/world/', WorldController.create);
    //edit an existing world
    app.put('/api/world/', WorldController.edit);
    //delete a world
    app.delete('/api/world/', WorldController.delete);
    //show list of worlds
    app.get('/api/worlds/' , WorldController.getAllWorldsUnsorted);
    //show just one world
    app.get('/api/world/:id', WorldController.getWorldById);

    //create a user
    app.post('/api/user/', UserController.create);
    //change user's password
    app.put('/api/user/', UserController.edit);
    //delete a user
    app.delete('/api/user/', UserController.delete);
}