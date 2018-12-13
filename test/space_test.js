import { helper } from "./helper"
import { User, Space } from '../src/models'
import assert from 'assert'
import Seat from "../src/models/seat"

describe('SPACE', function() {
  let mocha_test = null
  let test_user = null
  let test_user2 = null

  before(async function () {
    mocha_test = await helper.dbConnection()

    // In case of test being terminated abnormally
    await User.findOneAndDelete({studentID: '201523483'})
    await User.findOneAndDelete({studentID: '201533333'})
  })

  beforeEach(async function () {
    // mounting seats
    await helper.seatMigration(mocha_test)

    // mock test users
    await helper.mockingUsers()

    test_user = await User.findOne({email: 'pourmonreve@ajou.ac.kr'})
    test_user2 = await User.findOne({email: 'makehoney3@ajou.ac.kr'})
  })

  afterEach(async function () {
    await test_user.remove()
    await test_user2.remove()
  })

  after(async function () {
    await mocha_test.close()
  })

  describe('RESERVATION TEST', function () {
    it('Test1: 일반적인 빈 공간을 신청하는 경우', async function () {
      // Reserve a seat
      await Space.reserve({
        studentID: test_user.studentID,
        placeName: '종합관',
        spaceID: '101',
        rDate: new Date(Date.UTC(2018, 11, 10, 16))
      })
      // Load Document
      let space = await Seat.findOne({ placeName: '종합관', spaceID: '101' })
      let user = await User.findOne({ studentID: test_user.studentID })
        .populate('space')
      // Comparison
      assert(user.space._id.toString() === space._id.toString())
    })


    it('Test2: 이미 신청된 공간을 신청하는 경우', async function () {
      // let error = null
      // // Reserve a seat
      // await Seat.reserve({ studentID: test_user.studentID, seatNum: 19 })
      //
      // // When another user tries reservation on same seat -> must occurs exception
      // try {
      //   await Seat.reserve({ studentID: test_user2.studentID, seatNum: 19 })
      // } catch (err) {
      //   // error msg: seat is already taken!
      //   error = err
      // }
      // assert(error)
      //
      // // User2 must not have got a seat.
      // let user2 = await User.findOne({ studentID: test_user2.studentID })
      // assert(!user2.seat)
    })

    it('Test3: 이미 좌석이 있는 유저가 반납 없이 다른 좌석을 신청하는 경우', async function () {
      // let error = null
      // await Seat.reserve({ studentID: test_user.studentID, seatNum: 22 })
      //
      // try {
      //   await Seat.reserve({ studentID: test_user.studentID, seatNum: 30 })
      // } catch (err) {
      //   // error msg: user already has a seat!
      //   error = err
      // }
      // assert(error)
      //
      // const seat1 = await Seat.findOne({ seatNum: 22 })
      //   .populate('user')
      // const seat2 = await Seat.findOne({ seatNum: 30 })
      //   .populate('user')
      // const user = await User.findOne({ studentID: test_user.studentID })
      //
      // // Seat2 must not have got a user
      // assert(!seat2.studentID)
      //
      // // Seat1's User and Test user must be same person
      // assert(seat1.user._id.toString() === user._id.toString())
    })
  })

})
