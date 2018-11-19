import mongoose from "mongoose";
import { config } from "../config";
export const dbConnection = () => {
  // TODO: need to export db connection properly
  mongoose.connect(config.mongoURI)
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('connected to mongodb server')
  })
}
