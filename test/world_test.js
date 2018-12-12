var User = require('../src/models/user');
const bcrypt = require('bcryptjs');
var app = require('../server'),
    chai = require('chai'),
    request = require('supertest'),
    chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('The usercontroller can', function () {
    this.timeout(0);

    var user = {
        name: 'testnameChai',
        password: 'testpasswordChai',
        newPassword: 'nieuwepaslmao'
    };

    it('should register a user', function (done) {
        request(app)
            .post('/api/user/register')
            .send(user)
            .end(function (err, res) {
                //console.log(res.body)
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});