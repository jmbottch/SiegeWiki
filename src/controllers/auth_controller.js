const User = require('../models/user');

module.exports = {
    
    login(req, res) {

        const {name, password} = req.body
        User.findOne({name, password})
        if(!res) {
            res.json({
                succes: false,
                })
                res.status(401).send({Error: 'Invalid Details.'})
        }else {
            console.log("Logging you in")
        }
        
    },

    
}