'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = undefined;

var _models = require('../../models');

var _mailer = require('../../utils/mailer');

var _config = require('../../config');

var _createToken = require('../../utils/create-token');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = exports.controller = {
  sendAuthMail: async function sendAuthMail(req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        studentID = _req$body.studentID,
        password = _req$body.password,
        name = _req$body.name;

    try {
      await _models.User.checkDup({ studentID: studentID, email: email });

      var mailOptions = Object.assign({}, _mailer.mailer.options);
      var transporter = _mailer.mailer.transporter;
      var token = await (0, _createToken.createEmailToken)({
        email: email,
        studentID: studentID,
        password: password,
        name: name,
        secret: req.app.get('jwt-secret')
      });

      mailOptions.to = email;
      mailOptions.text += _config.config.host + '/auth/register?token=' + token;

      var info = await transporter.sendMail(mailOptions);
      res.json({
        message: info.response
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  register: async function register(req, res) {
    var token = req.query.token;
    try {
      var decoded = await _jsonwebtoken2.default.verify(token, req.app.get('jwt-secret'));

      await _models.User.register({
        studentID: decoded.studentID,
        email: decoded.email,
        password: decoded.password,
        name: decoded.name
      });

      res.json({
        message: 'successfully registered!'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  login: async function login(req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    var secret = req.app.get('jwt-secret');
    try {
      var token = await _models.User.checkAuth({ email: email, password: password, secret: secret });
      res.json({
        message: 'signed in successfully!',
        email: email,
        token: token
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
};