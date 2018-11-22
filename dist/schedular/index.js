'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renewSeat = undefined;

var _models = require('../models');

var _utils = require('../utils');

// scheduler function
var renewSeat = exports.renewSeat = async function renewSeat(renewInterval) {
  // const database = utils.dbConnection()
  try {
    // 120 -> 고정된 상수로 변경할 것
    for (var i = 0; i < 120; i++) {
      var seat = await _models.Seat.findOne({ seatNum: i }).populate('user');
      var occupiedTime = void 0;
      !seat.occupiedTime ? occupiedTime = 0 : occupiedTime = seat.occupiedTime.getTime();

      var now = new Date().getTime();
      var difference = now - occupiedTime;
      // console.log(`difference: ${difference}`)

      // 2 hours: 60000 * 60 * 2
      if (difference > renewInterval && seat.user) {
        try {
          await _models.Seat.return({ studentID: seat.user.studentID });
        } catch (err) {
          console.error(err);
        }
      }
    }
    // database.close()
  } catch (err) {}
};