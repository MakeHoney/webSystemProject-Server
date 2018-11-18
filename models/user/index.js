import mongoose from 'mongoose'
import { encrypt } from '../../utils/encrypt'
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
User.statics.create = async function (email, studentID, password, name) {
    try {
        const user = new this({
            email,
            studentID,
            password: encrypt(password),
            name
        })
        return await user.save()
    } catch (err) {
        throw new Error(err)
    }
}

// methods -> for specific instance
User.methods.verify = function (password) {
    return this.password === encrypt(password)
}

User.methods.hasSeat = function (opt) {
    switch(opt) {
        case 'reserve':
            if(this.sid) throw new Error(`user already has a seat! (sid: ${this.sid})`)
            break
        case 'returnOrExtend':
            if(!this.sid) throw new Error('user got no seat to return or extend!')
            break
        default:
            throw new Error('specify option!')
    }
}

export default mongoose.model('User', User)
