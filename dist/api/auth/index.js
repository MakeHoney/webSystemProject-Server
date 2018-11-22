'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/register', _controller.controller.register);
router.post('/send-auth-mail', _controller.controller.sendAuthMail);
router.post('/login', _controller.controller.login);
// router.get('/check', controller.check)

exports.default = router;