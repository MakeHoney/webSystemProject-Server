'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controller = require('./controller');

var _authCheck = require('../middlewares/auth-check');

var _authCheck2 = _interopRequireDefault(_authCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_authCheck2.default);

router.post('/reserve', _controller.controller.reserveSeat);
router.post('/return', _controller.controller.returnSeat);
router.post('/extend', _controller.controller.extendSeat);

exports.default = router;