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
            season: req.body.season,
            availableInRanked: req.body.availableInRanked
        })
        .then(() => 
            res.status(200).send({Message: "World created succesfully."}))
            .catch((err) => {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({Error:'This name already exists.'})
                }
            })
    },

    edit(req, res) {
        World.findOne({ name: req.body.name })
        .then(world => {
            if (world === null) {
                res.status(422).send({ Error :'World does not exist.'})
            } 

            else{
               world.set({
                   'name': req.body.newName,
                   'description': req.body.description,
                   'season': req.body.season,
                   'availableInRanked': req.body.availableInRanked
               })
            }
        })
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