import mongoose from 'mongoose'
import { config } from '../../config'

export default async () => {
  await mongoose.connect(config.testMongoURI)
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('connected to mongodb server')
  })
  return db
}
