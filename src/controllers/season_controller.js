const Season = require('../models/season');

module.exports = {

    create(req, res) {
        Season.create({
            name: req.body.name,
            description: req.body.description,
            year: req.body.year
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
        const seasonProps = req.body;
        Season.findOne({name: req.body.name})
        .then(season => {
            if(season === null) {
                res.status(401).send({Error: 'Season does not exist.'})
            } else 
            {
                season.set({
                     'name': req.body.name,
                     'description': req.body.description,
                     'year': req.body.year
                })    
                season.save()
                .then(() => res.status(200).send({Message: "Season has been edited."}))
                .catch((err) => res.status(401).send({err}));    
            }
        });

    },

    delete(req, res) {
        Season.findOne({name: req.body.name})
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
