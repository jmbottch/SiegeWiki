const Season = require('../models/season');
const World = require('../models/world');
const Operator = require('../models/operator');


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
                res.status(200).send({ Message: "Season has been created." }),
                console.log('<------SEASON HAS BEEN CREATED------>'))
            .catch((err) => {
                if (err.name == 'MongoError' && err.code == 11000) {
                    res.status(401).send({ Error: 'This name has already been already taken.' });
                } else {
                    res.status(401).send({ err });
                }
            });
    },

    edit(req, res) {
        Season.findOne({ name: req.body.name })
            .then(season => {
                if (season === null) {
                    res.status(401).send({ Error: 'Season does not exist.' })
                } else {

                    season.set({
                        'name': req.body.newName,
                        'description': req.body.description,
                        'year': req.body.year,
                        'season': req.body.season
                    })
                    season.save()
                        .then(() => res.status(200).send({ Message: "Season has been edited." }))
                        .catch((err) => res.status(401).send({ err }));
                }
            });

    },
    
   populate(req, res) {
    console.log(req.body + " hoi")
    Season.findByIdAndUpdate(req.body.name,
         {
            operator: req.body.operatorName,
            world: req.body.siegeMapName
        })
        .then((result) => { 
            console.log(result);
            res.status(200).send({Message: "Populated season succesfully"}) })
        .catch((err) => res.status(401).send({err}));
},

 getAllPopulated(req, res) {
    Season.find({}, {__v: 0})
    .populate('operator')
    .populate('world')
    .then(seasons => {
        //console.log(seasons[0].operator.name)
        res.status(200).send(seasons);
        console.log('>>seasons returned');
    });
},

        delete (req, res) {
            Season.findOne({ name: req.headers.name })
                .then(season => {
                    if (season === null) {
                        res.status(401).send({ Error: 'Season does not exist.' })
                    }
                    else {
                        season.delete()
                            .then(() => res.status(200).send({ Message: "Season has been deleted." }));
                    }
                });
        }

    }
