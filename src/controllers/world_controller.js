const World = require('../models/world');

module.exports = {

    list(req, res) {
        World.find({})
            .then(worlds => {
                res.status(200).send(worlds);
            });
    },

    create(req, res) {
        World.create({
            name: req.body.name,
            description: req.body.description,
            availableInRanked: req.body.availableInRanked
        })  
        .then(() =>
            res.status(200).send({Message: "World created succesfully."}),
            console.log('>>world created'))
        .catch((err) => {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({ Error: 'A World with this name already exists.'});
                } else {
                    res.status(401).send({err});
                }
        });
    },

    edit(req, res) {
        World.findOne( { name: req.body.name } )
        .then(world => {
            if(world === null){
                res.status(401).send({ Error :'World does not exist.'})
            }
            else {
                let newName = req.body.name;
                let newDesc = req.body.description;
                let newRanked = req.body.availableInRanked;
                if (req.body.name === '' || req.body.name === null) newName = operator.name
                if (req.body.description === '' || req.body.description === null) newDesc = operator.description
                if (req.body.availableInRanked === '' || req.body.availableInRanked === null) newRanked = operator.side
                
                world.set({
                    name: newName,
                    description: newDesc,
                    availableInRanked: newRanked
                })
                world.save()
                .then(() => {
                    res.status(200).send({Message: "World edited succesfully"})
                    console.log('>>>world edited')
                })
                .catch((err) => res.status(401).send({err}));
            }
        });
    },

    delete(req, res){
        World.findOne({name: req.headers.name})
        .then(world =>{
            if(world === null){
                res.status(422).send({ Error :'World does not exist.'})
            } else {
                world.delete()
                .then(() => res.status(200).send({ Message :'World succesfully removed.'}));
            }
        })
    }    

};