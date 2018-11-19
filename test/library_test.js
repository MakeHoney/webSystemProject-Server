import mongoose from "mongoose"
import { Seat, User } from '../models'
import { dbConnection } from './connection'
import assert from 'assert'

/**
 * TODO: make basic test for reserve, extend and return
 * */

// Describe tests
describe('Central Library', () => {
  let mocha_test, test_user = null

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
    try {
      await User.register({
        studentID: '201523483',
        email: 'pourmonreve@ajou.ac.kr',
        password: 'pass',
        name: 'Byunghun'
      })
    } catch (err) {
      console.error(err)
    }

    test_user = await User.findOne({ email: 'pourmonreve@ajou.ac.kr' })
  })

  afterEach(async () => {
    await test_user.remove()
    test_user = null
  })

  it('Reserve a seat test', async () => {
    await Seat.reserve({ studentID: test_user.studentID, seatNum: 19 })

    let seat = await Seat.findOne({ seatNum: 19 })

    let user = await User.findOne({ studentID: test_user.studentID })
      .populate('seat')

    assert(user.seat._id.toString() === seat._id.toString())

  })
})
