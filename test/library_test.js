import mongoose from "mongoose"
import { Seat, User } from '../models'
import { dbConnection } from './connection'
import assert from 'assert'

/**
 * TODO: make basic test for reserve, extend and return
 * */

// Describe tests
describe('Central Library', () => {
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

  it('유저 자리 신청 테스트', async () => {
    // Reserve a seat
    await Seat.reserve({ studentID: test_user.studentID, seatNum: 19 })
    // Load Document
    let seat = await Seat.findOne({ seatNum: 19 })
    let user = await User.findOne({ studentID: test_user.studentID })
      .populate('seat')
    // Comparison
    assert(user.seat._id.toString() === seat._id.toString())
  })

  it('타인에 의해 이미 신청된 자리 신청 테스트', async () => {
    // Reserve a seat
    await Seat.reserve({ studentID: test_user.studentID, seatNum: 19 })

    // When another user tries reservation on same seat -> must occurs exception
    try {
      await Seat.reserve({ studentID: test_user2.studentID, seatNum: 19 })
    } catch (err) {
      assert(err)
    }

    // User2 must have no seat.
    let user2 = await User.findOne({ studentID: test_user2.studentID })
    assert(!user2.seat)
  })
})
