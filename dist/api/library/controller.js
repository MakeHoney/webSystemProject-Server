'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = undefined;

var _models = require('../../models');

var controller = exports.controller = {
  reserveSeat: async function reserveSeat(req, res) {
    var _req$body = req.body,
        studentID = _req$body.studentID,
        seatNum = _req$body.seatNum;

    try {
      await _models.Seat.reserve({ studentID: studentID, seatNum: seatNum });
      res.json({
        message: 'successfully reserved'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  returnSeat: async function returnSeat(req, res) {
    var studentID = req.body.studentID;

    try {
      await _models.Seat.return({ studentID: studentID });
      res.json({
        message: 'successfully returned!'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  },
  extendSeat: async function extendSeat(req, res) {
    var studentID = req.body.studentID;

    try {
      await _models.Seat.extend({ studentID: studentID });
      res.json({
        message: 'successfully extended!'
      });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
};