'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _modules = require('./modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Seat = new Schema({
  seatNum: Number,
  floor: Number,
  occupiedTime: {
    type: Date,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

// statics -> for class
Seat.statics.reserve = _modules.modules.statics.reserveSeat;
Seat.statics.return = _modules.modules.statics.returnSeat;
Seat.statics.extend = _modules.modules.statics.extendSeat;
Seat.statics.renew = _modules.modules.statics.renewSeat;

// methods -> for specific instance
Seat.methods.isTaken = _modules.modules.methods.checkSeatIsTaken;

exports.default = _mongoose2.default.model('Seat', Seat);