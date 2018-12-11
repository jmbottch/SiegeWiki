const Season = require('../models/season');
const Operator = require('../models/operator');
const World = require('../models/world');

module.exports = {

    list(req, res) {
        Operator.find({})
            .then(operators => {
                res.status(200).send(operators);
            });
    },

    create(req,res) {
        Operator.create({
            name: req.body.name,
            description: req.body.description,
            side: req.body.side
        })
        .then(() =>
        res.status(200).send({Message: "Operator has been created."}),
        console.log('<------SEASON HAS BEEN CREATED------>'))
        .catch((err) => 
        {
            if (err.name == 'MongoError' && err.code == 11000) 
            {
            res.status(401).send({ Error: 'An operator with this name already exists.'});
            } 
            else 
            {
            res.status(401).send({err});
            }
        }); 
    },

    edit(req, res) {

        Operator.findOne({_id: req.body._id})
        .then(operator => {
            if (operator === null) {  
                res.status(401).send({Error: 'Operator does not exist.'})
            }
            else {
                operator.set({
                    'name': req.body.newName,
                    'description': req.body.description,
                    'side': req.body.side
                })
                operator.save()
                 .then(() => res.status(200).send({Message: "Operator has been edited."}))
                 .catch((err) => res.status(401).send({err}));
            }
            

        })
        

    },

    delete(req, res) {
        Operator.findOne({name: req.headers.name})
        .then(operator =>{
            if(operator === null){
                res.status(422).send({ Error :'Operator does not exist.'})
            } else {
                operator.delete()
                .then(() => res.status(200).send({ Message :'World has been deleted.'}));
            }
        })
    }
}
