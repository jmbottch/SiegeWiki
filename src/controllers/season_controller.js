const Season = require('../models/season');

module.exports = {

    list(req, res) {
        Season.find({})
            .then(seasons => {
                res.status(200).send(seasons);
            });
    },
    single(req, res) {
        Season.findById(req.params.id)
        .then(season => {
            if(season === null) {
                res.status(401).send({Error: 'Season bestaat niet.'})
            } else {
                res.status(200).send(season);
            }
        })
    },

    create(req, res) {
        Season.create({
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
            season: req.body.season,
            operators: req.body.operators,
            worlds: req.body.worlds
        })
        .then(() => 
            res.status(200).send({Message : "Season has been created."}))
            .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000)    
            {
                    res.status(401).send({ Error: 'This name has already been already taken.'});
            }
                else 
            {
                    res.status(401).send({err});
            }
        });
    },

    edit(req, res) {
        Season.findOne({_id: req.params.id})
        .then(season => {
            if(season === null) {
                res.status(401).send({Error: 'Season does not exist.'})
               
            } else 
            {
              
                let nameToSet = req.body.name;
                let descriptionToSet = req.body.description;
                let yearToSet = req.body.year;
                let seasonToSet = req.body.season;
                let worldsToSet = req.body.worlds;
                let operatorsToSet = req.body.operators;

                if(req.body.name === '' || req.body.name === null)nameToSet = season.name;
                if(req.body.description === ''|| req.body.description === null)descriptionToSet = season.description;
                if(req.body.year === '' || req.body.year === null)yearToSet = season.year;
                if(req.body.season === '' || req.body.season === null)seasonToSet = season.season;
                if(req.body.worlds === '' || req.body.worlds === null)worldsToSet = season.worlds;
                if(req.body.operators === '' || req.body.operators === null)operatorsToSet = season.operators;

                season.set({
                     name: nameToSet,
                     description: descriptionToSet,
                     year: yearToSet,
                     season: seasonToSet,
                     worlds: worldsToSet,
                     operators: operatorsToSet
                     
                     
                })    
                season.save()
                .then(() => res.status(200).send({Message: "Season has been edited."}))
                .catch((err) => res.status(401).send({err}));    
            }
        });

    },

    delete(req, res) {
        Season.findOne({_id: req.params.id})
        .then(season => {
            if(season === null) {
                res.status(401).send({Error: 'Season does not exist.'})
            }
            else
            {
                season.delete()
                .then(() => res.status(200).send({Message: "Season has been deleted."}));
            }
        });
    }
        
}
