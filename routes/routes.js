const WorldController = require('../src/controllers/world_controller');
const OperatorController = require('../src/controllers/operator_controller');
const SeasonController = require('../src/controllers/season_controller');
const UserController = require('../src/controllers/user_controller');
const AuthController = require('../src/controllers/auth_controller');

module.exports = (app) => {

     //register a new user with 'name, password'
     app.post('/api/user/register', UserController.create);
     //login using a token and 'name, password'
     app.post('/api/user/login', AuthController.login);


     //create new world
    app.post('/api/worlds/', AuthController.verifyToken, WorldController.create)
    //edit an existing world
    app.put('/api/worlds/', AuthController.verifyToken, WorldController.edit);
    //delete a world
    app.delete('/api/worlds/', AuthController.verifyToken, WorldController.delete);
    //show list of worlds
    app.get('/api/worlds/' , WorldController.list);
    

    //create a user
    app.post('/api/users/', AuthController.verifyToken, UserController.create);
    //change user's password
    app.put('/api/users/', AuthController.verifyToken, UserController.edit);
    //delete a user
    app.delete('/api/users/', AuthController.verifyToken, UserController.delete);

    //create a new season
    app.post('/api/seasons/', AuthController.verifyToken, SeasonController.create);
    //edit an existing season
    app.put('/api/seasons/', AuthController.verifyToken, SeasonController.edit);
    //edit an existing season with 'id, name, description, imageLink, year'
    app.put('/api/seasons/populate/', AuthController.verifyToken, SeasonController.populate);
    //delete a season
    app.delete('/api/seasons/', AuthController.verifyToken, SeasonController.delete);
    //show list of Seasons
    app.get('/api/seasons/' , SeasonController.list);
    //get all seasons Populated
    app.get('/api/seasons/populate', SeasonController.getAllPopulated);

    //create a new operator
    app.post('/api/operators/', AuthController.verifyToken, OperatorController.create);
    //edit an existing operator
    app.put('/api/operators/', AuthController.verifyToken, OperatorController.edit);
    //delete an operator
    app.delete('/api/operators/', AuthController.verifyToken, OperatorController.delete);
    //show list of operators
    app.get('/api/operators/' ,OperatorController.list);

   

}