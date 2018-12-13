import mongoose from 'mongoose'
import { config } from '../../src/config'

export default async () => {
  await mongoose.connect(config.testMongoURI)
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {})
  return db
}
