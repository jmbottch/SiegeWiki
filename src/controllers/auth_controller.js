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
        User.findOne( { name: req.body.name } )
        .then(user => {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid){
                res.status(401).send({ Error :'Password does not match.'})
            }
            else {
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  res.status(200).send({ auth: true, token: token });
            }
        })
        .catch(error => {
            res.status(401).send({ Error: error});
        });
    },
    
     verifyToken(req, res, next) {
         if(!req.headers.authorization){
            return res.status(401).send('Unauthorized request')
         }
         let token = req.headers.authorization.split(' ')[1]
         if (token === 'null') {
            return res.status(401).send('Unauthorized request')
         }
         let payload = jwt.verify(token, config.secret)
         if (!payload) {
             return res.status(401).send('Unauthorized request')
         }
         req.userId = payload.subject
         next()
     }
    
}
