'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var db = require('./config/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(204);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

// API location
require('./routes')(app);


// Set Port
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port, () => console.log('Running on localhost:'+port));