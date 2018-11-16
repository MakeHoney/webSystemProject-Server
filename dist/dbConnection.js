"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    connect: function connect() {
        _mongoose2.default.connect(_config.config.mongoURI);
        var db = _mongoose2.default.connection;
        db.on('error', console.error);
        db.once('open', function () {
            console.log('connected to mongodb server');
        });
    }
};