import mongoose from 'mongoose'
import { encrypt } from '../utils/encrypt'
const Schema = mongoose.Schema

const User = new Schema({
    email: String,
    studentID: String,
    password: String,
    name: String,
    createdAt: { type: Date, default: Date.now() },
    seat: { type: Number, ref: 'Seat', default: -1 }
})

/**
 * await --> try catch로 exception handling 필요
 * */

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

User.statics.findOneByUID = async function (studentID) {
    try {
        return await this.findOne({
            studentID
        })
    } catch (err) {
        throw new Error(err)
    }
}

// methods -> for specific instance
User.methods.verify = function (password) {
    return this.password === encrypt(password)
}

User.methods.hasSeat = function () {
    if(this.seat !== -1) {
        throw new Error(`user already has a seat! (sid: ${this.seatOccupying.sid})`)
    }
}

User.methods.updateSeatInfo = async function ({ seat }) {
    try {
        await this.update({ seat })
    } catch (err) {
        throw new Error(err)
    }
}

export default mongoose.model('User', User)
