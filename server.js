const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
var mongodb = require('./config/mongodb_connector');
const config = require('./config/mongodb_config');
// const routes = require('./routes/routes');

app.use(bodyParser.json());
// routes (app);

app.listen(config.env.webPort, () => {
    console.log('App is ready for requests on ' + config.env.webPort)
  })

  app.get('*', function(req, res) {
    res.contentType('application/json');
    res.status(200).send({ message: "Welcome to siegewiki." });
});


module.exports = app;