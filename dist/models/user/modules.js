'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modules = undefined;

var _utils = require('../../utils');

var modules = exports.modules = {
  statics: {
    createUser: async function createUser(email, studentID, password, name) {
      try {
        var user = new this({
          email: email,
          studentID: studentID,
          password: _utils.utils.encrypt(password),
          name: name
        });
        return await user.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    registerUser: async function registerUser(_ref) {
      var studentID = _ref.studentID,
          email = _ref.email,
          password = _ref.password,
          name = _ref.name;

      try {
        await this.checkDup({ studentID: studentID, email: email });
        await this.create(email, studentID, password, name).catch(function (err) {
          throw err;
        });
      } catch (err) {
        throw err;
      }
    },
    checkUserAuth: async function checkUserAuth(_ref2) {
      var email = _ref2.email,
          password = _ref2.password,
          secret = _ref2.secret;

      var user = await this.findOne({ email: email });
      if (!user) {
        throw new Error("user doesn't exist!");
      } else {
        if (user.verify(password)) {
          return await _utils.utils.createToken({ user: user, secret: secret });
        } else {
          throw new Error('wrong password');
        }
      }
    },
    checkDup: async function checkDup(_ref3) {
      var studentID = _ref3.studentID,
          email = _ref3.email;

      var stuIDCheck = await this.findOne({ studentID: studentID });
      var emailCheck = await this.findOne({ email: email });

      if (stuIDCheck) {
        throw new Error('same student ID already exist!');
      } else if (emailCheck) {
        throw new Error('The email already registered!');
      } else {
        return true;
      }
    }
  },
  methods: {
    verifyUser: function verifyUser(password) {
      return this.password === _utils.utils.encrypt(password);
    },
    checkUserHasSeat: function checkUserHasSeat(opt) {
      switch (opt) {
        case 'reserve':
          if (this.seat) throw new Error('user already has a seat! (seat id: ' + this.seat + ')');
          break;
        case 'returnOrExtend':
          if (!this.seat) throw new Error('user got no seat to return or extend!');
          break;
        default:
          throw new Error('specify option!');
      }
    }
  }
};