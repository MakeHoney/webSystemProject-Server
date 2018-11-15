import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/mocha_test')

mongoose.connection.once('open', () => {
    console.log('Mongo connection has been made')
}).on('error', (err) => {
    console.error('Mongo connection error', err)
})

// Drop the characters collection before each test

beforeEach(async () => {
    // Drop the collection
    await mongoose.connection.collections.mariochars.drop()
})
