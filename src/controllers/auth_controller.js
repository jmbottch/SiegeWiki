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

    // login(req, res) {

    //     const {name, password} = req.body
    //     User.findOne({name, password})
    //     if(!res) {
    //         res.json({
    //             succes: false,
    //             })
    //             res.status(401).send({Error: 'Invalid Details.'})
    //     }else {
    //         console.log("Logging you in")
    //     }

    // },

    register(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({
            name: req.body.name,
            password: hashedPassword
        },
            function (err, user) {
                if (err) return res.status(500).send("There was a problem registering the user.")
                // create a token
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token });
            });

    },

    getUser(req, res) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            res.status(200).send(decoded);
        });
    }

}
