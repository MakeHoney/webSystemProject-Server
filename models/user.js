const mongoose = require('mongoose')
const { encrypt } = require('../utils/encrypt')
const Schema = mongoose.Schema

const User = new Schema({
    uid: String,
    password: String,
    seatOccupying: {
        floor: Number,
        sid: Number
    },
})

/**
 * await --> try catch로 exception handling 필요
 * */

// statics -> for class
User.statics.create = async function (uid, password) {
    try {
        const user = new this({
            uid,
            password: encrypt(password),
            seatOccupying: {
                floor: '',
                sid: ''
            }
        })
        return await user.save()
    } catch (err) {
        throw new Error(err)
    }
}

User.statics.findOneByUID = async function (uid) {
    try {
        return await this.findOne({
            uid
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
    if(this.seatOccupying.sid) {
        throw new Error(`user already has a seat! (sid: ${this.seatOccupying.sid})`)
    }
}

User.methods.updateSeatInfo = async function ({ seatOccupying }) {
    try {
        await this.update({ seatOccupying })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = mongoose.model('User', User)
