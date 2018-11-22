'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailer = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailer = exports.mailer = {
  transporter: _nodemailer2.default.createTransport({
    service: 'Gmail',
    auth: {
      user: _config.config.gmailUser,
      pass: _config.config.gmailPass
    }
  }),
  options: {
    from: _config.config.gmailUser,
    to: '',
    subject: '클리카주 인증 메일입니다.',
    text: '아래 링크를 통해 본인 인증을 해주세요!\n'
  }
};