import mongoose from 'mongoose'
import { utils } from './utils'
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
User.statics.create = utils.statics.createUser
// methods -> for specific instance
User.methods.verify = utils.methods.verifyUser
User.methods.hasSeat = utils.methods.checkUserHasSeat

export default mongoose.model('User', User)
