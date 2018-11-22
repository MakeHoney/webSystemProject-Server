'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (req, res, next) {
  var token = req.headers['x-access-token'] || req.body.token || req.query.token;

  if (!token) {
    return res.status(500).json({
      success: false,
      message: 'user not signed in'
    });
  }

  try {
    req.decoded = await _jsonwebtoken2.default.verify(token, req.app.get('jwt-secret'));
    next();
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};