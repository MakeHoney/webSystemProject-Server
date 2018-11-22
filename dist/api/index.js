'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _library = require('./library');

var _library2 = _interopRequireDefault(_library);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/auth', _auth2.default);
router.use('/library', _library2.default);

exports.default = router;