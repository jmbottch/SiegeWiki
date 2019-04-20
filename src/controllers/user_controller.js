const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/mongodb_config');



module.exports = {
    list(req, res) {
        User.find({})
        .then((users) => {
            res.status(200).send(users)
        })
    },

    single(req, res) {
        User.findById(req.params.id)
        .then((user) => {
            if(user === null) {
                res.status(401).send({Error: 'User does not exist'})
            } else {
                res.status(200).send(user)
            }
        })
    },

    create(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
            name: req.body.name,
            password: hashedPassword
        })  
        .then(() =>{            
            var token = jwt.sign({id: user._id }, config.secret, {
                expiresIn:86400
            })
            res.status(200).send({ Message: "User created succesfully.", auth: true, token: token })
        })
        .catch((err) => {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({ Error: 'Username is already taken.'});
                } else {
                    res.status(401).send({err});
                }
        });
    },

    edit(req, res) {
       User.findOne( { _id: req.params.id })
       .then(user => {
           if(user === null){
               res.status(401).send({Error: 'User does not exist.'})
           }
           else {
               let passwordToSet = req.body.password;

               if(req.body.password === null || req.body.password === '') passwordToSet = user.password
               user.set({
                password: passwordToSet
               })
               user.save()
               .then(user => res.status(200).send({Message: 'Password has been changed.'}))
               .catch((err) => res.status(401).send({err}));
           }
       });
    },

    delete(req, res) {
        User.findOne({_id: req.params.id })
        .then(user => {
            if(user === null){
                res.status(401).send({Error: 'User does not exist.'})
            }
            else {
                user.delete()
                .then(() => res.status(200).send({ Message: 'User has been deleted.'}))
            }
        });
    }

};