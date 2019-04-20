const mongoose = require('mongoose');
const app = require('../server');
const request = require('supertest');
const chai = require('chai');
expect = chai.expect;

const World = mongoose.model('world');
const Season = mongoose.model('season');
const Operator = mongoose.model('operator')

describe('the operator_controller', () => {
    //Test operators
    operator = new Operator({
        name: 'Test Operator',
        description: 'Test Operator Description',
        side: 'Attacker'
    })
    editedOperator = new Operator({
        name: 'Test Operator1',
        description: 'Test Operator Description1',
        side: 'Defender'
    })

    beforeEach((done) => {
        done() 
    })



    it('can get a list of operators', function(done) {
        request(app)
            .get('/api/operators')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.be.an('Array')
                expect(res.body).to.be.empty
                done()
            })
    })

    it('can create a new operator', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/operator')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Operator has been created.')
                        done()
                    })
            })
    })

    it('can fetch a single operator', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/operator')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Operator has been created.')
                        Operator.findOne({ name: 'Test Operator' })
                            .then((foundOperator) => {
                                request(app)
                                    .get('/api/operator/' + foundOperator._id)
                                    .end(function (err, res) {
                                        expect(res.statusCode).to.equal(200)
                                        expect(res.body.name).to.equal('Test Operator')
                                        expect(res.body.side).to.equal('Attacker')
                                        done()
                                    })
                            })
                    })
            })
    })

    it('can edit an existing operator', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/operator')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Operator has been created.')
                        Operator.findOne({ name: 'Test Operator' })
                            .then((foundOperator) => {
                                request(app)
                                    .get('/api/operator/' + foundOperator._id)
                                    .end(function (err, res) {
                                        expect(res.statusCode).to.equal(200)
                                        expect(res.body.name).to.equal('Test Operator')
                                        expect(res.body.side).to.equal('Attacker')
                                        Operator.findOne({ name: 'Test Operator' })
                                            .then((foundOperator) => {
                                                request(app)
                                                    .put('/api/operator/' + foundOperator._id)
                                                    .set({ 'Authorization': token })
                                                    .send(editedOperator)
                                                    .end(function (err, res) {
                                                        expect(res.statusCode).to.equal(200)
                                                        expect(res.body.Message).to.equal('Operator has been edited.')
                                                        Operator.findOne({ name: 'Test Operator1' })
                                                            .then((changedOperator) => {
                                                                request(app)
                                                                    .get('/api/operator/' + changedOperator._id)
                                                                    .end(function (err, res) {
                                                                        expect(res.statusCode).to.equal(200)
                                                                        expect(res.body.name).to.equal('Test Operator1')
                                                                        expect(res.body.description).to.equal('Test Operator Description1')
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

    it('can delete an operator', function (done) {
        var token = 'Bearer ';
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200)
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                request(app)
                    .post('/api/operator')
                    .set({ 'Authorization': token })
                    .send(operator)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.Message).to.equal('Operator has been created.')
                        Operator.find({})
                            .then(() => {
                                request(app)
                                    .get('/api/operators')
                                    .end(function (err, res) {
                                        expect(res.statusCode).to.equal(200)
                                        expect(res.body).to.not.be.empty
                                        Operator.findOne({ name: 'Test Operator' })
                                            .then((deleteOperator) => {
                                                request(app)
                                                    .delete('/api/operator/' + deleteOperator._id)
                                                    .set({ 'Authorization': token })
                                                    .end(function (err, res) {
                                                        expect(res.statusCode).to.equal(200)
                                                        expect(res.body.Message).to.equal('Operator has been deleted.')
                                                        Operator.find({})
                                                            .then(() => {
                                                                request(app)
                                                                    .get('/api/operators')
                                                                    .end(function (err, res) {
                                                                        expect(res.statusCode).to.equal(200)
                                                                        expect(res.body).to.be.empty
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


})