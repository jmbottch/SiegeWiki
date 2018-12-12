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



    populate(req, res, mapAdd, operatorAdd) {
        let operatorName = req.body.name;
        let worldName = req.body.name;
        let foundOperator = new Operator();
        let foundMap = new Map();


        Operator.findOne({ name: operatorName })
            .then(opResult => {
                foundOperator = opResult;
            })
            .catch((err) => res.status(401).send({ err }));

        World.findOne({ name: worldName })
            .then(mapResult => {
                foundMap = mapResult;
            })
            .then(() => {
                Season.create({
                    name: req.body.name,
                    description: req.body.description,
                    year: req.body.year,
                    season: req.body.season,
                    operator: operatorAdd,
                    world: mapAdd
                }).then(() => { res.status(200).send({ Message: "Populated season succesfully" }) })
            })


            .catch((err) => res.status(401).send({ err }));
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
