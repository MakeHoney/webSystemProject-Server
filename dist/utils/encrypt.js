'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encrypt = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encrypt = exports.encrypt = function encrypt(password) {
  return _crypto2.default.createHmac('sha1', _config.config.secret).update(password).digest('base64');
};