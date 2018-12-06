const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/mongodb_config');

module.exports = {

    login(req, res) {
        User.findOne({name: req.body.name})
        .then(user => {
            var validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!validPassword) {
                res.status(401).send({Error: 'Invalid Password'})
            }
            else {
                var token = jwt.sign({id: user._id}, config.secret, {
                    expiresIn: 86400 //expires in 24 hours
                });
                res.status(200).send({auth: true, token: token})
            }
        })
        .catch(error => {
            res.status(401).send({Error: error});
        });
    },
        
    validateToken(req, res, next) {
        var token = req.headers['x-access-token'];
        console.log(token)
        if(!token) return res.status(401).send({Error : 'Token is missing'})

        jwt.verify(token, config.secret, function(err, decoded) {
            console.log(decoded)
            if (err) return res.status(401).send({Error: 'Invalid Token'})
            if (decoded) next();
        });
    }
}
