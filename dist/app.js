'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('../config');

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 8888);
app.set('jwt-secret', config.secret);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true }));

app.use('/', require('../api'));

app.listen(app.get('port'), function () {
    console.log('Server Running on port ' + app.get('port'));
});

mongoose.connect(config.mongoURI);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('connected to mongodb server');
});
