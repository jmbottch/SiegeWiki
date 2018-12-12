var World = require('../src/models/world');
const bcrypt = require('bcryptjs');
var app = require('../server'),
    chai = require('chai'),
    request = require('supertest'),
    chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
const assert = require('assert');

describe('The usercontroller can', function () {
    this.timeout(0);

    var world = {
        name: 'testWorld',
        description: 'TESTWORLD',
        availableInRanked: false
    };

    var world2 = {
        name: 'testWorld2',
        description: 'TESTWORLD2',
        availableInRanked: true
    };

    xit('can save a world', (done) => {
        request(app)
            .post('/api/worlds')
            .send(world)
            .end(function (err, res) {
                //console.log(res.body)
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('handles a Get request to /api/worlds', (done) => {
        request(app)
            .get('/api/worlds')
            .end((err, res) => {
                if (err) console.log(err)
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.be.an('array');
                done();

            })
    })

    it('handles a put request to /api/worlds', (done) => {
        const joe = new World(world);

        joe.save()
            .then(() => {
                World.findOneAndUpdate({ name: 'testWorld' }, { availableInRanked: false })
                    .then(() => World.findOne({ name: 'testWorld' }))
                    .then((world) => {
                        assert(world.availableInRanked === false)
                        done();
                    })
            })

    })

    xit('handles delete request to /api/worlds', (done) => {
        request(app)
            .post('/api/worlds')
            .send(world)
            .then(() => {
                request(app)
                    .delete('/api/worlds')
                    .send(world)
                    .end(() => {
                        World.findOne({ name: 'testWorld' })
                            .then((world) => {
                                expect(world).to.be.null
                                done();
                            }
                        )
                    }
                )
            }   
        )
    })
});