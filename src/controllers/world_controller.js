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
        console.log(req.params.id)
        World.findOne({_id: req.params.id})
        .then(world => {
            if (world === null) {
                res.status(422).send({ Error :'World does not exist.'})
                console.log("Werkt niet")
            } 

            else{
                console.log("Gefeliciteerd, je bent nu iets verder op weg.")
                let nameToSet = req.body.name;
                let descriptionToSet = req.body.description;
                let availableInRankedToSet = req.body.availableInRanked;

                if(req.body.name === '' || req.body.name === null) nameToSet = world.name;
                if(req.body.description === '' || req.body.description === null) descriptionToSet = world.description;
                if(req.body.availableInRanked === '' || req.body.availableInRanked === null) availableInRankedToSet = world.availableInRanked;

                world.set({
                    name: nameToSet,
                    description: descriptionToSet,
                    availableInRanked: availableInRankedToSet
                })
                world.save()
                .then(() => {
                    res.status(200).send({Message: "Map succesfully edited."})
                    console.log("World edited.")
                    console.log("Het is je gelukt man, fantastisch.")
                })

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