const WorldController = require('../src/controllers/world_controller');
const OperatorController = require('../src/controllers/operator_controller');
const SeasonController = require('../src/controllers/season_controller');
const UserController = require('../src/controllers/user_controller');
const AuthController = require('../src/controllers/auth_controller');

module.exports = (app) => {

     //register a new user with 'name, password'
     app.post('/api/user/register', AuthController.validateToken, UserController.create);
     //login using a token and 'name, password'
     app.post('/api/user/login', AuthController.login);


    //edit an existing world
    app.put('/api/worlds/', WorldController.edit);
    //delete a world
    app.delete('/api/worlds/', WorldController.delete);
    //show list of worlds
    app.get('/api/worlds/' , WorldController.list);
    

    //create a user
    app.post('/api/users/', UserController.create);
    //change user's password
    app.put('/api/users/', UserController.edit);
    //delete a user
    app.delete('/api/user/', UserController.delete);

    //create a new season
    app.post('/api/seasons/', SeasonController.create);
    //edit an existing season
    app.put('/api/seasons/', SeasonController.edit);
    //delete a season
    app.delete('/api/seasons/', SeasonController.delete);
    //show list of Seasons
    app.get('/api/seasons/' , SeasonController.list);

    //create a new operator
    app.post('/api/operators/', OperatorController.create);
    //edit an existing operator
    app.put('/api/operators/', OperatorController.edit);
    //delete an operator
    app.delete('/api/operator/', OperatorController.delete);
    //show list of operators
    app.get('/api/operators/', OperatorController.list);

   

}