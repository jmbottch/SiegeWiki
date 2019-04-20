const mongoose = require('mongoose');
const app = require('../server');
const request = require('supertest');
const chai = require('chai');
expect = chai.expect;

const World = mongoose.model('world');
const Season = mongoose.model('season');
const Operator = mongoose.model('operator');
const User = mongoose.model('user');

describe('the user_controller ', () => {
    //Test Users
    user = new User({
        name: 'Test User',
        password: 'Password',
        admin: false
    })
    editedUser = new User({

        password: 'changedPassword',

    })

    //Test Worlds
    world = new World({
        name: 'Test Map',
        description: 'Test Map Description'
    })
    world1 = new World({
        name: 'Test Map1',
        description: 'Test Map Description1'
    })
    //Test operators
    operator = new Operator({
        name: 'Test Operator',
        description: 'Test Operator Description',
        side: 'Attacker'
    })
    editedOperator = new Operator({
        name: 'Test Operator1',
        description: 'Test Operator Description1',
        side: 'Defender',
    })
    falseOperator = new Operator({
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
    season1 = new Season({
        name: 'Edited Season',
        description: 'Edited Season Description',
        year: 2,
        season: 2,
        operators: [operator._id],
        worlds: [operator._id]
    })
    it('can fetch a list of users', function (done) {
        request(app)
            .get('/api/users') //perform get request on api list
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200) //check for positive statuscode
                expect(res.body).to.be.an('Array') //check for body to be an array
                expect(res.body).to.be.empty //check for body to be empty, since we did not send anything to the db yet
                done()
            })
    })



    it('can create a new user', function (done) {
       request(app)
            .post('/api/user/register') // perform post request on the api
            .send(user) //send a username and password
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200); //check for positive statuscode
                expect(res.body.Message).to.equal('User created succesfully.') //check for positive message
                expect(res.body.auth).to.equal(true) //check for authorization
                done()
            })
    })

    it('can fetch a single user', function (done) {
        request(app)
            .post('/api/user/register') //post a test user
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200) //check for positive statuscode
                expect(res.body.Message).to.equal('User created succesfully.')//check for positive message
                User.findOne({ name: 'Test User' })
                    .then((foundUser) => { //find the test user
                        request(app)
                            .get('/api/user/' + foundUser._id)
                            .end(function (err, res) {
                                expect(res.statusCode).to.equal(200) //check for positive statuscode
                                expect(res.body.name).to.equal('Test User') //check for correct name
                                done()
                            })
                    })
            })
    })

    it('can edit a user', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register') // perform post request on the api
            .send(user) //send a username and password
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200); //check for positive statuscode
                expect(res.body.Message).to.equal('User created succesfully.') //check for positive message
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                User.findOne({ name: "Test User" })
                    .then((foundUser) => { //find the test user
                        request(app)
                            .put('/api/user/' + foundUser._id) //perform put request on the api
                            .set({'Authorization' : token})
                            .send(editedUser) //send the new password
                            .end(function (err, res) {
                                expect(res.statusCode).to.equal(200) //check for positive statuscode
                                expect(res.body.Message).to.equal('Password has been changed.') //check for positive message
                                User.findOne({ name: 'Test User' })
                                    .then((changedUser) => { //find the test user
                                        request(app)
                                            .get('/api/user/' + changedUser._id)
                                            .end(function (err, res) {
                                                expect(res.statusCode).to.equal(200) //check for positive statuscode
                                                expect(res.body.password).to.equal('changedPassword') //check for changedPassword
                                                done()
                                            })
                                    })
                            })
                    })
            })

    })

    it('can delete a user', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register') // perform post request on the api
            .send(user) //send a username and password
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200); //check for positive statuscode
                expect(res.body.Message).to.equal('User created succesfully.') //check for positive message
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                User.find({})
                    .then(() => {
                        request(app)
                            .get('/api/users') //get request on the api list
                            .end(function (err, res) {
                                expect(res.statusCode).to.equal(200) //check for positive statuscode
                                expect(res.body).to.not.be.empty //check for body to be NOT empty
                                User.findOne({ name: 'Test User' })
                                    .then((foundUser) => { //find the test user
                                        request(app)
                                            .delete('/api/user/' + foundUser._id) //perform delete request on the api
                                            .set({'Authorization' : token})
                                            .end(function (err, res) {
                                                expect(res.statusCode).to.equal(200)  //check for positive statuscode
                                                expect(res.body.Message).to.equal('User has been deleted.') //check for positive message
                                                User.find({})
                                                    .then(() => {
                                                        request(app)
                                                            .get('/api/users') //get request on the list 
                                                            .end(function (err, res) {
                                                                expect(res.statusCode).to.equal(200) //check for positive statuscode
                                                                expect(res.body).to.be.an('Array') //check for body to be an array
                                                                expect(res.body).to.be.empty //check for body to be empty again, we deleted the user.
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