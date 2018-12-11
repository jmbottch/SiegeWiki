const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {

    create(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
            name: req.body.name,
            password: hashedPassword
        })  
        .then(() =>
            res.status(200).send({Message: "User has been created."}),
            console.log('user has been saved'))
        .catch((err) => {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({ Error: 'Username is already taken.'});
                } else {
                    res.status(401).send({err});
                }
        });
    },

    edit(req, res) {
       User.findOne( { name: req.body.name })
       .then(user => {
           if(user === null){
               res.status(401).send({Error: 'User does not exist.'})
           }
           if(user.password !== req.body.password){
               req.status(401).send({Error: 'Password does not match.'})
           }
           else {
               user.set('password', req.body.newPassword)
               user.save()
               .then(user => res.status(200).send({Message: 'Password has been changed.'}))
               .catch((err) => res.status(401).send({err}));
           }
       });
    },

    delete(req, res) {
        User.findOne({name: req.headers.name })
        .then(user => {
            if(user === null){
                res.status(401).send({Error: 'User does not exist.'})
            }
            if(user.password !== req.headers.password) {
                res.status(401).send({Error: 'Password does not match.'})
            }
            else {
                user.delete()
                .then(() => res.status(200).send({ Message: 'User has been deleted.'}))
            }
        });
    }

};