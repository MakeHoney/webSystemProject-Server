import mongoose from "mongoose"
import { Seat, User } from '../models'
import { dbConnection } from './connection'
import assert from 'assert'

/**
 * TODO: make basic test for reserve, extend and return
 * */

// Describe tests
describe('RESERVATION TEST', () => {
  let test_user = null
  let test_user2 = null
  let mocha_test

  before(async () => {
    mocha_test = await dbConnection()
  })

  // Drop the seats collection before each test
  beforeEach(async () => {
    // TODO: make function for mounting collection before each test

    // Call list of collections
    let collections = await mocha_test.db.listCollections().toArray()

    // Check the collection (seat) already exist
    for (let collection of collections) {

      // If collection exists, drop original collection
      if (collection.name === 'seats') {
        await mongoose.connection.collections.seats.drop()
        break
      }
    }

    // TODO: mount 메소드 test 디렉토리로 옮길 것 (독립적인 메소드로 동작하도록)
    // mount seats data
    await Seat.mount(30, 30, 30, 30)

    // register test user
    await User.register({
      studentID: '201523483',
      email: 'pourmonreve@ajou.ac.kr',
      password: 'pass',
      name: 'Byunghun'
    })

    await User.register({
      studentID: '201533333',
      email: 'makehoney3@ajou.ac.kr',
      password: 'pass',
      name: 'Makehoney'
    })

    test_user = await User.findOne({ email: 'pourmonreve@ajou.ac.kr' })
    test_user2 = await User.findOne({ email: 'makehoney3@ajou.ac.kr' })
  })

  afterEach(async () => {
    // await User.findOneAndDelete({ email: test_user.email })
    // await User.findOneAndDelete({ email: test_user2.email })
    await test_user.remove()
    await test_user2.remove()
  })

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
