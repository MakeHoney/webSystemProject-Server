"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnection = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbConnection = exports.dbConnection = function dbConnection() {
  // TODO: need to export db connection properly
  _mongoose2.default.connect(_config.config.testMongoURI);
  var db = _mongoose2.default.connection;
  db.on('error', console.error);
  db.once('open', function () {
    console.log('connected to mongodb server');
  });
  return db;
};