const WorldController = require('../src/controllers/world_controller');
const OperatorController = require('../src/controllers/operator_controller');
const SeasonController = require('../src/controllers/season_controller');
const UserController = require('../src/controllers/user_controller');
module.exports = (app) => {

    //create a new world
    app.post('/api/world/', WorldController.create);
    //edit an existing world
    app.put('/api/world/', WorldController.edit);
    //delete a world
    app.delete('/api/world/', WorldController.delete);
    //show list of worlds
    app.get('/api/worlds/' , WorldController.list);
    

    //create a user
    app.post('/api/user/', UserController.create);
    //change user's password
    app.put('/api/user/', UserController.edit);
    //delete a user
    app.delete('/api/user/', UserController.delete);

    //create a new season
    app.post('/api/season/', SeasonController.create);
    //edit an existing season
    app.put('/api/season/', SeasonController.edit);
    //delete a season
    app.delete('/api/season/', SeasonController.delete);
    //show list of Seasons
    app.get('/api/seasons/' , SeasonController.list);

    //create a new operator
    app.post('/api/operator/', OperatorController.create);
    //edit an existing operator
    app.put('/api/operator/', OperatorController.edit);
    //delete an operator
    app.delete('/api/operator/', OperatorController.delete);
    //show list of operators
    app.get('/api/operators/' , OperatorController.list);
}