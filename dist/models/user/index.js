'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _modules = require('./modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var User = new Schema({
  email: String,
  studentID: String,
  password: String,
  name: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  seat: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
    default: null
  }
});

// statics -> for class
User.statics.create = _modules.modules.statics.createUser;
User.statics.register = _modules.modules.statics.registerUser;
User.statics.checkAuth = _modules.modules.statics.checkUserAuth;
User.statics.checkDup = _modules.modules.statics.checkDup;

// methods -> for specific instance
User.methods.verify = _modules.modules.methods.verifyUser;
User.methods.hasSeat = _modules.modules.methods.checkUserHasSeat;

exports.default = _mongoose2.default.model('User', User);