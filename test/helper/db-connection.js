import mongoose from 'mongoose'

export default async () => {
  await mongoose.connect('mongodb://localhost/mocha_test')
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('connected to mongodb server')
  })
  return db
}
