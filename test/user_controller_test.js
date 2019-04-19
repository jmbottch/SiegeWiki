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

    it('can create a new user', function(done) {
        var token = 'Bearer '
        request(app)
        .post('api/user/register')
        .send(user)
        .end(function(err, res) {
            if(err)console.log(err)
            expect(res.body.auth).to.equal(true);
            expect(res.statusCode).to.equal(200);
            done()
        })
    })  

})