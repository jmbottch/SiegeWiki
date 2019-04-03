const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser= require('body-parser')
var mongodb = require('./config/mongodb_connector');
const config = require('./config/mongodb_config');
const routes = require('./routes/routes');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors({
  origin: ['localhost:4200','http://siegewikia.herokuapp.com']
}));

app.use(bodyParser.json());
routes (app);

app.listen(config.env.webPort, cors(),() => {
    console.log('App is ready for requests on ' + config.env.webPort)
  })

 


module.exports = app;