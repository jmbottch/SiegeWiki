const World = require('../models/world');

module.exports = {

    list(req, res) {
        World.find({})
            .then(worlds => {
                res.status(200).send(worlds);
            });
    },

    single(req, res) {
        World.findById(req.params.id)
        .then(world => {
            if(world === null) {
                res.status(401).send({Error: 'Map bestaat niet.'})
            } else {
                res.status(200).send(world);
                console.log('>>>>>>Map returned<<<<<')
            }
        })
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
        World.findOne({_id: req.params._id})
        .then(world => {
            if (world === null) {
                res.status(422).send({ Error :'World does not exist.'})
            } 

            else{
                console.log("it worked yall")
            }
        })
    },

    delete(req, res){
        World.findById(req.body.id)
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