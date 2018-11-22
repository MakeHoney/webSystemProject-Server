'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmailToken = exports.createToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createToken = exports.createToken = async function createToken(_ref) {
  var user = _ref.user,
      secret = _ref.secret;

  return await _jsonwebtoken2.default.sign({
    _id: user._id,
    email: user.email
  }, secret, {
    expiresIn: '7d',
    subject: 'userInfo'
  });
};

var createEmailToken = exports.createEmailToken = async function createEmailToken(_ref2) {
  var email = _ref2.email,
      studentID = _ref2.studentID,
      password = _ref2.password,
      name = _ref2.name,
      secret = _ref2.secret;

  return await _jsonwebtoken2.default.sign({
    email: email,
    studentID: studentID,
    password: password,
    name: name
  }, secret, {
    expiresIn: '1h',
    subject: 'emailAuth'
  });
};