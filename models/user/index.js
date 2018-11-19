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
	sid: {
		type: Schema.Types.ObjectId,
		ref: 'Seat',
		default: null
	}
})

// statics -> for class
User.statics.create = modules.statics.createUser
User.statics.register = modules.statics.registerUser
User.statics.checkAuth = modules.statics.checkUserAuth
// methods -> for specific instance
User.methods.verify = modules.methods.verifyUser
User.methods.hasSeat = modules.methods.checkUserHasSeat

export default mongoose.model('User', User)
