'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes');
var user = require('./server/user');
var port = process.env.PORT || 3000;
var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  type: 'application/*'
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/agentcloud', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(port, () => {
    console.log('listening on 3000')
  })
});

app.post('/api/user', user.createAccount)
app.put('/api/user/:userId', user.updateAccount)
app.get('/api/user', user.getAllAccounts)
app.get('/api/user/:userId', user.getAccount)
app.delete('/api/user/:userId', user.deleteAccount)