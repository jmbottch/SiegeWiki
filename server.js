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
    console.log('App is ready for requests on localhost:3000 or heroku')
  })

module.exports = app;