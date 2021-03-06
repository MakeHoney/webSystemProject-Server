import mongoose from 'mongoose'
import { modules } from './modules'
const Schema = mongoose.Schema

const User = new Schema({
  email: String,
  studentID: String,
  password: String,
  name: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  seat: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
    default: null
  },
  space: {
    type: Schema.Types.ObjectId,
    ref: 'Space',
    default: null
  }
})

// statics -> for class
User.statics.create = modules.statics.createUser
User.statics.register = modules.statics.registerUser
User.statics.checkAuth = modules.statics.checkUserAuth
User.statics.checkDup = modules.statics.checkDup

// methods -> for specific instance
User.methods.verify = modules.methods.verifyUser
User.methods.hasSeat = modules.methods.checkUserHasSeat
User.methods.hasSpace = modules.methods.checkUserHasSpace

export default mongoose.model('User', User)
