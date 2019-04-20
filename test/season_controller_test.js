const mongoose = require('mongoose');
const app = require('../server');
const request = require('supertest');
const chai = require('chai');
expect = chai.expect;

const User = mongoose.model('user');
const World = mongoose.model('world');
const Season = mongoose.model('season');
const Operator = mongoose.model('operator')

describe('the season_controller can', () => {
    //Test User
    user = new User({
        name: 'Test User',
        password: 'Password',
        admin: false
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
    editedSeason = new Season({
        name: 'Edited Season',
        description: 'Edited Season Description',
        year: 2,
        season: 2,
        operators: [operator1._id],
        worlds: [world1._id]
    })
    emptySeason = new Season({
        name: '',
        description: '',
        year: null,
        season: null,
        operators: [Operator._id],
        worlds: [world._id]
    })
    falseSeason = new Season({
        name: 'False Season',
        description: 'This season does not have all required values'
    })

    it('can fetch a list of seasons', function (done) {
        request(app)
            .get('/api/seasons') //perform get request on api
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);//check for statuscode 200
                expect(res.body).to.be.an('Array');//check for body to be an array
                expect(res.body).to.be.empty; //check for body to be empty
                done();
            })

    })

    it('can create a new season', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/season')
                    .set({ 'Authorization': token })
                    .send(season)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Season has been created.')
                        done()
                    })
            })
    })

    it('throws an error when not all required values are entered in create', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/season') //perform post request on api
                    .set({ 'Authorization': token })
                    .send(falseSeason) //send the false object
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(401) //check for Error statuscode 401
                        done()
                    })
            })
    })


    it('can fetch a single season', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/season') //post a test season
                    .set({ 'Authorization': token })
                    .send(season)
                    .then(() => {
                        Season.findOne({ name: 'Test Season' }) //find the test season
                            .then((foundSeason) => {
                                request(app)
                                    .get('/api/season/' + foundSeason._id) //perform get request on api
                                    .end(function (err, res) {
                                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                                        expect(res.body.name).to.equal('Test Season') // check for right name
                                        expect(res.body.operators).to.not.be.empty //check if operators in the found object is not empty
                                        expect(res.body.worlds).to.not.be.empty //check if worlds in the found object is not empty
                                        done();
                                    })
                            })
                    })
            })


    })

    it('can edit an existing season', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/season') //post a tests season
                    .set({ 'Authorization': token })
                    .send(season)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                        expect(res.body.Message).to.equal('Season has been created.') //check for created message
                        Season.findOne({ name: 'Test Season' }) //find test season
                            .then((foundSeason) => {
                                request(app)
                                    .put('/api/season/' + foundSeason._id) //perform put request on api
                                    .set({ 'Authorization': token })
                                    .send(editedSeason) //send editedSeason from top of the file
                                    .then(() => {
                                        request(app)
                                            .get('/api/season/' + foundSeason._id) //find the test season after editing
                                            .end(function (err, res) {
                                                expect(res.statusCode).to.equal(200) //check for statuscode(200)
                                                expect(res.body.name).to.equal('Edited Season') //check for name "edited"
                                                expect(res.body.year).to.equal(2) //check if year is edited
                                                done()
                                            })
                                    })
                            })
                    })
            })
    })

    it('can edit a season with fields left empty', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register') //post a test user
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200) //check for statuscode 200
                expect(res.body.auth).to.equal(true) //check for authorization === true
                token = 'Bearer ' + res.body.token //get the test user its token
                request(app)
                    .post('/api/season') //post a test season
                    .set({ 'Authorization': token }) //give the token to the request
                    .send(season)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                        expect(res.body.Message).to.equal('Season has been created.') //check for season created message
                        Season.findOne({ name: 'Test Season' })
                            .then((foundSeason) => {
                                request(app)
                                    .put('/api/season/' + foundSeason._id) //perform put request ont api/season/:id
                                    .set({ 'Authorization': token })
                                    .send(emptySeason) // with empty input values
                                    .end(function (err, res) {
                                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                                        expect(res.body.Message).to.equal('Season has been edited.') //check for edited season message
                                        Season.findOne({ name: 'Test Season' })
                                            .then((newFoundSeason) => { //DOUBLE CHECK
                                                request(app)
                                                    .get('/api/season/' + newFoundSeason._id) //get request on /api/season/:id
                                                    .end(function (err, res) {
                                                        expect(res.statusCode).to.equal(200) //check for statuscode 200
                                                        expect(res.body.name).to.equal('Test Season') // check for correct name
                                                        expect(res.body.description).to.equal('Test Season Description') // check for correct description
                                                        expect(res.body.year).to.equal(1) // check for correct year
                                                        expect(res.body.season).to.equal(1) // check for correct season
                                                        done()
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })
    it('can delete a season', function (done) {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/season') //post a test season
                    .set({'Authorization' : token})
                    .send(season)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200) //check for status code 20
                        expect(res.body.Message).to.equal('Season has been created.') //check for season created message
                        Season.findOne({ name: 'Test Season' }) //find the test season
                            .then((foundSeason) => {
                                request(app)
                                    .delete('/api/season/' + foundSeason._id) //perform delete request on api
                                    .set({'Authorization' : token})
                                    .then(() => {
                                        request(app)
                                            .get('/api/seasons') //perform get request on the list of all seasons 
                                            .end(function (err, res) {
                                                expect(res.statusCode).to.equal(200) //check for statuscode 200
                                                expect(res.body).to.be.an('Array') //check for body to be an array
                                                expect(res.body).to.be.empty    //check for body to be empty again, since we deleted the record
                                                done()
                                            })
                                    })
                            })
                    })
            })


    })
})
