import { Seat, User } from '../models'
import { helper } from './helper'
import assert from 'assert'

describe('LIBRARY TEST', () => {
  let mocha_test = null
  let test_user = null
  let test_user2 = null

  before(async () => {
    mocha_test = await helper.dbConnection()
  })

  beforeEach(async () => {
    // mounting database
    await helper.mountDB(mocha_test)

    // mock users
    await helper.mockingUsers()

    test_user = await User.findOne({ email: 'pourmonreve@ajou.ac.kr' })
    test_user2 = await User.findOne({ email: 'makehoney3@ajou.ac.kr' })
  })

  afterEach(async () => {
    await test_user.remove()
    await test_user2.remove()
  })

  after(async () => {
    await mocha_test.close()
  })


  // Describe tests
  describe('RESERVATION TEST', () => {
    // TEST 1
    it('Test1: 일반적인 빈 자리를 신청하는 경우', async () => {
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
    it('Test2: 이미 신청된 자리를 신청하는 경우', async () => {
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
    it('Test3: 이미 자리가 있는 유저가 반납 없이 다른 자리를 신청하는 경우', async () => {
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

  describe('RETURNING TEST', () => {
    it('test', async () => {

    })
  })
})
