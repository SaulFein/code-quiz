'use strict';

let express = require('express');
let app = express();
let publicRouter = express.Router();
let apiRouter = express.Router();
let models = require(__dirname + '/models');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let config = require(__dirname + '/config/env.js');

app.use(express.static(__dirname + '/build'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

require(__dirname + '/routes/auth-routes')(publicRouter, models);
require(__dirname + '/routes/users-routes')(apiRouter, models);
require(__dirname + '/routes/questions-routes')(apiRouter, models);
require(__dirname + '/routes/scores-routes')(apiRouter, models);

app.use(bodyParser.json());
app.use('/', publicRouter);
app.use('/api', apiRouter);
app.use(morgan('dev'));

app.listen(config.PORT, () => {
  console.log('server started on port ' + config.PORT);
});
