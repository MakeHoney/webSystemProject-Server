import { Seat, User } from '../models'
import mongoose from "mongoose"
import assert from 'assert'

/**
 * TODO: make basic test for reserve, extend and return
 * */

// Describe tests
describe('Populate', () => {

  // Drop the characters collection before each test
  beforeEach(async () => {
    // Drop the collection
    try {
      await mongoose.connection.collections.seats.drop()
      await Seat.mount(30, 30, 30, 30)
    } catch (err) {
      console.error('there is no collection to delete')
    }
  })

  it('Populate test1', async () => {
  })
})
