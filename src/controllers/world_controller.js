const World = require('../models/world');

module.exports = {

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
                    res.status(401).send({Error:'Worldname already exists'})
                }
            })
    },

    edit(req, res) {
        const worldProps = req.body;
        World.findOne({ name: req.body.name })
        .then(world => {
            if (world === null) {
                res.status(422).send({ Error :'World does not exist.'})
            } 

            else{
                world.set('password', newPassword)
                world.save()
                .then(() => res.status(200).send({Message: "World changed succesfully"}))
            }
        })
    },

    delete(req, res){
        World.findById(req.body.id)
        .then(world =>{
            //console.log(world);
            if(world === null){
                res.status(422).send({ Error :'World does not exist.'})
            } else {
                world.delete()
                .then(() => res.status(200).send({ Message :'World succesfully removed.'}));
            }
        })
    },

    getAllWorlds(res){
        World.find({}, (error, worlds) => {
            console.log(worlds);
            console.log(error);
            if (worlds === null) res.status(422).send({ Error :'No worlds exist.'});
            else {
                res.status(200).send({worlds});
         }
        })
    },

    getWorldById(req, res){
        World.findById(req.params.id)

        .then(world => {
            if(world === null){
                res.status(422).send({ Error :'World does not exist.'})
            } else {
                res.status(422).send({world});
            }
        });
    }

};