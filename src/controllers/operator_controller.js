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
    single(req, res) {
        Operator.findById(req.params.id)
        .then(operator => {
            if(operator === null) {
                res.status(401).send({Error:'Operator does not exist'})
            } else {
                res.status(200).send(operator);
            }
        })
    },

    create(req,res) {
        Operator.create({
            name: req.body.name,
            description: req.body.description,
            side: req.body.side
        })
        .then(() =>
        res.status(200).send({Message: "Operator has been created."}))
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

        Operator.findOne({_id: req.params.id})
        .then(operator => {
            if (operator === null) {  
                res.status(401).send({Error: 'Operator does not exist.'})
            }
            else {
                let nameToSet = req.body.name;
                let descriptionToSet = req.body.description;
                let sideToSet = req.body.side;

                if(req.body.name === '' || req.body.name === null)nameToSet = operator.name;
                if(req.body.description === ''|| req.body.description === null)descriptionToSet = operator.description;
                if(req.body.side === '' || req.body.side === null)sideToSet = operator.side;
                
                operator.set({
                    name: nameToSet,
                    description: descriptionToSet,
                    side: sideToSet
                })
                operator.save()
                 .then(() => res.status(200).send({Message: "Operator has been edited."}))
                 .catch((err) => res.status(401).send({err}));
            }
            

        })
        

    },

    delete(req, res) {
        Operator.findById(req.params.id)
        .then(operator =>{
            if(operator === null){
                res.status(422).send({ Error :'Operator does not exist.'})
            } else {
                operator.delete()
                .then(() => res.status(200).send({ Message :'Operator has been deleted.'}));
            }
        })
    }
}
