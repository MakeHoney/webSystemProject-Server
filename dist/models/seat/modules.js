'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modules = undefined;

var _user = require('../user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modules = exports.modules = {
  statics: {
    reserveSeat: async function reserveSeat(_ref) {
      var studentID = _ref.studentID,
          seatNum = _ref.seatNum;

      var user = await _user2.default.findOne({ studentID: studentID });
      var seat = await this.findOne({ seatNum: seatNum });

      // exception handler
      user.hasSeat('reserve');
      seat.isTaken('reserve');

      await user.update({ seat: seat._id });
      await seat.update({ occupiedTime: Date.now() });
      await seat.update({ user: user._id });
    },
    returnSeat: async function returnSeat(_ref2) {
      var studentID = _ref2.studentID;

      var user = await _user2.default.findOne({ studentID: studentID }).populate('seat');
      // exception handler for user
      user.hasSeat('returnOrExtend');

      var seat = await this.findById(user.seat._id);
      // exception handler for seat
      seat.isTaken('returnOrExtend');

      // seat's studentID, occupiedTime 초기화
      await seat.update({ user: null });
      await seat.update({ occupiedTime: null });

      // user's seat 초기화
      await user.update({ seat: null });
    },
    extendSeat: async function extendSeat(_ref3) {
      var studentID = _ref3.studentID;

      /*
      * TODO: need exception handling for extension within 2hours
      * */
      var user = await _user2.default.findOne({ studentID: studentID }).populate('seat');
      // exception handler for user
      user.hasSeat('returnOrExtend');

      var seat = await this.findById(user.seat._id);
      // exception handler for seat
      seat.isTaken('returnOrExtend');

      // update time
      await seat.update({ occupiedTime: Date.now() });
    }
  },
  methods: {
    checkSeatIsTaken: function checkSeatIsTaken(opt) {
      switch (opt) {
        case 'reserve':
          if (this.user) throw new Error('seat is already taken!');
          break;
        case 'returnOrExtend':
          if (!this.user) throw new Error('seat is not occupied!');
          break;
        default:
          throw new Error('specify option!');
      }
    }
  }
};