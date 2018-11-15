"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    connect: function connect() {
        _mongoose2.default.connect(_config2.default.mongoURI);
        var db = _mongoose2.default.connection;
        db.on('error', console.error);
        db.once('open', function () {
            console.log('connected to mongodb server');
        });
    }
};