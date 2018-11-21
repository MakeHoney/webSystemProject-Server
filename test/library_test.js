import { Seat, User } from '../models'
import { helper } from './helper'
import { renewSeat } from '../schedular'
import assert from 'assert'

describe('LIBRARY', function() {
  let mocha_test = null
  let test_user = null
  let test_user2 = null

  before(async function () {
    mocha_test = await helper.dbConnection()
    await User.findOneAndDelete({ studentID: '201523483' })
    await User.findOneAndDelete({ studentID: '201533333' })
  })

  beforeEach(async function () {
    // mounting seats
    await helper.seatMigration(mocha_test)

    // mock users
    await helper.mockingUsers()

    test_user = await User.findOne({ email: 'pourmonreve@ajou.ac.kr' })
    test_user2 = await User.findOne({ email: 'makehoney3@ajou.ac.kr' })
  })

  afterEach(async function () {
    await test_user.remove()
    await test_user2.remove()
  })

  after(async function () {
    await mocha_test.close()
  })

  // Describe tests
  describe('RESERVATION TEST', function () {
    // TEST 1
    it('Test1: 일반적인 빈 좌석을 신청하는 경우', async function () {
      // Reserve a seat
      await Seat.reserve({ studentID: test_user.studentID, seatNum: 19 })
      // Load Document
      let seat = await Seat.findOne({ seatNum: 19 })
      let user = await User.findOne({ studentID: test_user.studentID })
        .populate('seat')
      // Comparison
      assert(user.seat._id.toString() === seat._id.toString())
    })

    // TEST 2
    it('Test2: 이미 신청된 좌석을 신청하는 경우', async function () {
      let error = null
      // Reserve a seat
      await Seat.reserve({ studentID: test_user.studentID, seatNum: 19 })

      // When another user tries reservation on same seat -> must occurs exception
      try {
        await Seat.reserve({ studentID: test_user2.studentID, seatNum: 19 })
      } catch (err) {
        // error msg: seat is already taken!
        error = err
      }
      assert(error)

      // User2 must have no seat.
      let user2 = await User.findOne({ studentID: test_user2.studentID })
      assert(!user2.seat)
    })

    // TEST 3
    it('Test3: 이미 좌석이 있는 유저가 반납 없이 다른 좌석을 신청하는 경우', async function () {
      let error = null
      await Seat.reserve({ studentID: test_user.studentID, seatNum: 22 })

      try {
        await Seat.reserve({ studentID: test_user.studentID, seatNum: 30 })
      } catch (err) {
        // error msg: user already has a seat!
        error = err
      }
      assert(error)

      const seat1 = await Seat.findOne({ seatNum: 22 })
        .populate('user')
      const seat2 = await Seat.findOne({ seatNum: 30 })
        .populate('user')
      const user = await User.findOne({ studentID: test_user.studentID })

      // Seat2 must don't have a user
      assert(!seat2.studentID)

      // Seat1's User and Test user must be same person
      assert(seat1.user._id.toString() === user._id.toString())
    })
  })

  describe('RETURNING TEST', function () {
    it('Test1: 일반적인 좌석을 반납하는 경우', async function () {
      await Seat.reserve({ studentID: test_user.studentID, seatNum: 22 })

      let user = await User.findOne({ studentID: test_user.studentID })
        .populate('seat')
      let seat = await Seat.findOne({ seatNum: 22 })
      assert(user.seat._id.toString() === seat._id.toString())

      await Seat.return({ studentID: test_user.studentID })
      user = await User.findOne({ studentID: test_user.studentID })
      seat = await Seat.findOne({ seatNum: 22 })
      assert(!user.seat)
      assert(!seat.user)
    })

    it('Test2: 좌석이 없는 상태에서 반납하는 경우', async function () {
      let error
      try {
        await Seat.return({ studentID: test_user.studentID })
      } catch (err) {
        // error msg: user got no seat to return or extend!
        error = err
      }
      assert(error)
    })
  })

  describe('EXTENSION TEST', function () {
    const delay = time => new Promise(resolve => setTimeout(resolve, time))
    it('Test1: 일반적인 좌석 연장을 하는 경우', async function () {
      this.timeout('3000')

      await Seat.reserve({ studentID: test_user.studentID, seatNum: 55})
      let seat = await Seat.findOne({ seatNum: 55 })
        .populate('user')
      let user = await User.findById(seat.user._id)

      // Check whether reservation is done
      assert(user._id.toString() === seat.user._id.toString())

      await delay(2000)

      // Extending seat expiration
      // Without this line, seat gonna be expired
      await Seat.extend({ studentID: test_user.studentID })

      await renewSeat(1000)
      user = await User.findOne({ studentID: test_user.studentID })
      seat = await Seat.findOne({ seatNum: 55 })
      // Seat cannot be expired by renew module!
      assert(user.seat)
      assert(seat.user)
    })

    it('Test2: 좌석이 없는 상태에서 연장하는 경우', async function () {
      let error
      try {
        await Seat.extend({ studentID: test_user.studentID })
      } catch (err) {
        // error msg: user got no seat to return or extend!
        error = err
      }
      assert(error)
    })
  })

  describe('SCHEDULER TEST', function () {
    const delay = time => new Promise(resolve => setTimeout(resolve, time))

    it('Test1: 좌석 만료 시간 이후 자동 반납 테스트', async function () {
      this.timeout(10000)

      await Seat.reserve({ studentID: test_user.studentID, seatNum: 55})
      let seat = await Seat.findOne({ seatNum: 55 })
        .populate('user')
      let user = await User.findById(seat.user._id)

      // Check whether reservation is done
      assert(user._id.toString() === seat.user._id.toString())

      // -- BEFORE THE SEAT EXPIRED -- //
      await delay(2000)
      await renewSeat(5000)
      user = await User.findOne({ studentID: test_user.studentID })
      seat = await Seat.findOne({ seatNum: 55 })
      // Seat must not have been expired by renew module!
      assert(user.seat)
      assert(seat.user)

      // -- AFTER THE SEAT EXPIRED -- //
      await delay(3000)
      await renewSeat(5000)
      user = await User.findOne({ studentID: test_user.studentID })
      seat = await Seat.findOne({ seatNum: 55 })
      // Seat must have been expired by renew module!
      assert(!user.seat)
      assert(!seat.user)
    })
  })
})
