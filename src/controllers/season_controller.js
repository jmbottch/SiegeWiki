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
                console.log('>>>>>>Season returned<<<<<')
            }
        })
    },

    create(req, res) {
        Season.create({
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
            season: req.body.season
        })
        .then(() => 
            res.status(200).send({Message : "Season has been created."}),
            console.log('<------SEASON HAS BEEN CREATED------>'))
            .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000)    
            {
                    res.status(401).send({ Error: 'This name has already been already taken.'});
            } else 
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
                console.log("werkt niet")
            } else 
            {
                console.log("Gefeliciteerd, je bent nu ietsje verder")
                let nameToSet = req.body.name;
                let descriptionToSet = req.body.description;
                let yearToSet = req.body.year;
                let seasonToSet = req.body.season;

                if(req.body.name === '' || req.body.name === null)nameToSet = season.name;
                if(req.body.description === ''|| req.body.description === null)descriptionToSet = season.description;
                if(req.body.year === '' || req.body.year === null)yearToSet = season.year;
                if(req.body.season === '' || req.body.season === null)seasonToSet = season.season;

                season.set({
                     name: nameToSet,
                     description: descriptionToSet,
                     year: yearToSet,
                     season: seasonToSet
                     
                     
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
