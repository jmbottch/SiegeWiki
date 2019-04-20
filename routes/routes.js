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


     //Create a new world
     app.post('/api/world', AuthController.validateToken, WorldController.create);
    //edit an existing world
    app.put('/api/world/:id', AuthController.validateToken, WorldController.edit);
    //delete a world
    app.delete('/api/world/:id', AuthController.validateToken, WorldController.delete);
    //show list of worlds
    app.get('/api/worlds/' , WorldController.list);
    //show single world
    app.get('/api/world/:id' , WorldController.single);
    

    //change user's password
    app.put('/api/user/:id', AuthController.validateToken, UserController.edit);
    //delete a user
    app.delete('/api/user/:id', AuthController.validateToken, UserController.delete);
    //show a list of users
    app.get('/api/users/', UserController.list)
    //show a single user
    app.get('/api/user/:id', UserController.single)

    //create a new season
    app.post('/api/season/', AuthController.validateToken, SeasonController.create);
    //edit an existing season
    app.put('/api/season/:id', AuthController.validateToken, SeasonController.edit);
    //delete a season
    app.delete('/api/season/:id', AuthController.validateToken, SeasonController.delete);
    //show list of Seasons
    app.get('/api/seasons/' , SeasonController.list);
    //show a single season
    app.get('/api/season/:id', SeasonController.single);

    //create a new operator
    app.post('/api/operator/', AuthController.validateToken, OperatorController.create);
    //edit an existing operator
    app.put('/api/operator/:id', AuthController.validateToken, OperatorController.edit);
    //delete an operator
    app.delete('/api/operator/:id', AuthController.validateToken, OperatorController.delete);
    //show list of operators
    app.get('/api/operators/' , OperatorController.list);
    //show a single operator
    app.get('/api/operator/:id', OperatorController.single);

   

}