
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
const server = require('../server')
const pool = require('../config/mongodb_config')
const mongoose = require('mongoose');
const User = require('../src/models/user');
const request = require('supertest')
const bcrypt = require('bcryptjs');
var expect = chai.expect;


chai.should()
chai.use(chaiHttp)


const user = {
    name: 'testUser1',
    password: 'testPassword1'
}
describe('Auth API', function() { 

    before((done) => {
        mongoose.connection.collections.users.drop()
            .then(() => {
                User.create(user)
                .then(newuser => {
                    //console.log(newuser)
                
            })
            
        })
        done();
    });


    it('should register a user', function (done) {
        request(server)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                //console.log(res.body)
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    // it('returns a token on valid login', function(done) {
    //     var user = {
    //         name: 'testUser1',
    //         password: 'testPassword1',
    //     }
    //     chai.request(server)
    //         .post('/api/user/login')
    //         .send(user)
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             // res.should.be.json;
    //             // res.body.should.be.an('object');
    //             // res.body.result.should.have.property('token').that.is.a('string');

    //             // export a valid token voor gebruik in andere testcases.
    //             // module.exports = {
    //             //     token: res.body.result.token
    //             // }
    //             done();
    //         });
    // });
});