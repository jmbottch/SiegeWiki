const mongoose = require('mongoose');
const app = require('../server');
const request = require('supertest');
const chai = require('chai');
expect = chai.expect;

const World = mongoose.model('world');
const Season = mongoose.model('season');
const Operator = mongoose.model('operator')

describe('the world_controller', () => {
    world = new World({
        name: 'Test Map',
        description: 'Test Map Description',
        season: season._id
    })
    editedWorld = new World({
        name: 'Edited Map',
        description: 'Edited Map Description',
        season: season._id
    })
    falseWorld = new World({
        name: 'False World',
        season: season._id
    })
    emptyWorld = new World({
        name: '',
        description: '',
        season: season._id
    })
    //Test operators
    operator = new Operator({
        name: 'Test Operator',
        description: 'Test Operator Description',
        side: 'Attacker'
    })
    operator1 = new Operator({
        name: 'Test Operator1',
        description: 'Test Operator Description1',
        side: 'Defender'
    })
    // Test seasons
    season = new Season({
        name: 'Test Season',
        description: 'Test Season Description',
        year: 1,
        season: 1,
        operators: [operator._id],
        worlds: [world._id]
    })
    season2 = new Season({
        name: 'Edited Season',
        description: 'Edited Season Description',
        year: 2,
        season: 2,
        operators: [operator1._id],
        worlds: [world1._id]
    })

    it('can get a list of maps', function(done) {
        request(app)
        .get('/api/worlds') //perform get on list api endpoint
        .end(function(err,res) {
            expect(res.statusCode).to.equal(200) //check for statuscode 200
            expect(res.body).to.be.an('Array') //check for body to be an array
            expect(res.body).to.be.empty // check for body to be empty
            done()
        })
    })

    it('can create a map', function(done) {
        request(app)
        .post('/api/world') //perform a post request on the api
        .send(world)
        .end(function(err,res) {
            expect(res.statusCode).to.equal(200) //check for statuscode 200
            expect(res.body.Message).to.equal('World created succesfully.') //check for world created message 
            World.findOne({name:'Test Map'}) //DOUBLE CHECK
            .then((foundWorld) => {
                request(app)
                .get('/api/world/' + foundWorld._id) //find test world by id
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200) //check statuscode 200
                    expect(res.body.name).to.be.a('String') //check for name to be a string
                    expect(res.body.description).to.equal('Test Map Description') //check for the right description
                    done()
                })
            })
        })
    })

    it('gives an error when not all required fields are provided', function(done) {
        request(app)
        .post('/api/world') //perform a post request on the api
        .send(falseWorld) // with invalid values
        .end(function(err,res) {
            expect(res.statusCode).to.equal(401) //check for Error statuscode 401
            expect(res.body.err.name).to.equal('ValidationError') //check for errorname ValidationError
            World.find({})
            .then(() => {   //DOUBLE CHECK
                request(app)
                .get('/api/worlds') //get the list of all worlds
                .end(function(err,res) {
                    expect(res.statusCode).to.equal(200) //check for statuscode 200
                    expect(res.body).to.be.an('Array') //check for body to be an array
                    expect(res.body).to.be.empty //check for body to be empty since we were not able to send the invalid values
                    done()
                })
            })
            
        })
    })

    it('can return a single world', function(done) {
        request(app)
        .post('/api/world') //post a test world
        .send(world)
        .end(function(err, res) {
            expect(res.statusCode).to.equal(200) //check for statuscode 200
            expect(res.body.Message).to.equal('World created succesfully.') //check for world created message
            World.findOne({name: 'Test Map'})
            .then((foundMap) => {
                request(app)
                .get('/api/world/' + foundMap._id) //perform get request on api/world/:id
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200) // check for statuscode 200
                    expect(res.body.name).to.equal('Test Map') //check for correct name
                    expect(res.body.description).to.equal('Test Map Description') //check for correct description
                    expect(res.body.season).to.not.be.empty //check for season not to be empty
                    done()
                })
            })
        })
    })

    it('can edit an existing world', function(done) {
        request(app)
        .post('/api/world') //post a test world
        .send(world)
        .end(function(err,res) {
            expect(res.statusCode).to.equal(200) //check for statuscode 200
            expect(res.body.Message).to.equal('World created succesfully.') //check for world created message 
            World.findOne({name: 'Test Map'})
            .then((foundWorld) => {
                request(app)
                .put('/api/world/' + foundWorld._id) //perform put request on api/world/:id
                .send(editedWorld) //send in new values
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200) //check for statuscode 200
                    expect(res.body.Message).to.equal('Map succesfully edited.') //check for world edited message
                    World.findOne({name: 'Edited Map'})
                    .then((editedfoundworld) => { //DOUBLE CHECK
                        request(app)
                        .get('/api/world/' + editedfoundworld._id) //get request on api/world/:id
                        .end(function(err, res) {
                            expect(res.statusCode).to.equal(200) //check for statuscode 200
                            expect(res.body.name).to.equal('Edited Map') //check for correct name
                            expect(res.body.description).to.equal('Edited Map Description') //check for correct description
                            expect(res.body.season).to.not.be.empty //check for season to not be empty
                            done()
                        })
                    })
                })
            })
        })
    })

    it('can edit an existing world with fields left empty', function(done) {
        request(app)
        .post('/api/world') //post a test world
        .send(world)
        .end(function(err,res) {
            expect(res.statusCode).to.equal(200) //check for statuscode 200
            expect(res.body.Message).to.equal('World created succesfully.') //check for world created message 
            World.findOne({name: 'Test Map'})
            .then((foundWorld) => {
                request(app)
                .put('/api/world/' + foundWorld._id) //perform put request on api/world/:id
                .send(emptyWorld) //send in new values
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200) //check for statuscode 200
                    expect(res.body.Message).to.equal('Map succesfully edited.') //check for world edited message
                    World.findOne({name: 'Test Map'})
                    .then((editedfoundworld) => { //DOUBLE CHECK
                        request(app)
                        .get('/api/world/' + editedfoundworld._id) //get request on api/world/:id
                        .end(function(err, res) {
                            expect(res.statusCode).to.equal(200) //check for statuscode 200
                            expect(res.body.name).to.equal('Test Map') //check for correct name
                            expect(res.body.description).to.equal('Test Map Description') //check for correct description
                            expect(res.body.season).to.not.be.empty //check for season to not be empty
                            done()
                        })
                    })
                })
            })
        })
    })

    it('can delete an existing world', function(done) {
        request(app)
        .post('/api/world') //post a test world
        .send(world)
        .end(function(err,res) {
            expect(res.statusCode).to.equal(200) //check for statuscode 200
            expect(res.body.Message).to.equal('World created succesfully.') //check for world created message
            World.find({})
            .then(() => { // double check on creating 
                request(app)
                .get('/api/worlds') //get request on api/worlds
                .end(function(err,res) {
                    expect(res.statusCode).to.equal(200) //check for statuscode 200
                    expect(res.body).to.be.an('Array') //check for body to be an array
                    expect(res.body).to.not.be.empty //check for body to not be empty
                    World.findOne({name:'Test Map'}) //find the map by name
                    .then((mapToDelete) => { 
                        request(app)
                        .delete('/api/world/' + mapToDelete._id) // perform delete request on /api/world/:id
                        .end(function(err,res){
                            expect(res.statusCode).to.equal(200) //check for statuscode 200
                            expect(res.body.Message).to.equal('World succesfully removed.') //check for world removed message
                            World.find({})
                            .then(() => {
                                request(app)  //DOUBLE CHECK
                                .get('/api/worlds') //get request on /api/worlds
                                .end(function(err, res) {
                                    expect(res.statusCode).to.equal(200) //check for statuscode 200
                                    expect(res.body).to.be.an('Array') //check for body to be an array
                                    expect(res.body).to.be.empty //check for body to be empty again
                                    done()
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})