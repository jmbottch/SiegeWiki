const Season = require('../models/season');

module.exports = {

    list(req, res) {
        Season.find({})
            .then(seasons => {
                res.status(200).send(seasons);
            });
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
        Season.findOne({name: req.body.name})
        .then(season => {
            if(season === null) {
                res.status(401).send({Error: 'Season does not exist.'})
            } else 
            {

                season.set({
                     'name': req.body.newName,
                     'description': req.body.description,
                     'year': req.body.year,
                     'season' : req.body.season
                })    
                season.save()
                .then(() => res.status(200).send({Message: "Season has been edited."}))
                .catch((err) => res.status(401).send({err}));    
            }
        });

    },

     recreate(res, season, operatorAdd, mapAdd) {
        console.log(season._id + season)
        Season.findOne({ name: season.name })
        .then((foundSeason) => {
            foundSeason.delete()
            .then(() => {
                Season.create({
                    _id: season._id,
                    _v: season._v,
                    name: season.name,
                    description: season.description,
                    year: season.year,
                    season: season.sesaon,
                    operator: operatorAdd,
                    map: mapAdd
                }).then(() => { res.status(200).send({Message: "Populated season succesfully"}) })
            })
        })
    },
    
     populate(req, res) {
        Season.findOne( { name: req.body.name } )
        .then(season => {
            if(season === null){
                res.status(401).send({ Error :'Season does not exist.'})
            }
            else { 
                let operatorName = req.body.operatorName;
                let worldName = req.body.worldName;
                let foundOperator = new Operator();
                let foundMap = new Map();
                
    
                Operator.findOne({ name: operatorName })
                    .then(opResult => {
                        foundOperator = opResult;
                    })
                    .catch((err) => res.status(401).send({err}));
    
                    World.findOne({ name: worldName })
                    .then(mapResult => {
                        foundMap = mapResult;
                    })
                    .catch((err) => res.status(401).send({err}));
                    recreate(res, season, foundOperator, foundMap)
            }
        });
    },

    delete(req, res) {
        Season.findOne({name: req.headers.name})
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
