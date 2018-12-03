const User = require('../models/user');

module.exports = {

    create(req, res) {
        const userProps = req.body;

        User.create(userProps)
            .then(() => res.status(201).send({ Message: 'User has been created'}))
            .catch(err => res.status(401).send({err}))
    },

    edit(req, res) {
       User.findOne( { name: req.body.name })
       .then(user => {
           if(user === null){
               res.status(401).send({Error: 'User does not exist'})
           }
           if(user.password !== req.body.password){
               req.status(401).send({Error: 'Password does not match'})
           }
           else {
               user.set('password', req.body.newPassword)
               user.save()
               .then(user => res.status(200).send({Message: 'Password has been changed'}))
               .catch((err) => res.status(401).send({err}));
           }
       });
    },

    delete(req, res) {
        User.findOne({name: req.body.name })
        .then(user => {
            if(user === null){
                res.status(401).send({Error: 'User does not exist'})
            }
            if(user.password !== req.body.password) {
                res.status(401).send({Error: 'Password does not match'})
            }
            else {
                user.delete()
                .then(() => res.status(200).send({ Message: 'User has been removed'}))
            }
        });
    }

};